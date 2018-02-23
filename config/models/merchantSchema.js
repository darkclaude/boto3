
var merchantdb = require('mongoose');
var Schema = merchantdb.Schema;
var userSchema = merchantdb.Schema({
        name: String,
        phonenumber: String,
        provider: String,
        email: {type:String, default: "none" },
        activated: Boolean
        
        

});


var Data = merchantdb.model('Merchant', userSchema);
//var Token = mongoose.model('Token', tokenSchema);
var Models = {Data: Data};

module.exports = Models;
