var timer = {

	body: document.body,
	div: "",
	divForm: "",
	form: "",
	par: "",

	butSplit: "",
	butReset: "",
	butStart: "",

	beginTime: "",
	startDate: "",
	dispText: "",

	starter: 0,
	oldTime: 0,
	countTimeLine: 1,
	reset: 0,

	createDiv:function () {		
		this.div = document.createElement( 'div');
		this.body.appendChild( this.div );
		this.div.className = 'wrapper';	
	},

	createDivForm:function () {		
		this.divForm = document.createElement( 'div');
		this.form.appendChild( this.divForm );
		this.divForm.className = 'divForm';	
	},

	createForm:function () {
		this.form = document.createElement( 'form');
		this.form.className = "form";
		this.div.appendChild( this.form );
		this.form.action = '#';
	},

	createPar: function  () {
		this.par = document.createElement( 'p' );
		this.form.appendChild( this.par );
		this.par.className = "clock";
		this.par.innerHTML = "00:00:00.000";
	},

	createTimeLine: function  ( name, value ) {
		var timeLine = document.createElement( 'p' );
		this.divForm.insertBefore( timeLine, this.divForm.firstChild );
		/*divForm.appendChild( timeLine );*/
		timeLine.className = "timeLine";
		var a = this.countTimeLine + ". " + name+ " " + value ;
		this.countTimeLine ++;
		timeLine.innerHTML = a;
	},

	createButton:function ( butLabel ) {
		var button = document.createElement( 'input' );
		button.type = "button";
		button.value = butLabel;
		button.className = "button";
		this.form.appendChild( button );
	},

	calculationTime: function (t) {
		var ms = t % 1000;
		 
		t = Math.floor ( (t-ms)/1000 );
		var s = t % 60;

		t = Math.floor ( (t-s)/60 );
		var m = t % 60; 

		t = Math.floor ( (t-m)/60 );
		var h = t % 60;

		if ( h <  10 ) h = '0' + h;
		if ( m < 10 ) m = '0' + m;
		if ( s < 10 ) s = '0' + s;
		if ( ms < 100 ) ms = '0' + ms;
		if ( ms < 10 ) ms = '0' + ms;
		var w = h + ':' + m + ':' + s + '.' + ms;
		return w ;

	},

	startTime: function (startTime) { 
 	if (timer.reset == 0){
		var realDate = new Date();
		this.beginTime = realDate.getTime() - timer.startDate.getTime();
		var t = this.beginTime + startTime;

		this.dispText = this.calculationTime( t );
		
			if ( timer.starter == 1 ) {
		
					this.par.innerHTML = this.dispText;
					setTimeout( "timer.startTime(timer.oldTime)", 20 );
		
					} else {
		
					timer.oldTime = t;
					return;
					}
		}else{
			return;
		}

	},
 

	startStop: function () {
		 timer.butStart = this.form.querySelector( 'input' );
		 timer.butStart.addEventListener( 'click', start );

		function start () { 
				timer.reset = 0;
			if ( timer.starter==0 ){
				timer.butStart.value = "STOP";
				timer.starter=1;

				timer.startDate = new Date();
				timer.startTime( timer.oldTime );
			}else{
				timer.butStart.value = "START";
				timer.starter=0;

				var dispText2 = timer.calculationTime( timer.beginTime );
				timer.createTimeLine( "Stop", dispText2 );
				}
		};
  
	},


	resetAll: function () {
   
		timer.butReset = this.form.querySelectorAll( 'input' );
 		timer.butReset[2].addEventListener( 'click', reset );

			function reset () {
				timer.reset = 1; 
				timer.starter = 0;
				timer.countTimeLine = 1;
				timer.form.removeChild( timer.divForm );
				timer.butStart.value = "START"
				timer.createDivForm();
				var resetText= "00:00:00.000";
				timer.par.innerHTML = resetText;
				timer.oldTime = 0;

			}

	},
	split: function () {

		timer.butSplit = this.form.querySelectorAll( 'input' );
 		timer.butSplit [1].addEventListener( 'click', sp );

			function sp () {
			if ( timer.starter == 1 ) { 
				timer.createTimeLine( "Split", timer.dispText );
				}
			}
	},


run:function  () {
	this.createDiv();
	this.createForm();
	this.createPar();
	this.createButton( "START" );
	this.createButton( "SPLIT" );
	this.createButton( "RESET" );
	this.createDivForm();
	this.resetAll();
	this.split();
	this.startStop();
	},


}


timer.run()