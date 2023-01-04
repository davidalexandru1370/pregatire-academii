import React, { Ref } from "react";
import "./PrimaryButton.scss";

interface IPrimaryButton
  extends Partial<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  > {
  children?: any;
}

export const PrimaryButton = React.forwardRef<
  HTMLButtonElement,
  IPrimaryButton
>(({ children, ...buttonProps }, ref: Ref<HTMLButtonElement>) => {
  return (
    <div>
      <button
        {...buttonProps}
        className={`primaryButton ${buttonProps.className}`}
        ref={ref}
      >
        {children}
      </button>
    </div>
  );
});
