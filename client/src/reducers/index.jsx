import { combineReducers } from 'redux';
import authentication from './authentication';
import application from './application';

export default combineReducers({
  authentication,
  application,
});
