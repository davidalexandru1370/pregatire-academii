import { Category } from "../Enums/Category";
import { Subject } from "../Enums/Subjects";

export interface Quiz {
  id: string;
  category: Category;
  year: number;
  subject: Subject;
}
