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

  const { loading, data, error, refetch } = useGetQuizQuery({
    variables: { id: room.quizId },
  });

  console.log(data?.quizzes?.items![0]);

  useEffect(() => {
    if (error) {
      toast("A aparut o eroare!", {
        type: "error",
      });
      refetch({
        id: room.quizId,
      });
    }
  }, [loading, data, error]);

  if (loading) {
    return <></>;
  }

  // const quiz: Quiz = {
  //   id: data?.quizzes?.items![0].id,
  //   Question: data?.quizzes?.items![0].question,
  // };

  return (
    <div className="playQuizContent">
      <PlayQuiz quiz={{}}>
        <PlayQuiz.Question></PlayQuiz.Question>
      </PlayQuiz>
    </div>
  );
};
