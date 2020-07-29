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
  console.log('dataB4 :>> ', data);
  const { interval, year } = req.body.downloadScheduleOptions;

  const sortedData= data.sort((a, b) => moment(a.startDate) - moment(b.startDate));
  console.log('sortedData :>> ', sortedData);

  const formattedData = () => {
    let startingDate = moment([year]);
    const endingDate = moment([year + 1]);

    const formattedData = [];

    while (moment(startingDate).isBefore(endingDate)) {
      console.log('startingDate :>> ', startingDate);
      // Check first day (jan 1st)
      // if no appointments fall on that day, the data should look like this (given interval 2):
      /**
       * Timeframe: Day 1 - 3
       * Pickup: 0
       * Dropoff: 0
       * Other: 0
       */
    }
  };



  try {
    csvWriter.writeRecords(data).then(() => res.json("Success"));
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
