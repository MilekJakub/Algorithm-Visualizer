import { Element } from './Element.mjs';

class Algorithm {

	constructor(options) {
		
		const elements = [];
		for (let i = 0; i < options.values.length; i++) {
			let element = new Element();
			element.value = options.values[i];
			element.color = 'red';
			elements.push(element);
		}

		this.margin = options.margin;
		this.fontFamily = 'Monospace';
		this.elementsColor = 'red';
		this.displayFont = options.displayFont;

		this.elements = elements;	
		this.canvas = options.canvas;
		this.ctx = options.canvas.getContext('2d');
		this.render();
	}

	scale() {
		this.scaleWidth();
		this.scaleHeight();
		this.scaleFont();
	}

	calculateAlgorithmArea() {
		this.algorithmWidth = (this.commonElementWidth * this.elements.length) + (this.margin * (this.elements.length - 1));
		this.algorithmHeight = this.hop * (this.elements.length);
		this.x = (this.canvas.width - this.algorithmWidth) / 2;
		this.y = this.canvas.height - (this.canvas.height - this.algorithmHeight) / 2;
	}

	setCoordinates() {
		for (let i = 0; i < this.elements.length; i++) {
			this.elements[i].x = this.x + (this.margin * i + this.commonElementWidth * i);
			this.elements[i].y = this.y - this.elements[i].value * this.hop;
			this.elements[i].width = this.commonElementWidth;
			this.elements[i].height = this.elements[i].value * this.hop;
			this.elements[i].font = `${this.fontSize}px ${this.fontFamily}`;
		}
	}

	render() {
		this.scale();
		this.calculateAlgorithmArea();
		this.clear();
		this.setCoordinates();
		
		if(this.displayFont) {
			for (let i = 0; i < this.elements.length; i++) {
				this.elements[i].draw(this.ctx);
				this.elements[i].drawText(this.ctx);
			}
		}
		else {
			for (let i = 0; i < this.elements.length; i++) {
				this.elements[i].draw(this.ctx);
			}
		}
	}

	// clears only algorithm area
	// if resizing without error margin, it leaves uncleared pixels
	clear() {
		let errorMargin = 4;

		this.ctx.clearRect (
			this.x - errorMargin, 
			this.y - this.algorithmHeight - errorMargin,
			this.algorithmWidth + 2 * errorMargin,
			this.algorithmHeight + this.fontSize + 2 * errorMargin
		);
	}

	shuffle() {
		for (let i = 0; i < this.elements.length * 2; i++) {
			let firstElIndex = this.randomNumberWithoutRepeat(0, this.elements.length);
			let secondElIndex = this.randomNumberWithoutRepeat(0, this.elements.length);
			let temp;

			temp = this.elements[firstElIndex];
			this.elements[firstElIndex] = this.elements[secondElIndex];
			this.elements[secondElIndex] = temp;

			temp = this.elements[firstElIndex].x;
			this.elements[firstElIndex].x = this.elements[secondElIndex].x;
			this.elements[secondElIndex].x = temp;
		}
	}


	scaleWidth() {
		this.commonElementWidth = 0;
		const marginsWidth = this.margin * (this.elements.length - 1);
		const sideMargin = this.canvas.width / 4;
		const maximumWidth = this.canvas.width - sideMargin;
		const maximumElementWidth = 42;
		let elementsWidth = this.elements.length * this.commonElementWidth;

		while (elementsWidth + marginsWidth <= maximumWidth && this.commonElementWidth <= maximumElementWidth) {
			this.commonElementWidth += 1;
			elementsWidth = this.commonElementWidth * this.elements.length;
		}
	}

	scaleHeight() {
		this.hop = 0;
		const maxValue = Math.max(...this.elements.map(o => o.value));
		let largestHeight = maxValue * this.hop;
		const topMargin = this.canvas.height / 8;
		const maximumHeight = (this.canvas.height / 2) - topMargin;

		while (largestHeight <= maximumHeight) {
			this.hop += 0.1;
			largestHeight = maxValue * this.hop;
		}
	}

	scaleFont() {
		this.fontSize = 0;
		const maxValue = Math.max(...this.elements.map(o => o.value));
		const maxFontSize = 16;
		let font = `${this.fontSize}px ${this.fontFamily}`;
		this.ctx.font = font;
		let textWidth = this.ctx.measureText(maxValue).width;
		const textMargin = this.commonElementWidth / 2;
		const maxTextWidth = this.commonElementWidth - textMargin;

		while (textWidth <= maxTextWidth && this.fontSize <= maxFontSize) {
			this.fontSize++;
			this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
			textWidth = this.ctx.measureText(maxValue).width;
		}
	}

	randomNumberWithoutRepeat(min, max) { 
		let random = Math.floor(Math.random() * (max - min)) + min;
	
		do {
			random = Math.floor(Math.random() * (max - min)) + min;
		} while (random === this.randomNumberWithoutRepeat.last);

		this.randomNumberWithoutRepeat.last = random;
		return random;
	}
}

export { Algorithm };
