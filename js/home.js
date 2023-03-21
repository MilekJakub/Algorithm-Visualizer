import { Algorithm } from "./modules/algorithm.mjs";
import { AlgorithmVisualizer } from "./modules/algorithmVisualizer.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const values = [1,2,3,4,5,6,7,8,9,10];

const algorithm = new Algorithm(values, canvas, ctx);
const algorithmVisualizer = new AlgorithmVisualizer(algorithm);

window.addEventListener("DOMContentLoaded", function () {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	algorithm.render();
	homepageLoop();
});

window.addEventListener("resize", function () {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	algorithm.render();
});

async function homepageLoop() {
	while(true) {
		algorithm.shuffle();
		algorithm.render();
		await algorithmVisualizer.visualizeBubbleSort();
		
		algorithm.shuffle();
		algorithm.render();
		await algorithmVisualizer.visualizeInsertionSort();

		algorithm.shuffle();
		algorithm.render();
		await algorithmVisualizer.visualizeSelectionSort();

		algorithm.shuffle();
		algorithm.render();
		await algorithmVisualizer.visualizeMergeSort();
	}
}
