import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import IntervalSelect from "./IntervalSelect";
import YearSelect from "./YearSelect";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    float: "right",
    display: "flex",
    alignItems: "center",
    width: 500,
  },
});

export default function GenerateCSV({
  downloadScheduleOptions,
  setDownloadInterval,
  setDownloadYear,
  generateCSV
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button onClick={generateCSV} variant="contained" color="primary">
        Download Schedule
      </Button>
      <IntervalSelect
        interval={downloadScheduleOptions.interval}
        setDownloadInterval={setDownloadInterval}
      />
      <YearSelect
        year={downloadScheduleOptions.year}
        setDownloadYear={setDownloadYear}
      />
    </div>
  );
}
