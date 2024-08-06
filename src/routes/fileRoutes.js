const path = require('path');
const { handle } = require('../utils/index');
const { uploadSingle, uploadBatch, uploadMulter } = require('../controllers/fileController.js');
const multer = require('@koa/multer');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './tmp')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  }),
  // limits: {
  //   fileSize: 2 * 1024 * 1024, // 限制文件大小为 2MB
  // },
  fileFilter: (req, file, cb) => {
    // 只接受以下文件类型
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

function userRoutes(router) {
  router.post('/file/uploadSingle', upload.single('file'), handle(uploadSingle))
  router.post('/file/uploadBatch', upload.array('file', 3), handle(uploadBatch))
  router.post('/file/uploadMulter', upload.fields([
    { name: 'file1', maxCount: 2 },
    { name: 'file2', maxCount: 2 }
  ]), handle(uploadMulter))
}
module.exports = userRoutes