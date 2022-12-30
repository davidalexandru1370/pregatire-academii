import React, { useContext, useState } from "react";
import { PlayQuizContextProvider, usePlayQuizContext } from "../../Context/PlayQuizContext";
import { GetQuizQuery } from "../../GraphQL/useGetQuiz";
import { Question as ModelQuestion } from "../../Models/Question";
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
      <div className="quizContent">
         {children}
      </div>
    </PlayQuizContextProvider>
    </div>
};

const Question: QuestionComponent = (): JSX.Element => {
  const { quiz } = usePlayQuizContext();
  const [selectedQuestion, setSelectedQuestion] = useState<ModelQuestion>(quiz?.quizzes?.items[0]!.question[0]!);
  
  return ( 
  <div className="quizContainer">
      <div className="questionContainer">
        <p className="questionText">{selectedQuestion.text}</p>
        {
          selectedQuestion.answers.map(answer => {
            console.log(answer);
            
            return <p className="w-color">{answer.answer}</p>
          })
        }
      </div>
    <div className="allQuestions">
      {
        quiz?.quizzes?.items[0]!.question.map((question, index) => {
          return <p
          key={index}
          className="questionCard"
          onClick={() => {
            setSelectedQuestion(question);
          }}
          >
            {index + 1}
          </p>
        })
      }
    </div>

  </div>
  );
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
