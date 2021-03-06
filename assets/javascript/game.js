//Html pointers
var letterPointers = [];
var wonPointer = document.getElementById("won");
var lostPointer = document.getElementById("lost");
var guessPointer = document.getElementById("guesses");
var wordPointer = document.getElementById("word");
var consolePointer = document.getElementById("gameConsole");
var imagePointer = document.getElementById("falloutImg");
var gameOverPointer = document.getElementById("gameOverFont");
var selectedLetter = document.getElementById("ltr0");

var game = {
    gamesWon: 0,
    gamesLost: 0,
    guesses: 0,
    maxGuesses: 10,
    word: "",
    wordMask: "",
    wordBank: [
        "Brahmin", "Caravan", "Centaur", "Chems", "Drifter", "Feral Ghoul", "Ghoul", "Great War", "Mercenary", "Mutant",
        "Super Mutant", "Nightkin", "Outsider", "Raider", "Scavenger", "Slaver", "Synth", "Vault", "Vault Dweller", "Wanderer",
        "Wasteland", "Cateye", "Hydra", "Jet", "Rad-X", "RadAway", "Rebound", "Rocket", "Slasher", "Med-X",
        "Stimpak", "Turbo", "Cazador", "Floater", "Radroach", "Bloatfly", "Bottle Cap", "Radscorpion", "Night Stalker", "Yao guai",
        "Deathclaw", "Bloatfly", "Mirelurk", "Pistol", "Rifle", "Laser Pistol", "Pipe Rifle", "Hunting Rifle", "Baseball Bat", "Sledge Hammer",
        "Power Fist", "Fat Man", "Minigun", "Grenade", "Molotov Cocktail", "Nuka Grenade", "Combat Shotgun"
    ],
    lettersGuessed: [],
    images: [],
    audio: [],
    currentImageInd: 0,
    isGameOver: false,
    


    chooseWord: function () {
        var index = Math.floor(Math.random() * this.wordBank.length);
        this.word = this.wordBank[index].toUpperCase();
        this.createWordMask();
    },

    createWordMask: function () {
        this.wordMask = "";
        for (let i = 0; i < this.word.length; i++) {
            if (this.word.charCodeAt(i) >= 65 && this.word.charCodeAt(i) <= 90) {
                this.wordMask = this.wordMask + "_";
            } else {
                this.wordMask = this.wordMask + this.word.charAt(i);
            }
        }
    },

    guess: function (letter) {

        if (letter !== ".") {
            this.lettersGuessed.push(letter);
            this.updateWordMask(letter);
            setSelectedLetter(selectedLetter.textContent.charCodeAt(0) - 64);
        }

    },

    updateWordMask: function (letter) {

        var wasLetterInWord = false;
        var newWordMask = "";

        for (let i = 0; i < this.word.length; i++) {
            if (this.word.charAt(i) === letter) {

                newWordMask += letter;
                wasLetterInWord = true;
            } else {
                newWordMask += this.wordMask.charAt(i);
            }

        }

        this.wordMask = newWordMask;

        if (!wasLetterInWord) {
            this.guesses++;
            this.currentImageInd++;
            this.playAudio(1);
        }else{
            this.playAudio(2);
        }

        this.checkWinOrLose();
    },

    checkWinOrLose: function () {
        if (this.wordMask === this.word) {
            this.winGame();
        } else if (this.guesses >= this.maxGuesses) {
            this.loseGame();
        }
    },

    winGame: function () {
        this.playAudio(3);
        this.gamesWon++;
        this.currentImageInd = this.images.length - 2;
        this.gameOver("WON");

    },

    loseGame: function () {
        this.playAudio(4);
        this.gamesLost++;
        this.currentImageInd = this.images.length - 1;
        this.gameOver("LOST");
    },

    getGamesWon: function () {
        return this.gamesWon;
    },

    getGamesLost: function () {
        return this.gamesLost;
    },

    getWord: function () {
        return this.word;
    },

    getWordMask: function () {
        return this.wordMask;
    },

    getNumOfGuesses: function () {
        return this.guesses;
    },

    getMaxGuesses: function () {
        return this.maxGuesses;
    },

    getLettersGuessedLength: function () {
        return this.lettersGuessed.length;
    },

    getLetterAtIndex: function (index) {
        return this.lettersGuessed[index];
    },

    gameOver: function(status){

        gameOverPointer.textContent = "YOU " + status + "! \n ANSWER: " + this.word + " \n ENTER: CONTINUE";
        this.isGameOver = true;

    },

    loadImages: function(){

        for (let index = 0; index < 10; index++) {
            this.images.push("assets/images/fallout" + index + ".png");  
        }

        this.images.push("assets/images/falloutWin.png");
        this.images.push("assets/images/falloutLost.png");
    },

    loadAudioFiles: function(){
        var temp;

        temp = new Audio();
        temp.src = "assets/audio/keyPressed.wav";
        this.audio.push(temp);
        temp = new Audio();
        temp.src = "assets/audio/letterBad.wav";
        this.audio.push(temp);
        temp = new Audio();
        temp.src = "assets/audio/letterGood.wav";
        this.audio.push(temp);
        temp = new Audio();
        temp.src = "assets/audio/won.wav";
        this.audio.push(temp);
        temp = new Audio();
        temp.src = "assets/audio/lost.wav";
        this.audio.push(temp);

    },

    playAudio: function(sound){

        if(sound >= 0 && sound < this.audio.length){
            for (let index = 0; index < this.audio.length; index++) {
                this.audio[index].load();  
            }
    
            this.audio[sound].play();
        }

        


    },



    initializeGame: function () {
        this.guesses = 0;
        this.lettersGuessed.length = 0;
        this.chooseWord();
        this.currentImageInd = 0;
        if(this.images.length === 0){
            this.loadImages();
        }

        if(this.audio.length === 0){
            this.loadAudioFiles();
        }

        for (let pI = 0; pI < letterPointers.length; pI++) {
            letterPointers[pI].textContent = String.fromCharCode(pI + 65);
        }

        setSelectedLetter(0);
        refreshScreen();
    }

};



