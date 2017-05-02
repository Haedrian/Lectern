var express = require('express');
var router = express.Router();
var Settings = require('../../Settings');

router.route('/articles').get( (req,res) => {
    res.send('I am an article');
})

module.exports = router;