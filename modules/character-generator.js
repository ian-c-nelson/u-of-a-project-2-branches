const _ = require("lodash-core");
const Character = require("./character");
const RollTheBones = require("./roll-the-bones");

class CharacterGenerator {
    constructor() {
        this.names = [
            {
                race: "Dwarf",
                subRace: "",
                firstNames: {
                    male: ["Adrik", "Alberich", "Baern", "Barendd", "Brottor", "Bruenor", "Dain", "Darrak", "Delg", "Eberk", "Einkil", "Fargrim", "Flint", "Gardain", "Harbek", "Kildrak", "Morgran", "Orsik", "Oskar", "Rangrim", "Rurik", "Taklinn", "Thoradin", "Thorin", "Tordek", "Traubon", "Travok", "Ulfgar", "Veit", "Vondal", "Thorin", "Balin", "Dwalin", "Oin", "Gloin", "Fili", "Kili", "Dori", "Nori", "Ori", "Bifur", "Bofur", "Bombur"],
                    female: ["Amber", "Artin", "Audhild", "Bardryn", "Dagnal", "Diesa", "Eldeth", "Falkrunn", "Finellen", "Gunnloda", "Gurdis", "Helja", "Hlin", "Kathra", "Kristryd", "Ilde", "Liftrasa", "Mardred", "Riswynn", "Sannl", "Torbera", "Torgga", "Vistra", "Misryn", "Tyshmura", "Maevma", "Dearnas", "Lyssnys", "Lyslen", "Brynbera", "Bretdyl", "Brildryn", "Brytrin"]
                },
                surnames: ["Balderk", "Battlehammer", "Brawnanvil", "Dankil", "Fireforge", "Frostbeard", "Gorunn", "Holderhek", "Ironfist", "Loderr", "Lutgehr", "Rumnaheim", "Strakeln", "Torunn", "Ungart"]
            }, {
                race: "Dragonborn",
                subRace: "",
                firstNames: {
                    male: ["Arjhan", "Balasar", "Bharash", "Donaar", "Ghesh", "Heskan", "Kriv", "Medrash", "Mehen", "Nadarr", "Pandjed", "Patrin", "Rhogar", "Shamash", "Shedinn", "Tarhun", "Torinn", "Belythas", "Qelnaar"],
                    female: ["Akra", "Biri", "Daar", "Farideh", "Harann", "Havilar", "Jheri", "Kava", "Korinn", "Mishann", "Nala", "Perra", "Raiann", "Sora", "Surina", "Thava", "Uadjit", "Yathibra", "Tharina", "Xyvayla", "Ophiyries", "Yalyassa", "Kelvayla"]
                },
                surnames: ["Clethtinthiallor", "Daardendrian", "Delmirev", "Drachedandion", "Fenkenkabradon", "Kepeshkmolik", "Kerrhylon", "Kimbatuul", "Linxakasendalor", "Myastan", "Nemmonis", "Norixius", "Ophinshtalajiir", "Prexijandilin", "Shestendeliath", "Turnuroth", "Verthisathurgiesh", "Yarjerit", "Pruaxoc", "Lolmesh", "Uammonil", "Dinkashkmuth", "Othtijarrid", "Crildral", "Yoltheakaad", "Feldindrelias"]

            }, {
                race: "Elf",
                subRace: "",
                firstNames: {
                    male: ["Adran", "Aelar", "Aramil", "Arannis", "Aust", "Beiro", "Berrian", "Carric", "Enialis", "Erdan", "Erevan", "Galinndan", "Hadarai", "Heian", "Himo", "Immeral", "Ivellios", "Laucian", "Mindartis", "Paelias", "Peren", "Quarion", "Riardon", "Rolen", "Soveliss", "Thamior", "Tharivol", "Theren", "Varis", "Norxalim"],
                    female: ["Adrie", "Althaea", "Anastrianna", "Andraste", "Antinua", "Bethrynna", "Birel", "Caelynn", "Drusilia", "Enna", "Felosial", "Ielenia", "Jelenneth", "Keyleth", "Leshanna", "Lia", "Meriele", "Mialee", "Naivara", "Quelenna", "Quillathe", "Sariel", "Shanairra", "Shava", "Silaqui", "Theirastra", "Thia", "Vadania", "Valanthe", "Xanaphia"]
                },
                surnames: ["Amakiir", "Amastacia", "Galanodel", "Holimion", "Ilphelkiir", "Liadon", "Meliamne", "Naïlo", "Siannodel", "Xiloscient"]
            }, {
                race: "Gnome",
                subRace: "",
                firstNames: {
                    male: ["Alston", "Alvyn", "Boddynock", "Brocc", "Burgell", "Dimble", "Eldon", "Erky", "Fonkin", "Frug", "Gerbo", "Gimble", "Glim", "Jebeddo", "Kellen", "Namfoodle", "Orryn", "Roondar", "Seebo", "Sindri", "Warryn", "Wrenn", "Zook"],
                    female: ["Bimpnottin", "Breena", "Caramip", "Carlin", "Donella", "Duvamil", "Ella", "Ellyjobell", "Ellywick", "Lilli", "Loopmottin", "Lorilla", "Mardnab", "Nissa", "Nyx", "Oda", "Orla", "Roywyn", "Shamil", "Tana", "Waywocket", "Zanna"]
                },
                surnames: ["Beren", "Daergel", "Folkor", "Garrick", "Nackle", "Murnig", "Ningel", "Raulnor", "Scheppen", "Timbers", "Turen"]
            }, {
                race: "Halfling",
                subRace: "",
                firstNames: {
                    male: ["Alton", "Ander", "Cade", "Corrin", "Eldon", "Errich", "Finnan", "Garret", "Lindal", "Lyle", "Merric", "Milo", "Osborn", "Perrin", "Reed", "Roscoe", "Wellby"],
                    female: ["Andry", "Bree", "Callie", "Cora", "Euphemia", "Jillian", "Kithri", "Lavinia", "Lidda", "Merla", "Nedda", "Paela", "Portia", "Seraphina", "Shaena", "Trym", "Vani", "Verna", "Lelie", "Kelni"]
                },
                surnames: ["Brushgather", "Goodbarrel", "Greenbottle", "High-hill", "Hilltopple", "Leagallow", "Tealeaf", "Thorngage", "Tosscobble", "Underbough"],
            }, {
                race: "Orc",
                subRace: "",
                firstNames: {
                    male: ["Ghok ", "Lud", "Ball", "Shuk", "Zhud", "Zohrab", "Gobzall", "Dubun", "Zhodgak", "Mungod", "Drandor", "Mag", "Rull", "Zoll", "Bhukk", "Ghatur", "Zagvar", "Rovroll", "Ghurzur", "Bhagul", "Grabzak", "Dench", "Feng", "Gell", "Henk", "Holg", "Imsh", "Keth", "Krusk", "Mhurren", "Ront", "Shump", "Thokk"],
                    female: ["Bhef", "Kun", "Kyel", "Sez", "Uwgil", "Bhugzuan", "Kithri", "Ugguv", "Lidda", "Vola", "Nedda", "Gimdem", "Nuk", "Gaom", "Vaok", "Rilzaong", "Aathraoh", "Genzim", "Shel", "Oullua", "Madve", "Baggi", "Emen", "Engong", "Kansif", "Myev", "Neega", "Ovak", "Ownka", "Shautha", "Sutha", "Vola", "Volen", "Yevelda"]
                },
                surnames: ["The Noxious", "Cold Razor", "The Butcher", "Chest Shatterer", "Hand Squasher", "The Disfigured", "Hand Chopper", "The Wicked", "The Enormous", "Blood Masher", "Rib Cleaver", "Heart Splitter", "The Warped", "The Filthy", "The Reckless", "The Bitter", "The Merciless", "The Brute", "The Bloody", "The Silent", "Skull Sword", "The Grim", "Bone Wrecker"],
            }, {
                race: "Human",
                subRace: "Calishite",
                firstNames: {
                    male: ["Aseir", "Bardeid", "Haseid", "Khemed", "Mehmen", "Sudeiman", "Zasheir"],
                    female: ["Atala", "Ceidil", "Hama", "Jasmal", "Meilil", "Seipora", "Yasheira", "Zasheida"]
                },
                surnames: ["Basha", "Dumein", "Jassan", "Khalid", "Mostana", "Pashar", "Rein"],
            }, {
                race: "Human",
                subRace: "Chondathan",
                firstNames: {
                    male: ["Darvin", "Dorn", "Evendur", "Gorstag", "Grim", "Helm", "Malark", "Morn", "Randal", "Stedd"],
                    female: ["Arveene", "Esvele", "Jhessail", "Kerri", "Lureene", "Miri", "Rowan", "Shandri", "Tessele"]
                },
                surnames: ["Amblecrown", "Buckman", "Dundragon", "Evenwood", "Greycastle", "Tallstag"],
            }, {
                race: "Human",
                subRace: "Damaran",
                firstNames: {
                    male: ["Bor", "Fodel", "Glar", "Grigor", "Igan", "Ivor", "Kosef", "Mival", "Orel", "Pavel", "Sergor"],
                    female: ["Alethra", "Kara", "Katernin", "Mara", "Natali", "Olma", "Tana", "Zora"]
                },
                surnames: ["Bersk", "Chernin", "Dotsk", "Kulenov", "Marsk", "Nemetsk", "Shemov", "Starag"],
            }, {
                race: "Human",
                subRace: "Illuskan",
                firstNames: {
                    male: ["Ander", "Blath", "Bran", "Frath", "Geth", "Lander", "Luth", "Malcer", "Stor", "Taman", "Urth"],
                    female: ["Amafrey", "Betha", "Cefrey", "Kethra", "Mara", "Olga", "Silifrey", "Westra"]
                },
                surnames: ["Brightwood", "Darkwood", "Helder", "Hornraven", "Lackman", "Stormwind", "Windriver", "Farsun", "Mirthwinds", "Clearspear"],
            }, {
                race: "Human",
                subRace: "Mulan",
                firstNames: {
                    male: ["Aoth", "Bareris", "Ehput-Ki", "Kethoth", "Mumed", "Ramas", "So-Kehur", "Thazar-De", "Urhur"],
                    female: ["Arizima", "Chathi", "Nephis", "Nulara", "Murithi", "Sefris", "Thola", "Umara", "Zolis"]
                },
                surnames: ["Ankhalab", "Anskuld", "Fezim", "Hahpet", "Nathandem", "Sepret", "Uuthrakt"],
            }, {
                race: "Human",
                subRace: "Rashemi",
                firstNames: {
                    male: ["Borivik", "Faurgar", "Jandar", "Kanithar", "Madislak", "Ralmevik", "Shaumar", "Vladislak", "Fedor"],
                    female: ["Fyevarra", "Hulmarra", "Immith", "Imzel", "Navarra", "Shevarra", "Tammith", "Yuldra"]
                },
                surnames: ["Chergoba", "Dyernina", "Iltazyara", "Murnyethara", "Stayanoga", "Ulmokina"],
            }, {
                race: "Human",
                subRace: "Shou",
                firstNames: {
                    male: ["An", "Chen", "Chi", "Fai", "Jiang", "Jun", "Lian", "Long", "Meng", "On", "Shan", "Shui", "Wen"],
                    female: ["Bai", "Chao", "Jia", "Lei", "Mei", "Qiao", "Shui", "Tai", "Zi"]
                },
                surnames: ["Chien", "Huang", "Kao", "Kung", "Lao", "Ling", "Mei", "Pin", "Shin", "Sum", "Tan", "Wan", "Cai", "Qang"],
            }, {
                race: "Human",
                subRace: "Turami",
                firstNames: {
                    male: ["Anton", "Diero", "Marcon", "Pieron", "Rimardo", "Romero", "Salazar", "Umbero", "Eco"],
                    female: ["Balama", "Dona", "Faila", "Jalana", "Luisa", "Marta", "Quara", "Selise", "Vonda", "Ronda"]
                },
                surnames: ["Agosto", "Astorio", "Calabra", "Domine", "Falone", "Marivaldi", "Pisacar", "Ramondo"],
            }, {
                race: "Infernal",
                subRace: "",
                firstNames: {
                    male: ["Akmenos", "Amnon", "Barakas", "Damakos", "Ekemon", "Iados", "Kairon", "Leucis", "Melech", "Mordai", "Morthos", "Pelaios", "Skamos", "Therai", "Art", "Carrion", "Chant", "Creed", "Despair", "Excellence", "Fear", "Glory", "Hope", "Ideal", "Music", "Nowhere", "Open", "Poetry", "Quest", "Random", "Reverence", "Sorrow", "Temerity", "Torment", "Weary"],
                    female: ["Akta", "Anakis", "Bryseis", "Criella", "Damaia", "Ea", "Kallista", "Lerissa", "Makaria", "Nemeia", "Orianna", "Phelaia", "Rieta", "Art", "Carrion", "Chant", "Creed", "Despair", "Excellence", "Fear", "Glory", "Hope", "Ideal", "Music", "Nowhere", "Open", "Poetry", "Quest", "Random", "Reverence", "Sorrow", "Temerity", "Torment", "Weary"]
                },
                surnames: [],
            }
        ];

        this.classes = [
            {
                name: "Barbarian",
                hitDie: 12,
                primaryStats: "str",
                secondaryStats: ["con"]
            }, {
                name: "Bard",
                hitDie: 8,
                primaryStats: "cha",
                secondaryStats: ["dex", "con"]
            }, {
                name: "Cleric",
                hitDie: 8,
                primaryStats: "wis",
                secondaryStats: ["str", "con"]
            }, {
                name: "Druid",
                hitDie: 8,
                primaryStats: "wis",
                secondaryStats: ["con"]
            }, {
                name: "Fighter",
                hitDie: 10,
                primaryStats: "str||dex",
                secondaryStats: ["con"]
            }, {
                name: "Monk",
                hitDie: 8,
                primaryStats: "dex&&wis",
                secondaryStats: ["con"]
            }, {
                name: "Paladin",
                hitDie: 10,
                primaryStats: "str&&cha",
                secondaryStats: ["con"]
            }, {
                name: "Ranger",
                hitDie: 10,
                primaryStats: "str||dex",
                secondaryStats: ["wis", "con"]
            }, {
                name: "Rogue",
                hitDie: 8,
                primaryStats: "dex",
                secondaryStats: ["int", "cha", "con"]
            }, {
                name: "Sorceror",
                hitDie: 6,
                primaryStats: "cha",
                secondaryStats: ["con"]
            }, {
                name: "Warlock",
                hitDie: 8,
                primaryStats: "cha",
                secondaryStats: ["con"]
            }, {
                name: "Wizard",
                hitDie: 6,
                primaryStats: "int",
                secondaryStats: ["con", "dex", "cha"]
            }
        ];

        this.races = [
            {
                name: "Dragonborn",
                subRace: "",
                traits: {
                    stats: {
                        str: 2,
                        dex: 0,
                        con: 0,
                        int: 0,
                        wis: 0,
                        cha: 1
                    },
                    healthBonus: 0,
                    speed: 30,
                    draconicAncestry: [
                        "Black",
                        "Blue",
                        "Brass",
                        "Bronze",
                        "Copper",
                        "Gold",
                        "Green",
                        "Red",
                        "Silver",
                        "White"
                    ],
                    languages: ["Common", "Draconic"],
                    other: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance"]
                }
            }, {
                name: "Dwarf",
                subRace: "Hill",
                traits: {
                    stats: {
                        str: 0,
                        dex: 0,
                        con: 2,
                        int: 0,
                        wis: 1,
                        cha: 0
                    },
                    healthBonus: 1,
                    speed: 25,
                    languages: ["Common", "Dwarvish"],
                    other: ["Darkvision", "Stonecunning", "Tool Proficiency", "Dwarven Combat Training", "Dwarven Toughness"]
                }
            }, {
                name: "Dwarf",
                subRace: "Kundarak",
                traits: {
                    stats: {
                        str: 0,
                        dex: 1,
                        con: 2,
                        int: 1,
                        wis: 0,
                        cha: 0
                    },
                    healthBonus: 0,
                    speed: 25,
                    languages: ["Common", "Dwarvish"],
                    other: ["Darkvision", "Stonecunning", "Tool Proficiency", "Dwarven Combat Training", "Mark of Warding", "Master of Locks"]
                }
            }, {
                name: "Dwarf",
                subRace: "Mountain",
                traits: {
                    stats: {
                        str: 2,
                        dex: 0,
                        con: 2,
                        int: 0,
                        wis: 0,
                        cha: 0
                    },
                    healthBonus: 0,
                    speed: 25,
                    languages: ["Common", "Dwarvish"],
                    other: ["Darkvision", "Stonecunning", "Tool Proficiency", "Dwarven Combat Training", "Dwarven Armor Training"]
                }
            }, {
                name: "Elf",
                subRace: "Drow",
                traits: {
                    stats: {
                        str: 0,
                        dex: 2,
                        con: 0,
                        int: 0,
                        wis: 0,
                        cha: 0
                    },
                    healthBonus: 0,
                    speed: 30,
                    languages: ["Common", "Elvish", "Undercommon"],
                    other: ["Superior Darkvision", "Keen Senses", "Fey Ancestry", "Innate Spellcasting", "Sunlight Sensitivity"]
                }
            }, {
                name: "Elf",
                subRace: "High",
                traits: {
                    stats: {
                        str: 0,
                        dex: 2,
                        con: 0,
                        int: 1,
                        wis: 0,
                        cha: 0
                    },
                    healthBonus: 0,
                    speed: 30,
                    languages: ["Common", "Elvish"],
                    other: ["Darkvision", "Keen Senses", "Fey Ancestry", "Trance", "Elf Weapon Training", "Cantrip", "Extra Language"]
                }
            }, {
                name: "Elf",
                subRace: "Wood",
                traits: {
                    stats: {
                        str: 0,
                        dex: 2,
                        con: 0,
                        int: 0,
                        wis: 1,
                        cha: 0
                    },
                    healthBonus: 0,
                    speed: 35,
                    languages: ["Common", "Elvish"],
                    other: ["Darkvision", "Keen Senses", "Fey Ancestry", "Trance", "Elf Weapon Training", "Fleet of Foot", "Mask of the Wild"]
                }
            }, {
                name: "Gnome",
                subRace: "Deep",
                traits: {
                    stats: {
                        str: 0,
                        dex: 1,
                        con: 0,
                        int: 2,
                        wis: 0,
                        cha: 0
                    },
                    healthBonus: 0,
                    speed: 25,
                    languages: ["Common", "Gnomish", "Undercommon"],
                    other: ["Superior Darkvision", "Gnome Cunning", "Stone Camouflage"]
                }
            }, {
                name: "Gnome",
                subRace: "Rock",
                traits: {
                    stats: {
                        str: 0,
                        dex: 0,
                        con: 1,
                        int: 2,
                        wis: 0,
                        cha: 0
                    },
                    healthBonus: 0,
                    speed: 25,
                    languages: ["Common", "Gnomish"],
                    other: ["Darkvision", "Gnome Cunning", "Artificer’s Lore", "Tinker"]
                }
            }, {
                name: "Half-Elf",
                subRace: "",
                traits: {
                    stats: {
                        str: 0,
                        dex: 0,
                        con: 0,
                        int: 0,
                        wis: 0,
                        cha: 2
                    },
                    healthBonus: 0,
                    speed: 30,
                    languages: ["Common", "Elvish"],
                    other: ["Darkvision", "Of Two Worlds (+1 to two stats other than Cha)", "Fey Ancestry", "Skill Versatility", "Extra Language"]
                }
            }, {
                name: "Halfling",
                subRace: "Lightfoot",
                traits: {
                    stats: {
                        str: 0,
                        dex: 2,
                        con: 0,
                        int: 0,
                        wis: 0,
                        cha: 1
                    },
                    healthBonus: 0,
                    speed: 25,
                    languages: ["Common", "Halfling"],
                    other: ["Darkvision", "Lucky", "Brave", "Naturally Stealthy"]
                }
            }, {
                name: "Halfling",
                subRace: "Stout",
                traits: {
                    stats: {
                        str: 0,
                        dex: 2,
                        con: 1,
                        int: 0,
                        wis: 0,
                        cha: 0
                    },
                    healthBonus: 0,
                    speed: 25,
                    languages: ["Common", "Halfling"],
                    other: ["Darkvision", "Lucky", "Brave", "Stout Resilience"]
                }
            }, {
                name: "Half-Orc",
                subRace: "",
                traits: {
                    stats: {
                        str: 2,
                        dex: 0,
                        con: 1,
                        int: 0,
                        wis: 0,
                        cha: 0
                    },
                    healthBonus: 0,
                    speed: 30,
                    languages: ["Common", "Orcish"],
                    other: ["Darkvision", "Menacing", "Relentless Endurance", "Savage Attacks"]
                }
            }, {
                name: "Human",
                subRace: "",
                firstNames: {
                    male: [],
                    female: []
                },
                surnames: [],
                traits: {
                    stats: {
                        str: 1,
                        dex: 1,
                        con: 1,
                        int: 1,
                        wis: 1,
                        cha: 1
                    },
                    healthBonus: 0,
                    speed: 30,
                    languages: ["Common"],
                    other: ["Extra Language"]
                }
            }, {
                name: "Tiefling",
                subRace: "",
                traits: {
                    stats: {
                        str: 0,
                        dex: 0,
                        con: 0,
                        int: 1,
                        wis: 0,
                        cha: 2
                    },
                    healthBonus: 0,
                    speed: 30,
                    languages: ["Common", "Infernal"],
                    other: ["Darkvision", "Hellish Resistance", "Infernal Legacy"]
                }
            }
        ];

        this.statKeys = ["str", "dex", "con", "int", "wis", "cha"];

        this.rtb = new RollTheBones();
    }
}

