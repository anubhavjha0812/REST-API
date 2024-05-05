const express = require("express");
const methodOverride = require('method-override');
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "Hey I love coding!",
    },
    {
        id: uuidv4(),
        username: "shradhakhapra",
        content: "Hardwork is important!",
    },
    {
        id: uuidv4(),
        username: "rahulkumar",
        content: "This is my first RESTFUL API PROJECT",
    },

];

app.get("/posts", (req, res) => {
    console.log(`Request recieved from Index.ejs`)
    res.render("index.ejs", { posts: posts });

});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.unshift({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((item) => id === item.id);
    res.render("show.ejs", { post });

});



app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((item) => id === item.id);
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((item) => id === item.id);
    res.render("edit.ejs", { post });

});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((item) => id === item.id);
    let index = posts.indexOf(post);
    posts.splice(index,1);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`---------------------------------------- SERVER STARTED ! Listening to ${port} :) ----------------------------------------`);
});

