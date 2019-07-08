var img;

function getColor(i, position = 0) {
	var p = 4 * position;

	var r = img.pixels[i];
	var g = img.pixels[i + p + 1];
	var b = img.pixels[i + p + 2];
	var a = img.pixels[i + p + 3];
	return color(r, g, b, a);
}

function setColor(i, modifier = 1) {
	var r = 0;
	var g = 0;
	var b = 0;
	var a = 0;
	for (var position = 4; position >= -4; position--) {
		var index = i + 4 * position;
		r = img.pixels[index] / modifier + r;
		g = img.pixels[index + 1] / modifier + g;
		b = img.pixels[index + 2] / modifier + b;
		a = img.pixels[index + 3] / modifier + a;
	}
	img.pixels[i] = r;
	img.pixels[i + 1] = g;
	img.pixels[i + 2] = b;
	img.pixels[i + 3] = a;
}

function preload() {
	img = loadImage('assets/{IMAGE_FILE}.jpg');
}

function setup() {
	// COLOCAR O TAMANHO DA IMAGEM
	createCanvas(1920, 1080);
	// background(200);
}

function draw() {
	// image(img, 0, 0, width, height);
	img.loadPixels();
	let d = pixelDensity();
	for (let i = 0; i < 4 * (width * height); i += 4) {
		const index1 = brightness(getColor(i));
		const index2 = brightness(getColor(i, 1));
		var diff = abs(index1 - index2);
		if (diff > 5) {
			// img.pixels[i] = img.pixels[i];
			// img.pixels[i + 1] = 0;
			// img.pixels[i + 2] = 0;
			// img.pixels[i + 3] = img.pixels[i + 3];
			setColor(i, 9);
		}
		// else {
		// 	img.pixels[i] = 255;
		// 	img.pixels[i + 1] = 255;
		// 	img.pixels[i + 2] = 255;
		// 	img.pixels[i + 3] = img.pixels[i + 3];
		// }
	}
	img.updatePixels();
	image(img, 0, 0);
}
