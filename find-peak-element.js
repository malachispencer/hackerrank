/*
Hackerrank. 08/03/2021. A peak element is an element that is strictly greater than its neighbours. Given an array of integers nums, find
a peak element and return its index. If the array contains multiple peaks, return the index to any of the peaks.

Example Input/Outputs
[1, 2] => 2 because 2 is greater than 1.
[3, 2, 1] => 0 because 3 is greater than all its neighbours (2).
[1, 2, 3, 4] => 3 because 4 is greater than all its neighbours (3).
[-2147483647, -2147483648] => 0
[1, 2, 1, 3, 5, 6, 4] => 1 or 5

Here is the solution I developed to solve the challenge.
1) We first handle one of our edge cases, which is when nums has only 1 element, in which case we return 0.
2) We then handle cases where nums contains 2 or 3 elements, in which case we return the index position of the max element.
3) Because we are going to check if the middle element of 3 elements is a peak, but the first and last element of nums could be a peak e.g. 
   [1, 2, 3, 4], we add elements to the start and end of the array. Both added elements are 1 less than their neighbours.
4) We initialize peakIndex, where we will store the index position of a peak.
5) We create a for loop which runs while i + 2 is less than the length of nums. For example, if nums is [0, 1, 2, 3, 1, 0], nums.length is 6, 
   so if the loop were uninterrupted it would last 4 iteration:
   1) i = 0, i + 2 = 2. 
   2) i = 1, i + 2 = 3. 
   3) i = 2, i + 2 = 4.
   4) i = 3, i + 2 = 5. 
6) We do this because we will be checking nums[i] plus nums[i + 1] and nums[i + 2], so we define these as first, middle and last.
7) If middle is greater than first and greater than last, we set peakIndex to i + 1, which is the index position of the element which is
   currently middle. At that point we also return peakIndex because we have found a peak and thus there is no need to check for other peaks
   as we are allowed to return any peak index.
8) The padded values we added to the front and end allow every element in the original nums to be a middle element.
*/

function findPeakElementMS(nums) {
  if (nums.length === 1) { return 0; }
  
  if (nums.length <= 3) {
    return nums.indexOf(Math.max(...nums));
  }
  
  nums.unshift(nums[0] - 1);
  nums.push(nums[nums.length - 1] - 1);
  
  let peakIndex;
  
  for (let i = 0; i + 2 < nums.length; i++) {
    let first = nums[i];
    let middle = nums[i + 1];
    let last = nums[i + 2];
    
    if (middle > first && middle > last) {
      peakIndex = i + 1;
      return peakIndex - 1;
    }
  }
}

/*
Here is an alternative solution I developed, which iterates over all elements in the array.
1) We handle the edge case of there being one element in nums.
2) We create a for loop which allows us to traverse every element in the array.
3) On each iteration, we take the current element at i, the previous element and the next element. When i is 0, previous will be undefined,
   when i is the last element in the array, next will be undefined.
4) Our first conditional handles the case i is 0 and the element at index position i (0) is greater than the next element, if this is the
   case we return i.
5) Our next conditional checks whether i is the last element in the array and if current is greater than previous, we return i. We should
   only ever return from this conditional when the only peak is at the very end of the array.
6) When i is not the first or last element in the array, we check if current is greater than previous and greater than next, in which case
   we return i.
*/

function findPeakElementMSX(nums) {
  if (nums.length === 1) { return 0; }
  
  for (let i = 0; i < nums.length; i++) {
    let current = nums[i];
    let previous = nums[i - 1];
    let next = nums[i + 1];
    
    if (i === 0 && current > next) {
      return i;
    }

    if (i === nums.length - 1 && current > previous) {
      return i;
    }
    
    if (current > previous && current > next) {
      return i;
    }
  }
}

/*
Here is a solution with O(log n) complexity using binary search.

The algorithm

When doing our binary search, if the element to the left of the middle element is greater than the middle element, there is definitely a 
peak in the left half of the array. This is the case because the element prior to nums[0] is minus infinity, so even if the elements keep 
ascending before mid until the beginning of the array, there will be a drop to get to minus infinity, which means the peak is at the front 
of the array. If there is a descension before mid - 1, mid - 1 was the peak because both it is greater than both its neighbours. When the 
elements are mixed before mid - 1, there can be multiple peaks, because remember, adjacent elements are always distinct, so they must go 
either up or down.

1) Descending before mid - 1: [1, 4, 3, 1, 4], mid is intially (0 + 4) / 2 = 2. nums[mid] = 3. nums[mid - 1] = 4. 4 is a peak.
2) Ascending before mid - 1: [7, 6, 5, 4, 3, 2, 1], mid is intiially (0 + 6) / 2 = 3. nums[mid] = 4. nums[mid - 1] = 5. 7 is a peak.
3) Mixed before mid - 1: [2, 7, 3, 6, 5, 4, 3, 2, 1]. mid is initially (0 + 8) / 2 = 4. nums[mid] = 5. nums[mid - 1] = 6. 6, 7 are peaks.


*/

function findPeakElement(nums) {
  const n = nums.length;
  let start = 0;
  let end = n - 1;

  let i = 1;

  while (start < end) {
    let mid = Math.ceil((start + end) / 2);

    console.log('ITERATION', i)
    console.log('START', start)
    console.log('END', end, )
    console.log('MID', mid, )
    console.log(`nums[start] = ${nums[start]}`)
    console.log(`nums[end] = ${nums[end]}`)
    console.log(`nums[mid] = ${nums[mid]}`)
    console.log(`nums[mid - 1] = ${nums[mid - 1]}`)
    console.log('')

    if (nums[mid - 1] > nums[mid]) {
      end = mid - 1; // search in the left half
    } else {
      start = mid; // search in the right half
    }

    i++;
  }

  return start;
}

console.log(findPeakElement([7, 5, 4, 3, 1, 4]))
//console.log(findPeakElement([1, 6, 5, 4, 3, 2, 1]))
//console.log(findPeakElement([1, 2, 3, 4, 5, 6, 1]))