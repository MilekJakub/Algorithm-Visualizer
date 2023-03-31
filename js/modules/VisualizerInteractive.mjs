import { Algorithm } from "./Algorithm.mjs";
import { Visualizations } from './Visualizations.mjs';
import { Button } from "./Button.mjs";
import { icons } from './Utils.mjs';
import * as Commands from './Command.mjs';

class VisualizerInteractive {
  values;
  algorithm;
  visualizer;
  themeButton;
  shuffleButton;
  playButton;
  previousButton;
  nextButton;
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
      displayFont: true
    };

    this.algorithm = new Algorithm(algorithmOptions);
    this.visualizer = new Visualizations(this.algorithm);

    this.createButtons();

	  const playCommandOptions = {
		  elementsToHide: [this.playButton, this.shuffleButton],
		  elementsToShow: [this.previousButton, this.nextButton],
		  algorithm: this.algorithm,
		  visualizer: this.visualizer,
		  visualization: this.visualizer[visualization],
	  };	

	  this.previousButton.setCommand('click', Commands.previousButtonCommand(this.canvas));
	  this.nextButton.setCommand('click', Commands.nextButtonCommand(this.canvas));
	  this.themeButton.setCommand('click', Commands.changeThemeCommand(this.canvas));
	  this.shuffleButton.setCommand('click', Commands.shuffleCommand(this.algorithm));
	  this.playButton.setCommand('click', Commands.playInteractionCommand(playCommandOptions));

	  this.addKeypressListener();
  }

  addKeypressListener() {
    const bind = this;

    window.addEventListener('keydown', function(event) {
	    event = event || window.event;

	    switch(event.keyCode) {
		    case 37:
			    const leftArrowClickEvent = new Event('step');
			    leftArrowClickEvent.action = 'previous';
			    bind.canvas.dispatchEvent(leftArrowClickEvent);
			    break;

		    case 39:
			    const rightArrowClickEvent = new Event('step');
			    rightArrowClickEvent.action = 'next';
			    bind.canvas.dispatchEvent(rightArrowClickEvent);
			    break;
	    }
    });
  }

  createButtons() {
	  this.themeButton = new Button (
		  this.canvas,
		  this.font,
		  icons.themeButton,
		  this.canvas.clientWidth - this.canvas.clientWidth / 20,
		  this.canvas.clientHeight / 16
	  );

	  this.previousButton = new Button (
		  this.canvas,
		  this.font,
		  icons.previousButton,
		  this.canvas.clientWidth * 3/8,
		  this.canvas.clientHeight - this.canvas.clientHeight / 8
	  );

	  this.nextButton = new Button (
		  this.canvas,
		  this.font,
		  icons.nextButton,
		  this.canvas.clientWidth * 5/8,
		  this.canvas.clientHeight - this.canvas.clientHeight / 8
	  );

	  this.previousButton.hide();
	  this.nextButton.hide();

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
    this.previousButton.render();
    this.nextButton.render();
    this.shuffleButton.render();
    this.playButton.render();
  }
}

export { VisualizerInteractive };
