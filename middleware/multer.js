const multer = require('multer');
const myStorage = multer.diskStorage({})
function filter(req, file, cb) {
    let mimeType = file.mimetype.split('/')[0];
    if (mimeType !== 'image') {
        req.fileErr = true;
        cb(null, false)
    } else {
        cb(null, true)
    }
}
var upload = multer({
    storage: myStorage,
    fileFilter: filter
});

module.exports = upload;