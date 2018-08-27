import {
  FETCH_TOURS_RESOLVED,
  FETCH_TOURS_PENDING,
  FETCH_TOURS_REJECTED,
} from 'actions/types';

const INITIAL_STATE = {
  fetchToursResolved: {},
  fetchToursPending: {},
  fetchToursRejected: {},
};

export default (state = INITIAL_STATE, action) => {
  const { status, type, payload } = action;

  switch (type) {
    case FETCH_TOURS_RESOLVED: {
      const newState = {
        fetchToursResolved: action,
        fetchToursPending: {},
        fetchToursRejected: {},
      };
      return { ...state, ...newState };
    }
    case FETCH_TOURS_PENDING: {
      const newState = {
        fetchToursResolved: {},
        fetchToursPending: action,
        fetchToursRejected: {},
      };
      return { ...state, ...newState };
    }
    case FETCH_TOURS_REJECTED: {
      const newState = {
        fetchToursResolved: {},
        fetchToursPending: {},
        fetchToursRejected: action,
      };
      return { ...state, ...newState };
    }
    default:
      return state;
  }
};
