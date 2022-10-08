import React, { useEffect } from "react";
import { useState } from "react";
import { FC } from "react";
//@ts-ignore
import LoadingCircle from "../LoadingCircle/LoadingCircle.tsx";
import "./ButtonWithLoading.scss";

const ButtonWithLoading: FC<{
  style?: React.CSSProperties;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}> = ({ style, className, onClick, disabled = false, children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isWaitingForFetch, setIsWaitingForFetch] = useState<boolean>(true);

  useEffect(() => {
    if (loading === false) {
      return;
    }

    const handle = async () => {
      onClick && (await onClick());
      setLoading(false);
      setIsWaitingForFetch(false);
    };

    handle();

    return () => {
      setLoading(false);
    };
  }, [loading]);

  return (
    <div>
      <button
        style={style}
        type="button"
        className={`loadingButton ${className}`}
        disabled={isWaitingForFetch || disabled}
        onClick={() => {
          setLoading(true);
          setIsWaitingForFetch(true);
        }}
      >
        {children}
      </button>
      {loading === true && <LoadingCircle loading={true} />}
    </div>
  );
};

export default ButtonWithLoading;
