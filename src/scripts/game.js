const tools = require('./tools');
const csvParser = require('csv-parser');
const fs = require('fs');

const numberOfTry = 10;
const wordsToFind = 5;
const countDown = 30;

class Game {

    constructor() {
        this.words = [];
        this.resultPlayer = false;
        this.scorePlayer = 0;
        this.lettersTried = [];
        this.numberOfTry = numberOfTry;
        this.wordsToFind = wordsToFind;
        this.countDown = countDown;
        this.inGame = false;

        fs.createReadStream('./src/files/liste_francais.txt')
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

    getCountDown(){
        return this.countDown;
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
                    this.result();
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
                this.result();
            } else {

                this.reset();
            }
        }
        return false
    }

    reset() {
        this.numberOfTry = numberOfTry;
        this.countDown = countDown;
        this.lettersTried = [];
        this.chooseWord();
        console.log(this.word);
        return this.numberOfTry;
    }

    start() {
        this.resultPlayer = false;
        this.wordsToFind = wordsToFind;
        this.countDown = countDown;
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

    result() {
        this.resultPlayer = this.scorePlayer+"/"+ wordsToFind
    }


}

module.exports = Game;