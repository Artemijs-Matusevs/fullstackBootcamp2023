import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "10151015",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

/*let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];*/






app.get("/", async (req, res) => {
  const userData = await checkVisited(currentUserId);
  res.render("index.ejs", {
    countries: userData.countries,
    total: userData.countries.length,
    users: await checkUsers(),
    color: userData.userColor,
  });
});




app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});


//Form submited to this endpoint with user ID
app.post("/user", async (req, res) => {
  //console.log(req.body.user);

  const userID = req.body.user;
  const userData = await checkVisited(userID);

  res.render("index.ejs", {
    countries: userData.countries,
    total: userData.countries.length,
    users: await checkUsers(),
    color: userData.userColor,
  });


  //console.log(await checkUsers());
});



//Function to retrieve a specific user's data by their user ID
async function checkVisited(userID) {
  const result = await db.query(`
    SELECT country_code, color 
    FROM visited_countries 
    JOIN users 
    ON users.id = visited_countries.user_id 
    WHERE user_id = $1`, 
    [userID]);

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });

  //Create new userData object which will contain an array of country codes, and the user color
  let userData = {
    countries: countries,
    userColor: result.rows[0].color
  }

  return userData;
}


//Function to retrieve all users
async function checkUsers(){
  const result = await db.query(`
    SELECT *
    FROM users`)

    return result.rows
}




app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
