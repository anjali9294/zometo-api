const express = require("express");
const mongoose = require("mongoose");
const app = express();
const APIRouter = require("./Routes/APIRouter");
const cors = require("cors");

const dotenv = require("dotenv");
// config
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 5003;
const URI = process.env.DB_URI;
app.use(cors()); //enable the cors request

// to enable/access post data
app.use(express.json()); // convert  data from string json  to pure json
app.use(express.urlencoded({ extended: false })); //normal post data to json data

app.use("/", APIRouter);
console.log("connecting to db....");
mongoose
  .connect(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("db connected successfully!!");
      console.log("zometo api is running on prort", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
