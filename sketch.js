var turn = 0;
var update = false;
var superfill = false;
var win = 2;
var drawn = 0;
var socket;
var boxes =[];
var playable = -1;
function preload(){
	//fontVector = loadFont("./libraries/Vectorb.ttf");
}
function setup() {
	noCursor();
	frameRate(60);
	createCanvas(windowWidth, windowHeight);
	noStroke();
	fill(0);
	
	for(i = 0; i<3;i++){
		for(j = 0; j<3;j++){
			boxes.push(new parentBox(50+210*j,50+210*i,3*i+j,true));
		}
	}
	
}
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked(){
	if (playable + 1)
		boxes[playable].clicked();
	else
		for(i = 0;i<9;i++)
			boxes[i].clicked();
	if(win !=2){
		for(i = 0;i<9;i++)
			boxes[i].reset();
		win = 2;
		turn = 0;
		drawn = 0;
	}
	if (update){//test for win
		for (i = 0;i<3;i++){
			if (abs(boxes[3*i].winTest()+boxes[3*i+1].winTest()+boxes[3*i+2].winTest())>2)
				win = boxes[3*i].value;
			if (abs(boxes[i].winTest()+boxes[i+3].winTest()+boxes[i+6].winTest())>2)
				win = boxes[i].value;
		}
		if(abs(boxes[0].winTest()+boxes[4].winTest()+boxes[8].winTest())>2)
			win = boxes[0].value;
		if(abs(boxes[2].winTest()+boxes[4].winTest()+boxes[6].winTest())>2)
			win = boxes[2].value;
		if (drawn == 9)
			win = 3;
		update = false;
		
	}
	
}
	
function draw() {
	//console.log(drawn);
	
	
	
	
	
	
	background(255);
	rect(250,50,10,620);
	rect(460,50,10,620);
	rect(50,250,620,10);
	rect(50,460,620,10);	
	if (playable + 1){
		boxes[playable].hover();
		boxes[playable].outlined();
	}
	else 
		for(i = 0;i<9;i++)
			boxes[i].hover();
	for(i = 0;i<9;i++)	
		boxes[i].show();
	if (win == 0){
		textSize(50);
		text('X wins',180,60);
	}
	else if (win == 1){
		textSize(50);
		text('O wins',180,60);
	}
	else if (win == 3){
		textSize(50);
		text('draw',190,60);
	}
	push();
		translate(mouseX,mouseY);
		if (!turn){
			rotate(QUARTER_PI);
			rect(-3,-20,6,40);
			rect(-20,-3,40,6);
			}
		else{
			noFill();
			stroke(0);
			strokeWeight(8);
			ellipse(0,0,30)
			}
	pop();
	
}