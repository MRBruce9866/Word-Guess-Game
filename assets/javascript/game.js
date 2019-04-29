
//Html pointers
var letterPointers = [];
var wonPointer = document.getElementById("won");
var lostPointer = document.getElementById("lost");
var guessPointer = document.getElementById("guesses");
var wordPointer = document.getElementById("word");
var consolePointer = document.getElementById("gameConsole");


var game = {
    gamesWon: 0,
    gamesLost: 0,
    maxGuesses: 10,
    word: "",
    wordMask: "",
    wordBank: [
        "Brahmin", "Caravan","Centaur","Chems","Drifter","Feral Ghoul","Ghoul","Great War","Mercenary","Mutant",
        "Super Mutant","Nightkin","Outsider","Raider","Scavenger","Slaver","Synth","Vault","Vault Dweller","Wanderer",
        "Wasteland","Cateye","Hydra","Jet","Rad-X","RadAway","Rebound","Rocket","Slasher","Med-X",
        "Stimpak","Turbo","Cazador","Floater","Radroach","Bloatfly","Bottle Cap","Radscorpion","Night Stalker","Yao guai",
        "Deathclaw","Bloatfly","Mirelurk","Pistol","Rifle","Laser Pistol","Pipe Rifle","Hunting Rifle","Baseball Bat","Sledge Hammer",
        "Power Fist","Fat Man","Minigun","Grenade","Molotov Cocktail","Nuka Grenade","Combat Shotgun"
    ],
    lettersGuessed: [],
    
    chooseWord: function(){
        var index = Math.floor(Math.random() * this.wordBank.length);
        this.word = this.wordBank[index].toUpperCase();
        this.createWordMask();
    },

    createWordMask: function() {
        this.wordMask = "";
        for (let i = 0; i < this.word.length; i++) {
            if (this.word.charCodeAt(i) >= 65 && this.word.charCodeAt(i) <= 90) {
                this.wordMask = this.wordMask + "_";
            } else {
                this.wordMask = this.wordMask + this.word.charAt(i);
            }
        }
    },

    guess: function(letter){

    },

    winGame: function(){
        this.gamesWon++;
        this.initializeGame();
    },

    loseGame: function(){
        this.gamesLost++;
        this.initializeGame();
    },

    getGamesWon: function(){
        return this.gamesWon;
    },

    getGamesLost: function(){
        return this.gamesLost;
    },

    getWord: function(){
        return this.word;
    },

    getWordMask: function(){
        return this.wordMask;
    },

    getMaxGuesses: function(){
        return this.maxGuesses;
    },

    getLettersGuessedArray: function(){
        return this.lettersGuessed;
    },

    getLetterAtIndex: function(index){
        return this.lettersGuessed[index];
    },

    initializeGame: function(){
        this.numOfGuesses = 0;
        this.lettersGuessed.length = 0;
        this.chooseWord();
    }

};



// Functions



function initializeLetterPointers(){
    for (let i = 0; i < 26; i++) {
        letterPointers[i] = document.getElementById("ltr" + i);
    }
}



/* var letterPointers = [];
var wonPointer = document.getElementById("won");
var lostPointer = document.getElementById("lost");
var guessPointer = document.getElementById("guesses");
var wordPointer = document.getElementById("word");
var consolePointer = document.getElementById("gameConsole"); */

function refreshScreen(){
    wonPointer.textContent = "GAMES WON: " + game.getGamesWon();
    lostPointer.textContent = "GAMES LOST: " + game.getGamesLost();
    guessPointer.textContent = "GUESSES: " + game.getLettersGuessedArray().length + " / " + game.getMaxGuesses();
    wordPointer.textContent = game.getWordMask();

    for (let pI = 0; pI < letterPointers.length; pI++) {

        var temp = game.getLettersGuessedArray();
        for (let  gI = 0;  gI < temp.length; gI++) {
            
            if((pI + 65) === game.getLetterAtIndex(gI).charCodeAt(0)){
                letterPointers[pI] = ".";
                break;
            }
        
        }
        
    }

}

document.onkeydown = function (event) {
    var key = event.key;


    if (key.toUpperCase() === "ENTER") {
        var newConsoleLog = consolePointer.value;

        console.log(newConsoleLog);
        consolePointer.value = "";
    }

}


initializeLetterPointers();
game.initializeGame();
refreshScreen();

console.log(game);
