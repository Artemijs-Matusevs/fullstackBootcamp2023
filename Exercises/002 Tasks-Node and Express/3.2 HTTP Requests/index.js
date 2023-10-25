import express from "express";
const app = express();
var port = 3000;

app.get("/", (req, res) =>{
    res.send("<h1>Home</h1>");
})

app.get("/contact", (req, res) =>{
    res.send("<h1>Contact</h1>");
})

app.get("/about", (req, res) =>{
    res.send("<h1>About</h1>");
})

app.listen(port, () =>{
    console.log(`server running on port ${port}`);
})