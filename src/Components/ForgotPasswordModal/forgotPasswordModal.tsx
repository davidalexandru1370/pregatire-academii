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
        className="forgotPasswordModalWrapper"
        style={{ display: `${isOpen === true ? "flex" : "none"}` }}
      >
        <div className="forgotPasswordModal">
          <div className="content">
            <span>ti-ai uitat parola</span>
            <button
              type="button"
              className="closeButton"
              onClick={(event) => {
                onClose && onClose();
              }}
            >
              Trimite
            </button>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default ForgotPasswordModal;
