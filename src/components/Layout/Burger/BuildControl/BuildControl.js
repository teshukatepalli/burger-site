import React from "react";
import "./BuildControl.css";
import BuildCont from "./Buildcont/BuildCont";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControl = (props) => {
  return (
    <div className="BuildControl">
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((control, index) => (
        <BuildCont
          label={control.label}
          key={control + index}
          added={() => props.ingredientAdded(control.type)}
          remove={() => props.ingredientRemove(control.type)}
          disable={props.disabled[control.type]}
        />
      ))}
      <button disabled={!props.purchasable} className="OrderButton">
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControl;
