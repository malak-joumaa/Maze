// Adding Jquery
let jqueryscript = document. createElement('script');
jqueryscript.src = 'jquery-3.6.0.min.js';
let parentDiv = document.getElementsByTagName('script')[0].parentNode
let js = document.getElementsByTagName('script')[0];
parentDiv.insertBefore(jqueryscript, js);

jqueryscript.onload = function() {
$(document).ready(function(){
    // Variables
    let start = document.getElementById('start');
    let end = document.getElementById('end');
    let lines = Array.from(document.getElementsByClassName("boundary"));
    let status = document.getElementById('status');
    let scoreDiv = document.getElementsByClassName("example");
    let score = 0

    // EventListeners
    start.addEventListener('click', startGame);
    start.addEventListener('mouseover', gameReset);

    // Functions
    function startGame(){
        console.log("startGame")
        lines.slice(0, -1).forEach(line => {
            //Lost
            line.addEventListener('mouseover',gameLost);
        });
        score=0  
        scoreDiv[0].innerText = score;
        status.innerText="Begin by moving your mouse over the \"S\"."

        //Won
        end.addEventListener('mouseover',gameWon)
    }
    
    function gameLost(){
        console.log("gameLost");
        if(lines[0].style.backgroundColor !="red"){
            for(var i=0; i<lines.length-1; i++){
                lines[i].style.backgroundColor = "red";
            }
            status.innerText="You Lost!"
            score-=10
            scoreDiv[0].innerText = score;
        }
    }

    function gameWon(){
        if (lines[0].style.backgroundColor !="red"){
            status.innerText="You Win!"
            score+=5
            scoreDiv[0].innerText = score;
        }
    }

    function gameReset(){
        console.log("Reset");
        if (lines[0].style.backgroundColor =="red"){
            for(var i=0; i<lines.length-1; i++){
                lines[i].style.backgroundColor = '#eeeeee';
            } 
        }
        status.innerText="Begin by moving your mouse over the \"S\"."
    }
});
} 