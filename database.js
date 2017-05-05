var MongoClient = require('mongodb').MongoClient;
var Settings = require('./settings');

module.exports.getArticles = function (limit, page, query) {
    return connect().then((db) => {
        if (query) {
            return db.collection("articles").find({ tags: query }, {title: 1, tease: 1, _id: 0, date: 1, lastModified: 1}).sort({lastModified: -1}).skip(page * limit).limit(limit).toArray();
        } else {
            return db.collection("articles").find({},{title: 1, tease: 1, _id: 0, date: 1, lastModified: 1}).skip(page * limit).limit(limit).sort({lastModified:-1}).toArray();
        }
    });
}

module.exports.getArticle = function(articleName){
    return connect().then( (db) => {
        return db.collection("articles").findOne({title: articleName});
    })
}


var db = null;
function connect() {
    if (db == null) {
        return MongoClient.connect(Settings.DB_CONNECTION).then((mc) => {
            db = mc;
            return Promise.resolve(db);
        })
    }

    return Promise.resolve(db);
}