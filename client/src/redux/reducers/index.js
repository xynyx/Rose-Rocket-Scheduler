import { combineReducers } from "redux";
import appointmentReducer from "./appointmentReducer";
import driverReducer from "./driverReducer";
import downloadScheduleReducer from "./downloadScheduleReducer";

export default combineReducers({
  appointments: appointmentReducer,
  drivers: driverReducer,
  downloadScheduleOptions: downloadScheduleReducer,
});
