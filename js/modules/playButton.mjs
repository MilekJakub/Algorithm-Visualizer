class PlayButton {

	icon = '\uF4F2';

	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.scale();
		this.show();
	}

	scale() {
		this.fontSize = this.canvas.height / 18;
		this.margin = this.fontSize / 2;
		this.x = this.canvas.width - (this.canvas.width / 2) + this.fontSize * 2;
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

	mouseMoveHandler(playButton) {
		if(playButton.ctx.isPointInPath(playButton.path, event.offsetX, event.offsetY)) {
			if(!playButton.mouseOver) {
				const mouseOverEvent = new Event('mouseoverplay');
				playButton.canvas.dispatchEvent(mouseOverEvent);
				playButton.mouseOver = true;
			}
		}

		else {
			if(playButton.mouseOver) {
				const mouseLeftEvent = new Event('mouseleftplay');
				playButton.canvas.dispatchEvent(mouseLeftEvent);
				playButton.mouseOver = false;
			}
		}
	}	

	mouseClickHandler(playButton) {
		if(playButton.ctx.isPointInPath(playButton.path, event.offsetX, event.offsetY)) {
			const playButtonClickedEvent = new Event('playclicked');
			playButton.canvas.dispatchEvent(playButtonClickedEvent);
			document.body.classList.remove('pointer');
		}
	}

	mouseOverHandler(playButton) {
		playButton.render();
		document.body.classList.add('pointer');
	}

	mouseLeftHandler(playButton) {
		playButton.render();
		document.body.classList.remove('pointer');
	}

	modeChangeHandler(playButton) {	
		playButton.render();
	}

	handlers = [];

	addEvents() {
		const playButton = this;
		this.handlers.push(function mouseMoveHandler() { playButton.mouseMoveHandler(playButton) });
		this.handlers.push(function mouseClickHandler() { playButton.mouseClickHandler(playButton) });
		this.handlers.push(function mouseOverHandler() { playButton.mouseOverHandler(playButton) });
		this.handlers.push(function mouseLeftHandler() { playButton.mouseLeftHandler(playButton) });
		this.handlers.push(function mouseChangeHandler() { playButton.modeChangeHandler(playButton) });

		this.canvas.addEventListener('mousemove', playButton.handlers[0]);
		this.canvas.addEventListener('click', playButton.handlers[1]);
		this.canvas.addEventListener('mouseoverplay', playButton.handlers[2]);
		this.canvas.addEventListener('mouseleftplay', playButton.handlers[3]);
		this.canvas.addEventListener('modechange', playButton.handlers[4]);
	}
	
	removeEvents() {
		const playButton = this;
		this.canvas.removeEventListener('mousemove', playButton.handlers[0]);
		this.canvas.removeEventListener('click', playButton.handlers[1]);
		this.canvas.removeEventListener('mouseoverplay', playButton.handlers[2]);
		this.canvas.removeEventListener('mouseleftplay', playButton.handlers[3]);
		this.canvas.removeEventListener('modechange', playButton.handlers[4]);
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
	}

	show() {
		this.isVisible = true;
		this.render();
		this.addEvents();
	}

	hide() {
		this.isVisible = false;
		this.clear();
		this.removeEvents();
	}
}

export { PlayButton };
