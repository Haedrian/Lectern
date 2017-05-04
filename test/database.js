let chai = require('chai');
chai.use(require('chai-as-promised'));

let expect = chai.expect;
let database = require('../database');

describe("get articles", () => {
    it("should load an article", (done) => {
        database.getArticles(1, 0, null).then((articles) => {
            expect(articles).to.have.lengthOf(1);
            done();
        })
    }).timeout(5000);

    it("should load an article matching the tag", (done) => {
        database.getArticles(1, 0, "llamatown").then((articles) => {
            expect(articles).to.have.lengthOf(1);
            done();
        })
    }).timeout(5000);

    it("should load no articles as none match the tag", (done) => {
        database.getArticles(1, 0, "dummy").then((articles) => {
            expect(articles).to.have.lengthOf(0);
            done();
        })
    }).timeout(5000);
});

describe("get article", () => {
    it("should load the article", (done) => {
        database.getArticle("Crisis in Llamatown").then((cl) => {
            expect(cl).to.not.be.null;
            done();
        })
    });

    it("shouldn't load a non-existing article", (done) => {
        database.getArticle("not here").then((cl) => {
            expect(cl).to.be.null;
            done();
        })
    })
})