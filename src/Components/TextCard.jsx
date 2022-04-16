import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ".././App.css";
import 'react-bootstrap-icons';
import { Check } from 'react-bootstrap-icons';

function TextCard(props) {
  return (
    <div className="card mb-3">
    <div className="card-body bg-purple">
    <Check size={48} className="float-end"/>
    <p className='card-text text-white text-uppercase text-left fs-4 mt-1'>{props.text}</p>
    </div>
    </div>
  )
}

export default TextCard