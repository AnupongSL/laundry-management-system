const customerRepository = require("../repositories/customer.repository");
const jwt = require('../middleware/jwt')

exports.servGetCustomerAll = async () =>
  await customerRepository.repoGetCustomerAll();

exports.servGetCustomerByUsername = async (c_username) =>
  await customerRepository.repoGetCustomerByUsername(c_username);
  
exports.servCustomerByUsername = async (c_username) =>
  await customerRepository.repoCustomerByUsername(c_username);

exports.servGetCustomerByID = async (id) =>
  await customerRepository.repoGetCustomerByID(id);

exports.servGetCustomerByName = async (c_name) =>
  await customerRepository.repoGetCustomerByName(c_name);

exports.servAddCustomer = async (customer, passwordHash) =>
  await customerRepository.repoAddCustomer({
    ...customer,
    c_password: passwordHash
  });

exports.servLoginCustomer = async (c_username) => {
  const result = await customerRepository.repoCustomerByUsername(c_username);
  if (result != "") {
    const name = result[0]["c_name"];
    const userName = result[0]["c_username"];
    const role = result[0]["c_role"];
    const payload = {
      c_name: name,
      c_username: userName,
      role: role
    };
    return jwt.generateToken(payload);
  } else {
    return { message: "กรุณากรอกยูสเซอร์ให้ถูกต้อง" };
  }
}

exports.servUpdateCustomer = async (customer, passwordHash, c_username) => {
    const updated = await customerRepository.repoUpdateCustomer(c_username, {
      ...customer,
      c_password: passwordHash,
    });
    if (updated) {
      return await customerRepository.repoCustomerByUsername(c_username);
    }
    return null;
  };

exports.servUpdateCustomerByUsername = async (c_username, coinUpdate) => {
    return await customerRepository.repoUpdateCustomerByUsername(c_username, {
      c_coin: coinUpdate
    });
  };

exports.servAddCoinCustomer = async (id, sumCoin) => {
    const updated = await customerRepository.repoAddCoinCustomer(id, {
      c_coin: sumCoin,
    });
    if (updated) {
      return await customerRepository.repoCustomerByID(id);
    }
    return null;
  };