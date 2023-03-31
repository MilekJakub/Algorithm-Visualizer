import { VisualizerAnimation } from './modules/VisualizerAnimation.mjs';
import { VisualizerInteractive } from './modules/VisualizerInteractive.mjs';
import { Visualizations } from './modules/Visualizations.mjs';

const interactiveCanvas = document.getElementById('step-by-step');
const animationCanvas = document.getElementById('considerable');

let interactive;
let animation;

window.addEventListener("DOMContentLoaded", function () {
	interactive = new VisualizerInteractive(interactiveCanvas, 'mergeSortInteractive', 20);
	animation = new VisualizerAnimation(animationCanvas, 'mergeSortAnimation', 128);
});

window.addEventListener("resize", function () {
	interactiveCanvas.render();
	animationCanvas.render();
});
