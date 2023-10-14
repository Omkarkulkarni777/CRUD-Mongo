const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  /* res.sendFile("./views/index.html", { root: __dirname }); other way of doing it*/
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
  res.redirect;
});
 
module.exports = router;
