const mongoose = require("mongoose");
require('dotenv').config();
// Your MongoDB Atlas connection string
const mongoUrl = process.env.MONGODB_URL;

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB server");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

const db = mongoose.connection;

db.on("connected", () => {
    console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
    console.error("MongoDB error", err);
});

db.on("disconnected", () => {
    console.log("Disconnected from MongoDB server");
});

module.exports = db;
