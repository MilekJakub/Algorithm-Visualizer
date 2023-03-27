class AlgorithmVisualizer {

	static purpleColor = '#6611ff';
	static greenColor = '#88ff44';
	static orangeColor = '#ffaa00';

	static sleep(time) {
		return new Promise(resolve => setTimeout(resolve, time));
	}

	static async awaitKeypress() {
		return new Promise((resolve) => {
			document.addEventListener('keydown', onKeyHandler, { once: true });
			function onKeyHandler(e) {
				e = e || window.event;
				if (e.keyCode === 39) {
					resolve();
				}
			}	
		});
	}

	static async bubbleSort(algorithm) {
		for (let i = 0; i < algorithm.elements.length - 1; i++) {
			for (let j = 0; j < algorithm.elements.length - i - 1; j++) {
				algorithm.elements[j].color = AlgorithmVisualizer.purpleColor;
				algorithm.elements[j + 1].color = AlgorithmVisualizer.purpleColor;
				algorithm.render();
				await AlgorithmVisualizer.sleep(100);
				
				if (algorithm.elements[j].value > algorithm.elements[j + 1].value) {
					algorithm.elements[j].color = AlgorithmVisualizer.greenColor;
					algorithm.elements[j + 1].color = AlgorithmVisualizer.greenColor;
					algorithm.render();
					await AlgorithmVisualizer.sleep(100);
					
					let temp = algorithm.elements[j];
					algorithm.elements[j] = algorithm.elements[j + 1];
					algorithm.elements[j + 1] = temp;

					temp = algorithm.elements[j].x;
					algorithm.elements[j].x = algorithm.elements[j + 1].x;
					algorithm.elements[j + 1].x = temp;
				}

				algorithm.elements[j].color = algorithm.elementsColor;
				algorithm.elements[j + 1].color = algorithm.elementsColor;
			}
			algorithm.elements[i].color = algorithm.elementsColor;
			algorithm.render();	
		}
	}

	static async stepByStepBubbleSort(algorithm) {
		for (let i = 0; i < algorithm.elements.length - 1; i++) {
			for (let j = 0; j < algorithm.elements.length - i - 1; j++) {
				algorithm.elements[j].color = AlgorithmVisualizer.purpleColor;
				algorithm.elements[j + 1].color = AlgorithmVisualizer.purpleColor;
				algorithm.render();
				await AlgorithmVisualizer.awaitKeypress();
				
				if (algorithm.elements[j].value > algorithm.elements[j + 1].value) {
					algorithm.elements[j].color = AlgorithmVisualizer.greenColor;
					algorithm.elements[j + 1].color = AlgorithmVisualizer.greenColor;
					algorithm.render();
					await AlgorithmVisualizer.awaitKeypress();
					
					let temp = algorithm.elements[j];
					algorithm.elements[j] = algorithm.elements[j + 1];
					algorithm.elements[j + 1] = temp;

					temp = algorithm.elements[j].x;
					algorithm.elements[j].x = algorithm.elements[j + 1].x;
					algorithm.elements[j + 1].x = temp;
	
					algorithm.render();
					await AlgorithmVisualizer.awaitKeypress();
				}

				algorithm.elements[j].color = algorithm.elementsColor;
				algorithm.elements[j + 1].color = algorithm.elementsColor;
			}
			algorithm.elements[i].color = algorithm.elementsColor;
			algorithm.render();	
		}
	}

	static async insertionSort(algorithm) {
		for (let i = 0; i < algorithm.elements.length; i++) {
			let j = i;
			algorithm.elements[i].color = AlgorithmVisualizer.orangeColor;
			algorithm.render();
			await this.sleep(100);

			while (j > 0) {
				algorithm.elements[j].color = AlgorithmVisualizer.purpleColor;
				algorithm.elements[j - 1].color = AlgorithmVisualizer.purpleColor;
				algorithm.render();
				await this.sleep(100);

				if (algorithm.elements[j - 1].value > algorithm.elements[j].value) {
					algorithm.elements[j].color = AlgorithmVisualizer.greenColor;
					algorithm.elements[j-1].color = AlgorithmVisualizer.greenColor;
					algorithm.render();
					await this.sleep(100);
					
					let temp = algorithm.elements[j];
					algorithm.elements[j] = algorithm.elements[j - 1];
					algorithm.elements[j-1] = temp;

					temp = algorithm.elements[j].x;
					algorithm.elements[j].x = algorithm.elements[j - 1].x;
					algorithm.elements[j - 1].x = temp;
				}
				
				algorithm.elements[j].color = algorithm.elementsColor;
				algorithm.elements[j - 1].color = algorithm.elementsColor;
				j--;
			}

			algorithm.render();
		}	
	}

	static async selectionSort(algorithm) {
		let minIndex;
		for (let i = 0; i < algorithm.elements.length - 1; i++) {
			minIndex = i;
			algorithm.render();

			for (let j = i + 1; j < algorithm.elements.length; j++) {
				algorithm.elements[i].color = AlgorithmVisualizer.purpleColor;
				algorithm.elements[j].color = AlgorithmVisualizer.purpleColor;
				algorithm.render();
				await this.sleep(100);
				
				if(algorithm.elements[j].value < algorithm.elements[minIndex].value) {
					algorithm.elements[minIndex].color = this.defaultColor;
					algorithm.elements[i].color = AlgorithmVisualizer.orangeColor;
					minIndex = j;
					algorithm.elements[j].color = AlgorithmVisualizer.greenColor;
					algorithm.render();
					await this.sleep(100);
				} else {
					algorithm.elements[j].color = algorithm.elementsColor;
				}
			}

			let temp = algorithm.elements[i];
			algorithm.elements[i] = algorithm.elements[minIndex];
			algorithm.elements[minIndex] = temp;

			temp = algorithm.elements[i].x;
			algorithm.elements[i].x = algorithm.elements[minIndex].x;
			algorithm.elements[minIndex].x = temp;

			algorithm.elements[i].color = algorithm.elementsColor;
			algorithm.elements[minIndex].color = algorithm.elementsColor;
			algorithm.render();
		}
	}

	static async mergeSort(algorithm) {
		let leftIndex = 0;
		let rightIndex = algorithm.elements.length - 1;

		algorithm.elements[leftIndex].color = AlgorithmVisualizer.greenColor;
		algorithm.elements[rightIndex].color = AlgorithmVisualizer.greenColor;
		algorithm.render();
		await AlgorithmVisualizer.sleep(100);

		algorithm.elements[leftIndex].color = AlgorithmVisualizer.defaultColor;
		algorithm.elements[rightIndex].color = AlgorithmVisualizer.defaultColor;

		await AlgorithmVisualizer.sort(algorithm, leftIndex, rightIndex);
		
		for (let element of algorithm.elements) element.color = algorithm.elementsColor;
		algorithm.render();
		await AlgorithmVisualizer.sleep(500);
	}

	static async sort(algorithm, leftIndex, rightIndex) {
		if (leftIndex >= rightIndex) return;

		const middleIndex = Math.trunc((leftIndex + rightIndex) / 2);

		algorithm.elements[middleIndex].color = AlgorithmVisualizer.purpleColor;
		algorithm.render();
		await AlgorithmVisualizer.sleep(100);
		algorithm.elements[middleIndex].color = algorithm.elementsColor;

		await AlgorithmVisualizer.sort(algorithm, leftIndex, middleIndex);
		await AlgorithmVisualizer.sort(algorithm, middleIndex + 1, rightIndex);
		await AlgorithmVisualizer.merge(algorithm, leftIndex, middleIndex, rightIndex);
 	}

	static async merge(algorithm, leftIndex, middleIndex, rightIndex) {
		const lArrayLength = middleIndex - leftIndex + 1;
		const rArrayLength = rightIndex - middleIndex;

		let lArray = [];
		let rArray = [];
		const xValues = algorithm.elements.map(element => element.x);

		for (let i = 0; i < lArrayLength; i++) {
			lArray[i] = algorithm.elements[leftIndex + i];
			algorithm.elements[leftIndex + i].color = '#1166ff';
		}

		for (let i = 0; i < rArrayLength; i++) {
			rArray[i] = algorithm.elements[(middleIndex + 1) + i];
			algorithm.elements[(middleIndex + 1) + i].color = '#ffcc44';
		}

		algorithm.render();
		await AlgorithmVisualizer.sleep(100);let lArrayIndex = 0;

		let rArrayIndex = 0;
		let mergedArrayIndex = leftIndex;

		while(lArrayIndex < lArrayLength && rArrayIndex < rArrayLength) {

			if (lArray[lArrayIndex].value <= rArray[rArrayIndex].value) {
				algorithm.elements[mergedArrayIndex] = lArray[lArrayIndex];
				algorithm.elements[mergedArrayIndex].x = xValues[mergedArrayIndex];
				lArrayIndex++;
			}
			else {
				algorithm.elements[mergedArrayIndex] = rArray[rArrayIndex];
				algorithm.elements[mergedArrayIndex].x = xValues[mergedArrayIndex];
				rArrayIndex++;
			}
			
			mergedArrayIndex++;
		}

		while(lArrayIndex < lArrayLength) {
			algorithm.elements[mergedArrayIndex] = lArray[lArrayIndex];
			algorithm.elements[mergedArrayIndex].x = xValues[mergedArrayIndex];
			lArrayIndex++;
			mergedArrayIndex++;
		}	

		while(rArrayIndex < rArrayLength) {
			algorithm.elements[mergedArrayIndex] = rArray[rArrayIndex];
			algorithm.elements[mergedArrayIndex].x = xValues[mergedArrayIndex];
			rArrayIndex++;
			mergedArrayIndex++;
		}

		algorithm.render();
		await AlgorithmVisualizer.sleep(100);

		for (let element of algorithm.elements) element.color = this.defaultColor;
	}
}

export { AlgorithmVisualizer };
