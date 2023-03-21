class AlgorithmVisualizer {

	purpleColor = '#6611ff';
	greenColor = '#88ff44';
	orangeColor = '#ffaa00';

	constructor(algorithm) {
		this.algorithm = algorithm;
		this.defaultColor = algorithm.elementsColor;
	}

	sleep(time) {
		return new Promise(resolve => setTimeout(resolve, time));
	}

	awaitKeypress() {
		return new Promise((resolve) => {
			document.addEventListener('keydown', onKeyHandler);
			function onKeyHandler(e) {
				e = e || window.event;
				if (e.keyCode === 39) {
					document.removeEventListener('keydown', onKeyHandler);
					resolve();
				}
			}	
		});
	}

	async bubbleSort() {
		for (let i = 0; i < this.algorithm.elements.length - 1; i++) {
			for (let j = 0; j < this.algorithm.elements.length - i - 1; j++) {
				this.algorithm.elements[j].color = this.purpleColor;
				this.algorithm.elements[j + 1].color = this.purpleColor;
				this.algorithm.render();
				await this.sleep(100);
				
				if (this.algorithm.elements[j].value > this.algorithm.elements[j + 1].value) {
					this.algorithm.elements[j].color = this.greenColor;
					this.algorithm.elements[j + 1].color = this.greenColor;
					this.algorithm.render();
					await this.sleep(100);
					
					let temp = this.algorithm.elements[j];
					this.algorithm.elements[j] = this.algorithm.elements[j + 1];
					this.algorithm.elements[j + 1] = temp;

					temp = this.algorithm.elements[j].x;
					this.algorithm.elements[j].x = this.algorithm.elements[j + 1].x;
					this.algorithm.elements[j + 1].x = temp;
				}

				this.algorithm.elements[j].color = this.defaultColor;
				this.algorithm.elements[j + 1].color = this.defaultColor;
			}
			this.algorithm.elements[i].color = this.defaultColor;
			this.algorithm.render();	
		}
	}

	async stepByStepBubbleSort() {
		for (let i = 0; i < this.algorithm.elements.length - 1; i++) {
			for (let j = 0; j < this.algorithm.elements.length - i - 1; j++) {
				this.algorithm.elements[j].color = this.purpleColor;
				this.algorithm.elements[j + 1].color = this.purpleColor;
				this.algorithm.render();
				await this.awaitKeypress();
				
				if (this.algorithm.elements[j].value > this.algorithm.elements[j + 1].value) {
					this.algorithm.elements[j].color = this.greenColor;
					this.algorithm.elements[j + 1].color = this.greenColor;
					this.algorithm.render();
					await this.awaitKeypress();
					
					let temp = this.algorithm.elements[j];
					this.algorithm.elements[j] = this.algorithm.elements[j + 1];
					this.algorithm.elements[j + 1] = temp;

					temp = this.algorithm.elements[j].x;
					this.algorithm.elements[j].x = this.algorithm.elements[j + 1].x;
					this.algorithm.elements[j + 1].x = temp;
				}

				this.algorithm.elements[j].color = this.defaultColor;
				this.algorithm.elements[j + 1].color = this.defaultColor;
			}
			this.algorithm.elements[i].color = this.defaultColor;
			this.algorithm.render();	
		}
	}

	async insertionSort() {
		for (let i = 0; i < this.algorithm.elements.length; i++) {
			let j = i;
			this.algorithm.elements[i].color = this.orangeColor;
			this.algorithm.render();
			await this.sleep(100);

			while (j > 0) {
				this.algorithm.elements[j].color = this.purpleColor;
				this.algorithm.elements[j - 1].color = this.purpleColor;
				this.algorithm.render();
				await this.sleep(100);

				if (this.algorithm.elements[j - 1].value > this.algorithm.elements[j].value) {
					this.algorithm.elements[j].color = this.greenColor;
					this.algorithm.elements[j-1].color = this.greenColor;
					this.algorithm.render();
					await this.sleep(100);
					
					let temp = this.algorithm.elements[j];
					this.algorithm.elements[j] = this.algorithm.elements[j - 1];
					this.algorithm.elements[j-1] = temp;

					temp = this.algorithm.elements[j].x;
					this.algorithm.elements[j].x = this.algorithm.elements[j - 1].x;
					this.algorithm.elements[j - 1].x = temp;
				}
				
				this.algorithm.elements[j].color = this.defaultColor;
				this.algorithm.elements[j - 1].color = this.defaultColor;
				j--;
			}

			this.algorithm.render();
		}	
	}

	async selectionSort() {
		let minIndex;
		for (let i = 0; i < this.algorithm.elements.length - 1; i++) {
			minIndex = i;
			this.algorithm.render();

			for (let j = i + 1; j < this.algorithm.elements.length; j++) {
				this.algorithm.elements[i].color = this.purpleColor;
				this.algorithm.elements[j].color = this.purpleColor;
				this.algorithm.render();
				await this.sleep(100);
				
				if(this.algorithm.elements[j].value < this.algorithm.elements[minIndex].value) {
					this.algorithm.elements[minIndex].color = this.defaultColor;
					this.algorithm.elements[i].color = this.orangeColor;
					minIndex = j;
					this.algorithm.elements[j].color = this.greenColor;
					this.algorithm.render();
					await this.sleep(100);
				} else {
					this.algorithm.elements[j].color = this.defaultColor;
				}
			}

			let temp = this.algorithm.elements[i];
			this.algorithm.elements[i] = this.algorithm.elements[minIndex];
			this.algorithm.elements[minIndex] = temp;

			temp = this.algorithm.elements[i].x;
			this.algorithm.elements[i].x = this.algorithm.elements[minIndex].x;
			this.algorithm.elements[minIndex].x = temp;

			this.algorithm.elements[i].color = this.defaultColor;
			this.algorithm.elements[minIndex].color = this.defaultColor;
			this.algorithm.render();
		}
	}

	async mergeSort() { let leftIndex = 0;
		let rightIndex = this.algorithm.elements.length - 1;

		this.algorithm.elements[leftIndex].color = this.greenColor;
		this.algorithm.elements[rightIndex].color = this.greenColor;
		this.algorithm.render();
		await this.sleep(100);

		this.algorithm.elements[leftIndex].color = this.defaultColor;
		this.algorithm.elements[rightIndex].color = this.defaultColor;

		await this.Sort(leftIndex, rightIndex);
		
		for (let element of this.algorithm.elements) element.color = this.defaultColor;
		this.algorithm.render();
		await this.sleep(500);
	}

	async sort(leftIndex, rightIndex) {
		if (leftIndex >= rightIndex) return;

		const middleIndex = Math.trunc((leftIndex + rightIndex) / 2);

		this.algorithm.elements[middleIndex].color = this.purpleColor;
		this.algorithm.render();
		await this.sleep(100);
		this.algorithm.elements[middleIndex].color = this.defaultColor;

		await this.sort(leftIndex, middleIndex);
		await this.sort(middleIndex + 1, rightIndex);
		await this.merge(leftIndex, middleIndex, rightIndex);
 	}

	async merge(leftIndex, middleIndex, rightIndex) {
		const lArrayLength = middleIndex - leftIndex + 1;
		const rArrayLength = rightIndex - middleIndex;

		let lArray = [];
		let rArray = [];
		const xValues = this.algorithm.elements.map(element => element.x);

		for (let i = 0; i < lArrayLength; i++) {
			lArray[i] = this.algorithm.elements[leftIndex + i];
			this.algorithm.elements[leftIndex + i].color = '#1166ff';
		}

		for (let i = 0; i < rArrayLength; i++) {
			rArray[i] = this.algorithm.elements[(middleIndex + 1) + i];
			this.algorithm.elements[(middleIndex + 1) + i].color = '#ffcc44';
		}

		this.algorithm.render();
		await this.sleep(100);let lArrayIndex = 0;

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

		this.algorithm.render();
		await this.sleep(100);

		for (let element of this.algorithm.elements) element.color = this.defaultColor;
	}
}

export { AlgorithmVisualizer };
