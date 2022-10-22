import "./Teste.scss";
//@ts-ignore
import DropDown from "../../Components/DropDown/DropDown.tsx";
import constants from "../../Constants/constants.json";
//@ts-ignore
import TestCard from "../../Components/TestCard/TestCard.tsx";
//@ts-ignore
import ButtonWithDropDown from "../../Components/ButtonWithDropDown/ButtonWithDropDown.tsx";
import { useMemo, useState, useEffect } from "react";
import Latex from "react-latex";

export const Teste = () => {
  const [isLeftMenuVisible, setIsLeftMenuVisible] = useState<boolean>(true);
  const quizzes = useMemo(() => {}, []);
  useEffect(() => {
    first;

    return () => {
      second;
    };
  }, [third]);

  return (
    <div className="testePage">
      <div className="testeItems">
        <div className="filterAndSort">
          <button
            type="button"
            className="filterHideButton"
            onClick={() => {
              setIsLeftMenuVisible(!isLeftMenuVisible);
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "20px" }}
            >
              filter_list
            </span>
            <span className="filterText">&nbsp;Filter</span>
          </button>
          <ButtonWithDropDown title="Sort by" />
        </div>
        <p>0 rezultate</p>
      </div>
      <div className="content">
        <div
          className={`leftMenuBar ${
            isLeftMenuVisible === true ? "" : "leftMenuBarAnimation"
          }`}
        >
          <div className="filterCard">
            <div className="cardItem">
              <span>Categoria</span>
              <DropDown items={constants.academies} />
            </div>
            <div className="cardItem">
              <span>Anul</span>
              <DropDown items={constants.academies} />
            </div>
            <div className="cardItem d-flex justify-content-center pt-3">
              <button type="button" className=" text-white filterButton">
                Filtreaza
              </button>
            </div>
          </div>
        </div>
        <div className="rightPart">
          <div className="testCards">
            <TestCard />
            <TestCard />
            <TestCard />
          </div>
        </div>
      </div>
    </div>
  );
};
