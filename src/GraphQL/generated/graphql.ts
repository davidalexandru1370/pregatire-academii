/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  UUID: any;
};

export type Answer = {
  __typename?: "Answer";
  id: Scalars["UUID"];
  isCorrect: Scalars["Boolean"];
  question: Question;
  answer: Scalars["String"];
};

export type AnswerFilterInput = {
  and?: InputMaybe<Array<AnswerFilterInput>>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  isCorrect?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<AnswerFilterInput>>;
  question?: InputMaybe<QuestionFilterInput>;
  text?: InputMaybe<StringOperationFilterInput>;
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars["Boolean"]>;
  neq?: InputMaybe<Scalars["Boolean"]>;
};

export enum Category {
  Jandarmerie = "JANDARMERIE",
  Politie = "POLITIE",
  Pompieri = "POMPIERI",
}

export type CategoryOperationFilterInput = {
  eq?: InputMaybe<Category>;
  in?: InputMaybe<Array<Category>>;
  neq?: InputMaybe<Category>;
  nin?: InputMaybe<Array<Category>>;
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: "CollectionSegmentInfo";
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars["Boolean"];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars["Boolean"];
};

export type ComparableGuidOperationFilterInput = {
  eq?: InputMaybe<Scalars["UUID"]>;
  gt?: InputMaybe<Scalars["UUID"]>;
  gte?: InputMaybe<Scalars["UUID"]>;
  in?: InputMaybe<Array<Scalars["UUID"]>>;
  lt?: InputMaybe<Scalars["UUID"]>;
  lte?: InputMaybe<Scalars["UUID"]>;
  neq?: InputMaybe<Scalars["UUID"]>;
  ngt?: InputMaybe<Scalars["UUID"]>;
  ngte?: InputMaybe<Scalars["UUID"]>;
  nin?: InputMaybe<Array<Scalars["UUID"]>>;
  nlt?: InputMaybe<Scalars["UUID"]>;
  nlte?: InputMaybe<Scalars["UUID"]>;
};

export type ComparableInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars["Int"]>;
  gt?: InputMaybe<Scalars["Int"]>;
  gte?: InputMaybe<Scalars["Int"]>;
  in?: InputMaybe<Array<Scalars["Int"]>>;
  lt?: InputMaybe<Scalars["Int"]>;
  lte?: InputMaybe<Scalars["Int"]>;
  neq?: InputMaybe<Scalars["Int"]>;
  ngt?: InputMaybe<Scalars["Int"]>;
  ngte?: InputMaybe<Scalars["Int"]>;
  nin?: InputMaybe<Array<Scalars["Int"]>>;
  nlt?: InputMaybe<Scalars["Int"]>;
  nlte?: InputMaybe<Scalars["Int"]>;
};

export type ListFilterInputTypeOfAnswerFilterInput = {
  all?: InputMaybe<AnswerFilterInput>;
  any?: InputMaybe<Scalars["Boolean"]>;
  none?: InputMaybe<AnswerFilterInput>;
  some?: InputMaybe<AnswerFilterInput>;
};

export type ListFilterInputTypeOfQuestionFilterInput = {
  all?: InputMaybe<QuestionFilterInput>;
  any?: InputMaybe<Scalars["Boolean"]>;
  none?: InputMaybe<QuestionFilterInput>;
  some?: InputMaybe<QuestionFilterInput>;
};

export type Query = {
  __typename?: "Query";
  quizzes?: Maybe<QuizCollectionSegment>;
};

export type QueryQuizzesArgs = {
  skip?: InputMaybe<Scalars["Int"]>;
  take?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<QuizFilterInput>;
};

export type Question = {
  __typename?: "Question";
  answers: Array<Answer>
  id: Scalars["UUID"];
  quiz?: Maybe<Quiz>;
  text: Scalars["String"];
};

export type QuestionFilterInput = {
  and?: InputMaybe<Array<QuestionFilterInput>>;
  answers?: InputMaybe<ListFilterInputTypeOfAnswerFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  or?: InputMaybe<Array<QuestionFilterInput>>;
  quiz?: InputMaybe<QuizFilterInput>;
  text?: InputMaybe<StringOperationFilterInput>;
};

export type Quiz = {
  __typename?: "Quiz";
  category?: Maybe<Category>;
  id: Scalars["UUID"];
  question?: Maybe<Array<Question>>;
  subject: Scalars["String"];
  year: Scalars["Int"];
};

export type QuizCollectionSegment = {
  __typename?: "QuizCollectionSegment";
  items?: Maybe<Array<Quiz>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"];
};

export type QuizFilterInput = {
  and?: InputMaybe<Array<QuizFilterInput>>;
  category?: InputMaybe<CategoryOperationFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  or?: InputMaybe<Array<QuizFilterInput>>;
  question?: InputMaybe<ListFilterInputTypeOfQuestionFilterInput>;
  subject?: InputMaybe<StringOperationFilterInput>;
  year?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars["String"]>;
  endsWith?: InputMaybe<Scalars["String"]>;
  eq?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  ncontains?: InputMaybe<Scalars["String"]>;
  nendsWith?: InputMaybe<Scalars["String"]>;
  neq?: InputMaybe<Scalars["String"]>;
  nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  nstartsWith?: InputMaybe<Scalars["String"]>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars["String"]>;
};

export type GetPageQuizzesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]>;
  take?: InputMaybe<Scalars["Int"]>;
}>;

export type GetPageQuizzesQuery = {
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

export const GetPageQuizzesDocument = gql`
  query getPageQuizzes($skip: Int, $take: Int) {
    quizzes(skip: $skip, take: $take) {
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

/**
 * __useGetPageQuizzesQuery__
 *
 * To run a query within a React component, call `useGetPageQuizzesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageQuizzesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageQuizzesQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetPageQuizzesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetPageQuizzesQuery,
    GetPageQuizzesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPageQuizzesQuery, GetPageQuizzesQueryVariables>(
    GetPageQuizzesDocument,
    options
  );
}
export function useGetPageQuizzesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPageQuizzesQuery,
    GetPageQuizzesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPageQuizzesQuery, GetPageQuizzesQueryVariables>(
    GetPageQuizzesDocument,
    options
  );
}
export type GetPageQuizzesQueryHookResult = ReturnType<
  typeof useGetPageQuizzesQuery
>;
export type GetPageQuizzesLazyQueryHookResult = ReturnType<
  typeof useGetPageQuizzesLazyQuery
>;
export type GetPageQuizzesQueryResult = Apollo.QueryResult<
  GetPageQuizzesQuery,
  GetPageQuizzesQueryVariables
>;
