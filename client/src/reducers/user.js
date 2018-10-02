import {
  UPDATE_USER_RESOLVED,
  UPDATE_USER_PENDING,
  UPDATE_USER_REJECTED,
} from 'actions/types';

const INITIAL_STATE = {
  updateUserResolved: {},
  updateUserPending: {},
  updateUserRejected: {},
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
    default:
      return state;
  }
};
