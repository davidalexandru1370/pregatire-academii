import React, { useContext, useState } from "react";
import { PlayQuizContextProvider, usePlayQuizContext } from "../../Context/PlayQuizContext";
import { GetQuizQuery } from "../../GraphQL/useGetQuiz";
import { Question } from "../../Models/Question";
import "./PlayQuiz.scss";


interface IPlayQuiz {
  children: React.ReactNode;
  quiz: GetQuizQuery;
}

interface IStyleComponent{
  style?: React.CSSProperties;
  className?: string;
}

type QuestionComponent = React.FC<IStyleComponent>;
type AnswerComponent = React.FC<IStyleComponent>;
type FooterComponent = React.FC<IStyleComponent>;
type PlayQuizComponent = React.FC<IPlayQuiz>
 & {
  Question: QuestionComponent;
  Answer: AnswerComponent;
  Footer: FooterComponent;
};

export const PlayQuiz: PlayQuizComponent = ({
  children,
  quiz,
}): JSX.Element => {

  return <div>
    <PlayQuizContextProvider quiz = { quiz } >
      <div className="">
         {children}
      </div>
    </PlayQuizContextProvider>
    </div>
};

const Question: QuestionComponent = (): JSX.Element => {
  const { quiz } = usePlayQuizContext();
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  
  return <div>
    <div className="allQuestions">
      {
        quiz?.quizzes?.items[0]!.question.map((_, index) => {
          return <p className="questionCard">{index + 1}</p>
        })
      }
    </div>
  </div>;
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
