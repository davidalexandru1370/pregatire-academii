import { DocumentNode, gql } from "@apollo/client";
import { Category } from "./generated/graphql";
import * as Apollo from "@apollo/client";
import { GetQuizQuery } from "./useGetQuiz";

type GetQuizFilteredVariable = Partial<{
  skip: number;
  take: number;
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

export function useGetQuizFilteredQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetQuizFilteredQuery,
    GetQuizFilteredVariable
  >
) {
  const query = gql`
      query useGetQuizFilteredQuery($skip: Int, $take: Int 
        ${baseOptions?.variables?.year !== undefined ? ",$year: Int" : ""}
        ${
          baseOptions?.variables?.category !== undefined
            ? ",category: Category"
            : ""
        }
        ) {
        quizzes(skip: $skip, take: $take, where: { 
            and: [
                ${
                  baseOptions?.variables?.year !== undefined
                    ? "{year : {eq: $year}}"
                    : ""
                }
                ${
                  baseOptions?.variables?.category !== undefined
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
}
