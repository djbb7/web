import {createSelector} from 'reselect'
import moment from 'moment'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import haversine from 'haversine'
import {Set} from 'immutable'

const STARRED = -1
const NEARBY = -2

export const selectAreas = state => state.data.areas || []

export const selectSelectedArea = createSelector(
  selectAreas,
  state => state.preferences.selectedArea,
  (areas, selectedArea) => {
    if (selectedArea < 0)
      return selectedArea
    return areas.find(a => a.id === selectedArea)
  }
)

export const starredRestaurants = state => state.preferences.starredRestaurants || Set()

const isOpenNow = (restaurant, day) => {
  const weekday = day.weekday()
  if (!restaurant.openingHours[weekday]) {
    return false
  }
  const [open, close] = restaurant.openingHours[weekday].split(' - ')
  const now = moment()
  return now.isAfter(moment(open, 'HH:mm')) && now.isBefore(moment(close, 'HH:mm'))
}

export const getFormattedRestaurants = createSelector(
  state => state.value.dayOffset,
  state => state.data.restaurants || [],
  state => state.data.menus,
  selectSelectedArea,
  state => state.value.location,
  starredRestaurants,
  (dayOffset, restaurants, menus, selectedArea = {}, location, starredRestaurants) => {
    const day = moment().add(dayOffset, 'day')
    return orderBy(
      restaurants
      .map(restaurant => {
        const courses = get(menus, [restaurant.id, day.format('YYYY-MM-DD')], [])
        const distance = location && haversine(location, restaurant, {unit: 'meter'})
        return {
          ...restaurant,
          courses,
          distance,
          noCourses: !courses.length,
          isOpenNow: isOpenNow(restaurant, day),
          isStarred: starredRestaurants.includes(restaurant.id)
        }
      })
      .filter(restaurant => {
        if (selectedArea === STARRED) {
          return restaurant.isStarred
        } else if (selectedArea === NEARBY) {
          return restaurant.distance < 1500
        }
        return selectedArea.restaurants && selectedArea.restaurants.some(r => r.id === restaurant.id)
      }),
     ['isStarred', 'isOpenNow', 'noCourses', 'distance'], ['desc', 'desc', 'asc', 'asc'])
  }
)

export const selectLang = state => state.preferences.lang

export const selectFiltersExpanded = createSelector(
  state => state.preferences.filtersExpanded,
  filtersExpanded => filtersExpanded
)

export const isLoggedIn = createSelector(
  state => state.data.user,
  user => !!user
)
