const db = require("../database/models");
const { Op } = require("sequelize");

exports.repoGetHistoryAll = async () =>
  await db.washing_histories.findAll({
    attributes: [
      "id",
      "c_name",
      "c_username",
      "w_id",
      "w_type",
      "w_price",
      "time_start",
      "time_stop",
      "date",
    ],
  });

exports.repoGetHistoryDate = async (timeIn, timeOut) =>
  await db.washing_histories.findAll({
    where: {
      date: {
        [Op.gt]: timeIn,
        [Op.lt]: timeOut,
      },
    },
    attributes: [
      "id",
      "c_name",
      "c_username",
      "w_id",
      "w_type",
      "w_price",
      "time_start",
      "time_stop",
      "date",
    ],
  });

exports.repoHistoryByName = async (c_name) =>
  await db.washing_histories.findAll({
    where: {
      c_name: {
        [Op.like]: `${c_name}%`,
      },
    },
    attributes: [
      "id",
      "c_name",
      "c_username",
      "w_id",
      "w_type",
      "w_price",
      "time_start",
      "time_stop",
      "date",
    ],
  });

exports.repoGetHistoryByUsername = async (c_username) =>
  await db.washing_histories.findAll({
    where: {
      c_username: c_username,
    },
    attributes: [
      "id",
      "c_name",
      "c_username",
      "w_id",
      "w_type",
      "w_price",
      "time_start",
      "time_stop",
      "date",
    ],
  });

exports.repoGetHistoryUsernameByDate = async (c_username, timeIn, timeOut) =>
  await db.washing_histories.findAll({
    where: {
      c_username: c_username,
      date: {
        [Op.gt]: timeIn,
        [Op.lt]: timeOut,
      },
    },
    attributes: [
      "id",
      "c_name",
      "c_username",
      "w_id",
      "w_type",
      "w_price",
      "time_start",
      "time_stop",
      "date",
    ],
  });

exports.repoAddHistoryWashing = async (c_name) =>
  await db.washing_histories.create(c_name);

exports.repoAddHistoryTimeout = async (w_id, time_stop) =>
  await db.washing_histories.update(time_stop, {
    where: {
      w_id: w_id,
    },
  });