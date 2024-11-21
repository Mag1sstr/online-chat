const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Мой сервер");
});
module.exports = router;
