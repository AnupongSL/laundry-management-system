const adminService = require("../services/admin.service");
const bcrypt = require("bcryptjs");

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Apply for an admin account
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin-RegisterRequest'
 *     responses:
 *       201:
 *         description: The Admin was successfully create
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin-RegisterResponse'
 *       410:
 *         description: Username already taken
 */

exports.addAdmin = async (req, res) => {
  const { a_username, a_password } = req.body;
  const result = await adminService.servByUsernameAdmin(a_username);
  if (result != "") {
    res.status(410).json({
      msg: "username ถูกใช้ไปแล้ว กรุณาใช้ username อื่น",
    });
  } else {
    const passwordHash = await bcrypt.hash(a_password, 10);
    await adminService.servAddAdmin(a_username, passwordHash);
    res.status(201).json({ msg: "เพิ่มข้อมูล Admin เรียบร้อยแล้ว" });
  }
};

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Login with admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin-LoginRequest'
 *     responses:
 *       200:
 *         description: Login Admin successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin-LoginResponse'
 *       409:
 *         description: Password is incorrect
 *       404:
 *         description: User not found in the system
 */

exports.loginAdmin = async (req, res) => {
  const { a_username, a_password } = req.body;
  const result = await adminService.servByUsernameAdmin(a_username);
  if (result != "") {
    const checkPassword = result[0]["a_password"];
    const isMatch = await bcrypt.compare(a_password, checkPassword);
    if (isMatch == true) {
      const token = await adminService.servLoginAdmin(a_username);
      res.json({ token });
    } else {
      res.status(409).json({ msg: "รหัสผ่านไม่ถูกต้อง" });
    }
  } else {
    res.status(404).json({ msg: "ไม่พบผู้ใช้งานในระบบ" });
  }
};

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin-RegisterRequest:
 *       type: object
 *       required:
 *         - a_username
 *         - a_password
 *       properties:
 *         a_username:
 *           type: string
 *           description: Administrator account username
 *         a_password:
 *           type: string
 *           description: Administrator account username
 *     Admin-RegisterResponse:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Create Administrator successfully
 *
 *
 *     Admin-LoginRequest:
 *       type: object
 *       required:
 *         - a_username
 *         - a_password
 *       properties:
 *         a_username:
 *           type: string
 *           description: Username Admin
 *         a_password:
 *           type: string
 *           description: Password Admin
 *     Admin-LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: The JWT token
 */
