import React from "react";
import './TypeControls.css';

const types = [
  'Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel',
  'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy'
];

function TypeControls(props) {
  function handleChange(event) {
    props.selectedMoveTypes.includes(event.target.value)
      ? props.setSelectedMoveTypes(props.selectedMoveTypes.filter(val => val !== event.target.value))
      : props.setSelectedMoveTypes(props.selectedMoveTypes.concat([event.target.value]))
  }

  // Redirect a click on the div part of the type 'button' to the checkbox, like the label does (afaict)
  function handleDivButtonClick(event) {
    if (event.target.tagName === 'DIV') event.target.firstChild.click();
  }

  return (
    <div className='Controls-types'>
      {types.map((type, index) => (
        <div className="type-button" key={type} onClick={handleDivButtonClick}>
          <input type="checkbox" name={`type-${type.toLowerCase()}`} id={`type-${type.toLowerCase()}`} value={index} onChange={handleChange} />
          <label htmlFor={`type-${type.toLowerCase()}`}>{type}</label>
        </div>
      ))}
    </div>
  )
}

export default TypeControls;