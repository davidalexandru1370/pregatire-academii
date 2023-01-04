import React, { FC } from "react";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import ReactPortal from "../ReactPortal/ReactPortal";
import "./AreYouSureModal.module.scss";
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
      <div className="areYouSureWrapper">
        <div className="areYouSureContainer">
          <span className="material-symbols-outlined closeIcon">close</span>
          <span className="material-symbols-outlined checkIcon">
            check_circle
          </span>
          <p className="areYouSureText">
            {text ?? "Esti sigur ca doresti sa continui?"}
          </p>
          <div className="areYouSureButtons">
            <PrimaryButton className="noButton">
              {noMessage ?? "Nu"}
            </PrimaryButton>
            <PrimaryButton className="yesButton">
              {yesMessage ?? "Da"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};
