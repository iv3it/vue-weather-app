import { reactive, computed } from 'vue'

export const store = reactive({
  citiesFound: null,
  city: null,
  weatherIcon: null,
  nextDays: computed(() => store.city.daily.slice(1, 7)),
})