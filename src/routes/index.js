const express = require("express");
const router = express.Router();
const rmaController = require("../../controller/rmaController");

//유저 등록
router.post("/api/v1/register-user", rmaController.postUser);

//선박 회사 등록
router.post("/api/v1/register-company", rmaController.postCompany);

module.exports = router;
