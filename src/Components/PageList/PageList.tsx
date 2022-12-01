import React, { FC } from "react";
import "./PageList.scss";

interface IPageList {
  currentPage: number;
  totalNumberOfPages: number;
  onNextPageClick: () => void;
  onPreviousPageClick: () => void;
  onPageClick: () => void;
}

export const PageList: FC<IPageList> = ({
  currentPage,
  totalNumberOfPages,
  onNextPageClick,
  onPreviousPageClick,
  onPageClick,
}: IPageList) => {
  return (
    <div className="pageList">
      <button
        disabled={currentPage! === 1}
        onClick={() => {
          onPreviousPageClick();
        }}
      >
        Pagina anteriora
      </button>
    </div>
  );
};
