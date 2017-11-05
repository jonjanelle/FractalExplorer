function quadSolve(a,b,c) {
	try {
		var x1 = (-b + Math.sqrt(b*b-4*a*c))/(2*a);
	} catch(e) { }
	try {
		var x2 = (-b - Math.sqrt(b*b-4*a*c))/(2*a);
	} catch(e) { }
	return [x1, x2];
}

// Convert degrees to radians
/////////////////////////////
function d2r(deg) { return deg*Math.PI/180.0; }


// Get hex string representation of number
//////////////////////////////
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

// Get hex color string for (r,g,b) color triplet
//////////////////////////////////////////////////
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// Convert hex color string to (r,g,b)
//////////////////////////////////////
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

///////////////////////////////







