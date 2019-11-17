let mongoose  = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
	username: {
		type: String
	},
	pwd: {
		type: String
	}
});
let User = mongoose.model('user',userSchema,'user');
module.exports = User;