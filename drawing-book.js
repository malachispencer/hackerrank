/*
Hackerrank. 01/03/2021. We are given a book with n amount of pages. A book's page 1 always starts on the right. We are also given a page p
that we want to get to. We can start either from the front of the book, or from the back of the book, and turn 1 page at a time until we
reach page p. Here we want to know the minimum amount of pages we need to turn to get to page p. For example, if n = 6 and p = 3, our book
will look like [[x,1], [2,3], [4,5], [6,x]]. If we start at the front, we need to turn 1 page. If we start at the back, we need to turn 2
pages. So the minimum amount of pages we need to turn is 1.

The Algorithm
1) In order to find the distance from the front of the book, we simply have to do p / 2, because when we flip a page we move forward 2
   pages at a time. So if n = 6 and p = 3, we simply do 3 / 2 = 1.5, then we round down the result.
2) In order to find the distance from the back, we first must check whether n is odd or even. If n is even, we add 1 to it in order to turn
   it into a pair, if it's odd, we leave it the same.
3) We then subtract p from n, divide the result by 2 and then round down the result. For example, if the input is n = 6, p = 3, n becomes
   7 to turn n into the right page of the pair, then 7 - 3 = 4, which gives us the distance between the last page and the page we want,
   then we do 4 / 2 = 2, giving us the distance in terms of page flips.
*/

function pageCount(n, p) {
  const fromFront = Math.floor(p / 2);
  n = n % 2 === 0 ? n + 1 : n;
  const fromBack = Math.floor((n - p) / 2);
  const min = Math.min(fromFront, fromBack);
  return min;
}