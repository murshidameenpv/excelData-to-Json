import multer from "multer";

// Multer configuration for file upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Middleware for handling xlsx file upload and parsing
 export const handleXlsxUpload = upload.single("xlsx");