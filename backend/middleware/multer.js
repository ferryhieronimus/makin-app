const multer = require("multer");

const storage = multer.diskStorage({});

module.exports = multer({
  storage: storage,
  limits: { fieldSize: 5 * 1024 * 1024 },
});
