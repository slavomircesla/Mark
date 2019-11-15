var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var routes = require("./routes");

var app = express();
app.use(
  session({
    secret: "session",
    resave: true,
    saveUninitialized: true
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", routes);

app.listen(3000);
