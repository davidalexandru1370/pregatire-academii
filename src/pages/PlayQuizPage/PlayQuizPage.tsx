import { stringify } from "querystring";
import { FC } from "react";
import { Location, useLocation, useParams } from "react-router-dom";
import { PlayQuiz } from "../../Components/PlayQuiz/PlayQuiz";
import { useGetQuizQuery } from "../../GraphQL/useGetQuiz";
import { Room } from "../../Models/Room";
import "./PlayQuizPage.scss";

export const PlayQuizPage: FC = () => {
  const state: Location = useLocation();
  const room: Room = state.state as Room;

  const { loading, data, error } = useGetQuizQuery({
    variables: { id: room.quizId },
  });

  return (
    <div className="playQuizContent">
      <PlayQuiz>
        <PlayQuiz.Question></PlayQuiz.Question>
      </PlayQuiz>
    </div>
  );
};
