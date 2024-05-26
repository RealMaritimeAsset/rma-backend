const fs = require("fs");
const mime = require("mime");
const path = require("path");
const { ThirdwebStorage } = require("@thirdweb-dev/storage");

const storage = new ThirdwebStorage({
  secretKey: process.env.THIRD_WEB_STORAGE_KEY,
});

// 서비스 함수
const fileToIpfsUploadService = async (fileData) => {
  try {
    console.log("service fileData", fileData);
    const filePath = fileData.path;
    console.log("filePath", filePath);

    const extension = mime.extension(fileData.mimetype);
    const fileName = fileData.filename;
    console.log("fileName", fileName);

    const filePathData = fs.readFileSync(path.join(__dirname, "../", filePath));

    const uri = await storage.upload(filePathData);
    // This will log a URL like ipfs://QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy/0
    console.info(uri);

    const url2 = await storage.resolveScheme(uri);
    // This will log a URL like https://ipfs.thirdwebstorage.com/ipfs/QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy/0
    console.info(url2);

    //    fs.unlinkSync(path.join(__dirname, "../", filePath)); // 업로드된 파일을 삭제합니다.

    return { ipfsUrl: url2 };
  } catch (e) {
    console.error("error", e);
    throw e;
  }
};

module.exports = {
  fileToIpfsUploadService,
};
