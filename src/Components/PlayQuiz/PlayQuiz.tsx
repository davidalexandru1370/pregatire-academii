import React, { useContext } from "react";
import { PlayQuizContext, PlayQuizContextProvider, usePlayQuizContext } from "../../Context/PlayQuizContext";
import { GetQuizQuery } from "../../GraphQL/useGetQuiz";

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
  const {setQuiz} = usePlayQuizContext();
  setQuiz(quiz);  

  return <div>
    <PlayQuizContextProvider quiz={ quiz } >
         {children}
    </PlayQuizContextProvider>
    </div>
};

const Question: QuestionComponent = (): JSX.Element => {
  const {quiz} = usePlayQuizContext();
  console.log(quiz);
  return <div>
    {
      quiz!.quiz!.question.map((q,index) => {
        return <p style={{color:"red"}}>{index + 1}</p>
      })
    }
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
