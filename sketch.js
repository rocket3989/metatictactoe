var turn = 0;
var clicked = false;
var win = 2;
var drawn = 0;
var socket;
var boxes =[];
function preload(){
	//fontVector = loadFont("./libraries/Vectorb.ttf");
}
function setup() {
	frameRate(60);
	createCanvas(windowWidth, windowHeight);
	noStroke();
	fill(0);
	
	for(i = 0; i<3;i++){
		for(j = 0; j<3;j++){
			boxes.push(new xobox(50+210*j,50+210*i,3*i+j));
		}
	}
	
}
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked(){
	for(i = 0;i<9;i++){
		boxes[i].clicked();
	}
	if(win !=2 || (drawn == 9&& !clicked) ){
		for(i = 0;i<9;i++){
			boxes[i].valueSet(2);
		}
		win = 2;
		turn = 0;
		drawn = 0;
	}
	
}
	
function draw() {
	console.log(drawn);
	background(255);
	rect(250,50,10,620);
	rect(460,50,10,620);
	rect(50,250,620,10);
	rect(50,460,620,10);
	for(i = 0;i<9;i++){
		boxes[i].hover();
		boxes[i].show();
	}
	if (clicked){//test for win
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
		clicked = false;
	}
	if (win == 0){
		textSize(50);
		text('X wins',180,60);
	}
	else if (win == 1){
		textSize(50);
		text('O wins',180,60);
	}
	else if (drawn == 9){
		textSize(50);
		text('draw',190,60);
	}
	
}