import React from 'react'
import {connect} from 'react-redux'

import {selectLang} from '../store/selectors'
import {setLang} from '../store/actions/preferences'

const LanguageSelector = ({lang, setLang}) => (
  <div className="language-selector">
    <button onClick={() => setLang('fi')}>Finnish</button>
    <button onClick={() => setLang('en')}>English</button>
  </div>
)

const mapState = state => ({
  lang: selectLang(state)
})

const mapDispatch = dispatch => ({
  setLang: lang => dispatch(setLang(lang))
})

export default connect(mapState, mapDispatch)(LanguageSelector)
