const pool = require("../config/database"); // 데이터베이스 설정을 임포트

const insertRwaData = (rwaDataChg) => {
  return new Promise((resolve, reject) => {
    const query = `
        INSERT INTO Rwa (
          main_id,
          sub_id,
          token_uri,
          name,
          amount,
          company,
          network,
          user_id,
          ipfs_id,
          sold_amount
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;

    const values = [
      rwaDataChg.main_id,
      rwaDataChg.sub_id,
      rwaDataChg.token_uri,
      rwaDataChg.name,
      rwaDataChg.amount,
      rwaDataChg.company,
      rwaDataChg.network,
      rwaDataChg.user_id,
      rwaDataChg.ipfs_id,
      rwaDataChg.sold_amount,
    ];

    pool.query(query, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results.insertId);
    });
  });
};

//유저등록
const insertUser = (userData) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO User (is_business, business_name, business_ca, address) VALUES (false, ?, ?, ?)";
    const values = [
      userData.is_business,
      userData.business_name,
      userData.business_ca,
      userData.address,
      //userData.ownedRwaId,
    ];
    pool.query(query, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results.affectedRows);
    });
  });
};

//선박회사 등록
const updateCompany = (companyData) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE User SET is_business = true, business_name = ?, business_ca = ?, address = ? WHERE id = ?";
    const values = [
      companyData.business_name,
      companyData.bussiness_ca,
      companyData.address,
      companyData.id,
    ];
    pool.query(query, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results.affectedRows);
    });
  });
};

//선박 디테일 정보 등록
const insertShipDetail = (shipDetailIpfs) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO Ipfs (
        amount, type, country, company, name, price, description, uri, builder, weight, expected_date, imo_number, expiration, due_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      shipDetailIpfs.amount,
      shipDetailIpfs.type,
      shipDetailIpfs.country,
      shipDetailIpfs.company,
      shipDetailIpfs.name,
      shipDetailIpfs.price,
      shipDetailIpfs.description,
      shipDetailIpfs.uri,
      shipDetailIpfs.builder,
      shipDetailIpfs.weight,
      shipDetailIpfs.expected_date,
      shipDetailIpfs.imo_number,
      shipDetailIpfs.expiration,
      shipDetailIpfs.due_date,
    ];
    pool.query(query, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results.insertId, results.affectedRows);
    });
  });
};

const selectMyPageDetail = (address) => {
  return new Promise((resolve, reject) => {
    const query = `    
    SELECT 
      a.id, 
      a.is_business, 
      a.business_name, 
      a.business_ca, 
      a.created_at, 
      a.address, 
      b.main_id 
    FROM User a
    left join Rwa b on a.id = b.user_id  
    where a.address = ?
    `;

    console.log("address222", address);
    pool.query(query, [address], (error, results) => {
      // Pass the address as an array
      if (error) {
        return reject(error);
      }
      console.log(results);
      resolve(results[0]);
    });
  });
};

module.exports = {
  insertUser,
  updateCompany,
  insertShipDetail,
  insertRwaData,
  selectMyPageDetail,
};
