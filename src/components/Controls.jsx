import React from "react";
import VersionControls from "./VersionControls";
import TypeControls from "./TypeControls";

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
    </div>
  );
}

export default Controls;
