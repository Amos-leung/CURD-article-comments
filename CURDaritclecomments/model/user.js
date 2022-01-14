var db = require('./db');

var userSchema = db.Schema({
    username: {type:String},
    uid: {type:Number}
});

var userModel = db.model('user',userSchema,'user');

module.exports = userModel;