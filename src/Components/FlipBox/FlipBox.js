import React, { useId } from "react";
import "./FlipBox.scss";
function FlipBox(props) {
  //   if (texts != null) {
  //     listTexts = texts.map((txt) => <p key={txt}>{txt}</p>);
  //   }
  const frontText = props.frontText;
  const rearText = props.rearText;

  const frontTextId = useId();
  const rearTextId = useId();

  let frontListTexts = [];
  let rearListTexts = [];

  if (frontText !== null) {
    frontListTexts = frontText.map((txt, index) => (
      <p key={frontTextId.toString() + `${index}`}>{txt}</p>
    ));
  }

  if (rearText !== null) {
    rearListTexts = rearText.map((txt, index) => (
      <p key={rearTextId + `${index}`}>{txt}</p>
    ));
  }

  return (
    <div
      className="flip-box mt-5"
      style={{ width: `${props.width}px`, height: `${props.height}px` }}
    >
      <div className="flip-box-inner">
        <div className="flip-box-front d-flex flex-column justify-content-center">
          <span className="">{frontListTexts}</span>
        </div>
        <div className="flip-box-back d-flex flex-column justify-content-center">
          <span>{rearListTexts}</span>
        </div>
      </div>
    </div>
  );
}

export default FlipBox;
/* De specificat propsurile posibile */