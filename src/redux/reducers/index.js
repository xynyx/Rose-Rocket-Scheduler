import { combineReducers } from "redux";
import appointmentReducer from "./appointmentReducer";
import driverReducer from "./driverReducer";

export default combineReducers({
  appointments: appointmentReducer,
  drivers: driverReducer
});
