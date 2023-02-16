import { useEffect, useRef, useState } from "react";
import ReactPortal from "../ReactPortal/ReactPortal";
import "./forgotPasswordModal.scss";
import { ForgotPassword as handleForgotPassword } from "../../api/UserAPI";
import { toast } from "react-toastify";
import ButtonWithLoading from "../ButtonWithLoading/ButtonWithLoading";
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
    const handleClick = (event: any) => {
      if (
        wrapperRef.current !== null &&
        !wrapperRef.current.contains(event.target) &&
        show === true
      ) {
        onClose && onClose();
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

  useEffect(() => {
    onOpen && onOpen();
  }, []);

  const handleSendClick = async () => {
    try {
      await handleForgotPassword(emailInputValue);
      setError("");
      toast("Email-ul a fost trimis cu succes!", {
        position: "top-right",
        type: "success",
      });
    } catch (e: any) {
      setError(e.toString());
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
            <ButtonWithLoading
              className="closeButton"
              waitingText="Se trimite..."
              disabled={emailInputValue.trim().length === 0 ? true : false}
              onClick={async () => {
                onClick && onClick();
                await handleSendClick();
              }}
            >
              Trimite
            </ButtonWithLoading>
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
