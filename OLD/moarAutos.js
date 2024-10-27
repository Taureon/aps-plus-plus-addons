const { combineStats, dereference, makeAuto } = require('../../facilitators.js')
const { gunCalcNames, base, statnames } = require('../../constants.js')
const g = require('../../gunvals.js')
const makeMegaAuto = (type, name = -1, options = {}) => {
    type = ensureIsClass(type);
    let turret = {
        type: "megaAutoTankGun",
        size: 12,
        independent: true,
        color: 16,
        angle: 180,
    };
    if (options.type != null) {
        turret.type = options.type;
    }
    if (options.size != null) {
        turret.size = options.size;
    }
    if (options.independent != null) {
        turret.independent = options.independent;
    }
    if (options.color != null) {
        turret.color = options.color;
    }
    if (options.angle != null) {
        turret.angle = options.angle;
    }
    let output = dereference(type);
    let autogun = {
        POSITION: [turret.size, 0, 0, turret.angle, 360, 1],
        TYPE: [
            turret.type,
            {
                CONTROLLERS: ["nearestDifferentMaster"],
                INDEPENDENT: turret.independent,
                COLOR: turret.color,
            },
        ],
    };
    if (type.GUNS != null) {
        output.GUNS = type.GUNS;
    }
    if (type.TURRETS == null) {
        output.TURRETS = [autogun];
    } else {
        output.TURRETS = [...type.TURRETS, autogun];
    }
    if (name == -1) {
        output.LABEL = "Mega Auto-" + type.LABEL;
    } else {
        output.LABEL = name;
    }
    output.DANGER = type.DANGER + 2;
    return output;
}
const makeUltraAuto = (type, name = -1, options = {}) => {
    type = ensureIsClass(type);
    let turret = { type: "ultraAutoTankGun", size: 12, independent: true, color: 16, angle: 180 };
    if (options.type != null) turret.type = options.type;
    if (options.size != null) turret.size = options.size;
    if (options.independent != null) turret.independent = options.independent;
    if (options.color != null) turret.color = options.color;
    if (options.angle != null) turret.angle = options.angle;
    let output = dereference(type);
    let autogun = {
        POSITION: [turret.size, 0, 0, turret.angle, 360, 1],
        TYPE: [ turret.type, { CONTROLLERS: ["nearestDifferentMaster"], INDEPENDENT: turret.independent, COLOR: turret.color } ]
    };
    if (type.GUNS != null) output.GUNS = type.GUNS;
    output.TURRETS = type.TURRETS == null ? [autogun] : [...type.TURRETS, autogun];
    output.LABEL = name == -1 ? "Ultra Auto-" + type.LABEL : name;
    output.DANGER = type.DANGER + 3;
    return output;
}
const makeTripleAuto = (type, name = -1, options = {}) => {
    type = ensureIsClass(type);
    let turret = {
        type: "autoTurret",
        size: 6,
        independent: true,
        color: 16,
        angle: 180,
    };
    if (options.type != null) {
        turret.type = options.type;
    }
    if (options.independent != null) {
        turret.independent = options.independent;
    }
    if (options.color != null) {
        turret.color = options.color;
    }
    let output = dereference(type);
    let autogun = {
        POSITION: [turret.size, 4.5, 0, 0, 150, 1],
        TYPE: [
            turret.type,
            {
                CONTROLLERS: ["nearestDifferentMaster"],
                INDEPENDENT: turret.independent,
                COLOR: turret.color,
            },
        ],
    };
    let autogun1 = {
        POSITION: [turret.size, 4.5, 0, 120, 150, 1],
        TYPE: [
            turret.type,
            {
                CONTROLLERS: ["nearestDifferentMaster"],
                INDEPENDENT: turret.independent,
                COLOR: turret.color,
            },
        ],
    };
    let autogun2 = {
        POSITION: [turret.size, 4.5, 0, -120, 150, 1],
        TYPE: [
            turret.type,
            {
                CONTROLLERS: ["nearestDifferentMaster"],
                INDEPENDENT: turret.independent,
                COLOR: turret.color,
            },
        ],
    };
    if (type.GUNS != null) {
        output.GUNS = type.GUNS;
    }
    if (type.TURRETS == null) {
        output.TURRETS = [autogun, autogun1, autogun2];
    } else {
        output.TURRETS = [...type.TURRETS, autogun, autogun1, autogun2];
    }
    if (name == -1) {
        output.LABEL = "Triple Auto-" + type.LABEL;
    } else {
        output.LABEL = name;
    }
    output.DANGER = type.DANGER + 2;
    return output;
}
const makeTripleMegaAuto = (type, name = -1, options = {}) => {
    type = ensureIsClass(type);
    let turret = {
        type: "megaAutoTankGun",
        size: 7,
        independent: true,
        color: 16,
        angle: 180,
    };
    if (options.type != null) turret.type = options.type;
    if (options.independent != null) turret.independent = options.independent;
    if (options.color != null) turret.color = options.color;
    let output = dereference(type);
    let autogun = {
        POSITION: [turret.size, 5, 0, 0, 150, 1],
        TYPE: [ turret.type, { CONTROLLERS: ["nearestDifferentMaster"], INDEPENDENT: turret.independent, COLOR: turret.color } ]
    };
    let autogun1 = {
        POSITION: [turret.size, 5, 0, 120, 150, 1],
        TYPE: [ turret.type, { CONTROLLERS: ["nearestDifferentMaster"], INDEPENDENT: turret.independent, COLOR: turret.color } ]
    };
    let autogun2 = {
        POSITION: [turret.size, 5, 0, -120, 150, 1],
        TYPE: [ turret.type, { CONTROLLERS: ["nearestDifferentMaster"], INDEPENDENT: turret.independent, COLOR: turret.color } ],
    };
    if (type.GUNS != null) output.GUNS = type.GUNS;
    output.TURRETS = type.TURRETS == null ? [autogun, autogun1, autogun2] : [...type.TURRETS, autogun, autogun1, autogun2];
    output.LABEL = name == -1 ? "Triple Mega Auto-" + type.LABEL : name;
    output.DANGER = type.DANGER + 3;
    return output;
}
const makePentaAuto = (type, name = -1, options = {}) => {
    type = ensureIsClass(type);
    let turret = {
        type: "autoTurret",
        size: 6,
        independent: true,
        color: 16,
        angle: 180,
    };
    if (options.type != null) turret.type = options.type;
    if (options.independent != null) turret.independent = options.independent;
    if (options.color != null) turret.color = options.color;
    let output = dereference(type);
    let autogun = {
        POSITION: [turret.size, 6.25, 0, 0, 120, 1],
        TYPE: [ turret.type, { CONTROLLERS: ["nearestDifferentMaster"], INDEPENDENT: turret.independent, COLOR: turret.color } ]
    };
    let autogun1 = {
        POSITION: [turret.size, 6.25, 0, 72, 120, 1],
        TYPE: [ turret.type, { CONTROLLERS: ["nearestDifferentMaster"], INDEPENDENT: turret.independent, COLOR: turret.color } ]
    };
    let autogun2 = {
        POSITION: [turret.size, 6.25, 0, 144, 120, 1],
        TYPE: [ turret.type, { CONTROLLERS: ["nearestDifferentMaster"], INDEPENDENT: turret.independent, COLOR: turret.color } ],
    };
    let autogun3 = {
        POSITION: [turret.size, 6.25, 0, -144, 120, 1],
        TYPE: [ turret.type, { CONTROLLERS: ["nearestDifferentMaster"], INDEPENDENT: turret.independent, COLOR: turret.color } ]
    };
    let autogun4 = {
        POSITION: [turret.size, 6.25, 0, -72, 120, 1],
        TYPE: [ turret.type, { CONTROLLERS: ["nearestDifferentMaster"], INDEPENDENT: turret.independent, COLOR: turret.color } ],
    };
    if (type.GUNS != null) output.GUNS = type.GUNS;
    output.TURRETS = type.TURRETS == null ? [autogun, autogun1, autogun2, autogun3, autogun4] : [...type.TURRETS, autogun, autogun1, autogun2, autogun3, autogun4];
    output.LABEL = name == -1 ? "Penta Auto-" + type.LABEL : name;
    output.DANGER = type.DANGER + 3;
    return output;
}
Class.ultraAutoTankGun = {
    PARENT: "megaAutoTankGun",
    GUNS: [
        {
            POSITION: [22, 20, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.autoTurret]),
                TYPE: "bullet"
            }
        }
    ]
}

