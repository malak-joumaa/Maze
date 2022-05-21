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
    let score = 0;

    // Creating transparent div to detect if the user is cheating
    let transparentDiv = document.createElement('div');
    let parentDiv2 = document.getElementById('boundary1').parentNode
    let st = document.getElementById('boundary1');
    parentDiv2.insertBefore(transparentDiv, st);

    //Adding style to the transparent div
    transparentDiv.setAttribute('id','trans')
    var sheet = document.createElement('style')
    sheet.innerHTML = "#trans {height: 42px; width:42px; position:absolute; bottom:51px; left:-43px} .example{text-align:center;}";
    document.body.appendChild(sheet);

    // EventListeners
    start.addEventListener('click', startGame);
    start.addEventListener('mouseover', gameReset);

    // Functions
    function startGame(){
        transparentDiv.addEventListener('mouseover',cheat)
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
        if(status.innerText!=="You're Cheating!" && status.innerText!=="You Win!" ){
            if(status.innerText!=="You Lose!"){
                for(var i=0; i<lines.length-1; i++){
                    lines[i].classList.add("youlose");
                    lines[i].style.backgroundColor =null;
            }
            status.innerText="You Lose!"
            score-=10
            scoreDiv[0].innerText = score;
            }
        }
    }

    function gameWon(){
        if (!lines[0].classList.contains("youlose") && status.innerText!=="You're Cheating!" && status.innerText!=="You Win!"){
            status.innerText="You Win!"
            score+=5
            scoreDiv[0].innerText = score;
        }
    }

    function gameReset(){
        console.log("Reset");
        if (lines[1].classList.contains("youlose")){
            for(var i=0; i<lines.length-1; i++){
                lines[i].classList.remove("youlose")
                lines[i].style.backgroundColor = '#eeeeee';
            } 
        }
        status.innerText="Begin by moving your mouse over the \"S\"."
    }

    function cheat(){
        if(!lines[0].classList.contains("youlose") && status.innerText!="You Win!")
            status.innerText="You're Cheating!";
    }
});
} 