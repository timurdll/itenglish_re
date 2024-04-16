import { IPractice } from "./practice";
import { IReading } from "./reading";
import { IVocabulary } from "./vocabulary";

export interface ILesson {
  reading: IReading;
  practice: IPractice[];
  vocabulary: IVocabulary[];
  lessonName: string;
}
