// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;


// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})



// 3. Use the public folder for static files.
app.use(express.static("public"));


// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
    //res.render("index.ejs");
    try{
        const response = await axios.get("https://secrets-api.appbrewery.com/random");

        // Object which holds key value pairs from the API response,
        // To be sent to the dynamic ejs page
        const data = {
            user: response.data.username,
            secret: response.data.secret,
        }

        //render EJS page
        res.render("index.ejs", data)
    }catch (error) {
        console.error("Failed to make request:", error.message);
        res.status(404).send("Failed to fetch random secret")
    }
})




