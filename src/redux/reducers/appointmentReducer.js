import {
  ADD_APPOINTMENT,
  EDIT_APPOINTMENT,
  DELETE_APPOINTMENT,
} from "../actionTypes";

const initialState = {
  0: [
    {
      title: "Pickup",
      startDate: new Date(),
      endDate: new Date(),
      id: 0,
    },
  ],
  1: [],
  2: [],
};

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
    console.log('action :>> ', action);

    default:
      return state;
  }
}

/*       if (changed) {
        data = data.map(appointment =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data }; */
