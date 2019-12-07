const path = require('path');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2');
const static = require('koa-static');
const mongoose = require('mongoose');
const appConfig = require('../config');
async function connect () {	
  let url = appConfig.env === 'dev' ? 'mongodb://localhost:27017/is-u' : 'mongodb://122.51.232.127:27017/is-u'
  await mongoose.connect(url,{ useNewUrlParser: true ,useUnifiedTopology: true });
}

async function close () {
	await mongoose.connection.close();
}

module.exports = (app) => {
	app.use(bodyParser());
	app.use(static(path.join(__dirname,'../static'),{
		maxage: 60 * 1000 * 10080 //缓存7天
	}));
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