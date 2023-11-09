import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "",
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





//ROOT Page
app.get("/", async (req, res) => {
  const userData = await checkVisited(currentUserId);
  res.render("index.ejs", {
    countries: userData.countries,
    total: userData.countries.length,
    users: await checkUsers(),
    color: userData.userColor,
  });

  //console.log(userData.countries);
});




app.post("/add", async (req, res) => {
  const input = req.body["country"];
  //console.log(currentUserId);

  //Get current user data
  const userData = await checkVisited(currentUserId);

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) { //ERROR IF COUNTRY IS ALREADY IN TABLE
      console.log(err);

      res.render("index.ejs", {
        error: "Country is already added, try again.",
        users: await checkUsers(),
        color: userData.userColor,
        countries: userData.countries,
        total: userData.countries.length
      })

    }
  } catch (err) { //ERROR IF COUNTRY DOESN'T EXIST
    console.log(err);

    res.render("index.ejs", {
      error: "Incorrect country, try again.",
      users: await checkUsers(),
      color: userData.userColor,
      countries: userData.countries,
      total: userData.countries.length})
  }
});


//Form submited to this endpoint with user ID
app.post("/user", async (req, res) => {
  if (req.body.add === "new"){
    res.render("new.ejs")
  }

  const userID = req.body.user;

  if(userID != null){
    const userData = await checkVisited(userID);

    currentUserId = userID;
  
    res.render("index.ejs", {
      countries: userData.countries,
      total: userData.countries.length,
      users: await checkUsers(),
      color: userData.userColor,
    });
  }



  //console.log(await checkUsers());
});



//Function to retrieve a specific user's data by their user ID
async function checkVisited(userID) {
  const result = await db.query(`
    SELECT country_code
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
    userColor: await checkColor(userID)
  }

  //console.log(userData);
  return userData;
}


//Function to retrieve user's color
async function checkColor(userID) {
  const result = await db.query(`
    SELECT color
    FROM users
    WHERE id = $1`,
    [userID]);

  const userColor = result.rows[0].color;
  return userColor;
}
//console.log(await checkColor(1));



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

  //Create new record in the users table
  const result = await db.query(`
    INSERT INTO users
    (name, color)
    VALUES ($1, $2)
    RETURNING *`,
    [req.body.name, req.body.color]);

  currentUserId = result.rows[0].id;
  res.redirect("/");
});





app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
