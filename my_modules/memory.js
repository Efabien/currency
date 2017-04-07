	var redis=require('redis');
	var client=redis.createClient();

	client.on('connect', function() {
			console.log('connected to redis');
	});
	client.on('error',function(err){
		console.log('redis error '+err);
	});
Array.prototype.last=function(){
	var tab=this;
	return tab[tab.length-1];
}
function Memory(client){
	var self=this;
	this.client=client;
	this.manage=function(sender,callback){
		
		self.client.exists(sender,function(err,reply){
			if(reply===1){
				self.client.get(sender,function(err,reply){
					callback(JSON.parse(reply));
				})
			}else{
				 
				callback({id:sender,context:[]});
				
			}
		})
	}

	this.update=function(user){
		self.client.set(user.id,JSON.stringify(user),function(err,rpl){
			if(!err)console.log(rpl);
		})
	}
	this.del=function(id){
		self.client.del(id,function(err,repl){
			console.log(repl);
		});
			
		
	}
	this.watch=function(id){
		self.client.get(id,function(err,reply){
			console.log(reply);
		})
	}
}
var memory=new Memory(client);
module.exports=memory;









