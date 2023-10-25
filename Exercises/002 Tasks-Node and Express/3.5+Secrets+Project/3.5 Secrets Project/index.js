//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

//Create constant variable to store the root directory of website
const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const pass = "1015"

//Add our middleware, bodyParser, so that we can process our request data
app.use(bodyParser.urlencoded({extended:true}));

//Set our app to listen to specific port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

//When the home page gets loaded, in this case (localhost: 3000), retrieve index.html page
app.get("/", (req, res) => {
    res.sendFile(_dirname + "/public/index.html");
})

//When a post request gets sent to the /check endpoint, check the password sent with the pass variable
//If they match, send secret.html page
//If they don't match, send index.html page.
app.post("/check", (req, res) => {
    console.log(req.body);
    if(req.body["password"] === pass)
    {
        res.sendFile(_dirname + "/public/secret.html");
    }
    else{
        res.sendFile(_dirname + "/public/index.html");
    }
})
