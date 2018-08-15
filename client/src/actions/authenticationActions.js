import fetch from 'isomorphic-fetch';
import {
  LOGIN_USER,
} from './types';

import {
  PENDING,
  FULFILLED,
  REJECTED,
  POST,
} from '../constants';

export const loginUser = body => async (dispatch) => {
  let action = {
    type: LOGIN_USER,
    status: PENDING,
  };
  dispatch(action);

  const endpoint = `${API_HOST}/api/auth/login`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const options = {
    method: POST,
    headers,
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(endpoint, options);
    const json = await response.json();
    const payload = response.ok ? json.user : json;
    const status = response.ok ? FULFILLED : REJECTED;

    action = {
      ...action,
      status,
      payload,
    };

    if (response.ok) {
      const { token } = json;
      localStorage.setItem('id_token', token);
    }

    dispatch(action);
  } catch (error) {
    action = {
      ...action,
      status: REJECTED,
      error,
    };

    dispatch(action);
  }
};
