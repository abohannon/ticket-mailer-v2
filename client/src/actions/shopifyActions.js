import fetch from 'isomorphic-fetch';

import {
  FETCH_TOURS_RESOLVED,
  FETCH_TOURS_PENDING,
  FETCH_TOURS_REJECTED,
  FETCH_ALL_SHOWS_RESOLVED,
  FETCH_ALL_SHOWS_PENDING,
  FETCH_ALL_SHOWS_REJECTED,
} from 'actions/types';

import { GET } from 'constants';

export const fetchTours = () => async (dispatch) => {
  let action = {
    type: FETCH_TOURS_PENDING,
  };
  dispatch(action);

  const endpoint = `${API_HOST}/fetchTours`;
  const options = { method: GET };

  try {
    const response = await fetch(endpoint, options);
    const json = await response.json();
    const payload = response.ok ? json : null;

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

export const fetchAllShows = () => async (dispatch) => {
  let action = {
    type: FETCH_ALL_SHOWS_PENDING,
  };
  dispatch(action);

  const endpoint = `${API_HOST}/fetchShows`;
  const options = { method: GET };

  try {
    const response = await fetch(endpoint, options);
    const json = await response.json();
    const payload = response.ok ? json : null;

    action = {
      type: FETCH_ALL_SHOWS_RESOLVED,
      payload,
    };

    dispatch(action);
  } catch (err) {
    action = {
      type: FETCH_ALL_SHOWS_REJECTED,
      payload: err,
    };
    dispatch(action);
  }
};
