import { VisualizerAnimation } from './modules/VisualizerAnimation.mjs';
import { VisualizerInteractive } from './modules/VisualizerInteractive.mjs';
import { Visualizations } from './modules/Visualizations.mjs';

const interactiveCanvas = document.getElementById('step-by-step');
const animationCanvas = document.getElementById('considerable');

let interactive;
let animation;

window.addEventListener("DOMContentLoaded", function () {
	interactive = new VisualizerInteractive(interactiveCanvas, 'selectionSortInteractive', 10);
	animation = new VisualizerAnimation(animationCanvas, 'selectionSortAnimation', 48);
});

window.addEventListener("resize", function () {
	interactiveCanvas.render();
	animationCanvas.render();
});
