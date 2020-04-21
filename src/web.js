const express = require("express");
const logfmt = require("logfmt");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const static_path = path.join(__dirname, "../react-app", "build");
console.log("Serving static from", static_path);
app.use(express.static(static_path));

app.use(logfmt.requestLogger());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "react-app/build")));
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname + "/react-app/build/index.html"));
});

var server = app.listen(process.env.PORT || 3001, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("my app is running at http://%s:%s", host, port);
});
