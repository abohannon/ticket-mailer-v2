import {
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
} from 'actions/types'

import {
  PENDING,
  REJECTED,
} from 'constants'

const INITIAL_STATE = {
  isAuthenticated: false,
  pending: {},
  fulfilled: {},
  rejected: {},
  currentUser: {},
}

export default (state = INITIAL_STATE, action) => {
  const { status, type, payload } = action

  switch (type) {
    case LOGIN_USER:
    case AUTH_USER: {
      if (status === PENDING) {
        const newState = {
          pending: action,
          fulfilled: {},
          rejected: {},
          currentUser: {},
        }

        return { ...state, ...newState }
      }

      if (status === REJECTED) {
        const newState = {
          isAuthenticated: false,
          pending: {},
          fulfilled: {},
          rejected: action,
          currentUser: {},
        }

        return { ...state, ...newState }
      }

      const newState = {
        isAuthenticated: true,
        pending: {},
        fulfilled: action,
        rejected: {},
        currentUser: payload,
      }

      return { ...state, ...newState }
    }
    case LOGOUT_USER: {
      const newState = {
        isAuthenticated: false,
        fulfilled: action,
        currentUser: {},
      }

      return { ...state, ...newState }
    }
    default:
      return state
  }
}
