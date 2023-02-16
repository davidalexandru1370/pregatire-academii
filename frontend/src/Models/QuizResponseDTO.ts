import { Answer } from "./Answer";

export interface QuizResponseDTO {
  id: string;
  answers: Answer[];
  score?: number;
}
