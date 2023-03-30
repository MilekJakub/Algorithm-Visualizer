import { Element } from "./Element.mjs";

class Visualizer {

	algorithm;
	elements;
	mementos;

	purpleColor = '#6611ff';
	greenColor = '#88ff44';
	orangeColor = '#ffaa00';

	constructor(algorithm) {
		this.algorithm = algorithm;
		this.mementos = [];
	}

	async bubbleSortAnimation() {
		for (let i = 0; i < this.algorithm.elements.length - 1; i++) {
			for (let j = 0; j < this.algorithm.elements.length - i - 1; j++) {
				this.algorithm.elements[j].color = this.purpleColor;
				this.algorithm.elements[j + 1].color = this.purpleColor;
				await this.sleep(100);
				this.algorithm.render();
				
				if (this.algorithm.elements[j].value > this.algorithm.elements[j + 1].value) {
					this.algorithm.elements[j].color = this.greenColor;
					this.algorithm.elements[j + 1].color = this.greenColor;
					await this.sleep(100);
					this.algorithm.render();
					
					let temp = this.algorithm.elements[j];
					this.algorithm.elements[j] = this.algorithm.elements[j + 1];
					this.algorithm.elements[j + 1] = temp;
					temp = this.algorithm.elements[j].x;
					this.algorithm.elements[j].x = this.algorithm.elements[j + 1].x;
					this.algorithm.elements[j + 1].x = temp;
					await this.sleep(100);
					this.algorithm.render();
				}

				this.algorithm.elements[j].color = this.algorithm.elementsColor;
				this.algorithm.elements[j + 1].color = this.algorithm.elementsColor;
				await this.sleep(100);
				this.algorithm.render();
			}
		}
	}

	async bubbleSortInteractive() {
		let step = 1;
		let action;
		this.i = 0;
		this.j = 0;

		for (this.i; this.i < this.algorithm.elements.length - 1; this.i++) {
			this.j = 0;
			for (this.j; this.j < this.algorithm.elements.length - this.i - 1;) {

				switch (step) {
					case 1:
						if(action != 'undo') {
							this.algorithm.elements[this.j].color = this.purpleColor;
							this.algorithm.elements[this.j + 1].color = this.purpleColor;
							this.algorithm.render();
						}

						action = await this.keyPress();
						if(action == 'undo') {
							this.algorithm.render();
							this.i--;
							step = 4;
							break;
						} else {
							if (this.algorithm.elements[this.j].value > this.algorithm.elements[this.j + 1].value) {
								step = 2;
								break;
							} else {
								step = 4;
								break;
							}
						}

					case 2:
						if(action != 'undo') {
							this.algorithm.elements[this.j].color = this.greenColor;
							this.algorithm.elements[this.j + 1].color = this.greenColor;
							this.algorithm.render();
						}
						action = await this.keyPress();
						if(action == 'undo') {
							this.algorithm.render();
							step = 1;
							break;
						} else {
							step = 3;
							break;
						}

					case 3:

						if(action != 'undo') {
							let temp = this.algorithm.elements[this.j];
							this.algorithm.elements[this.j] = this.algorithm.elements[this.j + 1];
							this.algorithm.elements[this.j + 1] = temp;

							temp = this.algorithm.elements[this.j].x;
							this.algorithm.elements[this.j].x = this.algorithm.elements[this.j + 1].x;
							this.algorithm.elements[this.j + 1].x = temp;
							this.algorithm.render();
						}

						action = await this.keyPress();
						if(action == 'undo') {
							this.algorithm.render();
							step = 2;
							break;
						} else {
							step = 4;
							break;
						}

					
					case 4:
						if(action != 'undo') {
							this.algorithm.elements[this.j].color = this.algorithm.elementsColor;
							this.algorithm.elements[this.j + 1].color = this.algorithm.elementsColor;
							this.algorithm.render();
						}

						action = await this.keyPress();
						if(action == 'undo') {
							if (this.algorithm.elements[this.j + 1].value > this.algorithm.elements[this.j].value) {
								this.algorithm.render();
								step = 3;
								break;
							} else {
								this.algorithm.render();
								step = 1;
								break;
							}
						} else {
							step = 1;
							this.j++;
							break;
						} 
				}
			}
		}

		this.mementos = [];
	}

	save() {
		const elements = [];
		for(let i = 0; i < this.algorithm.elements.length; i++) {
			let element = new Element();
			for(const property in this.algorithm.elements[i]) {
				element[property] = JSON.parse(JSON.stringify(this.algorithm.elements[i][property]));
			}
			elements.push(element);
		}
		const values = {
			elements: elements,
			i: this.i,
			j: this.j
		}

		const memento = new Memento(values);
		this.mementos.push(memento);
	}
	
	undo() {
		if(this.mementos.length <= 0)
			return false;

		const memento = this.mementos.pop();
		const values = memento.getValues();
		
		this.algorithm.elements = values.elements;
		this.i = values.i;
		this.j = values.j;

		return true;
	}

	sleep(time) {
		return new Promise(resolve => setTimeout(resolve, time));
	}

	async keyPress() {
		let result;

		while(true) {
			await this.keypressPromise()
				.then(message => {
					result = message;
				})

				.catch(() => {
					result = null;
				})

			if(result) break;
		}
	
		return result;
	}

	async keypressPromise() {
		const visualizer = this;
		return new Promise((resolve, reject) => {

			const onKeyHandler = async function(e) {
				e = e || window.event;
				switch(e.keyCode) {

					case 37:
						if(visualizer.undo())
							resolve('undo');
						else
							reject();
						break;

					case 39:
						visualizer.save();
						resolve('next');
						break;
				}
			}

			document.addEventListener('keydown', onKeyHandler, { once: true });
		});
	}
}

class Memento {
	values;

	constructor(values) {
		this.values = values;
	}

	getValues() {
		return this.values;
	}
}

export { Visualizer };
