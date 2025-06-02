const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menu");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);

    const response = await newMenu.save();
    console.log("Menu added Successfully", response);
    res.status(200).json({
      message: "Menu Item added successfully",
    });
  } catch (error) {
    console.error("Error while creating Menu", error);
    res.status(500).json({ error: "Failed to Create  Menu" });
  }
});

router.get("/", async (req, res) => {
  try {
    const showMenuItemData = await MenuItem.find();
    res.status(200).json(showMenuItemData);
    console.log("Fetched MenuItem data successfully:", showMenuItemData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the MenuItem data" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.testType;
    if (
      tasteType == "Bitter" ||
      tasteType == "Sweet" ||
      tasteType == "Spicy" ||
      tasteType == "Salty"
    ) {
      const showMenuItemData = await MenuItem.find({ taste: tasteType });
      res.status(200).json(showMenuItemData);
      console.log("Fetched MenuItem data successfully:", showMenuItemData);
    }
  } catch (error) {
    res.status(404).json({ error: "Taste type is not included" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updatedMenuData = req.body;
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      menuId,
      updatedMenuData,
      {
        new: true, // return the update document
        runValidators: true, // Run Mongoose Validation
      }
    );

    if (!updatedMenuItem) {
      res.status(404).json({ error: "Person Not Found" });
    }
    res.status(200).json(updatedMenuItem);

    console.log("Data Updated", updatedMenuItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the data" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const deletedMenuItem = await MenuItem.findByIdAndDelete(menuId);

    if (!deletedMenuItem) {
      return res.status(404).json({ mesage: "Menu Item not found!" });
    }
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete data" });
  }
});

module.exports = router;
