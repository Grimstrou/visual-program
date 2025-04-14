import React from 'react';

const WeatherWidget = ({ weatherData }) => {
  const currentWeather = weatherData.list[0];
  const iconUrl = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;

  // Получаем прогноз на ближайшие 5 часов
  const hourlyForecast = weatherData.list.slice(0, 5).map((item, index) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    temp: Math.round(item.main.temp),
    icon: item.weather[0].icon,
  }));

  return (
    <div className="weather-widget">
      <h2>{weatherData.city.name}</h2>
      <div className="current-weather">
        <span className="temperature">{Math.round(currentWeather.main.temp)}°C</span>
        <img src={iconUrl} alt="Weather Icon" className="weather-icon" />
      </div>
      <div className="hourly-forecast">
        <p>Hourly Forecast:</p>
        <ul>
          {hourlyForecast.map((item, index) => (
            <li key={index}>
              <strong>{item.time}</strong>
              <img
                src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                alt="Weather Icon"
                className="forecast-icon"
              />
              <span>{item.temp}°C</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="weather-details">
        <p>Humidity: {currentWeather.main.humidity}%</p>
        <p>Wind: {currentWeather.wind.speed} m/s</p>
        <p>Air Pressure: {currentWeather.main.pressure} hPa</p>
        <p>UV Index: {currentWeather.clouds.all}</p>
      </div>
    </div>
  );
};

export default WeatherWidget;