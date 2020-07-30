import { SET_DRIVER } from "../actionTypes";

const initialState = {
  driverList: [
    { id: 0, name: "Tulip Train" },
    { id: 1, name: "Daffodil Dirigible" },
    { id: 2, name: "Lily Limosine" },
  ],
  selectedDriver: { id: 0, name: "Tulip Train" },
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
