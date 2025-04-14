import React from 'react';

const ForecastWidget = ({ weatherData }) => {
  const dailyForecast = weatherData.list.filter((item, index) => index % 8 === 0); // Каждые 3 часа

  return (
    <div className="forecast-widget">
      <h3>Upcoming Forecast</h3>
      <ul className="forecast-list">
        {dailyForecast.map((day, index) => (
          <li key={index} className="forecast-item">
            <strong>{new Date(day.dt * 1000).toLocaleDateString()}</strong>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="forecast-icon"
            />
            <span className="forecast-temperature">
              {Math.round(day.main.temp_min)}°C - {Math.round(day.main.temp_max)}°C
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForecastWidget;