const _ = require("lodash-core");

class RollTheBones { }

RollTheBones.prototype.flipCoin = function (numDice) {
    return this.doRoll(2, numDice);
}

RollTheBones.prototype.rollD4 = function (numDice) {
    return this.doRoll(4, numDice);
}

RollTheBones.prototype.rollD6 = function (numDice) {
    return this.doRoll(6, numDice);
}

RollTheBones.prototype.rollD10 = function (numDice) {
    return this.doRoll(10, numDice);
}

RollTheBones.prototype.rollD12 = function (numDice) {
    return this.doRoll(12, numDice);
}

RollTheBones.prototype.rollD20 = function (numDice) {
    return this.doRoll(20, numDice);
}

RollTheBones.prototype.rollD100 = function (numDice) {
    return this.doRoll(100, numDice);
}

RollTheBones.prototype.doRoll = function (dieSides, numDice) {
    let max = parseInt(dieSides);

    if (isNaN(max)) {
        return console.log("Invalid die size: " + dieSides);
    }

    numDice = parseInt(numDice) || 1;
    let rolls = _.times(numDice, () => {
        let roll = Math.floor(Math.random() * dieSides) + 1;
        // console.log("d" + dieSides + ":" + roll);
        return roll;
    });
    return numDice === 1 ? rolls[0] : rolls;
}

module.exports = RollTheBones;