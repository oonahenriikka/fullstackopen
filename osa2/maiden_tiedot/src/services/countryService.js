const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAllCountries = async () => {
  const response = await fetch(baseUrl)
  return response.json()
}

export default { getAllCountries }