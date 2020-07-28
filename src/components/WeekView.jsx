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

import moment from "moment";
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

  const [appointment, setAppointment] = useState({});
  const [currentDate, setCurrentDate] = useState(Date.now());
  const [error, setErrors] = useState({});

  const currentDateChange = currentDate => {
    setCurrentDate(currentDate);
  };

  const checkErrorsAndCommitChanges = () => {};

  const checkErrors = appointment => {
    const { startDate, endDate } = appointment;
    const errors = {};

    if (!moment(startDate).isSame(endDate, "day")) {
      errors.sameDay = "A task can't go into the next day";

      setErrors(errors);
      return true;
    } else {
      setErrors({});
      return false;
    }
  };

  const commitChanges = ({ added, changed, deleted }) => {
    const errors = {};

    const { startDate, endDate } = added;
    if (added) {
      if (!added.title) added.title = "Pickup";

      // console.log("value :>> ", value);
      if (!moment(startDate).isSame(endDate, "day")) {
        errors.sameDay = "A task can't go into the next day";

        setErrors(errors);
      } else {
        setErrors({});
        addAppointment({ added, currentDriver });
      }
    }

    if (changed) {
      editAppointment({ changed, currentDriver });
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

  const changeAddedAppointment = ({ appointmentData }) => {
    console.log("appointmentData :>> ", appointmentData);
    // const errors = {};

    // const { startDate, endDate } = appointment;

    // if (!moment(startDate).isSame(endDate, "day")) {
    //   errors.sameDay = "A task can't go into the next day";

    //   setErrors(errors);
    // } else {
    //   setErrors({});
    // }
  };

  // const DateComponent = ({ onFieldChange, onValueChange, value, ...rest }) => {
  //   // console.log("value2 :>> ", value);
  //   // console.log('{...rest} :>> ', {...rest});
  //   const compareValues = newValue => {
  //     const errors = {};
  //     // console.log("onValueChange :>> ", onValueChange);
  //     // console.log("value2", newValue);
  //     // console.log("value :>> ", value);
  //     if (!moment(value).isSame(newValue, "day")) {
  //       errors.sameDay = "A task can't go into the next day";

  //       setErrors(errors);
  //     } else {
  //       onValueChange(newValue)
  //       setErrors({});
  //     }
  //   };
  //   // console.log("onValueChange :>> ", onValueChange);
  //   return (
  //     <AppointmentForm.DateEditor
  //       {...rest}
  //       onValueChange={compareValues}
  //       value={value}
  //     />
  //   );
  // };

  const CommandLayout = ({ onCommitButtonClick, ...rest }) => {
    return (
      <AppointmentForm.CommandLayout
        onCommitButtonClick={onCommitButtonClick}
        {...rest}
      />
    );
  };

  // const changeAppointmentChanges =(appointmentChanges) => {
  //   console.log('appointmentChanges', appointmentChanges)
  //   setAppointment(appointmentChanges)
  // }

  const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    // console.log("appointmentData :>> ", appointmentData);

    // const { startDate, endDate } = appointmentData;
    // if (!moment(startDate).isSame(endDate, "day")) {
    //   console.log("wrong");
    //   errors.sameDay = "A task can't go into the next day";

    //   setErrors(errors);
    // } else {
    //   setErrors({});
    // }
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
        <EditingState
          onCommitChanges={commitChanges}
          // onAppointmentChangesChange={changeAppointmentChanges}
          // appointmentChanges={appointment}

          // addedAppointment={appointment.addedAppointment}
          // onAddedAppointmentChange={changeAddedAppointment}
          // onAppointmentChangesChange={changeAppointmentChanges}
          // editingAppointmentId={appointment.editingAppointmentId}
          // onEditingAppointmentIdChange={changeEditingAppointment}
        />
        <IntegratedEditing />
        <WeekView startDayHour={0} endDayHour={24} />
        <Toolbar />
        <DateNavigator />
        <DriverSelect />
        
        <TodayButton />
        <ConfirmationDialog />
        <Appointments />
        {error.sameDay && <Alert severity="error">{error.sameDay}</Alert>}
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm
          basicLayoutComponent={BasicLayout}
          textEditorComponent={TextEditor}
          // Hides radio boxes
          booleanEditorComponent={() => null}
          messages={messages}
          commandLayoutComponent={CommandLayout}
          // dateEditorComponent={DateComponent}
          // onAppointmentDataChange={() => changeAddedAppointment}
          // onAppointmentDataChange={() => changeAddedAppointment}
          // weeklyRecurrenceSelectorComponent={weeklyRecurrence}
          // recurrenceLayoutComponent={() => null}
          // commandButtonComponent={() => null}
          // dateEditorComponent={() => null}
          // Hides radio boxes
          // commandLayoutComponent={() => null}
          // labelComponent={() => null}
          // selectComponent={() => null}
          // resourceEditorComponent={() => null}
          // selectComponent={selectProps}
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
 * * Task cannot span multiple days
 */