CharacterGenerator.prototype.doAbilityUpgrade = function (primaryStatKeys, secondaryStatKeys, stats) {
    let pointUsed = false;

    // try primary stats first
    _.each(primaryStatKeys, key => {
        if (stats[key] + 1 <= 20) {
            stats[key]++;
            pointUsed = true;
            return false;
        }
    });

    // if the point was used, return the stats
    if (pointUsed) {
        return stats;
    }

    // then try secondary stats
    _.each(secondaryStatKeys, key => {
        if (stats[key] + 1 <= 20) {
            stats[key]++;
            pointUsed = true;
            return false;
        }
    });

      // if the point was used, return the stats
      if (pointUsed) {
        return stats;
    }

    // finally try remaining stats
    let remainingStatKeys = _.shuffle(this.statKeys.filter(stat => {
        return primaryStatKeys.indexOf(stat) === -1 && secondaryStatKeys.indexOf(stat) === -1;
    }));

    _.each(remainingStatKeys, key => {
        if (stats[key] + 1 <= 20) {
            stats[key]++;
            pointUsed = true;
            return false;
        }
    });

    // finally return the stats whether teh point was used or not
    return stats;
}

CharacterGenerator.prototype.getRandomItem = function (array) {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
}

CharacterGenerator.prototype.getRandomName = function (gender, race) {
    let listRace = race.name;
    let listSubRace = race.subRace;

    // handle special cases (Half-Orc, Half-Elf, Tiefling);
    switch (listRace) {
        case "Half-Elf":
            listRace = this.rtb.flipCoin() === 1 ? "Elf" : "Human";
            break;
        case "Half-Orc":
            listRace = this.rtb.flipCoin() === 1 ? "Orc" : "Human";
            break;
        case "Tiefling":
            listRace = this.rtb.flipCoin() === 1 ? "Infernal" : "Human";
            break;
        default:
            // procede as normal.
            break;
    }

    let nameLists = this.names.filter(list => {
        return list.race === listRace && (!listSubRace || !list.subRace || list.subRace === listSubRace);
    });

    let randomList = this.getRandomItem(nameLists);
    let firstName = this.getRandomItem(randomList.firstNames[gender.toLowerCase()]);
    let lastName = randomList.surnames.length > 0 ? this.getRandomItem(randomList.surnames) : "";

    return (firstName + " " + lastName).trim();
}

