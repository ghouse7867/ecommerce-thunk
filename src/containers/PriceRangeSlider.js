import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { ProductComponent } from './ProductComponent';

// const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

// const { Range } = Slider;

const PriceRangeSlider = ({ keyword, sprice, price }) => {
  const handlePriceChange = (value) => {
    sprice(value);
  };

  if (keyword == "" || keyword == undefined ) {
    return (
      <div style={{marginLeft: "80px"}} >
        <h2>Price Range</h2>

        <Range 
        marks = {{
          1: `$1`,
          1000: `$1000`
        }}
          min={1}
          max={1000}
          defaultValue={[1, 1000]}
          onChange={handlePriceChange}
          tipFormatter={(value) => `$${value}`}
          />
        <div style = {{height : "60px"}}> 
        </div>
      </div>
    );
  } else {
    return (
      <div className="product-container">
        <ProductComponent />
      </div>
    );
  }
};

export default PriceRangeSlider;
