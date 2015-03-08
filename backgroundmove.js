const xscale = 0.025;
const yscale = 0.025;
const xdecscalefast = xscale / 4;
const ydecscalefast = yscale / 4;
const xmax = 7.5;
const ymax = 7.5;
    
var xpos = 0;
var ypos = 0;
var xold = 0;
var yold = 0; 
var xmove = 0;
var ymove = 0;        
var xdec = 0;
var ydec = 0;        
var xdecscale = xscale / 16;
var ydecscale = yscale / 16;

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
    xdecscale = xscale / 4;
    ydecscale = yscale / 4;
    
    calcDec();
}, false);

document.addEventListener('mouseup', function (event) {  
    xdecscale = xscale / 16;
    ydecscale = yscale / 16;
    
    calcDec();
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
        
        if(xmove > 0 )
            xmove -= xdec;
        else if (xmove < 0)
            xmove += xdec;

        if(ymove > 0 )
            ymove -= ydec;
        else if (ymove < 0)
            ymove += ydec;
    }
}