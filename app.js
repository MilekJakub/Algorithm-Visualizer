import { Element } from "./modules/element.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let CANVAS_WIDTH = 640;
let CANVAS_HEIGHT = 480;

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

let currentValues = DEFAULT_VALUES;
let currentColor = DEFAULT_COLOR;
let currentWidth = DEFAULT_WIDTH;
let currentHeight = DEFAULT_HEIGHT;
let currentHop = DEFAULT_HOP;
let currentFontSize = DEFAULT_FONTSIZE;
let currentFontFamily = DEFAULT_FONTFAMILY;
let currentMargin = DEFAULT_MARGIN;

let elements;

window.addEventListener("resize", function () {
	CANVAS_WIDTH = canvas.clientWidth;
	CANVAS_HEIGHT = canvas.clientHeight;
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;

	setElementsCoordinates(elements, DEFAULT_VALUES, DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_MARGIN, DEFAULT_HOP, DEFAULT_FONTSIZE, DEFAULT_FONTFAMILY, CANVAS_WIDTH, CANVAS_HEIGHT);
	renderPosition(elements, ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
});

window.addEventListener("DOMContentLoaded", function () {
	CANVAS_WIDTH = canvas.clientWidth;
	CANVAS_HEIGHT = canvas.clientHeight;
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;

	elements = createElements(
		currentValues, 
		currentColor, 
		currentWidth, 
		currentHeight,
		currentMargin,
		currentHop, 
		currentFontSize,
		currentFontFamily,
		CANVAS_WIDTH,
		CANVAS_HEIGHT
	);
	
  renderPosition(elements, ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
});

window.addEventListener("keydown", function (event) {
  // log elements
  if (event.key == "l") {
    console.log(elements);
  }

  // render
  if (event.key == "r") {
    renderPosition(elements, ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  // clear
  if (event.key == "c") {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  // shuffle
  if (event.key == "s") {
    shuffleElements(elements);
    renderPosition(elements, ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

	// insertion sort
	if (event.key == "i") {
		visualizeInsertionSort(elements);
	}
});

function scaleWidth(elementWidth, elementsLength, margin, canvasWidth) {
	let elementsWidth = elementWidth * elementsLength;
	let marginsWidth = margin * (elementsLength - 1);
	const maximumWidth = canvasWidth - (elementWidth * 2);

	if (elementsWidth + marginsWidth > maximumWidth) {		
		while (elementWidth - 1 > 0) {
			elementWidth -= 1;
			elementsWidth = elementWidth * elementsLength;

			if (elementsWidth + marginsWidth < maximumWidth) break;
		}
  }

	return elementWidth;
}

function scaleHeight(maxValue, hop, elementHeight, canvasHeight) {
	let largestHeight = maxValue * hop * elementHeight;
	const maximumHeight = canvasHeight / 2;

  if (largestHeight >= maximumHeight) {
    while (hop - 0.1 > 0) {
			hop -= 0.1;
			largestHeight = maxValue * hop * elementHeight;

			if (largestHeight <= maximumHeight) break;
    }
  }

	return hop;
}

function scaleFont(fontSize, fontFamily, maxValue, elementWidth) {
  let font = `${fontSize}px ${fontFamily}`;
  ctx.font = font;
  ctx.fillStyle = "black";
  let textWidth = ctx.measureText(maxValue).width;

  if (textWidth > elementWidth) {
    while (fontSize > 0) {
			fontSize--;
			ctx.font = `${fontSize}px ${fontFamily}`;
			textWidth = ctx.measureText(maxValue).width;

      if (textWidth <= elementWidth) break;
		}
	}

  font = `${fontSize}px ${fontFamily}`;

	return font;
}

function setElementsCoordinates(elements, values, elementWidth, elementHeight, margin, hop, fontSize, fontFamily, canvasWidth, canvasHeight) {
	
 	let maxValue = Math.max(...values);

	elementWidth = scaleWidth(elementWidth, values.length, margin, canvasWidth);
	hop = scaleHeight(maxValue, hop, elementHeight, canvasHeight);
	let font = scaleFont(fontSize, fontFamily, maxValue, elementWidth);

	const algorithmWidth = elementWidth * elements.length + margin * (elements.length - 1);
  const algorithmHeight = elementHeight + (elements.length - 1) * hop;
  let x = (canvasWidth - algorithmWidth) / 2;
  let y = algorithmHeight - elementHeight + (canvasHeight + algorithmHeight) / 2;
	
	for (let i = 0; i < elements.length; i++) {
		elements[i].x = x + (margin * i + elementWidth * i);
		elements[i].y = y - (elementHeight * (elements[i].value * hop));
		elements[i].width = elementWidth;
		elements[i].height = elementHeight * (elements[i].value * hop);
		elements[i].font = font;
	}
}

function createElements(values, color, elementWidth, elementHeight, margin, hop, fontSize, fontFamily, canvasWidth, canvasHeight) {

  const elements = [];
  for (let i = 0; i < values.length; i++) {
    let element = new Element(
      values[i],
      null,
      null,
      null,
      null,
      color,
      null
    );
    elements.push(element);
  }

	setElementsCoordinates(elements, values, elementWidth, elementHeight, margin, hop, fontSize, fontFamily, canvasWidth, canvasHeight);

  return elements;
}

function renderPosition(elements, ctx, canvasWidth, canvasHeight) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

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

// does not returns the same value twice
function randomNumber(min, max) { 
  let random = Math.floor(Math.random() * (max - min)) + min;
  
  do {
    random = Math.floor(Math.random() * (max - min)) + min;
  } while (random === randomNumber.last);

  randomNumber.last = random;
  return random;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function visualizeInsertionSort(elements) {
	for (let i = 0; i < elements.length; i++) {
		let j = i;
		elements[i].color = '#ffaa00';
		renderPosition(elements, ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
		await sleep(100);

		while (j > 0) {
			elements[j].color = 'purple';
			elements[j - 1].color = 'purple';
			renderPosition(elements, ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
			await sleep(100);

			if (elements[j - 1].value > elements[j].value) {
				elements[j].color = '#88ff44';
				elements[j-1].color = '#88ff44';
				renderPosition(elements, ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
				await sleep(100);
				
				// SWAP
				let temp = elements[j];
				elements[j] = elements[j - 1];
				elements[j-1] = temp;
				temp = elements[j].x;
				elements[j].x = elements[j - 1].x;
				elements[j - 1].x = temp;
			}
			
			elements[j].color = DEFAULT_COLOR;
			elements[j - 1].color = DEFAULT_COLOR;
			j--;
		}

		renderPosition(elements, ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
	}	
}
