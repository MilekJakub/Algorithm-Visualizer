import { Algorithm } from "./modules/algorithm.mjs";
import { AlgorithmVisualizer } from "./modules/algorithmVisualizer.mjs";
import { ModeButton } from "./modules/modeButton.mjs";
import { ShuffleButton } from "./modules/shuffleButton.mjs";
import { PlayButton } from "./modules/playButton.mjs";

const canvas = document.getElementById("step-by-step");
const ctx = canvas.getContext("2d");

const values = [1,2,3,4,5,6,7,8,9,10];
const algorithm = new Algorithm(values, canvas);
const algorithmVisualizer = new AlgorithmVisualizer(algorithm);

const modeButton = new ModeButton(canvas);
const shuffleButton = new ShuffleButton(canvas);
const playButton = new PlayButton(canvas);

window.addEventListener("DOMContentLoaded", function () {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	algorithm.render();
	modeButton.render();
	shuffleButton.render();
	playButton.render();
});

window.addEventListener("resize", function () {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	algorithm.render();
	modeButton.render();
	shuffleButton.render();
	playButton.render();
});

window.addEventListener("keypress", function(event) {
	if(event.key === 'l') console.log(playButton);
});

canvas.addEventListener('shuffleclicked', function() {
	algorithm.shuffle();
	algorithm.render();
});

canvas.addEventListener('playclicked', async function() {
	shuffleButton.hide();
	playButton.hide();
	await algorithmVisualizer.stepByStepBubbleSort();
	shuffleButton.show();
	playButton.show();
});
