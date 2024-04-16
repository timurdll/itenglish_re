import { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { IReading, IQuestion } from "../../types/reading";
import styles from "./reading.module.scss";

interface ReadingProps {
  reading: IReading;
  onData: (props: boolean) => void;
}

const Reading = ({ reading, onData }: ReadingProps) => {
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answerIndex,
    }));
  };

  const handleShowResults = () => {
    setShowResults(true);
    const passingScore = reading.questions.length;
    const newScore = Object.keys(answers).reduce((acc, questionIndex) => {
      const answerIndex = answers[questionIndex];
      const question: IQuestion = reading.questions[parseInt(questionIndex)];
      return question.correctAnswer === answerIndex ? acc + 1 : acc;
    }, 0);
    setScore(newScore);
    if (newScore === passingScore) {
      onData(true);
    }
  };

  return (
    <div className={styles.reading}>
      <Typography variant="h4" align="center" gutterBottom>
        {reading.header}
      </Typography>
      <Typography variant="body1" align="left" sx={{ maxWidth: 800 }}>
        {reading.text}
      </Typography>
      <Box sx={{ mt: 4 }}>
        {reading.questions.map((question, index) => (
          <Box key={index} sx={{ mt: 3 }}>
            <Typography variant="body1" align="left">{`${index + 1}. ${
              question.question
            }`}</Typography>
            <RadioGroup
              aria-label={`Question ${index + 1}`}
              name={`question-${index}`}
              value={answers[index] ?? ""}
              onChange={(event) =>
                handleAnswerChange(index, parseInt(event.target.value))
              }
            >
              {question.answers.map((answer, answerIndex) => (
                <FormControlLabel
                  key={answerIndex}
                  value={answerIndex}
                  control={<Radio />}
                  label={answer}
                  sx={{ ml: 1, my: 1 }}
                />
              ))}
            </RadioGroup>
          </Box>
        ))}
      </Box>
      {showResults && (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          You scored {score} out of {reading.questions.length}.
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          onClick={handleShowResults}
          sx={{ width: "15%", minWidth: 110 }}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default Reading;
