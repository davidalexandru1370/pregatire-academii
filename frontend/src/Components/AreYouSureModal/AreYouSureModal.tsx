import React, { FC, useEffect, useRef, useState } from "react";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import ReactPortal from "../ReactPortal/ReactPortal";
import styles from "./AreYouSureModal.module.scss";
interface IAreYouSure {
  className?: string;
  style?: React.CSSProperties;
  onYesClick: () => void;
  onCancelClick: () => void;
  text?: string;
  onClose: () => void;
  yesMessage?: string;
  afterYesMessageClicked?: string;
  afterNoMessageClicked?: string;
  noMessage?: string;
  visibility: boolean;
}

export const AreYouSureModal: FC<IAreYouSure> = ({
  className,
  onCancelClick,
  onYesClick,
  style,
  text,
  yesMessage,
  afterYesMessageClicked,
  afterNoMessageClicked,
  noMessage,
  onClose,
  visibility,
}) => {
  const wrapperId: string = "areYouSureWrapper";
  const [show, setShow] = useState<boolean>(visibility);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [sendButtonClicked, setSendButtonClicked] = useState<boolean>(false);

  useEffect(() => {
    if (sendButtonClicked) {
      return;
    }
    const handleClick = (event: any) => {
      if (
        wrapperRef.current !== null &&
        !wrapperRef.current.contains(event.target) &&
        show === true
      ) {
        onClose();
        setShow(false);
      }
    };

    const handleKeyboardPress = (event: any) => {
      if (show === true && event.keyCode === 27) {
        onClose && onClose();
        setShow(false);
      }
    };

    if (show === true) {
      document.addEventListener("click", handleClick, true);
      document.addEventListener("keydown", handleKeyboardPress, true);
    }

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleClick, true);
    };
  }, [show]);

  return (
    <ReactPortal wrapperId={wrapperId}>
      <div
        className={styles.areYouSureWrapper}
        style={{ display: `${show === true ? "flex" : "none"}` }}
      >
        <div
          className={styles.areYouSureContainer}
          ref={wrapperRef}
          style={style}
        >
          <span
            className={`material-symbols-outlined ${styles.closeIcon}`}
            onClick={onClose}
          >
            close
          </span>
          <span className={`material-symbols-outlined ${styles.checkIcon}`}>
            check_circle
          </span>
          <p className={styles.areYouSureText}>
            {text ?? "Esti sigur ca doresti sa continui?"}
          </p>
          <div className={styles.areYouSureButtons}>
            <PrimaryButton className={styles.noButton} onClick={onCancelClick}>
              {noMessage ?? "Anuleaza"}
            </PrimaryButton>
            <PrimaryButton
              className={styles.yesButton}
              onClick={() => {
                setSendButtonClicked(true);
                onYesClick && onYesClick();
              }}
              disabled={sendButtonClicked}
            >
              {sendButtonClicked === false
                ? yesMessage ?? "Da"
                : afterYesMessageClicked}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};
