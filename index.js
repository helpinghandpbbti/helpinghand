var express = require("express");
const res = require("express/lib/response");
var app = express();

app.get("/", function (req, resp) {
    console.log("okay");
    resp.send("dsfds");
})
app.listen(process.env.PORT||5000);