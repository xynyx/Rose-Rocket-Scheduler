import React, { useState } from "react";
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

import { makeStyles } from "@material-ui/core/styles";

import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

import DriverSelect from "./DriverSelect";
import GenerateCSV from "./GenerateCSV/GenerateCSV";

import {
  addAppointment,
  editAppointment,
  deleteAppointment,
} from "../redux/actions/appointmentActions";
import { setDriver } from "../redux/actions/driverActions";
import {
  setDownloadInterval,
  setDownloadYear,
} from "../redux/actions/downloadScheduleActions";

import { toast, ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);
moment().format();

const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  img: {
    marginLeft: 30,
  },
  toast: {
    marginTop: 90,
    marginRight: 135,
  },
}));

function SchedulerLayout({
  appointments,
  addAppointment,
  editAppointment,
  deleteAppointment,
  drivers,
  setDriver,
  setDownloadInterval,
  downloadScheduleOptions,
  setDownloadYear,
}) {
  const classes = useStyles();

  const currentDriver = drivers.selectedDriver.id;
  const data = appointments[currentDriver];

  const [errors, setErrors] = useState({});
  const [currentDate, setCurrentDate] = useState(Date.now());
  const [tasksToOverwrite, setTasksToOverwrite] = useState({
    newAppointment: {},
    oldAppointments: [],
  });

  const currentDateChange = currentDate => {
    setCurrentDate(currentDate);
  };

  // Handles all appointments being added, changed, or deleted
  const commitChanges = ({ added, changed, deleted }) => {
    // Set dates and appointment depending on it being added or changed
    let startDate, endDate, newAppointment;
    if (added) {
      // Set default title
      if (!added.title) added.title = "Pickup";

      startDate = added.startDate;
      endDate = added.endDate;
      newAppointment = added;
    } else if (changed) {
      startDate = changed.startDate;
      endDate = changed.endDate;
      newAppointment = changed;
    }
    // The range that the new appointment falls into (for comparisons)
    const newAppointmentRange = moment.range(startDate, endDate);

    const errors = {};

    // If the start date and end date are on different days -> set error
    if (!moment(startDate).isSame(endDate, "day")) {
      errors.sameDay = "A task can't go into the next day";

      return setErrors(errors);
    }

    // If an appointment is deleted, it will have a numerical value (the id)
    if (deleted === undefined) {
      // Initialize potential appointments that overlap the new one
      const oldAppointments = [];

      data.forEach(oldAppointment => {
        const { startDate, endDate } = oldAppointment;

        const oldAppointmentRange = moment.range(startDate, endDate);

        // If the new appointment overlaps the old, or the old overlaps the new
        // AND the new appointment ID isn't the same as the old one...
        // Then set error
        if (
          (newAppointmentRange.overlaps(oldAppointmentRange) ||
            oldAppointmentRange.overlaps(newAppointmentRange)) &&
          Number(Object.keys(newAppointment)[0]) !== oldAppointment.id
        ) {
          errors.overlap = `Tasks cannot overlap. Would you like to overwrite the old task(s)?  `;

          oldAppointments.push(oldAppointment);

          setErrors(errors);
        }
      });

      setTasksToOverwrite({ oldAppointments, newAppointment });
    }

    if (Object.keys(errors).length === 0) {
      setErrors({});

      /**
       * @param {Object} title,startDate,endDate,[notes],[location]
       */
      if (added) {
        addAppointment({ added, currentDriver });
      }
      /**
       * @param {Object} [title][startDate][endDate][notes][location]
       */
      if (changed) {
        editAppointment({ changed, currentDriver });
      }
    }

    /**
     * @param {Integer} id
     */
    if (deleted !== undefined) {
      deleteAppointment({ deleted, currentDriver });
    }
  };

  const TextEditor = props => {
    if (props.type === "titleTextEditor") {
      return null;
    }
    return <AppointmentForm.TextEditor {...props} />;
  };

  // When user wants to overwrite task
  const replaceOverlappingTask = () => {
    // Iterate through the potential multiple appointments that overlap and delete them all
    tasksToOverwrite.oldAppointments.forEach(oldAppointment => {
      deleteAppointment({
        deleted: oldAppointment.id,
        currentDriver,
      });
    });

    // When an appointment is being changed (will only ever have id key)
    if (Object.keys(tasksToOverwrite.newAppointment).length === 1) {
      editAppointment({
        changed: tasksToOverwrite.newAppointment,
        currentDriver,
      });
    } else {
      // When a new appointment is being added (will always have more than 1 key)
      addAppointment({ added: tasksToOverwrite.newAppointment, currentDriver });
    }

    setErrors({});

    setTasksToOverwrite({ newAppointment: {}, oldAppointments: [] });
  };

  // Generate CSV for download
  async function generateCSV() {
    try {
      await fetch("/api/csv", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, downloadScheduleOptions }),
      });

      toast("Success! Please check your home directory.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
      //toast
    } catch (err) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
    }
  }

  // Modified layout of editing component
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
      <ToastContainer className={classes.toast} />
      <Scheduler data={data} height={815}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={currentDateChange}
        />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <WeekView startDayHour={0} endDayHour={24} />
        <Toolbar />
        <DateNavigator />
        <div className={classes.header}>
          <img className={classes.img} src="/img/logo.svg" />
          <DriverSelect drivers={drivers} setDriver={setDriver} />
          <GenerateCSV
            generateCSV={generateCSV}
            setDownloadYear={setDownloadYear}
            downloadScheduleOptions={downloadScheduleOptions}
            setDownloadInterval={setDownloadInterval}
          />
        </div>

        <TodayButton />
        <ConfirmationDialog />
        <Appointments />
        {errors.sameDay && <Alert severity="error">{errors.sameDay}</Alert>}
        {errors.overlap && (
          <Alert severity="error">
            {errors.overlap}
            <Button
              onClick={replaceOverlappingTask}
              variant="contained"
              color="secondary"
            >
              Overwrite
            </Button>
          </Alert>
        )}
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm
          basicLayoutComponent={BasicLayout}
          textEditorComponent={TextEditor}
          // Hides radio boxes
          booleanEditorComponent={() => null}
        />
      </Scheduler>
    </Paper>
  );
}

const mapStateToProps = state => ({
  appointments: state.appointments,
  drivers: state.drivers,
  downloadScheduleOptions: state.downloadScheduleOptions,
});

export default connect(mapStateToProps, {
  addAppointment,
  editAppointment,
  deleteAppointment,
  setDownloadInterval,
  setDownloadYear,
  setDriver,
})(SchedulerLayout);
