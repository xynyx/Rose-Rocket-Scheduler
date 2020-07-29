import { combineReducers } from "redux";
import appointmentReducer from "./appointmentReducer";
import driverReducer from "./driverReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  appointments: appointmentReducer,
  drivers: driverReducer,
  errors: errorReducer,
});
