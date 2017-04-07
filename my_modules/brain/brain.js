var strTool=require('./lib/strings');
var util=require('util');
var events=require('events');
var EventEmitter=events.EventEmitter;
var knwlg=require('./knowledge');
var degree=2;//degree of acceptance for misspeling based on the edit distance
var scope=3;//max of items checked for comparaison with the pseudo corpus
var memory=require('../memory');

function Brain(keyWords,intents,scope,degree,memory){
	var self=this;
	self.keyWords=keyWords;
	self.intents=intents;
	self.scope=scope;
	self.degree=degree;
	self.memory=memory
	
	self.feed=function(){
	
		self.intents=strTool.preCompute(self.intents)();
	
	}
	var _depth=function(what){
		var res=0;
		for(var key in self.keyWords[what]){
			self.keyWords[what][key].forEach(function(el){
				res=el.length>res?el.length:res;
			});
		}
		return res;	
	}
	self.extract=function(txt,what){
		
		var preselcted=[];
		var data=txt.replace(/'|-/g,' ').split(' ');
		for(var key in self.keyWords[what]){
			self.keyWords[what][key].forEach(function(element){
				for(var i=1;i<=_depth(what);i++){
					strTool.portionReading(data,i,function(array){
						if(strTool.exactMatch(element,array,self.degree)){
							
							preselcted.push(key);
						}
					});    
				}
			});
		}
		var hold={};
		hold[what]=preselcted;
		return preselcted[0]?hold:undefined;
		
	}
	self.extractAll=function(text){
		var res=[];
		for(var index in self.keyWords){
			res.push(self.extract(text,index));
		}
		return res;
	}
	self.detect=function (input){
		
		var data=input.replace(/'|-/g,' ').split(' ');
		var res=[];
		for(var intent in self.intents){
			
			var candidate={
				intent:intent,
				required:self.intents[intent].required||'none'
			}
					var score=0;
			var texts=self.intents[intent].texts;

			texts.forEach(function(element,index){
				
				for(var i=1;i<=self.scope;i++){

				strTool.portionReading(data,i,function(array){
				strTool.portionReading(element,i,function(proc){
					if(strTool.exactMatch(array,proc,self.degree)){
							
							score=score+(100/(array.length*texts.length));
							
					}	
				})	
					
				});
			}
			});
		candidate.score=score;
		res.push(candidate)	;
		}
		
		return res.sort(function(a,b){
			return a.score>b.score?-1:1;
		});
		
	}
	self.cognit=function(sender,input){
		self.memory.manage(sender,function(user){
			
			if(user.pending){
				var hold=self.extract(input,user.pending.keys);
				if(hold){
				user.context.push({
					intent:user.pending.intent,
					keys:hold
				});
				self.emit(user.pending.intent,user)
				delete user.pending;
				self.memory.update(user);
				
				}
			}
				var det=self.detect(input);
				det.forEach(function(cand){
					if(cand.score>=100){
						if(cand.required!=='none'){
							var keys=self.extract(input,cand.required);
							if(keys===undefined){
								user.pending={
									intent:cand.intent,
									keys:cand.required
								}
								self.memory.update(user);
								self.emit('pending',user);
							}else{
								user.context.push({
									intent:cand.intent,
									keys:keys
								});
								self.memory.update(user);
								self.emit(cand.intent,user);
							}
						}else{
							user.context.push({
									intent:cand.intent
								});
							self.memory.update(user);
							self.emit(cand.intent,user);
						}
					}
				})
			
		})
		
		self.memory.watch(sender);
		
	
	}

}
util.inherits(Brain,EventEmitter);
var brain=new Brain(knwlg.keyWords,knwlg.intents,scope,degree,memory);
brain.feed();

module.exports=brain;