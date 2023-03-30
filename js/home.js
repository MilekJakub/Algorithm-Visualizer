import { Algorithm } from "./modules/Algorithm.mjs";
import { Visualizer } from "./modules/Visualizer.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const values = [1,2,3,4,5,6,7,8,9,10];
const algorithm = new Algorithm(values, canvas);
const visualizer = new Visualizer(algorithm);

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
		await visualizer.bubbleSortAnimation(algorithm);
		await visualizer.sleep(1000);
		
		// algorithm.shuffle();
		// algorithm.render();
		// await AlgorithmVisualizer.insertionSort(algorithm);

		// algorithm.shuffle();
		// algorithm.render();
		// await AlgorithmVisualizer.selectionSort(algorithm);

		// algorithm.shuffle();
		// algorithm.render();
		// await AlgorithmVisualizer.mergeSort(algorithm);
	}
}
