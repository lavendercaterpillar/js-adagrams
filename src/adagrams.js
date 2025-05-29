// import { of } from "core-js/core/array";

const HandSize = 10

const letterPool = {
    'A': 9, 
    'B': 2, 
    'C': 2, 
    'D': 4, 
    'E': 12, 
    'F': 2, 
    'G': 3, 
    'H': 2, 
    'I': 9, 
    'J': 1, 
    'K': 1, 
    'L': 4, 
    'M': 2, 
    'N': 6, 
    'O': 8, 
    'P': 2, 
    'Q': 1, 
    'R': 6, 
    'S': 4, 
    'T': 6, 
    'U': 4, 
    'V': 2, 
    'W': 2, 
    'X': 1, 
    'Y': 2, 
    'Z': 1
}

const SCORE_CHART = {
  A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1,
  D: 2, G: 2,
  B: 3, C: 3, M: 3, P: 3,
  F: 4, H: 4, V: 4, W: 4, Y: 4,
  K: 5,
  J: 8, X: 8,
  Q: 10, Z: 10
};


// Implement this method for wave 1
export const drawLetters = () => {
  let letterPoolList =[]

  for (const [letter, freq] of Object.entries(letterPool)) {   //I can use .forEach() here
    for (let i = 0; i < freq; i++) {
      letterPoolList.push(letter)
    }; 
  };
  
  const lettersInHand = [];
  
  for (let i = 1; i <= HandSize; i++) {
    // const totalLettersCount = Object.values(letterPool).reduce((sum, count) => sum + count, 0);
    const totalLettersCount = letterPoolList.length; 
    const draw = Math.floor(Math.random() * totalLettersCount);
    const drawLetter = letterPoolList[draw];
    lettersInHand.push(drawLetter);
    letterPoolList.splice(draw, 1);
  };
  return lettersInHand;
};


// Implement this method for wave 2
export const usesAvailableLetters = (input, lettersInHand) => {
  const inputDict = input
  .toUpperCase()
  .split('')
  .reduce((letterFreq, letter) => {
    letterFreq[letter] = (letterFreq[letter] || 0) + 1;
    return letterFreq;
  }, {}
  );
  const handDict = lettersInHand.reduce((acc, letter) => {
    acc[letter] = (acc[letter] || 0) + 1;
    return acc;
  }, {}
  );

  for (const [character, frequency] of Object.entries(inputDict)) {
    if (!(character in handDict)) {
      return false;
    } else {
      if (frequency > handDict[character]) {
        return false;
      }
    };
  };
return true;
};


// Implement this method for wave 3
export const scoreWord = (word) => {
  // if (!word || typeof word !== 'string') return 0; // to handle '', NaN or undefined
  
  const wordDict = word
    .toUpperCase()
    .split('')
    .reduce((letterFreq, letter) => {
      letterFreq[letter] = (letterFreq[letter] || 0) + 1;
      return letterFreq;
      }, {});

  let totalScore = 0;

  for (const [letter, frequency] of Object.entries(wordDict)) {
    totalScore += (SCORE_CHART[letter] || 0) * frequency;
  };

  if (word.length >= 7) {
    totalScore += 8;
  };

return totalScore;
};


// Implement this method for wave 4
export const highestScoreFrom = (words) => {
  let highestScore = 0;
  let winnerWord = '';
  
  words.forEach(word => {
    const score = scoreWord(word);
    
    if (score > highestScore) {
      winnerWord = word;
      highestScore = score;
      
    } else if (score === highestScore) {
      
      if (word.length === 10 && winnerWord.length !== 10) {
        winnerWord = word;
      } else if (word.length < winnerWord.length && winnerWord.length !== 10) {
        winnerWord = word;
      };
    };
  });
  
  return { word: winnerWord, score: highestScore};
};

// console.log(scoreWord('Ellie'));