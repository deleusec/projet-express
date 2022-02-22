const Game = require('../src/scripts/game');
const assert = require('assert').strict;

const game = new Game();
game.word = "damien";

describe("Game Test", () => {

    it("should show only '_' character", () => {
        game.hideWord();
        assert.equal(game.print(), "______");
    });

    it("The number of words to find should be 5", () => {
        assert.equal(game.getWordsToFind(), 5);
    });

    it("game status should be false at the beginning", () => {
        assert.equal(game.getGameStatus(), false);
    });

    it("score should be 0 at the beginning", () => {
        assert.equal(game.getScorePlayer(), 0);
    });

    it('when i guess a letter, the unknow word should be updated with the right letter', () => {
        game.word = "damien";
        game.hideWord()
        game.guess("a");
        assert.equal(game.print(), "_a____")
    });

    it("should be 10 try at the beginning of the game", () => {
        game.word = "damien"
        game.hideWord();
        game.guess("a");
        assert.deepEqual(game.getNumberOfTry(), 10);
    });

    it("test the try mechanic with a right guess", () => {
        game.word = "damien"
        game.hideWord();
        game.guess('a')
        assert.deepEqual(game.getNumberOfTry(), 10);
    });

    it("test the try mechanic with a wrong guess", () => {
        game.word = "damien"
        game.hideWord();
        game.guess('c')
        assert.deepEqual(game.getNumberOfTry(), 9);
    });

    it("reset the game, so the number of try should be 5", () => {
        game.reset();
        assert.equal(game.getNumberOfTry(), 10)
    });

    it("Save letters already tried", () => {
        game.lettersTried = []
        game.guess("a");
        let result = ['a']
        assert.deepEqual(game.getLettersTried(), result);
    });

    it("game status should be false when we leave the game", () => {
        game.leave();
        assert.equal(game.getGameStatus(), false);
    });

    it("game status should be true when we start the game", () => {
        game.start();
        assert.equal(game.getGameStatus(), true);
    });

    it("if the number of tries falls to 0, the score must not change", () => {
        game.guess("x")
        game.numberOfTry = 1;
        assert.equal(game.getScorePlayer(), 0);
    });

    it("if the word is found, the score should be 1", () => {
        game.word = "damien"
        game.unknowWord = "damie_"
        game.guess("n")
        assert.equal(game.getScorePlayer(), 1);
    });

    it("at the end, should show score player", () => {
        game.scorePlayer = 4
        game.result()
        assert.equal(game.getResult(), "4/5");
    });

    it("if player leave the game, the score falls at 0", () => {
        game.leave()
        assert.equal(game.getScorePlayer(), 0);
    });

});