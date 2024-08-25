import React from 'react';

function UnitToggle({ unit, setUnit, weatherData, forecastData, setWeatherData, setForecastData }) {

  const handleUnitToggle = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    
    // Convert current weather temperature
    if (weatherData && weatherData.main) {
      const convertedTemp = unit === 'metric' 
        ? (weatherData.main.temp * 9/5) + 32 // Celsius to Fahrenheit
        : (weatherData.main.temp - 32) * 5/9; // Fahrenheit to Celsius
      
      
      const convertedMaxTemp = unit === 'metric' 
        ? (weatherData.main.temp_max * 9/5) + 32 
        : (weatherData.main.temp_max - 32) * 5/9;
      
      const convertedMinTemp = unit === 'metric' 
        ? (weatherData.main.temp_min * 9/5) + 32 
        : (weatherData.main.temp_min - 32) * 5/9;

      const convertedWeatherData = {
        ...weatherData,
        main: {
          ...weatherData.main,
          temp: convertedTemp,
          temp_max: convertedMaxTemp,
          temp_min: convertedMinTemp,
        }
      };
      setWeatherData(convertedWeatherData);
    }

    // Convert forecast temperatures
    if (forecastData && forecastData.list) {
      const convertedForecastData = {
        ...forecastData,
        list: forecastData.list.map(item => {
          const convertedTemp = unit === 'metric' 
            ? (item.main.temp * 9/5) + 32 // Celsius to Fahrenheit
            : (item.main.temp - 32) * 5/9; // Fahrenheit to Celsius
          return {
            ...item,
            main: {
              ...item.main,
              temp: convertedTemp
            }
          };
        })
      };
      setForecastData(convertedForecastData);
    }

    setUnit(newUnit);
  };

  return (
    <button onClick={handleUnitToggle}>
      Switch to {unit === 'metric' ? 'Fahrenheit (°F)' : 'Celsius (°C)'}
    </button>
  );
}

export default UnitToggle;
