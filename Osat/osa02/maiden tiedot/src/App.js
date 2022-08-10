import { useState, useEffect } from 'react'
import axios from 'axios'

const KelvinToCelsius = ({ kelvin }) => {
  return (
    <div>
      {(kelvin - 273.15).toPrecision(3)}
    </div>
  )
}
const DisplayWeather = ({ country }) => {
  // Looks like there is a problem of this component trying to return before data is FileSystemDirectoryHandle, causing error.
  // as a workaround I set a default value for weather data to prevent "undefined value error"
  const [weatherData, setWeatherData] = useState({ "coord": { "lon": 24.9355, "lat": 60.1695 }, "weather": [{ "id": 801, "main": "Clouds", "description": "few clouds", "icon": "02d" }], "base": "stations", "main": { "temp": 295.47, "feels_like": 295.12, "temp_min": 294.75, "temp_max": 296.47, "pressure": 1014, "humidity": 52 }, "visibility": 10000, "wind": { "speed": 6.69, "deg": 210 }, "clouds": { "all": 20 }, "dt": 1660140846, "sys": { "type": 2, "id": 2036194, "country": "FI", "sunrise": 1660098069, "sunset": 1660156216 }, "timezone": 10800, "id": 658225, "name": "Helsinki", "cod": 200 })
  const api_key = process.env.REACT_APP_API_KEY
  const city = country.capital
  const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

  const weatherHook = () => {

    console.log('effect')
    axios
      .get(apiCall)
      .then(response => {
        console.log('promise fulfilled')
        setWeatherData(response.data)
      })
  }
  useEffect(weatherHook, [])

  return (
    <div>
      {console.log(weatherData.weather[0].main)}
      <h2>Weather in {country.capital}</h2>
      temperature {(weatherData.main.temp - 273.15).toPrecision(3)} Celcius
      <div>
        {weatherData.weather.main}
      </div>
      <div>
        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
      </div>
      <div>
        wind {weatherData.wind.speed} m/s
      </div>
    </div>
  )
}
const DisplayCountries = ({ countries, filter, setFilter, weather, setWeather }) => {
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()))

  console.log()
  if (filteredCountries.length == 1) {
    return (
      <DisplaySingleCountry country={filteredCountries[0]} weather={weather} setWeather={setWeather} />
    )
  }
  if (filteredCountries.length <= 10) {
    return (
      <DisplayCountriesList countries={filteredCountries} setFilter={setFilter} />
    )
  } else
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
}
const DisplaySingleCountry = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <div> capital {country.capital} </div>
    <div> area {country.area} </div>
    <h3>languages:</h3>
    <ul>
      {Object.values(country.languages)
        .map(language =>
          <li key={country.name.common + language}> {language} </li>)}
    </ul>
    <div>
      <img src={country.flags.png} style={{
        paddingRight: '5px',
        height: "100px",
        textAlign: 'top'
      }} />
    </div>
    <DisplayWeather country={country} />
  </div >

)

const DisplayCountriesList = ({ countries, setFilter }) => {
  return (
    <div>
      {
        countries.map(country =>
          <div key={country.name.official}>
            {country.name.common}
            <button onClick={() => { setFilter(country.name.common) }}> show</button>
          </div>
        )
      }
    </div >
  )
}
const FilterForm = ({ filterData }) => {
  const { filter, handleFilterChange } = filterData
  return (
    <div>
      <form>
        <div>
          Find countries: <input value={filter} onChange={handleFilterChange} />
        </div>
      </form>
    </div>
  )
}

const App = (props) => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')


  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setFilter(event.target.value)
  }

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])




  const filterData = { filter, handleFilterChange }



  return (
    <div>
      <FilterForm filterData={filterData} />
      <DisplayCountries countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  )
}


export default App