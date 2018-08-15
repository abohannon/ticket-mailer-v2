import {
  LOGIN_USER,
} from '../actions/types';

import {
  PENDING,
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
        const newState = {
          pending: action,
          fulfilled: {},
          rejected: {},
        };

        return { ...state, ...newState };
      }

      if (status === REJECTED) {
        const newState = {
          isAuthenticated: false,
          pending: {},
          fulfilled: {},
          rejected: action,
        };

        return { ...state, ...newState };
      }

      const newState = {
        isAuthenticated: true,
        pending: {},
        fulfilled: action,
        rejected: {},
      };

      return { ...state, ...newState };
    }
    default:
      return state;
  }
};
