/*
Hackerrank. 19/02/2021. The day of the programmer is the 256th day of the year. Marie has invented a time machine which can travel between
1700 and 2700. She wishes to use that time machine to travel to the day of the programmer in Russia for any given year in that range. From
1700 to 1917, Russia used the Julian calendar. From 1919 onwards, Russia has used the Gregorian calendar. The transition from Julian to
Gregorian calendar occurred in 1918, the day after January 31st, it became February 14th. In both calendar systems, February is the only
month with a variable amount of days. In the Julian system, a leap year is a year divisible by 4. In the Gregorian system, a leap year is
a year either divisible by 400, or divisible by 4 and not divisible by 100. Here we create a function which takes a year from 1700 to
2700 and returns what date the day of the programmer falls on in Russia. Here is a refactored version of the solution I developed to
solve the challenge.
1) In our dayOfProgrammer function, we have a constant daysMinusFeb, which is actually the total days from January to the end of August,
   excluding February. January has 31 days, March 31, April 30, May 31, June 30, July 31, August 31.
2) We then call our getFebDays function, because the amount of days in February is variable.
3) In our getFebDays function, in order to avoid magic numbers, we store the amount of February days in a leap year, non-leap year and 1918
   in a function. 1918 is a special case, because February starts at the 14th in 1918. Since 1918 is neither a leap year in the Julian or
   Gregorian system, it has 28 days. So 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27 and 28 amounts to 15 days in total.
4) If the year passed into getFebDays is before 1918, we check if it is a leap year according to the Julian system. If the year passed in
   is after 1918, we check if it is a leap year according to the Gregorian system. If it's 1918, we simply return febDays1918.
5) Now in dayOfProgrammer, we haev the amount of days in February for the given year, we add daysMinusFeb and febDays together to give us
   the total number of days from January 1 to August 31, then we subtract this from 256, which is the day of the programmer. This gives us
   the number day in September that the day of the programmer falls on.
6) We return the date using string interpolation, our dynamic values being the September day and the year passed in.
*/

function dayOfProgrammer(year) {
  const dop = 256;
  const daysMinusFeb = 215;
  const febDays = getFebDays(year);
  const septDay = dop - (daysMinusFeb + febDays);
  return `${septDay}.09.${year}`;
}

const getFebDays = year => {
  const febDays1918 = 15;
  const febDaysLeap = 29;
  const febDaysNonLeap = 28;
  
  if (year < 1918) {
    return isJulianLeap(year) ? febDaysLeap : febDaysNonLeap;
  } else if (year > 1918) {
    return isGregorianLeap(year) ? febDaysLeap : febDaysNonLeap;
  } else {
    return febDays1918;
  }
}

const isGregorianLeap = year => {
  return !(year % 400) || !(year % 4) && year % 100;
}

const isJulianLeap = year => {
  return !(year % 4);
}