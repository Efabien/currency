//event based way to filter texte messages, postback and quick reply events
var util=require('util')
var events=require('events')
var EventEmitter=events.EventEmitter
var Controler=function(){
 var self=this;
  this.listening=function(input){
    for(var i=0;i<input.length;i++){
      var event=input[i]
      var sender=event.sender.id
      if(event.message && event.message.text){        
       self.emit('txt_msg',sender,event.message.text)  
      }else if(event.postback){
        self.emit('postback',sender,event.postback)//untested
      }else if(event.message && event.message.quick_reply){
        self.emit('quick_reply',sender,event.message.quick_reply)//untested
      }
    }
  }
}
util.inherits(Controler,EventEmitter)
var controler=new Controler()
module.exports=controler