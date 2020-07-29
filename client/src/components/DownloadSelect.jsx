import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    float: "right",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function DownloadSelect() {
  const classes = useStyles();

  const [scheduleInterval, setScheduleInterval] = useState();

  const handleChange = e => {
    console.log("e.target :>> ", e.target);
  };

  return (
    <div className={classes.root}>
      <span>Download Schedule (.csv)</span>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Interval (Days)</InputLabel>
        <Select value={""} onChange={handleChange} label="Interval (Days)">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={28}>28</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
