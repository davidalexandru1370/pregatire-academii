import { Outlet } from "react-router-dom";
//@ts-ignore
import NavigationBar from "../Components/NavigationBar/NavigationBar.tsx";
//@ts-ignore
import MobileNavBar from "../Components/MobileNavigationBar/MobileNavBar.tsx";
const BaseRouter = () => {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <Outlet />
            <MobileNavBar />
        </div>
    );
};

export default BaseRouter;