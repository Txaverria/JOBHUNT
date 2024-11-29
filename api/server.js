const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const usuarios = require("./routes/usuarios");
const ofertasLaborales = require("./routes/ofertasLaborales");

const app = express();
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use("/api", usuarios);
app.use("/api", ofertasLaborales);

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});