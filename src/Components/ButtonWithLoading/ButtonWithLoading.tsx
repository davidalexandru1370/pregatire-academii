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
  waitingText: string;
  children: React.ReactNode;
}> = ({
  style,
  className,
  onClick,
  waitingText,
  disabled = false,
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isWaitingForFetch, setIsWaitingForFetch] = useState<boolean>(false);

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
      {isWaitingForFetch === true ? (
        <>
          {waitingText}
          <LoadingCircle
            loading={true}
            style={{ right: 0, marginRight: "10px", top: "30%" }}
          />
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonWithLoading;
