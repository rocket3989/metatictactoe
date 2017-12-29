function xobox(posx,posy,index){
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
		else if (this.value == 0)
			return -1;
		return 0;
	}
		
	this.show = function(){
		push();
			translate(posx+50,posy+50);
			if (this.value == 0){
				rotate(QUARTER_PI);
				rect(-5,-40,10,80);
				rect(-40,-5,80,10);
				}
			if (this.value == 1){
				ellipse(0,0,75);
				fill(255);
				ellipse(0,0,55);
				fill(0);
				}
		pop();
	}
			
	
	this.hover = function(){
		push();
			fill(150,180,180);
			if(mouseX>this.posx&&mouseX<this.posx+100&&mouseY>this.posy&&mouseY<this.posy+100&&this.value==2)
				rect(posx,posy,100,100);
		pop();
	}
	this.clicked = function(){
		if(mouseX>this.posx&&mouseX<this.posx+100&&mouseY>this.posy&&mouseY<this.posy+100&&this.value==2){
			this.value = turn;
			turn = (turn+1)%2;
			clicked = true;
			drawn++;
		}
	}
	
}
