export interface IQuestion {
  question: string;
  answers: string[];
  correctAnswer: number;
}

export interface IReading {
  header: string;
  questions: IQuestion[];
  text: string;
}
