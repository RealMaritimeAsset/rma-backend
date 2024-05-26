const rmaModel = require("../src/models/rmaModel");
const lib = require("../utils/lib");

const mintRwaService = async (rwaData) => {
  try {
    console.log("rwaData", rwaData);
    const rwaPostData = await rmaModel
      .insertUser(rwaPostData)
      .then((insertId) => {
        console.log(`Inserted rwaPostData data with id: ${insertId}`);
        return insertId;
      })
      .catch((error) => {
        console.error("Error inserting rwaPostData data:", error);
      });
    console.log("rwaPostData", rwaPostData);
    return rwaPostData;
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};

module.exports = {
  mintRwaService,
};
