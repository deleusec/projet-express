require('dotenv').config();
const express = require('express');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const bodyParser = require('body-parser');
const Game = require("./src/scripts/game");

const PORT = process.env.PORT;

const app = express();
const game = new Game();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(
    sassMiddleware({
        src: __dirname + '/src/styles', //where the sass files are
        dest: __dirname + '/public', //where css should go
        debug: true ,// obvious
        prefix:  '/assets',
    }));
app.use('/assets',express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');
app.listen(PORT, () => console.log(`Listening on http://localhost:${ PORT }`));

app.get('/', (request, response) => {
    response.render('index', {
        game : undefined,
        inGame : false,
        score : game.getScorePlayer(),
        result : undefined,
        numberOfTry: game.getNumberOfTry(),
        knowWord : undefined,
        lettersTried : game.getLettersTried()
    });
})

app.post('/',(request, response) => {

    if(request.body.start){
        game.start();
    } else if (request.body.reset){
        game.reset();
    } else if (request.body.leave) {
        game.leave();
    } else {
        game.guess(request.body.word)
    }

    response.render('index', {
        game: game.print(),
        inGame : game.getGameStatus(),
        score : game.getScorePlayer(),
        numberOfTry: game.getNumberOfTry(),
        knowWord : game.getWord(),
        result : game.getResult(),
        lettersTried : game.getLettersTried()
    });
})