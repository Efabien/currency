
var express = require('express');
var bodyParser = require('body-parser')
var controler=require('./my_modules/controler');
var db=require('./my_modules/db.js');
var client=db.client;
var token = process.env.token;
var fb=require('./my_modules/fb')();
fb.init(token,client);
var currency=require('./my_modules/apiCall/currency')
var app = express();
var brain=require('./my_modules/brain/brain');


//setting port
app.set('port', (process.env.PORT || 3000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
	res.send('Hello world from the chabot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === token) {
		res.send(req.query['hub.challenge'])
	}else{
	res.send('Error, wrong token')
	}
})
//givning repsonse
brain.on('pending',function(user){
	if(user.pending.keys==='money'){
		fb.sendText(user.id,'quelle est la devise?',function(){
			console.log('sent');
		})
	}
})
brain.on('greating',function(user){
	var toSend=[
		{text:'hello'},{text:'you'},{text:'you rock'}
	];
	fb.queuMess(user.id,toSend);
})
brain.on('thks',function(user){
  fb.sendText(user.id,'Je vous en pris',function(){
		console.log('sent');
	})
})
brain.on('ask_value',function(user){
	currency.getValue(user.context.last().keys.money.last(),function(value){
		if(value){
		fb.sendText(user.id,'La valeur est de'+value+ ' Ar',function(){
			console.log('sent');
		})}
	})
	
})
//filtering events
controler.on('txt_msg',function(sender,input){
		brain.cognit(sender,input);
	});
controler.on('delivery',function(sender,watermark){
	client.exists('q_'+sender,function(err,repl){
		if(repl===1){
			client.get('q_'+sender,function(err,repl){
				var queu=JSON.parse(repl);
				fb.queuMess(sender,queu);
			})
		}
	})
});
//getting events through the webhook
app.post('/webhook/', function (req, res) {
	controler.listening(req.body.entry[0].messaging);
	
  res.sendStatus(200)	
})
// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
