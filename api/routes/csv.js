const express = require("express");
const router = express.Router();

/**
 * * GET api/csv
 * ? Generate CSV file & download
 */

router.post("/", (req, res) => {
  console.log('req :>> ', req.body);
  res.send("works")
})



module.exports = router;