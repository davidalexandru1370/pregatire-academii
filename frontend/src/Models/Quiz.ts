import { Category } from "../Enums/Category";
import { Question } from "./Question";

export interface Quiz {
  id: string;
  category?: Category;
  year?: number;
  subject?: string;
  Question?: Array<Question>;
}
