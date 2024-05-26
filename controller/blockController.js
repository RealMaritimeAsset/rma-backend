const blockService = require("../services/blockService");

const mintRwa = async (req, res) => {
  try {
    const rwaData = req.body;
    const data = await blockService.mintRwaService(rwaData);
    console.log("data", data);
    res.status(200).send({ res: data });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  mintRwa,
};
