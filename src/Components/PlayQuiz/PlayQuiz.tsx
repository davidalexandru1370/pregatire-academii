import React, { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { Type } from "typescript";

interface SubComponent {
  displayName: string;
}

type stringOrJSXElementConstructor = string | JSXElementConstructor<any>;

interface ISubComponent extends ReactElement {
  type: stringOrJSXElementConstructor & SubComponent;
}

const getChildrenOnDisplayName = (
  children: React.ReactElement & ISubComponent,
  displayName: string
) => {
  return React.Children.map(children, (child: ISubComponent) => {
    return child.type.displayName === displayName ? child : null;
  });
};

export const PlayQuiz = () => {
  return <div>PlayQuiz</div>;
};
