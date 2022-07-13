import React from "react";

function FlipBox(props) {
  const texts = props.text;
  let listTexts = "";
  if (texts != null) {
    listTexts = texts.map((txt) => <p>{txt}</p>);
  }

  return <div>{listTexts}</div>;
}

export default FlipBox;
