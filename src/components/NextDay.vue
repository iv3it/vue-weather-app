<template>
  <div class="col-sm-3 col-4" v-for="(nextDay, index) in nextDays" :key="index">
    <div class="box">
      <p class="box__day">{{ nextDay.dayname }}</p>
      <img :src="`${env.publicPath}assets/icons/${nextDay.weatherIcon}.svg`" class="box__icon"/>
      <p class="box__temp">{{ nextDay.temp.day }}&#176; <span class="box__temp box__temp--night">{{ nextDay.temp.night }}&#176;</span></p>
    </div>
  </div>
</template>

<script>
import env from '../env.js'
import { toRef } from 'vue';

export default {
  name: 'NextDay',
  props: {
    nextDays: Object,
  },
  setup(props) {
    let nextDays = toRef(props, 'nextDays');

    return {
      nextDays, env
    }
  }
}
</script>

<style scoped lang="scss">
@import '../variables';

.box {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 0.5rem 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $white;
  height: 100%;

  &__day {
    font-size: 0.8rem;
    margin-bottom: 0;
  }

  &__icon {
    height: 1.4rem;
    margin: 0.4rem auto;
  }

  &__temp {
    font-size: 1.1rem;
    margin-bottom: 0;
    text-align: center;

    &--night {
      color: $darkGrey;
      padding-left: 0.3rem;

      @media (max-width: 575px) {
        padding-left: 0;
      }
    }

    @media (max-width: 575px) {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
