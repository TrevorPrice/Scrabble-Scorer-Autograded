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

function transform(oldPointStructure) {
   let newPointSystem = {};
   for (item in oldPointStructure) {
      for (i = 0; i < oldPointStructure[item].length; i++) {
         newPointSystem[oldPointStructure[item][i].toLowerCase()] = Number(item);
      }
   }
   return newPointSystem;
};

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = Number(0);

let scrabbleScorer = function (word) {
   word = word.toLowerCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      letterPoints += newPointStructure[word[i]];
   }
   return letterPoints
};

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
   console.log(`0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}\n1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}\n2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}`);
   let userChoice = Number(input.question('\nEnter 0, 1 or 2: '));  
      while (userChoice !== 0 && userChoice !== 1 && userChoice !== 2) {
      userChoice = Number(input.question('Invalid option. Enter 0, 1 or 2: ')); 
   }
   return scoringAlgorithms[userChoice];
};

function runProgram() {
   let initialWord = initialPrompt();
   let scoringObject = scorerPrompt();
   console.log(`Score for '${initialWord}': ${scoringObject.scorerFunction(initialWord)}`);
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
