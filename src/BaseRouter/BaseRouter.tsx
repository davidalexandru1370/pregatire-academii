import { Outlet } from "react-router-dom"
//@ts-ignore
import { NavigationBar } from "../Components/NavigationBar/NavigationBar.tsx"
const BaseRouter = () => {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <Outlet />
        </div>
    );
};

export default BaseRouter;