// App create
const express = require("express");
const app = express();

// Port find karna hai
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Middleware add karna hai
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload());

// DB se connect karna hai
const db = require("./config/database");
db.connect();

// Cloud se connect karna hai
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// API route mount karna hai
const upload = require("./routes/FileUpload");
app.use('/api/v1/upload', upload);

// Activate Server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})