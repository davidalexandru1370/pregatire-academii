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
  text: string;
}> = ({ style, className, onClick, text }) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (loading === false) {
      return;
    }

    const handle = async () => {
      onClick && (await onClick());
      setLoading(false);
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
        className={`loadingButton ${className}`}
        onClick={() => {
          setLoading(true);
        }}
      >
        {text}
      </button>
      {loading && LoadingCircle}
    </div>
  );
};

export default ButtonWithLoading;
