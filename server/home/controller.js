const httpStatus = require("http-status");
const path = require('path')
const fs = require('fs/promises');


module.exports.GET_IMAGES = async (req, res, next) => {
   try {
      const findPath = path.resolve(__dirname + '../../public/images/gallery');
      const readPath = await fs.readdir(findPath);
      const decoding = readPath.map(async fname => {
         const ext = path.extname(fname).replace(".", "image/");
         return await fs.readFile(path.join(findPath, fname), { encoding: 'base64' })
         .then(decodedFile => {
            return {
               fileName: fname,
               src: `data:${ext};base64,${decodedFile}`,
            };
         })
         .catch(err => console.log(err))
         
      })
      Promise.all(decoding)
         .then(o => res.json(o))
         .catch(err => console.log(err))
   } catch (error) {
      console.log(error);
   }
}

module.exports.GET_PROFILE = async (req, res, next) => {
   try {
      const findPath = path.resolve(__dirname + '../../public/images/profile');
      const readPath = await fs.readdir(findPath); // return folders
      const decoding = readPath.map(async folderName => {
         const folderPath = path.join(findPath, folderName);
         const readFolder = await fs.readdir(folderPath);
         if (readFolder.find(fname => fname === "my_profile_avatar.jpg")) {
            const filePath = path.join(folderPath, "my_profile_avatar.jpg");
            return await decodingFile("profile_avatar.jpg", filePath);
         }
         if (readFolder.find(fname => fname === "profile-bg2.jpg")) {
            const filePath = path.join(folderPath, "profile-bg2.jpg");
            return await decodingFile("profile-bg.jpg", filePath);
         }
      })

      const decodingFile = async (fileName = "", filePath = "") => {
         const ext = path.extname(fileName).replace(".", "image/");
         return await fs.readFile(filePath, { encoding: 'base64' })
            .then(decodedFile => {
               return {
                  fileName: fileName,
                  src: `data:${ext};base64,${decodedFile}`,
               }
            })
      }

      Promise.all(decoding)
         .then(o => {
            if (!o) {
               return res.status(httpStatus.FORBIDDEN).json(httpStatus[`${httpStatus.FORBIDDEN}_MESSAGE`])
            }
            return res.json({
               bg: o[0],
               image: o[1],
            })
         })
         .catch(err => console.log(err))

   } catch (error) {
      console.log(error);
   }
}

module.exports.GET_FAVORITE = async (req, res, next) => {
   try {
      const findPath = path.resolve(__dirname + '../../public/images/favorite');
      const readPath = await fs.readdir(findPath);
      const decoding = readPath.map(async fname => {
         const ext = path.extname(fname).replace(".", "image/");
         const filePath = path.join(findPath, fname);
         return await fs.readFile(filePath, { encoding: 'base64' })
            .then(decodedFile => {
               return {
                  fileName: fname,
                  src: `data:${ext};base64,${decodedFile}`,
               }
            })
            .catch(err => console.log(err))
      })

      Promise.all(decoding)
         .then(o => res.json(o))
         .catch(r => console.log(r))

   } catch (error) {
      console.log(error);
   }
}
