import { FC, useEffect, useState } from "react";
import { Location, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { PlayQuiz } from "../../Components/PlayQuiz/PlayQuiz";
import { useGetQuizQuery } from "../../GraphQL/useGetQuiz";
import { Quiz } from "../../Models/Quiz";
import { Room } from "../../Models/Room";
import "./PlayQuizPage.scss";

export const PlayQuizPage: FC = () => {
  const state: Location = useLocation();
  const room: Room = state.state as Room;
  const {
    loading,
    data: quiz,
    error,
    refetch,
  } = useGetQuizQuery({
    variables: { id: room.quizId },
  });

  useEffect(() => {
    if (error) {
      toast("A aparut o eroare!", {
        type: "error",
      });
      refetch({
        id: room.quizId,
      });
    }
  }, [loading, quiz, error]);

  if (loading === true || quiz === undefined) {
    return <></>;
  }

  return (
    <div className="playQuizContent">
      <PlayQuiz quiz={quiz}></PlayQuiz>
    </div>
  );
};
