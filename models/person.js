const mongoose = require("mongoose");

// define person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String, // String type for names
    required: true, // Name is required
    trim: true, // Trim whitespace from names
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
    max: 80000,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"], // Work must be one of these values
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    unique: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create a model from the schema
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
