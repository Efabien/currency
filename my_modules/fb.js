var request=require('request')
var tool=require('./tool')
var fb=function(){
  var self=this;
  var token;
  var client;
  url='https://graph.facebook.com/v2.6/me/messages'//url for send API interaction
  //setting the token for auth
  var _init=function(x,y){
    token=x;
    client=y;
  }
  //sending simple message text,length limited to 320 char
  var _sendText=function(sender,text,callback){
    var messageData={
      text:text
    }
    request({
      url:url,
      qs:{access_token:token},
      method: 'POST',
      json:{
        recipient:{id:sender},
        message:messageData
      }
    },function(error,response,body){
      if(error){
        console.log('Error sending messages: ',error)
      }else if(response.body.error){
        console.log('Error: ',response.body.error)
      }else {
        callback()
      }
    })
  }
  
  //sendind composed response : link,quick response buttons...set data according to docs
  var _composedResponse=function(sender,data,callback){//untested
    request({
      url:url,
      qs:{access_token:token},
      method: 'POST',
      json:{
        recipient:{id:sender},
        message:data
      }
    },function(error,response,body){
      if(error){
        console.log('Error sending messages: ',error)
      }else if(response.body.error){
        console.log('Error: ',response.body.error)
      }else{
        callback();
      }
    });
  }
  var _queuMessages=function(sender,tab){
   _composedResponse(sender,tab[0],function(){
     if(tab.length>1){
     tab.shift();
     var toRec=JSON.stringify(tab);
     client.set('q_'+sender,toRec,function(err){
       if(err){
         console.log(err);
       }
     });
     }else{
       client.del('q_'+sender,function(err,repl){
         if(err){
           console.log(err)
         }else{
           console.log(repl);
         }
       })
     }
   })
 }

  return{
    init:_init,
    sendText:_sendText,
    queuMess:_queuMessages,
    cmpResp:_composedResponse
  }
}
module.exports=fb