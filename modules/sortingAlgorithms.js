class SortingAlgorithms {
	static bubbleSort(values) {
		for (let i = 0; i < values.length - 1; i++) {
			for(let j = 0; j < values.length - i - 1; j++) {
				if (values[j] > values[j + 1]) {
					let temp = values[j];
					values[j] = values[j + 1];
					values[j + 1] = values;
				}
			}
		}
	}

	static insertionSort(values) {
		for (let i = 0; i < values.length; i++) {
			let j = i;

			while(j > 0 && values[j - 1] > values[j]) {
				let temp = values[j];
				values[j] = values[j - 1];
				values[j - 1] = temp;
				j--;
			}
		}
	}

	static selectionSort(values) {
		let minIndex;

		for (let i = 0; i < values.length - 1; i++) {
			minIndex = i;
			for (let j = i + 1; j < n; j++) {
				if (values[j] < values[minIndex])
					minIndex = j;
			}
			swap(values, minIndex, i);
		}
	}

	mergeSort(values) {
		let leftIndex = 0;
		let rightIndex = values.length - 1;
		this.sort(values, leftIndex, rightIndex);
	}

	#sort(values, leftIndex, rightIndex) {
		if (leftIndex >= rightIndex) return;

		const middleIndex = Math.trunc((leftIndex + rightIndex) / 2);

		this.sort(values, leftIndex, middleIndex);
		this.sort(values, middleIndex + 1, rightIndex);
		this.merge(values, leftIndex, middleIndex, rightIndex);
	}

	#merge(values, leftIndex, middleIndex, rightIndex) {
		const lArrayLength = middleIndex - leftIndex + 1;
		const rArrayLength = rightIndex - middleIndex;

		const lArray = [];
		const rArray = [];

		for (let i = 0; i < lArrayLength; i++)
			lArray[i] = values[leftIndex + i];

		for (let i = 0; i < rArrayLength; i++)
			rArray[i] = values[(middleIndex + 1) + i];

		let lArrayIndex = 0;
		let rArrayIndex = 0;
		let mergedArrayIndex = leftIndex;
		
		while(lArrayIndex < lArrayLength && rArrayIndex < rArrayLength) {
			if (lArray[lArrayIndex] <= rArray[rArrayIndex]) {
				values[mergedArrayIndex] = lArray[lArrayIndex];
				lArrayIndex++;
			}
			
			else {
				values[mergedArrayIndex] = rArray[rArrayIndex];
				rArrayIndex++;
			}

			mergedArrayIndex++;
		}

		while(lArrayIndex < lArrayLength) {
			values[mergedArrayIndex] = lArray[lArrayIndex];
			lArrayIndex++;
			mergedArrayIndex++;
		}	

		while(rArrayIndex < rArrayLength) {
			values[mergedArrayIndex] = rArray[rArrayIndex];
			rArrayIndex++;
			mergedArrayIndex++;
		}
	}
}