// Normal Auto
Class.autoBasic = makeAuto("basic")
    Class.autoTwin = makeAuto("twin")
        Class.autoTripleShot = makeAuto("tripleShot")
    Class.autoSniper = makeAuto("sniper")
        Class.autoHunter = makeAuto("hunter")
        Class.autoRifle = makeAuto("rifle")
    Class.autoMachineGun = makeAuto("machineGun")
        Class.autoMinigun = makeAuto("minigun")
        Class.autoSprayer = makeAuto("sprayer")
    Class.autoFlankGuard = makeAuto("flankGuard")
        Class.autoHexaTank = makeAuto("hexaTank")
        Class.autoAuto3 = makeAuto("auto3")
    Class.autoDirector = makeAuto("director")
        Class.autoUnderseer = makeAuto("underseer")
    Class.autoPounder = makeAuto("pounder")
        Class.autoDestroyer = makeAuto("destroyer")
        Class.autoArtillery = makeAuto("artillery")
        Class.autoLauncher = makeAuto("launcher")
    Class.autoTrapper = makeAuto("trapper")
        Class.autoTrapGuard = makeAuto("trapGuard")
    Class.autoDesmos = makeAuto("desmos")
        Class.autoHelix = makeAuto("helix")
        Class.autoSidewinder = makeAuto("sidewinder")
        Class.autoUndertow = makeAuto("undertow")
        Class.autoRepeater = makeAuto("repeater")
