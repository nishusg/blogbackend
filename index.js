var express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://nishu:nishu@gallery.wfxdb.mongodb.net/blog?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
// mongoose.connect("mongodb://localhost/blog");
var Blog = require("./models/blog");

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  Blog.find({}, (err, blog) => {
    if (err) {
      console.log("error", err);
    } else {
      res.json(blog);
    }
  });
});
app.post("/", (req, res) => {
  Blog.create(req.body, (err, blog) => {
    if (err) {
      console.log(err);
    } else {
      res.send(blog);
    }
  });
});
app.delete("/delete/:id", (req, res) => {
  Blog.findByIdAndDelete({ _id: req.params.id }, (err, blog) => {
    if (err) {
      console.log(err);
    } else {
      res.send(blog);
    }
  });
});
app.put("/update/:id", (req, res) => {
  var data = {
    title: req.body.title,
    text: req.body.text,
    created: req.body.created,
  };
  Blog.findByIdAndUpdate({ _id: req.params.id }, data, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});
app.listen(process.env.PORT || 3001, () => {
  console.log("db connected");
});
