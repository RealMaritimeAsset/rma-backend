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

//선박 디테일 정보 DB등록 > IPFS 등록
router.post("/api/v1/register-ship-detail", rmaController.postShipDetail);

//선박 IPFS 파일 업로드
router.post(
  "/api/v1/file-to-ipfs",
  upload.single("file"),
  fileController.fileToIpfsUpload
);

//선박 RWA 민팅 데이터 적재
router.post("/api/v1/mint-rwa", rmaController.mintRwa);

//마이페이지 조회, 기업용 마이페이지 조회
//RWA 토큰 등록시 메인 아이디 조회
router.get("/api/v1/mypage/:address", rmaController.getMypageDetail);

module.exports = router;
