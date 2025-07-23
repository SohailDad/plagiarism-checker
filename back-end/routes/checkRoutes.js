const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { handleCheck } = require("../controllers/checkController");

router.post("/", upload.single("file"), handleCheck);

module.exports = router;
