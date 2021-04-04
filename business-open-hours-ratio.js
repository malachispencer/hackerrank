/*
Yelp. 14/02/2021. Yelp customers are interested in finding out what proportion of a time range a business they are interested in visiting
is open. Given two inputs, a time range, in the form of a string, and a string list of opening hours, return the ratio of the time range
that the business is open.

Example Inputs/Outputs
'4-10', '0-24' => 1.0
'7-11', '9-17' => 0.5
'0-24', '0-2, 20-24' => 0.25
'5-22', '' => 0.0

Here is the solution I developed to solve the challenge.
1) First we handle our edge case whereby no open hours are given, returning 0.0.
2) We then handle our second edge case, whereby the business is open 24 hours a day, in which case we return 1.0.
3) We then get the start time and end time of queryRange, and even though we don't need to, for the sake of being explicit, we convert
   them from strings to integers.
4) We then get the total number of hours for queryRange by substracting the start time from the end time.
5) To parse openHours, which can be a string with more than one time range, we first split the string at a comma and space, then we map over 
   the array of open hour ranges and split each range at the dashes, which leaves us with an array of arrays where each sub-array holds a
   start time and and end time (both strings) e.g. [[ '9', '17' ]] or [[ '0', '2' ], [ '20', '24' ]].
6) We then initialize a count variable, which is going to store how many times an open hour of the business falls inside the queryRange.
7) We create a forEach loop to iterate over each open hour range.
8) Inside our forEach loop, we take the start time of the open hour range and the end time of the open hour range.
9) For every range, we create a for loop which has an iterator variable which starts at the start time and ends at the end time.
10) If i (the business open hour) is greater than or equal to queryStart and less than or equal to queryEnd, this business open hour is
    included in the query time range, therefore we increment count by 1.
11) For every time range in the openHours array, we have to subtract 1 from count, because for example 0-2 is 2 hours but the index consists
    of 0, 1 and 2. Likewise 20-24 is 4 hours but its full index is 20, 21, 22, 23 and 24.
12) Now we have the accurate count of how many hours in queryRange are included in openHours.
13) To get the ratio, we simply divide queryTotal by the count e.g. 24 / 6 = 4. Then we take the quotient and divide 1 by that e.g. 1 / 4 = 
    0.25.

My Rough Working Out
How much of the query hours are included in the open hours
Then divide the above by the total query hours
Then divide 1 by the result

Example 2
9, 10, 11 are included (2 hour range)
7, 8, 9, 10, 11 are the hours (4 hours open)
4 / 2 = 2. 1 / 2 = 0.5

Example 3
0, 1, 2, 20, 21, 22, 23, 24 are included in the open hours
that is 6 hours open because we already substract 1 from all the nums in the range
0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24
24 / 6 = 4. 1 / 4 = 0.25.
*/

function openHoursRatio(queryRange, openHours) {
  if (openHours === '') { return '0.0'; }

  if (openHours === '0-24') { return '1.0'; }

  let [queryStart, queryEnd] = queryRange.split('-');
  queryStart = Number(queryStart);
  queryEnd = Number(queryEnd);
  const queryTotal = queryEnd - queryStart;
  openHours = openHours.split(', ').map(range => range.split('-'));

  let count = 0;

  openHours.forEach(range => {
    let start = Number(range[0]);
    let end = Number(range[1]);

    for (let i = start; i <= end; i++) {
      if (i >= queryStart && i <= queryEnd) {
        count++;
      }
    }
  });

  count = count - openHours.length;
  const ratio = 1 / (queryTotal / count);
  return ratio;
}