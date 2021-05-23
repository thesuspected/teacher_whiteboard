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
// База данных
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://suspect:MVP4everSup126@mongocluster.prnlu.mongodb.net/whiteboard?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function (callback) {
    console.log("Connection Succeeded");
});

app.use(morgan("combined"));
// app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send(Object.keys(io.engine.clients));
});

io.on("connection", (socket) => {
    console.log(`A user connected with socket id ${socket.id}`);
    socket.broadcast.emit("USER_CONNECTED", socket.id);

    socket.on("fuck", () => {
        socket.broadcast.emit("fucku");
    });

    socket.on("disconnect", () => {
        console.log(`A user disconnected with socket id ${socket.id}`);
        socket.broadcast.emit("SOCKET_USER_DISCONNECTED", socket.id);
    });
});

// Прослушка сервера
http.listen(8081);
