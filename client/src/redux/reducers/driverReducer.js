import { SET_DRIVER } from "../actionTypes";

import { initialDriverState } from "../initialState";

export default function (state = initialDriverState, action) {
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
