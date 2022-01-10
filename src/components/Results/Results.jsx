import React from "react";

function Results(props) {
  return (
    <div className='Results-container'>
      <div className='Results-section'>
        <div className='Results-section-header'><h3>No Effect - {props.resultArrays['0'].length}</h3></div>
        <div className='Results-section-content'>
          {props.resultArrays['0'].map(sprite => <img src={sprite} alt="pokemon sprite" key={sprite} className="sprite" />)}
        </div>
      </div>
      <div className='Results-section'>
        <div className='Results-section-header'><h3>0.25x Effective - {props.resultArrays['0.25'].length}</h3></div>
        <div className='Results-section-content'>
          {props.resultArrays['0.25'].map(sprite => <img src={sprite} alt="pokemon sprite" key={sprite} className="sprite" />)}
        </div>
      </div>
      <div className='Results-section'>
        <div className='Results-section-header'><h3>0.5x Effective - {props.resultArrays['0.5'].length}</h3></div>
        <div className='Results-section-content'>
          {props.resultArrays['0.5'].map(sprite => <img src={sprite} alt="pokemon sprite" key={sprite} className="sprite" />)}
        </div>
      </div>
      <div className='Results-section'>
        <div className='Results-section-header'><h3>1.0x Effective - {props.resultArrays['1'].length}</h3></div>
        <div className='Results-section-content'>
          {props.resultArrays['1'].map(sprite => <img src={sprite} alt="pokemon sprite" key={sprite} className="sprite" />)}
        </div>
      </div>
      <div className='Results-section'>
        <div className='Results-section-header'><h3>2.0x Effective - {props.resultArrays['2'].length}</h3></div>
        <div className='Results-section-content'>
          {props.resultArrays['2'].map(sprite => <img src={sprite} alt="pokemon sprite" key={sprite} className="sprite" />)}
        </div>
      </div>
      <div className='Results-section'>
        <div className='Results-section-header'><h3>4.0x Effective - {props.resultArrays['4'].length}</h3></div>
        <div className='Results-section-content'>
          {props.resultArrays['4'].map(sprite => <img src={sprite} alt="pokemon sprite" key={sprite} className="sprite" />)}
        </div>
      </div>
    </div>
  );
}

export default Results;
