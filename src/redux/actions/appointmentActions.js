import { ADD_APPOINTMENT } from "../actionTypes";

export const addAppointment = appointment => dispatch => {
  dispatch({
    type: ADD_APPOINTMENT,
    payload: appointment,
  });
};
