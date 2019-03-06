function parentBox(posx,posy,index){
    this.played = 0;
    this.posx = posx;
    this.posy = posy;
    this.index = index;
    this.value = 2;       //0 is X, 1 is O, 2 is unplayed, 3 is full
    this.boxchildren = [];

    for(y = 0; y < 3; y++)
        for(x = 0; x < 3; x++)
            this.boxchildren.push(new childBox(posx + 55*x + 20, posy + 55*y + 20, 3*y + x));


    this.reset = function(){            //reset all of the children
        this.boxchildren.forEach(child => {
            child.value = 2;
        });
        this.value = 2;                    //and self
    }

    this.winTest = function(){            //used for scoring the game
        if (this.value == 1)            
            return 1;                    //1 if O

        if (this.value == 0)            //-1 if X
            return -1;

        return 0;   
    }
        
    this.show = function(){
        push();
            
            if (this.value == 2){        //if this box is undecided

                this.boxchildren.forEach(child => {
                    child.show();         //draw the squares inside
                });

                translate(posx,posy);            //and the grid
                fill(107, 147, 147);
                rect(70,20,5,160);
                rect(125,20,5,160);
                rect(20,70,160,5);
                rect(20,125,160,5);
            }
                
            translate(posx + 100, posy + 100);          //move to the center of the box

            if (this.value == 0 || this.value == 3){    //decided X or tie
                rotate(QUARTER_PI);
                rect(-10,-80,20,160);
                rect(-80,-10,160,20);
            }

            if (this.value == 1 || this.value == 3){    //decided O or tie
                noFill();
                stroke(0);
                strokeWeight(20);
                ellipse(0,0,142)
            }
        pop();
    }
        
    this.hovered = function(){                          //if the box is hovered, draw a box behind it
        push();
            fill(197, 197, 251);
            rect(posx, posy, 200, 200);
        pop();
    }

    this.outlined = function(){                         //if this is playable box, draw the outline
        push();
            noFill();
            stroke(255, 150, 0);
            strokeWeight(10);
            rect(posx + 5, posy + 5, 190, 190);
        pop();
    }
    
    this.hover = function(){
        let found  = false;                             //v If this box is being hovered
        if(mouseX > this.posx && mouseX < this.posx + 200 && mouseY > this.posy && mouseY < this.posy + 200 && this.value == 2)
            this.boxchildren.forEach(child => {found  = found || child.hover()});       //find which child is being hovered
        
        return found;                                   //return if a child was found
    }

    this.clicked = function(){
        var click = false;
        if(mouseX > this.posx && mouseX < this.posx + 200 && mouseY > this.posy && mouseY < this.posy + 200 && this.value == 2){

            this.boxchildren.forEach(child => {click = click || child.clicked()});      //if box clicked in, find the clicked child

            if (click){                                         //if child found, evaluate for win
                
                this.value = 3;                                      //assume the box is filled

                this.boxchildren.forEach(child => {
                    if(child.value == 2)
                        this.value = 2;                              //if the box isnt filled
                });

                for (x = 0; x < 3; x++){
                    if (abs(this.boxchildren[3*x].winTest() + this.boxchildren[3*x+1].winTest() + this.boxchildren[3*x+2].winTest()) > 2)
                        this.value = this.boxchildren[3*x].value;           //test for 3 in a row
                    if (abs(this.boxchildren[x].winTest() + this.boxchildren[x+3].winTest() + this.boxchildren[x+6].winTest()) > 2)
                        this.value = this.boxchildren[x].value;              //other axis
                }

                if(abs(this.boxchildren[0].winTest() + this.boxchildren[4].winTest() + this.boxchildren[8].winTest()) > 2)
                    this.value = this.boxchildren[0].value;                 //check diagonals
                if(abs(this.boxchildren[2].winTest() + this.boxchildren[4].winTest() + this.boxchildren[6].winTest()) > 2)
                    this.value = this.boxchildren[2].value;
                
                if (boxes[playable].value != 2)
                    playable = -1;                  //play anywhere

                return true;
            }
            return false;
        }
    }
}
