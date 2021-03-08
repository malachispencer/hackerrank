/*
Hackerrank. 22/02/2021. A space explorer's ship crashed on Mars, they send a series of 'SOS' messgaes to Earth for help. During tranmission,
some of the letters are in the SOS messages are altered by radiation. Here we create a function which takes a string of the message
received on Earth, and returns how many letters in the string were altered. The string will always have a length cleanly divisible by 3.
For example, SOTSOS should return 1, SOSSPSEOS should return 2 and OOSDSSOSOSWEWSOSOSOSOSOSOSSSSOSOSOSS should return 20. Here is the
solution I developed to solve the challenge.
1) We find out how many SOS messages were sent by dividing the length of the string by 3, we store this in a variable, msgs.
2) We then recreate the original string by multiplying SOS by the amount of msgs that were sent.
3) We start a counter variable called altered.
4) We create a for loop which will run the length of the string (as well as unaltered).
5) For each character in the input string, we compare it with the same indexed letter in unaltered, if they are different, we increment
   altered.
6) We return altered.
*/

function marsExploration(s) {
  const msgs = s.length / 3;
  const unaltered = 'SOS'.repeat(msgs);
  let altered = 0;
  
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== unaltered[i]) { altered++; }
  }
  
  return altered;
}
