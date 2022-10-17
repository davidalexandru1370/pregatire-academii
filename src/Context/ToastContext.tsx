import React, {
  createContext,
  ReducerAction,
  useContext,
  useReducer,
} from "react";
//@ts-ignore
import { IToast } from "../Components/ToastNotification/Toast.tsx";
import { v4 as uuidv4 } from "uuid";

export const ToastContext = createContext(null);

export enum ToastActionType {
  ADD,
  DELETE,
}

const ToastContextProvider = ({ children }) => {
  const toastNotifications: IToast[] = [];

  const [state, dispatch] = useReducer(
    (state: IToast[], action: Partial<IToast>) => {
      switch (action) {
        case ToastActionType.ADD:
          return [...state, action];
        case ToastActionType.DELETE:
          return state.filter((notification: Partial<IToast>) => {
            return notification.id !== action.id;
          });
        default:
          return state;
      }
    },
    toastNotifications
  );

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
