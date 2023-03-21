class ModeSwitcher {

	darkIcon = '\uF1D2';
	lightIcon = '\uF1D1';

	constructor(canvas, ctx) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.scale();
		this.isLightMode = false;
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
			this.fontSize / 2, 
			0, 
			2 * Math.PI
		);
	}

	addEvents() {
		const canvas = this.canvas;
		const ctx = this.ctx;
		const modeSwitcher = this;

		canvas.addEventListener('mousemove', function(event) {
			ctx.font = `${modeSwitcher.fontSize}px bootstrap-icons`;
			ctx.fillStyle = modeSwitcher.isLightMode ? 'black' : 'white';

			if(ctx.isPointInPath(modeSwitcher.path, event.offsetX, event.offsetY)) {
				ctx.clearRect (
					modeSwitcher.x - modeSwitcher.margin,
					modeSwitcher.y - modeSwitcher.fontSize,
					modeSwitcher.fontSize * 2,
					modeSwitcher.fontSize * 2
				);

				ctx.fillText (
					modeSwitcher.isLightMode ? modeSwitcher.darkIcon : modeSwitcher.lightIcon,
					modeSwitcher.x - modeSwitcher.margin,
					modeSwitcher.y + modeSwitcher.margin
				);

				canvas.style.cursor = 'pointer';
			}

			else {
				ctx.clearRect (
					modeSwitcher.x - modeSwitcher.margin,
					modeSwitcher.y - modeSwitcher.fontSize,
					modeSwitcher.fontSize * 2,
					modeSwitcher.fontSize * 2
				);

				ctx.fillText (
					modeSwitcher.isLightMode ? modeSwitcher.lightIcon : modeSwitcher.darkIcon,
					modeSwitcher.x - modeSwitcher.margin,
					modeSwitcher.y + modeSwitcher.margin
				);

				canvas.style.cursor = 'default';
			}

		});

		canvas.addEventListener('click', function(event) {
			ctx.font = `${modeSwitcher.fontSize}px bootstrap-icons`;
			ctx.fillStyle = modeSwitcher.isLightMode ? 'black' : 'white';

			if(ctx.isPointInPath(modeSwitcher.path, event.offsetX, event.offsetY)) {
				canvas.style.backgroundColor = modeSwitcher.isLightMode ? '#232323' : 'white';
				ctx.fillStyle = modeSwitcher.isLightMode ? 'white' : '#232323';

				ctx.clearRect (
					modeSwitcher.x - modeSwitcher.margin,
					modeSwitcher.y - modeSwitcher.fontSize,
					modeSwitcher.fontSize * 2,
					modeSwitcher.fontSize * 2
				);

				ctx.fillText (
					modeSwitcher.isLightMode ? modeSwitcher.lightIcon : modeSwitcher.darkIcon,
					modeSwitcher.x - modeSwitcher.margin,
					modeSwitcher.y + modeSwitcher.margin
				);

				modeSwitcher.isLightMode = !modeSwitcher.isLightMode;
			}
		});
	}

	clearIcon() {
		this.ctx.clearRect (
			this.x - this.margin, 
			this.y - this.fontSize,
			this.fontSize * 2,
			this.fontSize * 2
		);
	}

	renderIcon() {
		this.clearIcon();
		this.scale();

		this.ctx.font = `${this.fontSize}px bootstrap-icons`;
		this.ctx.fillStyle = this.isLightMode ? 'black' : 'white';

		this.ctx.fillText (
			this.darkIcon,
			this.x - this.margin,
			this.y + this.margin
		);
	}
}

export { ModeSwitcher };
