import React, { createContext, FC, useState, useContext } from "react";

export interface IAuthentificationContext {
  isAuthentificated: boolean;
  setIsAuthentificated: (newIsAuthentificated: boolean) => void;
}
  
export const AuthentificationContext = createContext<IAuthentificationContext>({
  isAuthentificated: false,
  setIsAuthentificated: () => null,
});

export const useAuthentificationContext = () =>
  useContext(AuthentificationContext);

export const AuthentificationContextProvider: FC<any> = ({ children }) => {
  const [isAuthentificated, setIsAuthentificated] = useState<boolean>(false);
  return (
    <AuthentificationContext.Provider
      value={{ isAuthentificated, setIsAuthentificated }}
    >
      {children}
    </AuthentificationContext.Provider>
  );
};
