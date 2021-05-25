const app = require("express")();
var http = require("http").Server(app);
const cors = require("cors");
const morgan = require("morgan");
var io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST", "WS"],
        credentials: true,
    },
});
app.use(morgan("combined"));
app.use(cors());
var md5 = require("md5");

module.exports.app = app;
module.exports.io = io;
module.exports.http = http;
module.exports.md5 = md5;
