import React, { FC } from "react";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import ReactPortal from "../ReactPortal/ReactPortal";
import styles from "./AreYouSureModal.module.scss";
interface IAreYouSure {
  className?: string;
  style?: React.CSSProperties;
  onYesClick: () => void;
  onCancelClick: () => void;
  text?: string;
  yesMessage?: string;
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
  noMessage,
  visibility,
}) => {
  const wrapperId: string = "areYouSureWrapper";

  return (
    <ReactPortal wrapperId={wrapperId}>
      <div className={styles.areYouSureWrapper}>
        <div className={styles.areYouSureContainer}>
          <span className={`material-symbols-outlined ${styles.closeIcon}`}>
            close
          </span>
          <span className={`material-symbols-outlined ${styles.checkIcon}`}>
            check_circle
          </span>
          <p className={styles.areYouSureText}>
            {text ?? "Esti sigur ca doresti sa continui?"}
          </p>
          <div className={styles.areYouSureButtons}>
            <PrimaryButton className={styles.noButton}>
              {noMessage ?? "Anuleaza"}
            </PrimaryButton>
            <PrimaryButton className={styles.yesButton}>
              {yesMessage ?? "Da"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};
