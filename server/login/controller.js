const httpStatus = require("http-status");
const db = require('../utils/databaseUtils');
const fs = require('fs/promises');
const path = require('path');

module.exports.LOGIN = async (req, res, next) => {
   try {
      const rows = await db.executeProcedure("PKG_TAIKHOAN.P_DANGNHAP", "s", {
         "v_TAIKHOAN": req.body.username,
         "v_MATKHAU": req.body.password
      })
      console.log(rows);
      if (rows.length === 0 || rows === undefined)
         res.json(httpStatus[`${httpStatus.NOT_FOUND}_MESSAGE`])
      if (Object.keys(rows[0]).includes("RESULT")) {
         res.json({
            type: "fail",
            message: rows[0].RESULT
         })
      }
      else {
         res.json({
            type: 'success',
            message: "Login successfully !"
         })
      }
      next();
   } catch (error) {
      console.log(error);
   }
}

module.exports.GETALLUSER = async (req, res, next) => {
   try {
      const rows = await db.executeProcedure("PKG_TAIKHOAN.Get_AllNguoiDung", "s");
      if (!rows || rows.length === 0)
         res.json(httpStatus[`${httpStatus.NOT_FOUND}_MESSAGE`])
      else {
         //rows
         res.status(httpStatus.OK).json(rows);
      }
      next();
   } catch (error) {
      console.log(error);
   }
}

module.exports.GETBACKGROUND = async (req, res, next) => {
   try {
      const folderPath = path.resolve(__dirname + '../../public/images/login');
      const readPath = await fs.readdir(folderPath);
      const decoding = readPath.map(async fname => {
         const ext = path.extname(fname).replace(".", "image/")
            , filePath = path.join(folderPath, fname);
         const reading = fs.readFile(filePath, { encoding: 'base64' })
         const decodedFile = await reading;
         return `data:${ext};base64,${decodedFile}`;
      })
      Promise.all(decoding)
         .then(o => res.send(o))
         .catch(r => console.log(r))
   } catch (error) {
      console.log(error)
   }
}