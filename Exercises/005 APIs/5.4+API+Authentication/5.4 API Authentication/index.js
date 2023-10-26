import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "tim261";
const yourPassword = "milkmilk";
const yourAPIKey = "5225f2a3-a032-48ae-a10b-c1123e041556";
const yourBearerToken = "b3688631-13e5-4cef-895a-6a2f93fb10e8";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const data = JSON.stringify(response.data);
    res.render("index.ejs", {content: data});
    //console.log(JSON.stringify(response.data));
  } catch (error) {
    console.error(error.message); 
  }
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
    try{
      const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
        auth: {
          username: yourUsername,
          password: yourPassword,
        }
      })

      const data = JSON.stringify(response.data);
      res.render("index.ejs", {content: data});
    } catch (error)
    {
      console.log(error.message);
    }
});

app.get("/apiKey", async (req, res) => {
  var URL = "https://secrets-api.appbrewery.com/filter?score=5&apiKey=" + yourAPIKey;
  //TODO 4: Write your code here to hit up the /filter endpoint
  try{
    const response = await axios.get(URL)
    const data = JSON.stringify(response.data);
    res.render("index.ejs", {content: data});
  } catch (error)
  {
    console.log(error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42", {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`
      }
    })

    const data = JSON.stringify(response.data);
    res.render("index.ejs", {content: data});

  } catch (error)
  {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
