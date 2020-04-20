var express = require("express");
var logfmt = require("logfmt");
const path = require("path");

var app = express();
const static_path = path.join(__dirname, "../react-app", "build");
console.log("Serving static from", static_path);
app.use(express.static(static_path));

app.use(logfmt.requestLogger());

app.use("/", express.static(__dirname));

var port = Number(process.env.PORT || 3001);
app.listen(port, function() {
  console.log("Listening on " + port);
});
