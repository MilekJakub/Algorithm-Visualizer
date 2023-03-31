import { Algorithm } from './modules/Algorithm.mjs';
import { Visualizations } from './modules/Visualizations.mjs';
import { sleep } from './modules/Utils.mjs';

const animationCanvas = document.getElementById('canvas');
let algorithm;
let visualizations;

window.addEventListener("DOMContentLoaded", async function () {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	const options = {
      values: Array.from({length: 10}, (_, i) => i + 1),
      canvas: animationCanvas,
      margin: 2,
      displayFont: false
	};

	algorithm = new Algorithm(options);
	visualizations = new Visualizations(algorithm);

	await homepageLoop();
});

window.addEventListener("resize", function () {
	algorithm.render();
});

async function homepageLoop() {
	while(true) {
		algorithm.shuffle();
		algorithm.render();
		await visualizations.bubbleSortAnimation(50);
		await sleep(500);

		algorithm.shuffle();
		algorithm.render();
		await visualizations.insertionSortAnimation(50);
		await sleep(500);

		algorithm.shuffle();
		algorithm.render();
		await visualizations.selectionSortAnimation(50);
		await sleep(500);

		algorithm.shuffle();
		algorithm.render();
		await visualizations.mergeSortAnimation(50);
		await sleep(500);
	}
}
