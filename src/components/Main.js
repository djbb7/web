import React from 'react'
import {bindActionCreators} from 'redux'
import {Provider} from 'react-redux'
import page from 'page';

import '../styles/main.scss'

import store from '../store'
import {setView} from '../store/actions/values';
import {fetchAreas, fetchLocation, fetchMenus, fetchRestaurants, fetchFavorites} from '../store/actions/async'
import {selectLang} from '../store/selectors'

import App from './App'
import Restaurants from './Restaurants';

const actions = bindActionCreators({
  fetchRestaurants,
  fetchAreas,
  fetchLocation,
  fetchFavorites,
  fetchMenus,
  setView
}, store.dispatch)

const lang = selectLang(store.getState())

actions.fetchFavorites(lang)
actions.fetchRestaurants(lang)
actions.fetchAreas(lang)
actions.fetchMenus(lang)

actions.fetchLocation()

page('/', () => actions.setView(<Restaurants />))
page('/privacy-policy', () => actions.setView(<p>asd</p>))
page()

export default function() {
   return (
      <Provider store={store}>
         <App />
      </Provider>
   )
}
