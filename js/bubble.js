import { Algorithm } from "./modules/algorithm.mjs";
import { AlgorithmVisualizer } from "./modules/algorithmVisualizer.mjs";
import { ModeSwitcher } from "./modules/modeSwitcher.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const values = [1,2,3,4,5,6,7,8,9,10];
const algorithm = new Algorithm(values, canvas, ctx);
const algorithmVisualizer = new AlgorithmVisualizer(algorithm);
const modeSwitcher = new ModeSwitcher(canvas, ctx);
let mouseX, mouseY;

window.addEventListener("DOMContentLoaded", function () {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	algorithm.render();
	modeSwitcher.renderIcon();
	bubbleSortLoop();
});

window.addEventListener("resize", function () {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	algorithm.render();
	modeSwitcher.renderIcon();
});

document.body.addEventListener("mousemove", (event)=>{
  mouseX = event.clientX;
  mouseY = event.clientY;
});


// specific for this file
async function bubbleSortLoop() {
	while(true) {
		algorithm.shuffle();
		await algorithmVisualizer.visualizeBubbleSort();
		await algorithmVisualizer.sleep(1000);
	}
}
