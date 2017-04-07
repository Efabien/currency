var memory=require('./memory.js');
memory.init();
var user1={
  id:'1',
  context:{
    texts:['hello word'],
    intents:[{
      intent:'greating',
      keyword:'hello'
    }]
  }
}
if(!memory.isConnected(user1.id)){
  memory.addUser(user1);
}
