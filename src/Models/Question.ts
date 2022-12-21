import { Answer } from "./Answer";

export interface Question {
  id: string;
  answers: Answer[];
}
