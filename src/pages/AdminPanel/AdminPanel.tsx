import { useEffect, useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Input } from "@mui/material";
import styles from "./admin-panel.module.scss";
import { ILesson } from "../../types/lessons";
import { IQuestion, IReading } from "../../types/reading";
import { db, storage } from "../../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";

const AdminPanel = () => {
  const [lesson, setLesson] = useState<ILesson>({
    lessonName: "",
    practice: [],
    reading: {
      header: "",
      text: "",
      questions: [],
    },
    vocabulary: [],
  });
  const [lessonName, setLessonName] = useState("");

  // State variables for Vocabulary
  const [word, setWord] = useState("");
  const [description, setDescription] = useState("");
  const [audioUpload, setAudioUpload] = useState<File | null>(null);

  // State variables for Reading
  const [header, setHeader] = useState("");
  const [text, setText] = useState("");
  const [readingQuestion, setReadingQuestion] = useState("");
  const [readingAnswers, setReadingAnswers] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [readingQuestions, setReadingQuestions] = useState<IQuestion[]>([]);

  // State variables for Practice
  const [practiceQuestion, setPracticeQuestion] = useState("");
  const [practiceAnswer, setPracticeAnswer] = useState("");

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAudioUpload(e.target.files[0]);
    }
  };

  const handleAddLessonName = () => {
    setLesson((prevLesson) => ({
      ...prevLesson,
      lessonName: lessonName,
    }));
  };

  const handleAddVocabulary = () => {
    if (audioUpload == null) return;
    const audioRef = ref(storage, `audios/${audioUpload.name + v4()}`);
    const uploadTask = uploadBytesResumable(audioRef, audioUpload);

    uploadTask
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((downloadURL) => {
        console.log("File available at", downloadURL);
        const newWord = { word, description, audio: downloadURL };
        setLesson((prevLesson) => ({
          ...prevLesson,
          vocabulary: [...prevLesson.vocabulary, newWord],
        }));
        clearVocabularyInputs();
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });

    uploadBytes(audioRef, audioUpload)
      .then(() => {
        console.log("Audio uploaded");
      })
      .catch((error) => {
        console.error("Error uploading bytes:", error);
      });
  };

  const handleAddReading = () => {
    const newQuestion: IQuestion = {
      question: readingQuestion,
      answers: readingAnswers,
      correctAnswer: correctAnswer,
    };

    // Update the reading questions state
    const updatedQuestions = [...readingQuestions, newQuestion];
    setReadingQuestions(updatedQuestions);

    // Create a new reading object with the updated questions
    const newReading: IReading = {
      header,
      text,
      questions: updatedQuestions,
    };

    // Update the lesson state with the new reading
    setLesson((prevLesson) => ({
      ...prevLesson,
      reading: newReading,
    }));

    // Clear inputs
    clearReadingInputs();

    // Disable input after adding reading
    setIsInputDisabled(true);
  };

  const handleAddPractice = () => {
    const newPractice = { question: practiceQuestion, answer: practiceAnswer };
    setLesson((prevLesson) => ({
      ...prevLesson,
      practice: [...prevLesson.practice, newPractice],
    }));
    clearPracticeInputs();
  };

  const handleAddLesson = async () => {
    // console.log(lesson);

    try {
      const docRef = await addDoc(collection(db, "lessons"), lesson);
      console.log("Lesson added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding lesson: ", error);
    }
  };

  const clearVocabularyInputs = () => {
    setWord("");
    setDescription("");
  };

  const clearReadingInputs = () => {
    setReadingQuestion("");
    setReadingAnswers([""]);
    setCorrectAnswer(0);
  };

  const clearPracticeInputs = () => {
    setPracticeQuestion("");
    setPracticeAnswer("");
  };

  return (
    <div className={styles.admin_panel}>
      <div className={styles.input_block}>
        <h2>Add lesson name</h2>
        <Input
          type="text"
          placeholder="Lesson name"
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
        />
        <button onClick={handleAddLessonName}>Add Lesson Name</button>
      </div>
      <div className={styles.input_block}>
        <h2>Add Vocabulary</h2>
        <Input
          type="text"
          placeholder="Word"
          value={word}
          disabled={isInputDisabled}
          onChange={(e) => setWord(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="file"
          placeholder="Audio URL"
          onChange={handleAudioUpload}
        />

        <button onClick={handleAddVocabulary}>Add Vocabulary</button>
      </div>
      <div className={styles.input_block}>
        <h2>Add Reading</h2>
        <Input
          type="text"
          placeholder="Header"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />
        <TextareaAutosize
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Reading Question"
          value={readingQuestion}
          onChange={(e) => setReadingQuestion(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Reading Answers (comma separated)"
          onChange={(e) => setReadingAnswers(e.target.value.split(","))}
        />
        <Input
          type="number"
          placeholder="Correct Answer Index"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}
        />
        <button onClick={handleAddReading}>Add Reading</button>
      </div>
      <div className={styles.input_block}>
        <h2>Add Practice</h2>
        <Input
          type="text"
          placeholder="Practice Question"
          value={practiceQuestion}
          onChange={(e) => setPracticeQuestion(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Practice Answer"
          value={practiceAnswer}
          onChange={(e) => setPracticeAnswer(e.target.value)}
        />
        <button onClick={handleAddPractice}>Add Practice</button>
      </div>
      <button onClick={handleAddLesson}>Add lesson</button>
    </div>
  );
};

export default AdminPanel;
