const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const users = require("./routes/users");
const cards = require("./routes/cards");
const logger = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then((res) => console.log("MongoDB connected"))
    .catch((error) => console.log(error));

const accessLogStream = rfs.createStream('errors.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs')
});


app.use(logger("common"));
app.use(logger("common", { stream: accessLogStream, skip: function (req, res) { return res.statusCode < 400 } }));
app.use(express.json());
app.use(cors());

app.use("/api/users", users);
app.use("/api/cards", cards);

app.listen(port, () => console.log("Server started on port", port));