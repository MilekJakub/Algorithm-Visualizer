import { Algorithm } from "./modules/algorithm.mjs";
import { AlgorithmVisualizer } from "./modules/algorithmVisualizer.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const values = [1,2,3,4,5,6,7,8,9,10, //11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
];

const algorithm = new Algorithm(values, canvas, ctx);
const algorithmVisualizer = new AlgorithmVisualizer(algorithm);

window.addEventListener("DOMContentLoaded", function () {
	algorithm.render();
});

window.addEventListener("resize", function () {
	algorithm.render();
});

window.addEventListener("keydown", function (event) {
	switch(event.key) {
		case 'l':
			console.log(algorithm.elements);
			break;

		case 'r':
			algorithm.render();
			break;

		case 'c':
			algorithm.clear();
			break;

		case 's':
			algorithm.shuffle();
			algorithm.render();	
			break;

		case '1':
			algorithmVisualizer.visualizeBubbleSort();
			break;

		case '2':
			algorithmVisualizer.visualizeInsertionSort();
			break;

		case '3':
			algorithmVisualizer.visualizeSelectionSort();
			break;

		case '4':
			algorithmVisualizer.visualizeMergeSort();
			break;
	}
});
