const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads/movies");

// Ensure the directory exists before saving files
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration for movie images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/movies'); // make sure this folder exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, uniqueSuffix); // e.g. 1744862404636.jpg
    }
});

// File filter for movie images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb(new Error("Only image files (jpeg, jpg, png, gif) are allowed"), false);
    }
};

// Multer instance for movie image upload
const uploadMovieImage = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Max size: 5MB
});

module.exports = uploadMovieImage;
