const db = require("../database/models");
const { Op } = require("sequelize");

exports.repoGetCustomerAll = async () =>
  await db.Customers.findAll({
    attributes: ["id", "c_name", "c_username", "c_line", "c_coin"],
  });

exports.repoGetCustomerByUsername = async (c_username) =>
  await db.Customers.findAll({
    where: {
      c_username: c_username,
    },
    attributes: ["id", "c_name", "c_username", "c_line", "c_coin"],
  });

exports.repoGetCustomerByID = async (id) =>
  await db.Customers.findAll({
    where: {
      id: id,
    },
    attributes: ["id", "c_name", "c_username", "c_line", "c_coin"],
  });

exports.repoCustomerByUsername = async (c_username) =>
  await db.Customers.findAll({
    where: {
      c_username: c_username,
    },
  });

exports.repoCustomerByID = async (id) =>
  await db.Customers.findAll({
    where: {
      id: id,
    },
    attributes: ["id", "c_name", "c_username", "c_line", "c_coin"],
  });

exports.repoGetCustomerByName = async (c_name) =>
  await db.Customers.findAll({
    where: {
      c_name: {
        [Op.like]: `${c_name}%`,
      },
    },
    attributes: ["id", "c_name", "c_username", "c_line", "c_coin"],
  });

exports.repoAddCustomer = async (customer) =>
  await db.Customers.create(customer);

exports.repoAddCoinCustomer = async (id, sumCoin) =>
  await db.Customers.update(sumCoin, {
    where: {
      id: id,
    },
  });

exports.repoUpdateCustomer = async (c_username, customer) =>
  await db.Customers.update(customer, {
    where: {
      c_username: c_username,
    },
  });

exports.repoUpdateCustomerByUsername = async (c_username, c_coin) =>
  await db.Customers.update(c_coin, {
    where: {
      c_username: c_username,
    },
  });