CharacterGenerator.prototype.generateRandomCharacter = function (level) {
    level = parseInt(level) || 1;

    let gender = this.rtb.flipCoin() === 1 ? "Female" : "Male";
    let playerRace = this.getRandomItem(this.races);
    let playerClass = this.getRandomItem(this.classes);
    let stats = this.rollStats(playerClass, playerRace, level);
    let hp = this.rollHitPoints(playerClass, playerRace, stats, level);
    let name = this.getRandomName(gender, playerRace);

    let char = new Character(
        {
            name: name,
            race: playerRace.name,
            subRace: playerRace.subRace,
            playerClass: playerClass.name,
            gender: gender,
            level: level,
            stats: stats,
            hp: hp
        }
    );

    // console.log(char);

    return char;
};

CharacterGenerator.prototype.getAbilityModifier = function (score) {
    switch (true) {
        case (score < 2):
            return -5;
        case (score < 4):
            return -4;
        case (score < 6):
            return -3;
        case (score < 8):
            return -2;
        case (score < 10):
            return -1;
        case (score < 12):
            return 0;
        case (score < 14):
            return 1;
        case (score < 16):
            return 2;
        case (score < 18):
            return 3;
        case (score < 20):
            return 4;
        case (score < 22):
            return 5;
        case (score < 24):
            return 6;
        case (score < 26):
            return 7;
        case (score < 28):
            return 8;
        case (score < 30):
            return 9;
        default:
            return 10;
    }
};

