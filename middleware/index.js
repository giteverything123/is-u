const path = require('path');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2');
const static = require('koa-static');
const mongoose = require('mongoose');
// mongoose.connection.on('open',()=>{
// 	console.log('连接上数据库');
// });
// mongoose.connection.on('close',()=>{
// 	console.log('断开连接数据库');
// });
async function connect () {
  await mongoose.connect('mongodb://122.51.232.127:27017/is-u',{ useNewUrlParser: true ,useUnifiedTopology: true });
}

async function close () {
	await mongoose.connection.close();
}

module.exports = (app) => {
	app.use(bodyParser());
	app.use(static(path.join(__dirname,'../static')));
	app.use(nunjucks({
		ext:'html',
		path:path.join(__dirname,'../views'),
		nunjucksConfig:{
			trimBlocks:true //开启转译，防止xss攻击
		}
	}));
	app.use(async (ctx,next) => {
		await connect();
		await next();
		await close();
	});
}