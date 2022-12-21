import React, {
  FC,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
} from "react";

interface SubComponent {
  displayName: string;
}

type stringOrJSXElementConstructor = string | JSXElementConstructor<any>;

interface ISubComponent extends ReactElement {
  type: stringOrJSXElementConstructor & SubComponent;
}

interface IPlayQuiz extends ISubComponent {
  Question: FC<any>;
  Answer: FC<any>;
}

const getChildrenOnDisplayName = (
  children: React.ReactElement & ISubComponent,
  displayName: string
) => {
  return React.Children.map(children, (child: ISubComponent) => {
    return child.type.displayName === displayName ? child : null;
  });
};

export const PlayQuiz: FC<IPlayQuiz> = (children: ISubComponent) => {
  const question = getChildrenOnDisplayName(children, "Question");
  const answer = getChildrenOnDisplayName(children, "Answer");
  return (
    <div>
      {question}
      {answer}
    </div>
  );
};

const Question: FC<ISubComponent> = () => {
  return <div></div>;
};

Question.displayName = "Question";
PlayQuiz.defaultProps!.Question = Question;
