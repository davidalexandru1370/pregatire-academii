import React, { FC, useEffect, useState } from "react";
import "./LoadingCircle.scss";

const LoadingCircle: FC<{
  style?: React.CSSProperties;
  className?: string;
  loading?: boolean;
  onLoading?: () => void;
}> = ({ style, className, loading, onLoading }) => {
  console.log(loading);

  const [isLoading, setIsLoading] = useState<boolean>(loading);

  useEffect(() => {
    const abortController = new AbortController();
    if (isLoading === true) {
      const changeToAsync = async () => {
        onLoading && (await onLoading());
      };
      changeToAsync();
    }
    return () => {
      abortController.abort();
      setIsLoading(false);
    };
  }, [loading]);

  return (
    <div>
      <span className="circle" style={style} />
    </div>
  );
};

export default LoadingCircle;
