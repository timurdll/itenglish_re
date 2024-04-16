import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import HorizontalLinearStepper from "../UI/Stepper/Stepper";
import { useGetLessonsQuery } from "../../store/lessonsApi";
import { ILesson } from "../../types/lessons";
import slugify from "react-slugify";

const Lesson = () => {
  const { title } = useParams();
  const { data, isFetching } = useGetLessonsQuery({});
  const [lessonIndex, setLessonIndex] = useState<number | null>(null);
  const [lesson, setLesson] = useState<ILesson | null>(null);

  useEffect(() => {
    if (!isFetching && data) {
      const index = data.findIndex(
        (lesson) => slugify(lesson.lessonName) === title
      );
      if (index !== -1) {
        setLessonIndex(index);
        const lessonData: ILesson = {
          lessonName: data[index].lessonName,
          practice: data[index].practice || [],
          reading: data[index].reading || [],
          vocabulary: data[index].vocabulary || [],
        };
        setLesson(lessonData);
      }
    }
  }, [data, title, isFetching]);

  if (isFetching || lessonIndex === null || lesson === null) {
    return <CircularProgress />;
  }

  return (
    <>
      <HorizontalLinearStepper
        vocabulary={lesson.vocabulary}
        reading={lesson.reading}
        practice={lesson.practice}
        lessonName={lesson.lessonName}
      />
    </>
  );
};

export { Lesson };
