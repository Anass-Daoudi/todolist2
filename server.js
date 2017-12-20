/**
 * Created by hp on 18/08/2017.
 */
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});

//app.use(morgan('dev'));
app.use(session({secret: "Anass secret key"}));
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    if (req.session.todo == undefined) {
        req.session.todo = [];
    }
    next();
});
app.get('/', (req, res) => {
    res.render('home.ejs', {todo: req.session.todo});
});

app.post('/add', urlencodedParser, (req, res) => {
    if (req.body.todo != '') {
        req.session.todo.push(req.body.todo);
    }
    res.redirect('/');
});

app.get('/remove:index', (req, res) => {
    req.session.todo.splice(req.params.index, 1);
    res.redirect('/');
});

app.post('/destroySession', (req, res) => {
    req.session.destroy();
    //console.log(req.session);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`The server is listing on ${port}`);
});