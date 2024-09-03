var app = angular.module('AlphabetGuessingGameApp', []);

app.controller('GameController', function() {
    var self = this;

    // Initialize game variables
    self.init = function() {
        self.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        self.currentLetter = '';
        self.userGuess = null;
        self.score = 0;
        self.message = '';
        self.playerName = '';
        self.gameStarted = false;
        self.isWrong = false;
        self.leaderboard = [];
    };

    // Start the game
    self.startGame = function() {
        if (self.playerName.trim() !== '') {
            self.gameStarted = true;
            self.newRound();
        }
    };

    // Start a new round by selecting a random letter
    self.newRound = function() {
        var randomIndex = Math.floor(Math.random() * self.letters.length);
        self.currentLetter = self.letters[randomIndex];
        self.userGuess = null;
        self.message = '';
        self.isWrong = false; // Reset the wrong flag
    };

    // Check the user's guess
    self.checkGuess = function() {
        if (self.userGuess === null) {
            self.message = 'Please enter a number!';
            return;
        }

        var correctNumber = self.letters.indexOf(self.currentLetter) + 1;
        
        if (self.userGuess === correctNumber) {
            self.message = 'Correct! The letter ' + self.currentLetter + ' is number ' + correctNumber + '.';
            self.score++;
            self.newRound(); // Start a new round after a correct guess
        } else {
            self.message = 'Incorrect. The letter was ' + self.currentLetter + '. Click Try Again to start over.';
            self.isWrong = true; // Set the wrong flag to true
        }
    };

    // Try Again - restart the game round
    self.tryAgain = function() {
        self.newRound(); // Reset the game state by starting a new round
        self.isWrong = false; // Make sure to hide the "Try Again" button
    };

    // Reset the game
    self.resetGame = function() {
        self.leaderboard.push({ name: self.playerName, score: self.score });
        self.leaderboard.sort(function(a, b) {
            return b.score - a.score;
        });
        self.score = 0;
        self.playerName = '';
        self.gameStarted = false;
    };

    // Initialize the game
    self.init();
});