import { Answer } from "./Answer";

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
}
