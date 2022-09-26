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
  const [_isOpen, setIsOpen] = useState<boolean>(isOpen);
  return (
    <ReactPortal wrapperId="forgotPasswordModal">
      <div
        className="forgotPasswordModal"
        style={{ display: `${_isOpen === true ? "none" : "block"}` }}
      >
        <span>ti-ai uitat parola</span>
        <button
          type="button"
          onClick={(event) => {
            onClose && onClose();
            setIsOpen(false);
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
