import env from '../env.js'
import { store } from '../store/store.js'

const findCities = (cityInput) => {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=8&appid=${env.apiKey}`)
  .then((result) => result.json())
  .then((data) => (store.citiesFound = data))
};

export default findCities