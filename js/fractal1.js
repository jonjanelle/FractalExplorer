var strokeColor=[0,255,0,1];
var intervalID=null;
var c = document.getElementById("main-canvas");
var speed = document.getElementById("anim-speed");
var length = document.getElementById("length");
var anglediv = document.getElementById("anglediv");
var branches = document.getElementById("branch_count").value;

var startColor = String(document.getElementById("start-color").value);
var stopColor = String(document.getElementById("stop-color").value);
drawFractal1();



//Set background and drawing colors to values
//specified by color picker inputs
function setColors()
{
  startColor = document.getElementById("start-color").value;
  stopColor = document.getElementById("stop-color").value;
}

//Linear interpolation of colors to form gradient
function gradientMove(p) {
  var cStart=hexToRgb(startColor);
  var cEnd=hexToRgb(stopColor);

  var newR=parseInt(cStart.r*p+cEnd.r*(1-p));
  var newG=parseInt(cStart.g*p+cEnd.g*(1-p));
  var newB=parseInt(cStart.b*p+cEnd.b*(1-p));

  strokeColor[0]=newR;
  strokeColor[1]=newG;
  strokeColor[2]=newB;
}

/**
 * Recursively draw a tree
 */
function drawTree(ctx, x, y, length, angle, div,ox,oy,anglediv, gradPct) {

  if (length > 10) {
    ex = x + length*Math.cos(angle);
    ey = y + length*Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(ex,ey);
    gradPct = (gradPct + 0.15)%1.0;
    gradientMove(gradPct);
    ctx.strokeStyle="rgba("+strokeColor[0]+","+strokeColor[1]+","+strokeColor[2]+",1)";
    ctx.stroke();
    angle-=anglediv; //delta angle slider and new param needed
    drawTree(ctx, ex, ey, length-5, angle+Math.PI/div,div,x,y,anglediv,gradPct);
    ex = ox;
    ey = oy;
    drawTree(ctx, ex, ey, length-5, angle-Math.PI/div,div,x,y,anglediv,gradPct);
  }
}

/**
 *
 *
 */
function drawFractal1() {
	anglediv.step=speed.value;
	var ctx = c.getContext("2d");
	ctx.lineWidth="1";
	var branches=document.getElementById("branch_count").value;
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, c.width, c.height);
	ctx.closePath();
	var xval=c.width/2;
	var yval=c.height/2;
	for (var i = 0; i < branches; i++){
		drawTree(ctx, xval, yval, length.value, Math.PI/2.0+2*i*Math.PI/branches, anglediv.value, xval, yval, anglediv.value, 0);
	}
}

/**
 *
 *
 */
function animateFractal() {
  if (intervalID!=null){
    clearInterval(intervalID);
    intervalID=null;
  }
  else {
    var angle = document.getElementById("anglediv");
    intervalID = setInterval(function(){
      angle.stepUp();
      if (angle.value >= 49){
        angle.value=0;
      }
      drawFractal1();
    },20)
  }
}


/**
 *  Show/hide the gradient 2 menu on grad2-check toggle
 */
function gradientMenu()
{
  var gradCheck = document.getElementById("grad2-check");
  var grad2Div = document.getElementById('gradient2');

  if (gradCheck.checked==true){
    grad2Div.style.display='block';
  } else {
    grad2Div.style.display='none';
  }
}

/**
 * Set the number of "branches" of the figure to the value
 * indicated by the branch_count number input.
 */
function setBranch(){
  var branches=document.getElementById("branch_count");
  if (branches.value < 1) {
    branches.value = 1;
  }
  else if (branches.value >= 10) {
    branches.value = 10;
  }
  else {
    drawFractal1();
  }
}

/*
 * Separate a hexadecimal RGB color representation into decimal r,g,b components
 * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 */
function hexToRgb(hex) {
  //  alert(hex);
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

//Convert a hex string x00-xFF to a decimal 0 to 255
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

//Convert a decimal-specified rgb color to the equivalent hex string.
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
