import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import IntervalSelect from "./IntervalSelect";
import YearSelect from "./YearSelect";

const useStyles = makeStyles({
  root: {
    float: "right",
    display: "flex",
    alignItems: "center",
    width: 500,
  },
});

export default function GenerateCSV() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span>Download Schedule (.csv)</span>
      <IntervalSelect />
      <YearSelect />
    </div>
  );
}
