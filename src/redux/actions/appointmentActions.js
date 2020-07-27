import { ADD_APPOINTMENT, EDIT_APPOINTMENT } from "../actionTypes";

export const addAppointment = appointment => dispatch => {
  dispatch({
    type: ADD_APPOINTMENT,
    payload: appointment,
  });
};

export const editAppointment = newData => dispatch => {
  dispatch({
    type: EDIT_APPOINTMENT,
    payload: newData,
  });
};
