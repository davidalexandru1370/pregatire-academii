import { FC, useRef } from "react";
import { Quiz } from "../../Models/Quiz";
import "./TestCard.scss";

interface ITestCard {
  quiz: Quiz;
  onClick: () => void;
}

const TestCard: FC<ITestCard> = ({ quiz, onClick }: ITestCard) => {
  const parentPlayButton = useRef<HTMLDivElement>(null);
  return (
    <div className="testCard">
      <div className="testTitle">Admitere</div>
      <div className="testContent">
        <p>Categorie: {quiz.category}</p>
        <p>An: {quiz.year}</p>
        <p>Proba: {quiz.subject}</p>
        <p>Timp: 60 minute</p>
        <p>Punctaj maxim: 100</p>
        <p>Punctajul tau: 0</p>
      </div>
      <div ref={parentPlayButton} className="play">
        <button type="button" className="startButton" onClick={() => onClick()}>
          Incepe
        </button>
      </div>
    </div>
  );
};

export default TestCard;
