const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    name: String,
    surname: String,
    bootcamp: String
  },
  { timestamps: true }
);

const Students = mongoose.model("Students", studentSchema);
module.exports = Students;
