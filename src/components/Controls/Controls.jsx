import React from "react";
import VersionControls from "../VersionControls/VersionControls";
import TypeControls from "../TypeControls/TypeControls";

function Controls(props) {
  return (
    <div className='Controls-container'>
      <VersionControls setVersion={props.setVersion} />
      <div className="Controls-evolved">
        <input type="checkbox" name="force-fully-evolved" id="force-fully-evolved" 
          onChange={() => props.setForceEvo(!props.forceEvo)} />
        <label htmlFor="force-fully-evolved">Show only fully evolved Pokemon</label>
      </div>
      <TypeControls selectedMoveTypes={props.selectedMoveTypes} setSelectedMoveTypes={props.setSelectedMoveTypes} />
      <button className="Controls-calc" onClick={props.calculate}>Calculate</button>
    </div>
  );
}

export default Controls;
