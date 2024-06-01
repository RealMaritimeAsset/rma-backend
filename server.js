require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const rmaService = require("./services/rmaService"); // blockService 모듈 임포트
const path = require("path");
const fs = require("fs");
const cors = require("cors");

// body-parser 설정 (옵션)
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 서버 시작과 동시에 크론 작업 시작
//rmaService.scheduleDataFetching(); // 크론 작업 실행

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(
  cors({
    origin: "*", // 허용할 도메인
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // 필요에 따라 설정
    optionsSuccessStatus: 204,
  })
);

// 라우트 설정
app.use(require("./src/routes"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
