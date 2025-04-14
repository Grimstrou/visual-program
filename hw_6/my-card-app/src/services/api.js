export const fetchWeatherData = async (city) => {
    const apiKey = '75a2c44e1fee1c8ac91620da3c1289c4';
    console.log('Fetching weather data for:', city);
  
    try {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
      );
      const geoData = await geoResponse.json();
      console.log('Geocoding response:', geoData);
  
      if (!geoData.length) {
        throw new Error('City not found');
      }
  
      const { lat, lon } = geoData[0];
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const weatherData = await weatherResponse.json();
      console.log('Weather forecast response:', weatherData);
  
      return { lat, lon, weatherData };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  };