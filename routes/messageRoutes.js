const express = require("express");
const router = express.Router();
const { setMessages } = require("../controllers/messageController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, setMessages);

module.exports = router;
