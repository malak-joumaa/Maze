// Adding Jquery
let jqueryscript = document. createElement('script');
jqueryscript.src = 'jquery-3.6.0.min.js';
let parentDiv = document.getElementsByTagName('script')[0].parentNode
let js = document.getElementsByTagName('script')[0];
parentDiv.insertBefore(jqueryscript, js);

jqueryscript.onload = function() {
$(document).ready(function(){
    // Variables
    var start = document.getElementById('start');
    var end = document.getElementById('end');
    var lines = Array.from(document.getElementsByClassName("boundary"));
    
    // EventListeners
    start.addEventListener('click', startGame);

    // Functions
    function startGame(){
        console.log("startGame")
        lines.slice(0, -1).forEach(line => {
            line.addEventListener('mouseover',gameLost);
        });
    }
    
    function gameLost(){
        console.log("gameLost");
        for(var i=0; i<lines.length-1; i++){
            lines[i].style.backgroundColor = "red";
        }
    }
});
} 