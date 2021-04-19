const multer = require('multer')
const IMAGE_PATH = 'static/upload/images'

// upload images
exports.uploadImage = multer({
	dest: IMAGE_PATH
})