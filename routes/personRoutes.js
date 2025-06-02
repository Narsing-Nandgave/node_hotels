const express = require("express");
const router = express.Router();
const Person = require("../models/person");

router.post("/", async (req, res) => {
  // jo kahi data frontend kadun yeto to body parser through yeto ani to req.body madhe store hoto
  // const data = req.body;

  // create new person document using  mongoose model
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Person created successfully:", response);
    res.status(200).json({
      message: "Person data added successfully",
      person: response,
    });
  } catch (error) {
    console.error("Error creating person:", error);
    res.status(500).json({ error: "Failed to create person" });
  }
});

router.get("/", async (req, res) => {
  try {
    const showPersonData = await Person.find();
    res.status(200).json(showPersonData);
    console.log("Fetched person data successfully:", showPersonData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the data" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;

    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
      console.log("data Fetched:", response);
    }
  } catch (error) {
    res.status(404).json({ error: "Invalid Work Type" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const { updatedPersonData } = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // return the update document
        runValidators: true, // Run Mongoose Validation
      }
    );

    if (!response) {
      res.status(404).json({ error: "Person Not Found" });
    }
    res.status(200).json(response);

    console.log("Data Updated", response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the data" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const deletedPerson = await Person.findByIdAndDelete(personId);

    if (!deletedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    console.error("Error deleting person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
