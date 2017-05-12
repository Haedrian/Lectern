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

    it("should order the articles by the descending date", (done) => {
        database.getArticles(30, 0, null).then((articles) => {
            expect(articles).to.have.lengthOf(2);
            expect(articles[1].lastModified).to.be.lessThan(articles[0].lastModified);
            done();
        })
    })
});

describe("get article counts", () => {
    it("should get a total of 3", (done) => {
        database.getArticleCounts(null).then((total) => {
            expect(total).to.equal(2);
            done();
        })
    });

    it("should load the total of articles matching the tag", (done) => {
        database.getArticleCounts("llamatown").then((total) => {
            expect(total).to.equal(1);
            done();
        })
    }).timeout(5000);

    it("should return a total of 0 as none match the tag", (done) => {
        database.getArticleCounts("dummy").then((total) => {
            expect(total).to.equal(0);
            done();
        })
    }).timeout(5000);
})

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

describe("get people", () => {
    it("should get 3 people", (done) => {
        database.getPeople(3, 0, null).then((people) => {
            expect(people).to.have.lengthOf(3);
            done();
        })
    }).timeout(5000);

    it("should perform exact search", (done) => {
        database.getPeople(3, 0, "Juliet Borg").then((people) => {
            expect(people).to.have.lengthOf(1);
            done();
        })
    }).timeout(5000);

    it("should be case insensitive", (done) => {
        database.getPeople(3, 0, "juliet borg").then((people) => {
            expect(people).to.have.lengthOf(1);
            done();
        });
    }).timeout(5000);

    it("should do partial matches", (done) => {
        database.getPeople(3, 0, "borg").then((people) => {
            expect(people).to.have.lengthOf(1);
            done();
        })
    }).timeout(5000);

    it("should find nobody", (done) => {
        database.getPeople(3, 0, "nobody").then((people) => {
            expect(people).to.have.lengthOf(0);
            done();
        })
    })
});

describe("get people count", () => {
    it("should get 3 people", (done) => {
        database.getPeopleCount(null).then((people) => {
            expect(people).to.equal(3);
            done();
        })
    }).timeout(5000);

    it("should perform exact search", (done) => {
        database.getPeopleCount("Juliet Borg").then((people) => {
            expect(people).to.equal(1);
            done();
        })
    }).timeout(5000);

    it("should be case insensitive", (done) => {
        database.getPeopleCount("juliet borg").then((people) => {
            expect(people).to.equal(1);
            done();
        });
    }).timeout(5000);

    it("should do partial matches", (done) => {
        database.getPeopleCount("borg").then((people) => {
            expect(people).to.equal(1);
            done();
        })
    }).timeout(5000);

    it("should find nobody", (done) => {
        database.getPeopleCount("nobody").then((people) => {
            expect(people).to.equal(0);
            done();
        })
    })
});


describe("getArticlesByPerson", () => {
    it("gets all of Juliet Borgs' articles", (done) => {
        database.getArticlesByPerson(10, 0, "Juliet Borg").then((art) => {
            expect(art).to.have.lengthOf(2);
            done();
        });
    });

    it("gets all of Mr Llama's articles", (done) => {
        database.getArticlesByPerson(10, 0, "Mr Llama").then((art) => {
            expect(art).to.have.lengthOf(1);
            done();
        });
    });

    it("gets no articles as they have none", (done) => {
        database.getArticlesByPerson(10, 0, "I dont exist").then((art) => {
            expect(art).to.have.lengthOf(0);
            done();
        });
    });
});

describe("getArticlesByPersonCount", () => {
    it("gets all of Juliet Borgs' articles", (done) => {
        database.getArticlesByPersonCount("Juliet Borg").then((art) => {
            expect(art).to.equal(2);
            done();
        });
    });

    it("gets all of Mr Llama's articles", (done) => {
        database.getArticlesByPersonCount("Mr Llama").then((art) => {
            expect(art).to.equal(1);
            done();
        });
    });

    it("gets no articles as they have none", (done) => {
        database.getArticlesByPersonCount("I dont exist").then((art) => {
            expect(art).to.equal(0);
            done();
        });
    });
});