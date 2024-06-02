const rmaService = require("../services/rmaService");

const postUser = async (req, res) => {
  try {
    const userData = req.body;
    if (req.body.address == "") {
      return res.status(200).send({ res: "" });
    }
    const data = await rmaService.postUserService(userData);
    res.status(200).send({ res: data });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
};

const postCompany = async (req, res) => {
  try {
    const companyData = {
      id: req.body.id,
      business_name: req.body.business_name,
      bussiness_ca: req.body.bussiness_ca,
      address: req.body.address,
    };
    const data = await rmaService.postCompanyService(companyData);
    console.log("data", data);
    res.status(200).send({ res: data });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
};

const postShipDetail = async (req, res) => {
  try {
    const shipDetailIpfs = {
      name: req.body.name, //선박 이름
      type: req.body.type, //선박 타입
      price: req.body.price, //선박 가격
      amount: req.body.amount, //선박 RWA 토큰 개수
      description: req.body.description, //선박 설명
      uri: req.body.uri, //선박 이미지 URI
      builder: req.body.builder, //선박 빌더, 메이커
      weight: req.body.weight, //선박 총 톤수,
      expected_date: req.body.expected_date, //선박이 운행할 수 있는 마지막 날짜 예시)) 2035-04-30
      imo_number: req.body.imo_number, //선박 IMO 넘버, 주민등록번호
      country: req.body.country, //만들어진 국가
      company: req.body.company, //등록하는 선박 회사
      expiration: req.body.expiration, //선박이 운행할 수 있는 기간, 예시)) 10Y면 10년, 15Y면 15년
      due_date: req.body.due_date, //펀딩 마감기한 예시)) 2024-12-31
      network: req.body.network, //등록할 네트워크, 디폴트는 이더리움
    };
    const data = await rmaService.postShipDetailService(shipDetailIpfs);
    console.log("data", data);
    res.status(200).send({ res: data });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
};

const insertRwaContract = async (req, res) => {
  try {
    const shipDetailIpfs = {
      name: req.body.name, //선박 이름
      type: req.body.type, //선박 타입
      price: req.body.price, //선박 가격
      amount: req.body.amount, //선박 RWA 토큰 개수
      description: req.body.description, //선박 설명
      uri: req.body.uri, //선박 이미지 URI
      builder: req.body.builder, //선박 빌더, 메이커
      weight: req.body.weight, //선박 총 톤수,
      expectedDate: req.body.expectedDate, //선박이 운행할 수 있는 마지막 날짜 예시)) 2035-04-30
      imoNumber: req.body.imoNumber, //선박 IMO 넘버, 주민등록번호
      country: req.body.country, //만들어진 국가
      company: req.body.company, //등록하는 선박 회사
      expiration: req.body.expiration, //선박이 운행할 수 있는 기간, 예시)) 10Y면 10년, 15Y면 15년
      dueDate: req.body.dueDate, //펀딩 마감기한 예시)) 2024-12-31
      network: req.body.network, //등록할 네트워크, 디폴트는 이더리움
    };
    const data = await rmaService.postShipDetailService(shipDetailIpfs);
    console.log("data", data);
    res.status(200).send({ res: data });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
};

const getMypageDetail = async (req, res) => {
  try {
    const { address } = req.params;
    const data = await rmaService.getMypageDetailService(address);
    res.status(200).send({ res: data });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
};

const mintRwa = async (req, res) => {
  try {
    const rwaData = req.body;
    const data = await rmaService.mintRwaService(rwaData);
    console.log("data", data);
    res.status(200).send({ res: data });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
};

const manageRwa = async (req, res) => {
  try {
    const { address } = req.params;
    const data = await rmaService.manageRwaService(address);
    console.log("data", data);
    res.status(200).send({ res: data });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
};

const getRwaMarket = async (req, res) => {
  try {
    const data = await rmaService.getRwaMarketService();
    console.log("data", data);
    res.status(200).send({ res: data });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
};

const getRwaMarketDetail = async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.params.id);
    const rwaId = req.params.id;
    console.log("rwaId", rwaId);
    const data = await rmaService.getRwaMarketDetailService(rwaId);
    //data = "test";
    console.log("data", data);
    res.status(200).send({ res: data });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
};

const getShipWeather = async (req, res) => {
  try {
    console.log(req.query);
    const lat = req.query.lat;
    const lon = req.query.lon;
    console.log("lat", lat);
    console.log("lon", lon);
    const data = await rmaService.getShipWeatherService(lat, lon);
    res.status(200).send(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  postUser,
  postCompany,
  postShipDetail,
  insertRwaContract,
  mintRwa,
  getMypageDetail,
  manageRwa,
  getRwaMarket,
  getRwaMarketDetail,
  getShipWeather,
};
