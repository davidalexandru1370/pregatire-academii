import { DocumentNode, gql } from "@apollo/client";
import { Category } from "../generated/graphql";

export interface IFilterBuilder {
  filterYear: (year?: number) => void;
  filterCategory: (category?: Category) => void;
  useGetQuizFilteredQuery: () => DocumentNode;
}

export class FilterConcreteBuilder implements IFilterBuilder {
  private year?: number;
  private category?: Category;

  public filterYear = (year?: number) => {
    this.year = year;
  };

  public filterCategory = (category?: Category) => {
    this.category = category;
  };

  public useGetQuizFilteredQuery = () => {
    return gql`
      query getPageQuizzes($skip: Int, $take: Int 
        ${this.year !== undefined ? ",$year: Int" : ""}
        ${this.category !== undefined ? ",category: Category" : ""}
        ) {
        quizzes(skip: $skip, take: $take, where: { 
            and: [
                ${this.year !== undefined ? "{year : {eq: $year}}" : ""}
                ${
                  this.category !== undefined
                    ? "{category : {eq: $category}}"
                    : ""
                }
            ]
         }) {
          items {
            id
            category
            year
            subject
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }
    `;
  };
}

export {};
