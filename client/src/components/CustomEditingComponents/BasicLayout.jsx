import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";

const useStyles = makeStyles({
  customForm: {
    marginTop: 15,
  },
});

export default function BasicLayout({
  onFieldChange,
  appointmentData,
  ...restProps
}) {
  const classes = useStyles();

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
      <AppointmentForm.Label
        className={classes.customForm}
        text="Location"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.location}
        onValueChange={onLocationChange}
        placeholder="Location"
      />
      <AppointmentForm.Label
        className={classes.customForm}
        text="Type of Dispatch"
        type="title"
      />
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
}
