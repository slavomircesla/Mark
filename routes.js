var express = require("express");
var router = express.Router();
var path = require("path");
var connection = require("./database");

// Login page.
router.get("/", function(request, response) {
  response.sendFile(path.join(__dirname + "/login.html"));
});

// Login authentication.
router.post("/auth", function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    connection.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      function(error, results, fields) {
        if (results && results.length > 0) {
          // Store 'logged in' state and username and session.
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect("/home");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

// Register page.
router.get("/register", function(request, response) {
  response.sendFile(path.join(__dirname + "/register.html"));
});

// Registration.
router.post("/register", function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  var email = request.body.email;

  if (username && password) {
    // In a real production environment we should hash the password.
    connection.query(
      "INSERT INTO accounts(username, password, email) VALUES (?, ?, ?)",
      [username, password, email],
      function(error, results, fields) {
        if (error) {
          console.log(error);
        } else {
          response.send('Registration successful! <a href="/">Login</a>.');
        }
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

// Logout.
router.get("/logout", function(request, response) {
  if (request.session.loggedin) {
    request.session.loggedin = false;
  }
  response.redirect("/");
});

// Landing page once user is logged in.
router.get("/home", function(request, response) {
  if (request.session.loggedin) {
    response.send(
      "Welcome back, " +
        request.session.username +
        "!" +
        ' <a href="/logout">Logout</a>'
    );
  } else {
    response.send("Please login to view this page!");
  }
  response.end();
});

module.exports = router;
