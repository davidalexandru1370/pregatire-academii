import { gql, useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { FC } from "react";
import * as Apollo from "@apollo/client";
import { Exact, Question } from "./generated/graphql";

//type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };

const getQuizQueryDocument: DocumentNode = gql`
  query getQuizzes($id: UUID) {
    quizzes(where: { id: { eq: $id } }) {
      items {
        id
        question {
          text
          answers {
            id
            text
          }
        }
      }
    }
  }
`;

type GetQuizQuery = {
  __typename?: "Query";
  quizzes?: {
    __typename?: "QuizCollectionSegment";
    items?: Array<{
      __typename?: "Quiz";
      id: any;
      question: Question;
    }> | null;
  } | null;
};

type Scalars = {
  UUID: any;
};

type GetQuizQueryVariables = Exact<{ id: Scalars["UUID"] }>;

export function useGetQuiz(
  baseOptions?: Apollo.QueryHookOptions<GetQuizQuery, GetQuizQueryVariables>
) {
  const options = {} as const;
  const queryOptions = { ...options, ...baseOptions };
  return Apollo.useQuery<GetQuizQuery, GetQuizQueryVariables>(
    getQuizQueryDocument,
    queryOptions
  );
}
