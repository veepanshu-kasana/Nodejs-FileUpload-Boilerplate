const express = require("express");
const router = express.Router(); 

const {localFileUpload} = require("../controllers/fileUpload");

// Api route
router.post("/localFileUpload", localFileUpload);

module.exports = router;