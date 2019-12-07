const koa = require('koa');
const path = require('path');
const router = require('./router');
const middleware = require('./middleware');
const app = new koa();
middleware(app);
router(app);
app.listen(3000,() => {
	console.log('服务运行在3000端口上');
});