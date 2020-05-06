const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const static_path = path.join(__dirname, "react-app/build");

app.use(express.static(static_path));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "react-app/build")));

app.get("/game", (_, res) => {
  res.sendFile(path.join(__dirname + "/react-app/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Rycycle Monster listening on ${port}`);
