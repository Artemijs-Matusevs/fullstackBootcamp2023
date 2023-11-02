import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//


//CHALLENGE 1: GET All posts
app.get("/posts", (req, res) => {
  res.json(posts);
})

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);//Get hold of the id path parameter and convert it to an INT

  //Get the search index of the post which matches the id
  const searchIndex = posts.findIndex((post) => post.id === id);

  //Send back the post with the search index as a JSON
  res.json(posts[searchIndex]);
})



//CHALLENGE 3: POST a new post
app.post("/posts", (req, res) => {
  //Create new JS object to hold the new post details
  const newPost = {
    id: posts.length + 1, //Id will be one greater than previous post
    title: req.body.title, //Get title, content and author from submited form
    content: req.body.content,
    author: req.body.author,
    date: new Date(), //Function to get current date,time
  }

  //Add the newPost js object to the current posts array
  posts.push(newPost);
  res.json(newPost); // Send the new post as a response in JSON format
})



//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id) //Get the ID from the path param and convert to INT

  //Find the existing post
  const existingPost = posts.find((post) => post.id === id);//Search for post where post id is the same as the path param

  //New JS object, to replace the old post
  const replacementPost = {
    id: id,
    title: req.body.title || existingPost.title,
    content: req.body.content || existingPost.content,
    author: req.body.author || existingPost.author,
    date: new Date(),
  }

  //Find the index of te current post
  const searchIndex = posts.findIndex((post) => post.id === id);

  //Replace old post with new post object
  posts[searchIndex] = replacementPost;

  res.json(replacementPost);//Send the replacement post
})


//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id); // Get the ID from the path param and convert to INT

  const searchIndex = posts.findIndex((post) => post.id === id); //Find the index of the post which matches the cireria
  //findIndex() will erturn -1 if no posts match the criteria

  //Check to see if the post was found
  if (searchIndex > -1) {
    posts.splice(searchIndex, 1);//If found, remove the joke from array
    res.sendStatus(200);//Send status 200, which means "ok"
  } else {//If not found, return statu code404 with error message in form of a JSON
    res.status(404).json({error: `Post with id: ${id} not found. No posts were deleted`})

  }
})


app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
