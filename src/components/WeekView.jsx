import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  ConfirmationDialog,
  AppointmentTooltip,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";

import Alert from "@material-ui/lab/Alert";

import DriverSelect from "./DriverSelect";
import {
  addAppointment,
  editAppointment,
  deleteAppointment,
} from "../redux/actions/appointmentActions";

import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);
moment().format();

function Week({
  appointments,
  addAppointment,
  editAppointment,
  deleteAppointment,
  drivers,
}) {
  const currentDriver = drivers.selectedDriver.id;
  const data = appointments[currentDriver];

  const [currentDate, setCurrentDate] = useState(Date.now());
  const [error, setErrors] = useState({});

  const currentDateChange = currentDate => {
    setCurrentDate(currentDate);
  };

  const commitChanges = ({ added, changed, deleted }) => {
    const errors = {};

    let startDate, endDate;
    if (added) {
      startDate = added.startDate;
      endDate = added.endDate;
    } else if (changed) {
      startDate = changed.startDate;
      endDate = changed.endDate;
    }

    const newAppointmentRange = moment.range(startDate, endDate);

    data.forEach(appointment => {
      const { startDate, endDate } = appointment;

      const oldAppointmentRange = moment.range(startDate, endDate);
      if (newAppointmentRange.overlaps(oldAppointmentRange)) {
        errors.overlap = "Tasks cannot overlap";

        setErrors(errors);
      }
    });

    if (!moment(startDate).isSame(endDate, "day")) {
      errors.sameDay = "A task can't go into the next day";

      setErrors(errors);
    }

    if (added) {
      if (!added.title) added.title = "Pickup";

      if (Object.keys(errors).length === 0) {
        setErrors({});
        addAppointment({ added, currentDriver });
      }
    }

    if (changed) {
      if (Object.keys(errors).length === 0) {
        setErrors({});
        editAppointment({ changed, currentDriver });
      }
    }
    if (deleted !== undefined) {
      deleteAppointment({ deleted, currentDriver });
    }
  };

  const messages = {
    moreInformationLabel: "",
  };

  const TextEditor = props => {
    if (props.type === "titleTextEditor") {
      return null;
    }
    return <AppointmentForm.TextEditor {...props} />;
  };

  const CommandLayout = ({ onCommitButtonClick, ...rest }) => {
    return (
      <AppointmentForm.CommandLayout
        onCommitButtonClick={onCommitButtonClick}
        {...rest}
      />
    );
  };

  const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onDispatchChange = title => {
      onFieldChange({ title });
    };

    const onLocationChange = location => {
      onFieldChange({ location });
    };

    appointmentData.title = appointmentData.title
      ? appointmentData.title
      : "Pickup";

    return (
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
      >
        <AppointmentForm.Label text="Location" type="title" />
        <AppointmentForm.TextEditor
          value={appointmentData.location}
          onValueChange={onLocationChange}
          placeholder="Location"
        />
        <AppointmentForm.Label text="Type of Dispatch" type="title" />
        <AppointmentForm.Select
          availableOptions={[
            { id: "Pickup", text: "Pickup" },
            { id: "Dropoff", text: "Dropoff" },
            { id: "Other", text: "Other" },
          ]}
          onValueChange={onDispatchChange}
          value={appointmentData.title}
        />
      </AppointmentForm.BasicLayout>
    );
  };

  return (
    <Paper>
      <Scheduler data={data} height={936}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={currentDateChange}
        />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <WeekView startDayHour={0} endDayHour={24} />
        <Toolbar />
        <DateNavigator />
        <DriverSelect />

        <TodayButton />
        <ConfirmationDialog />
        <Appointments />
        {error.sameDay && <Alert severity="error">{error.sameDay}</Alert>}
        {error.overlap && <Alert severity="error">{error.overlap}</Alert>}
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm
          basicLayoutComponent={BasicLayout}
          textEditorComponent={TextEditor}
          // Hides radio boxes
          booleanEditorComponent={() => null}
          messages={messages}
          commandLayoutComponent={CommandLayout}
        />
      </Scheduler>
    </Paper>
  );
}

const mapStateToProps = state => ({
  appointments: state.appointments,
  drivers: state.drivers,
});

export default connect(mapStateToProps, {
  addAppointment,
  editAppointment,
  deleteAppointment,
})(Week);

/**
 * TODO *
 * ! If new tasks conflicts, give option to delete old task
 * ? If updating a task causes it to conflict with another task, give option to delete old task
 * [x] Task cannot span multiple days
 */
