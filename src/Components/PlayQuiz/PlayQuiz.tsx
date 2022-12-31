import React, { FC, useContext, useRef, useState } from "react";
import { GetQuizQuery } from "../../GraphQL/useGetQuiz";
import { Answer } from "../../Models/Answer";
import { Question as ModelQuestion } from "../../Models/Question";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import "./PlayQuiz.scss";

interface IPlayQuiz {
  quiz: GetQuizQuery;
}

export const PlayQuiz: FC<IPlayQuiz> = ({ quiz }): JSX.Element => {
  const [selectedQuestion, setSelectedQuestion] = useState<ModelQuestion>(
    quiz?.quizzes?.items[0]!.question[0]!
  );
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(1);
  //const [answeredQuestoins, setAnsweredQuestions] = useState<>();
  const answeredQuestions = useRef<Map<string, string>>();
  return (
    <div className="quizContent">
      <div className="quizContainer">
        <div className="questionContainer">
          <p className="questionText">{selectedQuestion.text}</p>
          <div className="answersContainer">
            {selectedQuestion.answers.map((answer: Answer, index: number) => {
              return (
                <div
                  className="answerField"
                  onClick={() => {
                    answeredQuestions.current?.set(
                      selectedQuestion.id,
                      answer.id
                    );
                  }}
                >
                  <input
                    type="radio"
                    value={answer.text}
                    id={answer.id}
                    name={`answer-${selectedQuestion.id}}`}
                    checked={
                      answeredQuestions.current?.get(selectedQuestion.id) ===
                      answer.id
                    }
                  />
                  <label htmlFor={answer.id} className="answerText">
                    &nbsp;
                    {answer.text}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="footerContainer">
            <PrimaryButton>Inapoi</PrimaryButton>
            <p className="w-color numberOfQuestions">
              Intrebarea {selectedQuestionIndex} din{" "}
              {quiz.quizzes?.items[0]?.question.length}
            </p>
            <PrimaryButton>Inainte</PrimaryButton>
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
                  setSelectedQuestionIndex(index + 1);
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
