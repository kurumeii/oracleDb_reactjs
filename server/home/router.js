const express = require('express');
const router = express.Router();
const homeController = require('./controller');
const cors = require('cors');
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname + '../../.env')})

router.use(cors({
   origin: [`${process.env.CLIENT_URL}`],
   methods: ['get','post', 'put', 'delete']
}))

router.get("/getimage", homeController.GET_IMAGES);
router.get("/getprofile", homeController.GET_PROFILE);
router.get('/getfavorite', homeController.GET_FAVORITE);

module.exports = router;