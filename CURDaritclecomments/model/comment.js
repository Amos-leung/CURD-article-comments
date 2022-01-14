
const articleModel = require('./article');
var db = require('./db');

var commentSchema = db.Schema({
    username:{ 
        type:String,
        // required:true  
        },
    content: {type:String},
    articletitle:{
        type:String,
        // required:true
    },
    add_time: { 
        type: String
    },
    edit_time:{
        type: String
    }
}); 

var commentModel = db.model('comment',commentSchema,'comment');

module.exports = commentModel;