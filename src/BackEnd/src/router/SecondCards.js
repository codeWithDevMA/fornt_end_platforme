const express = require("express");
const rout = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/checkAuth");
const SecondCards = require("../controllers/secondCards");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 40,
  },
  fileFilter: fileFilter,
});
/*-----------------------------getting all  card-----------------------------*/
rout.get("/", SecondCards.get_secondCards_id);
/*-----------------------------posting a card-----------------------------*/
rout.post(
  "/",
  checkAuth,
  upload.single("cardImage"),
  SecondCards.post_secondCards
);
/*-----------------------------getting  card-----------------------------*/
rout.get("/:secondCard_id", SecondCards.get_secondCards);
/*-----------------------------update card-----------------------------*/
rout.patch("/:secondCard_id", SecondCards.patch_secondCards);
/*-----------------------------delete card-----------------------------*/
rout.delete("/:delete", SecondCards.delete_secondCards);
module.exports = rout;
