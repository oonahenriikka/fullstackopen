import React from 'react'

const WeatherData = ({ weather, capital }) => {
  if (!weather || !weather.main || !weather.weather) return null

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Weather: {weather.weather[0].description}</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather icon" />
    </div>
  )
}

export default WeatherData