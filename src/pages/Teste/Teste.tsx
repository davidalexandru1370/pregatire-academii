import "./Teste.scss";
import DropDown from "../../Components/DropDown/DropDown";
import constants from "../../Constants/constants.json";
import TestCard from "../../Components/TestCard/TestCard";
import { useEffect, useState } from "react";
import ButtonWithDropDown from "../../Components/ButtonWithDropDown/ButtonWithDropDown";
import { useGetPageQuizzesQuery } from "../../GraphQL/generated/graphql";
import { toast } from "react-toastify";
import LoadingCircle from "../../Components/LoadingCircle/LoadingCircle";
import { Quiz } from "../../Models/Quiz";
import { PageList } from "../../Components/PageList/PageList";

export const Teste = () => {
  const { loading, error, data } = useGetPageQuizzesQuery({
    defaultOptions: { variables: { skip: 0, take: 12 } },
  });
  const [isLeftMenuVisible, setIsLeftMenuVisible] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    if (!!error) {
      toast("Chestionarele nu au putut fi incarcate!", {
        type: "error",
      });
    }
  }, [error]);

  return (
    <div className="testePage">
      <div className="container">
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
          {loading === false && (
            <p className="totalCount">
              {data && data.quizzes && data.quizzes.totalCount} rezultate{" "}
            </p>
          )}
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
                {data &&
                  data.quizzes &&
                  data.quizzes.items &&
                  data.quizzes.items!.map((quiz: Quiz) => {
                    return <TestCard quiz={quiz} />;
                  })}
              </div>
            )}
            <PageList
              currentPage={currentPage}
              totalNumberOfPages={
                (data && data.quizzes && data.quizzes.totalCount) || 0
              }
              onPageClick={() => {}}
              onPreviousPageClick={() => {}}
              onNextPageClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
