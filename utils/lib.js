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

const getNetworkProvider = async (network) => {
  switch (network) {
    case "sepolia":
      return process.env.ALCHEMY_SEPOLIA_RPC_NODE_URL;
    case "avalanche":
      return process.env.ALLTHATNODE_AVALANCHE_FUJI_RPC_NODE_URL;
    default:
      return process.env.ALCHEMY_SEPOLIA_RPC_NODE_URL;
  }
};

module.exports = {
  ipfsFileUpload,
  getNetworkProvider,
};
