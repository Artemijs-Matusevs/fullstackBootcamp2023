import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var name;
var nameLength;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(numOfCharacters)

function numOfCharacters(req, res, next) {
  name = req.body["fName"] + req.body["lName"];
  nameLength = name.length;
  res.locals = {nameLength: nameLength};
  next();
}

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  res.render("index.ejs", { nameLength: nameLength});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
