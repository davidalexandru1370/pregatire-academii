import React from "react";

type QuestionComponent = React.FC;
type PlayQuizComponent = React.FC<{ children: React.ReactNode }> & {
  Question: QuestionComponent;
};

export const PlayQuiz: PlayQuizComponent = ({ children }): JSX.Element => {
  return <div>{children}</div>;
};

const Question: QuestionComponent = (): JSX.Element => {
  return <div></div>;
};

PlayQuiz.Question = Question;
