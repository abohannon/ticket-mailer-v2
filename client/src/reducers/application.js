import {
  FETCH_TOURS_RESOLVED,
  FETCH_TOURS_PENDING,
  FETCH_TOURS_REJECTED,
  FETCH_SHOWS_RESOLVED,
  FETCH_SHOWS_PENDING,
  FETCH_SHOWS_REJECTED,
} from 'actions/types';

const INITIAL_STATE = {
  fetchToursResolved: {},
  fetchToursPending: {},
  fetchToursRejected: {},
  fetchShowsResolved: {},
  fetchShowsPending: {},
  fetchShowsRejected: {},
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
    case FETCH_SHOWS_RESOLVED: {
      const newState = {
        fetchShowsResolved: action,
        fetchShowsPending: {},
        fetchShowsRejected: {},
      };
      return { ...state, ...newState };
    }
    case FETCH_SHOWS_PENDING: {
      const newState = {
        fetchShowsResolved: {},
        fetchShowsPending: action,
        fetchShowsRejected: {},
      };
      return { ...state, ...newState };
    }
    case FETCH_SHOWS_REJECTED: {
      const newState = {
        fetchShowsResolved: {},
        fetchShowsPending: {},
        fetchShowsRejected: action,
      };
      return { ...state, ...newState };
    }

    default:
      return state;
  }
};
