
const initialState = {
  user: {},
}

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.userDetails }
    default:
      return state
  }
}