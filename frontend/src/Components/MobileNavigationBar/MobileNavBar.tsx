import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCurrentPath from "../../Hooks/useCurrentPath";
import "./mobileNavBarStyle.scss";

interface INavigationItem {
  icon: string;
  name: string;
  path: string[];
}

const MobileNavBar = () => {
  const navigate = useNavigate();
  const clickItemClass: string = "navBarItemClicked";
  const navigationBarItems = useRef<INavigationItem[]>([
    { icon: "home", name: "Acasa", path: ["/mainpage"] },
    { icon: "article", name: "Teste", path: ["/teste", "/playquiz"] },
    { icon: "person", name: "Cont", path: ["/contul_meu"] },
  ]);
  const previousLIElement = useRef<HTMLLIElement | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const location = useCurrentPath();
  const [navBarWidth, setNavBarWidth] = useState<number>(100);
  const initializedNavBar = useRef<boolean>(false);

  const computeDistance = (width: number, elementIndex: number): number => {
    return Math.trunc(
      (width / navigationBarItems.current.length) * elementIndex
    );
  };

  const computeNavItemsIndex = (index: number): number => {
    return -Math.trunc(navigationBarItems.current.length / 2) + index;
  };

  const toggleClassAtItemClick = (element: HTMLLIElement, index: number) => {
    if (previousLIElement.current === element) {
      return;
    }

    if (
      previousLIElement.current !== null &&
      previousLIElement.current.classList.contains(clickItemClass) === true
    ) {
      previousLIElement.current.classList.toggle(clickItemClass);
    }
    setDistance(computeDistance(navBarWidth, parseInt(element.accessKey)));

    element.classList.toggle(clickItemClass);
    previousLIElement.current = element;
  };

  const navBarItemCircle: Partial<React.CSSProperties> = {
    transition: "transform 0.3s",
    transform: `translateX(${distance}vw)`,
  };

  const initializeNavBar = (index: number): string => {
    if (initializedNavBar.current === true) {
      return clickItemClass;
    }

    if (distance !== computeDistance(navBarWidth, index)) {
      setDistance(computeDistance(navBarWidth, index));
    }
    initializedNavBar.current = true;
    return clickItemClass;
  };
  return (
    <div className="mobileNavigationBar">
      <ul className="listNoDecoration navBar">
        <div className="navBarItemCircle" style={navBarItemCircle}></div>
        {(() => {
          initializedNavBar.current = false;
          return navigationBarItems.current.map((element, index) => {
            return (
              <div id="navbar" key={"navbar" + index}>
                <li
                  key={element.name}
                  accessKey={computeNavItemsIndex(index).toString()}
                  onClick={(htmlElem) => {
                    toggleClassAtItemClick(htmlElem.currentTarget, index);
                  }}
                  ref={
                    element.path.includes(location) ? previousLIElement : null
                  }
                  className={`material-symbols-outlined navBarIcon navBarItem ${
                    element.path.includes(location)
                      ? initializeNavBar(computeNavItemsIndex(index))
                      : ""
                  }`}
                  onClickCapture={() => {
                    navigate(element.path[0], { replace: true });
                  }}
                >
                  {element.icon}
                  <span className="navBarItemDesc">{element.name}</span>
                </li>
              </div>
            );
          });
        })()}
      </ul>
    </div>
  );
};

export default MobileNavBar;
