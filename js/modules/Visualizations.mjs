import { Element } from "./Element.mjs";
import { LinkedList } from './LinkedList.mjs';
import { colors, sleep } from './Utils.mjs';

class Visualizations {
	algorithm;
	elements;
	mementos;
	steps;

	constructor(algorithm) {
		this.algorithm = algorithm;
		this.mementos = new LinkedList();
		this.commands = {};
	}

	async bubbleSortAnimation(stepTime) {
		this.getBubbleSortMementos();
		await this.loopAnimation(stepTime);
	}

	async insertionSortAnimation(stepTime) {
		this.getInsertionSortMementos();
		await this.loopAnimation(stepTime);
	}

	async selectionSortAnimation(stepTime) {
		this.getSelectionSortMementos();
		await this.loopAnimation(stepTime);
	}

	async mergeSortAnimation(stepTime) {
		this.getMergeSortMementos();
		await this.loopAnimation(stepTime);
	}

	async bubbleSortInteractive(stepTime) {
		this.getBubbleSortMementos();
		await this.loopInteractive(stepTime);
	}

	async insertionSortInteractive(stepTime) {
		this.getInsertionSortMementos();
		await this.loopInteractive(stepTime);
	}

	async selectionSortInteractive(stepTime) {
		this.getSelectionSortMementos();
		await this.loopInteractive(stepTime);
	}

	async mergeSortInteractive(stepTime) {
		this.getMergeSortMementos();
		await this.loopInteractive(stepTime);
	}
	
	async loopInteractive() {
		let counter = 0;
		const memento = this.mementos.get(counter).element;
		this.algorithm.elements = memento.getElements();
		this.algorithm.render();

		while(true) {
			let action = await this.awaitListener('step', this.algorithm.canvas);

			if(action == 'next') {
				counter++;

				const node = this.mementos.get(counter);
				if(node == null) break;
				
				const memento = node.element;
				this.algorithm.elements = memento.getElements();
				this.algorithm.render();
			}
			else {
				counter--;

				const node = this.mementos.get(counter);
				if(node == null) {
					counter++;
					continue;
				};

				const memento = node.element;
				this.algorithm.elements = memento.getElements();
				this.algorithm.render();
			}
		}

		this.mementos.clear();
	}

	async loopAnimation(stepTime) {
		let counter = 0;
		while(this.mementos.get(counter) != null) {
			const memento = this.mementos.get(counter).element;
			this.algorithm.elements = memento.getElements();
			this.algorithm.render();
			await sleep(stepTime);

			counter++;
		}

		this.mementos.clear();
	}

	setCommand(name, command) { this.commands[name] = command; }

	save() {
		const elements = [];

		for(let i = 0; i < this.algorithm.elements.length; i++) {
			let element = new Element();

			for(const property in this.algorithm.elements[i])
				element[property] = JSON.parse(JSON.stringify(this.algorithm.elements[i][property]));

			elements.push(element);
		}

		const memento = new Memento(elements);
		this.mementos.add(memento);
	}

	// await until 'event' is fired on the passed element
	async awaitListener(event, element) {
		return new Promise(resolve => {
			element.addEventListener(event, (e) => {
				resolve(e.action);
			}, { once: true });
		});
	}

	getBubbleSortMementos() {
		for (let i = 0; i < this.algorithm.elements.length - 1; i++) {
			for (let j = 0; j < this.algorithm.elements.length - i - 1; j++) {
				this.algorithm.elements[j].color = colors.purple;
				this.algorithm.elements[j + 1].color = colors.purple;
				this.save();
				
				if (this.algorithm.elements[j].value > this.algorithm.elements[j + 1].value) {
					this.algorithm.elements[j].color = colors.green;
					this.algorithm.elements[j + 1].color = colors.green;
					this.save();
					
					let temp = this.algorithm.elements[j];
					this.algorithm.elements[j] = this.algorithm.elements[j + 1];
					this.algorithm.elements[j + 1] = temp;
					temp = this.algorithm.elements[j].x;
					this.algorithm.elements[j].x = this.algorithm.elements[j + 1].x;
					this.algorithm.elements[j + 1].x = temp;
					this.save();
				}

				this.algorithm.elements[j].color = this.algorithm.elementsColor;
				this.algorithm.elements[j + 1].color = this.algorithm.elementsColor;
				this.save();
			}
		}
	}
	
	getInsertionSortMementos() {
		for (let i = 0; i < this.algorithm.elements.length; i++) {
			let j = i;
			this.algorithm.elements[i].color = colors.orange;
			this.save();

			while (j > 0) {
				this.algorithm.elements[j].color = colors.purple;
				this.algorithm.elements[j - 1].color = colors.purple;
				this.save();

				if (this.algorithm.elements[j - 1].value > this.algorithm.elements[j].value) {
					this.algorithm.elements[j].color = colors.green;
					this.algorithm.elements[j-1].color = colors.green;
					this.save();
					
					let temp = this.algorithm.elements[j];
					this.algorithm.elements[j] = this.algorithm.elements[j - 1];
					this.algorithm.elements[j-1] = temp;

					temp = this.algorithm.elements[j].x;
					this.algorithm.elements[j].x = this.algorithm.elements[j - 1].x;
					this.algorithm.elements[j - 1].x = temp;
					this.save();
				}
				
				this.algorithm.elements[j].color = this.algorithm.elementsColor;
				this.algorithm.elements[j - 1].color = this.algorithm.elementsColor;
				j--;
			}

			this.save();
		}
	}

