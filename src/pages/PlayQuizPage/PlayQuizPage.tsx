import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetQuizQuery } from "../../GraphQL/useGetQuiz";

interface IPlayQuiz {
  quizId: string;
}

export const PlayQuizPage: FC<IPlayQuiz> = ({ quizId }: IPlayQuiz) => {
  const { room } = useParams();
  const { loading, data, error } = useGetQuizQuery({
    variables: { id: quizId },
  });

  return <div>{room}</div>;
};
