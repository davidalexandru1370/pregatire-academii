import React, { useRef, useState } from "react";
import "./mobileNavBarStyle.scss"

const MobileNavBar = () => {
    const clickItemClass: string = "navBarItemClicked";
    const navigationBarItems = useRef<string[]>(["home", "article", "person"]);
    const previousLIElement = useRef<HTMLLIElement | null>(null);
    const [distance, setDistance] = useState<number>(0);

    const toggleClassAtItemClick = (element: HTMLLIElement, index: number) => {
        if (previousLIElement.current === element) {
            return;
        }

        if (previousLIElement.current !== null && previousLIElement.current.classList.contains(clickItemClass) === true) {
            previousLIElement.current.classList.toggle(clickItemClass);
            console.log(previousLIElement.current.accessKey);

            let previousLIElementKey: number = parseInt(previousLIElement.current.accessKey);
            if (index >= previousLIElementKey) {
                setDistance(33 * (index - previousLIElementKey));
            }
            else {
                setDistance(33 * (previousLIElementKey - index));
            }
        }

        element.classList.toggle(clickItemClass);
        previousLIElement.current = element;
    }

    const navBarItemCircle: Partial<React.CSSProperties> = {
        display: "",
        transform: `translateX(${distance}vw)`,
    };

    return (
        <div className="mobileNavigationBar">
            <ul className="listNoDecoration navBar">
                <div className="navBarItemCircle" style={navBarItemCircle} ></div>
                {(() => {
                    return navigationBarItems.current.map((element, index) => {
                        return <li key={index} accessKey={index.toString()} onClick={(htmlElem) => {
                            toggleClassAtItemClick(htmlElem.currentTarget, index);
                        }} className="material-symbols-outlined navBarItem">{element}</li>
                    })
                })()}
            </ul>
        </div>
    )
}



export default MobileNavBar;