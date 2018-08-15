import {
  LOGIN_USER,
} from '../actions/types';

import {
  PENDING,
  FULFILLED,
  REJECTED,
} from '../constants';

const INITIAL_STATE = {
  isAuthenticated: false,
  pending: {},
  fulfilled: {},
  rejected: {},
};

export default (state = INITIAL_STATE, action) => {
  const { status, type, payload } = action;

  switch (type) {
    case LOGIN_USER: {
      if (status === PENDING) {
        const newState = { pending: action };

        return { ...state, ...newState };
      }

      if (status === REJECTED) {
        const newState = { rejected: action };

        return { ...state, ...newState };
      }

      const newState = {
        isAuthenticated: true,
        fulfilled: action,
      };

      return { ...state, ...newState };
    }
    default:
      return state;
  }
};
