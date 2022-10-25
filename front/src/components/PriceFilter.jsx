import React from 'react';
import { useState } from 'react';
import s from"../styles/priceFilter.module.css"

const PriceFilter = () => {
    const [value, setValue] = useState(0);
    console.log(value)
    
const max = 375;
function handleChange(e) {
    setValue(e.target.value)
}
const getBackgroundSize = () => {
    return { backgroundSize: `${(value * 100) / max}% 100%` };
  };

    return (
      <div className={s.container}>
        <div className={s.filters_container}>
         
            <div className={s.size_container}>
                <p>Size</p>
                <div className={s.size}>
                    <button>mini</button>
                    <button>medium</button>
                    <button>small</button>
                    <button>large</button>
                </div>
                <div>
                <h4>Filter price: {value}$</h4>
                <input
                    className={s.slider}
                    type="range"
                    min="48"
                    max={max}
                    onChange={(e) => handleChange(e)}
                    style={getBackgroundSize()}
                    value={value}
                />
                </div>
             </div>
        </div>
      </div>
    );
};

export default PriceFilter;