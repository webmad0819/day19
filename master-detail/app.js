require("dotenv").config();

const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const Movies = require("./models/Movies");
const path = require("path");
const bodyParser = require("body-parser")
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost/webmad0819", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.get("/master/:sortOrder?", (req, res) => {
  // if (req.params.sortOrder)
  console.log(req.params.sortOrder);
  if (
    req.params.sortOrder === undefined ||
    (req.params.sortOrder !== "asc" && req.params.sortOrder !== "desc")
  ) {
    Movies.find()
      .select({ title: 1, year: 1 })
      .then(allMovies => {
        res.render("index", {
          allMovies,
          creator: process.env.MY_CREATOR,
          host: process.env.HOST
        });
      });
  } else {
    if (req.params.sortOrder === "asc") {
      Movies.find()
        .select({ title: 1, year: 1 })
        .sort({ year: 1 })
        .then(allMovies => {
          res.render("index", {
            allMovies,
            creator: process.env.MY_CREATOR,
            host: process.env.HOST
          });
        });
    }

    if (req.params.sortOrder === "desc") {
      Movies.find()
        .select({ title: 1, year: 1 })
        .sort({ year: -1 })
        .then(allMovies => {
          res.render("index", {
            allMovies,
            creator: process.env.MY_CREATOR,
            host: process.env.HOST
          });
        });
    }
  }
});

app.get("/movie/:id", (req, res) => {
  Movies.findById(req.params.id).then(oneMovie => {
    res.render("movie-detail", { oneMovie, host: process.env.HOST });
  });
});

// app.get("/:githubRepo", (req, res) => {
//   res.send(`rendering the ${req.params.githubRepo} repo`)
// })

app.get("/search", (req, res) => {
  Movies.find({ title: req.query.movie }).then(movieDetails => {
    res.render("form-page-2", { query: movieDetails });
  });
});

app.get("/form", (req, res) => {
  res.render("form-page");
});

// query get with multi-params
app.get("/users/:username/books/:bookId", (req, res, next) => {
  res.send(req.params.username + "    " + req.params.bookId);
});

// http://localhost:5000/movie-querystring?identificadorPeli=5d7775a51be232a0c7086e20&genres=Drama,Crime
app.get("/movie-querystring", (req, res) => {
  Movies.find({ genre: { $all: req.query.genres.split(",") } })
    //.select({title: 1})
    .then(oneMovie => {
      res.json(oneMovie);
    })
    .catch(error => {
      res.json({ movieNotFound: true, error });
    });
});

app.get("/create-movie", (req, res) => {
  res.render("add-movie");
});

app.post("/create-movie-2", (req, res) => {
  console.log(req.body)
  Movies.create({
    title: req.body.title,
    year: req.body.year,
    rate: req.body.rate,
    director: req.body.director,
    duration: req.body.duration
    // genre: [String]
  }).then(createdMovie => {
    res.json({
      movieCreated: true,
      createdMovie
    });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
