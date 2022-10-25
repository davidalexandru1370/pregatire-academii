import { FC, useRef } from "react";
import "./TestCard.scss";

const TestCard: FC<{}> = ({}) => {
  const parentPlayButton = useRef<HTMLDivElement>(null);

  return (
    <div className="testCard">
      <div className="testTitle">Admitere</div>
      <div className="testContent">
        <p>Categorie:</p>
        <p>An:</p>
        <p>Timp:</p>
        <p>Punctaj maxim:</p>
        <p>Punctajul tau:</p>
      </div>
      <div ref={parentPlayButton} className="play">
        <button type="button" className="startButton">
          Incepe
        </button>
      </div>
    </div>
  );
};

export default TestCard;
