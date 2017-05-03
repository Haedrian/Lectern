var MongoClient = require('mongodb').MongoClient;
var Settings = require('./settings');

module.exports.getArticles = function (limit, page, query) {
    return connect(Settings.DB_CONNECTION).then((db) => {
        if (query) {
            return db.collections("articles").find({tags: query}).skip(page* limit).limit(limit).toArray();
        } else {
            return db.collections("articles").find({}).skip(page * limit).limit(limit).toArray();
        }
    });
}



var db = null;
function connect() {
    if (db == null) {
        return MongoClient.connect().then((mc) => {
            db = mc;
            return Promise.resolve(db);
        })
    }

    return Promise.resolve(db);
}