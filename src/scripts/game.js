const tools = require('./tools');
const csvParser = require('csv-parser');
const fs = require('fs');

const numberOfTry = 10;

class Game {

    constructor() {
        this.words = [];
        this.scorePlayer = 0;
        this.lettersTried = [];
        this.numberOfTry = numberOfTry;
        this.inGame = false;

        fs.createReadStream('./src/files/words_fr.txt')
        .on('error', () => {
            // ERROR
        })

        .pipe(csvParser())
        .on('data', (row) => {
            this.words.push(row.word.toLowerCase())
        })
        .on('end', () => {
            this.chooseWord();
        });
    }

    chooseWord() {
        this.word = this.words[tools.getRamdomInt(this.words.length)]
        this.getWord()
        this.hideWord()
    }

    hideWord() {
        this.unknowWord = this.word.replace(/./g, '_')
    }

    getWord() {
        return this.word;
    }

    getLettersTried() {
        return this.lettersTried;
    }

    getNumberOfTry() {
        return this.numberOfTry;
    }

    getScorePlayer() {
        return this.scorePlayer;
    }

    getGameStatus() {
        return this.inGame;
    }

    print() {
        return this.unknowWord;
    }

    guess(oneLetter) {
        this.lettersTried.push(oneLetter);
        if(this.word.includes(oneLetter)) {
            for (let i = 0; i < this.word.length; i++){
                if(i === this.word.indexOf(oneLetter,i)){
                    this.unknowWord = tools.replaceAt(this.unknowWord, this.word.indexOf(oneLetter,i), oneLetter);
                }
            }
            if(this.unknowWord === this.word){
                this.scorePlayer++;
                this.reset();
            }
            return true
        }
        this.numberOfTry--;
        if (this.numberOfTry <= 0) {
            this.reset();
        }
        return false
    }

    reset() {
        this.numberOfTry = numberOfTry;
        this.lettersTried = [];
        this.chooseWord();
        return this.numberOfTry;
    }

    start() {
        this.inGame = true;
        this.reset();
    }

    leave() {
        this.inGame = false;
        this.reset();
        this.scorePlayer = 0;
    }
}

module.exports = Game;