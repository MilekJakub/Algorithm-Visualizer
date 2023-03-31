import { Algorithm } from './Algorithm.mjs';
import { Visualizations } from './Visualizations.mjs';
import { Button } from './Button.mjs';
import { icons } from './Utils.mjs';

import { 
  playAnimationCommand,
  playInteractionCommand,
  shuffleCommand,
  changeThemeCommand,
  previousButtonCommand,
  nextButtonCommand
} from './Command.mjs';

class VisualizerAnimation {
  canvas;
  values;
  algorithm;
  visualizer;
  themeButton;
  shuffleButton;
  playButton;
  font = 'bootstrap-icons';

  constructor(canvas, visualization, elementsCount) {
	  canvas.width = canvas.clientWidth;
	  canvas.height = canvas.clientHeight;
	  canvas.theme = 'dark';

    this.canvas = canvas;
    this.values = Array.from({length: elementsCount}, (_, i) => i + 1);

    const algorithmOptions = {
      values: this.values,
      canvas: canvas,
      margin: 2,
      displayFont: false
    };

    this.algorithm = new Algorithm(algorithmOptions);
    this.visualizer = new Visualizations(this.algorithm);

    this.createButtons();

	  const playCommandOptions = {
		  elementsToHide: [this.playButton, this.shuffleButton],
		  algorithm: this.algorithm,
		  visualizer: this.visualizer,
		  visualization: this.visualizer[visualization],
		  stepTime: 10
	  };	

	  this.themeButton.setCommand('click', changeThemeCommand(this.canvas));
	  this.shuffleButton.setCommand('click', shuffleCommand(this.algorithm));
	  this.playButton.setCommand('click', playAnimationCommand(playCommandOptions));
  }

  createButtons() {
	  this.themeButton = new Button (
		  this.canvas,
		  this.font,
		  icons.themeButton,
		  this.canvas.clientWidth - this.canvas.clientWidth / 20,
		  this.canvas.clientHeight / 16
	  );

	  this.shuffleButton = new Button (
		  this.canvas,
		  this.font,
		  icons.shuffleButton,
		  this.canvas.clientWidth * 3/8,
		  this.canvas.clientHeight - this.canvas.clientHeight / 8
	  );

	  this.playButton = new Button(
		  this.canvas,
		  this.font,
		  icons.playButton,
		  this.canvas.clientWidth * 5/8,
		  this.canvas.clientHeight - this.canvas.clientHeight / 8
	  );
  }

  render() {
	  this.canvas.width = this.canvas.clientWidth;
	  this.canvas.height = this.canvas.clientHeight;
    this.algorithm.render();
    this.themeButton.render();
    this.shuffleButton.render();
    this.playButton.render();
  }
}

export { VisualizerAnimation };
