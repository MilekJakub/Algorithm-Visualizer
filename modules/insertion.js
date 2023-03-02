// Insertion Sort

let numbers = [];

for (let i = 0; i < 10; i++) {
  numbers.push(Math.ceil(Math.random() * 10));
}

function insertionSort(data) {
  for (let i = 0; i < data.length; i++) {
    let j = i;
    while(j > 0 && data[j - 1] > data[j]) {
      let temp = data[j];
      data[j] = data[j - 1];
      data[j - 1] = temp;

      j--;
    }
  }
}

insertionSort(numbers);

console.log(numbers);