import React, { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface IReactPortal {
  children: JSX.Element;
  wrapperId: string;
}

function createWrapperElement(wrapperId: string): HTMLDivElement {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  return wrapperElement;
}

const ReactPortal = ({ children, wrapperId = "wrapper" }: IReactPortal) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useLayoutEffect(() => {
    let element: HTMLElement = document.getElementById(wrapperId)!;
    let systemCreated = false;
    if (wrapperId.trim() !== "") {
      if (!element) {
        element = createWrapperElement(wrapperId);
        systemCreated = true;
        document.body.appendChild(element);
      }
      setWrapperElement(element);
    }

    return () => {
      if (systemCreated === true && element.parentNode && element !== null) {
        document.parentNode?.removeChild(element);
        element.remove();
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) {
    return null;
  }

  return createPortal(children, wrapperElement!);
};

export default ReactPortal;
