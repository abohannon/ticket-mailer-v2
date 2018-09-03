import {
  FETCH_TOURS_RESOLVED,
  FETCH_TOURS_PENDING,
  FETCH_TOURS_REJECTED,
  FETCH_ALL_SHOWS_RESOLVED,
  FETCH_ALL_SHOWS_PENDING,
  FETCH_ALL_SHOWS_REJECTED,
} from 'actions/types';

const INITIAL_STATE = {
  fetchToursResolved: {},
  fetchToursPending: {},
  fetchToursRejected: {},
  fetchAllShowsResolved: {},
  fetchAllShowsPending: {},
  fetchAllShowsRejected: {},
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
    case FETCH_ALL_SHOWS_RESOLVED: {
      const newState = {
        fetchAllShowsResolved: action,
        fetchAllShowsPending: {},
        fetchAllShowsRejected: {},
      };
      return { ...state, ...newState };
    }
    case FETCH_ALL_SHOWS_PENDING: {
      const newState = {
        fetchAllShowsResolved: {},
        fetchAllShowsPending: action,
        fetchAllShowsRejected: {},
      };
      return { ...state, ...newState };
    }
    case FETCH_ALL_SHOWS_REJECTED: {
      const newState = {
        fetchAllShowsResolved: {},
        fetchAllShowsPending: {},
        fetchAllShowsRejected: action,
      };
      return { ...state, ...newState };
    }

    default:
      return state;
  }
};
