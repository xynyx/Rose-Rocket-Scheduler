import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";

import { setDriver } from "../redux/actions/driverActions";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function DriverSelect({ drivers, setDriver }) {
  const classes = useStyles();

  const driverList = drivers.driverList.map(driver => (
    <MenuItem key={driver.id} name={driver.id} value={driver.name}>
      {driver.name}
    </MenuItem>
  ));

  const handleChange = (e, driver) => {
    // Cannot get the id of driver with MenuItem if the value is the driver's actual name
    // However the 2nd parameter has props which includes the ID (called as name in MenuItem)
    // Safer to set/get drivers by their unique ID rather than name
    setDriver(driver.props.name);
  };
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Drivers</InputLabel>
        <Select
          value={drivers.selectedDriver.name}
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

export default connect(mapStateToProps, { setDriver })(DriverSelect);
