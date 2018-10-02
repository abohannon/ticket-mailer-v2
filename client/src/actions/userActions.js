import {
  UPDATE_USER_RESOLVED,
  UPDATE_USER_PENDING,
  UPDATE_USER_REJECTED,
} from 'actions/types';

import { POST } from 'constants';

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
