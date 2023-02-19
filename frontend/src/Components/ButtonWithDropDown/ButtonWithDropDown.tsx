import React, { FC, useEffect, useRef, useState } from "react";
import DropDown, { DropDownRef } from "../DropDown/DropDown";
import "./ButtonWithDropDown.scss";

interface IButtonWithDropDown {
  style?: React.CSSProperties;
  className?: string;
  title?: string;
  options?: string[];
  onChange?: () => void;
  initialValue?: string;
}

const dropDownStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "10px",
  backgroundColor: "whitesmoke",
  color: "black",
};

const dropDownArrowStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  color: "white",
};

const ButtonWithDropDown: FC<IButtonWithDropDown> = ({
  style,
  className,
  title,
  options,
  onChange,
  initialValue,
}: IButtonWithDropDown) => {
  const buttonWithDropDownRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<DropDownRef>(null);
  const [clicked, setClicked] = useState<boolean>(false);
  const dropDownWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        dropDownWrapperRef.current?.contains(event.target as Node) === false &&
        buttonWithDropDownRef.current?.contains(event.target as Node) === true
      ) {
        dropDownWrapperRef.current?.click();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [clicked]);

  return (
    <div
      ref={buttonWithDropDownRef}
      style={style}
      className={`buttonWithDropDown ${className}`}
      onClick={() => {
        if (clicked === false) {
          setClicked(true);
        }
      }}
    >
      <div className="title">{title}</div>
      <div
        ref={dropDownWrapperRef}
        className="dropDownSpace"
        onClick={(event) => {
          event.stopPropagation();
          dropDownRef.current?.click();
          event.stopPropagation();
        }}
      >
        <DropDown
          ref={dropDownRef}
          style={dropDownStyle}
          items={options || []}
          arrowStyle={dropDownArrowStyle}
          onChange={() => {
            setClicked(false);
          }}
        />
      </div>
    </div>
  );
};

export default ButtonWithDropDown;
