const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { handleCheck, checkUserText } = require("../controllers/checkController");

router.post("/",checkUserText)
router.post("/", upload.single("file"), handleCheck);
module.exports = router;
