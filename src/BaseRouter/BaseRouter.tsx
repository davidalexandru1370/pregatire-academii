import { Outlet } from "react-router-dom";
//@ts-ignore
import NavigationBar from "../Components/NavigationBar/NavigationBar.tsx";
//@ts-ignore
import MobileNavBar from "../Components/MobileNavigationBar/MobileNavBar.tsx";
import {
  AuthentificationContext,
  AuthentificationContextProvider,
} from "../Context/AuthentificationContext";
import { useContext } from "react";

const BaseRouter = () => {
  const { isAuthentificated, setIsAuthentificated } = useContext(
    AuthentificationContext
  );
  console.log(isAuthentificated);

  return (
    <div>
      {isAuthentificated === true && <NavigationBar />}
      <Outlet />
      {isAuthentificated === true && <MobileNavBar />}
    </div>
  );
};

export default BaseRouter;
