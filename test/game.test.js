const Game = require('../game.js');
const assert = require('assert').strict;

let game = new Game();

describe("Game Test", function() {

    it("should show only 'x' letter", function() {
        assert.equal(game.print(), "xxxxxx");
    });
    it("should be 5 try at the beginning of the game", function() {
        assert.equal(game.getNumberOfTry(), 5);
    });

    it("test the try mechanic with a right guess", function() {
        game.guess('a')
        assert.equal(game.getNumberOfTry(), 5);
    });

    it("test the try mechanic with a wrong guess", function() {
        game.guess('hvgfugevsfe')
        assert.equal(game.getNumberOfTry(), 4);
    });

    it("reset the game, so the number of try should be 5", function() {
        game.reset();
        assert.equal(game.getNumberOfTry(), 5)
    });


    it('when i guess a letter the unknow word should be updated with the right letter', function () {
        game.guess("a");
        assert.equal(game.print(), "xaxxxx")
    });
});