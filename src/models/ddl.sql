create database rma;  


CREATE TABLE User (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    isBusiness BOOLEAN DEFAULT false,
    bussinessName TEXT,
    bussinessCa TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    address VARCHAR(255),
    ownedRwaId INT
);


CREATE TABLE Rwa (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    mainId INT,
    subId INT,
    tokenUri VARCHAR(255),
    name VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount INT,
    company VARCHAR(255),
    network VARCHAR(255),
    uId VARCHAR(36),
    ipfs INT,  -- Assuming this references the id column in the ipfs table
    soldAmount INT
);

CREATE TABLE Ipfs (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount INT,
    type VARCHAR(255),
    country VARCHAR(255),
    company VARCHAR(255),
    name VARCHAR(255),
    price INT,
    description TEXT,
    uri VARCHAR(255),
    builder VARCHAR(255),
    weight INT,
    expectedDate TIMESTAMP,
    imoNumber INT,
    expiration TIMESTAMP,
    dueDate TIMESTAMP
);


CREATE TABLE Reward (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rwaId VARCHAR(36),  -- 수정: VARCHAR(36)로 변경하여 Rwa 테이블의 id와 일치시킴
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    businessName VARCHAR(255),
    address VARCHAR(255),
    reward VARCHAR(255),
    FOREIGN KEY (rwaId) REFERENCES Rwa(id) 
);

CREATE TABLE Purchase (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rwaId VARCHAR(36),
    userId VARCHAR(36),
    tokenAmount INT,
    FOREIGN KEY (rwaId) REFERENCES Rwa(id),
    FOREIGN KEY (userId) REFERENCES User(id)
);
