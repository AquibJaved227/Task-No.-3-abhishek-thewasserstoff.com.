import React from "react";

function CurrentWeather({ data, unit }) {
  // Check if the required data is available 
  if (!data || !data.main || !data.weather) {
    return <p>No data available</p>;
  }

  const { weather, main, wind } = data;
  const weatherDescription = weather[0]?.description || "No description";
  const temperature = main?.temp?.toFixed(2) || "N/A";
  const maxTemp = main?.temp_max?.toFixed(2) || "N/A";
  const minTemp = main?.temp_min?.toFixed(2) || "N/A";
  const humidity = main?.humidity || "N/A";
  const windSpeed = wind?.speed || "N/A";
  const windDirection = wind?.deg || "N/A";

  return (
    <div className="current-weather">
      <h1>Current Temperature</h1>
      <p>Temperature: {temperature}°{unit === 'metric' ? 'C' : 'F'}</p>
      <p>Max Temp: {maxTemp}°{unit === 'metric' ? 'C' : 'F'} / Min Temp: {minTemp}°{unit === 'metric' ? 'C' : 'F'}</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {windSpeed} m/s</p>
      <p>Wind Direction: {windDirection}°</p>
      <p>Condition: {weatherDescription}</p>
      <img src={`http://openweathermap.org/img/wn/${weather[0]?.icon}.png`} alt="weather icon" />
    </div>
  );
}

export default CurrentWeather;
