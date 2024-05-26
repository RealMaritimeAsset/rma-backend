const fs = require("fs");
const path = require("path");
const lib = require("../utils/lib");

// 서비스 함수
const fileToIpfsUploadService = async (fileData) => {
  try {
    const filePath = fileData.path;
    const fileName = fileData.filename;
    const filePathData = fs.readFileSync(path.join(__dirname, "../", filePath));
    const ipfsUri = lib.ipfsFileUpload(filePathData);
    return ipfsUri;
  } catch (e) {
    console.error("error", e);
    throw e;
  }
};

module.exports = {
  fileToIpfsUploadService,
};
