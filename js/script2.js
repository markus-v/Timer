 




 function startTime(countTime) { 
 
  var thisDate = new Date();
  var t = thisDate.getTime() - startDate.getTime()+countTime;
  var ms = t%1000; 

  t = Math.floor ((t-ms)/1000);
  var s = t%60;

  t = Math.floor ((t-s)/60);
  var m = t%60; 

  t = Math.floor ((t-m)/60);
  var h = t%60;

  if (h<10) h='0'+h;
  if (m<10) m='0'+m;
  if (s<10) s='0'+s;
  if (ms<100) ms='0'+ms;
	if (ms<10) ms='0'+ms;
	console.log( m, s, ms);
   z= countTime
   setTimeout("startTime(z)",30);
 }
 
function run () {
	startDate = new Date();
	 startTime(1000012);
	};

run()