// Model for a circle given center (x, y) and radius r.
///////////////////////////////////////////////////////
class Circle {
	constructor(x, y, r, color="#000000") {
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = color;
	}
	
	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		ctx.stroke();
		ctx.closePath();
	}
	findIntersection(other) {
		var dx = this.x - other.x;
		var dy = this.y - other.y;
		var r1 = this.r;
		var r2 = other.r;
		var R = Math.sqrt(dx * dx + dy * dy);
		if (!(Math.abs(r1 - r2) <= R && R <= r1 + r2)) { // no intersection
			return [];
		}

		var R2 = R*R;
		var R4 = R2*R2;
		var a = (r1*r1 - r2*r2)/(2 * R2);
		var r2r2 = (r1*r1 - r2*r2);
		var c = Math.sqrt(2 * (r1*r1 + r2*r2) / R2 - (r2r2 * r2r2) / R4 - 1);

		var fx = (this.x+other.x)/2 - a*dx;
		var gx = -c * dy/2;
		var ix1 = fx + gx;
		var ix2 = fx - gx;

		var fy = (this.y+other.y)/2 - a*dy;
		var gy = c*dx/2;
		var iy1 = fy + gy;
		var iy2 = fy - gy;
		return [[ix1, iy1], [ix2, iy2]];
	}
}

// Overlapping circles pattern
//////////////////////////////
function drawPattern(ctx, r, nLayers, deg, degInc, xMult, yMult, cColor, pColor, xDegMult, yDegMult, lineWidth, pointSize) {
	var cWidth = ctx.canvas.width;
	var cHeight = ctx.canvas.height;
	var centerX = parseInt(cWidth/2);
	var centerY = parseInt(cHeight/2);
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, cWidth, cHeight);
	ctx.closePath();
	var circles = new Array();
	//Create Circle object array and draw circles.
	for (var j = 1; j <= nLayers; j++) {
		var radius = r;
		for (var i = 0; i < deg; i+=degInc) {
			var xc = centerX+(j*xMult)*r*Math.cos(d2r(xDegMult*i));
			var yc = centerY+(j*yMult)*r*Math.sin(d2r(yDegMult*i));
			var c = new Circle(xc, yc, radius);
			circles.push(c);
			ctx.beginPath();
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle=cColor;
			c.draw(ctx);
			ctx.closePath();
		}
	}
	
	//Draw intersection points
	for (var i = 0; i < circles.length-1; i++) {
		for (var j = i+1; j< circles.length; j++) { 
			var intersections = circles[i].findIntersection(circles[j]);
			ctx.fillStyle = pColor;
			ctx.strokeStyle = "black";
			for (var k = 0; k < intersections.length; k++) {
				ctx.beginPath();
				ctx.arc(intersections[k][0], intersections[k][1], pointSize, 0, 2 * Math.PI, false);	
				ctx.fill();
				ctx.closePath();
				ctx.beginPath();
				ctx.arc(intersections[k][0], intersections[k][1], pointSize, 0, 2 * Math.PI, false);	
				ctx.stroke();
				ctx.closePath();
			}
		}
	}	
}


// Lines between points along
// the circumference of a circle 
/////////////////////////////////
function drawPattern2(ctx, r, degInc, lineColor, pColor, lineWidth, pointSize) {	
	var cWidth = ctx.canvas.width;
	var cHeight = ctx.canvas.height;
	var centerX = parseInt(cWidth/2);
	var centerY = parseInt(cHeight/2);
	ctx.lineWidth = lineWidth;
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, cWidth, cHeight);
	ctx.closePath();
	var c = new Circle(centerX, centerY, r); 
	ctx.strokeStyle = lineColor;
	c.draw(ctx);
	var points = [];
	var currentX = centerX + r;
	var	currentY = centerY;
	var numIncr = parseInt(360/degInc);
	var angle = 0;
	
	for (var i = 0; i <= numIncr+1; i++) {
		points.push([currentX, currentY]);
		angle += degInc;
		currentX = parseInt(r*Math.cos(d2r(angle)) + centerX);
		currentY = parseInt(r*Math.sin(d2r(angle)) + centerY);
	}
	
	for (var j = 0; j < points.length; j++) {		
		ctx.strokeStyle = lineColor;
		for (var k = 0; k < points.length; k++) {
			if (Math.abs(j-k) >= 1) {
				ctx.beginPath();
				ctx.moveTo(points[j][0], points[j][1]);
				ctx.lineTo(points[k][0], points[k][1]);
				ctx.stroke();
				ctx.closePath();
			}
		}

	}
	for (var j = 0; j < points.length; j++) {
		ctx.beginPath();
		ctx.fillStyle = pColor;
		ctx.arc(points[j][0], points[j][1], pointSize, 0, 2*Math.PI, false);
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.arc(points[j][0], points[j][1], pointSize, 0, 2*Math.PI, false);
		ctx.stroke();
		ctx.closePath();
	}		
}

// Circle Multiples 
/////////////////////////////////
function drawPattern3(ctx, r, m, n, lineWidth, lineColor) {
	var cWidth = ctx.canvas.width;
	var cHeight = ctx.canvas.height;
	var centerX = parseInt(cWidth/2);
	var centerY = parseInt(cHeight/2);
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, cWidth, cHeight);
	ctx.closePath();
	ctx.strokeStyle = lineColor;
	ctx.lineWidth = lineWidth;
	var k = 0;
	var currentColor = lineColor;
	for (var i = 0; i < n; i++) {
		ctx.beginPath();
		ctx.moveTo(parseInt(r*Math.cos(d2r(360/n)*k))+centerX, parseInt(r*Math.sin(d2r(360/n*k)))+centerY);
		ctx.lineTo(parseInt(r*Math.cos(d2r(m*360/n)*k))+centerX, parseInt(r*Math.sin(d2r(m*360/n*k)))+centerY);
		k += 360.0/n;
		ctx.stroke();
		ctx.closePath();
	}
}