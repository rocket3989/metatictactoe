function childBox(posx,posy,index){
    this.posx = posx;
    this.posy = posy;
    this.index = index;
    this.value = 2;                //0 is X, 1 is O, 2 is unplayed
    
    this.valueSet = function(value){
        this.value = value;
    }
    this.winTest = function(){      //this function check for wins- so it retruns -1,0,1
        if (this.value == 1)
            return 1;               //if O, return 1
        if (this.value == 0)
            return -1;              //if X, return -1
        return 0;                   //unplayed, return 0
    }

    this.show = function(){
        push();
            translate(posx+25,posy+25);             //move to the center of the box
            if (this.value == 0){                   //draw an X
                rotate(QUARTER_PI);                
                rect(-3,-20,6,40);
                rect(-20,-3,40,6);
                }
            if (this.value == 1){                   //draw an O
                noFill();
                stroke(0);
                strokeWeight(8);
                ellipse(0,0,30)
                }
        pop();
    }
        
            
    
    this.hover = function(){        //this function is called when the parent is hovered over
        if(mouseX > this.posx && mouseX < this.posx + 56 && mouseY > this.posy && mouseY < this.posy + 56 && this.value == 2){ //if it is being hovered / hasnt been played on
            
            if(boxes[index].value != 2){
                boxes.forEach(box => {
                    if(box.value == 2)
                        box.hovered();
                });
            }
            else
                boxes[index].hovered();     //hover over the corresponding box

            push();
                translate(posx+25,posy+25);
                fill(0);

                if (!turn){                 //draw the correct symbol for the turn
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
            return true;
        }
        return false;
    }
    this.clicked = function(click){         //check if the box is clickable
        if(mouseX > this.posx && mouseX < this.posx + 56 && mouseY > this.posy && mouseY < this.posy + 56 && this.value == 2){
            this.value = turn;              //assign it the value of the current turn 
            turn = (turn + 1) % 2;          //increment turn
            playable = this.index;          //assign which box is available to be played in
            return true;                    //was clicked
        }
        return false;                       //not clicked
    }
    
}
