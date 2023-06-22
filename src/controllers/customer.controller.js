const customerService = require("../services/customer.service");
const bcrypt = require("bcryptjs");
let passwordHash;


/**
 * @swagger
 * /customer/getcustomer:
 *   get:
 *     summary: Returns all customer information.  ** role = admin
 *     tags: [Customer]
 *     responses:
 *       200:
 *         description: The list of the Customers All
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer-CustomerResponse'
 *       404:
 *         description: Data not found.
 *       405:
 *         description: You do not have access to this page.
 *       401:
 *         description: Un Authenticated
 *     security: [{ bearerAuth: [] }]
 */
exports.getCustomerAll = async (req, res) => {
  if (req.role === "admin") {
    const result = await customerService.servGetCustomerAll();
    if (result != "") {
      res.status(200).json(result);
    } else {
      res.status(404).json({ msg: "ไม่พบข้อมูล" });
    }
  } else {
    res.status(405).json({ msg: "คุณไม่มีสิทธิเข้าถึงหน้านี้" });
  }
};

/**
 * @swagger
 * /customer/getcustomerbyusername:
 *   get:
 *     summary: Return customer information  ** role = customer
 *     tags: [Customer]
 *     responses:
 *       200:
 *         description: The list of the Customer By Username
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer-CustomerResponse'
 *       404:
 *         description: Data not found.
 *       405:
 *         description: You do not have access to this page.
 *       401:
 *         description: Un Authenticated
 *     security: [{ bearerAuth: [] }]
 */
exports.getCustomerByUsername = async (req, res) => {
  if (req.role === "customer") {
    const result = await customerService.servGetCustomerByUsername(
      req.c_username
    );
    if (result != "") {
      res.status(200).json(result);
    } else {
      res.status(404).json({ msg: "ไม่พบข้อมูล" });
    }
  } else {
    res.status(405).json({ msg: "คุณไม่มีสิทธิเข้าถึงหน้านี้" });
  }
};

/**
 * @swagger
 * /customer/getcustomer/{id}:
 *   get:
 *     summary: Returns the customer's information by ID.  ** role = admin
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The Customer ID
 *     responses:
 *       200:
 *         description: The list of the Customer By ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer-CustomerResponse'
 *       404:
 *         description: Data not found.
 *       405:
 *         description: You do not have access to this page.
 *       401:
 *         description: Un Authenticated
 *     security: [{ bearerAuth: [] }]
 */
exports.getCustomerById = async (req, res) => {
  if (req.role === "admin") {
    const result = await customerService.servGetCustomerByID(req.params.id);
    if (result != "") {
      res.status(200).json(result);
    } else {
      res.status(404).json({ msg: "ไม่พบข้อมูล" });
    }
  } else {
    res.status(405).json({ msg: "คุณไม่มีสิทธิเข้าถึงหน้านี้" });
  }
};

/**
 * @swagger
 * /customer/getcustomerbyname:
 *   post:
 *     summary: Returns customer information by name.   ** role = admin
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer-GetCustomerByNameRequest'
 *     responses:
 *       200:
 *         description: The list of the Customers By Name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer-CustomerResponse'
 *       404:
 *         description: Data not found.
 *       405:
 *         description: You do not have access to this page.
 *       401:
 *         description: Un Authenticated
 *     security: [{ bearerAuth: [] }]
 */
exports.getCustomerByName = async (req, res) => {
  if (req.role === "admin") {
    const result = await customerService.servGetCustomerByName(req.body.c_name);
    if (result != "") {
      res.status(200).json(result);
    } else {
      res.status(404).json({ msg: "ไม่พบข้อมูล" });
    }
  } else {
    res.status(405).json({ msg: "คุณไม่มีสิทธิเข้าถึงหน้านี้" });
  }
};

/**
 * @swagger
 * /customer/addcoin/{id}:
 *   put:
 *     summary: Adcoin Customer   ** role = admin
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The Customer id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer-UpdateCoinRequest'
 *     responses:
 *       200:
 *         description: Update Coin successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer-UpdateCoinResponse'
 *       405:
 *         description: You do not have access to this page.
 *       401:
 *         description: Un Authenticated
 *     security: [{ bearerAuth: [] }]
 */
exports.addCoinCustomer = async (req, res) => {
  console.log(req.role);
  if (req.role === "admin") {
    const id = req.params.id;
    const coin = req.body.c_coin;
    const result = await customerService.servGetCustomerByID(id);
    const getCoin = result[0]["c_coin"];
    const sumCoin = getCoin + coin;
    await customerService.servAddCoinCustomer(id, sumCoin);
    res.status(200).json({ msg: "เพิ่ม coin ให้ลูกค้าเรียบร้อยแล้ว" });
  } else {
    res.status(405).json({ msg: "คุณไม่มีสิทธิเข้าถึงหน้านี้" });
  }
};

/**
 * @swagger
 * /customer/register:
 *   post:
 *     summary: Create new account Customer
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer-RegisterRequest'
 *     responses:
 *       201:
 *         description: The Customer was successfully create
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer-RegisterResponse'
 *       410:
 *         description: Username already taken
 */
