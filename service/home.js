const dbUser = require('../db/models/user');
module.exports = {
	login: async (ctx,next) => {
		let {username,password} = ctx.request.body;
		await dbUser.find({username,pwd:password},function(err,doc){
			if (err) {
				console.log(err);
			} else {
				if(doc.length>0){
					ctx.response.body = {
						success: true,
						msg: '恭喜你'
					}
				} else {
					ctx.response.body = {
						success:false,
						msg:'用户名或密码错误'
					}
				}
			}
		});
		await next();
	}
}
