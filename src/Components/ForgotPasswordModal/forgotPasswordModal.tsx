import { useEffect, useRef, useState } from "react";
//@ts-ignore
import ReactPortal from "../ReactPortal/ReactPortal.ts";
import "./forgotPasswordModal.scss";
//@ts-ignore
import { ForgotPassword as handleForgotPassword } from "../../pages/api/UserAPI.ts";
//@ts-ignore
import LoadingCircle from "../LoadingCircle/LoadingCircle.tsx";

interface IModal {
  isOpen: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onClick?: () => void;
}

const ForgotPasswordModal = ({ isOpen, onClose, onOpen, onClick }: IModal) => {
  const wrapperName = "forgotPasswordModal";
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>("");
  const [emailInputValue, setEmailInputValue] = useState<string>("");
  const [show, setShow] = useState<boolean>(isOpen);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        wrapperRef.current !== null &&
        !wrapperRef.current.contains(event.target) &&
        show === true
      ) {
        onClose && onClose();
        setShow(false);
      }
    };

    const handleKeyboardPress = (event) => {
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

  const handleSendClick = async () => {
    let data = null;
    try {
      data = await handleForgotPassword(emailInputValue);
      setError("");
    } catch (e) {
      setError(e);
    }
  };

  return (
    <ReactPortal wrapperId={wrapperName}>
      <div
        className="forgotPasswordModalWrapper"
        style={{ display: `${show === true ? "flex" : "none"}` }}
      >
        <div className="forgotPasswordModal">
          <div className="forgotPasswordcontent" ref={wrapperRef}>
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
            <span className="invalidEmail">{error}</span>
            <button
              type="button"
              className="closeButton"
              disabled={emailInputValue.trim().length === 0 ? true : false}
              onClick={async () => {
                await handleSendClick();
              }}
            >
              <LoadingCircle />
              Trimite
            </button>

            <span
              className="material-symbols-outlined closeIcon"
              onClick={() => {
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
