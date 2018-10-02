import { combineReducers } from 'redux';
import authentication from './authentication';
import application from './application';
import user from './user';

export default combineReducers({
  authentication,
  application,
  user,
});
