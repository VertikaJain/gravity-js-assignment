// dsa: longest increasing subsequence

// example: i/p: [10,9,2,5,3,7,101,8], o/p: 4

// O(n^2)
function LIS(array) {
  if (array.length === 0) return 0; // edge case : when array is empty
  const newArray = Array(array.length).fill(1);

  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      if (array[i] > array[j]) {
        newArray[i] = Math.max(newArray[i], newArray[j] + 1);
      }
    }
  }
  return Math.max(...newArray);
}

console.log(LIS([10, 9, 2, 5, 3, 7, 101, 8]));
