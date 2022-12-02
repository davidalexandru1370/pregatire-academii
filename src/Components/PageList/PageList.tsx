import React, { FC } from "react";
import "./PageList.scss";

interface IPageList {
  currentPage: number;
  className?: string;
  style?: React.CSSProperties;
  totalNumberOfPages: number;
  getData: () => any;
  onNextPageClick?: () => void;
  onPreviousPageClick?: () => void;
  onPageClick?: () => void;
}

export const PageList: FC<IPageList> = ({
  currentPage,
  totalNumberOfPages,
  onNextPageClick,
  onPreviousPageClick,
  className,
  getData,
  style,
  onPageClick,
}: IPageList) => {
  return (
    <div className={`pageList ${className}`} style={style}>
      <button
        disabled={currentPage === 1}
        onClick={() => {
          onPreviousPageClick && onPreviousPageClick();
        }}
        className="actionButton"
      >
        Pagina anteriora
      </button>
      <div className="pageItems">
        {Array.from({ length: 5 }, (_, i: number) => {
          return currentPage - 2 + i;
        }).map((page) => {
          if (page >= 1 && page <= totalNumberOfPages) {
            return (
              <p
                className={`pageNumber ${
                  page === currentPage ? "activePageNumber" : ""
                }`}
              >
                {page}
              </p>
            );
          }
        })}
      </div>
      <button
        disabled={currentPage >= totalNumberOfPages}
        onClick={() => {
          onNextPageClick && onNextPageClick();
        }}
        className="actionButton"
      >
        Pagina urmatoare
      </button>
    </div>
  );
};
