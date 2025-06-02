const express = require("express");
const db = require("./db");
const PORT = 8000;
const app = express();

const bodyParser = require("body-parser");

/// import the router file
const personRoutes = require("../mongodb/routes/personRoutes");
const menuItemRoutes = require("./routes/menuRoutes");

app.use(bodyParser.json());

// use the routers
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

app.get("/", (req, res) => {
  res.send("Hello, MongoDB!");
});

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
