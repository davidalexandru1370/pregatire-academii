import React, { Ref } from "react";
import ReactPortal from "../ReactPortal/ReactPortal";
import styles from "./Modal.module.scss";

interface IModal {
  className?: string;
  children?: React.ReactElement;
}

export const Modal = React.forwardRef<HTMLDivElement, IModal>(
  ({ children, ...modalProps }, ref: Ref<HTMLDivElement>) => {
    return (
      <ReactPortal wrapperId="da">
        <div ref={ref} className={styles.Modal}>
          {children}
        </div>
      </ReactPortal>
    );
  }
);
