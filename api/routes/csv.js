const express = require("express");
const router = express.Router();
const csv = require("fast-csv");
const homedir = require("os").homedir();
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: `${homedir}/Schedule.csv`,
  header: [
    { id: "startDate", title: "START" },
    { id: "endDate", title: "END" },
    { id: "id", title: "ID" },
    { id: "title", title: "TITLE" },
  ],
});
/**
 * * POST api/csv
 * ? Generate CSV file & download
 */

router.post("/", (req, res) => {
  csvWriter.writeRecords(req.body).then(() => console.log("done"));
  // try {
  //   fastcsv
  //     // .write(req.body, { headers: true })
  //     .pipe(ws);

  //   for (const appointment of req.body) {
  //     fastcsv.write(appointment);
  //   }

  //   fastcsv.end();
  // } catch (err) {
  //   res.json(err);
  // }
  // csv
  //   .write(req.body, { headers: true })
  //   .pipe(ws)
  //   .on("error", error => console.error(error))
  //   .on("data", row => console.log(row))
  //   .on("end", rowCount => console.log(`Parsed ${rowCount} rows`));
});

// const writeCSV = data => {
//   const writer =
// };
module.exports = router;
