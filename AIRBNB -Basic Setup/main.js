const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Listing = require("./models/listing.js");
const path=require("path");

// -----------------------------------------------------------------------
main()
  .then(() => {
    console.log("connect to DB");
  })
  .catch((error) => {
    console.log(error);
  });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}
// -----------------------------------------------------------------------
app.set('view engine', 'ejs');
app.set("views", path.join (__dirname,"views"));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// -----------------------------------------------------------------------
app.get("/", (req, res) => {
    res.send("hi,I am root");
});

app.get("/posts" , (async (req , res ) => {
    const posts = await Listing.find({});
    res.render("index.ejs", {posts});
  }));


app.get("/posts/:id" ,async (req, res) => {
    const postId = req.params.id;
    const post = await Listing.findById(postId);
   
    if (post) {
        res.render("individual.ejs", { post });
    } else {
        res.status(404).send('Post not found');
    }
});


app.listen(8080, () => {
    console.log("Server is listenig to port 8080");
});