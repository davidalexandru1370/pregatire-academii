import React, { useLayoutEffect, useRef } from "react";
import "./Toast.scss";
import { v4 as uuidv4 } from "uuid";

enum Corner {
  topRight,
  topLeft,
  bottomRight,
  bottomLeft,
}

enum ToastTypes {
  success,
  error,
}

export interface IToast {
  id: uuidv4;
  corner: Corner;
  style?: React.CSSProperties;
  className?: string;
  text: string;
  timer?: number;
  type: ToastTypes;
  pauseOnHover: boolean;
  draggable: boolean;
}

function createCornerStyle(corner: Corner): React.CSSProperties {
  var result: React.CSSProperties;
  switch (corner) {
    case Corner.topRight: {
      result.top = "0";
      result.right = "0";
      return result;
    }

    case Corner.topLeft: {
      result.top = "0";
      result.left = "0";
      return result;
    }

    case Corner.bottomLeft: {
      result.bottom = "0";
      result.left = "0";
      return result;
    }

    case Corner.bottomRight: {
      result.bottom = "0";
      result.right = "0";
      return result;
    }
  }
}

const Toast = ({
  id,
  corner,
  style,
  className,
  text,
  timer,
  type,
  pauseOnHover = false,
  draggable = true,
}: IToast) => {
  useLayoutEffect(() => {
    let parentContainer = useRef<HTMLDivElement>(
      document.getElementById("toastContainer") as HTMLDivElement
    );
    console.log(parentContainer);
  }, []);

  return (
    <div
      className={`toast ${className}`}
      style={{ ...style, ...createCornerStyle(corner) }}
    >
      <span className="material-symbols-outlined">error</span>
    </div>
  );
};

function toast({
  corner,
  style,
  className,
  text,
  timer,
  type,
  pauseOnHover = false,
  draggable = true,
}: IToast): void {}

export default Toast;