	getSelectionSortMementos() {
		let minIndex;
		for (let i = 0; i < this.algorithm.elements.length - 1; i++) {
			minIndex = i;
			this.save();

			for (let j = i + 1; j < this.algorithm.elements.length; j++) {
				this.algorithm.elements[i].color = colors.purple;
				this.algorithm.elements[j].color = colors.purple;
				this.save();
				
				if(this.algorithm.elements[j].value < this.algorithm.elements[minIndex].value) {
					this.algorithm.elements[minIndex].color = this.algorithm.elementsColor;
					this.algorithm.elements[i].color = colors.orange;
					minIndex = j;
					this.algorithm.elements[j].color = colors.green;
					this.save();
				} else {
					this.algorithm.elements[j].color = this.algorithm.elementsColor;
				}
			}

			let temp = this.algorithm.elements[i];
			this.algorithm.elements[i] = this.algorithm.elements[minIndex];
			this.algorithm.elements[minIndex] = temp;

			temp = this.algorithm.elements[i].x;
			this.algorithm.elements[i].x = this.algorithm.elements[minIndex].x;
			this.algorithm.elements[minIndex].x = temp;

			this.algorithm.elements[i].color = this.algorithm.elementsColor;
			this.algorithm.elements[minIndex].color = this.algorithm.elementsColor;
			this.save();
		}
	}

	getMergeSortMementos() {

		for(let element of this.algorithm.elements) {
			element.y -= this.algorithm.canvas.height / 4;
		}

		let leftIndex = 0;
		let rightIndex = this.algorithm.elements.length - 1;

		this.algorithm.elements[leftIndex].color = colors.green;
		this.algorithm.elements[rightIndex].color = colors.green;
		this.save();

		this.algorithm.elements[leftIndex].color = this.algorithm.elementsColor;
		this.algorithm.elements[rightIndex].color = this.algorithm.elementsColor;

		this.sort(this.algorithm, leftIndex, rightIndex);
		
		for (let element of this.algorithm.elements) element.color = this.algorithm.elementsColor;
		this.save();
	}

	sort(algorithm, leftIndex, rightIndex) {
		if (leftIndex >= rightIndex) return;

		const middleIndex = Math.trunc((leftIndex + rightIndex) / 2);

		this.algorithm.elements[middleIndex].color = colors.purple;
		this.save();
		this.algorithm.elements[middleIndex].color = this.algorithm.elementsColor;

		this.sort(this.algorithm, leftIndex, middleIndex);
		this.sort(this.algorithm, middleIndex + 1, rightIndex);
		this.merge(this.algorithm, leftIndex, middleIndex, rightIndex);
 	}

	merge(algorithm, leftIndex, middleIndex, rightIndex) {
		const lArrayLength = middleIndex - leftIndex + 1;
		const rArrayLength = rightIndex - middleIndex;

		let lArray = [];
		let rArray = [];
		const xValues = this.algorithm.elements.map(element => element.x);

		for (let i = 0; i < lArrayLength; i++) {
			lArray[i] = this.algorithm.elements[leftIndex + i];
			this.algorithm.elements[leftIndex + i].color = colors.purple;
		}

		for (let i = 0; i < rArrayLength; i++) {
			rArray[i] = this.algorithm.elements[(middleIndex + 1) + i];
			this.algorithm.elements[middleIndex + 1 + i].color = colors.orange;
		}
		this.save();
		
		let lArrayIndex = 0;
		let rArrayIndex = 0;
		let mergedArrayIndex = leftIndex;

		while(lArrayIndex < lArrayLength && rArrayIndex < rArrayLength) {

			if (lArray[lArrayIndex].value <= rArray[rArrayIndex].value) {
				this.algorithm.elements[mergedArrayIndex] = lArray[lArrayIndex];
				this.algorithm.elements[mergedArrayIndex].x = xValues[mergedArrayIndex];
				lArrayIndex++;
			}
			else {
				this.algorithm.elements[mergedArrayIndex] = rArray[rArrayIndex];
				this.algorithm.elements[mergedArrayIndex].x = xValues[mergedArrayIndex];
				rArrayIndex++;
			}
			
			mergedArrayIndex++;
		}

		while(lArrayIndex < lArrayLength) {
			this.algorithm.elements[mergedArrayIndex] = lArray[lArrayIndex];
			this.algorithm.elements[mergedArrayIndex].x = xValues[mergedArrayIndex];
			lArrayIndex++;
			mergedArrayIndex++;
		}	

		while(rArrayIndex < rArrayLength) {
			this.algorithm.elements[mergedArrayIndex] = rArray[rArrayIndex];
			this.algorithm.elements[mergedArrayIndex].x = xValues[mergedArrayIndex];
			rArrayIndex++;
			mergedArrayIndex++;
		}

		this.save();

		for (let element of this.algorithm.elements) element.color = this.algorithm.elementsColor;
	}
	
}

class Memento {
	elements;
	constructor(elements) { this.elements = elements; }
	getElements() { return this.elements; }
}

export { Visualizations };
