import React, { useState, useEffect } from 'react';
import WeatherWidget from './WeatherWidget';
import ForecastWidget from './ForecastWidget';
import CitySelector from './CitySelector';
import BackgroundHandler from './BackgroundHandler';
import { fetchWeatherData } from '../services/api';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Moscow');
  const [coordinates, setCoordinates] = useState({ lat: 55.7558, lon: 37.6173 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => fetchData(), 3 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchData();
  }, [city]);

  const fetchData = async () => {
    try {
      setError(null);
      const data = await fetchWeatherData(city);
      setCoordinates({ lat: data.lat, lon: data.lon });
      setWeatherData(data.weatherData);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="app-container">
      <BackgroundHandler weatherData={weatherData} />
      <div className="content-container">
        <CitySelector onCityChange={setCity} />
        {error && <div className="error-message">{error}</div>}
        {weatherData && (
          <>
            <WeatherWidget weatherData={weatherData} />
            <ForecastWidget weatherData={weatherData} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;