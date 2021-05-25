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

module.exports.db = db;
module.exports.mongoose = mongoose;
