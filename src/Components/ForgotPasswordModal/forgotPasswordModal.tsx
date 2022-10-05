import React, { useEffect, useRef, useState } from "react";
//@ts-ignore
import ReactPortal from "../ReactPortal/ReactPortal.ts";
import "./forgotPasswordModal.scss";
//@ts-ignore
import { ForgotPassword as handleForgotPassword } from "../../pages/api/UserAPI.ts";

interface IModal {
  isOpen: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onClick?: () => void;
}

const ForgotPasswordModal = ({ isOpen, onClose, onOpen, onClick }: IModal) => {
  const wrapperName = "forgotPasswordModal";
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [emailInputValue, setEmailInputValue] = useState<string>("");
  const [show, setShow] = useState<boolean>(isOpen);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        wrapperRef &&
        !wrapperRef.current.contains(event.target) &&
        show === true
      ) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return (
    <ReactPortal wrapperId={wrapperName}>
      <div
        className="forgotPasswordModalWrapper"
        style={{ display: `${show === true ? "flex" : "none"}` }}
        ref={wrapperRef}
      >
        <div className="forgotPasswordModal">
          <div className="forgotPasswordcontent">
            <div className="forgotPasswordForm">
              <label htmlFor="">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                onChange={(event) => {
                  setEmailInputValue(event.target.value);
                }}
              />
            </div>
            <button
              type="button"
              className="closeButton"
              disabled={emailInputValue.trim().length === 0 ? true : false}
            >
              Trimite
            </button>
            <span
              className="material-symbols-outlined closeIcon"
              onClick={() => {
                console.log(inputRef.current);
                onClose && onClose();

                setShow(false);
              }}
            >
              close
            </span>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default ForgotPasswordModal;
