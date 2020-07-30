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

    const startingDate = moment([year]);
    const endingDate = moment(startingDate).endOf("year");

    const formattedData = [];

    let day = 1;

    const generateIntervalObject = () => {
      const intervalObject = {
        timeframe: `Day ${day} - Day ${day + interval - 1}`,
      };

      let pickup = 0,
        dropoff = 0,
        other = 0;
      const startingDateCopy = startingDate.clone();

      data.forEach(appointment => {
        const { title } = appointment;
        const startDate = moment(appointment.startDate);

        const start = startingDateCopy.clone().startOf("day");
        const end = startingDateCopy
          .clone()
          .add(interval - 1, "d")
          .endOf("day");

        if (startDate.isBetween(start, end)) {
          if (title === "Pickup") pickup++;
          if (title === "Dropoff") dropoff++;
          if (title === "Other") other++;
        }
      });

      intervalObject.pickup = pickup;
      intervalObject.dropoff = dropoff;
      intervalObject.other = other;

      formattedData.push(intervalObject);
    };

    while (startingDate.isBefore(endingDate) && day < 365) {
      generateIntervalObject();

      day += interval;

      startingDate.add(interval, "d");
    }

    return formattedData;
  };

  const newCSVData = formattedData();

  try {
    csvWriter.writeRecords(newCSVData).then(() => res.json("Success"));
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
