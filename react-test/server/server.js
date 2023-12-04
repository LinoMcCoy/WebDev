const express = require("express");
const app = express();
const bodyParser= require("body-parser")


// TODO: configure the express server

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", (req, res) => {
 
});

app.post("/login", (req, res) => {
var user= req.body.user;
var password= req.body.password;

let authorization= {
  user: user,
  status: "Unauthorized",
  statusCode: -1,
};
if(userProfile.user === "Lino" && userProfile.password === "0622"){
  console.log("Logged in");
  authorization.status = "Authorized";
  authorization.statusCode= 1;
}else{
  console.log("Unauthorized");
}
res.json(authorization);
});

  
app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});