CharacterGenerator.prototype.getAbilityUpgradeCount = function (level) {
    switch (true) {
        case (level >= 19):
            return 10;
        case (level >= 16):
            return 8;
        case (level >= 12):
            return 6;
        case (level >= 8):
            return 4;
        case (level >= 4):
            return 2;
        default:
            return 0;
    }
};

CharacterGenerator.prototype.rollStats = function (playerClass, playerRace, level) {
    let rolls = _.times(6, () => {
        // Use the roll 4d6 and take the top 3 method.
        let rolls = this.rtb.rollD6(4);
        rolls.sort((a, b) => {
            return b - a;
        });

        return _.sum(rolls.slice(0, 3));
    }).sort((a, b) => {
        return b - a;
    });

    let primaryStats = [];
    let secondaryStats = playerClass.secondaryStats;
    let stats = {};

    // set the primary stats using the top rolls
    if (playerClass.primaryStats.indexOf("&&") !== -1) {
        primaryStats = playerClass.primaryStats.split("&&");
    } else if (playerClass.primaryStats.indexOf("||") !== -1) {
        let stat = this.getRandomItem(playerClass.primaryStats.split("||"))
        primaryStats.push(stat);
    } else {
        primaryStats.push(playerClass.primaryStats);
    }

    _.each(primaryStats, (stat) => {
        stats[stat] = rolls.splice(0, 1)[0];
    });


    // set secondary stats using the next highest rolls
    _.each(secondaryStats, (stat) => {
        stats[stat] = rolls.splice(0, 1)[0];
    });

    // shuffle the remaining rolls
    _.shuffle(rolls)

    // set the remaining unset stats
    _.each(this.statKeys, (stat) => {
        if (!stats[stat]) {
            stats[stat] = rolls.splice(0, 1)[0];
        }
    });

    // apply racial bonuses
    stats.str += playerRace.traits.stats.str;
    stats.dex += playerRace.traits.stats.dex;
    stats.con += playerRace.traits.stats.con;
    stats.int += playerRace.traits.stats.int;
    stats.wis += playerRace.traits.stats.wis;
    stats.cha += playerRace.traits.stats.cha;

    if (playerRace.name == "Half-Elf") {
        // Half elves get two +1 stats other than cha
        let stat1 = this.getRandomItem(this.statKeys.filter(stat => {
            return stat != "cha";
        }));

        let stat2 = this.getRandomItem(this.statKeys.filter(stat => {
            return stat != "cha" && stat != stat1;
        }));

        stats[stat1]++;
        stats[stat2]++;
    }

    let abilityUpgrades = this.getAbilityUpgradeCount(level);
    for (let i = 0; i < abilityUpgrades; i++) {
        this.doAbilityUpgrade(primaryStats, secondaryStats, stats);
    }

    return stats;
}

CharacterGenerator.prototype.rollHitPoints = function (playerClass, playerRace, stats, level) {
    level = parseInt(level) || 1;
    let hp = 0;
    for (let i = 1; i <= level; i++) {
        if (i === 1) {
            hp += playerClass.hitDie + this.getAbilityModifier(stats.con);
        } else {
            hp += this.rtb.doRoll(playerClass.hitDie) + this.getAbilityModifier(stats.con);
        }
    }

    return hp += (playerRace.traits.healthBonus * level);
}

module.exports = CharacterGenerator;






