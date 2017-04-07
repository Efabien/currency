var brain=require('./brain');
var input='quelle est la va-leur l\'euro';
brain.on('ask_value',function(key){
  console.log('askvalue');
  console.log(key.money[key.money.length-1]);
});
brain.on('ask_news',function(key){
  console.log('a demander des news sur  '+key.theme);
});
brain.on('greating',function(){
  console.log('bonjour');
})
brain.on('thks',function(){
  console.log('Je vous en prie');
})
