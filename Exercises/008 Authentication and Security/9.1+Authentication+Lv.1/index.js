import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const saltRounds = 10;

//Connect to DB
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Users",
  password: "",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  
  res.render("register.ejs");
});



app.post("/register", async (req, res) => {

  //Get submited details from register form
  const email = req.body.username;
  const password = req.body.password;

  try{
    //Check if user already exists
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", 
    [email]);

    //insert data into db
    if (checkResult.rows.length > 0){
      res.send("Email already exists")
    }else{
      //Password Hashing
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log(err.message);
        }else{
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, hash]
          );
          console.log(result);
          res.render("secrets.ejs");//Render secrets
        }
      })
    }
  }catch(err){
    console.log(err);
  }

});


app.post("/login", async (req, res) => {

  //Get submited details from login form
  const email = req.body.username;
  const password = req.body.password;

  //See if user exists
  try{
    //Get user details
    const storedResults = await db.query("SELECT * FROM users WHERE email = $1", 
    [email]);

    if(storedResults.rows > 0){//If there is a matching record in DB
      //console.log(storedDetails.rows[0].email);
      const storedPassword = storedResults.rows[0].password;

      //compare passwords
      if(storedPassword == password){
        //console.log("Passwords match");
        res.render("secrets.ejs");//Render secrets
      }
      else{
        //console.log("Passwords don't match");
        res.send("Wrong password")
      }
    }else{
      res.send("Email doesn't exist")
    }
  }catch(err){
    console.log(err);
  }

});


//Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
