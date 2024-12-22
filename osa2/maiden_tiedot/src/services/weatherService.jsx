const apiKey = import.meta.env.VITE_WEATHER_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = async (lat, lon) => {
  const response = await fetch(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
  if (!response.ok) {
    throw new Error('Failed to fetch weather data')
  }
  return response.json()
}

export default { getWeather }