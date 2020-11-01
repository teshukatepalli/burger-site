import React from "react";
import "./BuildCont.css";

const BuildCont = (props) => {
  return (
    <div className="BuildCont">
      <div className="Label">{props.label}</div>
      <button onClick={props.remove} className="Less" disabled={props.disable}>
        Less
      </button>
      <button onClick={props.added} className="More">
        More
      </button>
    </div>
  );
};

export default BuildCont;
