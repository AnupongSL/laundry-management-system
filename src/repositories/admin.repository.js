const db = require("../database/models");

exports.repoGetAdminByUsername = async (a_username) =>
  await db.Admins.findAll({
    where: {
      a_username: a_username,
    },
  });

exports.repoAddAdmin = async (a_username) => await db.Admins.create(a_username);