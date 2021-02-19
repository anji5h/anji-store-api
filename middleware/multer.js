const multer = require('multer');

function filter(req, file, cb) {
    let mimeType = file.mimetype.split('/')[0];
    if (mimeType !== 'image') {
        cb(null, false)
    } else {
        cb(null, true)
    }
}
const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: filter
});

module.exports = upload;