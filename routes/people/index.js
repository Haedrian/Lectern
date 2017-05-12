var express = require('express');
var router = express.Router();
var Settings = require('../../Settings');
var database = require('../../database');

router.route('/people').get((req, res) => {
    let query = req.query.query;
    let page = req.query.page | 0;

    return database.getPeople(15, page, query).then((pep) => {
        res.send(pep);
    })
});

router.route('/people/count').get((req, res) => {
    let query = req.query.query;

    return database.getPeopleCount(query).then((total) => {
        res.send(total +"");
    });
});

router.route('/people/:name').get((req, res) => {
    let name = req.params.name;

    if (!name) {
        res.sendStatus(400);
    }

    return database.getPerson(name).then((pep) => {
        if (!pep) {
            res.sendStatus(404);
        } else {
            res.send(pep);
        }
    })
});

router.route('/people/:name/articles').get((req, res) => {
    let name = req.params.name;
    let page = req.query.page | 0;

    if (!name) {
        res.sendStatus(400);
    }

    return database.getArticlesByPerson(20, page, name).then((pep) => {
        res.send(pep);
    });
});

router.route('/people/:name/articles/count').get((req, res) => {
    let name = req.params.name;

    if (!name) {
        res.sendStatus(400);
    }

    return database.getArticlesByPersonCount(name).then((total) => {
        res.send(total + "");
    });
});


module.exports = router;