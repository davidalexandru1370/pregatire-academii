import React, { FC } from "react";

interface IToolTip {
  className?: string;
  style?: string;
  children?: React.ReactNode;
}

export const ToolTip: FC<IToolTip> = ({ className, style, children }) => {
  return <div>{children}</div>;
};
