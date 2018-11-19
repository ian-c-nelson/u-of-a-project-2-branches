require("../public/js/utils");
const _ = require("lodash-core");
const os = require("os");
const axios = require("axios");
const decode = require("urldecode");
const moment = require("moment");
const CharacterGenerator = require("../modules/character-generator");
const log = console.log;

// This will be used to post data directly to the routes to test the full functionality and generate seed data
class DataSeeder {
    constructor(app) {
        this.app = app;
        this.cg = new CharacterGenerator();
        this.apiDomain = "http://localhost:" + this.app.listenOnPort + "/api/";
        this.contentSources = [
            {
                name: "Cat Facts",
                url: "https://cat-fact.herokuapp.com/facts/random",
                getContent: function (callback) {
                    DataSeeder.prototype.fetchData.call(this, this.url, content => {
                        if (typeof callback === "function") {
                            callback("Cat Facts: " + content.text.replaceAll(" youtu.be", " https://youtu.be"));
                        }
                    });
                }
            }, {
                name: "Ron Swanson Quotes",
                url: "https://ron-swanson-quotes.herokuapp.com/v2/quotes",
                getContent: function (callback) {
                    DataSeeder.prototype.fetchData.call(this, this.url, content => {
                        if (typeof callback === "function") {
                            callback(content[0] + os.EOL + "- Ron Swanson");
                        }
                    });
                }
            }, {
                name: "Geek/Chuck Norris Jokes",
                url: "https://geek-jokes.sameerkumar.website/api",
                getContent: function (callback) {
                    DataSeeder.prototype.fetchData.call(this, this.url, content => {
                        if (typeof callback === "function") {
                            callback(content);
                        }
                    });
                }
            }, {
                name: "Corporate BS Generator",
                url: "https://corporatebs-generator.sameerkumar.website/",
                getContent: function (callback) {
                    DataSeeder.prototype.fetchData.call(this, this.url, content => {
                        if (typeof callback === "function") {
                            callback("Our primary directive: " + content.phrase);
                        }
                    });
                }
            }, {
                name: "AdviceSlip",
                url: "https://api.adviceslip.com/advice",
                getContent: function (callback) {
                    DataSeeder.prototype.fetchData.call(this, this.url, content => {
                        if (typeof callback === "function") {
                            callback("LifeTip: " + content.slip.advice);
                        }
                    });
                }
            }, {
                name: "Skate Ipsum",
                url: "http://skateipsum.com/get/1/1/text",
                getContent: function (callback) {
                    DataSeeder.prototype.fetchData.call(this, this.url, content => {
                        if (typeof callback === "function") {
                            callback(content[0]);
                        }
                    });
                }
            }, {
                name: "Baseball Ipsum",
                url: "http://baseballipsum.apphb.com/api/",
                getContent: function (callback) {
                    DataSeeder.prototype.fetchData.call(this, this.url, content => {
                        if (typeof callback === "function") {
                            callback(content[0]);
                        }
                    });
                }
            }, {
                name: "Bacon Ipsum",
                url: "https://baconipsum.com/api/?type=meat-and-filler",
                getContent: function (callback) {
                    DataSeeder.prototype.fetchData.call(this, this.url, content => {
                        if (typeof callback === "function") {
                            callback(content[0]);
                        }
                    });
                }
            }, {
                name: "It's This For That",
                url: "http://itsthisforthat.com/api.php?json",
                getContent: function (callback) {
                    DataSeeder.prototype.fetchData.call(this, this.url, content => {
                        if (typeof callback === "function") {
                            callback("Heard on Shark Tank: " + os.EOL + "\"It's " + content.this + " for " + content.that + "\"");
                        }
                    });
                }
            }, {
                name: "Dino Ipsum",
                url: "https://alexnormand-dino-ipsum.p.mashape.com/?format=text&paragraphs=1",
                getContent: function (callback) {
                    let options = {
                        url: this.url,
                        headers: {
                            "X-Mashape-Key": process.env.MASH_APE_KEY
                        },
                        callback: content => {
                            if (typeof callback === "function") {
                                callback(content);
                            }
                        }
                    };

                    DataSeeder.prototype.fetchData.call(this, options);
                }
            }, {
                name: "Random Quotes",
                url: "https://sumitgohil-random-quotes-v1.p.mashape.com/fetch/randomQuote",
                getContent: function (callback) {
                    let options = {
                        url: this.url,
                        headers: {
                            "X-Mashape-Key": process.env.MASH_APE_KEY
                        },
                        callback: content => {
                            if (typeof callback === "function") {
                                callback(decode(content[0].quote).replaceAll("\t", ",").replaceAll("&#039;", "'") + os.EOL + "-" + content[0].author_name);
                            }
                        }
                    };

                    DataSeeder.prototype.fetchData.call(this, options);
                }
            }, {
                name: "Premier League",
                url: "https://sportdata.p.mashape.com/api/v1/free/soccer/matches/fixtures/premier-league",
                getContent: function (callback) {
                    let options = {
                        url: this.url,
                        headers: {
                            "X-Mashape-Key": process.env.MASH_APE_KEY
                        },
                        callback: content => {
                            if (typeof callback === "function") {
                                let fixture = content.getRandomItem();
                                let dt = moment(fixture.dtime);
                                callback("Can't wait to watch " + fixture.homeTeam + " vs. " + fixture.awayTeam + " on " + dt.format("ll") + " at " + dt.format("LT") + "!!");
                            }
                        }
                    };

                    DataSeeder.prototype.fetchData.call(this, options);
                }
            }
        ];
    }
};

DataSeeder.prototype.fetchData = function (options) {
    console.log(options);
    options.method = "GET";
    axios
        .request(options)
        .then(({ data }) => {
            if (typeof options.callback === "function") {
                options.callback(data);
            }
        })
        .catch(({ response }) => log(response.data));
};

DataSeeder.prototype.generateBranch = function () {
    let char = this.cg.generateRandomCharacter();
    let handle = char.name.replaceAll(" ", "_");
    let email = char.name.replaceAll(" ", ".").toLowerCase() + "@noplace.com";
    let branch = {
        "name": char.name,
        "handle": handle,
        "email": email
    };

    return branch;
};

// create 
DataSeeder.prototype.postBranches = function (howMany) {
    howMany = parseInt(howMany) || 1;
    _.times(howMany, () => {
        let branch = this.generateBranch();
        this.postData(this.apiDomain + "branches", branch, newBranch => {
            // create a random number of posts for each branch
            let leafCount = _.random(5, 25);

            _.times(leafCount, () => {
                let contentSource = this.contentSources.getRandomItem();
                let hashTag = os.EOL + "#" + contentSource.name.toLowerCase().replaceAll(" ", "").replaceAll("'", "");
                contentSource.getContent(content => {
                    if (content.length < 20 || content.length > 280 - hashTag.length) {
                        return;
                    }

                    let text = content.substr(0, 280 - hashTag.length) + hashTag;
                    let leaf = {
                        "text": text,
                        "likes": 0,
                        "BranchId": newBranch.id
                    };

                    this.postData(this.apiDomain + "leaves", leaf, newLeaf => {
                        // log(newLeaf);
                    });
                });
            });
        });
    });
};

DataSeeder.prototype.postData = function (url, data, callback) {
    axios
        .post(url, data)
        .then(({ data }) => {
            if (typeof callback === "function") {
                callback(data);
            }
        })
        .catch(err => log(err, "error"));
};

module.exports = DataSeeder;