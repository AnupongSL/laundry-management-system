const historyService = require("../services/history.service");

/**
 * @swagger
 * /history/gethistoryall:
 *   get:
 *     summary: Returns all history  ** role = admin
 *     tags: [History]
 *     responses:
 *       200:
 *         description: The list of the Waching History All
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/History-HistoryResponse'
 *       404:
 *         description: Data not found.
 *       405:
 *         description: You do not have access to this page.
 *       401:
 *         description: Un Authenticated
 *     security: [{ bearerAuth: [] }]
 */
exports.getHistoryAll = async (req, res) => {
  if (req.role === "admin") {
    const result = await historyService.servGetHistoryAll();
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
 * /history/gethistorydate:
 *   post:
 *     summary: Returns washing history by date.   ** role = admin
 *     tags: [History]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/History-HistoryByDateRequest'
 *     responses:
 *       200:
 *         description: The list of the Waching History
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/History-HistoryResponse'
 *       404:
 *         description: Data not found.
 *       405:
 *         description: You do not have access to this page.
 *       401:
 *         description: Un Authenticated
 *     security: [{ bearerAuth: [] }]
 */
exports.getHistoryDate = async (req, res) => {
  if (req.role === "admin") {
    const result = await historyService.servGetHistoryDate(req.body.date);
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
 * /history/gethistorybyname:
 *   post:
 *     summary: Returns washing history by Name   ** role = admin
 *     tags: [History]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/History-HistoryByNameRequest'
 *     responses:
 *       200:
 *         description: The list of the Waching History
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/History-HistoryResponse'
 *       404:
 *         description: Data not found.
 *       405:
 *         description: You do not have access to this page.
 *       401:
 *         description: Un Authenticated
 *     security: [{ bearerAuth: [] }]
 */
exports.getHistoryByName = async (req, res) => {
  if (req.role === "admin") {
    const result = await historyService.servHistoryByName(req.body.c_name);
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
 * /history/gethistorybyusername:
 *   get:
 *     summary: Returns washing history by username   ** role = customer
 *     tags: [History]
 *     responses:
 *       200:
 *         description: The list of the Waching History
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/History-HistoryResponse'
 *       404:
 *         description: Data not found.
 *       405:
 *         description: You do not have access to this page.
 *       401:
 *         description: Un Authenticated
 *     security: [{ bearerAuth: [] }]
 */
exports.getHistoryByUsername = async (req, res) => {
  if (req.role === "customer") {
    const result = await historyService.servGetHistoryByUsername(
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
 * /history/gethistoryusernamebydate:
 *   get:
 *     summary: Returns washing history of customer by date.   ** role = customer
 *     tags: [History]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/History-HistoryByDateRequest'
 *     responses:
 *       200:
 *         description: The list of the Waching History All
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/History-HistoryResponse'
 *       404:
 *         description: Data not found.
 *       405:
 *         description: You do not have access to this page.
 *       401:
 *         description: Un Authenticated
 *     security: [{ bearerAuth: [] }]
 */
exports.getHistoryUsernameByDate = async (req, res) => {
  if (req.role === "customer") {
    const result = await historyService.servGetHistoryUsernameByDate(
      req.c_username,
      req.body.date
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
 * tags:
 *   name: History
 *   description: History management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     History-HistoryResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the History
 *         c_name:
 *           type: string
 *           description: History Name Customer
 *         c_username:
 *           type: string
 *           description: History Username Customer
 *         w_id:
 *           type: string
 *           description: History Washing Machine ID
 *         w_type:
 *           type: string
 *           description: History Washing Machine Type
 *         w_price:
 *           type: string
 *           description: History Washing Machine Price
 *         time_start:
 *           type: string
 *           description: History Time start
 *         time_stop:
 *           type: string
 *           description: History Time stop
 *         date:
 *           type: string
 *           description: History Date
 * 
 *     History-HistoryByDateRequest:
 *       required:
 *         - date
 *       properties:
 *         date:
 *           type: string
 *           description: History Date
 * 
 *     History-HistoryByNameRequest:
 *       required:
 *         - c_name
 *       properties:
 *         c_name:
 *           type: string
 *           description: History Name Customer
 */