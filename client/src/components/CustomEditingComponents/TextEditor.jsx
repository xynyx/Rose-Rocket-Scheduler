import React from "react";

import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";

export default function TextEditor(props) {
  if (props.type === "titleTextEditor") {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
}
