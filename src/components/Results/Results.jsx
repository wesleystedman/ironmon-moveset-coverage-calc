import React from "react";
import { useState } from "react";
import './Results.css';

function Results(props) {
  const [spriteSize, setSpriteSize] = useState('80px');
  
  return (
    <div className='Results-container'>
      <div className='Results-header'>
        <div className='Results-header-unit'>
          <h4>0.0x</h4>
          <div className='Results-header-count'>{props.resultArrays['0'].length}</div>
        </div>
        <div className='Results-header-unit'>
          <h4>0.25x</h4>
          <div className='Results-header-count'>{props.resultArrays['0.25'].length}</div>
        </div>
        <div className='Results-header-unit'>
          <h4>0.5x</h4>
          <div className='Results-header-count'>{props.resultArrays['0.5'].length}</div>
        </div>
        <div className='Results-header-unit'>
          <h4>1.0x</h4>
          <div className='Results-header-count'>{props.resultArrays['1'].length}</div>
        </div>
        <div className='Results-header-unit'>
          <h4>2.0x</h4>
          <div className='Results-header-count'>{props.resultArrays['2'].length}</div>
        </div>
        <div className='Results-header-unit'>
          <h4>4.0x</h4>
          <div className='Results-header-count'>{props.resultArrays['4'].length}</div>
        </div>
      </div>

      <div className="Results-size">
        <label htmlFor="sprite-size">Sprite Size: </label>
        <input type="range" name="sprite-size" id="sprite-size"
               min="16" max="96" step="8" defaultValue="80"
               onChange={(event) => setSpriteSize(event.target.value + 'px')} />
        <span>{spriteSize}</span>
      </div>

      <div className='Results-section'>
        <div className='Results-section-header'><h3>No Effect - {props.resultArrays['0'].length}</h3></div>
        <div className='Results-section-content'>
          {props.resultArrays['0'].map(sprite => <img src={sprite} alt="pokemon sprite" key={sprite} className="sprite" style={{width: spriteSize}} />)}
        </div>
      </div>
      <div className='Results-section'>
        <div className='Results-section-header'><h3>0.25x Effective - {props.resultArrays['0.25'].length}</h3></div>
        <div className='Results-section-content'>
          {props.resultArrays['0.25'].map(sprite => <img src={sprite} alt="pokemon sprite" key={sprite} className="sprite" style={{width: spriteSize}} />)}
        </div>
      </div>
      <div className='Results-section'>
        <div className='Results-section-header'><h3>0.5x Effective - {props.resultArrays['0.5'].length}</h3></div>
        <div className='Results-section-content'>
          {props.resultArrays['0.5'].map(sprite => <img src={sprite} alt="pokemon sprite" key={sprite} className="sprite" style={{width: spriteSize}} />)}
        </div>
      </div>
      <div className='Results-section'>
        <div className='Results-section-header'><h3>1.0x Effective - {props.resultArrays['1'].length}</h3></div>
        <div className='Results-section-content'>
          {props.resultArrays['1'].map(sprite => <img src={sprite} alt="pokemon sprite" key={sprite} className="sprite" style={{width: spriteSize}} />)}
        </div>
      </div>
      <div className='Results-section'>
        <div className='Results-section-header'><h3>2.0x Effective - {props.resultArrays['2'].length}</h3></div>
        <div className='Results-section-content'>
          {props.resultArrays['2'].map(sprite => <img src={sprite} alt="pokemon sprite" key={sprite} className="sprite" style={{width: spriteSize}} />)}
        </div>
      </div>
      <div className='Results-section'>
        <div className='Results-section-header'><h3>4.0x Effective - {props.resultArrays['4'].length}</h3></div>
        <div className='Results-section-content'>
          {props.resultArrays['4'].map(sprite => <img src={sprite} alt="pokemon sprite" key={sprite} className="sprite" style={{width: spriteSize}} />)}
        </div>
      </div>
    </div>
  );
}

export default Results;