// Functions



function initializeLetterPointers() {
    for (let i = 0; i < 26; i++) {
        letterPointers[i] = document.getElementById("ltr" + i);
    }

    selectedLetter = letterPointers[0];

}

function setSelectedLetter(index, dir = 1) {
    selectedLetter.style.setProperty("border", "1px solid #001100");

    if (dir === 1) {
        do {

            if (index >= letterPointers.length) index = 0;


            if (letterPointers[index].textContent !== ".") {
                foundPos = true;
                break;
            }

            index++;
        } while (true);
    } else {
        do {

            if (index < 0) index = letterPointers.length - 1;


            if (letterPointers[index].textContent !== ".") {
                foundPos = true;
                break;
            }

            index--;
        } while (true);
    }


    selectedLetter = letterPointers[index];
    selectedLetter.style.setProperty("border", "1px solid rgb(0, 175, 0)");
}


function refreshScreen() {
    wonPointer.textContent = "GAMES WON: " + game.getGamesWon();
    lostPointer.textContent = "GAMES LOST: " + game.getGamesLost();
    guessPointer.textContent = "GUESSES: " + game.getNumOfGuesses() + " / " + game.getMaxGuesses();
    imagePointer.setAttribute("src", game.images[game.currentImageInd]);
    wordPointer.textContent = game.getWordMask();

    for (let pI = 0; pI < letterPointers.length; pI++) {
        for (let gI = 0; gI < game.getLettersGuessedLength(); gI++) {

            if (letterPointers[pI].textContent === game.getLetterAtIndex(gI)) {
                letterPointers[pI].textContent = ".";
                break;
            }

        }

    }

}

document.onkeydown = function (event) {
    var key = event.key;

    console.log(game.isGameOver);

    if (game.isGameOver) {

        if(key === "Enter"){
            game.playAudio(0);
            gameOverPointer.textContent = "";
            game.isGameOver = false;
            game.initializeGame();
            
            
        }

    } else {
        switch (key) {
            case "Enter":
                
                game.guess(selectedLetter.textContent)

                break;

            case "ArrowLeft":
                game.playAudio(0);
                var temp = letterPointers.indexOf(selectedLetter);
                temp--;

                if (temp < 0) temp = letterPointers.length - 1;

                setSelectedLetter(temp, -1);


                break;

            case "ArrowRight":
                game.playAudio(0);
                var temp = letterPointers.indexOf(selectedLetter);
                temp++;

                if (temp >= letterPointers.length) temp = 0;


                setSelectedLetter(temp, 1);

                break;

            case "ArrowUp":
                game.playAudio(0);
                var temp = letterPointers.indexOf(selectedLetter);
                temp += 13;

                if (temp >= letterPointers.length) temp -= letterPointers.length;

                setSelectedLetter(temp);

                break;

            case "ArrowDown":
                game.playAudio(0);
                var temp = letterPointers.indexOf(selectedLetter);
                temp -= 13;

                if (temp < 0) temp += letterPointers.length;

                setSelectedLetter(temp);
                break;

            default:
                break;
        }
    }

    refreshScreen();
    console.log(game);
}


initializeLetterPointers();
setSelectedLetter(0);
game.initializeGame();
refreshScreen();