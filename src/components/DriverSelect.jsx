import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function DriverSelect({ drivers }) {
  // console.log("drivers :>> ", drivers);
  const classes = useStyles();
  // const [age, setAge] = React.useState("");

  const driverList = drivers.driverList.map(driver => (
    <MenuItem key={driver.id} value={driver.id}>
      {driver.name}
    </MenuItem>
  ));

  const handleChange = event => {
    // setAge(event.target.value);
  };
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Drivers</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={drivers.driverList[0].name}
          onChange={handleChange}
          label="Drivers"
        >
          {driverList}
        </Select>
      </FormControl>
    </div>
  );
}

const mapStateToProps = state => ({
  drivers: state.drivers,
});

export default connect(mapStateToProps, {})(DriverSelect);
