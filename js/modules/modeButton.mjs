class ModeButton {

	icon = '\uF1D1';

	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.scale();
		this.render();
		this.addEvents();
	}

	scale() {
		this.fontSize = this.canvas.height / 16;
		this.x = this.canvas.width - this.fontSize;
		this.y = this.fontSize;
		this.margin = this.fontSize / 2;

		this.path = new Path2D();
		this.path.arc (
			this.x, 
			this.y, 
			this.fontSize / 1.6, 
			0, 
			2 * Math.PI
		);
	}

	mouseMoveHandler(modeButton) {
		if(modeButton.ctx.isPointInPath(modeButton.path, event.offsetX, event.offsetY)) {
			if(!modeButton.mouseOver) {
				const mouseOverModeButtonEvent = new Event('mouseovermodebutton');
				modeButton.canvas.dispatchEvent(mouseOverModeButtonEvent);
				modeButton.mouseOver = true;
			}
		}
		else {
			if(modeButton.mouseOver) {
				modeButton.mouseOver = false;
				const mouseLeftModeButtonEvent = new Event('mouseleftmodebutton');
				modeButton.canvas.dispatchEvent(mouseLeftModeButtonEvent);
			}
		}
	}

	mouseClickHandler(modeButton) {
		if(modeButton.ctx.isPointInPath(modeButton.path, event.offsetX, event.offsetY)) {
			const event = new Event('modechange');
			modeButton.canvas.dispatchEvent(event);
		}
	}

	mouseOverHandler(modeButton) {
		modeButton.render();
		document.body.classList.add('pointer');
	}

	mouseLeftHandler(modeButton) {
		modeButton.render();
		document.body.classList.remove('pointer');
	}

	modeChangeHandler(modeButton) {	
		modeButton.canvas.isLightMode = !modeButton.canvas.isLightMode;
		modeButton.canvas.style.backgroundColor = modeButton.canvas.isLightMode ? 'white' : '#232323';
		modeButton.render();
	}

	handlers = [];

	addEvents() {
		const modeButton = this;

		this.handlers.push(function mouseMoveHandler() { modeButton.mouseMoveHandler(modeButton) });
		this.handlers.push(function mouseClickHandler() { modeButton.mouseClickHandler(modeButton) });
		this.handlers.push(function mouseOverHandler() { modeButton.mouseOverHandler(modeButton) });
		this.handlers.push(function mouseLeftHandler() { modeButton.mouseLeftHandler(modeButton) });
		this.handlers.push(function mouseChangeHandler() { modeButton.modeChangeHandler(modeButton) });

		this.canvas.addEventListener('mousemove', modeButton.handlers[0]);
		this.canvas.addEventListener('click', modeButton.handlers[1]);
		this.canvas.addEventListener('mouseovermodebutton', modeButton.handlers[2]);
		this.canvas.addEventListener('mouseleftmodebutton', modeButton.handlers[3]);
		this.canvas.addEventListener('modechange', modeButton.handlers[4]);
	}
	
	removeEvents() {
		const modeButton = this;

		this.canvas.removeEventListener('mousemove', modeButton.handlers[0]);
		this.canvas.removeEventListener('click', modeButton.handlers[1]);
		this.canvas.removeEventListener('mouseovermodebutton', modeButton.handlers[2]);
		this.canvas.removeEventListener('mouseleftmodebutton', modeButton.handlers[3]);
		this.canvas.removeEventListener('modechange', modeButton.handlers[4]);
	}

	render() {
		this.clear();
		this.scale();

		this.ctx.font = `${this.fontSize}px bootstrap-icons`;
		this.ctx.fillStyle = this.canvas.isLightMode ? '#232323' : 'white';

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
export { ModeButton };
