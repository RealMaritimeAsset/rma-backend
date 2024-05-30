const fetch = require("node-fetch");
const cron = require("node-cron");
const rmaModel = require("../src/models/rmaModel");
const lib = require("../utils/lib");

// // 주기적인 작업 설정
// const scheduleDataFetching = () => {
//   cron.schedule("* * * * *", async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3030/testnet3/latest/block"
//       );
//       const blockData = await response.json();
//       await blockModel
//         .insertBlockData(blockData)
//         .then((insertId) => {
//           console.log(`Inserted block data with id: ${insertId}`);
//         })
//         .catch((error) => {
//           console.error("Error inserting block data:", error);
//         });

//       const peer_get_all_fetch = await fetch(
//         "http://localhost:3030/testnet3/peers/all"
//       );

//       console.log("peer_get_all_fetch", peer_get_all_fetch);
//       const peer_get_all = await peer_get_all_fetch.json();
//       console.log("peer_get_all", peer_get_all, peer_get_all.length);
//       console.log(JSON.stringify(peer_get_all));

//       //insertPeer
//       let peerList = JSON.stringify(peer_get_all);
//       await blockModel
//         .insertPeer(peerList)
//         .then((insertId) => {
//           console.log(`Inserted peer_get_all data with id: ${insertId}`);
//         })
//         .catch((error) => {
//           console.error("Error inserting peer_get_all data:", error);
//         });
//     } catch (error) {
//       console.error("Error fetching and inserting peer_get_all:", error);
//     }
//   });
// };

//유저 등록 서비스
const postUserService = async (userData) => {
  try {
    console.log("userData", userData);
    const userPostData = await rmaModel
      .insertUser(userData)
      .then((insertId) => {
        console.log(`Inserted userData data with id: ${insertId}`);
        return insertId;
      })
      .catch((error) => {
        console.error("Error inserting userData data:", error);
      });
    console.log("userPostData", userPostData);
    return userPostData;
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};

//회사 등록
const postCompanyService = async (companyData) => {
  try {
    console.log("companyData", companyData);
    const data = await rmaModel
      .updateCompany(companyData)
      .then((affectedRows) => {
        console.log(`Updated ${affectedRows} row(s)`);
        return affectedRows; // Ensure the data is returned
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        throw error; // Rethrow the error to be caught in the outer try-catch
      });

    console.log("data", data);
    return data;
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};

//선박 디테일 등록 서비스
const postShipDetailService = async (shipDetailIpfs) => {
  try {
    console.log("shipDetailIpfs", shipDetailIpfs);
    const shipPostData = await rmaModel
      .insertShipDetail(shipDetailIpfs)
      .then((insertId) => {
        console.log(`Inserted insertShipDetail data with id: ${insertId}`);
      })
      .catch((error) => {
        console.error("Error insertShipDetail  data:", error);
      });

    const ipfsUri = lib.ipfsFileUpload(shipDetailIpfs);
    return shipPostData, ipfsUri;
  } catch (e) {
    console.log("error", error);
    throw e;
  }
};

//선박 디테일 등록 서비스
const getMypageDetailService = async (address) => {
  try {
    console.log("address3", address);
    const data = await rmaModel.selectMyPageDetail(address);
    console.log("data", data);
    if (data.main_id === null) {
      data.main_id = 0;
    }
    return data;
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};

//rwa 토큰 민팅 서비스
const mintRwaService = async (rwaData) => {
  try {
    console.log("rwaData", rwaData);
    for (let i = 0; i < rwaData.subIdAmounts; i++) {
      console.log("i", i);
      let rwaDataChg = {
        address: rwaData.recipient,
        main_id: rwaData.mainId,
        sub_id: i,
        amount: rwaData.tokenAmounts,
        token_uri: rwaData.tokenUris[i],
        name: rwaData.name,
        company: rwaData.company,
        network: rwaData.network,
        user_id: rwaData.user_id,
        ipfs_id: rwaData.ipfs_id,
        sold_amount: rwaData.sold_amount,
      };
      console.log(rwaDataChg);
      const rwaPostData = await rmaModel
        .insertRwaData(rwaDataChg)
        .then((insertId) => {
          console.log(`Inserted rwaPostData data with id: ${insertId}`);
          return insertId;
        })
        .catch((error) => {
          console.error("Error inserting rwaPostData data:", error);
        });
      console.log("rwaPostData", rwaPostData);
    }

    return rwaData;
    //return rwaPostData[rwaPostData.length - 1];
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};

module.exports = {
  postCompanyService,
  postUserService,
  getMypageDetailService,
  mintRwaService,
};
