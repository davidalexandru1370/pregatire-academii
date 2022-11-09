import "./Teste.scss";
//@ts-ignore
import DropDown from "../../Components/DropDown/DropDown.tsx";
import constants from "../../Constants/constants.json";
//@ts-ignore
import TestCard from "../../Components/TestCard/TestCard.tsx";
//@ts-ignore
import { useState } from "react";
//@ts-ignore
import ButtonWithDropDown from "../../Components/ButtonWithDropDown/ButtonWithDropDown.tsx";
//@ts-ignore
import { useGetQuizzesQuery } from "../../GraphQL/generated/schema.ts";
//@ts-ignore
import LoadingCircle from "../../Components/LoadingCircle/LoadingCircle.tsx";

export const Teste = () => {
  const { loading, error, data } = useGetQuizzesQuery();
  const [isLeftMenuVisible, setIsLeftMenuVisible] = useState<boolean>(true);

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
        {loading === false && <p>{data.quizzes.length} rezultate </p>}
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
          {loading === true ? (
            <div className="loadingContainer">
              <span style={{ fontSize: "2rem" }}>Se incarca... &nbsp;</span>
              <LoadingCircle className="loadingCircle" />
            </div>
          ) : (
            <div className="testCards">
              {data.quizzes.map((quiz: Quiz) => {
                return <TestCard quiz={quiz} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
