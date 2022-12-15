import { stringify } from "querystring";
import { FC } from "react";
import { Location, useLocation, useParams } from "react-router-dom";
import { useGetQuizQuery } from "../../GraphQL/useGetQuiz";
import { Room } from "../../Models/Room";
import "./PlayQuizPage.scss";

interface IPlayQuiz {
  roomId: string;
}

export const PlayQuizPage: FC<IPlayQuiz> = ({ roomId }: IPlayQuiz) => {
  const state: Location = useLocation();
  const room: Room = state.state as Room;

  const { loading, data, error } = useGetQuizQuery({
    variables: { id: room.quizId },
  });
  return (
    <div className="playQuizContent">
      <p>{room.roomId}</p>
    </div>
  );
};
