var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");
var intervalID=null;
var length = document.getElementById("length");
var angle = document.getElementById("angle");
var angleInc = document.getElementById("angle-inc");
var angleDiv = document.getElementById("angle-divider");
var moveDepth = document.getElementById("move-depth");
var thickness = document.getElementById("thickness");
var reduction = document.getElementById("reduction");
var color = document.getElementById("color");
var bgColor = document.getElementById("bg-color");
var minLength = document.getElementById("min-length");
	

function drawTree(x, y, angle, angleInc, length, moveDepth, minLength, angleDiv, reduction) {
	//console.log(arguments);
	if (length >= minLength) {
	  var ex = x+length*Math.cos(angle);
	  var ey = y+length*Math.sin(angle);
	  if (length < moveDepth){ angle += angleInc; }
	  ctx.beginPath();
	  ctx.moveTo(x,y);
	  ctx.lineTo(ex,ey);
	  ctx.stroke();
	  drawTree(ex, ey, angle-Math.PI/angleDiv, angleInc, length-reduction, moveDepth, minLength, angleDiv, reduction*1.1);
	  //drawTree(ex, ey, angle-Math.PI/angleDiv-angleInc, angleInc, length-reduction, moveDepth, minLength, angleDiv, reduction*1.1);
	  drawTree(ex, ey, angle+Math.PI/angleDiv, angleInc, length-reduction, moveDepth, minLength, angleDiv, reduction*1.1);
	}
}

function fillBG(color) {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.closePath();
}

function sliderChange() {
	fillBG("#FFFFFF");
	ctx.lineWidth = parseInt(thickness.value);
	ctx.strokeStyle=color.value;
	fillBG(bgColor.value);
	var xVal=parseInt(canvas.width/2);
	var yVal=parseInt(canvas.height*.8);
	drawTree(xVal, yVal, parseFloat(angle.value), parseFloat(angleInc.value), parseInt(length.value), parseInt(moveDepth.value),
			parseInt(minLength.value), parseFloat(angleDiv.value), parseInt(reduction.value));
}

function animateFractal() {
  if (intervalID!=null){
    clearInterval(intervalID);
    intervalID=null;
  }
  else {
	var dir = "up";
    intervalID = setInterval(function(){
	  var val = parseInt(angleInc.value);
      if (dir == "up") {
		angleInc.stepUp();
	  } else {
		angleInc.stepDown();
	  }
      if (val >= 30){
		dir = "down";
      }  else if (val <= -30) {
		dir = "up";
	  }
      sliderChange();
    },20)
  }
}
