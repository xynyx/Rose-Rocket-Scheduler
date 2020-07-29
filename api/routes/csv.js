const express = require("express");
const router = express.Router();
const homedir = require("os").homedir();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const moment = require("moment");
moment().format();

const csvWriter = createCsvWriter({
  path: `${homedir}/Schedule.csv`,
  header: [
    { id: "timeframe", title: "TIMEFRAME" },
    { id: "pickup", title: "PICKUP" },
    { id: "dropoff", title: "DROPOFF" },
    { id: "other", title: "OTHER" },
  ],
});
/**
 * * POST api/csv
 * ? Generate CSV file & download
 */

router.post("/", (req, res) => {
  const { data } = req.body;

  console.log("data :>> ", data);

  data.sort((a, b) => moment(a.startDate) - moment(b.startDate));

  const formattedData = () => {
    const { interval, year } = req.body.downloadScheduleOptions;

    let startingDate = moment([year]);
    const endingDate = moment([year + 1]);

    const formattedData = [];

    let day = 1;
    /*     while (moment(startingDate).isBefore(endingDate)) { */
    const generateIntervalObject = () => {
      const intervalObject = {
        timeframe: `Day ${day} - Day ${day + interval - 1}`,
      };
      let pickup = 0,
        dropoff = 0,
        other = 0;
      for (let i = 0; i < interval; i++) {
        data.forEach(appointment => {
          const { title } = appointment;
          const startDate = moment(appointment.startDate);
          if (
            startDate.isBetween(
              startingDate.startOf("day"),
              startingDate.endOf("day")
            )
          ) {
            if (title === "Pickup") pickup++;
            if (title === "Dropoff") dropoff++;
            if (title === "Other") other++;
          }
        });
      }

      intervalObject.pickup = pickup;
      intervalObject.dropoff = dropoff;
      intervalObject.other = other;

      formattedData.push(intervalObject);
    };

    generateIntervalObject();

    return formattedData;
  };

  const newCSVData = formattedData();
  // newCSVData.push({ timeframe: "TEST", pickup: 0, dropoff: 0, other: 0 });
  // console.log("newCSVData :>> ", newCSVData);
  // };

  try {
    csvWriter.writeRecords(newCSVData).then(() => res.json("Success"));
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
