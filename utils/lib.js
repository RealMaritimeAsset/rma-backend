const { ThirdwebStorage } = require("@thirdweb-dev/storage");
const storage = new ThirdwebStorage({
  secretKey: process.env.THIRD_WEB_STORAGE_KEY,
});

async function ipfsFileUpload(metaData) {
  const uri = await storage.upload(metaData);

  console.info(uri);

  const url2 = await storage.resolveScheme(uri);

  console.info(url2);

  return { ipfsUrl: url2 };
}

module.exports = {
  ipfsFileUpload,
};
