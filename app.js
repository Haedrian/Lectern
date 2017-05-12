var express = require('express');
var app = express();
var router = express.Router();
var Settings = require('./settings');

var cors = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.get('/', (req, res) => {
    res.send('hello world!');
})

app.listen(Settings.API_PORT, () => {
    console.log("Listening on port " + Settings.API_PORT);
})

app.use(cors);
app.use('/api', require('./routes/articles/index'));
app.use('/api', require('./routes/people/index'));