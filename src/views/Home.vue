<template>
  <div class="wrapper">
    <div class="wrapper__inner">
      
      <section>
        <form class="searchBar" @submit.prevent="findCities">
          <div class="position-relative flex-grow-1">
            <input class="searchBar__input" type="text" placeholder="Szukaj..." v-model="city.name" @keyup="findCities">
            <div class="autocomplete" v-if="citiesFound && isVisible">
              <ul class="autocomplete__ul">
                <li v-for="(city, index) in citiesFound" :key="index" @click="getCityData(city)">
                  {{ city.name }},
                  <span class="autocomplete__ul--grey">
                    {{ city.country }}, {{ city.state }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <button class="searchBar__search" type="submit">
            <img src="../assets/icons/search-line.svg" class="searchBar__icon" />
          </button>
        </form>
      </section>

      <section class="main" v-if="cityData">
        <h1 class="main__city">{{ cityName }}</h1>
        <h2 class="main__condition">{{ cityData.current.weather[0].main }}</h2>
        <img src="../assets/icons/cloud-fog.svg" class="main__icon"/>
        <h3 class="main__temp">{{ currentTemp }}&#176;</h3>
        <p class="main__additional">
          <span class="pe-3">
            <img src="../assets/icons/drop-humidity.svg" class="main__icon--xs"/>
            {{ cityData.current.humidity }} %
          </span>
          <span>
            <img src="../assets/icons/wind.svg" class="main__icon--xs"/>
            {{ currentWindSpeed }} km/h
          </span>
        </p>
      </section>

      <section class="nextDays" v-if="cityData">
        <h4 class="nextDays__title">Next days</h4>
        <div class="nextDays__holder">
          <div class="container p-0">
            <div class="row flex-nowrap">
              <NextDay :nextDays="nextDays"/>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import env from '../env.js'
import { computed, ref } from 'vue'
import NextDay from '../components/NextDay.vue'

export default {
  name: 'Home',
  components: {
    NextDay,
  },
  setup() {
    let city = {
      name: "", 
    }
    let isVisible = ref(false);

    let citiesFound = ref();
    function findCities() {
      if(city.name.length >= 3) {
        setTimeout(() => {
          fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city.name}&limit=8&appid=${env.apiKey}`)
          .then(response => response.json())
          .then(data => {
            citiesFound.value = data;
          })
        }, 500);

        isVisible.value = true;
      } else {
        isVisible.value = false;
      }
    }

    let cityName = ref();
    let cityData = ref();
    function getCityData(city) {
      let cityLat = city.lat;
      let cityLon = city.lon;
      cityName.value = city.name;

      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=metric&appid=${env.apiKey}`)
      .then(response => response.json())
      .then(data => cityData.value = data);

      isVisible.value = false;
    }

    let currentTemp = computed(() => Math.round(cityData.value.current.temp));
    let currentWindSpeed = computed(() => Math.round(cityData.value.current.wind_speed * 3.6));

    let nextDays = computed(() => {
      cityData.value.daily.forEach(element => {
        element.temp.day = Math.round(element.temp.day)
        element.temp.night = Math.round(element.temp.night)
        element.dayname = new Date(element.dt * 1000).toLocaleString('en-us', {  weekday: 'short' })
      });
      
      return cityData.value.daily.slice(1, 7)
    });
    
    return {
      city, findCities, citiesFound, getCityData, cityData, isVisible, cityName, currentTemp, currentWindSpeed, nextDays
    }
  }
}
</script>

<style scoped lang="scss">
@import '../variables';

.wrapper {
  min-height: 100vh;
  background: linear-gradient(180deg, #160b68 0%, #4d2265 100%);
  
  &__inner {
    max-width: 500px;
    margin: 0 auto;

    @media (max-width: 991px) {
      padding: 0 15px;
    }
  }
}

.searchBar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 3rem;

  &__input {
    font-weight: 300;
    font-size: 1.1rem;
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid $white;
    color: $white;
    outline: none;

    &::placeholder {
      opacity: 0.7;
    }
  }

  &__search {
    border: none;
    background-color: transparent;
    height: 1.5rem;
    width: 1.5rem;
    margin-left: 1rem;
  }

  &__icon {
    width: 100%;
    height: 100%;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(0.9);
    }
  }
}

.autocomplete {
  position: absolute;
  left: 0;
  width: 100%;
  height: auto;
  max-height: 10rem;
  overflow-y: auto;
  border-radius: 0 0 10px 10px;
  background-color: white;
  color: $purple;
  transition: all 0.2s ease-in-out;
  font-size: 0.8rem;

  &__ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.4rem 1rem;
      cursor: pointer;

      &:hover {
        background-color: rgb(243, 243, 243);
      }
    }

    &--grey {
      color: $grey;
    }
  }
}

.main {
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__city {
    color: $white;
    font-size: 1.7rem;
    font-weight: 400;
  }

  &__temp {
    color: $white;
    font-size: 5rem;
    font-weight: 300;
  }

  &__condition {
    color: $white;
    text-transform: uppercase;
    margin-top: 0.2rem;
    font-size: 0.8rem;
    font-weight: 300;
    opacity: 0.6;
  }

  &__icon {
    width: 9rem;
    margin: 3rem 0;

    &--xs {
      width: 1.4rem;
    }
  }

  &__additional {
    font-size: 0.9rem;
    color: $white;
  }
}

.nextDays {
  padding-bottom: 3rem;

  &__title {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    white-space: nowrap;
    color: $white;

    &::after {
      content: "";
      background-color: $white;
      width: 100%;
      height: 1px;
      margin-left: 0.5rem;
      opacity: 0.75;
    }
  }

  &__holder {
    position: relative;
    overflow-y: auto;
    scrollbar-width: thin;
    padding: 2rem 0;
  }
}

</style>