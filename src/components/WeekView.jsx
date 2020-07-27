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

import DriverSelect from "./DriverSelect";

function Week({ appointments, drivers }) {
  const driverId = drivers.selectedDriver.id;
  const data = appointments[driverId];

  const [currentDate, setCurrentDate] = useState(Date.now());

  const currentDateChange = currentDate => {
    setCurrentDate(currentDate);
  };

  // useEffect(() => {
  //   console.log(appointment.addedAppointment);
  // }, [appointment.addedAppointment]);

  const commitChanges = ({ added, changed, deleted }) => {
    console.log("added :>> ", added);
    console.log("changed :>> ", changed);
    console.log("deleted :>> ", deleted);
  };

  // TODO -

  // const changeAddedAppointment = addedAppointment => {
  //   console.log("addedAppointment :>> ", addedAppointment);
  //   addedAppointment.title = addedAppointment.title
  //     ? addedAppointment.title
  //     : "Pickup";
  //   // console.log("appointmentHERE! :>> ", appointment);
  //   setAppointment({
  //     ...appointment,
  //     addedAppointment: {
  //       ...appointment.addedAppointment,
  //       ...addedAppointment,
  //     },
  //   });
  //   // console.log('appointment :>> ', appointment);
  // };
  // const changeAppointmentChanges = e => {
  //   console.log("e.3 :>> ", e);
  // };
  // const changeEditingAppointment = e => {
  //   console.log("e.5 :>> ", e);
  // };

  const messages = {
    moreInformationLabel: "",
  };

  const TextEditor = props => {
    if (props.type === "titleTextEditor") {
      return null;
    }
    return <AppointmentForm.TextEditor {...props} />;
  };

  const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onDispatchChange = nextValue => {
      onFieldChange({ title: nextValue });
    };

    const onLocationChange = nextValue => {
      onFieldChange({ location: nextValue });
    };

    appointmentData.title = appointmentData.title
      ? appointmentData.title
      : "Pickup";

    console.log("appointmentData :>> ", appointmentData);
    return (
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
        // textEditorComponent={TextEditor}
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
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm
          basicLayoutComponent={BasicLayout}
          textEditorComponent={TextEditor}
          // Hides radio boxes
          booleanEditorComponent={() => null}
          messages={messages}
        />
      </Scheduler>
    </Paper>
  );
}

const mapStateToProps = state => ({
  appointments: state.appointments,
  drivers: state.drivers,
});

export default connect(mapStateToProps, {})(Week);
