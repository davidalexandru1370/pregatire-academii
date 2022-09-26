import React, { useState } from "react";
//@ts-ignore
import ReactPortal from "../ReactPortal/ReactPortal.ts";
import "./forgotPasswordModal.scss";

interface IModal {
  isOpen: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onClick?: () => void;
}

const ForgotPasswordModal = ({ isOpen, onClose, onOpen, onClick }: IModal) => {
  const wrapperName = "forgotPasswordModal";
  return (
    <ReactPortal wrapperId={wrapperName}>
      <div
        className="forgotPasswordModal"
        style={{ display: `${isOpen === true ? "flex" : "none"}` }}
      >
        <span>ti-ai uitat parola</span>
        <button
          type="button"
          onClick={(event) => {
            onClose && onClose();
            console.log("aici");
          }}
        >
          inchide
        </button>
      </div>
    </ReactPortal>
  );
};

export default ForgotPasswordModal;
