const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = 3000;

// Connect to your MongoDB database (Atlas)
mongoose.connect("mongodb+srv://Danish1001:Danish1001@774finalproject.li9gfx1.mongodb.net/Data", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB Atlas");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB Atlas:", err);
    });

// Define a user schema and model using Mongoose
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

app.get("/live-code", (req, res) => {
    res.sendFile(path.join(__dirname, "live-code.html"));
});

// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email, password });

    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Signup route
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.json({ success: false });
    } else {
        // Create a new user
        const newUser = new User({ email, password });
        await newUser.save();
        res.json({ success: true });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
