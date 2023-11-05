import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "",
  port: 5432,
})

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let countryCodes = [];

//Connect to db and query for all the country codes
db.connect();

db.query("SELECT country_code FROM visited_countries", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    countryCodes = res.rows.map(obj => obj.country_code);
    //console.log(countryCodes);
  }
  db.end();
})

app.get("/", async (req, res) => {
  //Write your code here.
  res.render("index.ejs", {countries: countryCodes, total: countryCodes.length});
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
