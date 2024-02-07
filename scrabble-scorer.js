// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let initalWord = input.question("Please enter a word to score: ");
   return initalWord;
};

let simpleScorer = function(word) {
   word = word.toUpperCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      letterPoints++;
   }
   return letterPoints;
};
// console.log(simpleScorer('trevor'));

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let letterPoints = 0;
   let vowels = ['A', 'E', 'I', 'O', 'U'];
   for (i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         letterPoints = letterPoints + 3;
      } else {
         letterPoints = letterPoints + 1;
      }
   }
   return letterPoints;
};
// console.log(vowelBonusScorer('Cheerios'));

// let scrabbleScorer = function (word) {
//    word = word.toLowerCase();
//    let letterPoints = 0;
//    for (let i = 0; i < word.length; i++) {
//       for (item in newPointStructure) {
//          if (newPointStructure[item].includes(word[i])) {
//             letterPoints += newPointStructure[item] 
//          }
//       }
//    }
//    return letterPoints
// };
// console.log(scrabbleScorer('trevor'));

// let simpleScore = {
//    'name':'Simple Score',
//    'description':'Each letter is worth 1 point.',
//    'scorerFunction': simpleScorer
// };
// let bonusVowels = {
//    'name':'Bonus Vowels',
//    'description':'Vowels are 3 pts, consonants are 1 pt.',
//    'scorerFunction': vowelBonusScorer
// };
// let scrabble = {
//    'name':'Scarbble',
//    'description':'The traditional scoring algorithm.',
//    'scorerFunction': scrabbleScorer
// };

// const scoringAlgorithms = [simpleScore, bonusVowels, scrabble];

// function scorerPrompt() {
//    console.log('\nWhich scoring system would you like to use?');
//    console.log(`0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}`);
//    console.log(`1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}`);
//    console.log(`2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}`);
//    let userChoice = input.question('\nEnter 0, 1 or 2: ');
//    return scoringAlgorithms[userChoice];
// };

function transform(oldPointStructure) {
   let newPointSystem = {};
   for (item in oldPointStructure) {
      // console.log(item);
      for (i = 0; i < oldPointStructure[item].length; i++) {
         // console.log(oldPointStructure[item][i]);
         newPointSystem[oldPointStructure[item][i].toLowerCase()] = Number(item);
         // console.log(newPointSystem[oldPointStructure[item][i].toLowerCase()]);
      }
   }
   return newPointSystem;
};

let newPointStructure = transform(oldPointStructure);

let scrabbleScorer = function (word) {
   word = word.toLowerCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      letterPoints += Number(newPointStructure[word[i]]);
   }
   return letterPoints
};
// console.log(scrabbleScorer('JavaScript'));

let simpleScore = {
   'name':'Simple Score',
   'description':'Each letter is worth 1 point.',
   'scorerFunction': simpleScorer
};
let bonusVowels = {
   'name':'Bonus Vowels',
   'description':'Vowels are 3 pts, consonants are 1 pt.',
   'scorerFunction': vowelBonusScorer
};
let scrabble = {
   'name':'Scarbble',
   'description':'The traditional scoring algorithm.',
   'scorerFunction': scrabbleScorer
};

const scoringAlgorithms = [simpleScore, bonusVowels, scrabble];

function scorerPrompt() {
   console.log('\nWhich scoring system would you like to use?');
   console.log(`0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}`);
   console.log(`1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}`);
   console.log(`2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}`);
   let userChoice = input.question('\nEnter 0, 1 or 2: ');
   return scoringAlgorithms[userChoice];
};

function runProgram() {
   let initialWord = initialPrompt();
   let scoringObject = scorerPrompt();
   console.log(`Score for '${initialWord}': ${scoringObject.scorerFunction(initialWord)}`);
   transform(oldPointStructure);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
