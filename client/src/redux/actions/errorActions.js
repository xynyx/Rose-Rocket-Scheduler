import { SET_ERRORS } from "../actionTypes";

export const setErrors = error => dispatch => {
  dispatch({
    type: SET_ERRORS,
    payload: error,
  });
};
