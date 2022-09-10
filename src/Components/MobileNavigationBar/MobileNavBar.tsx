import React, { useRef, useState } from "react";
//@ts-ignore
import useCurrentPath from "../../Hooks/useCurrentPath.ts";
import "./mobileNavBarStyle.scss";

interface INavigationItem {
    icon: string;
    name: string;
    path: string;
}

const MobileNavBar = () => {
    const clickItemClass: string = "navBarItemClicked";
    const navigationBarItems = useRef<INavigationItem[]>([{ icon: "home", name: "Acasa", path: "/mainpage" }, { icon: "article", name: "Teste", path: "/teste" }, { icon: "person", name: "Cont", path: "/contul_meu" }]);
    const previousLIElement = useRef<HTMLLIElement | null>(null);
    const [distance, setDistance] = useState<number>(0);
    const location = useCurrentPath();

    const computeDistance = (width: number, elementIndex: number): number => {
        return Math.trunc(width / navigationBarItems.current.length * elementIndex);
    }

    const toggleClassAtItemClick = (element: HTMLLIElement, index: number) => {
        if (previousLIElement.current === element) {
            return;
        }

        if (previousLIElement.current !== null && previousLIElement.current.classList.contains(clickItemClass) === true) {
            previousLIElement.current.classList.toggle(clickItemClass);
            const navBarWidth: number = 100;
            // setDistance(Math.trunc(navBarWidth / navigationBarItems.current.length * parseInt(element.accessKey)));
            setDistance(computeDistance(navBarWidth, parseInt(element.accessKey)));
        }

        element.classList.toggle(clickItemClass);
        previousLIElement.current = element;
    }

    const navBarItemCircle: Partial<React.CSSProperties> = {
        transition: "transform 0.3s",
        transform: `translateX(${distance}vw)`,
    };

    const initializeNavBar = () => {
        for (let item of navigationBarItems.current) {
            if (location === item.path) {

            }
        }
    }

    initializeNavBar();

    return (
        <div className="mobileNavigationBar">
            <ul className="listNoDecoration navBar">
                <div className="navBarItemCircle" style={navBarItemCircle} ></div>
                {(() => {
                    return navigationBarItems.current.map((element, index) => {
                        return <div className="">
                            <li key={index} accessKey={(-Math.trunc(navigationBarItems.current.length / 2) + index).toString()} onClick={(htmlElem) => {
                                toggleClassAtItemClick(htmlElem.currentTarget, index);
                            }} className="material-symbols-outlined navBarIcon navBarItem">{element.icon}
                                <span className="navBarItemDesc">{element.name}</span>
                            </li>
                        </div>
                    })
                })()
                }
            </ul>
        </div>
    )
}

export default MobileNavBar; 