//http://speckyboy.com/demo/windmill-demo/index.html
require(
    [],
    function () {
            
        console.log("START!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));
        mySVGCanvas.style.backgroundImage = "url('background.jpeg')";

        var counter = 0;    // counts clicks on target object   
        //var maxCount = 3;  // game ends when this number is reached    
        var starttime;      // keeps track of when the game starts  
        //var duratime ;      // computed when the game ends (Date.now() - starttime)
        var person = 3; //initialize the box size
        var diff = 1; //initialize the box speed.

        // Start button with text on top
        var startButton = paper.circle(300, 200, 30);
        var startText = paper.text(300, 200, 'START');
        startButton.attr({
            stroke: "black",
            fill: "yellow"
        });

        // Hide for now, show it only when we are ready
        startButton.hide();
        startText.hide();

        // Return a random integer between m and n inclusive
        var randInt = function( m, n ) {
            var range = n-m+1;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        }

        // unhides the start button
        posX = randInt(0,500);  // get the (random) positions
        posY = randInt(0,300);

        // create the target
        var rect1 = paper.rect(posX,posY,person*30, person*30);
        rect1.attr({
            'fill': "red",
            'stroke': '#3b4449',
            'stroke-width': 10,
            'stroke-linejoin': 'round',
            //'opacity': .75
        });

        // when page is loaded, run this function
        var ready = function(){
            rect1.hide()
            startButton.show();
            startText.show();
             console.log("READY!");
        }

        // Called when the start button is clicked to hide the startButton and begin the game
        var start = function (){
        person = prompt("Please enter level of diffculty(box size) \n 1-most diffcult \n 3-easy", "3"); 
        diff = prompt("Please enter level of diffculty(box speed) \n 3-most diffcult \n 1-easy", "1");  
            gametime = 0;
            console.log("STARTING!!");
            startButton.hide();
            startText.hide();
            rect1.show();

            counter = 0;
            duratime =0;
            //starttime = Date.now();
            //console.log("time = " + starttime);
            moveSquare();
        }

        startButton.node.addEventListener('click', start);


        rect1.click(function()   //to count your clicks
            { counter++
                console.log("your square move count is now " + counter);
             });

        //initialize gametime = 0 so that setTimeout can work later
        var gametime = 0;
        //frames per second (fps) is used to make the game run like a video
        var fps = 60;
        var newX = [];
        var newY = [];

       // run function to generate a new set of newX and newY that is newX[0] to newX[60]
       var step = function(){
        a = 0;
        posX1 = randInt(0,500);  // get the (random) positions
        posY1 = randInt(0,300);
        inteX = posX1-posX;
        inteY = posY1-posY;

        m = diff/fps;

        for (l = 0; l < (fps+1);l ++){

        newX[l] = inteX*(l)*m + posX;
        newY[l] = inteY*(l)*m + posY;
        //modified equation of line equation Y=mX+C
        //m is the step size for the box to move
        }  

        } 

// If the game isn't over, move the square to a new random location
var moveSquare = function(){
var time = 10000
setTimeout(function (){gametime = 1},time); // stop the game after 10 seconds
step();

function bounce_left(){
if(gametime==0){
   
    console.log("starting to move");
    if(a < (fps+1)){
        rect1.attr({
            x: inteX*(a)*m + posX,
            y: inteY*(a)*m + posY
            })
            a++;
            //updates the position of the box by newX and newY.
            //animates the box
    }
    else{
        posX = newX[fps];
        posY = newY[fps]; 
        console.log("stopping");
        step();
        //new position reached, draw a new set of values
    } 
} 
else {
console.log("end"); //game ends
confirm("Your number of clicks " + (counter) + " in " + (time/1000) + " seconds \n " );
clearInterval(myset);
ready(); //restarts the game
return
} 
}

var myset = setInterval(function(){bounce_left()},1000/fps); 
//'1000/fps' controls the smooth movement of the box



        }

       ready(); 

    
    }
);