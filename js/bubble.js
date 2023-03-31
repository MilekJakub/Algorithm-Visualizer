import { VisualizerAnimation } from './modules/VisualizerAnimation.mjs';
import { VisualizerInteractive } from './modules/VisualizerInteractive.mjs';

const interactiveCanvas = document.getElementById('step-by-step');
const animationCanvas = document.getElementById('considerable');

let interactive;
let animation;

window.addEventListener("DOMContentLoaded", function () {
	interactive = new VisualizerInteractive(interactiveCanvas, 'bubbleSortInteractive', 10);
	animation = new VisualizerAnimation(animationCanvas, 'bubbleSortAnimation', 48);
});

window.addEventListener("resize", function () {
	interactive.render();
	animation.render();
});
