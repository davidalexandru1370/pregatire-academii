import { FC, useMemo, useReducer, useState } from "react";
import { evaluateQuiz } from "../../api/RoomAPI";
import { GetQuizQuery } from "../../GraphQL/useGetQuiz";
import { Answer } from "../../Models/Answer";
import { Question as ModelQuestion } from "../../Models/Question";
import { QuizResponseDTO } from "../../Models/QuizResponseDTO";
import { AreYouSureModal } from "../AreYouSureModal/AreYouSureModal";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import "./PlayQuiz.scss";

interface IPlayQuiz {
  quiz: GetQuizQuery;
}

interface IState {
  selectedQuestion: ModelQuestion;
  selectedQuestionIndex: number;
  answeredQuestions: Map<string, Answer>;
  correctedAnswers?: Map<string, Answer>;
}

enum QuizActionTypeEnum {
  ChangeQuestion,
  ChangeAnswer,
  EvaluateQuiz,
}

interface Action {
  type: QuizActionTypeEnum;
  payload?: Partial<IState>;
}

async function handleSendQuizWithAnswers(quizId: string, answers: Answer[]) {
  return await evaluateQuiz({
    answers: answers,
    id: quizId,
  });
}

function handlerQuizReducer(state: IState, action: Action): IState {
  switch (action.type) {
    case QuizActionTypeEnum.ChangeQuestion: {
      return {
        ...state,
        selectedQuestion: action.payload!.selectedQuestion!,
        selectedQuestionIndex: action.payload!.selectedQuestionIndex!,
      };
    }
    case QuizActionTypeEnum.ChangeAnswer: {
      return {
        ...state,
        answeredQuestions: new Map([
          //@ts-ignore
          ...state.answeredQuestions,
          //@ts-ignore
          ...action.payload!.answeredQuestions!,
        ]),
      };
    }
    case QuizActionTypeEnum.EvaluateQuiz: {
      return {
        ...state,
        correctedAnswers: action.payload!.correctedAnswers,
      };
    }
  }
}

export const PlayQuiz: FC<IPlayQuiz> = ({ quiz }): JSX.Element => {
  const initialState: IState = {
    // key - question id value - answer id
    answeredQuestions: new Map<string, Answer>(),
    selectedQuestion: quiz?.quizzes?.items[0]!.question[0]!,
    selectedQuestionIndex: 1,
    correctedAnswers: undefined,
  };

  const numberOfQuestions = useMemo(() => {
    return quiz.quizzes?.items[0]?.question.length;
  }, [quiz]);

  const [state, dispatch] = useReducer(handlerQuizReducer, initialState);
  const [showModal, setShowModal] = useState<boolean>(false);

  const checkIfQuestionHasCorrectResponse = (questionId: string): boolean => {
    if (state.correctedAnswers === undefined) {
      return false;
    }

    return (
      state.answeredQuestions.has(questionId) === false ||
      state.correctedAnswers.has(
        state.answeredQuestions.get(questionId)?.id!
      ) === false
    );
  };

  return (
    <div className="quizContent">
      {showModal && (
        <AreYouSureModal
          visibility={showModal}
          afterYesMessageClicked="Se trimite..."
          onCancelClick={() => {
            setShowModal(false);
          }}
          yesMessage="Trimite"
          onClose={() => {
            setShowModal(false);
          }}
          onYesClick={async () => {
            const quizWithCorrectAnswers: QuizResponseDTO =
              await handleSendQuizWithAnswers(
                quiz.quizzes?.items[0]?.id,
                Array.from(initialState.answeredQuestions.values())
              );
            dispatch({
              type: QuizActionTypeEnum.EvaluateQuiz,
              payload: {
                correctedAnswers: quizWithCorrectAnswers.answers.reduce(
                  function (map, answer) {
                    map.set(answer.id, answer);
                    return map;
                  },
                  new Map<string, Answer>()
                ),
              },
            });
            setShowModal(false);
          }}
        />
      )}
      <div className="quizContainer">
        <div className="questionContainer">
          <p className="questionText">{state.selectedQuestion.text}</p>
          <div className="answersContainer">
            {state.selectedQuestion.answers.map(
              (answer: Answer, index: number) => {
                return (
                  <div
                    key={answer.id}
                    style={{
                      backgroundColor:
                        state.correctedAnswers === undefined
                          ? "white"
                          : state.correctedAnswers.has(answer.id) === true
                          ? "green"
                          : "red",
                    }}
                    className="answerField"
                    onClick={() => {
                      dispatch({
                        type: QuizActionTypeEnum.ChangeAnswer,
                        payload: {
                          answeredQuestions: new Map().set(
                            state.selectedQuestion.id,
                            answer
                          ),
                        },
                      });
                    }}
                  >
                    <input
                      type="radio"
                      value={answer.text}
                      onClick={(event) => event.preventDefault()}
                      disabled={state.correctedAnswers !== undefined}
                      id={answer.id}
                      name={`answer-${state.selectedQuestion.id}}`}
                      checked={
                        state.answeredQuestions.get(state.selectedQuestion.id)
                          ?.id === answer.id
                      }
                    />
                    <label
                      htmlFor={answer.id}
                      className="answerText"
                      onClick={(event) => {
                        if (state.correctedAnswers !== undefined) {
                          event.stopPropagation();
                        }
                      }}
                    >
                      &nbsp;
                      {answer.text}
                    </label>
                  </div>
                );
              }
            )}
          </div>
          <div className="footerContainer">
            <PrimaryButton
              disabled={state.selectedQuestionIndex === 1}
              onClick={() => {
                dispatch({
                  type: QuizActionTypeEnum.ChangeQuestion,
                  payload: {
                    selectedQuestionIndex: state.selectedQuestionIndex - 1,
                    selectedQuestion: quiz.quizzes?.items[0]?.question.at(
                      state.selectedQuestionIndex - 2
                    ),
                  },
                });
              }}
            >
              Inapoi
            </PrimaryButton>
            <p className="w-color numberOfQuestions">
              Intrebarea {state.selectedQuestionIndex} din{" "}
              {quiz.quizzes?.items[0]?.question.length}
            </p>
            <PrimaryButton
              disabled={state.selectedQuestionIndex === numberOfQuestions}
              onClick={() => {
                dispatch({
                  type: QuizActionTypeEnum.ChangeQuestion,
                  payload: {
                    selectedQuestionIndex: state.selectedQuestionIndex + 1,
                    selectedQuestion: quiz.quizzes?.items[0]?.question.at(
                      state.selectedQuestionIndex
                    ),
                  },
                });
              }}
            >
              Inainte
            </PrimaryButton>
          </div>
        </div>
        <div className="allQuestions">
          <PrimaryButton
            className="sendButton"
            onClick={() => {
              setShowModal(true);
            }}
            disabled={state.correctedAnswers === undefined ? false : true}
          >
            Finalizeaza chestionar
          </PrimaryButton>
          {quiz?.quizzes?.items[0]!.question.map((question, index) => {
            return (
              <p
                key={question.id}
                className="questionCard"
                style={{
                  backgroundColor:
                    state.correctedAnswers === undefined
                      ? "white"
                      : checkIfQuestionHasCorrectResponse(question.id)
                      ? "red"
                      : "green",
                }}
                onClick={() => {
                  dispatch({
                    type: QuizActionTypeEnum.ChangeQuestion,
                    payload: {
                      selectedQuestion: question,
                      selectedQuestionIndex: index + 1,
                    },
                  });
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