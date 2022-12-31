import React, { FC, Ref, RefObject } from "react";
import "./PrimaryButton.scss";

interface IPrimaryButton extends Partial<React.HTMLProps<HTMLButtonElement>> {
  children?: any;
}

export const PrimaryButton = React.forwardRef<
  HTMLButtonElement,
  IPrimaryButton
>(({ children, ...buttonProps }, ref: Ref<HTMLButtonElement>) => {
  return (
    <div>
      <button
        ref={ref}
        style={buttonProps?.style}
        className={`primaryButton ${buttonProps?.className}`}
        onClick={buttonProps?.onClick}
      >
        {children}
      </button>
    </div>
  );
});
