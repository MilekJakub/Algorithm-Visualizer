class Button {

	canvas;
	previousCanvasDimensions;
	ctx;
	font;
	fontSize;
	icon;
	x;
	y;
	scaleFactorX;
	scaleFactorY;
	margin;
	isVisible;
	isMouseOver;
	commands;
	events;
	handlers;

	constructor(canvas, font, icon, x, y) {
		this.canvas = canvas;
		this.previousCanvasDimensions = {
			clientWidth: canvas.clientWidth,
			clientHeight: canvas.clientHeight
		};
		this.ctx = canvas.getContext('2d');
		this.font = font;
		this.icon = icon;
		this.x = x;
		this.y = y;
		this.scale();
		this.commands = {};
		this.events = [
			'click',
			'mousemove',
			'mouseoverbutton',
			'mouseleavebutton',
			'themechange'
		];
		this.handlers = [];
		this.show();
	}

	scale() {
		this.scaleFactorX = this.canvas.width / this.previousCanvasDimensions.clientWidth;
		this.scaleFactorY = this.canvas.height / this.previousCanvasDimensions.clientHeight;
		this.x *= this.scaleFactorX;
		this.y *= this.scaleFactorY;
		this.previousCanvasDimensions.clientWidth = this.canvas.clientWidth;
		this.previousCanvasDimensions.clientHeight = this.canvas.clientHeight;

    // magic number '18'
		this.fontSize = this.canvas.height / 18;
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

	render() {
		if(!this.isVisible) return;
		this.clear();
		this.scale();
		this.ctx.font = `${this.fontSize}px ${this.font}`;
		this.ctx.fillStyle = this.canvas.theme == 'light' ? 'black' : 'white';

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
		document.body.classList.remove('pointer');
		this.isVisible = false;
		this.clear();
		this.removeEvents();
	}

  setCommand(name, command) {
		this.commands[name] = command;
	}

	addEvents() {
		this.events.forEach(eventName => {
			const handlerInfo = { 
				eventName: eventName,
				handler: this[`handle_${eventName}`].bind(this)
			}
			this.handlers.push(handlerInfo);

			this.canvas.addEventListener(handlerInfo.eventName, handlerInfo.handler);
		});
	}

	removeEvents() {
		this.handlers.forEach(handlerInfo => {
			this.canvas.removeEventListener(handlerInfo.eventName, handlerInfo.handler);
		});
		this.handlers = [];
	}

	async handle_click(event) {
		if(!this.ctx.isPointInPath(this.path, event.offsetX, event.offsetY))
			return;
		
		await this.commands['click'].execute();
	}

	handle_mousemove(event) {
		if(this.ctx.isPointInPath(this.path, event.offsetX, event.offsetY)) {
			if(!this.isMouseOver) {
				this.canvas.dispatchEvent(new Event('mouseoverbutton'));
				this.isMouseOver = true;
			}
		}
		else {
			if(this.isMouseOver) {
				this.canvas.dispatchEvent(new Event('mouseleavebutton'));
				this.isMouseOver = false;
			}
		}
	}

	handle_mouseoverbutton() {
		document.body.classList.add('pointer');
	}

	handle_mouseleavebutton() {
		document.body.classList.remove('pointer');
	}

	handle_themechange() {
		this.render();
	}
}

export { Button };
