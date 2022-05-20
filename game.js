// Adding Jquery
let jqueryscript = document. createElement('script');
jqueryscript.src = 'jquery-3.6.0.min.js';
let parentDiv = document.getElementsByTagName('script')[0].parentNode
let js = document.getElementsByTagName('script')[0];
parentDiv.insertBefore(jqueryscript, js);