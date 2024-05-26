const pool = require("../config/database"); // 데이터베이스 설정을 임포트

// const getLatestPeerData = () => {
//   return new Promise((resolve, reject) => {
//     pool.query(
//       "SELECT * FROM peer_data ORDER BY id DESC LIMIT 1",
//       (error, results) => {
//         if (error) {
//           return reject(error);
//         }
//         resolve(results[0]);
//       }
//     );
//   });
// };

const insertBlockData = (blockData) => {
  return new Promise((resolve, reject) => {
    const query = `
        INSERT INTO block_data (
          block_hash,
          previous_hash,
          previous_state_root,
          transactions_root,
          finalize_root,
          ratifications_root,
          solutions_root,
          subdag_root,
          metadata_json,
          authority_json,
          ratifications_json,
          transactions_json,
          aborted_transaction_ids_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;

    const values = [
      blockData.block_hash,
      blockData.previous_hash,
      blockData.header.previous_state_root,
      blockData.header.transactions_root,
      blockData.header.finalize_root,
      blockData.header.ratifications_root,
      blockData.header.solutions_root,
      blockData.header.subdag_root,
      JSON.stringify(blockData.header.metadata),
      JSON.stringify(blockData.authority),
      JSON.stringify(blockData.ratifications),
      JSON.stringify(blockData.transactions),
      JSON.stringify(blockData.aborted_transaction_ids),
    ];

    pool.query(query, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results.insertId);
    });
  });
};

const insertUser = (userData) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO User (isBusiness, bussinessName, bussinessCa, address, ownedRwaId) VALUES (?, ?, ?, ?, 0)";
    const values = [
      userData.isBusiness,
      userData.bussinessName,
      userData.bussinessCa,
      userData.address,
      userData.ownedRwaId,
    ];
    pool.query(query, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results.insertId);
    });
  });
};

const updateCompany = (companyData) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE User SET isBusiness = true, bussinessName = ?, bussinessCa = ?, address = ?, ownedRwaId = ? WHERE id = ?";
    const values = [
      companyData.bussinessName,
      companyData.bussinessCa,
      companyData.address,
      companyData.ownedRwaId,
      companyData.userId,
    ];
    pool.query(query, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results.affectedRows);
    });
  });
};

module.exports = { updateCompany };

module.exports = {
  insertBlockData,
  insertUser,
  updateCompany,
};