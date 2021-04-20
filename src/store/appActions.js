import { postUser } from "../services/appService";

export function setUser(user) {
  return async (dispatch) => {
    try {
      const userDetails = await postUser(user)
      dispatch({ type: 'SET_USER', userDetails })
    } catch (err) {
      console.log('err SET_USER', err);
    }
  }
}