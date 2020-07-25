import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";

function Week({ users }) {
  // Test
  const data = users[1].appts;

  const [currentDate, setCurrentDate] = useState(Date.now());

  const currentDateChange = currentDate => {
    setCurrentDate(currentDate);
  };

  return (
    <Paper>
      <Scheduler data={data} height={936}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={currentDateChange}
        />
        <WeekView startDayHour={0} endDayHour={24} />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments />
      </Scheduler>
    </Paper>
  );
}

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps, {})(Week);
