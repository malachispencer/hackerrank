/*
Hackerrank. 08/03/2021. We are given an array of integers, a rotation shift k, and an array of index positions. We must create a function
which rotates every element in the array of integers k places to the right, then we must return the element at each of the index positions
in the queries array. Here is the solution I developed to solve the challenge.
1) We first store the length of the array in a variable len, because we will use it more than once.
2) We create a new array called rotated, which will be the array of integers after rotation. This array has defined length because we will
   be adding elements to specific index positions.
3) We iterate over the original array.
4) The current element's new index position, will be its current index position + k, modulo the length of the array, in order to ensure
   that when i + k > arr.length, it wraps back around into a valid index position in the array. So inside rotated, we set the new
   index position equal to the current element.
5) Now rotated is complete, we simply map over queries and convert each index position, to the element in rotated, which is in that index
   position.
*/

function circularArrayRotation(arr, k, queries) {
  const len = arr.length;
  let rotated = Array(len);
  
  arr.forEach((n, i) => {
    return rotated[(i + k) % len] = n;
  });
  
  return queries.map(query => rotated[query]);
}