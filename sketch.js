var img;
var proc_img;
var canvas;

var canvas_w = 860
var canvas_h = 600

var gui = new dat.GUI();

var options = {
  neighbours: 9,
  threshold: 5,
}

var neighbours = options.neighbours;
var threshold = options.threshold;

gui.add(options, "neighbours", {9: 9, 25: 25, 49: 49, 81: 81}).onChange(
  function(value) {
    neighbours = value;
  }
);
gui.add(options, "threshold", 0, 500).onChange(
  function(value) {
    threshold = value;
  }
);

function setup() {
  canvas = createCanvas(canvas_w, canvas_h);
  repositionCanvas();
  background(200);
  textAlign(CENTER);
  text('Arraste a imagem aqui', width / 2, height / 2);
  canvas.drop(gotFile);
}

function draw() {
  if(img) {
    copy(img, 7, 22, 10, 10, 35, 25, 50, 50);
    img.loadPixels();
	  let d = pixelDensity();
	  for (let i = 0; i < 4 * (img.width * img.height); i += 4) {
		  const index1 = brightness(getColor(i));
		  const index2 = brightness(getColor(i, 1));
		  var diff = abs(index1 - index2);
		  if (diff > options.threshold) {
			  // img.pixels[i] = img.pixels[i];
			  // img.pixels[i + 1] = 0;
			  // img.pixels[i + 2] = 0;
			  // img.pixels[i + 3] = img.pixels[i + 3];
			  setColor(i, options.neighbours);
		  }
		  // else {
		  // 	img.pixels[i] = 255;
		  // 	img.pixels[i + 1] = 255;
		  // 	img.pixels[i + 2] = 255;
		  // 	img.pixels[i + 3] = img.pixels[i + 3];
		  // }
	  }
	  img.updatePixels();
	  image(img, 0, 0, img.width, img.height);
  }
}

function repositionCanvas() {
  if (canvas) canvas.position((window.innerWidth / 2) - (canvas_w / 2), (window.innerHeight / 2) - (canvas_h / 2));
}

function gotFile(file) {
  console.log(file)
  img = loadImage(file.data);
}

function getColor(i, position = 0) {
	var p = 4 * position;

	var r = img.pixels[i];
	var g = img.pixels[i + p + 1];
	var b = img.pixels[i + p + 2];
	var a = img.pixels[i + p + 3];
	return color(r, g, b, a);
}

function setColor(i, modifier) {
	var n = (modifier - 1) / 2;
	var r = 0;
	var g = 0;
	var b = 0;
	var a = 0;
	for (var position = n; position >= -n; position--) {
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

window.addEventListener("resize", repositionCanvas)