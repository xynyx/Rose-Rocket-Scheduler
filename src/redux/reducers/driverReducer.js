import { SET_DRIVER } from "../actionTypes";

const initialState = {
  driverList: [
    { id: 0, name: "Bobby McBob" },
    { id: 1, name: "Hammy Hambone" },
    { id: 2, name: "Fluffy" },
  ],
  selectedDriver: { id: 0, name: "Bobby McBob" },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DRIVER:
      const selectedDriver = state.driverList.find(
        driver => driver.id === action.payload
      );
      return {
        ...state,
        selectedDriver,
      };

    default:
      return state;
  }
}
