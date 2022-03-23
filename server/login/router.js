const express = require('express');
const router = express.Router();
const loginController = require('./controller');
const cors = require('cors');
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname + '../../.env')})

router.use(cors({
   origin: [`${process.env.CLIENT_URL}`],
   methods: ['get','post', 'put', 'delete']
}))

router.get("/getall", loginController.GETALLUSER);
router.get("/getbackground", loginController.GETBACKGROUND);
router.post("/login", express.json(), loginController.LOGIN);

module.exports = router;