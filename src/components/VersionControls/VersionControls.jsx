import React from "react";
import './VersionControls.css';

function VersionControls(props) {
  return (
    <div className='Controls-version'>
      <label htmlFor="version-select">Version:</label>
      <select name="version-select" id="version-select" defaultValue="ruby-sapphire" onChange={(event) => { props.setVersion(event.target.value) }}>
        <option value="red-blue">Red / Blue / Yellow</option>
        <option value="gold-silver">Gold / Silver / Crystal</option>
        <option value="ruby-sapphire">Ruby / Sapphire / Emerald / FireRed / LeafGreen</option>
        <optgroup label="Gen 4">
          <option value="diamond-pearl">Diamond / Pearl</option>
          <option value="platinum">Platinum / HeartGold / SoulSilver</option>
        </optgroup>
        <optgroup label="Gen 5">
          <option value="black-white">Black / White</option>
          <option value="black-2-white-2">Black 2 / White 2</option>
        </optgroup>
        <optgroup label="Gen 6">
          <option value="x-y">X / Y</option>
          <option value="omega-ruby-alpha-sapphire">Omega Ruby / Alpha Sapphire</option>
        </optgroup>
        <optgroup label="Gen 7">
          <option value="sun-moon">Sun / Moon</option>
          <option value="ultra-sun-ultra-moon">Ultra Sun / Ultra Moon</option>
        </optgroup>
      </select>
    </div>
  )
}

export default VersionControls;
