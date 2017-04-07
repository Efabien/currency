var request=require('request')
var tool=require('./tool')
var fb=function(){
  var token,
  url='https://graph.facebook.com/v2.6/me/messages'//url for send API interaction
  //setting the token for auth
  var _init=function(x){
    token=x
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
  //sending long message more than 320 char the recursive way by checking the right spot, avoiding to cut words
  var _sendLongText=function(sender,text){//untested
    
    if(text.length<=320){
      _sendText(sender,text,null)
    }else{
      var ref=tool.bkp(text)
      _sendText(sender,text.slice(0,ref),_sendLongText(sender,text.slice(ref,text.length)))
    }
  }
  //sendind composed response : link,quick response buttons...set data according to docs
  var _composedResponse=function(sender,data,callback){//untested
    request({
      url:url,
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
        callback
      }
    });
  }
  return{
    init:_init,
    sendText:_sendText,
    sendLongText:_sendLongText,
    cmpResp:_composedResponse
  }
}
module.exports=fb