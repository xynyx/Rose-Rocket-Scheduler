import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
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

function Week({ users }) {
  // Test
  const data = users[1].appts;

  const [currentDate, setCurrentDate] = useState(Date.now());
  const [appointment, setAppointment] = useState({
    // dispatchType: "Pickup",
    addedAppointment: {
      title: "Pickup",
    },
    appointmentChanges: {},
    editingAppointmentId: undefined,
  });

  const currentDateChange = currentDate => {
    setCurrentDate(currentDate);
  };

  const commitChanges = ({ added, changed, deleted }) => {
    console.log("added :>> ", added);
    console.log("changed :>> ", changed);
    console.log("deleted :>> ", deleted);
  };

  // TODO -
  // const addedAppointment = e => {
  //   console.log("e.1 :>> ", e);
  // };
  const changeAddedAppointment = addedAppointment => {
    // console.log("addedAppointment :>> ", addedAppointment);
    // console.log("appointmentHERE! :>> ", appointment);
    setAppointment({
      ...appointment,
      addedAppointment: {
        ...appointment.addedAppointment,
        ...addedAppointment,
      },
    });
  };
  const changeAppointmentChanges = e => {
    console.log("e.3 :>> ", e);
  };
  const changeEditingAppointment = e => {
    console.log("e.5 :>> ", e);
  };

  const messages = {
    moreInformationLabel: "",
  };

  const TextEditor = props => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.type === "titleTextEditor") {
      return null;
    }
    return <AppointmentForm.TextEditor {...props} />;
  };

  const basicLayout = ({
    onFieldChange,
    appointmentData,
    appointmentResources,
    ...restProps
  }) => {
    const onCustomFieldChange = nextValue => {
      onFieldChange({ ...appointment.addedAppointment, title: nextValue });
    };

    // console.log("appointmentResources :>> ", appointmentResources);
    console.log("appointmentData :>> ", appointmentData);
    return (
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
        textEditorComponent={TextEditor}
        // labelComponent={() => null}
      >
        <AppointmentForm.Label text="Type of Dispatch" type="title" />
        <AppointmentForm.Select
          availableOptions={[
            { id: "Pickup", text: "Pickup" },
            { id: "Dropoff", text: "Dropoff" },
            { id: "Other", text: "Other" },
          ]}
          onValueChange={onCustomFieldChange}
          value={appointmentData.title ? appointmentData.title : "Pickup"}
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
          addedAppointment={appointment.addedAppointment}
          onAddedAppointmentChange={changeAddedAppointment}
          onAppointmentChangesChange={changeAppointmentChanges}
          editingAppointmentId={appointment.editingAppointmentId}
          onEditingAppointmentIdChange={changeEditingAppointment}
        />
        <WeekView startDayHour={0} endDayHour={24} />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ConfirmationDialog />
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm
          basicLayoutComponent={basicLayout}
          // Hides radio boxes
          booleanEditorComponent={() => null}
          messages={messages}
        />
      </Scheduler>
    </Paper>
  );
}

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps, {})(Week);
