const axios = require("axios");
const CharacterGenerator = require("../modules/character-generator");
const charGen = new CharacterGenerator();


class SeedData {
    constructor(db) {
        
    }
}

SeedData.prototype.fetchData = function(url, cb) {
    axios.get(url)
        .then(({ data }) => {
            cb(data);
        })
        .catch(err => log(err, "error"));
}

SeedData.prototype.generateBranch = function() {
    let char = charGen.generateRandomCharacter(charGen.rtb.doRoll(1));
}

module.exports = SeedData;