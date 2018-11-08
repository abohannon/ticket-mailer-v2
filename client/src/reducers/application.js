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
  SEARCH_SHOWS,
  SEARCH_ORDERS,
  CLEAR_SEARCH,
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
  searchResults: [],
  searchValue: '',
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
    case SEARCH_SHOWS: {
      let searchResults;

      if (payload === '') {
        searchResults = [];
      } else {
        searchResults = state.fetchShowsResolved.payload.filter(show => show.title.toLowerCase().includes(payload.toLowerCase()));
      }

      return { ...state, searchValue: payload, searchResults };
    }
    case SEARCH_ORDERS: {
      let searchResults;

      if (payload === '') {
        searchResults = [];
      } else {
        searchResults = state.fetchOrdersResolved.payload.filter((order) => {
          const { first_name, last_name } = order.customer;
          const fullName = `${first_name} ${last_name}`;

          return order.email.toLowerCase().includes(payload.toLowerCase())
        || order.name.toLowerCase().includes(payload.toLowerCase())
        || fullName.toLowerCase().includes(payload.toLowerCase());
        });
      }

      return { ...state, searchValue: payload, searchResults };
    }
    case CLEAR_SEARCH: {
      return { ...state, searchValue: '', searchResults: [] };
    }
    default:
      return state;
  }
};
