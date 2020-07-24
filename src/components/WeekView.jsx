import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";

export default function Week() {
  const appointments = [
    {
      title: "Website Re-Design Plan",
      startDate: new Date(),
      endDate: new Date(),
      id: 0,
      location: "Room 1",
    },
  ];

  const [state, setState] = useState({
    data: appointments,
    currentDate: Date.now(),
  });

  const currentDateChange = currentDate => {
    setState({ ...state, currentDate });
  };

  return (
    <Paper>
      <Scheduler data={state.data} height={"100%"}>
        <ViewState
          currentDate={state.currentDate}
          onCurrentDateChange={currentDateChange}
        
        />
        <WeekView startDayHour={9} endDayHour={19} />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments />
      </Scheduler>
    </Paper>
  );
}
