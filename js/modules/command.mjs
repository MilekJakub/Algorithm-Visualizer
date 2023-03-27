class Command {
	constructor(execute) {
		if(!execute) throw new Error('You need to provide command action in order to create command object.');
		this.execute = execute;
  }
}

function playCommand(options) {

	async function action() {
		options.elementsToHide.forEach(element => element.hide());
		await options.visualization(options.algorithm);
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

export { playCommand, shuffleCommand, changeThemeCommand };
