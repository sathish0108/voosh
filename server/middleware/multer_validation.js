const multer = require("multer");

// File Upload

function FileNameCheck(file) {
  if (file.mimetype == "image/png") {
    return file.originalname.replace(".png", "@" + Date.now() + ".png");
  }
  if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    return file.originalname.replace(".jpg", "@" + Date.now() + ".jpg");
  }
}
const FileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files");
  },

  filename: function (req, file, cb) {
    cb(null, FileNameCheck(file));
  },
});

const FileUpload = multer({
  limits: {
    fileSize: 9000000,
  },
  fileFilter(req, file, cb) {
    try {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(undefined, true);
      } else {
        cb(undefined, false);
      }
    } catch (e) {
      console.error(e);
    }
  },
  storage: FileStorage,
});

const FileUploadMulter = FileUpload.fields([
  { name: "swatch" },
  { name: "thumbnail" },
  { name: "normal" },
]);

module.exports = { FileUploadMulter };
