var rest = require('restler');
var Client = require('node-rest-client').Client;
var Mobilemoney = function(account,key){
  //this.
this.merchantno=account;
this.authkey = key;
this.rdata ="k";

var rdata="k";
   Mobilemoney.prototype.refund = function(id,amount,reason,full){
    var args = {
      data: { "TransactionId": id,
       "Reason":reason,
    "Amount": amount,
    "Full": full,
    "Description": "Mobile Reversal/~Refund",
    "ClientReference": ""},
     headers: {
             "Host": "api.hubtel.com",
            "Accept": "application/json",
            "Content-Type": "application/json",          
            "Authorization": this.authkey,
            "Cache-Control": "no-cache"
        }
  };
  postData(this.merchantno);
  function postData(merchantno){
   var client = new Client();
  url = "https://api.hubtel.com/v1/merchantaccount/merchants/"+merchantno+"/transactions/refund";
  console.log(url);
  client.post(url, args, function (data, response) {
    //.log(data);     
    console.log(data);
    
     //callback(data);
  });
   }
  }
  Mobilemoney.prototype.charge = function(number,provider,amount,url,callback){
//var rdata;
     var args = {
    data: { "CustomerName": "Customer Name",
  "CustomerMsisdn": number,
  "CustomerEmail": "",
  "Channel": provider,
  "Amount": amount,
  "PrimaryCallbackUrl": url,
  "Description": "Mobile Charge",
  "ClientReference": ""},
   headers: {
   	      "Host": "api.hubtel.com",
          "Accept": "application/json",
          "Content-Type": "application/json",          
          "Authorization": this.authkey,
          "Cache-Control": "no-cache"
      }
};
postData(this.merchantno);
function postData(merchantno){
 var client = new Client();
url = "https://api.hubtel.com/v1/merchantaccount/merchants/"+merchantno+"/receive/mobilemoney";
console.log(url);
client.post(url, args, function (data, response) {
  //.log(data);     
  console.log(data);
   callback(data);
});
}
}

Mobilemoney.prototype.isSuccess = function(res){

if(res.ResponseCode == '0000'){
	return true;
}
else {
	return false;
}

}




  
  Mobilemoney.prototype.say = function(){
	console.log("Hello");
}







}

var Airtime = function(){

	Airtime.prototype.send = function(number,amount,provider,callback){
                 var mapperN = ["AIRTEL",'VODAFONE','MTN','TIGO'];
  var mapperID = ["62006","62002","62001","62003"];
  var idp;
  for(var i =0; i<=3; i++){
    if(provider.toUpperCase()==mapperN[i]){
      idp = mapperID[i];
      break;
    }
  }
var data = {
      network: idp,
      amount: amount,
      phone: number,
      token: "58523f16-c68a-45c8-aba4-f48ec050192b"

  };
    rest.postJson('http://api.smsgh.com/usp/airtime',  data, {headers : { Authorization:"Basic amJia3J4Yms6aW5iZHFweW8=" }}).on('complete', function(result) {
      if (result instanceof Error) {
        console.log('Error:', result.message);
        this.retry(100); // try again after 5 sec
      } else {
              callback(result);
           // console.log(result);

      }
    });
	}


  Airtime.prototype.getBalance= function(callback){
    
var data = {
    
      token: "58523f16-c68a-45c8-aba4-f48ec050192b"

  };

     var args = {
    data:{},

   headers: {
          "Host": "api.smsgh.com",
          "Accept": "application/json",
                
          "Authorization": "Basic amJia3J4Yms6aW5iZHFweW8=" 

      
      }
};
getData(data.token);
function getData(dt){
 var client = new Client();
url = "http://api.smsgh.com/usp/balance/"+dt;
console.log(url);
client.get(url, args, function (data, response) {
  //.log(data);     
  console.log(data);
 var bal= "";
 for(var i =4; i<data.AccountBalance.length; i++){
  bal += data.AccountBalance.charAt(i);
}
 // console.log(response);
   callback(bal);
});
}
}
}





var Sms = function(){ 

Sms.prototype.send = function(header,number,content,callback){

rest.get("https://api.smsgh.com/v3/messages/send?From="+header+"&To="+number+"&Content="+content+"&ClientId=jbbkrxbk&ClientSecret=inbdqpyo&RegisteredDelivery=false").on('complete', function(result) {
  if (result instanceof Error) {
    console.log('Error:', result.message);

    this.retry(100); // try again after 5 sec
  } else {
  
    callback(result);
  }

  
});


}





}
module.exports = {Payment: Mobilemoney, Airtime : Airtime, Sms : Sms};