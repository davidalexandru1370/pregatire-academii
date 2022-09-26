import React, { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface IReactPortal {
  children: JSX.Element;
  wrapperId: string;
}

function createWrapperElement(wrapperId): HTMLDivElement {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  return wrapperElement;
}

const ReactPortal = ({ children, wrapperId = "wrapper" }: IReactPortal) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    if (!element) {
      element = createWrapperElement(wrapperId);
      systemCreated = true;
      document.body.appendChild(element);
    }
    setWrapperElement(element);
    return () => {
      if (systemCreated === true && element.parentNode && element) {
        document.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) {
    return null;
  }

  return createPortal(children, wrapperElement);
};

export default ReactPortal;