const express = require("express");
const db = require("./db");

const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");

/// import the router file
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuRoutes");

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
// use the routers
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

app.get("/", (req, res) => {
  res.send("Hello, MongoDB!");
});

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
