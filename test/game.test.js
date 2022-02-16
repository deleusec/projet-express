const Game = require('../src/scripts/game');
const assert = require('assert').strict;

let game = new Game();
game.word = "damien";

describe("Game Test", function() {

    it("should show only '_' character", function() {
        game.hideWord();
        assert.equal(game.print(), "______");
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

    it('when i guess a letter the unknow word should be updated with the right letter', function () {
        game.word = "damien";
        game.guess("a");
        assert.equal(game.print(), "_a____")
    });

    it("reset the game, so the number of try should be 5", function() {
        game.reset();
        assert.equal(game.getNumberOfTry(), 5)
    });


});