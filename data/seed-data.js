require("./string-utils");
const axios = require("axios");
const CharacterGenerator = require("../modules/character-generator");

class SeedData {
    constructor(db) {
        this.cg = new CharacterGenerator();
    }
}

SeedData.prototype.fetchData = function (url, cb) {
    axios.get(url)
        .then(({ data }) => {
            cb(data);
        })
        .catch(err => log(err, "error"));
}

SeedData.prototype.generateBranch = function () {
    let char = this.cg.generateRandomCharacter(this.cg.rtb.doRoll(1));
    let handle = char.name.replaceAll(" ", "_");
    let email = char.name.replaceAll(" ", ".").toLowerCase() + "@noplace.com";
    let branch = {
        "name": char.name,
        "handle": handle,
        "email": email
    };

    return branch;
}

SeedData.prototype.generateBranches = function (howMany) {
    howMany = parseInt(howMany) || 1;
    let adventurers = _.times(howMany, () => {
        return this.generateBranch();
    });

    return adventurers;
}

SeedData.prototype.postData(url, data) {
    
}


module.exports = SeedData;