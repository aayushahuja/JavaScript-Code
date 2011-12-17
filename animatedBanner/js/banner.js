	//no of circles
	var number=35;	
	var widthBanner = 1000;
	var heightBanner = 100;
	//Raphael Object
	var paper= Raphael('banner',0,widthBanner, 800, 200);
	//Styles for circles and line joining their center
	var filler = {
		fill:'gray',
		opacity:'0.1'
		};
	var filler2 = {
		fill:'black',
		opacity:'0.3'
		};
			
	//2-D array containing the line objects between any 2 circles
	var lines = new Array(number);
	for (var i = 0; i < number; i++) {
    	lines[i] = new Array(number);
		for(var j=0;j<number;j++){
			lines[i][j] =null;
		}
	  }
	//circle object
	var x,y,velX,velY,colour;
	function ball(a,b,c,d,e){
		this.x=a;
		this.y=b;
		this.velX=c;
		this.velY=d;
		this.colour=e;
		}
	var a=false;
	
	//initialising objects
	var arrShape=new Array();
	var arrPos=new Array();
	var colours=new Array();
	colours[0]='yellow';
	colours[1]='black';	
	colours[2]='green';	
	colours[3]='blue';	
	var iniX,iniY,iniAng,radius,rad;
	var temp1=0;
	for(var i=0;i<number;i++){
		iniX=Math.random()*widthBanner*1.5;
		iniY=Math.random()*heightBanner;
		radius=((Math.random()*4440)%100)%50;
		if(radius<20){radius=radius+35;}
		iniAng=(Math.random()*10000)%360;
		arrShape[i]=paper.circle(iniX,iniY,radius);
		arrShape[i].attr(filler);
		arrShape[i].attr("fill",colours[temp1]);
		//arrShape[i].glow({width:1.3,opacity:.1});
		temp1=(temp1+1)%4;
		rad=iniAng*(Math.PI/180);
		arrPos[i]=new ball(iniX,iniY,Math.cos(rad)*.55,Math.sin(rad)*.55,colours[temp1]);
		if(temp1==0){//arrShape[i].node.class="colour1"; 
		arrShape[i].node.setAttribute('class', 'colour1');}
		if(temp1==1){//arrShape[i].node.class="colour2";
		arrShape[i].node.setAttribute('class', 'colour2');}
		if(temp1==2){//arrShape[i].node.class="colour3";
		arrShape[i].node.setAttribute('class', 'colour3');}		
		if(temp1==3){//arrShape[i].node.class="colour4";
		arrShape[i].node.setAttribute('class', 'colour4');}		
		}
		
		//mouse functionality
		$(".colour1").mouseover(function(){
			
			for(var i=0;i<number;i++){
				if(arrShape[i].node.class=="colour1"){
					arrShape[i].attr("opacity",.8);
					}
			}
			
			});
		$(".colour2").mouseover(function(){
			
			for(var i=0;i<number;i++){
				if(arrShape[i].node.class=="colour2"){
					arrShape[i].attr("opacity",.8);
					}
			}
			
			});	
		$(".colour3").mouseover(function(){
			
			for(var i=0;i<number;i++){
				if(arrShape[i].node.class=="colour3"){
					arrShape[i].attr("opacity",.9);
					}
			}
			
			});			
		$(".colour4").mouseover(function(){
			
			for(var i=0;i<number;i++){
				if(arrShape[i].node.class=="colour4"){
					arrShape[i].attr("opacity",.8);
					}
			}
			
			});			
		
	//delay
	var delay=50;	
	var time ;
	
	function distance(x1,y1,x2,y2){
		return Math.sqrt(((x2-x1)*(x2-x1))+((y2-y1)*(y2-y1)));
		}
		
	var closeness=50;	
	var ij=0;
	
	//main animation function that calls itself
	function animate(){
		
		for(var i=0;i<number;i++){	
			var a=arrPos[i].x;
			var b=arrPos[i].y;
			//bouncing condition
			if(arrPos[i].x<=0 || arrPos[i].x>=widthBanner){arrPos[i].velX=(-1*arrPos[i].velX);}
			if(arrPos[i].y<=0 || arrPos[i].y>=heightBanner){arrPos[i].velY=(-1*arrPos[i].velY);}
			
			//line joining the center code
			if(ij%40==0){
			for(var ii=0;ii<number;ii++){
				for(var j=ii+1;j<number;j++){
					var c=arrPos[j].x;
					var d=arrPos[j].y;
					if((Math.abs(arrPos[ii].x - arrPos[j].x) <= closeness) && (Math.abs(arrPos[ii].y - arrPos[j].y) <= closeness)) {
						if(lines[ii][j]!=null){
								lines[ii][j].attr("path","M" + arrPos[ii].x + " " + arrPos[ii].y + " L" + arrPos[j].x + " " + arrPos[j].y);	
								lines[ii][j].attr(filler2);
							}
							
						else{
							lines[ii][j] =paper.path("M" + arrPos[ii].x + " " + arrPos[ii].y + " L" + arrPos[j].x + " " + arrPos[j].y);	
							lines[ii][j].attr(filler2);
							}
					}
					else{
					if(lines[ii][j]!=null){
								lines[ii][j].attr("path","M" + "0" + " " + "0" + " L" + "0" + " " + "0");	
							}
					}
				}
			}}
			ij++;
			//updating positions
			arrPos[i].x=arrPos[i].x+arrPos[i].velX;
			arrPos[i].y=arrPos[i].y+arrPos[i].velY;
			
			arrShape[i].attr("cx",arrPos[i].x);
			arrShape[i].attr("cy",arrPos[i].y);			
//			arrShape[i].glow({width:1.3,opacity:.1});			
			
		}
		
		
		time=setTimeout("animate()", delay);
	}
	
	//entry point
	$(document).ready(function(){
		animate();	
	});
	
