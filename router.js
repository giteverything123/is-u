const koaRouter = require('koa-router');
const home = require('./controller/login');
const router = new koaRouter();
module.exports = (app) => {
    router
    .get('/login',home.login)
    .get('/register',home.register)
    .post('/toLogin',home.toLogin);
    app.use(router.routes()).use(router.allowedMethods());
}
