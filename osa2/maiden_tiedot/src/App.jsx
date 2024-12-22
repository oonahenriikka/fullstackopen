import { useState, useEffect } from 'react'
import countryService from './services/countryService'
import weatherService from './services/weatherService'
import WeatherData from './services/WeatherData'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    console.log('Fetching all countries...')
    countryService.getAllCountries().then(data => {
      console.log('Fetched countries:', data)
      setCountries(data)
    })
  }, [])

  useEffect(() => {
    console.log('Filtering countries based on search term:', search)
    const results = countries.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    console.log('Filtered countries:', results)
    setFilteredCountries(results)
  }, [search, countries])

  useEffect(() => {
    if (selectedCountry) {
      console.log('Selected country:', selectedCountry)
      const [lat, lon] = selectedCountry.latlng
      console.log(`Fetching weather data for ${selectedCountry.name.common} at lat: ${lat}, lon: ${lon}`)
      weatherService.getWeather(lat, lon).then(data => {
        console.log('Fetched weather data:', data)
        setWeather(data)
      }).catch(error => {
        console.error('Error fetching weather data:', error)
      })
    }
  }, [selectedCountry])

  const handleSearchChange = (event) => {
    console.log('Search term changed:', event.target.value)
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const handleShowCountry = (country) => {
    console.log('Show country button clicked:', country)
    setSelectedCountry(country)
  }

  return (
    <div>
      <h1>Country Information</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search for a country"
      />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, please refine your search.</p>
      ) : selectedCountry ? (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Population: {selectedCountry.population}</p>
          <p>Languages:</p>
          <ul>
            {Object.values(selectedCountry.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} width="100" />
          <WeatherData weather={weather} capital={selectedCountry.capital} />
          <button onClick={() => setSelectedCountry(null)}>Back to list</button>
        </div>
      ) : filteredCountries.length > 1 ? (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.cca3}>
              {country.name.common} <button onClick={() => handleShowCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      ) : filteredCountries.length === 1 ? (
        <div>
          <h2>{filteredCountries[0].name.common}</h2>
          <p>Capital: {filteredCountries[0].capital}</p>
          <p>Population: {filteredCountries[0].population}</p>
          <p>Languages:</p>
          <ul>
            {Object.values(filteredCountries[0].languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img src={filteredCountries[0].flags.png} alt={`Flag of ${filteredCountries[0].name.common}`} width="100" />
          <WeatherData weather={weather} capital={filteredCountries[0].capital} />
        </div>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  )
}

export default App