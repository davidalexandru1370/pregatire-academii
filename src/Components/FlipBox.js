import React from "react";
import "./FlipBox.scss";

function FlipBox(props) {
  const texts = props.text;
  let listTexts = "";
  if (texts != null) {
    listTexts = texts.map((txt) => <p key={txt}>{txt}</p>);
  }

  return (
    <div
      className="flip-box"
      style={{ width: `${props.width}px`, height: `${props.height}px` }}
    >
      <div className="flip-box-inner">
        <div className="flip-box-front">
          <h1>in fata</h1>
        </div>
        <div className="flip-box-back">
          <h2>in spate</h2>
        </div>
      </div>
    </div>
  );
}

export default FlipBox;
/* De specificat propsurile posibile */
