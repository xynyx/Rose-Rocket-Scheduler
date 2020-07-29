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

  // data.sort((a, b) => moment(a.startDate) - moment(b.startDate));

  const formattedData = () => {
    const { interval, year } = req.body.downloadScheduleOptions;

    console.log("year :>> ", year);
    const startingDate = moment([year]);
    const endingDate = moment(startingDate).endOf("year");

    // console.log("startingDate :>> ", startingDate);
    // console.log("endingDate :>> ", endingDate);

    const formattedData = [];

    let day = 1;
    /*     while (moment(startingDate).isBefore(endingDate)) { */
    const startingDateCopy = startingDate.clone();

    const generateIntervalObject = () => {
      const intervalObject = {
        timeframe: `Day ${day} - Day ${day + interval - 1}`,
      };

      let pickup = 0,
        dropoff = 0,
        other = 0;
      // for (let i = 0; i < interval; i++) {
      // const copiedStartDate = startingDateCopy.clone();
      // console.log("***********");
      data.forEach(appointment => {
        const { title } = appointment;
        const startDate = moment(appointment.startDate);

        // console.log(
        //   'here ',
        //   startDate.isBetween(
        //     startingDateCopy.startOf("day"),
        //     startingDateCopy.add(interval - 1, "days").endOf("day")
        //   )
        // );
        /* 
        // console.log("startDate :>> ", startDate);
        // console.log("START:>> ", startingDateCopy.startOf("day"));
        // console.log(
        //   "END:>> ",
        //   startingDateCopy.add(interval - 1, "d").endOf("day")
        // ); */

        // console.log(
        //   'TRUE?',
        //   moment("2020-07-29T16:03:21-04:00").isBetween(
        //     "2020-07-26T00:00:00-04:00",
        //     "2020-07-29T23:59:59-04:00"
        //   )
        // );
        const start = startingDateCopy.clone().startOf("day");
        const end = startingDateCopy.clone().add(interval - 1, "d").endOf("day");

        // console.log(
        //   "startDate.isBetween(start, end) :>> ",
        //   moment(startDate).isBetween(start, end)
        // );

        // moment("12-25-1995", "MM-DD-YYYY");
        console.log(moment("12-25-1995", "MM-DD-YYYY"));

        if (startDate.isBetween(start, end)) {
          console.log("HERE!");
          if (title === "Pickup") pickup++;
          if (title === "Dropoff") dropoff++;
          if (title === "Other") other++;
        }
      });
      // }

      intervalObject.pickup = pickup;
      intervalObject.dropoff = dropoff;
      intervalObject.other = other;

      formattedData.push(intervalObject);
    };

    // generateIntervalObject();
    // bugged - no idea why
    // console.log('endingDate :>> ', endingDate);

    // console.log(
    //   "startingDate.isBefore(endingDate) :>> ",
    //   startingDate.isBefore(endingDate)
    // );
    // console.log("startingDate :>> ", startingDate);
    // console.log("endingDate :>> ", endingDate);

    while (startingDate.isBefore(endingDate)) {
      // console.log('startingDateINSIDE BFERORE :>> ', startingDate);
      generateIntervalObject();
      day += interval;
      startingDate.add(interval, "d");
      // console.log('startingDateAFTER :>> ', startingDate);

      // console.log('endingDate :>> ', endingDate);
    }

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
