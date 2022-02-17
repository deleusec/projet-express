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
        numberOfTry: game.getNumberOfTry(),
        knowWord : undefined,
        lettersTried : game.getLettersTried()
    });
})

app.post('/',(request, response) => {
    console.log(request.body.word);

    if(request.body.reset){
        game.newGame();
    }else{
        let guess = game.guess(request.body.word)
        console.log("Guess :" + guess)
    }
    response.render('index', {
        game: game.print(),
        numberOfTry: game.getNumberOfTry(),
        knowWord : game.getWord(),
        lettersTried : game.getLettersTried()
    });
})