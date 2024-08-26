require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const appRoute = require("./routes/route.js");

const PORT = process.env.PORT || 4000;

// Connecting to mongoDB
const url = process.env.MONGODB_URI;
const conDB = async () => {
  try {
    const connectDB = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 60000,
    });
    if (connectDB) {
      console.log("connected to the database");
    } else {
      console.log((error) => error);
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};
conDB();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

// app.set("view engine", "ejs");
app.use(cors());
app.get("/", (req, res) => {
  res.status(501).send({ message: "Connot get / path" });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** routes */
app.use("/api", appRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
