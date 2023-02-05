import React, { Ref } from "react";
import ReactPortal from "../ReactPortal/ReactPortal";

interface IModal {
  className?: string;
  children?: any;
}

export const Modal = React.forwardRef<HTMLDivElement, IModal>(
  ({ children, ...modalProps }, ref: Ref<HTMLDivElement>) => {
    return (
      <ReactPortal wrapperId="da">
        <div ref={ref}></div>
      </ReactPortal>
    );
  }
);
