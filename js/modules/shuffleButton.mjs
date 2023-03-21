class ShuffleButton {

	icon = '\uF544';

	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');

		this.mouseOver = false;
		canvas.isLightMode = false;
		this.scale();
		this.addEvents();

		this.isVisible = true;
	}

	scale() {
		this.fontSize = this.canvas.height / 18;
		this.margin = this.fontSize / 2;
		this.x = this.canvas.width - (this.canvas.width / 2) - this.fontSize * 2;
		this.y = this.canvas.height - this.canvas.height / 8;

		this.path = new Path2D();
		this.path.arc (
			this.x, 
			this.y, 
			this.fontSize / 1.6, 
			0, 
			2 * Math.PI
		);
	}

	mouseMoveHandler(shuffleButton) {
		if(shuffleButton.ctx.isPointInPath(shuffleButton.path, event.offsetX, event.offsetY)) {
			if(!shuffleButton.mouseOver) {
				const mouseOverEvent = new Event('mouseovershuffle');
				shuffleButton.canvas.dispatchEvent(mouseOverEvent);
				shuffleButton.mouseOver = true;
			}
		}

		else {
			if(shuffleButton.mouseOver) {
				const mouseLeftEvent = new Event('mouseleftshuffle');
				shuffleButton.canvas.dispatchEvent(mouseLeftEvent);
				shuffleButton.mouseOver = false;
			}
		}
	}	

	mouseClickHandler(shuffleButton) {
		if(shuffleButton.ctx.isPointInPath(shuffleButton.path, event.offsetX, event.offsetY)) {
			const shuffleClickedEvent = new Event('shuffleclicked');
			shuffleButton.canvas.dispatchEvent(shuffleClickedEvent);
		}
	}

	mouseOverHandler = function(shuffleButton) {
		shuffleButton.render();
		document.body.classList.add('pointer');
	}

	mouseLeftHandler = function(shuffleButton) {
		shuffleButton.render(shuffleButton);
		document.body.classList.remove('pointer');
	}

	modeChangeHandler = function(shuffleButton) {
		shuffleButton.render();
	}

	handlers = [];

	addEvents() {
		const shuffleButton = this;

		this.handlers.push(function mouseMoveHandler() { shuffleButton.mouseMoveHandler(shuffleButton) });
		this.handlers.push(function mouseClickHandler() { shuffleButton.mouseClickHandler(shuffleButton) });
		this.handlers.push(function mouseOverHandler() { shuffleButton.mouseOverHandler(shuffleButton) });
		this.handlers.push(function mouseLeftHandler() { shuffleButton.mouseLeftHandler(shuffleButton) });
		this.handlers.push(function mouseChangeHandler() { shuffleButton.modeChangeHandler(shuffleButton) });

		this.canvas.addEventListener('mousemove', shuffleButton.handlers[0]);
		this.canvas.addEventListener('click', shuffleButton.handlers[1]);
		this.canvas.addEventListener('mouseovershuffle', shuffleButton.handlers[2]);
		this.canvas.addEventListener('mouseleftshuffle', shuffleButton.handlers[3]);
		this.canvas.addEventListener('modechange', shuffleButton.handlers[4]);
	}

	removeEvents() {
		const shuffleButton = this;

		this.canvas.removeEventListener('mousemove', shuffleButton.handlers[0]);
		this.canvas.removeEventListener('click', shuffleButton.handlers[1]);
		this.canvas.removeEventListener('mouseovershuffle', shuffleButton.handlers[2]);
		this.canvas.removeEventListener('mouseleftshuffle', shuffleButton.handlers[3]);
		this.canvas.removeEventListener('modechange', shuffleButton.handlers[4]);
	}

	render() {
		if(!this.isVisible) return;
	
		this.clear();
		this.scale();

		this.ctx.font = `${this.fontSize}px bootstrap-icons`;
		this.ctx.fillStyle = this.canvas.isLightMode ? 'black' : 'white';

		this.ctx.fillText (
			this.icon,
			this.x - this.margin,
			this.y + this.margin
		);
	}

	clear() {
		this.ctx.clearRect (
			this.x - this.fontSize, 
			this.y - this.fontSize,
			this.fontSize * 2,
			this.fontSize * 2
		);
		
		document.body.classList.remove('pointer');
	}

	show() {
		const shuffleButton = this;
		this.isVisible = true;
		this.render();
		this.addEvents();
	}

	hide() {
		const shuffleButton = this;
		this.isVisible = false;
		this.clear();
		this.removeEvents();
	}
}

export { ShuffleButton };
