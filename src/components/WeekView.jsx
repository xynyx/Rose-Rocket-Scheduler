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

  const currentDateChange = currentDate => {
    setCurrentDate(currentDate);
  };

  const commitChanges = ({ added, changed, deleted }) => {
    console.log("added :>> ", added);
    console.log("changed :>> ", changed);
    console.log("deleted :>> ", deleted);
  };

  // TODO -
  const addedAppointment = e => {
    console.log("e.1 :>> ", e);
  };
  const changeAddedAppointment = e => {
    console.log("e.2 :>> ", e);
  };
  const changeAppointmentChanges = e => {
    console.log("e.3 :>> ", e);
  };
  const editingAppointmentId = e => {
    console.log("e.4 :>> ", e);
  };
  const changeEditingAppointment = e => {
    console.log("e.5 :>> ", e);
  };

  const test = e => {
    console.log(e);
  };

  const messages = {
    moreInformationLabel: '',
  };

  const TextEditor = (props) => {
    console.log('props.type :>> ', props.type);
    // eslint-disable-next-line react/destructuring-assignment
    if (props.type === 'multilineTextEditor') {
      return null;
    } return <AppointmentForm.TextEditor {...props} />;
  };

  const radioComponent = props => {
    console.log("props.type :>> ", props);
    if (props.type === "endRepeat") {
      return null;
    }
    return <AppointmentForm.RadioGroup {...props} />;
  };

  const weeklyRecurrence = props => {
    return null;
  }

  const basicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onCustomFieldChange = nextValue => {
      onFieldChange({ customField: nextValue });
    };

    return (
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
        textEditorComponent={() => null}
            // labelComponent={() => null}

      >
        <AppointmentForm.Label text="Type of Dispatch" type="title" />
        <AppointmentForm.Select
          availableOptions={[
            { id: 0, text: "Pickup" },
            { id: 1, text: "Dropoff" },
            { id: 2, text: "Other" },
          ]}
          onValueChange={test}
          value={0}
        />
      </AppointmentForm.BasicLayout>
    );
  };

  // const selectProps = () => {
  //   return (
  //     <AppointmentForm.Select
  //       availableOptions={[
  //         { id: 0, text: "One" },
  //         { id: 1, text: "Two" },
  //         { id: 2, text: "Three" },
  //       ]}
  //       onValueChange={test}
  //       value={0}
  //     />
  //   );
  // };

  return (
    <Paper>
      <Scheduler data={data} height={936}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={currentDateChange}
        />
        <EditingState
          onCommitChanges={commitChanges}
          addedAppointment={addedAppointment}
          onAddedAppointmentChange={changeAddedAppointment}
          onAppointmentChangesChange={changeAppointmentChanges}
          editingAppointmentId={editingAppointmentId}
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
          // weeklyRecurrenceSelectorComponent={weeklyRecurrence}
          textEditorComponent={TextEditor}
          // recurrenceLayoutComponent={() => null}
    // commandButtonComponent={() => null}
    // dateEditorComponent={() => null}
    // Hides radio boxes
    booleanEditorComponent={() => null}
    // commandLayoutComponent={() => null}
    // labelComponent={() => null}
    // selectComponent={() => null}
    messages={messages}
    // resourceEditorComponent={() => null}
          // selectComponent={selectProps}
        />
      </Scheduler>
    </Paper>
  );
}

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps, {})(Week);
