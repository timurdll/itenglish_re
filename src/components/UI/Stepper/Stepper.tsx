import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Vocabulary from "../../Vocabulary/Vocabulary";
import { IVocabulary } from "../../../types/vocabulary";
import { IReading } from "../../../types/reading";
import Reading from "../../Reading/Reading";
import { useState } from "react";
import { IPractice } from "../../../types/practice";
import Practice from "../Practice/Practice";
import styles from "./stepper.module.scss";
import { useUpdateProgressMutation } from "../../../store/usersApi";
import { useAuth } from "../../../hooks/use-auth";
import { useNavigate } from "react-router-dom";

interface HorizontalLinearStepperProps {
  vocabulary: IVocabulary[];
  reading: IReading;
  practice: IPractice[];
  lessonName: string;
}

const steps = [
  "Read and listen to a new words",
  "Read the text and answer the questions",
  "Execute the interactive tasks",
];

const HorizontalLinearStepper = ({
  vocabulary,
  reading,
  practice,
  lessonName,
}: HorizontalLinearStepperProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isReadingPassed, setIsReadingPassed] = useState(false);
  const [isPracticePassed, setIsPracticePassed] = useState(false);
  const [updateProgress] = useUpdateProgressMutation();
  const navigate = useNavigate();
  const { id } = useAuth();

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleReadingState = (dataFromChild: boolean) =>
    setIsReadingPassed(dataFromChild);
  const handlePracticeState = (dataFromChild: boolean) =>
    setIsPracticePassed(dataFromChild);

  const handleFinish = async () => {
    try {
      await updateProgress({ id, lessonName });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <Vocabulary vocabulary={vocabulary} />
          </>
        );
      case 1:
        return (
          <>
            <Reading reading={reading} onData={handleReadingState} />
          </>
        );
      case 2:
        return (
          <>
            <Practice practice={practice} onData={handlePracticeState} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.stepper}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderStepContent(activeStep)}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {activeStep === steps.length - 1 ? (
          <Button onClick={handleFinish} disabled={!isPracticePassed}>
            Finish
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={activeStep === 1 && !isReadingPassed}
          >
            Next
          </Button>
        )}
      </Box>
    </div>
  );
};

export default HorizontalLinearStepper;
