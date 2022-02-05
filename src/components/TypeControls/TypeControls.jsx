import React from "react";
import './TypeControls.css';

const TYPES = [
  'Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel',
  'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy'
];

const TYPE_COLORS = [
  {backgroundColor: '#a8a878', border: '1px solid #6d6d4e'},
  {backgroundColor: '#c03028', border: '1px solid #7d1f1a'},
  {backgroundColor: '#a890f0', border: '1px solid #6d5e9c'},
  {backgroundColor: '#a040a0', border: '1px solid #682a68'},
  {backgroundColor: '#e0c068', border: '1px solid #927d44'},
  {backgroundColor: '#b8a038', border: '1px solid #786824'},
  {backgroundColor: '#a8b820', border: '1px solid #6d7815'},
  {backgroundColor: '#705898', border: '1px solid #493963'},
  {backgroundColor: '#b8b8d0', border: '1px solid #787887'},
  {backgroundColor: '#f08030', border: '1px solid #9c531f'},
  {backgroundColor: '#6890f0', border: '1px solid #445e9c'},
  {backgroundColor: '#78c850', border: '1px solid #4e8234'},
  {backgroundColor: '#f8d030', border: '1px solid #a1871f'},
  {backgroundColor: '#f85888', border: '1px solid #a13959'},
  {backgroundColor: '#98d8d8', border: '1px solid #638d8d'},
  {backgroundColor: '#7038f8', border: '1px solid #4924a1'},
  {backgroundColor: '#705848', border: '1px solid #49392f'},
  {backgroundColor: '#ee99ac', border: '1px solid #9b6470'},
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
      {TYPES.map((type, index) => (
        <div className="type-button" style={TYPE_COLORS[index]} key={type} onClick={handleDivButtonClick}>
          <input type="checkbox" name={`type-${type.toLowerCase()}`} id={`type-${type.toLowerCase()}`} value={index} onChange={handleChange} />
          <label htmlFor={`type-${type.toLowerCase()}`}>{type}</label>
        </div>
      ))}
    </div>
  )
}

export default TypeControls;