var express = require('express');
var app = express();
var router = express.Router();
var Settings = require('./settings');

app.get('/', (req,res) => {
    res.send('hello world!');
})

app.listen(Settings.API_PORT, () => {
    console.log("Listening on port " + Settings.API_PORT);
})

app.use('/api',require('./routes/articles/index'));
app.use('/api',require('./routes/people/index'));