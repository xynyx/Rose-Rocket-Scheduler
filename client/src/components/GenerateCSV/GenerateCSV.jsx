import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import IntervalSelect from "./IntervalSelect";
import YearSelect from "./YearSelect";

import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginRight: 10,
    width: "20%",
  },
});

export default function GenerateCSV({
  downloadScheduleOptions,
  setDownloadInterval,
  setDownloadYear,
  generateCSV,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        onClick={generateCSV}
        variant="contained"
        color="primary"
      >
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

GenerateCSV.propTypes = {
  downloadScheduleOptions: PropTypes.object.isRequired,
  setDownloadInterval: PropTypes.func.isRequired,
  setDownloadYear: PropTypes.func.isRequired,
  generateCSV: PropTypes.func.isRequired,
};
