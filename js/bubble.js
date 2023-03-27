import { Algorithm } from "./modules/algorithm.mjs";
import { AlgorithmVisualizer } from "./modules/algorithmVisualizer.mjs";
import { Button } from "./modules/button.mjs";
import { playCommand, shuffleCommand, changeThemeCommand } from "./modules/command.mjs";

const canvas = document.getElementById("step-by-step");
const ctx = canvas.getContext("2d");
const iconsFont = 'bootstrap-icons';

let values = [1,2,3,4,5,6,7,8,9,10];
let algorithm;
let themeButton;
let shuffleButton;
let playButton;

window.addEventListener("DOMContentLoaded", function () {

	// common with other files: for further consideration
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	canvas.theme = 'dark';

	algorithm = new Algorithm(values, canvas);

	themeButton = new Button (
		canvas,
		iconsFont,
		'\uF1D1',
		canvas.clientWidth - canvas.clientWidth / 20,
		canvas.clientHeight / 16
	);

	shuffleButton = new Button (
		canvas,
		iconsFont,
		'\uF544',
		canvas.clientWidth * 3/8,
		canvas.clientHeight - canvas.clientHeight / 8
	);

	playButton = new Button(
		canvas,
		iconsFont,
		'\uF4F2',
		canvas.clientWidth * 5/8,
		canvas.clientHeight - canvas.clientHeight / 8
	);

	shuffleButton.setCommand('click', shuffleCommand(algorithm));
	themeButton.setCommand('click', changeThemeCommand(canvas));


	// not common across files
	const playCommandOptions = {
		elementsToHide: [playButton, shuffleButton],
		algorithm: algorithm,
		visualization: AlgorithmVisualizer.stepByStepBubbleSort
	}

	playButton.setCommand('click', playCommand(playCommandOptions));
});

window.addEventListener("resize", function () {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	algorithm.render();
	themeButton.render();
	shuffleButton.render();
	playButton.render();
});
