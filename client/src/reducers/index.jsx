import { combineReducers } from 'redux'
import authentication from './authentication'
import application from './application'
import user from './user'
import email from './email'

export default combineReducers({
  authentication,
  application,
  user,
  email,
})
