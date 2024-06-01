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

//유저 등록 POST
router.post("/api/v1/register-user", rmaController.postUser);

//선박 회사 등록 POST
router.post("/api/v1/register-company", rmaController.postCompany);

//선박 디테일 정보 DB등록 > IPFS 등록 POST
router.post("/api/v1/register-ship-detail", rmaController.postShipDetail);

//선박 IPFS 파일 업로드 POST
router.post(
  "/api/v1/file-to-ipfs",
  upload.single("file"),
  fileController.fileToIpfsUpload
);

//선박 RWA 민팅 데이터 적재 POST
router.post("/api/v1/mint-rwa", rmaController.mintRwa);

//기업 RWA 토큰 보상 기능 추가 POST
//router.post("/api/v1/mint-rwa", rmaController.mintRwa);

//RWA 토큰 구매 POST
//router.post("/api/v1/mint-rwa", rmaController.mintRwa);

//마이페이지 조회, 기업용 마이페이지 조회
//RWA 토큰 등록시 메인 아이디 조회
router.get("/api/v1/mypage/:address", rmaController.getMypageDetail);

//기업 RWA 토큰 관리 페이지 조회
router.get("/api/v1/manage-rwa/:address", rmaController.manageRwa);

//RWA 마켓 페이지 조회 GET
router.get("/api/v1/rwa-market", rmaController.getRwaMarket);

//RWA 마켓 상세 조회 GET
router.get("/api/v1/rwa-market/detail/:id", rmaController.getRwaMarketDetail);

//오픈웨더 날씨 정보 가져오기
router.get("/api/v1/ship-weather", rmaController.getShipWeather);

module.exports = router;
