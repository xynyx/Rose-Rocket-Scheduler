import { SET_ERRORS } from "../actionTypes";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
