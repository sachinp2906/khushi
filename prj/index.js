const express = require('express');
const app = express()
require("dotenv").config();
require("./src/database/connection");

app.use(express.json());

app.use("/", require("./src/routes/index"));

app.listen(process.env.PORT, () => {
    console.log("Server Is Running On Port =", process.env.PORT);
});