import { SET_DOWNLOAD_INTERVAL, SET_DOWNLOAD_YEAR } from "../actionTypes";

import { initialDownloadState } from "../initialState";

export default function (state = initialDownloadState, action) {
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
