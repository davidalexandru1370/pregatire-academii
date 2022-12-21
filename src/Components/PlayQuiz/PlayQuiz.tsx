import React from "react";
import { Quiz } from "../../GraphQL/generated/graphql";
import { GetQuizQuery } from "../../GraphQL/useGetQuiz";

interface IPlayQuiz {
  children: React.ReactNode;
}

type QuestionComponent = React.FC;
type AnswerComponent = React.FC;
type FooterComponent = React.FC;
type PlayQuizComponent = React.FC<{
  quiz: GetQuizQuery;
  children: React.ReactNode;
}> & {
  Question: QuestionComponent;
  Answer: AnswerComponent;
  Footer: FooterComponent;
};

export const PlayQuiz: PlayQuizComponent = ({
  children,
  quiz,
}): JSX.Element => {
  return <div>{children}</div>;
};

const Question: QuestionComponent = (): JSX.Element => {
  return <div></div>;
};

const Answer: AnswerComponent = (): JSX.Element => {
  return <div></div>;
};

const Footer: FooterComponent = (): JSX.Element => {
  return <div></div>;
};

PlayQuiz.Question = Question;
PlayQuiz.Answer = Answer;
PlayQuiz.Footer = Footer;
