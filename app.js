// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

//internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/errorhandler/notFoundhandler");
const router = require("./router/mainRoute");

//app and env configuration
const app = express();
dotenv.config();
const PORT = 8000;
const BASE_URL = "https://lb9.xyz/";

// local variables
app.locals.html = true;
app.locals.BASE_URL = BASE_URL;

//database connection
mongoose
  .connect(
    "mongodb+srv://mongodb:1234qwer@cluster0.uusqq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to database successfully..."))
  .catch((err) => console.log(err));

// request parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// public access
app.use(express.static(path.join(__dirname, "public")));

// set view engine
app.set("view engine", "ejs");

// Router setup
app.use("/", router);

// 404 error handles
app.use(notFoundHandler);
// common error handles
app.use(errorHandler);
// listen server
app.listen(PORT, () => console.log(`server listening on port ${PORT} ...`));
