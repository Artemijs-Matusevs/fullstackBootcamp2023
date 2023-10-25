import express from "express";

const app = express();
const port = 3000;

var date = new Date();
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

app.get("/", (req, res) => {
    res.render("index.ejs",
    { date: dayNames[date.getDay()]})
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
    console.log(date.getDay());
})