import fetch from 'isomorphic-fetch'

import {
  PENDING,
  FULFILLED,
  REJECTED,
  POST,
  GET,
} from 'constants'

import {
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
  SIGNUP_USER,
} from './types'

export const loginUser = body => async (dispatch) => {
  let action = {
    type: LOGIN_USER,
    status: PENDING,
  }
  dispatch(action)

  const endpoint = `${API_HOST}/auth/login`

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  const options = {
    method: POST,
    headers,
    body: JSON.stringify(body),
  }

  try {
    const response = await fetch(endpoint, options)
    const json = await response.json()
    const payload = response.ok ? json : null
    const status = response.ok ? FULFILLED : REJECTED

    action = {
      ...action,
      status,
      payload,
    }

    if (response.ok) {
      const { token } = json
      localStorage.clear()
      localStorage.setItem('tm_id_token', token)
    }

    dispatch(action)
  } catch (error) {
    action = {
      ...action,
      status: REJECTED,
      error,
    }

    dispatch(action)
  }
}

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER, status: FULFILLED })
  localStorage.removeItem('tm_id_token')
}

export const authenticateUser = token => async (dispatch) => {
  let action = {
    type: AUTH_USER,
    status: PENDING,
  }
  dispatch(action)

  const endpoint = `${API_HOST}/auth/user`

  const headers = {
    authorization: token,
  }

  const options = {
    method: GET,
    headers,
  }

  try {
    const response = await fetch(endpoint, options)
    const json = await response.json()
    const payload = response.ok ? json : null
    const status = response.ok ? FULFILLED : REJECTED

    action = {
      ...action,
      status,
      payload,
    }

    dispatch(action)
  } catch (error) {
    action = {
      ...action,
      status: REJECTED,
      error,
    }

    dispatch(action)
  }
}

export const signupUser = userData => async (dispatch) => {
  let action = {
    type: SIGNUP_USER,
    status: PENDING,
  }
  dispatch(action)

  const endpoint = `${API_HOST}/auth/signup`

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  const options = {
    method: POST,
    headers,
    body: JSON.stringify(userData),
  }

  try {
    const response = await fetch(endpoint, options)
    const payload = await response.json()
    const status = response.ok ? FULFILLED : REJECTED

    action = {
      ...action,
      status,
      payload,
    }

    dispatch(action)
  } catch (error) {
    action = {
      ...action,
      status: REJECTED,
      error,
    }

    dispatch(action)
  }
}
