//multer se hum files ko mongodb pe upload kar sakte hai
const { GridFsStorage } = require("multer-gridfs-storage");
const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config();

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    const match = ["image/png", "image/jpg", "image/jpeg"];

    if (match.indexOf(file.memeType) === -1) {
      return `${Date.now()}-blog-${file.originalName}`;
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });
module.exports = {upload};
// export default multer({ storage });
