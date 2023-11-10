import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

//MIDLEWARE AND STATIC FILES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Config to connect to the database
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "",
  port: 5432
});
db.connect()


/*let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];*/


// ----------- FUNCTIONS -------------

//Function to return current list
async function checkList() {
  const result = await db.query("SELECT * FROM list");

  //console.log(result.rows);
  return result.rows;
}

//Function to add new item to list table
async function addItem(item) {
  await db.query(`
    INSERT INTO list (title)
    VALUES ($1)`,
    [item]);
}

//Function to remove existing item from list table
async function deleteItem(itemID) {
  await db.query(`
    DELETE FROM list
    WHERE id = $1`,
    [itemID]);
}

//Function to edit existing item by ID 
async function editItem(itemID, item) {
  await db.query(`
    UPDATE list
    SET title = $1
    WHERE id = $2`,
    [item, itemID]);
}




// ----------- END POINTS -------------

app.get("/", async (req, res) => {
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: await checkList(),
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  //console.log(item);

  addItem(item);
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  //console.log(req.body);
  const newTitle = req.body.updatedItemTitle;
  const itemId = req.body.updatedItemId;

  editItem(itemId, newTitle);
  res.redirect("/");

});

app.post("/delete", (req, res) => {
  const item = req.body.deleteItemId;
  //console.log(req.body);

  deleteItem(item);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
