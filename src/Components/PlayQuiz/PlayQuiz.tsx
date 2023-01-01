import React, { FC, useContext, useReducer, useRef, useState } from "react";
import { GetQuizQuery } from "../../GraphQL/useGetQuiz";
import { Answer } from "../../Models/Answer";
import { Question as ModelQuestion } from "../../Models/Question";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import "./PlayQuiz.scss";

interface IPlayQuiz {
  quiz: GetQuizQuery;
}

interface IState {
  selectedQuestion: ModelQuestion;
  selectedQuestionIndex: number;
  answeredQuestions: Map<string, string>;
}

enum QuizActionTypeEnum {
  ChangeQuestion,
  ChangeAnswer,
}

interface Action {
  type: QuizActionTypeEnum;
  payload?: Partial<IState>;
}

function handlerQuizReducer(state: IState, action: Action): IState {
  switch (action.type) {
    case QuizActionTypeEnum.ChangeQuestion: {
      return {
        ...state,
        selectedQuestion: state.selectedQuestion,
        selectedQuestionIndex: state.selectedQuestionIndex,
      };
    }
    case QuizActionTypeEnum.ChangeAnswer: {
    }
  }
  return state;
}

export const PlayQuiz: FC<IPlayQuiz> = ({ quiz }): JSX.Element => {
  // const [selectedQuestion, setSelectedQuestion] = useState<ModelQuestion>(
  //   quiz?.quizzes?.items[0]!.question[0]!
  // );
  //const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(1);
  const initialState: IState = {
    answeredQuestions: new Map<string, string>(),
    selectedQuestion: quiz?.quizzes?.items[0]!.question[0]!,
    selectedQuestionIndex: 1,
  };

  //const answeredQuestions = useRef<Map<string, string>>();
  const [state, dispatch] = useReducer(handlerQuizReducer, initialState);

  return (
    <div className="quizContent">
      <div className="quizContainer">
        <div className="questionContainer">
          <p className="questionText">{state.selectedQuestion.text}</p>
          <div className="answersContainer">
            {state.selectedQuestion.answers.map(
              (answer: Answer, index: number) => {
                return (
                  <div
                    className="answerField"
                    onClick={() => {
                      state.answeredQuestions.set(
                        state.selectedQuestion.id,
                        answer.id
                      );
                    }}
                  >
                    <input
                      type="radio"
                      value={answer.text}
                      id={answer.id}
                      name={`answer-${state.selectedQuestion.id}}`}
                      checked={
                        state.answeredQuestions.get(
                          state.selectedQuestion.id
                        ) === answer.id
                      }
                    />
                    <label htmlFor={answer.id} className="answerText">
                      &nbsp;
                      {answer.text}
                    </label>
                  </div>
                );
              }
            )}
          </div>
          <div className="footerContainer">
            <PrimaryButton>Inapoi</PrimaryButton>
            <p className="w-color numberOfQuestions">
              Intrebarea {state.selectedQuestionIndex} din{" "}
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
                  dispatch({
                    type: QuizActionTypeEnum.ChangeQuestion,
                  });
                  //setSelectedQuestion(question);
                  //setSelectedQuestionIndex(index + 1);
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
