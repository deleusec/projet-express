const Game = require('../src/scripts/game');
const assert = require('assert').strict;

let game = new Game();
game.word = "damien";

describe("Game Test", function() {

    it("should show only '_' character", function() {
        game.hideWord();
        assert.equal(game.print(), "______");
    });

    it("Score should be 0 at the beginning", function() {
        assert.equal(game.getScorePlayer(), 0);
    });

    it("Return the selected word", function() {
        assert.equal(game.getWord(), "damien");
    });

    it('when i guess a letter the unknow word should be updated with the right letter', function () {
        game.guess("a");
        assert.equal(game.print(), "_a____")
    });

    it("should be 5 try at the beginning of the game", function() {
        game.word = "damien"
        game.guess("d");
        assert.deepEqual(game.getNumberOfTry(), 5);
    });

    it("test the try mechanic with a right guess", function() {
        game.word = "damien"
        game.guess('a')
        assert.deepEqual(game.getNumberOfTry(), 5);
    });

    it("test the try mechanic with a wrong guess", function() {
        game.word = "damien"
        game.guess('c')
        assert.deepEqual(game.getNumberOfTry(), 4);
    });

    it("reset the game, so the number of try should be 5", function() {
        game.word = "damien"
        game.reset();
        assert.equal(game.getNumberOfTry(), 5)
    });

    it("Save letters already tried", function() {
        game.word = "damien"
        game.guess("a");
        let result = ['a']
        assert.deepEqual(game.getLettersTried(), result);
    });

    it("Game status should be false at the beginning", function() {
        assert.equal(game.getGameStatus(), false);
    });

    it("Game status should be false when we leave the game", function() {
        game.leave();
        assert.equal(game.getGameStatus(), false);
    });

    it("Game status should be false when we start the game", function() {
        game.start();
        assert.equal(game.getGameStatus(), true);
    });

    it("if the number of tries falls to 0, the score must not change", function() {
        game.guess("x")
        game.numberOfTry = 1;
        assert.equal(game.getScorePlayer(), 0);
    });

    it("if the word is found, the score should be 1", function() {
        game.word = "damien"
        game.unknowWord = "damie_"
        game.guess("n")
        assert.equal(game.getScorePlayer(), 1);
    });


});