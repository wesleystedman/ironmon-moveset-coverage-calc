import React from "react";

function Results(props) {
  return (
    <div className='Results-container'>
      <div className='Results-section'>
        <div className='Results-section-header'><h3>No Effect</h3></div>
        <div className='Results-section-content'>Sprites go here</div>
      </div>
      <div className='Results-section'>
        <div className='Results-section-header'><h3>0.25x Effective</h3></div>
        <div className='Results-section-content'>Sprites go here</div>
      </div>
      <div className='Results-section'>
        <div className='Results-section-header'><h3>0.5x Effective</h3></div>
        <div className='Results-section-content'>Sprites go here</div>
      </div>
      <div className='Results-section'>
        <div className='Results-section-header'><h3>1.0x Effective</h3></div>
        <div className='Results-section-content'>Sprites go here</div>
      </div>
      <div className='Results-section'>
        <div className='Results-section-header'><h3>2.0x Effective</h3></div>
        <div className='Results-section-content'>Sprites go here</div>
      </div>
      <div className='Results-section'>
        <div className='Results-section-header'><h3>4.0x Effective</h3></div>
        <div className='Results-section-content'>Sprites go here</div>
      </div>
    </div>
  );
}

export default Results;
