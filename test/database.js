let chai = require('chai');
chai.use(require('chai-as-promised'));

let expect = chai.expect;
let database = require('../database');

describe("testing database", () => {
    it("should load an article", (done) => 
    {
        database.getArticles(1,0,null).then( (articles) => {
            expect(articles).to.have.lengthOf(1);
            done();
        })
    }).timeout(5000);

    it("should load an article matching the tag", (done) => 
    {
        database.getArticles(1,0,"llamatown").then( (articles) => {
            expect(articles).to.have.lengthOf(1);
            done();
        })
    }).timeout(5000);

    it("should load no articles as none match the tag", (done) => 
    {
        database.getArticles(1,0,"dummy").then( (articles) => {
            expect(articles).to.have.lengthOf(0);
            done();
        })
    }).timeout(5000);
})