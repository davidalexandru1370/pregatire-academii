import { DocumentNode, gql } from "@apollo/client";
import { Category } from "../generated/graphql";
import * as Apollo from "@apollo/client";
import { GetQuizQuery } from "../useGetQuiz";

type GetQuizFilteredVariable = Partial<{
  year: number;
  category: Category;
}>;

type GetQuizFilteredQuery = {
  __typename?: "Query";
  quizzes?: {
    __typename?: "QuizCollectionSegment";
    totalCount: number;
    items?: Array<{
      __typename?: "Quiz";
      id: any;
      category: Category & undefined;
      year: number;
      subject: string;
    }> | null;
    pageInfo: {
      __typename?: "CollectionSegmentInfo";
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  } | null;
};

export interface IFilterBuilder {
  filterYear: (year?: number) => void;
  filterCategory: (category?: Category) => void;
  useGetQuizFilteredQuery: (
    baseOptions?: Apollo.QueryHookOptions<GetQuizQuery, GetQuizFilteredVariable>
  ) => Apollo.QueryResult;
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

  public useGetQuizFilteredQuery = (
    baseOptions?: Apollo.QueryHookOptions<GetQuizQuery, GetQuizFilteredVariable>
  ) => {
    const query = gql`
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

    const queryOptions = { ...baseOptions };

    return Apollo.useQuery<GetQuizFilteredQuery, GetQuizFilteredVariable>(
      query,
      queryOptions
    );
  };
}
