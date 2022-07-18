import env from '../env.js'
import { getWeatherIcon } from './weatherIcon'
import { store } from '../store/store.js'

async function loadCityData(chosenCity) {
  let apiCall = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${chosenCity.lat}&lon=${chosenCity.lon}&units=metric&appid=${env.apiKey}`);
  store.city = await apiCall.json();

  store.city.current.temp = Math.round(store.city.current.temp);
  store.city.current.wind_speed = Math.round(store.city.current.wind_speed * 3.6);

  // Set current weather icon
  let timezoneOffset = store.city.timezone_offset;
  let weatherCode = store.city.current.weather[0].id;
  let sunriseTime = store.city.current.sunrise + timezoneOffset;
  let sunsetTime = store.city.current.sunset + timezoneOffset;
  let currentTime = store.city.current.dt + timezoneOffset;

  store.weatherIcon = getWeatherIcon(true, weatherCode, sunsetTime, currentTime, sunriseTime);

  // Set weather icon for next 6 days forecast
  store.nextDays.forEach(element => {
    let weatherCode = element.weather[0].id;
    let sunriseTime = element.sunrise + timezoneOffset;
    let sunsetTime = element.sunset + timezoneOffset;
    let currentTime = element.dt + timezoneOffset;

    element.weatherIcon = getWeatherIcon(false, weatherCode, sunsetTime, currentTime, sunriseTime);
    
    element.temp.day = Math.round(element.temp.day)
    element.temp.night = Math.round(element.temp.night)
    element.dayname = new Date(element.dt * 1000).toLocaleString('en-us', {  weekday: 'short' })
  });
};

export default loadCityData