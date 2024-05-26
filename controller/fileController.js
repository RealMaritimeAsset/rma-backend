const fileService = require("../services/fileService");

const fileToIpfsUpload = async (req, res) => {
  try {
    const fileData = req.file;
    console.log("controller fileData", fileData);
    const data = await fileService.fileToIpfsUploadService(fileData);
    console.log("data", data);
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
};
module.exports = {
  fileToIpfsUpload,
};
