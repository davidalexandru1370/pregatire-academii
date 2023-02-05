import React, { Ref } from "react";

interface IModal {
  className?: string;
  children?: any;
}

export const Modal = React.forwardRef<HTMLDivElement, IModal>(
  ({ children, ...modalProps }, ref: Ref<HTMLDivElement>) => {
    return <></>;
  }
);
