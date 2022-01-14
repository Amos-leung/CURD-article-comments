const { type } = require('express/lib/response');
var db = require('./db');

var articleSchema = db.Schema({
    username: {
        type: String,
        required: true
    }, 
    acontent: { type: String },
    title: {
        type: String,
        required: true 

    },
    add_time: { 
        type: String
    },
    edit_time:{
        type: String
    }
 
}); 

var articleModel = db.model('article', articleSchema, 'article');

module.exports = articleModel;  