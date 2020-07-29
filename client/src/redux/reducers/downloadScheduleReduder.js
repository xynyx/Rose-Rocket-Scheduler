import { SET_DOWNLOAD_INTERVAL, SET_DOWNLOAD_YEAR } from "../actionTypes";
import moment from "moment";
moment().format();

const initialState = {
  year: moment().year(),
  interval: 2,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DOWNLOAD_YEAR:
      return {
        ...state,
        year: action.payload,
      };

    case SET_DOWNLOAD_INTERVAL:
      return {
        ...state,
        interval: action.payload,
      };

    default:
      return state;
  }
}
