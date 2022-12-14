import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonWithDropDown from "../../Components/ButtonWithDropDown/ButtonWithDropDown";
import DropDown from "../../Components/DropDown/DropDown";
import LoadingCircle from "../../Components/LoadingCircle/LoadingCircle";
import { PageList } from "../../Components/PageList/PageList";
import TestCard from "../../Components/TestCard/TestCard";
import constants from "../../Constants/constants.json";
import { useGetPageQuizzesQuery } from "../../GraphQL/generated/graphql";
import {
  GetQuizQuery,
  useGetQuizQuery,
  useGetQuizQueryLazy,
} from "../../GraphQL/useGetQuiz";
import { Quiz } from "../../Models/Quiz";
import "./Teste.scss";
export const Teste = () => {
  const maximumNumberOfQuizzesOnPage: number = 12;
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(maximumNumberOfQuizzesOnPage);

  const [quizId, setQuizId] = useState<any>();
  const [isLeftMenuVisible, setIsLeftMenuVisible] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { loading, error, data } = useGetPageQuizzesQuery({
    variables: { skip: skip, take: take },
  });

  const [getQuiz, clickedQuiz] = useGetQuizQueryLazy({
    variables: { id: quizId },
  });

  useEffect(() => {
    if (!!error) {
      toast("Chestionarele nu au putut fi incarcate!", {
        type: "error",
      });
    } else {
      data && data.quizzes && setTotalCount(data!.quizzes!.totalCount);
    }
  }, [error, data]);

  useEffect(() => {
    if (clickedQuiz.loading === false) {
      console.log(clickedQuiz.data?.quizzes?.items![0]);
    }
  }, [clickedQuiz]);

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
                    return (
                      <TestCard
                        quiz={quiz}
                        onClick={() => {
                          getQuiz({ variables: { id: quiz.id } });
                        }}
                      />
                    );
                  })}
              </div>
            )}
            <PageList
              currentPage={currentPage}
              style={{ marginBlock: "50px" }}
              totalNumberOfPages={
                (data &&
                  data.quizzes &&
                  Math.floor(
                    data.quizzes.totalCount / maximumNumberOfQuizzesOnPage
                  ) + 1) ||
                0
              }
              onPageClick={(page: number) => {
                const difference = currentPage - page;
                if (difference < 0) {
                  setSkip(skip - maximumNumberOfQuizzesOnPage * difference);
                } else {
                  setSkip(skip - maximumNumberOfQuizzesOnPage * difference);
                }
                setCurrentPage(page);
              }}
              onNextPageClick={() => {
                if (
                  currentPage <
                  ((data &&
                    data.quizzes &&
                    data.quizzes.totalCount / maximumNumberOfQuizzesOnPage +
                      1) ||
                    0)
                ) {
                  if (skip + maximumNumberOfQuizzesOnPage <= totalCount) {
                    setSkip(skip + maximumNumberOfQuizzesOnPage);
                  }
                  setCurrentPage(currentPage + 1);
                }
              }}
              onPreviousPageClick={() => {
                if (currentPage > 1) {
                  if (skip >= maximumNumberOfQuizzesOnPage) {
                    setSkip(skip - maximumNumberOfQuizzesOnPage);
                  }
                  setCurrentPage(currentPage - 1);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
