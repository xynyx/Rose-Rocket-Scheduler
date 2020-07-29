import { SET_DOWNLOAD_INTERVAL, SET_DOWNLOAD_YEAR } from "../actionTypes";

export const setDownloadYear = year => dispatch => {
  dispatch({
    type: SET_DOWNLOAD_YEAR,
    payload: year,
  });
};

export const setDownloadInterval = interval => dispatch => {
  dispatch({
    type: SET_DOWNLOAD_INTERVAL,
    payload: interval,
  });
};
