const sd = require('silly-datetime');

let tools={

    getDate(){  
        var date = sd.format(new Date(), 'YYYY-MM-DD HH:mm')
        return date
}
  
} 

module.exports=tools