import React, { useState } from 'react';
import axios from 'axios';
import SearchComponent from './SearchComponent';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import UnitToggle from './UnitToggle';
import './App.css';


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    const apiKey = 'b8b0622eee23c28783ba8a74958aba61';

    setLoading(true);
    setError(null);

    try {
      // Fetch current weather data
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
      );
      console.log(weatherResponse.data);
      setWeatherData(weatherResponse.data);

      // Fetch 5-day forecast data
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`
      );

      setForecastData(forecastResponse.data);

    } catch (error) {
      // Handle errors from API response or other issues
      if (error.response) {
        // API returned an error response
        if (error.response.status === 404) {
          setError('City not found. Please try a different city.');
        } else {
          setError(error.response.data.message || 'An error occurred while fetching data.');
        }
      } else {
        // Network or other errors
        setError('An error occurred. Please try again later.');
      }
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container">
      <h1 className="heading">Weather Forecast Web App</h1>
      <SearchComponent onSearch={fetchWeather} />
      <UnitToggle unit={unit} setUnit={setUnit} weatherData={weatherData} forecastData={forecastData} setWeatherData={setWeatherData} setForecastData={setForecastData} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weatherData && <CurrentWeather data={weatherData} unit={unit} />}
      {forecastData && <Forecast data={forecastData} unit={unit} />}
    </div>
  );
}

export default App;
