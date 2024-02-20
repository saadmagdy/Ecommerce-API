import multer from "multer";
import apiError from "../utils/apiError.js";

const uploadSingleFile = (folderName, fieldName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // The destination is the `uploads` folder
      cb(null, `uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, uniqueSuffix + "_" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/jpeg")) {
      cb(null, true);
    } else {
      cb(apiError.create("images only", 400), false);
    }
  };

  const upload = multer({ fileFilter, storage: storage });
  return upload.single(fieldName);
};

export default uploadSingleFile;
