//连接数据库

var mongoose=require('mongoose');
var config=require('../config/config');


mongoose.connect(config.dbUrl,(err)=>{
        if(err){

            console.log(err);
            return;
        }
        console.log('Database Connacted!')
});

module.exports=mongoose;
