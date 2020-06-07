import { combineReducers } from 'redux'

import AppStorage from './app.reducer'
import UserStorage from './user.reducer'

export default combineReducers({
  AppStorage,
  UserStorage
})
