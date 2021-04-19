const { uploadImage } = require('./config/upload.config')
const Express = require('express')
const fs = require('fs')
// application
const app = Express()

app.use('/static/', Express.static('./static/'))

app.post('/upload_image', uploadImage.single('file'), function (req, res) {
	let { path, originalname, destination, size } = req.file
	const MAX_SIZE = 3 * 1024 * 1024 // 3mb
	if (size > MAX_SIZE) {
		fs.unlink(path, function () {})
		return next(new Error('图片过大,请压缩后重试,最大图片3m'))
	}
	const _path = `/${destination}/${originalname}`
	fs.rename(path, 'static/upload/images/' + originalname, function (err) {
		if (err) return console.log(err)
		// 存入数据库
		res.send({
			code: 1,
			msg: '成功',
			url: `${_path}`,
			size
		})
	})
})

app.get('/', function (req, res) {
	res.redirect('/static/upload.html')
})

// 服务监听
const PORT = 3000
app.listen(PORT, () => {
	console.log(`appliction is running at http://127.0.0.1:${PORT}`)
})
