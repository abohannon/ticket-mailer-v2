import {
  FETCH_TOURS_RESOLVED,
  FETCH_TOURS_PENDING,
  FETCH_TOURS_REJECTED,
  FETCH_SHOWS_RESOLVED,
  FETCH_SHOWS_PENDING,
  FETCH_SHOWS_REJECTED,
  FETCH_ORDERS_RESOLVED,
  FETCH_ORDERS_PENDING,
  FETCH_ORDERS_REJECTED,
  FETCH_EMAIL_RESOLVED,
  FETCH_EMAIL_PENDING,
  FETCH_EMAIL_REJECTED,
  SAVE_EMAIL_RESOLVED,
  SAVE_EMAIL_PENDING,
  SAVE_EMAIL_REJECTED,
  SEND_EMAIL_RESOLVED,
  SEND_EMAIL_PENDING,
  SEND_EMAIL_REJECTED,
} from 'actions/types';

const INITIAL_STATE = {
  fetchToursResolved: {},
  fetchToursPending: {},
  fetchToursRejected: {},
  fetchShowsResolved: {},
  fetchShowsPending: {},
  fetchShowsRejected: {},
  fetchOrdersResolved: {},
  fetchOrdersPending: {},
  fetchOrdersRejected: {},
  fetchEmailResolved: {},
  fetchEmailPending: {},
  fetchEmailRejected: {},
  saveEmailResolved: {},
  saveEmailPending: {},
  saveEmailRejected: {},
  sendEmailResolved: {},
  sendEmailPending: {},
  sendEmailRejected: {},
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
    case FETCH_ORDERS_RESOLVED: {
      const newState = {
        fetchOrdersResolved: action,
        fetchOrdersPending: {},
        fetchOrdersRejected: {},
      };
      return { ...state, ...newState };
    }
    case FETCH_ORDERS_PENDING: {
      const newState = {
        fetchOrdersResolved: {},
        fetchOrdersPending: action,
        fetchOrdersRejected: {},
      };
      return { ...state, ...newState };
    }
    case FETCH_ORDERS_REJECTED: {
      const newState = {
        fetchOrdersResolved: {},
        fetchOrdersPending: {},
        fetchOrdersRejected: action,
      };
      return { ...state, ...newState };
    }
    case FETCH_EMAIL_RESOLVED: {
      const newState = {
        fetchEmailResolved: action,
        fetchEmailPending: {},
        fetchEmailRejected: {},
      };
      return { ...state, ...newState };
    }
    case FETCH_EMAIL_PENDING: {
      const newState = {
        fetchEmailResolved: {},
        fetchEmailPending: action,
        fetchEmailRejected: {},
      };
      return { ...state, ...newState };
    }
    case FETCH_EMAIL_REJECTED: {
      const newState = {
        fetchEmailResolved: {},
        fetchEmailPending: {},
        fetchEmailRejected: action,
      };
      return { ...state, ...newState };
    }
    case SAVE_EMAIL_RESOLVED: {
      const newState = {
        saveEmailResolved: action,
        saveEmailPending: {},
        saveEmailRejected: {},
      };
      return { ...state, ...newState };
    }
    case SAVE_EMAIL_PENDING: {
      const newState = {
        saveEmailResolved: {},
        saveEmailPending: action,
        saveEmailRejected: {},
      };
      return { ...state, ...newState };
    }
    case SAVE_EMAIL_REJECTED: {
      const newState = {
        saveEmailResolved: {},
        saveEmailPending: {},
        saveEmailRejected: action,
      };
      return { ...state, ...newState };
    }
    case SEND_EMAIL_RESOLVED: {
      const newState = {
        sendEmailResolved: action,
        sendEmailPending: {},
        sendEmailRejected: {},
      };
      return { ...state, ...newState };
    }
    case SEND_EMAIL_PENDING: {
      const newState = {
        sendEmailResolved: {},
        sendEmailPending: action,
        sendEmailRejected: {},
      };
      return { ...state, ...newState };
    }
    case SEND_EMAIL_REJECTED: {
      const newState = {
        sendEmailResolved: {},
        sendEmailPending: {},
        sendEmailRejected: action,
      };
      return { ...state, ...newState };
    }
    default:
      return state;
  }
};