Class.basic.UPGRADES_TIER_1.push("autoBasic")
    Class.twin.UPGRADES_TIER_2.push("autoTwin")
        Class.tripleShot.UPGRADES_TIER_3.push("autoTripleShot")
    Class.sniper.UPGRADES_TIER_2.push("autoSniper")
        Class.hunter.UPGRADES_TIER_3.push("autoHunter")
        Class.rifle.UPGRADES_TIER_3.push("autoRifle")
    Class.machineGun.UPGRADES_TIER_2.push("autoMachineGun")
        Class.minigun.UPGRADES_TIER_3.push("autoMinigun")
        Class.sprayer.UPGRADES_TIER_3.push("autoSprayer")
    Class.flankGuard.UPGRADES_TIER_2.push("autoFlankGuard")
        Class.hexaTank.UPGRADES_TIER_3.push("autoHexaTank")
        Class.auto3.UPGRADES_TIER_3.push("autoAuto3")
    Class.director.UPGRADES_TIER_2.push("autoDirector")
        Class.underseer.UPGRADES_TIER_3.push("autoUnderseer")
    Class.pounder.UPGRADES_TIER_2.push("autoPounder")
        Class.destroyer.UPGRADES_TIER_3.push("autoDestroyer")
        Class.artillery.UPGRADES_TIER_3.push("autoArtillery")
        Class.launcher.UPGRADES_TIER_3.push("autoLauncher")
    Class.trapper.UPGRADES_TIER_2.push("autoTrapper")
        Class.trapGuard.UPGRADES_TIER_3.push("autoTrapGuard")
    Class.desmos.UPGRADES_TIER_2.push("autoDesmos")
        Class.helix.UPGRADES_TIER_3.push("autoHelix")
        Class.sidewinder.UPGRADES_TIER_3.push("autoSidewinder")
        Class.undertow.UPGRADES_TIER_3.push("autoUndertow")
        Class.repeater.UPGRADES_TIER_3.push("autoRepeater")
    Class.autoBasic.UPGRADES_TIER_2 = ["autoTwin", "autoSniper", "autoMachineGun", "autoFlankGuard", "autoDirector", "autoPounder", "autoTrapper", "autoDesmos"]
        Class.autoBasic.UPGRADES_TIER_3 = ["autoSmasher"]
        Class.autoTwin.UPGRADES_TIER_3 = ["autoDouble", "autoTripleShot", "autoGunner", "autoHexaTank", "autoHelix"]
        Class.autoSniper.UPGRADES_TIER_3 = ["autoAssassin", "autoHunter", "autoMinigun", "autoRifle"]
        Class.autoMachineGun.UPGRADES_TIER_3 = ["autoArtillery", "autoMinigun", "autoGunner", "autoSprayer"]
        Class.autoFlankGuard.UPGRADES_TIER_3 = ["autoHexaTank", "autoTriAngle", "autoAuto3", "autoTrapGuard", "hexaTrapper"]
        Class.autoDirector.UPGRADES_TIER_3 = ["autoOverseer", "autoCruiser", "autoUnderseer", "autoSpawner"]
        Class.autoPounder.UPGRADES_TIER_3 = ["autoDestroyer", "autoBuilder", "autoArtillery", "autoLauncher"]
        Class.autoTrapper.UPGRADES_TIER_3 = ["autoBuilder", "hexaTrapper", "autoTrapGuard"]
        Class.autoDesmos.UPGRADES_TIER_3 = ["autoHelix", "autoSidewinder", "autoUndertow", "autoRepeater"]

