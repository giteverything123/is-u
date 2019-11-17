const koa = require('koa');
const static = require('koa-static');
const nunjucks = require('koa-nunjucks-2');
const path = require('path');
const router = require('./router');
const app = new koa();
app.use(static(path.join(__dirname,'static')));
app.use(nunjucks({
	ext:'html',
	path:path.join(__dirname,'views'),
	nunjucksConfig:{
		trimBlocks:true //开启转译，防止xss攻击
	}
}));
router(app);
app.listen(3000,() => {
	console.log('服务运行在3000端口上');
});