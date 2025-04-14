import React, { useState } from 'react';

const CitySelector = ({ onCityChange }) => {
  const [cityInput, setCityInput] = useState('');

  const handleCityChange = (e) => {
    setCityInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCityChange(cityInput);
  };

  return (
    <form onSubmit={handleSubmit} className="city-selector">
      <input
        type="text"
        value={cityInput}
        onChange={handleCityChange}
        placeholder="Enter city name"
        className="city-input"
      />
      <button type="submit" className="city-button">Get Weather</button>
    </form>
  );
};

export default CitySelector;