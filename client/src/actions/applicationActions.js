import fetch from 'isomorphic-fetch';

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

import { GET, POST } from 'constants';

import { fetchHelper } from 'helpers/util';

export const fetchTours = () => async (dispatch) => {
  let action = {
    type: FETCH_TOURS_PENDING,
  };
  dispatch(action);

  const endpoint = `${API_HOST}/data/fetchTours`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('tm_id_token'),
  };

  const options = {
    method: GET,
    headers,
  };

  try {
    const payload = await fetchHelper(endpoint, options);

    action = {
      type: FETCH_TOURS_RESOLVED,
      payload,
    };

    dispatch(action);
  } catch (err) {
    action = {
      type: FETCH_TOURS_REJECTED,
      payload: err,
    };
    dispatch(action);
  }
};

export const fetchShows = searchQuery => async (dispatch) => {
  let action = {
    type: FETCH_SHOWS_PENDING,
  };
  dispatch(action);

  const endpoint = searchQuery ? `${API_HOST}/data/fetchShows${searchQuery}` : `${API_HOST}/data/fetchShows`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('tm_id_token'),
  };

  const options = {
    method: GET,
    headers,
  };

  try {
    const payload = await fetchHelper(endpoint, options);

    action = {
      type: FETCH_SHOWS_RESOLVED,
      payload,
    };

    dispatch(action);
  } catch (err) {
    action = {
      type: FETCH_SHOWS_REJECTED,
      payload: err,
    };
    dispatch(action);
  }
};

export const fetchOrders = searchQuery => async (dispatch) => {
  let action = {
    type: FETCH_ORDERS_PENDING,
  };
  dispatch(action);

  const endpoint = searchQuery ? `${API_HOST}/data/fetchOrders${searchQuery}` : `${API_HOST}/data/fetchOrders`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('tm_id_token'),
  };

  const options = {
    method: GET,
    headers,
  };

  try {
    const payload = await fetchHelper(endpoint, options);

    action = {
      type: FETCH_ORDERS_RESOLVED,
      payload,
    };

    dispatch(action);
  } catch (err) {
    action = {
      type: FETCH_ORDERS_REJECTED,
      payload: err,
    };
    dispatch(action);
  }
};

export const fetchEmail = searchQuery => async (dispatch) => {
  let action = {
    type: FETCH_EMAIL_PENDING,
  };
  dispatch(action);

  const endpoint = `${API_HOST}/data/fetchEmail${searchQuery}`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('tm_id_token'),
  };

  const options = {
    method: GET,
    headers,
  };

  try {
    const payload = await fetchHelper(endpoint, options);

    action = {
      type: FETCH_EMAIL_RESOLVED,
      payload,
    };

    dispatch(action);
  } catch (err) {
    action = {
      type: FETCH_EMAIL_REJECTED,
      payload: err,
    };
    dispatch(action);
  }
};

export const saveEmail = data => async (dispatch) => {
  let action = {
    type: SAVE_EMAIL_PENDING,
  };
  dispatch(action);

  const endpoint = `${API_HOST}/data/saveEmail`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('tm_id_token'),
  };

  const options = {
    method: POST,
    headers,
    body: JSON.stringify(data),
  };

  try {
    const payload = await fetchHelper(endpoint, options);

    action = {
      type: SAVE_EMAIL_RESOLVED,
      payload,
    };

    dispatch(action);
  } catch (err) {
    action = {
      type: SAVE_EMAIL_REJECTED,
      payload: err,
    };
    dispatch(action);
  }
};

export const sendEmail = emailData => async (dispatch) => {
  let action = {
    type: SEND_EMAIL_PENDING,
  };
  dispatch(action);

  const endpoint = `${API_HOST}/data/sendEmail`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('tm_id_token'),
  };

  const options = {
    method: POST,
    headers,
    body: JSON.stringify(emailData),
  };

  try {
    const payload = await fetchHelper(endpoint, options);

    action = {
      type: SEND_EMAIL_RESOLVED,
      payload,
    };

    dispatch(action);
  } catch (err) {
    action = {
      type: SEND_EMAIL_REJECTED,
      payload: err,
    };
    dispatch(action);
  }
};
