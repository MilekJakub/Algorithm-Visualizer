import { Element } from './element.mjs';

class Algorithm {

	constructor(values, canvas, ctx) {

		const elements = [];
		for (let i = 0; i < values.length; i++) {
			let element = new Element();
			element.value = values[i];
			element.color = 'red';
			elements.push(element);
		}

		this.margin = 2;
		this.fontFamily = 'Monospace';
		this.elementsColor = 'red';

		this.elements = elements;	
		this.canvas = canvas;
		this.ctx = ctx;
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
		this.hop = 0.0;
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

	scale() {
		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;

		this.scaleWidth();
		this.scaleHeight();
		this.scaleFont();
	}

	setCoordinates() {
		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;

		const algorithmWidth = (this.commonElementWidth * this.elements.length) + (this.margin * (this.elements.length - 1));
		const algorithmHeight = this.hop * (this.elements.length - 1);
		const x = (this.canvas.width - algorithmWidth) / 2;
		const y = this.canvas.height - (this.canvas.height - algorithmHeight) / 2;
		
		for (let i = 0; i < this.elements.length; i++) {
			this.elements[i].x = x + (this.margin * i + this.commonElementWidth * i);
			this.elements[i].y = y - this.elements[i].value * this.hop;
			this.elements[i].width = this.commonElementWidth;
			this.elements[i].height = this.elements[i].value * this.hop;
			this.elements[i].font = `${this.fontSize}px ${this.fontFamily}`;
		}
	}

	render() {
		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;
		this.clear();
		this.scale();
		this.setCoordinates();

		for (let i = 0; i < this.elements.length; i++) {
			this.elements[i].draw(this.ctx);
			this.elements[i].drawText(this.ctx);
		}
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	shuffle() {
		for (let i = 0; i < this.elements.length * 2; i++) {
			let firstElIndex = this.randomNumber(0, this.elements.length);
			let secondElIndex = this.randomNumber(0, this.elements.length);
			let temp;

			temp = this.elements[firstElIndex];
			this.elements[firstElIndex] = this.elements[secondElIndex];
			this.elements[secondElIndex] = temp;

			temp = this.elements[firstElIndex].x;
			this.elements[firstElIndex].x = this.elements[secondElIndex].x;
			this.elements[secondElIndex].x = temp;
		}
	}

	randomNumber(min, max) { 
		let random = Math.floor(Math.random() * (max - min)) + min;
	
		do {
			random = Math.floor(Math.random() * (max - min)) + min;
		} while (random === this.randomNumber.last);

		this.randomNumber.last = random;
		return random;
	}
}

export { Algorithm };
