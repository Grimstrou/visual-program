import React from 'react';

const BackgroundHandler = ({ weatherData }) => {
  const getBackgroundColor = () => {
    if (!weatherData) return '#f9f9f9'; // Default background

    const weatherCode = weatherData.list[0].weather[0].id;

    if (weatherCode >= 200 && weatherCode < 600) {
      return '#ccc'; // Rainy
    } else if (weatherCode >= 600 && weatherCode < 700) {
      return '#fff'; // Snowy
    } else if (weatherCode >= 801) {
      return '#007bff'; // Cloudy
    } else {
      return '#ffcc00'; // Sunny
    }
  };

  const backgroundColor = getBackgroundColor();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor,
        zIndex: -1,
      }}
    ></div>
  );
};

export default BackgroundHandler;