class ModeSwitcher {

	constructor(canvas, ctx) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.setCoordinates();
		this.isLightMode = false;
	}

	setCoordinates() {
		
		this.fontSize = this.canvas.height / 16;
		this.x = this.canvas.width - this.fontSize;
		this.y = this.fontSize;
		this.margin = this.fontSize / 2;

		this.path = new Path2D();
		this.path.arc(this.x, this.y, this.fontSize / 2, 0, 2 * Math.PI);
	}

	clearIcon() {
		this.ctx.clearRect(this.x - this.margin, this.y - this.fontSize, this.fontSize * 2, this.fontSize * 2);
	}

	renderIcon() {
		this.setCoordinates();	

		let darkIcon = '\uF1D2';
		let lightIcon = '\uF1D1';

		this.ctx.font = `${this.fontSize}px bootstrap-icons`;
		this.ctx.fillStyle = this.isLightMode ? 'black' : 'white';
		this.ctx.fillText(darkIcon, this.x - this.margin, this.y + this.margin);
		
		const path = this.path;
		const ctx = this.ctx;
		const x = this.x;
		const y = this.y;
		const margin = this.margin;
		const fontSize = this.fontSize;
		let isLightMode = this.isLightMode;

		this.canvas.addEventListener('mousemove', function(event) {
			ctx.font = `${fontSize}px bootstrap-icons`;
			ctx.fillStyle = isLightMode ? 'black' : 'white';

			if(ctx.isPointInPath(path, event.offsetX, event.offsetY)) {
				if(isLightMode) {
					ctx.clearRect(x - margin, y - fontSize, fontSize * 2, fontSize * 2);
					ctx.fillText(darkIcon, x - margin, y + margin);
					canvas.style.cursor = 'pointer';
				}

				else {
					ctx.clearRect(x - margin, y - fontSize, fontSize * 2, fontSize * 2);
					ctx.fillText(lightIcon, x - margin, y + margin);
					canvas.style.cursor = 'pointer';
				}
			}

			else {
				if(isLightMode) {
					ctx.clearRect(x - margin, y - fontSize, fontSize * 2, fontSize * 2);
					ctx.fillText(lightIcon, x - margin, y + margin);				
					canvas.style.cursor = 'default';
				}

				else {
					ctx.clearRect(x - margin, y - fontSize, fontSize * 2, fontSize * 2);
					ctx.fillText(darkIcon, x - margin, y + margin);
					canvas.style.cursor = 'default';
				}			
			}
		});

		this.canvas.addEventListener('click', function(event) {
			ctx.font = `${fontSize}px bootstrap-icons`;
			ctx.fillStyle = isLightMode ? 'black' : 'white';

			if(ctx.isPointInPath(path, event.offsetX, event.offsetY)) {
				ctx.clearRect(x - margin, y - fontSize, fontSize * 2, fontSize * 2);

				if(isLightMode) {
					canvas.style.backgroundColor = '#232323';
					isLightMode = false;
					ctx.fillStyle = 'white';
					ctx.fillText(lightIcon, x - margin, y + margin);				
				}

				else {
					canvas.style.backgroundColor = 'white';
					isLightMode = true;
					ctx.fillStyle = 'black';
					ctx.fillText(darkIcon, x - margin, y + margin);				
				}
			}

			this.isLightMode = isLightMode;
		});
	}
}

export { ModeSwitcher };
