module.exports = {
  hrPool: {
   // user: "dbm_api",
   // password: "dbm_api",
    user: "hr_dev",
    password: "hr_dev",
//    connectString: "localhost:1521/orcl",
    connectString: "192.168.56.101:1521/orcl",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  }
};