const serviceHome = require('../service/home');
module.exports = {
	login: async (ctx,next) => {
		await ctx.render('home/login');
	},
	register: async (ctx,next) => {
		await ctx.render('home/register');
	},
	toLogin: async (ctx,next) => {
		await serviceHome.login(ctx,next);
	}
}
