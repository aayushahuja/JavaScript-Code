//number of circles
	var number=35;	
	var widthBanner = 1000;
	var heightBanner = 100;
//Raphael object	
	var paper= Raphael('banner',0,widthBanner, 800, 200);
//Styles for circles and the line joining them	
	var filler = {
		fill:'gray',
		opacity:'0.1'
		};
	var filler2 = {
		fill:'black',
		opacity:'0.4'
		};	
//2D array for lines between any two pair(inefficient now as less than half are used)
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
//initialisation of various things		
	var a=false;
	var arrShape=new Array();
	var arrPos=new Array();
	var colour1 = new Array();
	var numColour1=0,numColour2=0,numColour3=0,numColour4=0;
	var colour2 = new Array();
	var colour3 = new Array();	
	var colour4 = new Array();
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
		if(temp1==0){
		arrShape[i].node.setAttribute('class', 'colour1');
		colour1.push(i);numColour1++;
		}
		if(temp1==1){
		arrShape[i].node.setAttribute('class', 'colour2');
		colour2.push(i);numColour2++
		}
		if(temp1==2){
		arrShape[i].node.setAttribute('class', 'colour3');
		colour3.push(i);numColour3++;
		}		
		if(temp1==3){
		arrShape[i].node.setAttribute('class', 'colour4');
		colour4.push(i);numColour4++;
		}		
		}
		var mouseOverOpacity=.3;
		var time;
	//MOUSE Functionality	
		$(".colour1").mouseover(function(e){
			for(var i=0;i<numColour1;i++){
				if(colour1[i]!=""){
					arrShape[colour1[i]].attr("opacity",mouseOverOpacity);
					arrShape[colour1[i]].attr("cx", arrPos[colour1[i]].x); 
					arrShape[colour1[i]].attr("cy", arrPos[colour1[i]].y);
					}
			}
		clearTimeout(time);	
		});	
		$(".colour1").mouseout(function(){
			for(var i=0;i<numColour1;i++){
				if(colour1[i]!=""){
					arrShape[colour1[i]].attr("opacity",.1);
					}
			}			
		animate();	
		});
		$(".colour2").mouseover(function(e){
			for(var i=0;i<numColour2;i++){
				if(colour2[i]!=""){
					arrShape[colour2[i]].attr("opacity",mouseOverOpacity);
					arrShape[colour2[i]].attr("cx", arrPos[colour2[i]].x); 
					arrShape[colour2[i]].attr("cy", arrPos[colour2[i]].y);
					}
			}
		clearTimeout(time);	
		});	
		$(".colour2").mouseout(function(){
			for(var i=0;i<numColour2;i++){
				if(colour2[i]!=""){
					arrShape[colour2[i]].attr("opacity",.1);
					}
			}			
		animate();	
		});
		$(".colour3").mouseover(function(e){
			for(var i=0;i<numColour3;i++){
				if(colour3[i]!=""){
					arrShape[colour3[i]].attr("opacity",mouseOverOpacity);
					arrShape[colour3[i]].attr("cx", arrPos[colour3[i]].x); 
					arrShape[colour3[i]].attr("cy", arrPos[colour3[i]].y);
					}
			}
		clearTimeout(time);	
		});	
		$(".colour3").mouseout(function(){
			for(var i=0;i<numColour3;i++){
				if(colour3[i]!=""){
					arrShape[colour3[i]].attr("opacity",.1);
					}
			}			
		animate();	
		});
				
		$(".colour4").mouseover(function(e){
			for(var i=0;i<numColour4;i++){
				if(colour4[i]!=""){
					arrShape[colour4[i]].attr("opacity",mouseOverOpacity);
					arrShape[colour4[i]].attr("cx", arrPos[colour4[i]].x);
					arrShape[colour4[i]].attr("cy", arrPos[colour4[i]].y);
					}
			}
		clearTimeout(time);	
		});	
		$(".colour4").mouseout(function(){
			for(var i=0;i<numColour4;i++){
				if(colour4[i]!=""){
					arrShape[colour4[i]].attr("opacity",.1);
					}
			}			
		animate();	
		});
				
	//delay between animation frames
	var delay=50;	
	function distance(x1,y1,x2,y2){
		return Math.sqrt(((x2-x1)*(x2-x1))+((y2-y1)*(y2-y1)));
		}
	var closeness=50;	
	var ij=0;
	//Main Animation function that calls itself
	function animate(){
		for(var i=0;i<number;i++){	
			var a=arrPos[i].x;
			var b=arrPos[i].y;
			
			//Bouncing off the walls condition
			if(arrPos[i].x<=0 || arrPos[i].x>=widthBanner){arrPos[i].velX=(-1*arrPos[i].velX);}
			if(arrPos[i].y<=0 || arrPos[i].y>=heightBanner){arrPos[i].velY=(-1*arrPos[i].velY);}
			if(ij%40==0){
			
			//Lines between circles
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
		//Updating positions	
			arrPos[i].x=arrPos[i].x+arrPos[i].velX;
			arrPos[i].y=arrPos[i].y+arrPos[i].velY;
			arrShape[i].attr("cx",arrPos[i].x);
			arrShape[i].attr("cy",arrPos[i].y);			
//			arrShape[i].glow({width:1.3,opacity:.1});			
			
		}
//		clearTimeout(time)
		time=setTimeout("animate()", delay);
	}
	
	$(document).ready(function(){
		animate();	
	});
	
