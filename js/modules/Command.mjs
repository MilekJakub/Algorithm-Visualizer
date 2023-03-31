class Command {
	constructor(execute) {
		if(!execute) throw new Error('Command action not provided.');
		this.execute = execute;
  }
}

function playInteractionCommand(options) {

	async function action() {
		options.elementsToHide.forEach(element => element.hide());
		options.elementsToShow.forEach(element => element.show());

		await options.visualization.bind(options.visualizer)();

		options.elementsToShow.forEach(element => element.hide());
		options.elementsToHide.forEach(element => element.show());
	}

	return new Command(action);
}

function playAnimationCommand(options) {

	async function action() {
		options.elementsToHide.forEach(element => element.hide());
		await options.visualization.bind(options.visualizer)(options.stepTime);
		options.elementsToHide.forEach(element => element.show());
	}

	return new Command(action);
}

function shuffleCommand(algorithm) {
	
	function action() {
		algorithm.shuffle();
		algorithm.render();
	}

	return new Command(action);
}

function changeThemeCommand(canvas) {

	function action() {
		if(canvas.theme == 'dark') {
			canvas.style.backgroundColor = 'white';
			canvas.theme = 'light';
		}
		else {
			canvas.style.backgroundColor = '#232323';
			canvas.theme = 'dark';
		}

		const themeChangedEvent = new Event('themechange');
		canvas.dispatchEvent(themeChangedEvent);
	}

	return new Command(action);
}

function previousButtonCommand(canvas) {
	function action() {
		const stepEvent = new Event('step');
		stepEvent.action = 'previous';
		canvas.dispatchEvent(stepEvent);
	}

	return new Command(action);
}

function nextButtonCommand(canvas) {
	function action() {
		const stepEvent = new Event('step');
		stepEvent.action = 'next';
		canvas.dispatchEvent(stepEvent);
	}

	return new Command(action);
}

export { playInteractionCommand, playAnimationCommand, shuffleCommand, changeThemeCommand, previousButtonCommand, nextButtonCommand };
