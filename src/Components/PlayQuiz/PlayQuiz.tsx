import React, { FC, useContext, useState } from "react";
import {
  PlayQuizContextProvider,
  usePlayQuizContext,
} from "../../Context/PlayQuizContext";
import { GetQuizQuery } from "../../GraphQL/useGetQuiz";
import { Question as ModelQuestion } from "../../Models/Question";
import "./PlayQuiz.scss";

interface IPlayQuiz {
  quiz: GetQuizQuery;
}

export const PlayQuiz: FC<IPlayQuiz> = ({ quiz }): JSX.Element => {
  const [selectedQuestion, setSelectedQuestion] = useState<ModelQuestion>(
    quiz?.quizzes?.items[0]!.question[0]!
  );

  return (
    <div className="quizContent">
      <div className="quizContainer">
        <div className="questionContainer">
          <p className="questionText">{selectedQuestion.text}</p>
          <div className="answersContainer">
            {selectedQuestion.answers.map((answer) => {
              return (
                <div className="answerField">
                  <input
                    type="radio"
                    value={answer.text}
                    id={answer.text}
                    name="answer"
                  />
                  <label htmlFor={answer.text} className="answerText">
                    &nbsp;
                    {answer.text}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="allQuestions">
          {quiz?.quizzes?.items[0]!.question.map((question, index) => {
            return (
              <p
                key={index}
                className="questionCard"
                onClick={() => {
                  setSelectedQuestion(question);
                }}
              >
                {index + 1}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
