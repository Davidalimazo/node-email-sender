const mongoose = require("mongoose");

const ComradeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength:3,
    maxlength:15,
    required: true,
  },
  lastName: {
    type: String,
    minlength:3,
    maxlength:15,
    required: true,
  },
  gender: {
    type: String,
    minlength:4,
    maxlength:8,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  occupation: {
    type: String,
    minlength:3,
    maxlength:20,
    required: true,
  },
  mobile: {
    type: Number,
    minlength:11,
    maxlength:15,
    required: true,
  },
  email: {
    type: String,
    minlength:12,
    maxlength:30,
    required: true,
  },
  state: {
    type: String,
    minlength:3,
    maxlength:12,
    required: true,
  },
  lga: {
    type: String,
    minlength:3,
    maxlength:20,
    required: true,
  },
  subscribe: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

const Comrade = mongoose.model("Comrade", ComradeSchema);

module.exports = Comrade;