class Character {
    constructor({
        name = "",
        race = "",
        subRace = "",
        gender = "",
        playerClass = "",
        level = 1,
        stats = {
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 0,
            cha: 0
        },
        hp = 0
    }) {

        this.name = name;
        this.race = race;
        this.subRace = subRace;
        this.gender = gender;
        this.class = playerClass;
        this.stats = stats;
        this.hp = hp;
        this.level = level;
    }
}

module.exports = Character;