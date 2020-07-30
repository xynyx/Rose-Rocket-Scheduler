const express = require("express");
const router = express.Router();
const homedir = require("os").homedir();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const moment = require("moment");
moment().format();

/**
 * * POST api/csv
 * ? Generate CSV file & download
 */

router.post("/", (req, res) => {
  const { data } = req.body;
  const { interval, year } = req.body.downloadScheduleOptions;

  // Set up output path and required headers for CSV file
  const csvWriter = createCsvWriter({
    path: `${homedir}/Schedule-${year}.csv`,
    header: [
      { id: "timeframe", title: "TIMEFRAME" },
      { id: "pickup", title: "PICKUP" },
      { id: "dropoff", title: "DROPOFF" },
      { id: "other", title: "OTHER" },
    ],
  });

  const formattedData = () => {
    // Beginning of given year
    const startingDate = moment([year]);
    // End of given year
    const endingDate = moment(startingDate).endOf("year");

    // The resulting manipulated data to create in CSV file
    const formattedData = [];

    // Starting day; increments based on set interval
    let day = 1;

    // Generates the number of pickups, dropoffs, and other in the specified interval period and creates an object to push to `formattedData`
    const generateIntervalObject = () => {
      const intervalObject = {
        timeframe: `Day ${day} - Day ${day + interval - 1}`,
      };

      let pickup = 0,
        dropoff = 0,
        other = 0;
      // Must make a clone of the startingDate as it is mutable and there needs to be a new instance based off the current startingDate which changes after each iteration of interval object generation
      const startingDateCopy = startingDate.clone();

      // For each appointment, check if a date falls within the startingDate and the endingDate (which is based off the given interval)
      data.forEach(appointment => {
        const { title } = appointment;
        const startDate = moment(appointment.startDate);

        // More clones are required per interval object generation iteration, otherwise it will modify the startingDateCopy and produce unexpected results
        const start = startingDateCopy.clone().startOf("day");
        const end = startingDateCopy
          .clone()
          .add(interval - 1, "d")
          .endOf("day");

        // If the date of the current appointment falls between the interval period
        // Increment pickup, dropoff, or other
        if (startDate.isBetween(start, end)) {
          if (title === "Pickup") pickup++;
          if (title === "Dropoff") dropoff++;
          if (title === "Other") other++;
        }
      });

      intervalObject.pickup = pickup;
      intervalObject.dropoff = dropoff;
      intervalObject.other = other;

      // Finally, add the newly created object to `formattedData`
      formattedData.push(intervalObject);
    };

    // Must continue to create new interval objects until the end of the year
    while (startingDate.isBefore(endingDate) && day < 365) {
      generateIntervalObject();

      // Set the day ahead by the given interval for next iteration
      day += interval;

      // Set the starting date ahead by the given interval for next iteration
      startingDate.add(interval, "d");
    }

    // Finally, return the entirity of  the new formattedData array with all the formatted appointment data
    return formattedData;
  };

  const newCSVData = formattedData();

  try {
    // Write CSV
    csvWriter.writeRecords(newCSVData).then(() => res.json("Success"));
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
