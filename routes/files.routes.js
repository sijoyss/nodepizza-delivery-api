const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === "application/pdf" || file.mimetype === "text/plain") {
    callback(null, true);
  } else {
    console.log("Wrong file type");
    callback(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/", upload.single("pdfFile"), (req, res) => {
  if (req.file) {
    res.status(200).send({ Message: "File Uploaded" });
    console.log(req.file);
  } else {
    res
      .status(400)
      .send({ Error: "Something Went Worng while uploading the file" });
  }
});

// router.get("/readfile", fileController.readFile);

// router.post("/writefile", fileController.writeFile);

module.exports = router;
