import { ADD_APPOINTMENT } from "../actionTypes";

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

      newAppointmentState.push(action.payload.added);

      return {
        ...state,
        [currentDriverId]: newAppointmentState,
      };
    default:
      return state;
  }
}
