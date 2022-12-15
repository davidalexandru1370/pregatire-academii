import { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetQuizQuery } from "../../GraphQL/useGetQuiz";
import "./PlayQuizPage.scss";
interface IPlayQuiz {
  quizId: string;
}

export const PlayQuizPage: FC<IPlayQuiz> = ({ quizId }: IPlayQuiz) => {
  const { room } = useParams();
  const state = useLocation();
  const { loading, data, error } = useGetQuizQuery({
    variables: { id: room },
  });

  console.log(state.state);

  return <div className="playQuizContent">{room}</div>;
};
