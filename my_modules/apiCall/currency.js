var request=require('request');
exports.getValue=function(code,callback){
   var url='http://arvalue.6te.net'+'?'+'secrete=xanadu&'+'op=get_value&'+'money='+code;
        request(url,function (error,response,body){
        if(!error && response.statusCode==200){
              
          callback(JSON.parse(body).value);
           
        }
    });  
}