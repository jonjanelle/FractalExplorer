class Rectangle {
  constructor(height, width, x, y) {
    this.height = height;
    this.width = width;
	this.x = x;
	this.y = y;
  }
  draw(ctx) {
	ctx.moveTo(this.x, this.y);
	ctx.lineTo(this.x+this.width, this.y);
	ctx.lineTo(this.x+this.width, this.y+this.height);
	ctx.lineTo(this.x, this.y+this.height);
	ctx.lineTo(this.x, this.y);
	ctx.stroke();
  }
}

function d2r(deg) {
	return deg*Math.PI/180.0;
}

/*
  Get a random integer between a and b
*/
function randInt(a, b) {
	if (a >= b) { return null; }
	return Math.floor(Math.random()*(b-a+1)) + a;
}

//get a random element from an array
function randElement(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}

class LineCluster {
	constructor(x, y, minLength, maxLength, color) {
		this.x = x;
		this.y = y;
		this.minLength = minLength;
		this.maxLength = maxLength;
		this.color = color;
	}
	
	/*
		ctx: canvas 2d context 
		startAngle: beginning direction in degrees 
		range: number of degrees to pass through
		direction: "cw" or "ccw"
		
		Changes the strokeStyle of ctx 
	*/
	draw(ctx, startAngle, range, direction) {
		for (var n = 0; n < 1; n++) {
			var angle = startAngle;
			var startX = this.x;
			var startY = this.y;
			var nLines = Math.floor(range/randInt(20, 50));
			ctx.strokeStyle = this.color;
			for (var i = 0; i < nLines; i++) {
				ctx.beginPath();
				ctx.moveTo(this.x, this.y); //All lines radiate from common start point
				var length = randInt(this.minLength, this.maxLength);
				var theta = d2r(angle);
				var endX = startX + length*Math.cos(theta);
				var endY = startY + length*Math.sin(theta);
				ctx.lineTo(endX, endY);
				ctx.stroke();
				ctx.closePath();
				startX = endX;
				startY = endY;
				if (direction === "cw") {
					angle += (Math.floor(Math.random()*20)+range/nLines);
				} else {
					angle -= (Math.floor(Math.random()*20)+range/nLines);
				}
			}
		}
	}
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var rectangles = [];
var colors = ["#FF0000", "#00FF00","#0000FF", "#FF00FF", "#FFFF00", "#00FFFF"];
var lc1 = new LineCluster(0, 300, 50, 300, randElement(colors));
var lc2 = new LineCluster(350, 0, 50, 300, randElement(colors));
var lc3 = new LineCluster(700, 300, 50, 300, randElement(colors));
var lc4 = new LineCluster(350,600, 50, 300, randElement(colors));
var lc5 = new LineCluster(350,300, 50, 250, randElement(colors));

lc1.draw(ctx, 270, 400, "cw");
lc2.draw(ctx, 180, 400, "ccw");
lc3.draw(ctx, 90, 400, "cw");
lc4.draw(ctx, 0, 400, "ccw");
lc5.draw(ctx, 0, 720, "ccw");

/*
for (var i = 0; i < 100; i++) {
	rectangles.push(new Rectangle(100+1*i, 200+1*i, 10+3*i, 10+2*i));
}
for (var i = 0; i < rectangles.length; i++) { 
	rectangles[i].draw(ctx); 
}	
*/
