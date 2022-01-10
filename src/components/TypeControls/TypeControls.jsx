import React from "react";

function TypeControls(props) {
  function handleChange(event) {
    props.selectedMoveTypes.includes(event.target.value)
      ? props.setSelectedMoveTypes(props.selectedMoveTypes.filter(val => val !== event.target.value))
      : props.setSelectedMoveTypes(props.selectedMoveTypes.concat([event.target.value]))
  }
  
  return (
    <div className='Controls-types'>
      <div className="type-button">
        <input type="checkbox" name="type-normal" id="type-normal" value="0" onChange={handleChange} />
        <label htmlFor="type-normal">Normal</label>
      </div>
      <div className="type-button">
        <input type="checkbox" name="type-fighting" id="type-fighting" value="1" onChange={handleChange} />
        <label htmlFor="type-fighting">Fighting</label>
      </div>
      <div className="type-button">
        <input type="checkbox" name="type-flying" id="type-flying" value="2" onChange={handleChange} />
        <label htmlFor="type-flying">Flying</label>
      </div>
      <div className="type-button">
        <input type="checkbox" name="type-poison" id="type-poison" value="3" onChange={handleChange}/>
        <label htmlFor="type-poison">Poison</label>
      </div>
      <div className="type-button">
        <input type="checkbox" name="type-ground" id="type-ground" value="4" onChange={handleChange}/>
        <label htmlFor="type-ground">Ground</label>
      </div>
      <div className="type-button">
        <input type="checkbox" name="type-rock" id="type-rock" value="5" onChange={handleChange}/>
        <label htmlFor="type-rock">Rock</label>
      </div>
      <div className="type-button">
        <input type="checkbox" name="type-bug" id="type-bug" value="6" onChange={handleChange}/>
        <label htmlFor="type-bug">Bug</label>
      </div>
      <div className="type-button">
        <input type="checkbox" name="type-ghost" id="type-ghost" value="7" onChange={handleChange}/>
        <label htmlFor="type-ghost">Ghost</label>
      </div>
      <div className="type-button">
        <input type="checkbox" name="type-steel" id="type-steel" value="8" onChange={handleChange}/>
        <label htmlFor="type-steel">Steel</label>
      </div>
      <div className="type-button">
        <input type="checkbox" name="type-fire" id="type-fire" value="9" onChange={handleChange}/>
        <label htmlFor="type-fire">Fire</label>
      </div>
      <div className="type-button">
        <input type="checkbox" name="type-water" id="type-water" value="10" onChange={handleChange}/>
        <label htmlFor="type-water">Water</label>
      </div>
      <div className="type-button">
        <input type="checkbox" name="type-grass" id="type-grass" value="11" onChange={handleChange}/>
        <label htmlFor="type-grass">Grass</label>
      </div>
      <div className="type-button">
        <input type="checkbox" name="type-electric" id="type-electric" value="12" onChange={handleChange}/>
        <label htmlFor="type-electric">Electric</label>
      </div>
      <div className="type-button">
        <input type="checkbox" name="type-psychic" id="type-psychic" value="13" onChange={handleChange}/>
        <label htmlFor="type-psychic">Psychic</label>
      </div>
      <div className="type-button">
        <input type="checkbox" name="type-ice" id="type-ice" value="14" onChange={handleChange}/>
        <label htmlFor="type-ice">Ice</label>
      </div>
      <div className="type-button">
        <input type="checkbox" name="type-dragon" id="type-dragon" value="15" onChange={handleChange}/>
        <label htmlFor="type-dragon">Dragon</label>
      </div>
      <div className="type-button">
        <input type="checkbox" name="type-dark" id="type-dark" value="16" onChange={handleChange}/>
        <label htmlFor="type-dark">Dark</label>
      </div>
      <div className="type-button">
        <input type="checkbox" name="type-fairy" id="type-fairy" value="17" onChange={handleChange}/>
        <label htmlFor="type-fairy">Fairy</label>
      </div>
    </div>
  )
}

export default TypeControls;