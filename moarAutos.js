const { dereference, combineStats, makeAuto } = require('../facilitators.js')
const tanks = require('../groups/tanks.js')
const g = require('../gunvals.js');

const makeMegaAuto = (type, name = -1, options = {}) => {
    type = ensureIsClass(type);
    let turret = { type: "megaAutoTurret", size: 12, independent: true, color: 16, angle: 180 };
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
    output.LABEL = name == -1 ? "Mega Auto-" + type.LABEL : name;
    output.DANGER = type.DANGER + 2;
    return output;
}
const makeUltraAuto = (type, name = -1, options = {}) => {
    type = ensureIsClass(type);
    let turret = { type: "znp_ultraAutoTurret", size: 12, independent: true, color: 16, angle: 180 };
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
    output.DANGER = type.DANGER + 2;
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
    if (options.type != null) turret.type = options.type;
    if (options.independent != null) turret.independent = options.independent;
    if (options.color != null) turret.color = options.color;
    let output = dereference(type);
    let autogun = {
        POSITION: [turret.size, 4.5, 0, 0, 150, 1],
        TYPE: [ turret.type, { CONTROLLERS: ["nearestDifferentMaster"], INDEPENDENT: turret.independent, COLOR: turret.color } ]
    };
    let autogun1 = {
        POSITION: [turret.size, 4.5, 0, 120, 150, 1],
        TYPE: [ turret.type, { CONTROLLERS: ["nearestDifferentMaster"], INDEPENDENT: turret.independent, COLOR: turret.color } ]
    };
    let autogun2 = {
        POSITION: [turret.size, 4.5, 0, -120, 150, 1],
        TYPE: [ turret.type, { CONTROLLERS: ["nearestDifferentMaster"], INDEPENDENT: turret.independent, COLOR: turret.color } ],
    };
    if (type.GUNS != null) output.GUNS = type.GUNS;
    output.TURRETS = type.TURRETS == null ? [autogun, autogun1, autogun2] : [...type.TURRETS, autogun, autogun1, autogun2];
    output.LABEL = name == -1 ? "Triple Auto-" + type.LABEL : name;
    output.DANGER = type.DANGER + 2;
    return output;
}
const makeTripleMegaAuto = (type, name = -1, options = {}) => {
    type = ensureIsClass(type);
    let turret = {
        type: "megaAutoTurret",
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
    output.DANGER = type.DANGER + 2;
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
    output.DANGER = type.DANGER + 2;
    return output;
}

Class.znp_ultraAutoTurret = {
    PARENT: "autoTurret",
    BODY: {
        FOV: 2,
        SPEED: 0.9
    },
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
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

Class.znp_autoBasic = makeAuto('basic')
    Class.znp_autoTwin = makeAuto('twin')
        Class.znp_autoTripleShot = makeAuto('tripleShot')
    Class.znp_autoSniper = makeAuto('sniper')
        Class.znp_autoHunter = makeAuto('hunter')
        Class.znp_autoRifle = makeAuto('rifle')
    Class.znp_autoMachineGun = makeAuto('machineGun')
        Class.znp_autoMinigun = makeAuto('minigun')
        Class.znp_autoSprayer = makeAuto('sprayer')
    Class.znp_autoFlankGuard = makeAuto('flankGuard')
        Class.znp_autoHexaTank = makeAuto('hexaTank')
        Class.znp_autoAuto3 = makeAuto('auto3')
    Class.znp_autoDirector = makeAuto('director')
        Class.znp_autoUnderseer = makeAuto('underseer')
    Class.znp_autoPounder = makeAuto('pounder')
        Class.znp_autoDestroyer = makeAuto('destroyer')
        Class.znp_autoArtillery = makeAuto('artillery')
        Class.znp_autoLauncher = makeAuto('launcher')
    Class.znp_autoTrapper = makeAuto('trapper')
        Class.znp_autoTrapGuard = makeAuto('trapGuard')
    Class.znp_autoDesmos = makeAuto('desmos')
        Class.znp_autoHelix = makeAuto('helix')
        Class.znp_autoVolute = makeAuto('volute')

Class.znp_megaAutoBasic = makeMegaAuto('basic')
    Class.znp_ultraAutoBasic = makeUltraAuto('basic')
    Class.znp_megaAutoTwin = makeMegaAuto('twin')
    Class.znp_megaAutoSniper = makeMegaAuto('sniper')
    Class.znp_megaAutoMachineGun = makeMegaAuto('machineGun')
    Class.znp_megaAutoFlankGuard = makeMegaAuto('flankGuard')
    Class.znp_megaAutoDirector = makeMegaAuto('director')
    Class.znp_megaAutoPounder = makeMegaAuto('pounder')
    Class.znp_megaAutoTrapper = makeMegaAuto('trapper')
    Class.znp_megaAutoDesmos = makeMegaAuto('desmos')

Class.znp_tripleAutoBasic = makeTripleAuto('basic')
    Class.znp_pentaAutoBasic = makePentaAuto('basic')
    Class.znp_tripleMegaAutoBasic = makeTripleMegaAuto('basic')
    Class.znp_tripleAutoTwin = makeTripleAuto('twin')
    Class.znp_tripleAutoSniper = makeTripleAuto('sniper')
    Class.znp_tripleAutoMachineGun = makeTripleAuto('machineGun')
    Class.znp_tripleAutoFlankGuard = makeTripleAuto('flankGuard')
    Class.znp_tripleAutoDirector = makeTripleAuto('director')
    Class.znp_tripleAutoPounder = makeTripleAuto('pounder')
    Class.znp_tripleAutoTrapper = makeTripleAuto('trapper')
    Class.znp_tripleAutoDesmos = makeTripleAuto('desmos')

Class.basic.UPGRADES_TIER_1.push("znp_autoBasic")
    Class.twin.UPGRADES_TIER_2.push("znp_autoTwin")
        Class.tripleShot.UPGRADES_TIER_3.push("znp_autoTripleShot")
    Class.sniper.UPGRADES_TIER_2.push("znp_autoSniper")
        Class.hunter.UPGRADES_TIER_3.push("znp_autoHunter")
        Class.rifle.UPGRADES_TIER_3.push("znp_autoRifle")
    Class.machineGun.UPGRADES_TIER_2.push("znp_autoMachineGun")
        Class.minigun.UPGRADES_TIER_3.push("znp_autoMinigun")
        Class.sprayer.UPGRADES_TIER_3.push("znp_autoSprayer")
    Class.flankGuard.UPGRADES_TIER_2.push("znp_autoFlankGuard")
        Class.hexaTank.UPGRADES_TIER_3.push("znp_autoHexaTank")
        Class.auto3.UPGRADES_TIER_3.push("znp_autoAuto3")
    Class.director.UPGRADES_TIER_2.push("znp_autoDirector")
        Class.underseer.UPGRADES_TIER_3.push("znp_autoUnderseer")
    Class.pounder.UPGRADES_TIER_2.push("znp_autoPounder")
        Class.destroyer.UPGRADES_TIER_3.push("znp_autoDestroyer")
        Class.artillery.UPGRADES_TIER_3.push("znp_autoArtillery")
        Class.launcher.UPGRADES_TIER_3.push("znp_autoLauncher")
    Class.trapper.UPGRADES_TIER_2.push("znp_autoTrapper")
        Class.trapGuard.UPGRADES_TIER_3.push("znp_autoTrapGuard")
    Class.desmos.UPGRADES_TIER_2.push("znp_autoDesmos")
        Class.helix.UPGRADES_TIER_3.push("znp_autoHelix")
        Class.volute.UPGRADES_TIER_3.push("znp_autoVolute")
    Class.znp_autoBasic.UPGRADES_TIER_2 = ["znp_megaAutoBasic", "znp_tripleAutoBasic", "znp_autoTwin", "znp_autoSniper", "znp_autoMachineGun", "znp_autoFlankGuard", "znp_autoDirector", "znp_autoPounder", "znp_autoTrapper", "znp_autoDesmos"]
        Class.znp_autoBasic.UPGRADES_TIER_3 = ["autoSmasher"]
        Class.znp_megaAutoBasic.UPGRADES_TIER_3 = ["znp_ultraAutoBasic", "znp_tripleMegaAutoBasic", "znp_megaAutoTwin", "znp_megaAutoSniper", "znp_megaAutoMachineGun", "znp_megaAutoFlankGuard", "znp_megaAutoDirector", "znp_megaAutoPounder", "znp_megaAutoTrapper", "znp_megaAutoDesmos"]
        Class.znp_tripleAutoBasic.UPGRADES_TIER_3 = ["znp_tripleMegaAutoBasic", "znp_pentaAutoBasic", "znp_tripleAutoTwin", "znp_tripleAutoSniper", "znp_tripleAutoMachineGun", "znp_tripleAutoFlankGuard", "znp_tripleAutoDirector", "znp_tripleAutoPounder", "znp_tripleAutoTrapper", "znp_tripleAutoDesmos"]
        Class.znp_autoTwin.UPGRADES_TIER_3 = ["znp_megaAutoTwin", "znp_tripleAutoTwin", "autoDouble", "znp_autoTripleShot", "autoGunner", "znp_autoHexaTank", "znp_autoHelix"]
        Class.znp_autoSniper.UPGRADES_TIER_3 = ["znp_megaAutoSniper", "znp_tripleAutoSniper", "autoAssassin", "znp_autoHunter", "znp_autoMinigun", "znp_autoRifle"]
        Class.znp_autoMachineGun.UPGRADES_TIER_3 = ["znp_megaAutoMachineGun", "znp_tripleAutoMachineGun", "znp_autoArtillery", "znp_autoMinigun", "autoGunner", "znp_autoSprayer"]
        Class.znp_autoFlankGuard.UPGRADES_TIER_3 = ["znp_megaAutoFlankGuard", "znp_tripleAutoFlankGuard", "znp_autoHexaTank", "autoTriAngle", "znp_autoAuto3", "znp_autoTrapGuard", "hexaTrapper"]
        Class.znp_autoDirector.UPGRADES_TIER_3 = ["znp_megaAutoDirector", "znp_tripleAutoDirector", "autoOverseer", "autoCruiser", "znp_autoUnderseer", "autoSpawner"]
        Class.znp_autoPounder.UPGRADES_TIER_3 = ["znp_megaAutoPounder", "znp_tripleAutoPounder", "znp_autoDestroyer", "autoBuilder", "znp_autoArtillery", "znp_autoLauncher", "znp_autoVolute"]
        Class.znp_autoTrapper.UPGRADES_TIER_3 = ["znp_megaAutoTrapper", "znp_tripleAutoTrapper", "autoBuilder", "hexaTrapper", "znp_autoTrapGuard"]
        Class.znp_autoDesmos.UPGRADES_TIER_3 = ["znp_megaAutoDesmos", "znp_tripleAutoDesmos", "znp_autoVolute", "znp_autoHelix"]
