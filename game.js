String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length)
}

const word = "damien"

class Game {

    constructor() {
        this.gameIsOver = false;
        this.numberOfTry = 5;
        this.unknowWord = word.replace(/./g, 'x')
    }

    print() {
        return this.unknowWord;
    }

    guess(oneLetter) {
        if(word.includes(oneLetter)) {
            this.unknowWord= this.unknowWord.replaceAt(word.indexOf(oneLetter), oneLetter);
            return true
        } else {
            this.numberOfTry--;
        }
        return false
    }

    getNumberOfTry() {
        return this.numberOfTry;
    }

    getGameIsOver() {
        if(this.unknowWord === word){
            return true
        }
    }

    reset() {
        return this.numberOfTry = 5;
    }
}

module.exports = Game;