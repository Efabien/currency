	var redis=require('redis');
	var client=redis.createClient();

	client.on('connect', function() {
			console.log('connected to redis');
	});
	client.on('error',function(err){
		console.log('redis error '+err);
	});
exports.client=client;