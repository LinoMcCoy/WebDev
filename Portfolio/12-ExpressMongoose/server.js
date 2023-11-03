require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const user= process.env.DB_USER;
const pass= process.env.DB_PASS
const mongoUrl = `mongodb+srv://${user}:${pass}@cluster0.s37knln.mongodb.net/f1?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Definition of a schema
const teamSchema = new mongoose.Schema({
  id: Number,
  code: String,
  label: String,
  country: String,
  url: String,
});
teamSchema.set("strictQuery", true);

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: teamSchema,
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

let countries = [
  { code: "ENG", label: "England" },
  { code: "SPA", label: "Spain" },
  { code: "GER", label: "Germany" },
  { code: "FRA", label: "France" },
  { code: "MEX", label: "Mexico" },
  { code: "AUS", label: "Australia" },
  { code: "FIN", label: "Finland" },
  { code: "NET", label: "Netherlands" },
  { code: "CAN", label: "Canada" },
  { code: "MON", label: "Monaco" },
  { code: "THA", label: "Thailand" },
  { code: "JAP", label: "Japan" },
  { code: "CHI", label: "China" },
  { code: "USA", label: "USA" },
  { code: "DEN", label: "Denmark" },
];

let teams =[];
let drivers= [];

let teamsRaw=[
  { code: "mercedes", label: "Mercedes", country: "GER" },
  { code: "aston_martin", label: "Aston Martin", country: "ENG" },
  { code: "alpine", label: "Alpine", country: "FRA" },
  { code: "haas_f1", label: "Haas F1 Team", country: "USA" },
  { code: "red_bull", label: "Red Bull Racing", country: "AUS" },
  { code: "alpha_tauri", label: "Alpha Tauri", country: "ITA" },
  { code: "alpha_romeo", label: "Alpha Romeo", country: "ITA" },
  { code: "ferrari", label: "Ferrari", country: "ITA" },
  { code: "williams", label: "Williams", country: "ENG" },
  { code: "mc_laren", label: "McLaren", country: "ENG" },
];

app.use("/", async (req,res, next) => {
  //TODO: Get the name of the teams first from DB to whow in the form
  if(teams.length === 0){
    //load info from db
    var teamsDB=await Team.find({}).exec()
    if (!Array.isArray(teamsDB)||teamsDB.length === 0){
      await Team.insertMany(teamsRaw)
      .then(() => {
        console.log("Teams loaded");
      })
      .catch((error) => {
        console.error(error);
      });
      await Team.find({})
      .then((docs) => {
        console.log("Found the following teams");
        console.log(docs);
        teams = docs;
      })
      .catch((error) => {
        console.error(error);
      });   
    }else{
      teams = teamsDB;
    }
  }
  next();
});

app.get("/", (req, res) => {
  res.render("index", {countries, teams, drivers});
});

app.post("/driver", async (req, res) => {
  //ToDo: Get info from form
  var team = await Team.findOne({code: { $eq: req.body.team } }).exec();
  var driver = new Driver({
    num: req.body.num,
    code: req.body.code,
    forename: req.body.name,
    surname: req.body.lname,
    dob: req.body.dob,
    nationality: req.body.nation,
    url: req.body.url,
    team: team,
  });
  driver.save();
  drivers.push(driver);

/*
await Driver.insertOne(driver)
      .then(() => {
        console.log("Driver Saved");
        drivers.push(driver);
      })
      .catch((error) => {
        console.error(error);
      });
*/
  res.redirect("/");
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
