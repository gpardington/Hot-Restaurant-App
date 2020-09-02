// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

const reservations = [];
const waitList = [];

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservation", function(req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
  });

// Displays all available tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays a single character, or returns false
app.get("/api/waitlist", function(req, res) {
    return res.json(waitList);
  });

// Clears everything
app.get("/api/clear", function(req, res) {
    return res.json(clear);
  });

// Makes new reservation
app.post("/api/table", function(req, res) {
    var newReservation = req.body;

    if (reservations.length < 5) {
        reservations.push(newReservation);
        res.json(true);
    } else {
        waitList.push(newReservation);
        res.json(false);
    }
});
 
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
