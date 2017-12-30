function childBox(posx,posy,index){
	this.posx = posx;
	this.posy = posy;
	this.index = index;
	this.value = 2;
	
	this.valueSet = function(value){
		this.value = value;
	}
	this.winTest = function(){
		if (this.value == 1)
			return 1;
		if (this.value == 0)
			return -1;
		return 0;   
	}
		
	this.show = function(){
		push();
			translate(posx+25,posy+25);
			if (this.value == 0){
				rotate(QUARTER_PI);
				rect(-3,-20,6,40);
				rect(-20,-3,40,6);
				}
			if (this.value == 1){
				noFill();
				stroke(0);
				strokeWeight(8);
				ellipse(0,0,30)
				}
				
			
		pop();
	}
		
			
	
	this.hover = function(){
		if(mouseX>this.posx&&mouseX<this.posx+50&&mouseY>this.posy&&mouseY<this.posy+50&&this.value==2)
			boxes[index].hovered();
	}
	this.clicked = function(click){
		if(mouseX>this.posx&&mouseX<this.posx+50&&mouseY>this.posy&&mouseY<this.posy+50&&this.value==2){
			this.value = turn;
			turn = (turn+1)%2;
			playable = this.index;
			return true;
		}
		return false;
	}
	
}
