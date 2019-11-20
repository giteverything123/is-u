const dbUser = require('../db/models/user');
const mongoose  = require('mongoose');
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
	},
	register: async (ctx,next) => { //注册
		let {username,password} = ctx.request.body;
		let result =  await dbUser.find({username});
		if(result.length > 0){
			ctx.response.body = {
				success: false,
				msg: '该用户名已被注册'
			}
		} else {
			let newUser = new dbUser({username:username,pwd:password});
			try {
				await newUser.save();
				ctx.response.body = {success:true}
			} catch(e) {
				ctx.response.body = {success: false}
			}
		}
	}
}
