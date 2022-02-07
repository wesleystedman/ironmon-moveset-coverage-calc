import React from "react";
import VersionControls from "../VersionControls/VersionControls";
import TypeControls from "../TypeControls/TypeControls";
import './Controls.css';

function Controls(props) {
  return (
    <div className='Controls-container'>
      <VersionControls setVersion={props.setVersion} selectedMoveTypes={props.selectedMoveTypes} setSelectedMoveTypes={props.setSelectedMoveTypes} />
      <div className="Controls-evolved">
        <input type="checkbox" name="force-fully-evolved" id="force-fully-evolved" 
          onChange={() => props.setForceEvo(!props.forceEvo)} />
        <label htmlFor="force-fully-evolved">Show only fully evolved Pokemon</label>
      </div>
      <TypeControls version={props.version} selectedMoveTypes={props.selectedMoveTypes} setSelectedMoveTypes={props.setSelectedMoveTypes} />
      <button className="Controls-calc" onClick={props.calculate}>Calculate</button>
    </div>
  );
}

export default Controls;