// Triple Auto
Class.tripleAutoBasic = makeTripleAuto("basic")
    Class.tripleAutoTwin = makeTripleAuto("twin")
    Class.tripleAutoSniper = makeTripleAuto("sniper")
    Class.tripleAutoMachineGun = makeTripleAuto("machineGun")
    Class.tripleAutoFlankGuard = makeTripleAuto("flankGuard")
    Class.tripleAutoDirector = makeTripleAuto("director")
    Class.tripleAutoPounder = makeTripleAuto("pounder")
    Class.tripleAutoTrapper = makeTripleAuto("trapper")
    Class.tripleAutoDesmos = makeTripleAuto("desmos")
Class.autoBasic.UPGRADES_TIER_2.splice(0, 0, "tripleAutoBasic")
    Class.tripleAutoBasic.UPGRADES_TIER_3 = ["tripleAutoTwin", "tripleAutoSniper", "tripleAutoMachineGun", "tripleAutoFlankGuard", "tripleAutoDirector", "tripleAutoPounder", "tripleAutoTrapper", "tripleAutoDesmos"]
    Class.autoTwin.UPGRADES_TIER_3.splice(0, 0, "tripleAutoTwin")
    Class.autoSniper.UPGRADES_TIER_3.splice(0, 0, "tripleAutoSniper")
    Class.autoMachineGun.UPGRADES_TIER_3.splice(0, 0, "tripleAutoMachineGun")
    Class.autoFlankGuard.UPGRADES_TIER_3.splice(0, 0, "tripleAutoFlankGuard")
    Class.autoDirector.UPGRADES_TIER_3.splice(0, 0, "tripleAutoDirector")
    Class.autoPounder.UPGRADES_TIER_3.splice(0, 0, "tripleAutoPounder")
    Class.autoTrapper.UPGRADES_TIER_3.splice(0, 0, "tripleAutoTrapper")
    Class.autoDesmos.UPGRADES_TIER_3.splice(0, 0, "tripleAutoDesmos")

// Mega Auto
Class.megaAutoBasic = makeMegaAuto("basic")
    Class.megaAutoTwin = makeMegaAuto("twin")
    Class.megaAutoSniper = makeMegaAuto("sniper")
    Class.megaAutoMachineGun = makeMegaAuto("machineGun")
    Class.megaAutoFlankGuard = makeMegaAuto("flankGuard")
    Class.megaAutoDirector = makeMegaAuto("director")
    Class.megaAutoPounder = makeMegaAuto("pounder")
    Class.megaAutoTrapper = makeMegaAuto("trapper")
    Class.megaAutoDesmos = makeMegaAuto("desmos")
Class.autoBasic.UPGRADES_TIER_2.splice(0, 0, "megaAutoBasic")
    Class.megaAutoBasic.UPGRADES_TIER_3 = ["megaAutoTwin", "megaAutoSniper", "megaAutoMachineGun", "megaAutoFlankGuard", "megaAutoDirector", "megaAutoPounder", "megaAutoTrapper", "megaAutoDesmos"]
    Class.autoTwin.UPGRADES_TIER_3.splice(0, 0, "megaAutoTwin")
    Class.autoSniper.UPGRADES_TIER_3.splice(0, 0, "megaAutoSniper")
    Class.autoMachineGun.UPGRADES_TIER_3.splice(0, 0, "megaAutoMachineGun")
    Class.autoFlankGuard.UPGRADES_TIER_3.splice(0, 0, "megaAutoFlankGuard")
    Class.autoDirector.UPGRADES_TIER_3.splice(0, 0, "megaAutoDirector")
    Class.autoPounder.UPGRADES_TIER_3.splice(0, 0, "megaAutoPounder")
    Class.autoTrapper.UPGRADES_TIER_3.splice(0, 0, "megaAutoTrapper")
    Class.autoDesmos.UPGRADES_TIER_3.splice(0, 0, "megaAutoDesmos")

// Penta Auto
Class.pentaAutoBasic = makePentaAuto("basic")
Class.tripleAutoBasic.UPGRADES_TIER_3.splice(0, 0, "pentaAutoBasic")

// Triple Mega Auto
Class.tripleMegaAutoBasic = makeTripleMegaAuto("basic")
Class.tripleAutoBasic.UPGRADES_TIER_3.splice(0, 0, "tripleMegaAutoBasic")
Class.megaAutoBasic.UPGRADES_TIER_3.splice(0, 0, "tripleMegaAutoBasic")

// Ultra Auto
Class.ultraAutoBasic = makeUltraAuto("basic")
Class.megaAutoBasic.UPGRADES_TIER_3.splice(0, 0, "ultraAutoBasic")
