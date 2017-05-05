var express = require('express');
var router = express.Router();
var Settings = require('../../Settings');
var database = require('../../database');

router.route('/articles').get((req, res) => {
    let query = req.query.query;
    let page = req.query.page | 0;

    return database.getArticles(30, page, query).then((articles) => {
        if (articles.length == 0) {
            res.send(404);
        } else {
            res.send(articles);
        }
    })
})

module.exports = router;