exports.addCustomer = async (req, res) => {
  const result = await customerService.servCustomerByUsername(
    req.body.c_username
  );
  if (result != "") {
    res.status(410).json({
      msg: "username ถูกใช้ไปแล้ว กรุณาใช้ username อื่น",
      Status: false,
    });
  } else {
    const c_password = req.body.c_password;
    const passwordHash = await bcrypt.hash(c_password, 10);
    await customerService.servAddCustomer(req.body, passwordHash);
    res.status(201).json({ msg: "เพิ่มข้อมูลลูกค้าเรียบร้อยแล้ว" });
  }
};

/**
 * @swagger
 * /customer/login:
 *   post:
 *     summary: Login Customer Account
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer-LoginRequest'
 *     responses:
 *       200:
 *         description: Login Customer successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer-LoginResponse'
 *       409:
 *         description: Password is incorrect
 *       404:
 *         description: User not found in the system
 */
exports.loginCustomer = async (req, res) => {
  const { c_username, c_password } = req.body;
  const result = await customerService.servCustomerByUsername(c_username);
  if (result != "") {
    const checkPassword = result[0]["c_password"];
    const isMatch = await bcrypt.compare(c_password, checkPassword);
    if (isMatch == true) {
      const token = await customerService.servLoginCustomer(c_username);
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
 * /customer/update:
 *   put:
 *     summary: Update Customer   ** role = customer
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Customer-UpdateRequest'
 *     responses:
 *       200:
 *         description: The Customer was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer-UpdateResponse'
 *       409:
 *         description: Password is incorrect.
 *       405:
 *         description: You do not have access to this page.
 *       401:
 *         description: Un Authenticated
 *     security: [{ bearerAuth: [] }]
 */
exports.updateCustomer = async (req, res) => {
  if (req.role === "customer") {
    const result = await customerService.servCustomerByUsername(req.c_username);
    if (result) {
      const checkPassword = result[0]["c_password"];
      const c_password = req.body.c_password;
      const newPassword = req.body.newpassword;
      const isMatch = await bcrypt.compare(c_password, checkPassword);
      if (isMatch == true) {
        if (newPassword != "") {
          const salt = await securePassword(newPassword);
          passwordHash = salt;
        } else {
          passwordHash = checkPassword;
        }
        await customerService.servUpdateCustomer(
          req.body,
          passwordHash,
          req.c_username
        );
        res.status(200).json({
          msg: "อัพเดทข้อมูลเรียบร้อยแล้ว",
        });
      } else {
        res.status(409).json({ msg: "รหัสผ่านไม่ถูกต้อง" });
      }
    }
  } else {
    res.status(405).json({ msg: "คุณไม่มีสิทธิเข้าถึงหน้านี้" });
  }
};

const securePassword = async (c_password) => {
  try {
    const passwordHash = await bcrypt.hash(c_password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: Customer management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer-RegisterRequest:
 *       type: object
 *       required:
 *         - c_name
 *         - c_username
 *         - c_password
 *         - c_line
 *       properties:
 *         c_name:
 *           type: string
 *           description: Customer account name
 *         c_username:
 *           type: string
 *           description: Customer account username
 *         c_password:
 *           type: string
 *           description: Customer account password
 *         c_line:
 *           type: string
 *           description: Customer account line
 *     Customer-RegisterResponse:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Create Administrator successfully
 *
 *
 *     Customer-GetCustomerByNameRequest:
 *       type: object
 *       required:
 *         - c_name
 *       properties:
 *         c_name:
 *           type: string
 *           description: Customer account c_name
 *
 *
 *     Customer-UpdateCoinRequest:
 *       type: object
 *       required:
 *         - c_coin
 *       properties:
 *         c_coin:
 *           type: number
 *           description: Customer account coin
 *     Customer-UpdateCoinResponse:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Update Coin successfully
 *
 *
 *     Customer-LoginRequest:
 *       type: object
 *       required:
 *         - c_username
 *         - c_password
 *       properties:
 *         c_username:
 *           type: string
 *           description: Customer account username
 *         c_password:
 *           type: string
 *           description: Customer account password
 *     Customer-LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: The JWT token
 *
 *
 *
 *
 *     Customer-UpdateRequest:
 *       type: object
 *       required:
 *         - c_password
 *       properties:
 *         c_name:
 *           type: string
 *           description: Customer account name
 *         c_password:
 *           type: string
 *           description: Customer account password
 *         c_line:
 *           type: string
 *           description: Customer account line
 *         newpassword:
 *           type: string
 *           description: Customer new password
 *     Customer-UpdateResponse:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Update Customer successfully
 *
 *
 *
 *     Customer-CustomerResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         c_name:
 *           type: string
 *           description: The Customer name
 *         c_username:
 *           type: string
 *           description: The Customer name
 *         c_line:
 *           type: string
 *           description: The Customer line
 *         c_coin:
 *           type: number
 *           description: The Customer coin
 */
