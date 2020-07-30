import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 175,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function IntervalSelect({ setDownloadInterval, interval }) {
  const classes = useStyles();

  const handleChange = e => {
    setDownloadInterval(e.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>Interval (Days)</InputLabel>
      <Select value={interval} onChange={handleChange} label="Interval (Days)">
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={14}>14</MenuItem>
        <MenuItem value={28}>28</MenuItem>
      </Select>
    </FormControl>
  );
}

IntervalSelect.propTypes = {
  setDownloadInterval: PropTypes.func.isRequired,
  interval: PropTypes.number.isRequired,
};
