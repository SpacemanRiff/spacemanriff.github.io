/*
    :^) :^) :^) :^) :^) :^) :^) :^) :^) :^) 
    
    all code written by Scott Troutman
        Twitter: http://twitter.com/SpacemanRiff
        Github: http://github.com/SpacemanRiff

    :^) :^) :^) :^) :^) :^) :^) :^) :^) :^) 
*/

const xdefscale = 0.0125;
const ydefscale = 0.0125;
const xdecscalefast = xscale / 4;
const ydecscalefast = yscale / 4;
const xmax = 4; const ymax = 4;

var xscale = xdefscale;
var yscale = xdefscale;    
var xpos = 0; var ypos = 0;
var xold = 0; var yold = 0; 
var xmove = 0; var ymove = 0;        
var xdec = 0; var ydec = 0;        
var xdecscale = xscale / 16;
var ydecscale = yscale / 16;
var isclicked = false;
var isshifted = false;

document.addEventListener('mousemove', function (event){
    if (window.event) event = window.event;  
    var xmouse = event.clientX;
    var ymouse = event.clientY;  
    
    if(xmouse > xold) {
        if(xmove - xscale > -(xmax))
            xmove -= xscale;
        else
            xmove -= xscale / 8;
    } else if(xmouse < xold) { 
        if(xmove + xscale < xmax)
            xmove += xscale;
        else
            xmove += xscale / 8;
    }
    if(ymouse > yold) {
        if(ymove - yscale > -(ymax))
            ymove -= yscale;
        else
            ymove -= yscale / 8;
    }
    else if(ymouse < yold) {
        if(ymove + yscale < ymax)
            ymove += yscale;
        else
            ymove += yscale / 8;
    }
    
    xold = xmouse;
    yold = ymouse;
    
    calcDec();
    
    var header = document.getElementById('header');
}, false);

document.addEventListener('mousedown', function (event) {
    if(!isclicked){
        xdecscale = xscale / 2;
        ydecscale = yscale / 2; 
        isclicked = true;    
        calcDec();
        console.log("down"); 
    }
}, false);

document.addEventListener('mouseup', function (event) {  
    if(isclicked){
        xdecscale = xscale / 16;
        ydecscale = yscale / 16;    
        isclicked = false;        
        calcDec();    
        console.log("up");
    }
}, false);

document.addEventListener('keydown', function (event) {  
    var key = event.keyCode ? event.keyCode : event.which;
    if(key == 16){
        if(!isshifted){
            xscale = xdefscale * 8;
            yscale = ydefscale * 8;    
            isshifted = true; 
            calcDec();
            console.log("down");   
        }
    }
}, false);

document.addEventListener('keyup', function (event) {  
    var key = event.keyCode ? event.keyCode : event.which;
    if(key == 16){
        if(isshifted){
            xscale = xdefscale;
            yscale = ydefscale;    
            isshifted = false;;   
            calcDec(); 
            console.log("up");  
        }
    }
}, false);

setInterval(function() {moveSpace()}, 10);

function calcDec() {
    
    xdec = Math.sqrt((Math.pow(xmove, 2) + Math.pow(ymove, 2)) - Math.pow(ymove, 2)) * xdecscale;
    ydec = Math.sqrt((Math.pow(xmove, 2) + Math.pow(ymove, 2)) - Math.pow(xmove, 2)) * ydecscale;            
}

function moveSpace() {
    if((xmove != 0 || ymove != 0)){
        xpos += xmove;
        ypos += ymove;
        header.style.backgroundPosition = xpos + 'px ' + ypos + "px";
        
        if(xmove > 0 ){
            if(xmove - xdec < 0)
                xmove = 0;
            else
                xmove -= xdec;
        }
        else if (xmove < 0){
            if(xmove + xdec > 0)
                xmove = 0;
            else
                xmove += xdec;
        }
        
        if(ymove > 0 ){
            if(ymove - ydec < 0)
                ymove = 0;
            else
                ymove -= ydec;
        }
        else if (ymove < 0){
            if(ymove + ydec > 0)
                ymove = 0;
            else
                ymove += ydec;
        }
    }
}