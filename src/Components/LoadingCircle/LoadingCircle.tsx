import React, { FC, useState } from "react";
import "./LoadingCircle.scss";

const LoadingCircle: FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  if (isLoading === false) {
    return null;
  }

  return (
    <div>
      <span className="circle" style={style} />
    </div>
  );
};

export default LoadingCircle;
