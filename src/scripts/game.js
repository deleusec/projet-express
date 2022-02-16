const tools = require('./tools');
const csvParser = require('csv-parser');
const fs = require('fs');

class Game {

    constructor() {
        this.words = [];
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
        this.hideWord()
        this.word = this.words[tools.getRamdomInt(this.words.length)]
    }

    hideWord() {
        this.unknowWord = this.word.replace(/./g, '_')
    }

    print() {
        return this.unknowWord;
    }

    guess(oneLetter) {
        if(this.word.includes(oneLetter)) {
            this.unknowWord = tools.replaceAt(this.unknowWord, this.word.indexOf(oneLetter), oneLetter);
            return true
        }
        this.numberOfTry--;
        return false
    }

    getNumberOfTry() {
        return this.numberOfTry;
    }

    reset() {
        this.numberOfTry = 5;
        this.chooseWord();
        return this.numberOfTry;
    }
}

module.exports = Game;