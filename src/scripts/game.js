const tools = require('./tools');
const csvParser = require('csv-parser');
const fs = require('fs');

const numberOfTry = 10;
const wordsToFind = 5;

class Game {

    constructor() {
        this.words = [];
        this.resultPlayer = false;
        this.scorePlayer = 0;
        this.lettersTried = [];
        this.numberOfTry = numberOfTry;
        this.wordsToFind = wordsToFind;
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

    getWord() {
        return this.word;
    }

    getLettersTried() {
        return this.lettersTried;
    }

    getNumberOfTry() {
        return this.numberOfTry;
    }

    getWordsToFind() {
        return this.wordsToFind;
    }

    getScorePlayer() {
        return this.scorePlayer;
    }

    getGameStatus() {
        return this.inGame;
    }

    GameStatus(status) {
        return this.inGame = status;
    }

    chooseWord() {
        this.word = this.words[tools.getRamdomInt(this.words.length)]
        this.hideWord()
        console.log(this.word)
    }

    hideWord() {
        this.unknowWord = this.word.replace(/./g, '_')
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
                this.wordsToFind--;
                if(this.wordsToFind <= 0){
                    this.result(true);
                } else {
                    this.reset();
                }
            }
            return true
        }
        this.numberOfTry--;
        if (this.numberOfTry <= 0) {
            this.wordsToFind--;
            if(this.wordsToFind <= 0){
                this.result(true);
            } else {
                this.reset();
            }
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
        this.resultPlayer = false;
        this.wordsToFind = wordsToFind;
        this.scorePlayer = 0;
        this.GameStatus(true);
        this.reset();
    }

    leave() {
        this.reset();
        this.GameStatus(false);
        this.scorePlayer = 0;
    }

    getResult() {
        return this.resultPlayer;
    }

    result(end) {
        if (end){
            this.resultPlayer = this.scorePlayer+"/"+ wordsToFind
            return true
        }
        return false
    }
}

module.exports = Game;