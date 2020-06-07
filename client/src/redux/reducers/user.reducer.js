import { USER } from '../actions'

const initial_state = {
  is_login: false,
  user: null,
}

export default (state = initial_state, action) => {
  switch (action.type) {
    case USER.SET_LOGIN: {
      return Object.assign(
        {},
        {
          is_login: true,
          user: action.payload.user,
        }
      )
    }
    case USER.SET_LOGOUT: {
      return Object.assign(
        {},
        {
          is_login: false,
          user: null,
        }
      )
    }
    default:
      return state
  }
}
