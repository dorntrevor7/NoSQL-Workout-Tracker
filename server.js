const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models/workout");

const PORT = process.env.PORT || 5050;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true
});

//index.html route.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
//exercise.html route.
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});
//stats.html route.
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

//post route to add new workouts
app.post("/api/workouts", function(req, res) {
  db.create({})
    .then(function(dbWorkout) {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", function(req, res) {
  db.findByIdAndUpdate(req.params.id, { $push: { exercise: req.body } })
    .then(function(dbWorkout) {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts", function(req, res) {
  db.find()
    .then(function(dbWorkouts) {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts/range", function(req, res) {
    db.find()
    .then(function(dbWorkouts) {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
