import { SET_DRIVER } from "./actionTypes";

export const setDriver = driverId => dispatch => {
  dispatch({
    type: SET_DRIVER,
    payload: driverId
  })
}