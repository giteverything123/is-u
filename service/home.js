const dbUser = require('../db/models/user');
module.exports = {
	login: async (ctx,next) => {
		let username = ctx.request.body;
		await dbUser.findOne({'username':'xuwenjun','pwd':'123456'},function(err,doc){
			if (err) {
				console.log(err);
			} else {
				console.log(doc);
				if(doc){
					ctx.response.body = {
						success: true,
						msg: '恭喜你'
					}
				}
			}
		});
		await next();
	}
}
