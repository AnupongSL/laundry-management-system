const adminRepository = require("../repositories/admin.repository");
const jwt = require('../middleware/jwt')

exports.servByUsernameAdmin = async (a_username) =>
  await adminRepository.repoGetAdminByUsername(a_username);

exports.servAddAdmin = async (a_username, passwordHash) =>
  await adminRepository.repoAddAdmin({
    a_username: a_username,
    a_password: passwordHash
  });

exports.servLoginAdmin = async (a_username) => {
  const result = await adminRepository.repoGetAdminByUsername(a_username);
  if (result != "") {
    const roleA = result[0]["a_role"];
    const payload = {
      role: roleA
    };
    return jwt.generateToken(payload);
  } else {
    return { message: "กรุณากรอกยูสเซอร์ให้ถูกต้อง" };
  }
}