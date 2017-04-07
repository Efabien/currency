 //find the left space before the 300th char, take a string as param
var breakingPoint=  function (text){
  var hold=text.split(' ');
  var i=1;
  var count;
  var result=hold[0];
  while(true){
  result+=hold[i]+' ';
  if(result.length>=300){
  count=result.length;
  break;
  }
  i++;    
  }
  return count;
  }

  exports.bkp=breakingPoint;