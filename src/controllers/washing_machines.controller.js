const washingService = require("../services/washing_machines.service");
const customerService = require("../services/customer.service");
const historyService = require("../services/history.service");
const cron = require("node-cron");
const request = require("request");
const multerConfig = require("../configs/multer");
const multer = require("multer");
const upload = multer(multerConfig.config).single(multerConfig.keyUpload);

/**
 * @swagger
 * /washing_machines/getwashingmachine:
 *   get:
 *     summary: Return all washing machines   ** role = admin || customer
 *     tags: [Washing Machine]
 *     responses:
 *       200:
 *         description: The list of the Washing Machine All
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Machine-MachineAllResponse'
 *       404:
 *         description: Data not found.
 *       401:
 *         description: Un Authenticated
 *     security: [{ bearerAuth: [] }]
 */
exports.getWashingMachineAll = async (req, res) => {
  const result = await washingService.servGetWashingMachineAll();
  if (result != "") {
    res.status(200).json(result);
  } else {
    res.status(404).json({ msg: "ไม่พบข้อมูล" });
  }
};

/**
 * @swagger
 * /washing_machines/getwashingmachine/{id}:
 *   get:
 *     summary: Choose to use a washing machine according to ID.  ** role = customer
 *     tags: [Washing Machine]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The Washing Machine ID
 *     responses:
 *       200:
 *         description: Use Washing Machine By ID
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Machine-UseMachineResponse'
 *       402:
 *         description: Payment Required
 *       404:
 *         description: Data not found.
 *       405:
 *         description: You do not have access to this page.
 *       401:
 *         description: Un Authenticated
 *     security: [{ bearerAuth: [] }]
 */
exports.getWashingMachineNumber = async (req, res) => {
  if (req.role === "customer") {
    const id = req.params.id;
    const result = await washingService.servGetWashingMachineNumber(id);
    if (result != "") {
      const status = result[0]["w_status"];
      const price = result[0]["w_price"];
      const w_id = result[0]["w_id"];
      const w_type = result[0]["w_type"];
      let timer = result[0]["w_timer"];
      let timerMillisecound = timer * 60000;
      let notify = timerMillisecound - 60000;
      if (status == 1) {
        res.status(423).json({
          msg: `เครื่องซักผ้าเครื่องนี้ถูกผู้อื่นใช้งานอยู่ กรุณาใช้เครื่องอื่น`,
        });
      } else {
        const result1 = await customerService.servCustomerByUsername(
          req.c_username
        );
        const coin = result1[0]["c_coin"];
        const c_name = result1[0]["c_name"];
        if (coin >= price) {
          const coinUpdate = coin - price;
          await washingService.servUpdateWashingMachine(id);
          await customerService.servUpdateCustomerByUsername(
            req.c_username,
            coinUpdate
          );
          res
            .status(200)
            .json({ msg: `กำลังดำเนินการ${w_type}เสื้อผ้าของคุณ` });
          await historyService.servAddHistoryWashing(
            req.c_name,
            req.c_username,
            w_id,
            w_type,
            price,
            timer
          );
          setTimeout(() => {
            const msg = `เรียนคุณ ${c_name}\r\nเสื้อผ้าของคุณได้ทำการการ ${w_type} เสร็จเรียบร้อยแล้ว\r\nสามารถมารับเสื้อผ้าได้เลยนะคะ`;
            request({
              uri: "https://notify-api.line.me/api/notify",
              method: "POST",
              auth: {
                bearer: process.env.LINE_TOKEN,
              },
              form: {
                message: msg,
              },
            });
          }, notify);
          setTimeout(() => {
            washingService.servUpdateWashingMachine2(id);
          }, timerMillisecound);
        } else {
          res.status(402).json({
            msg: "ยอดเงินของคุณไม่เพียงพอ กรุณาเติมเงินก่อนใช้บริการ",
          });
        }
      }
    } else {
      res.status(404).json({ msg: "กรุณาระบุหมายเลขเครื่องให้ถูกต้อง" });
    }
  } else {
    res.status(405).json({ msg: "คุณไม่มีสิทธิเข้าถึงหน้านี้" });
  }
};

/**
 * @swagger
 * /washing_machines/register:
 *   post:
 *     summary: Create new Washing Machine  ** role = admin
 *     tags: [Washing Machine]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Machine-RegisterRequest'
 *     responses:
 *       201:
 *         description: The Washing Machine was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Machine-RegisterResponse'
 *       423:
 *         description: Locked.
 *       405:
 *         description: You do not have access to this page.
 *       401:
 *         description: Un Authenticated
 *     security: [{ bearerAuth: [] }]
 */
exports.addWashingMachine = async (req, res) => {
  if (req.role === "admin") {
    upload(req, res, async (error) => {
      if (error) {
        console.log(`error: ${JSON.stringify(error)}`);
        return res
          .status(200)
          .json({ msg: `err :${error.message}`, Status: false });
      }
      const w_id = req.body.w_id;
      const result = await washingService.servByMachineID(w_id);
      if (result != "") {
        const numberMachine = result[0]["w_id"];
        res.status(423).json({
          msg: `เครื่องซักผ้าหมายเลข ${numberMachine} มีอยู่ในระบบอยู่แล้ว`,
        });
      } else {
        await washingService.servAddWashingMachine(req.body, req.file);
        res.status(200).json({ msg: "เพิ่มข้อมูลเครื่องซักผ้าเรียบร้อยแล้ว" });
      }
    });
  } else {
    res.status(405).json({ msg: "คุณไม่มีสิทธิเข้าถึงหน้านี้" });
  }
};

/**
 * @swagger
 * tags:
 *   name: Washing Machine
 *   description: Washing Machine management API
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Machine-RegisterRequest:
 *       type: object
 *       required:
 *         - w_id
 *         - w_brand
 *         - w_type
 *         - w_capacity
 *         - w_price
 *         - w_timer
 *       properties:
 *         w_id:
 *           type: string
 *           description: Washing Machine ID
 *         w_brand:
 *           type: string
 *           description: Washing Machine Brand
 *         w_type:
 *           type: string
 *           description: Washing Machine Type
 *         w_capacity:
 *           type: string
 *           description: Washing Machine Capacity
 *         w_price:
 *           type: number
 *           description: Washing Machine Price
 *         w_timer:
 *           type: number
 *           description: Washing Machine Type
 *         w_image:
 *           type: array
 *           items:
 *              type: string
 *              format: binary
 *           description: Washing Machine Image
 *     Machine-RegisterResponse:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Create Washing Machine successfully
 * 
 * 
 * 
 *     Machine-UseMachineResponse:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Use Washing Machine succeed
 * 
 * 
 * 
 *     Machine-MachineAllResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         w_id:
 *           type: string
 *           description: Washing Machine ID
 *         w_brand:
 *           type: string
 *           description: Washing Machine Brand
 *         w_type:
 *           type: string
 *           description: Washing Machine Type
 *         w_capacity:
 *           type: string
 *           description: Washing Machine Capacity
 *         w_price:
 *           type: string
 *           description: Washing Machine Price
 *         w_timer:
 *           type: number
 *           description: Washing Machine Timer
 *         w_image:
 *           type: string
 *           description: Washing Machine Image
 *         w_status:
 *           type: number
 *           description: Washing Machine Status
 */