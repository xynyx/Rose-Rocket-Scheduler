import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import PropTypes from "prop-types";

import moment from "moment";
moment().format();

const useStyles = makeStyles(theme => ({
  root: {
    float: "right",
    display: "flex",
    alignItems: "center",
    width: 500,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 175,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function YearSelect({ setDownloadYear, year }) {
  const classes = useStyles();

  const handleChange = e => {
    setDownloadYear(e.target.value);
  };

  // Generate list of years from current year until 2000 (arbitrary)
  const yearList = () => {
    const years = [];

    for (let i = moment().year(); i >= 2000; i--) {
      years.push(i);
    }

    return years.map(year => (
      <MenuItem key={year} value={year}>
        {year}
      </MenuItem>
    ));
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>Year</InputLabel>
      <Select value={year} onChange={handleChange} label="Year">
        {yearList()}
      </Select>
    </FormControl>
  );
}

YearSelect.propTypes = {
  setDownloadYear: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired,
};
