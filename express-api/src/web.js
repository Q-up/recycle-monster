var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.use("/", express.static(__dirname));

var port = Number(process.env.PORT || 3001);
app.listen(port, function() {
  console.log("Listening on " + port);
});
