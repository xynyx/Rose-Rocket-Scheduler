import {
  ADD_APPOINTMENT,
  EDIT_APPOINTMENT,
  DELETE_APPOINTMENT,
} from "../actionTypes";

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

export const deleteAppointment = appointmentId => dispatch => {
  console.log('appointmentId :>> ', appointmentId);
  // dispatch({
  //   type: DELETE_APPOINTMENT,
  //   payload: appointmentId,
  // });
};
