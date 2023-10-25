import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const _dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.post("/submit", (req, res) => {
  res.send(`Your band name: ${req.body.street}${req.body.pet}`)
})

app.get("/", (req, res) => {
  res.sendFile(_dirname + "/public/index.html");
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
