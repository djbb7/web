import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import Account from 'react-icons/lib/md/account-circle'
import Filter from 'react-icons/lib/md/filter-list'
import times from 'lodash/times'
import Select from 'react-select'

import Tooltip from '../Tooltip'
import Settings from './Settings'
import css from '../../styles/DaySelector.scss'
import {setDayOffset, openModal} from '../../store/actions/values'
import {setFiltersExpanded} from '../../store/actions/preferences'
import {selectFiltersExpanded, isLoggedIn} from '../../store/selectors'
import Text from '../Text'

const DaySelector = ({ dayOffset, setDayOffset, openModal, setFiltersExpanded, filtersExpanded, user, isLoggedIn }) => (
  <div className={css.container}>
    <Tooltip
      element="button"
      content={<Text id="filters" />}
      onClick={() => setFiltersExpanded(!filtersExpanded)}
      className={css.icon + (filtersExpanded ? ' ' + css.expanded : '')}>
      <Filter size={24} />
    </Tooltip>
    <div className={css.days}>
      <div className="hide-mobile">
        {times(6, i =>
        <button
          key={i}
          ref={e => i === dayOffset && e && e.focus()}
          className={i === dayOffset ? css.selected : ''}
          onClick={() => setDayOffset(i)}>
          <Text moment={moment().add(i, 'day')} id="dd DD.MM." />
        </button>
        )}
      </div>
      <Select
        className={`show-mobile ${css.dropdown}`}
        clearable={false}
        searchable={false}
        options={times(6, value => ({
          label: <Text moment={moment().add(value, 'day')} id="dddd DD.MM." />,
          value
        }))}
        onChange={option => setDayOffset(option.value)}
        value={dayOffset} />
    </div>
    <Tooltip
      element="button"
      content={<Text id="settings" />}
      className={css.icon}
      onClick={() => openModal(<Settings />)}>
      {isLoggedIn ? <img src={user.photo} /> : <Account size={24} />}
    </Tooltip>
  </div>
)

const mapState = state => ({
  dayOffset: state.value.dayOffset,
  filtersExpanded: selectFiltersExpanded(state),
  user: state.data.user,
  isLoggedIn: isLoggedIn(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({setDayOffset, openModal, setFiltersExpanded}, dispatch)

export default connect(mapState, mapDispatchToProps)(DaySelector)
