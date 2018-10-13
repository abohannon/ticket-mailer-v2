import {
  UPDATE_USER_RESOLVED,
  UPDATE_USER_PENDING,
  UPDATE_USER_REJECTED,
  FETCH_USERS_RESOLVED,
  FETCH_USERS_PENDING,
  FETCH_USERS_REJECTED,
  DELETE_USER_RESOLVED,
  DELETE_USER_PENDING,
  DELETE_USER_REJECTED,
} from 'actions/types';

import { GET, POST, DELETE } from 'constants';

export const deleteUser = userId => async (dispatch) => {
  let action = {
    type: DELETE_USER_PENDING,
  };
  dispatch(action);

  const endpoint = `${API_HOST}/user/deleteUser?userId=${userId}`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('tm_id_token'),
  };

  const options = {
    method: DELETE,
    headers,
  };

  try {
    const response = await fetch(endpoint, options);
    const json = await response.json();
    const payload = response.ok ? json : null;

    action = {
      type: DELETE_USER_RESOLVED,
      payload,
    };

    dispatch(action);
  } catch (err) {
    action = {
      type: DELETE_USER_REJECTED,
      payload: err,
    };
    dispatch(action);
  }
};

export const fetchUsers = () => async (dispatch) => {
  let action = {
    type: FETCH_USERS_PENDING,
  };
  dispatch(action);

  const endpoint = `${API_HOST}/user/fetchUsers`;

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
    const response = await fetch(endpoint, options);
    const json = await response.json();
    const payload = response.ok ? json : null;

    action = {
      type: FETCH_USERS_RESOLVED,
      payload,
    };

    dispatch(action);
  } catch (err) {
    action = {
      type: FETCH_USERS_REJECTED,
      payload: err,
    };
    dispatch(action);
  }
};

export const updateUser = updatedUserData => async (dispatch) => {
  let action = {
    type: UPDATE_USER_PENDING,
  };
  dispatch(action);

  const endpoint = `${API_HOST}/user/updateUser`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('tm_id_token'),
  };

  const options = {
    method: POST,
    headers,
    body: JSON.stringify(updatedUserData),
  };

  try {
    const response = await fetch(endpoint, options);
    const json = await response.json();
    const payload = response.ok ? json : null;

    action = {
      type: UPDATE_USER_RESOLVED,
      payload,
    };

    dispatch(action);
  } catch (err) {
    action = {
      type: UPDATE_USER_REJECTED,
      payload: err,
    };
    dispatch(action);
  }
};
