const rmaService = require("../services/rmaService");

const postUser = async (req, res) => {
  try {
    const userData = req.body;
    const data = await rmaService.postUserService(userData);
    res.status(200).send("success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
};

const postCompany = async (req, res) => {
  try {
    const companyData = {
      userId: req.body.userId,
      bussinessName: req.body.bussinessName,
      bussinessCa: req.body.bussinessCa,
    };
    const data = await rmaService.postCompanyService(companyData);
    console.log("data", data);
    res.status(200).send("success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  postUser,
  postCompany,
};
