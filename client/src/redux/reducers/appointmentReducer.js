import {
  ADD_APPOINTMENT,
  EDIT_APPOINTMENT,
  DELETE_APPOINTMENT,
} from "../actionTypes";

import { initialState } from "../initialState/appointmentState";

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_APPOINTMENT:
      const currentDriverId = action.payload.currentDriver;
      const newAppointmentState = [...state[currentDriverId]];

      const startingAddedId =
        newAppointmentState.length > 0
          ? newAppointmentState[newAppointmentState.length - 1].id + 1
          : 0;

      newAppointmentState.push({
        id: startingAddedId,
        ...action.payload.added,
      });

      return {
        ...state,
        [currentDriverId]: newAppointmentState,
      };

    case EDIT_APPOINTMENT:
      const { currentDriver, changed } = action.payload;

      const updatedAppointments = state[currentDriver].map(appointment => {
        return changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment;
      });

      return { ...state, [currentDriver]: updatedAppointments };

    case DELETE_APPOINTMENT:
      const { deleted } = action.payload;
      const currentDriverID = action.payload.currentDriver;

      const updatedAppointmentsAgain = state[currentDriverID].filter(
        appointment => appointment.id !== deleted
      );

      return {
        ...state,
        [currentDriverID]: updatedAppointmentsAgain,
      };

    default:
      return state;
  }
}
