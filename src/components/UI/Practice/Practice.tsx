import { useEffect, useState } from "react";
import { IPractice } from "../../../types/practice";
import { Button, CircularProgress, Input, Typography } from "@mui/material";
import styles from "./practice.module.scss";

interface PracticeProps {
  practice: IPractice[];
  onData: (props: boolean) => void;
}

const Practice = ({ practice, onData }: PracticeProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [userAnswer, setUserAnswer] = useState("");
  const [showRestart, setShowRestart] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (timer === 0) {
      handleAnswerSubmit();
    }
  }, [timer]);

  const handleAnswerSubmit = () => {
    const currentQuestion = practice[currentQuestionIndex];
    const newScore = score + 1;
    if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setScore(newScore);
    }
    setUserAnswer("");
    setTimer(15);
    if (currentQuestionIndex === practice.length - 1) {
      setGameStarted(false);
      console.log(newScore);

      if (newScore === practice.length) {
        setShowCongratulations(true);
        onData(true);
      }
      if (newScore !== practice.length) {
        setShowRestart(true);
      }
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  const handleStart = () => {
    setGameStarted(true);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(15);
    setShowRestart(false);
    setShowCongratulations(false);
  };

  const currentQuestion = practice[currentQuestionIndex];

  return (
    <div className={styles.practice}>
      {!gameStarted && !showRestart && !showCongratulations && (
        <Button variant="contained" onClick={handleStart}>
          Start
        </Button>
      )}
      {gameStarted && (
        <div className={styles.content}>
          <Typography variant="h4">{currentQuestion.question}</Typography>
          <Input
            type="text"
            value={userAnswer}
            onChange={handleAnswerChange}
            placeholder="Type your answer here"
            disabled={timer === 0}
          />
          <Button
            onClick={handleAnswerSubmit}
            disabled={timer === 0 || userAnswer.trim() === ""}
          >
            Submit
          </Button>
          <CircularProgress variant="determinate" value={(timer / 15) * 100} />
        </div>
      )}
      {showRestart && (
        <>
          <span>{`you scored ${score} out of ${practice.length}`}</span>
          <Button variant="contained" onClick={handleRestart}>
            Restart
          </Button>
        </>
      )}
      {showCongratulations && (
        <Typography variant="h5">Congratulations!</Typography>
      )}
    </div>
  );
};

export default Practice;
