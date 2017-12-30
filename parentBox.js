function parentBox(posx,posy,index){
	this.played = 0;
	this.posx = posx;
	this.posy = posy;
	this.index = index;
	this.value = 2;
	this.boxchildren = [];
	for(y = 0; y<3;y++){
		for(x = 0; x<3;x++)
			this.boxchildren.push(new childBox(posx+55*x+20,posy+55*y+20,3*y+x));
	}
	this.reset = function(){
		for(j = 0;j<9;j++)
			this.boxchildren[j].value = 2;
		this.value = 2;
	}
	this.winTest = function(){
		if (this.value == 1)
			return 1;
		else if (this.value == 0)
			return -1;
		return 0;   
	}
		
	this.show = function(){
		push();
			
			if (this.value == 2){
				for(j = 0;j<9;j++)
					this.boxchildren[j].show();
				translate(posx,posy);
				fill(150,180,180);
				rect(70,20,5,160);
				rect(125,20,5,160);
				rect(20,70,160,5);
				rect(20,125,160,5);
				
				}
				
			translate(posx+100,posy+100);
			if (this.value == 0||this.value == 3){
				rotate(QUARTER_PI);
				rect(-10,-80,20,160);
				rect(-80,-10,160,20);
				}
			if (this.value == 1||this.value == 3){
				noFill();
				stroke(0);
				strokeWeight(20);
				ellipse(0,0,142)
				}
			
		pop();
	}
		
		
	this.hovered = function(){
		push();
			fill(200,100,200);
			rect(posx,posy,200,200);
		pop();
	}		
	this.outlined = function(){
		push();
			noFill();
			stroke(255,150,0);
			strokeWeight(10);
			rect(posx+5,posy+5,190,190);
		pop();
	}
	this.hover = function(){
		push();
			fill(150,180,180);
			if(mouseX>this.posx&&mouseX<this.posx+200&&mouseY>this.posy&&mouseY<this.posy+200&&this.value==2)
				for(j = 0;j<9;j++)
					this.boxchildren[j].hover();
		pop();
		
	}
	this.clicked = function(){
		var click = false;
		if(mouseX>this.posx&&mouseX<this.posx+200&&mouseY>this.posy&&mouseY<this.posy+200&&this.value==2){
			for(j = 0;j<9;j++)
					click = click || this.boxchildren[j].clicked();
			if (click){
				this.played++
				for (x = 0;x<3;x++){
					if (abs(this.boxchildren[3*x].winTest()+this.boxchildren[3*x+1].winTest()+this.boxchildren[3*x+2].winTest())>2)
						this.value = this.boxchildren[3*x].value;
					if (abs(this.boxchildren[x].winTest()+this.boxchildren[x+3].winTest()+this.boxchildren[x+6].winTest())>2)
						this.value = this.boxchildren[x].value;
				}
				if(abs(this.boxchildren[0].winTest()+this.boxchildren[4].winTest()+this.boxchildren[8].winTest())>2)
					this.value = this.boxchildren[0].value;
				if(abs(this.boxchildren[2].winTest()+this.boxchildren[4].winTest()+this.boxchildren[6].winTest())>2)
					this.value = this.boxchildren[2].value;
				if (this.played == 9)
					this.value = 3;
				update = true;
				if (boxes[playable].value != 2)
					playable = -1;
			}
		
		}
		
	}
	
}
