import {
  UPDATE_USER_RESOLVED,
  UPDATE_USER_PENDING,
  UPDATE_USER_REJECTED,
  FETCH_USERS_RESOLVED,
  FETCH_USERS_PENDING,
  FETCH_USERS_REJECTED,
} from 'actions/types';

const INITIAL_STATE = {
  updateUserResolved: {},
  updateUserPending: {},
  updateUserRejected: {},
  fetchUsersResolved: {},
  fetchUsersPending: {},
  fetchUsersRejected: {},
};

export default (state = INITIAL_STATE, action) => {
  const { status, type, payload } = action;

  switch (type) {
    case UPDATE_USER_RESOLVED:
      return {
        updateUserResolved: action,
        updateUserPending: {},
        updateUserRejected: {},
      };
    case UPDATE_USER_PENDING:
      return {
        updateUserResolved: {},
        updateUserPending: action,
        updateUserRejected: {},
      };
    case UPDATE_USER_REJECTED:
      return {
        updateUserResolved: {},
        updateUserPending: {},
        updateUserRejected: action,
      };
    case FETCH_USERS_RESOLVED:
      return {
        fetchUsersResolved: action,
        fetchUsersPending: {},
        fetchUsersRejected: {},
      };
    case FETCH_USERS_PENDING:
      return {
        fetchUsersResolved: {},
        fetchUsersPending: action,
        fetchUsersRejected: {},
      };
    case FETCH_USERS_REJECTED:
      return {
        fetchUsersResolved: {},
        fetchUsersPending: {},
        fetchUsersRejected: action,
      };
    default:
      return state;
  }
};
