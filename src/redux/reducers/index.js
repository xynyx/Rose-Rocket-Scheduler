import { combineReducers } from "redux";
import appointmentReducer from "./appointmentReducer";

export default combineReducers({
  users: appointmentReducer,
});
