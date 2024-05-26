const express = require("express");
const router = express.Router();
const rmaController = require("../../controller/rmaController");
const fileController = require("../../controller/fileController");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "_" + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage });

//유저 등록
router.post("/api/v1/register-user", rmaController.postUser);

//선박 회사 등록
router.post("/api/v1/register-company", rmaController.postCompany);

//선박 디테일 정보 IPFS 등록
router.post("/api/v1/register-ship-detail", rmaController.postShipDetail);

//선박 디테일 정보 IPFS 등록
router.post(
  "/api/v1/file-to-ipfs",
  upload.single("file"),
  fileController.fileToIpfsUpload
);

module.exports = router;
