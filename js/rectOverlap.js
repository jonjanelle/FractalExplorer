var white = "#FFFFFF";
var blue = "#0000FF";
var black = "#000000";
var colors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
//var colors = [white,blue,black, "#b80142", "#003366", "#fe652b","#c0cbff", "#066f6f"];
//////////////////////////////////////////////////
//////////////////////////////////////////////////

//get a random int between min and max, inclusive
function randInt(min, max) {
	return Math.floor(Math.random()*(max-min)+1)+min;
}

//Paint background a solid color using [width, height] 
// window dimensions
function paintBG(ctx, color, dim) {
	ctx.beginPath();
	ctx.fillStyle = color;
    ctx.fillRect(0,0,dim[0],dim[1]);
	ctx.closePath();	
}

//Get a random element from an return
function randElement(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}

//Returns true if min < num < max 
// or min <= num <= max if inclusive is true
function inRange(num, min, max, inclusive = false) {
	if (inclusive) {
	} else {
		return num > min && num < max;
	}
}

//Returns true if rectangle r1 is touching r2
function areOverlapping(r1, r2) {
	if (inRange(r1.x, r2.x, r2.x + r2.w) && inRange(r1.y, r2.y, r2.y + r2.h)) {
		return true;
	} else {
		return false;
	}	
}

//Get a random rectangle that completely fits within 
//[width, height] window dimensions
function getRectInBounds(dim, minWidth=10, minHeight=10) {
	var startX = randInt(0, dim[0]);
	var startY = randInt(0, dim[1]);
	var width = randInt(0, dim[0]-startX);
	var height = randInt(0, dim[1] - startY);
	if (width < minWidth) { width = minWidth; }
	if (height < minHeight) { height = minHeight; }
	if (startX+width > dim[0] || startY+height > dim[1]) {
		return getRectInBounds(dim, minWidth, minHeight);
	}
	return {x: startX, y: startY, w: width, h: height};
}


function drawRandomRects(ctx, color, dim, width=null, rectList=null) {
	if (width == null) {
		width = Math.random()*6 + 1;
	}
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	if (color == "#000000") {
		ctx.strokeStyle = "#CCCCCC";
	} else {
		ctx.strokeStyle = "#000000";
	}

	if (rectList != null) {
		var currentRect =  getRectInBounds(dim, 150, 150);
		currentRect.color = color;
		if (rectList.length != 0) {
			var colorsTouched = new Array();
			for (var i = rectList.length - 1; i >= 0; i--) {
				if (areOverlapping(rectList[i], currentRect)) {
					colorsTouched.push(rectList[i].color);
					var newColor = randElement(colors);
					ctx.fillStyle = newColor;
					currentRect.color = newColor;	
				}
			}
		} 
		rectList.push(currentRect);
	}
	ctx.fillRect(currentRect.x, currentRect.y, currentRect.w, currentRect.h);
	ctx.rect(currentRect.x, currentRect.y, currentRect.w, currentRect.h);
	ctx.stroke();
	ctx.closePath();
}

//////////////////////////////////////////////
//////////////////////////////////////////////
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var rectangles = [];
var dim = [700, 600];
paintBG(ctx, randElement(colors), dim);
rectList  = []; 
for (var i = 0; i < 7; i++) {
	drawRandomRects(ctx, randElement(colors), dim, 3, rectList); 
}


