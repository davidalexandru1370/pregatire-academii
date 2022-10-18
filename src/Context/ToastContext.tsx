import { createContext, useEffect, useReducer, useRef } from "react";
//@ts-ignore
import { IToast } from "../Components/ToastNotification/Toast.tsx";

interface IToastContext {
  state: IToast[];
  dispatch: React.Dispatch<any>;
}

export const ToastContext = createContext<IToastContext>({
  state: [],
  dispatch: () => null,
});

export enum ToastActionType {
  ADD,
  DELETE,
}

const ToastContextProvider = ({ children }) => {
  const toastNotifications = useRef<IToast[]>([]);

  const [state, dispatch] = useReducer(
    (state: IToast[], action: Partial<IToast>) => {
      switch (action) {
        case ToastActionType.ADD:
          setTimeout(() => {
            dispatch(action);
          }, action.timer);
          return [...state, action];
        case ToastActionType.DELETE:
          return state.filter((notification: Partial<IToast>) => {
            return notification.id !== action.id;
          });
        default:
          return state;
      }
    },
    toastNotifications.current
  );

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
