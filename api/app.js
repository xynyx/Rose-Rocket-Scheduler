const express = require("express")
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const csvRoutes = require("./routes/csv");

app.use("/api/csv", csvRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Running on port ${PORT}!`));
