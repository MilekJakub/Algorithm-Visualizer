import { Element } from "./modules/element.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let CANVAS_WIDTH = 640;
let CANVAS_HEIGHT = 480;
let elements = [];

const DEFAULT_VALUES = [
1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
// 11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
// 31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50
];

const DEFAULT_COLOR = "red";
const DEFAULT_WIDTH = 32;
const DEFAULT_HEIGHT = 10;
const DEFAULT_HOP = 1.0;
const DEFAULT_FONTFAMILY = "Monospace";
const DEFAULT_FONTSIZE = 16;
const DEFAULT_MARGIN = 2;

window.addEventListener("resize", function () {
	CANVAS_WIDTH = canvas.clientWidth;
	CANVAS_HEIGHT = canvas.clientHeight;
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;
	elements = createElements(
		DEFAULT_VALUES, 
		DEFAULT_COLOR, 
		DEFAULT_WIDTH, 
		DEFAULT_HEIGHT, 
		DEFAULT_HOP, 
		DEFAULT_FONTFAMILY, 
		DEFAULT_FONTSIZE
		);
  renderPosition(elements);
});

window.addEventListener("DOMContentLoaded", function () {
	CANVAS_WIDTH = canvas.clientWidth;
	CANVAS_HEIGHT = canvas.clientHeight;
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;

	elements = createElements(
		DEFAULT_VALUES, 
		DEFAULT_COLOR, 
		DEFAULT_WIDTH, 
		DEFAULT_HEIGHT, 
		DEFAULT_HOP, 
		DEFAULT_FONTFAMILY, 
		DEFAULT_FONTSIZE
		);
  renderPosition(elements);
});

window.addEventListener("keydown", function (event) {
  // log elements
  if (event.key == "l") {
    console.log(elements);
  }

  // render
  if (event.key == "r") {
    renderPosition(elements);
  }

  // clear
  if (event.key == "c") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // shuffle
  if (event.key == "s") {
    shuffleElements(elements);
    renderPosition(elements);
  }
});

function createElements(values, color, elementWidth, elementHeight, hop, fontFamily, fontSize) {
	const maxValue = Math.max(...values);

  // WIDTH SCALING
	if (elementWidth * values.length + DEFAULT_MARGIN * (values.length - 1)
			> CANVAS_WIDTH - DEFAULT_WIDTH) {
		
		while (elementWidth - 1 > 0) {
			elementWidth -= 1;
			if (elementWidth * values.length + DEFAULT_MARGIN * (values.length - 1)
					< CANVAS_WIDTH - DEFAULT_WIDTH) break;
		}
  }

  // HEIGHT SCALING
  if (maxValue * hop * elementHeight >= CANVAS_HEIGHT / 2) {
    while (hop - 0.1 > 0) {
			hop -= 0.1;
			if (maxValue * hop * elementHeight <= CANVAS_HEIGHT / 2) break;
    }
  }

  // FONT
  let font = `${fontSize}px ${fontFamily}`;
  ctx.font = font;
  ctx.fillStyle = "black";
  let textWidth = ctx.measureText(maxValue).width;

  if (textWidth > elementWidth) {
    while (true) {
      if (fontSize <= 10) break;
      if (textWidth <= elementWidth) break;

			fontSize--;
			textWidth = ctx.measureText(maxValue).width;
		}
	}
  font = `${fontSize}px ${fontFamily}`;

	// POSITION
  const algorithmWidth = elementWidth * values.length + DEFAULT_MARGIN * (values.length - 1);
  const algorithmHeight = elementHeight + (values.length - 1) * hop;
  let x = (CANVAS_WIDTH - algorithmWidth) / 2;
  let y = algorithmHeight - elementHeight + (CANVAS_HEIGHT + algorithmHeight) / 2;

	// CREATING ELEMENTS
  const elements = [];

  for (let i = 0; i < values.length; i++) {
    let element = new Element(
      values[i],
      x,
      y - elementHeight * (values[i] * hop),
      elementWidth,
      elementHeight * (values[i] * hop),
      color,
      font
    );

    elements.push(element);

    x += elementWidth + DEFAULT_MARGIN;
  }

  return elements;
}

function renderPosition(elements) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < elements.length; i++) {
    elements[i].draw(ctx);
  }
}

function shuffleElements(elements) {
  for (let i = 0; i < elements.length * 2; i++) {
    let firstElIndex = randomNumber(0, elements.length);
    let secondElIndex = randomNumber(0, elements.length);
    
    let temp = {};

    // swap in array
    temp = elements[firstElIndex];
    elements[firstElIndex] = elements[secondElIndex];
    elements[secondElIndex] = temp;

    // swap x coordinates
    temp = elements[firstElIndex].x;
    elements[firstElIndex].x = elements[secondElIndex].x;
    elements[secondElIndex].x = temp;
  }
}

// cannot give the same value twice
function randomNumber(min, max) { 
  let random = Math.floor(Math.random() * (max - min)) + min;
  
  do {
    random = Math.floor(Math.random() * (max - min)) + min;
  } while (random === randomNumber.last);

  randomNumber.last = random;
  return random;
}
