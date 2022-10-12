import React from "react";

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

interface IToast {
  corner: Corner;
  style?: React.CSSProperties;
  className?: string;
  text: string;
  timer?: number;
  type: ToastTypes;
  pauseOnHover: boolean;
  draggable: boolean;
}

function createCornerStyle(corner: Corner): string {
  switch (corner) {
    case Corner.topRight: {
      break;
    }
  }

  return "";
}

const Toast = ({
  corner,
  style,
  className,
  text,
  timer,
  type,
  pauseOnHover = false,
  draggable = true,
}: IToast) => {
  return <div></div>;
};

export default Toast;
