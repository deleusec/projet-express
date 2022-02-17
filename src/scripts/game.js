const tools = require('./tools');
const csvParser = require('csv-parser');
const fs = require('fs');

class Game {

    constructor() {
        this.words = [];
        this.lettersTried = [];
        this.numberOfTry = 5;

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
            return true
        }
        this.numberOfTry--;
        return false
    }

    newGame() {
        this.numberOfTry = 5;
        this.lettersTried = [];
        this.chooseWord();
        return this.numberOfTry;
    }
}

module.exports = Game;