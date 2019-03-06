var turn = 0;                   //0 is X, 1 is O, 2 is unplayed
var win = 2;                    //0 is X won, 1 is O won, 3 is tie
var drawn = 0;
var boxes = [];
var playable = -1;

function setup() {              //stuff that needs to run at startup
    noCursor();
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    noStroke();
    fill(0);
    
    for(i = 0; i < 3; i++)
        for(j = 0; j < 3; j++)
            boxes.push(new parentBox(50+210*j, 50+210*i, 3*i+j));
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked(){
    let update = false;         //see if anything changes on mouseclick
    if (playable + 1)
        update = update || boxes[playable].clicked();

    else{
        boxes.forEach(box => {
            box.clicked();
        });
    }
    if(win != 2){
        
        boxes.forEach(box => {
            box.reset();
        });
            
        win = 2;
        turn = 0;
        drawn = 0;
        playable = -1;
    }
    if (update){            //test for win
        win = 3;            //assume the game is drawn

        boxes.forEach(box => {
            if(box.value == 2)
                win = 2;
        });

        for (i = 0; i < 3; i++){
            if (abs(boxes[3*i].winTest() + boxes[3*i+1].winTest() + boxes[3*i+2].winTest()) > 2)
                win = boxes[3*i].value;
            if (abs(boxes[i].winTest() + boxes[i+3].winTest() + boxes[i+6].winTest()) > 2)
                win = boxes[i].value;
        }
        if(abs(boxes[0].winTest() + boxes[4].winTest() + boxes[8].winTest()) > 2)
            win = boxes[0].value;
        if(abs(boxes[2].winTest() + boxes[4].winTest() + boxes[6].winTest()) > 2)
            win = boxes[2].value;
        if (drawn == 9)
            win = 3;
    }
    
}
    
function draw() {

    background(255);

    push();
        translate(360,360);
        if (win == 0 || win == 3){
            fill(0);
            rotate(QUARTER_PI);
            rect(-30,-320,67,640);
            rect(-320,-30,640,67);
        }
        if(win == 1 || win == 3){
            noFill();
            stroke(0);
            strokeWeight(40);
            ellipse(0,0,426)
        }
    pop();

    if(win != 2){
        return 0;
    }

    rect(250,50,10,620);
    rect(460,50,10,620);
    rect(50,250,620,10);
    rect(50,460,620,10);    

    let hovered = false;
    if (playable + 1){
        hovered = boxes[playable].hover();
        boxes[playable].outlined();
    }
    else{
        boxes.forEach(box => {
            hovered = hovered || box.hover();
        });
    }
            

    boxes.forEach(box => {
        box.show();
    })
        
    
    if(!hovered){
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
}