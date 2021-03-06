import React from 'react'

import Text from '../Text'
import css from '../../styles/RestaurantList.scss'
import Restaurant from './Restaurant'

const RestaurantList = ({restaurants, dayOffset, dayOfWeek}) => (
  <div className={css.container}>
    {restaurants.map(restaurant =>
    <Restaurant
      key={restaurant.id}
      restaurant={restaurant}
      dayOffset={dayOffset}
      dayOfWeek={dayOfWeek} />
    )}
    {!restaurants.length && <Text className="empty-text" id="emptyRestaurants" />}
  </div>
)

export default RestaurantList
