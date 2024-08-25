import React from 'react';

function Forecast({ data, unit }) {
  const groupByDate = (list) => {
    const groupedData = {};

    list.forEach((item) => {
      const date = new Date(item.dt_txt).toLocaleDateString();
      if (!groupedData[date]) {
        groupedData[date] = { temps: [], weather: item.weather[0] };
      }
      groupedData[date].temps.push(item.main.temp);
    });

    return Object.keys(groupedData).map((date) => {
      const temps = groupedData[date].temps;
      const avgTemp = temps.reduce((acc, temp) => acc + temp, 0) / temps.length;

      return {
        date,
        avgTemp: avgTemp.toFixed(2),
        description: groupedData[date].weather.description,
        icon: groupedData[date].weather.icon,
      };
    });
  };

  const summarizedForecast = groupByDate(data.list).slice(0, 5);

  return (
    <div className="forecast">
      <h2>5-Day Forecast</h2>
      <div>
        {summarizedForecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <p>{day.date}</p>
            <p>Average Temp: {day.avgTemp}°{unit === 'metric' ? 'C' : 'F'}</p>
            <p>Condition: {day.description}</p>
            <img src={`http://openweathermap.org/img/wn/${day.icon}.png`} alt="weather icon" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
