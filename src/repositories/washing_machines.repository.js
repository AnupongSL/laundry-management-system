const db = require("../database/models");
const { Op } = require("sequelize");

exports.repoGetWashingMachineAll = async () =>
  await db.washing_machines.findAll({
    attributes: [
      "id",
      "w_id",
      "w_brand",
      "w_image",
      "w_type",
      "w_capacity",
      "w_price",
      "w_timer",
      "w_status",
    ],
  });

exports.repoGetWashingMachineNumber = async (id) =>
  await db.washing_machines.findAll({
    where: {
      id: id,
    },
    attributes: [
      "id",
      "w_id",
      "w_brand",
      "w_image",
      "w_type",
      "w_capacity",
      "w_price",
      "w_timer",
      "w_status",
    ],
  });
exports.repoByMachineID = async (w_id) =>
  await db.washing_machines.findAll({
    where: {
      w_id: w_id,
    },
    attributes: [
      "id",
      "w_id",
      "w_brand",
      "w_image",
      "w_type",
      "w_capacity",
      "w_price",
      "w_timer",
      "w_status",
    ],
  });

exports.repoAddWashingMachine = async (dataMachine) =>
  await db.washing_machines.create(dataMachine);

exports.repoUpdateWashingMachine = async (id, w_status) =>
  await db.washing_machines.update(w_status, {
    where: {
      id: id,
    },
  });
