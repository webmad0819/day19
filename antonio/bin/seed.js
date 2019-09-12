const mongoose = require("mongoose");
const Movies = require("../models/Movies");
const Students = require("../models/Students");
const faker = require("faker");

mongoose
  .connect("mongodb://localhost/antonio", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    start();

    // console.log(Array(5)
    // .fill()
    // // .map(x => faker.fake("{{commerce.productName}}")))
    // .map(x => faker.helpers.createCard()))
    // process.exit(0);
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

function start() {
  Movies.deleteMany()
    .then(deleted => {
      return Students.deleteMany();
    })
    .then(studentsDroppedInfo => {
      Movies.create([
        {
          title: "El nombre de la rosa",
          year: 1986
        },
        {
          title: "Blade Runner",
          year: 1989
        }
      ])
        .then(createdMovies => {
          Students.create([
            {
              name: "Pepe",
              surname: "Diaz",
              bootcamp: "webmad0819"
            },
            {
              name: "Lorena",
              surname: "Poza",
              bootcamp: "webmad0819"
            }
          ]).then(addedStudents => {
            process.exit(0);
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
}
