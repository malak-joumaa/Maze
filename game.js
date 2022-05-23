// Adding Jquery
let jqueryscript = document. createElement('script');
jqueryscript.src = 'jquery-3.6.0.min.js';
let parentDiv = document.getElementsByTagName('script')[0].parentNode
let js = document.getElementsByTagName('script')[0];
parentDiv.insertBefore(jqueryscript, js);

jqueryscript.onload = function() {
$(document).ready(function(){
    var bestObj = {
        m:0,
        s:0,
        ms:0,
     }
    var prevObj ={
        m:0,
        s:0,
        ms:0,
    }
    var prevValue ="0:0.0";
    var bestValue ="0:0.0";
    var live = document.getElementById("Live");
    var last = document.getElementById("Last");
    var best = document.getElementById("Best");
    var time = 0;
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
        time = 1
        bestObj=0
        var bestObj = {
            m:0,
            s:0,
            ms:0,
         }
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
        end.addEventListener('mouseover',gameWon);
    }
    
    function gameLost(){
        console.log("gameLost");
        if(status.innerText!=="You're Cheating!" && status.innerText!=="You Win!" ){
            stopT();
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
            stopT();
            
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
        if (time ==1){
            reset();
            startT();
        }
    }

    function cheat(){
        if(!lines[0].classList.contains("youlose") && status.innerText!="You Win!")
            status.innerText="You're Cheating!";
    }


    let [milliseconds,seconds,minutes] = [0,0,0];
    let int = null;

    function startT(){
        if(int!==null){
            clearInterval(int);
        }
        int = setInterval(displayTimer,10);
    }

    function stopT(){
        clearInterval(int);
        console.log(prevValue)
        last.innerHTML = prevValue;
        best.innerHTML =bestValue;
        console.log(bestObj)
    }

    function reset(){
        clearInterval(int);
        [milliseconds,seconds,minutes] = [0,0,0];
        live.innerHTML = ' 0:0.0';
        
    }

    function displayTimer(){
        milliseconds+=10;
        if(milliseconds == 1000){
            milliseconds = 0;
            seconds++;
            if(seconds == 60){
                seconds = 0;
                minutes++;
                if(minutes == 60){
                    minutes = 0;
                }
            }
        }

        let m = minutes < 10 ?+ minutes : minutes;
        let s = seconds < 10 ?+ seconds : seconds;
        let ms = milliseconds < 10 ?+ milliseconds : milliseconds < 100 ? milliseconds : milliseconds;

        live.innerHTML = ` ${m}:${s}.${ms}`;
        prevValue = ` ${m}:${s}.${ms}`;


        prevObj = {
            m:m,
            s:s,
            ms:ms,
        }
        
        if(prevObj.m>bestObj.m){
            bestObj = prevObj;
            bestValue = prevValue;
        }
        else if(prevObj.m==bestObj.m && prevObj.s>bestObj.s){
            bestObj = prevObj;
            bestValue = prevValue;
        }
        else if(prevObj.m==bestObj.m && prevObj.s==bestObj.s&& prevObj.ms>bestObj.ms){
            bestObj = prevObj;
            bestValue = prevValue;
        }
    }
});
} 