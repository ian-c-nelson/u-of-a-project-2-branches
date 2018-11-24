require("../public/js/utils");
const _ = require("lodash-core");
const os = require("os");
const axios = require("axios");
const decode = require("urldecode");
const moment = require("moment");
const CharacterGenerator = require("../modules/character-generator");
const db = require("../models");

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
                    let options = {
                        url: this.url,
                        callback: content => {
                            if (typeof callback === "function") {
                                callback("Cat Facts: " + content.text.replaceAll(" youtu.be", " https://youtu.be"));
                            }
                        }
                    };

                    DataSeeder.prototype.fetchData.call(this, options);
                }
            }, {
                name: "Ron Swanson Quotes",
                url: "https://ron-swanson-quotes.herokuapp.com/v2/quotes",
                getContent: function (callback) {
                    let options = {
                        url: this.url,
                        callback: content => {
                            if (typeof callback === "function") {
                                callback(content[0] + os.EOL + "- Ron Swanson");
                            }
                        }
                    };

                    DataSeeder.prototype.fetchData.call(this, options);
                }
            }, {
                name: "Geek/Chuck Norris Jokes",
                url: "https://geek-jokes.sameerkumar.website/api",
                getContent: function (callback) {
                    let options = {
                        url: this.url,
                        callback: content => {
                            if (typeof callback === "function") {
                                callback(content);
                            }
                        }
                    };

                    DataSeeder.prototype.fetchData.call(this, options);
                }
            }, {
                name: "Corporate BS Generator",
                url: "https://corporatebs-generator.sameerkumar.website/",
                getContent: function (callback) {
                    let options = {
                        url: this.url,
                        callback: content => {
                            if (typeof callback === "function") {
                                callback("Our primary directive: " + content.phrase);
                            }
                        }
                    };

                    DataSeeder.prototype.fetchData.call(this, options);
                }
            }, {
                name: "AdviceSlip",
                url: "https://api.adviceslip.com/advice",
                getContent: function (callback) {
                    let options = {
                        url: this.url,
                        callback: content => {
                            if (typeof callback === "function") {
                                callback("LifeTip: " + content.slip.advice);
                            }
                        }
                    };

                    DataSeeder.prototype.fetchData.call(this, options);
                }
            }, {
                name: "Skate Ipsum",
                url: "http://skateipsum.com/get/1/1/text",
                getContent: function (callback) {
                    let options = {
                        url: this.url,
                        callback: content => {
                            if (typeof callback === "function") {
                                callback(content[0]);
                            }
                        }
                    };

                    DataSeeder.prototype.fetchData.call(this, options);
                }
            }, {
                name: "Baseball Ipsum",
                url: "http://baseballipsum.apphb.com/api/",
                getContent: function (callback) {
                    let options = {
                        url: this.url,
                        callback: content => {
                            if (typeof callback === "function") {
                                callback(content[0]);
                            }
                        }
                    };

                    DataSeeder.prototype.fetchData.call(this, options);
                }
            }, {
                name: "Bacon Ipsum",
                url: "https://baconipsum.com/api/?type=meat-and-filler",
                getContent: function (callback) {
                    let options = {
                        url: this.url,
                        callback: content => {
                            if (typeof callback === "function") {
                                callback(content[0]);
                            }
                        }
                    };

                    DataSeeder.prototype.fetchData.call(this, options);
                }
            }, {
                name: "It's This For That",
                url: "http://itsthisforthat.com/api.php?json",
                getContent: function (callback) {
                    let options = {
                        url: this.url,
                        callback: content => {
                            if (typeof callback === "function") {
                                callback("Heard on Shark Tank: " + os.EOL + "\"It's " + content.this + " for " + content.that + "\"");
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
    options.method = "GET";
    axios
        .request(options)
        .then(({ data }) => {
            if (typeof options.callback === "function") {
                options.callback(data);
            }
        })
        .catch((err) => {
            console.log(options.url)
            if (err.response) {
                console.log(err.response.status, err.response.statusText);
            } else {
                console.log(err);
            }
        });
};

DataSeeder.prototype.generateBranch = function () {
    let char = this.cg.generateRandomCharacter();
    let handle = char.name.replaceAll(" ", "_");
    let email = char.name.replaceAll(" ", ".").toLowerCase() + "@noplace.com";
    let branch = {
        "name": char.name,
        "handle": handle,
        "email": email,
        "password": "password"
    };

    return branch;
};

// create 
DataSeeder.prototype.postBranches = function (howMany) {
    howMany = parseInt(howMany) || 1;
    let branches = [];
    let self = this;

    // create teh initial hashtags;
    self.contentSources.forEach(source => {
        let hashTag = createHashTag(source.name);
        db.Seed
            .create({
                text: hashTag
            });
    });

    _.times(howMany, () => {
        let branch = self.generateBranch();

        db.Branch
            .create(branch)
            .then(newBranch => {
                // follow a random branch.
                if (branches.length > 0) {
                    let stem = branches.getRandomItem();
                    newBranch.addStem(stem);
                }

                branches.push(newBranch);

                // create a random number of posts for each branch
                let leafCount = _.random(10, 30);

                _.times(leafCount, () => {
                    let contentSource = self.contentSources.getRandomItem();
                    let hashTag = createHashTag(contentSource.name);

                    contentSource.getContent(content => {
                        if (content.length < 10) {
                            return;
                        }

                        let text = trimContent(content) + " " + os.EOL + hashTag;
                        let leaf = {
                            "text": text,
                            "likes": _.random(0, 50),
                            "BranchId": newBranch.id
                        };

                        db.Leaf
                            .create(leaf)
                            .then(newLeaf => {


                                db.Seed.findOne({
                                    where: {
                                        text: hashTag
                                    }
                                }).then(seed => {
                                    if (seed) {
                                        newLeaf.addSeed(seed);
                                    } else {
                                        seed = {
                                            text: hashTag
                                        };

                                        db.Seed
                                            .create(seed)
                                            .then(newSeed => {
                                                newLeaf.addSeed(newSeed);
                                            });
                                    }
                                });
                            });
                    });
                });

            })
            .catch(function (err) {
                console.log(err);
            });
    });
};

function createHashTag(name) {
    return name.toLowerCase().replaceAll(" ", "").replaceAll("'", "").replace("/", "");
}

function trimContent(content) {
    let newContent = content.substr(0, 260);
    return newContent.substr(0, newContent.lastIndexOf(" "));
}

module.exports = DataSeeder;