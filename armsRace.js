// note from trplnr: please dont use glitch or github.com's text editor
// use https://github.dev/Taureon/aps-plus-plus-addons/blob/main/armsRace.js if you dont plan on getting a code editor
// im telling u this bcuz syntax errors

// use camelCase - zenphia
// use camelCase - zenphia
// use camelCase - zenphia

// KEEP THE STYLE CONSISTENT
// IF YOU COPY-PASTED CODE WITH DIFFERENT FORMATTING, CHANGE IT TO MAKE IT ABIDE BY THE FORMATTING
// THIS IS IMPORTANT TO KEEP THE CODE SMALL

const { dereference, combineStats, addBackGunner, makeAuto, makeHybrid } = require('../facilitators.js');
const { base, gunCalcNames, statnames } = require('../constants.js');
const g = require('../gunvals.js');

let makeBird = (type, name = -1, color) => {
    let output = dereference(type),
        shootyBois = [{
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]), TYPE: "bullet", LABEL: gunCalcNames.thruster }
        },{
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]), TYPE: "bullet", LABEL: gunCalcNames.thruster }
        },{
            POSITION: [18, 8, 1, 0, 0, 180, 0.6],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]), TYPE: "bullet", LABEL: gunCalcNames.thruster }
        }];
    if (color) for (let i = 0; i < 3; i++) shootyBois[i].PROPERTIES.TYPE = [shootyBois[i].PROPERTIES.TYPE, { COLOR: color, KEEP_OWN_COLOR: true }];
    for (let i in output.GUNS) if (output.GUNS[i].PROPERTIES) output.GUNS[i].PROPERTIES.ALT_FIRE = true;
    if (output.FACING_TYPE == "locksFacing") output.FACING_TYPE = "toTarget";
    output.GUNS = type.GUNS == null ? [...shootyBois] : [...output.GUNS, ...shootyBois];
    output.LABEL = name == -1 ? "Bird " + type.LABEL : name;
    return output;
};

module.exports = ({ Class }) => {
    //needed turrets
    Class.megaAutoTurret = {
        PARENT: "genericTank",
        LABEL: "",
        BODY: { FOV: 2, SPEED: 0.9 },
        CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
        COLOR: 16,
        GUNS: [{
            POSITION: [22, 14, 1, 0, 0, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]), TYPE: "bullet" }
        }]
    };
    Class.drifterBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true }]],
    COLOR: 9,
    SHAPE: 4,
    INDEPENDENT: true,
};
    Class.limpetBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true }]],
    COLOR: 9,
    SHAPE: 5,
    INDEPENDENT: true,
};
    Class.megaAutoSmasherTurret = {
    PARENT: ["genericTank"],
    LABEL: "Turret",
    COLOR: 16,
    GUNS: [
        {
            POSITION: [20, 9, 1, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.morerecoil g.turret, g.fast, g.fast, g.mach, g.pound, g.pound, g.morereload, g.morereload]),
                TYPE: "bullet",
                STAT_CALCULATOR: gunCalcNames.fixedReload,
            },
        },
        {
            POSITION: [20, 9, 1, 0, -5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.morerecoil g.turret, g.fast, g.fast, g.mach, g.pound, g.pound, g.morereload, g.morereload]),
                TYPE: "bullet",
                STAT_CALCULATOR: gunCalcNames.fixedReload,
            },
        },
    ],
};
    //bullets 

    //tripletwin upgrades
    Class.quadTwin = {
        PARENT: 'genericTank',
        LABEL: 'Quad Twin',
        GUNS: [{
            POSITION: [20, 8, 1, 0, -5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' }
        },{
            POSITION: [20, 8, 1, 0, -5.5, -90, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 90, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 90, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' }
        },{
            POSITION: [20, 8, 1, 0, 5.5, -90, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' }
        }]
    };
    Class.autoTripleTwin = makeAuto(Class.tripleTwin);
    Class.bentTriple = {
        PARENT: ["genericTank"],
        LABEL: "Bent Triple",
        DANGER: 6,
        BODY: { SPEED: base.SPEED * 0.9 },
        GUNS: [{
            POSITION: [19, 8, 1, 0, -2, -17.5, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        },{
            POSITION: [19, 8, 1, 0, 2, 17.5, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        },{
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        },{
            POSITION: [19, 8, 1, 0, -2, -137.5, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        },{
            POSITION: [19, 8, 1, 0, 2, 137.5, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        },{
            POSITION: [22, 8, 1, 0, 0, 120, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        },{
            POSITION: [19, 8, 1, 0, -2, -257.5, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        },{
            POSITION: [19, 8, 1, 0, 2, 257.5, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        },{
            POSITION: [22, 8, 1, 0, 0, 240, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        }]
    };
    Class.hewnTripleTwin = {
        PARENT: ["genericTank"],
        LABEL: "Hewn Triple",
        DANGER: 7,
        GUNS: [{
            POSITION: [19, 8, 1, 0, 5.5, 205, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [19, 8, 1, 0, -5.5, -205, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 120, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 120, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 240, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 240, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        }]
    };
    Class.tripleFlankTwin = {
        PARENT: ["genericTank"],
        LABEL: "Triple Flank Twin",
        DANGER: 7,
        GUNS: [{
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank]), TYPE: "bullet" }
        },{
            POSITION: [18, 8, 1, 0, 0, 120, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank]), TYPE: "bullet" }
        },{
            POSITION: [18, 8, 1, 0, 0, 240, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 120, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 120, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 240, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 240, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        }]
    };
    Class.tripleGunner = {
        PARENT: ["genericTank"],
        LABEL: "Triple Gunner",
        DANGER: 6,
        GUNS: [{
            POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [12, 3.5, 1, 0, 127.25, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [12, 3.5, 1, 0, -127.25, 0, 0.75],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [16, 3.5, 1, 0, 123.75, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [16, 3.5, 1, 0, -123.75, 0, 0.25],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [12, 3.5, 1, 0, 247.25, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [12, 3.5, 1, 0, -247.25, 0, 0.75],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [16, 3.5, 1, 0, 243.75, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [16, 3.5, 1, 0, -243.75, 0, 0.25],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }]
    };
    Class.warkWarkWark = {
        PARENT: ["genericTank"],
        LABEL: "Warkwarkwark",
        STAT_NAMES: statnames.generic,
        DANGER: 7,
        GUNS: [{
            POSITION: [13, 8, 1, 0, 5.5, 185, 0]
        },{
            POSITION: [3, 9, 1.5, 13, 5.5, 185, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        },{
            POSITION: [13, 8, 1, 0, -5.5, 175, 0]
        },{
            POSITION: [3, 9, 1.5, 13, -5.5, 175, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        },{
            POSITION: [13, 8, 1, 0, 5.5, 305, 0]
        },{
            POSITION: [3, 9, 1.5, 13, 5.5, 305, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        },{
            POSITION: [13, 8, 1, 0, -5.5, 295, 0]
        },{
            POSITION: [3, 9, 1.5, 13, -5.5, 295, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        },{
            POSITION: [13, 8, 1, 0, 5.5, 65, 0]
        },{
            POSITION: [3, 9, 1.5, 13, 5.5, 65, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        },{
            POSITION: [13, 8, 1, 0, -5.5, 55, 0]
        },{
            POSITION: [3, 9, 1.5, 13, -5.5, 55, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        }]
    };
    //hewn double upgrades
    Class.autoHewnDouble = makeAuto(Class.hewnDouble);
    Class.cleft = {
        PARENT: ["genericTank"],
        LABEL: "Cleft",
        DANGER: 7,
        GUNS: [{
            POSITION: [19, 8, 1, 0, 5.5, 205, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [19, 8, 1, 0, -5.5, -205, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, -180, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [19, 8, 1, 0, 5.5, 25, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [19, 8, 1, 0, -5.5, -25, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }]
    };
    Class.skewnDouble = {
        PARENT: ["genericTank"],
        LABEL: "Skewn Double",
        DANGER: 7,
        GUNS: [{
            POSITION: [19, 8, 1, 0, 5.5, 205, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [19, 8, 1, 0, -5.5, -205, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [19, 8, 1, 0, 5.5, 215, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [19, 8, 1, 0, -5.5, -215, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]), TYPE: "bullet" }
        }]
    };
    Class.hewnFlankDouble = {
        PARENT: ["genericTank"],
        LABEL: "Hewn Flank Double",
        DANGER: 7,
        GUNS: [{
            POSITION: [19, 8, 1, 0, 5.5, 205, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [19, 8, 1, 0, -5.5, -205, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 0, 135, 1],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 0, 270, 1],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]), TYPE: "bullet" }
        }]
    };
    Class.hewnGunner = {
        PARENT: ["genericTank"],
        LABEL: "Hewn Gunner",
        DANGER: 6,
        GUNS: [{
            POSITION: [19, 8, 1, 0, 5.5, 205, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [19, 8, 1, 0, -5.5, -205, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        },{
            POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [12, 3.5, 1, 0, 7.25, 180, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [12, 3.5, 1, 0, -7.25, 180, 0.75],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [16, 3.5, 1, 0, 3.75, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        },{
            POSITION: [16, 3.5, 1, 0, -3.75, 180, 0.25],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }]
    };
    Class.warkWaWarkrk = {
        PARENT: ["genericTank"],
        LABEL: "Warkwawarkrk",
        DANGER: 7,
        GUNS: [{
            POSITION: [19, 8, 1, 0, 5.5, 205, 0.5]
        },{
            POSITION: [19, 8, 1.5, 13, 5.5, 205, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        },{
            POSITION: [19, 8, 1, 0, -5.5, -205, 0]
        },{
            POSITION: [19, 8, 1.5, 13, -5.5, -205, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 180, 0]
        },{
            POSITION: [20, 8, 1.5, 13, 5.5, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5]
        },{
            POSITION: [20, 8, 1.5, 13, -5.5, 180, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 0, 0]
        },{
            POSITION: [20, 8, 1.5, 13, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5]
        },{
            POSITION: [20, 8, 1.5, 13, -5.5, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        }]
    };
    //auto-double upgrades
    Class.megaAutoDoubleTwin = {
        PARENT: ["genericTank"],
        LABEL: "Mega Auto-Double Twin",
        DANGER: 6,
        GUNS: [{
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        }],
        TURRETS: [{
            POSITION: [10, 0, 0, 0, 180, 1], TYPE: "megaautoturret"
        }]
    };
    Class.tripleAutoDoubleTwin = {
        PARENT: ["genericTank"],
        LABEL: "Mega Auto-Double Twin",
        DANGER: 6,
        GUNS: [{
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        }],
        TURRETS: [{
            POSITION: [6, 3, 5, 0, 360, 1],
            TYPE: ["autoTurret", { INDEPENDENT: true, COLOR: 16 }]
        },{
            POSITION: [6, 3, -5, 0, 360, 1],
            TYPE: ["autoTurret", { INDEPENDENT: true, COLOR: 16 }]
        },{
            POSITION: [6, -5, 0, 0, 360, 1],
            TYPE: ["autoTurret", { INDEPENDENT: true, COLOR: 16 }]
        }]
    };
    Class.DoubleFlankTwin = {
        PARENT: ["genericTank"],
        LABEL: "Double Flank Twin",
        DANGER: 6,
        GUNS: [{
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 0, 135, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 0, 270, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        }]
    };

    //Single upgrades

    Class.duo = {
        PARENT: ["genericTank"],
        LABEL: 'Duo',
        GUNS: [{
            POSITION: [20, 8, 1, 0, -5, 0, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.single]), TYPE: "bullet" }
        },{
            POSITION: [20, 8, 1, 0, 5, 0, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.single]), TYPE: "bullet" }
        },{
            POSITION: [13, 17, 1, 0, 0, 0, 0 ]
        }]
    };

    Class.sharpshooter = {
        PARENT: ["genericTank"],
        LABEL: "Sharpshooter",
        GUNS: [{
            POSITION: [26, 8, 1, 0, 0, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.single, g.assass]), TYPE: "bullet" }
        },{
            POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0]
        }]
    };
    Class.gadgetGun = {
        PARENT: ["genericTank"],
        LABEL: "Gadget Gun",
        GUNS: [{
            POSITION: [19, 8, 1.4, 0, 0, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.single]), TYPE: "bullet" }
        },{
            POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0]
        }]
    };
    Class.ternion = {
        PARENT: ["genericTank"],
        LABEL: "Ternion",
        BODY: { SPEED: 1.12 * base.SPEED },
        GUNS: [{
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.single]), TYPE: "bullet" }
        },{
            POSITION: [18, 8, 1, 0, 0, 120, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.single]), TYPE: "bullet" }
        },{
            POSITION: [18, 8, 1, 0, 0, 240, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.single]), TYPE: "bullet" }
        },{
            POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0]
        },{
            POSITION: [5.5, 8, -1.8, 6.5, 0, 120, 0]
        },{
            POSITION: [5.5, 8, -1.8, 6.5, 0, 240, 0]
        }]
    };
    Class.coordinator = {
        PARENT: ["genericTank"],
        LABEL: "Coordinator",
        STAT_NAMES: statnames.drone,
        BODY: { FOV: base.FOV * 1.1 },
        GUNS: [{
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 11, 1.8, 15, 0, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.drone, g.single]), TYPE: "drone", AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                MAX_CHILDREN: 6
            }
        },{
            POSITION: [12, 9, -2.05, 5, 0, 0, 0 ]
        }]
    };
    Class.bruiser = {
        PARENT: ["genericTank"],
        LABEL: "Bruiser",
        DANGER: 6,
        GUNS: [{
            POSITION: [21, 14, 1, 0, 0, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.single]), TYPE: "bullet" }
        },{
            POSITION: [5.5, 14, -1.8, 6.5, 0, 0, 0]
        }]
    };
    Class.tricker = {
        PARENT: ["genericTank"],
        LABEL: "Tricker",
        STAT_NAMES: statnames.trap,
        GUNS: [{
            POSITION: [15, 7, 1, 0, 0, 0, 0]
        },{
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.single]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        },{
            POSITION: [5.5, 7, -1.8, 6.5, 0, 0, 0]
        }]
    };
    Class.mono = {
        PARENT: ["genericTank"],
        LABEL: 'Mono',
        GUNS: [{
            POSITION: [23, 8, 1, 0, 0, 0, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.single, g.single]), TYPE: "bullet" }
        },{
            POSITION: [5, 8, -1.5, 15, 0, 0, 0 ]
        },{
            POSITION: [5, 8, 1.5, 10, 0, 0, 0 ]
        }]
    };
    //smasher upgrades

    Class.ultraSmasher = {
    PARENT: ["genericTank"],
    LABEL: "Ultra-Smasher",
    DANGER: 8,
    BODY: {
        SPEED: 1.05 * base.SPEED, FOV: 1.245 * base.FOV, DENSITY: 6 * base.DENSITY,
    },
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
    TURRETS: [{
            POSITION: [29.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody", },],};
    
    Class.megaSpike = {
    PARENT: ["genericTank"],
    LABEL: "Mega-Spike",
    DANGER: 8,
    BODY: {SPEED: base.SPEED * 1, DAMAGE: base.DAMAGE * 1.15, FOV: base.FOV * 1.1, DENSITY: base.DENSITY * 3,},
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
    TURRETS: [
        {
            /** SIZE     X       Y     ANGLE    ARC */
            POSITION: [22.5, 0, 0, 0, 360, 0],
            TYPE: "spikeBody",
        },
        {
            POSITION: [22.5, 0, 0, 90, 360, 0],
            TYPE: "spikeBody",
        },
        {
            POSITION: [22.5, 0, 0, 180, 360, 0],
            TYPE: "spikeBody",
        },
        {
            POSITION: [22.5, 0, 0, 270, 360, 0],
            TYPE: "spikeBody",},],};

    Class.megaLandmine = {
    PARENT: ["genericTank"],
    LABEL: "Mega-Landmine",
    INVISIBLE: [0.06, 0.01],
    TOOLTIP: "Stay still to turn invisible.",
    DANGER: 7,
    BODY: {SPEED: 1.2 * base.SPEED, FOV: 1.1 * base.FOV, DENSITY: 3 * base.DENSITY,},
    TURRETS: [{
            POSITION: [25.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",},{
            POSITION: [25.5, 0, 0, 30, 360, 0],
            TYPE: "landmineBody",},
    ],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,};

    Class.autoMegaSmasher = makeAuto(Class.megaSmasher, "Auto-Mega-Smasher", {
    type: "autoSmasherTurret",
    size: 11,
    });
    Class.autoMegaSmasher.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl];
    
    Class.bonker = {
    PARENT: ["genericTank"],
    LABEL: "Bonker",
    DANGER: 8,
    SIZE: 10,    
    BODY: { FOV: 0.9 * base.FOV, DENSITY: 1.3 * base.DENSITY, SPEED: 1.2 * base.SPEED },
    TURRETS: [{
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher, };
    
    Class.megaBonker = {
    PARENT: ["genericTank"],
    LABEL: "Mega-Bonker",
    DANGER: 8,
    SIZE: 10,    
    BODY: { FOV: 1.05 * base.FOV, DENSITY: 1.5 * base.DENSITY, SPEED: 1.25 * base.SPEED },
    TURRETS: [{
            POSITION: [25, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,};
    
    Class.drifter = {
    PARENT: ["genericTank"],
    LABEL: "Drifter",
    DANGER: 8,
    BODY: {FOV: 1.05 * base.FOV, DENSITY: 2 * base.DENSITY,},
    TURRETS: [{
            POSITION: [19.5, 0, 0, 0, 360, 0],
            TYPE: "drifterBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,};
    
    Class.megaDrifter = {
    PARENT: ["genericTank"],
    LABEL: "Mega-Drifter",
    DANGER: 8,
    BODY: {FOV: 1.1 * base.FOV, DENSITY: 3 * base.DENSITY, SPEED: 1.1 * base.SPEED},
    TURRETS: [{
            POSITION: [24, 0, 0, 0, 360, 0],
            TYPE: "drifterBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,};
    
    Class.thorn = {
    PARENT: ["genericTank"],
    LABEL: "Thorn",
    DANGER: 8,
    BODY: {
        SPEED: base.SPEED * 0.8,
        DAMAGE: base.DAMAGE * 1.2,
        FOV: base.FOV * 1.075,
        DENSITY: base.DENSITY * 2.25,
    },
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
    TURRETS: [{
            /** SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, 0, 0, 360, 0],
            TYPE: "spikeBody",},{
            POSITION: [18.5, 0, 0, 90, 360, 0],
            TYPE: "spikeBody",},{
            POSITION: [20, 0, 0, 180, 360, 0],
            TYPE: "spikeBody",},{
            POSITION: [18.5, 0, 0, 270, 360, 0],
            TYPE: "spikeBody",},{           
            POSITION: [20, 0, 0, 45, 360, 0],
            TYPE: "spikeBody",},{
            POSITION: [18.5, 0, 0, 135, 360, 0],
            TYPE: "spikeBody",},{
            POSITION: [20, 0, 0, 215, 360, 0],
            TYPE: "spikeBody",},{
            POSITION: [18.5, 0, 0, 305, 360, 0],
            TYPE: "spikeBody",},
    ],
};

    let bangerBodyShape = [];
    Math.TAU = Math.PI * 2;
    for (let i = 0; i < 128; i++) {
        let angle = i * Math.TAU / 128,
            length = 1 - Math.abs(Math.sin(4 * angle)) / Math.TAU;
        bangerBodyShape.push([
            Math.sin(angle) * length,
            Math.cos(angle) * length
        ]);
    }

    Class.bangerBody = { SHAPE: bangerBodyShape };

     let prickBodyShape = [];
    Math.TAU = Math.PI * 2;
    for (let i = 0; i < 128; i++) {
        let angle = i * Math.TAU / 128,
            length = 1 - Math.abs(Math.sin(6 * angle)) / Math.TAU;
        prickBodyShape.push([
            Math.sin(angle) * length,
            Math.cos(angle) * length
        ]);
    }

    Class.prickBody = { SHAPE: prickBodyShape };

    let sharperBodyShape = [];
    Math.TAU = Math.PI * 2;
    for (let i = 0; i < 128; i++) {
        let angle = i * Math.TAU / 128,
            length = 1 - Math.abs(Math.sin(2 * angle)) / Math.TAU;
        sharperBodyShape.push([
            Math.sin(angle) * length,
            Math.cos(angle) * length
        ]);
    }

    Class.sharperBody = { SHAPE: sharperBodyShape };

    Class.claymore = {
    PARENT: ["genericTank"],
    LABEL: "Claymore",
    INVISIBLE: [0.06, 0.01],
    TOOLTIP: "Stay still to turn invisible.",
    DANGER: 8,
    BODY: {SPEED: base.SPEED, DAMAGE: base.DAMAGE * 1.125, FOV: base.FOV * 1.08, DENSITY: base.DENSITY * 1.9,},
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
    TURRETS: [{
            /** SIZE     X       Y     ANGLE    ARC */
            POSITION: [16, 0, 0, 0, 360, 0],
            TYPE: "spikeBody",},{
            POSITION: [16, 0, 0, 90, 360, 0],
            TYPE: "spikeBody",},{
            POSITION: [16, 0, 0, 180, 360, 0],
            TYPE: "spikeBody",},{
            POSITION: [16, 0, 0, 270, 360, 0],
            TYPE: "spikeBody",},{
            POSITION: [16, 0, 0, 0, 360, 0],
            TYPE: "spikeBody",},{
            POSITION: [16, 0, 0, 90, 360, 0],
            TYPE: "spikeBody",},{
            POSITION: [16, 0, 0, 180, 360, 0],
            TYPE: "spikeBody",},{
            POSITION: [16, 0, 0, 270, 360, 0],
            TYPE: "spikeBody",},],
};

    Class.autoSpike = makeAuto(Class.spike, "Auto-Spike", {
    type: "autoSmasherTurret",
    size: 11,
});
Class.autoSpike.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl];

    Class.spear = {
    PARENT: ["genericTank"],
    LABEL: "Spear",
    DANGER: 8,
    BODY: {
        SPEED: base.SPEED * 0.75,
        DAMAGE: base.DAMAGE * 1.15,
        FOV: base.FOV * 1.1,
        DENSITY: base.DENSITY * 2.3,
    },
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
    TURRETS: [{/** SIZE     X       Y     ANGLE    ARC */
            POSITION: [18.5, 0, 0, 0, 360, 0],
            TYPE: "spikeBody",},{
            POSITION: [18.5, 0, 0, 90, 360, 0],
            TYPE: "spikeBody",},{
            POSITION: [18.5, 0, 0, 180, 360, 0],
            TYPE: "spikeBody",},{
            POSITION: [18.5, 0, 0, 270, 360, 0],
            TYPE: "spikeBody",},],
};
    Class.cauldron = {
    PARENT: ["genericTank"],
    LABEL: "Cauldron",
    DANGER: 8,
    BODY: {FOV: 1.1 * base.FOV, DENSITY: 2.15 * base.DENSITY, DAMAGE: base.DAMAGE * 1.1,},
    TURRETS: [{
            POSITION: [19.5, 0, 0, 0, 360, 0],
            TYPE: "drifterBody",},
             {
            POSITION: [19.5, 0, 0, 0, 180, 0],
            TYPE: "drifterBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,};
    
    Class.megaAutoSmasher = {
    PARENT: ["genericTank"],
    LABEL: "Mega-Auto-Smasher",
    DANGER: 6,
    BODY: {FOV: 1.1 * base.FOV, DENSITY: 2 * base.DENSITY,},
    TURRETS: [{
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: "megaAutoSmasherTurret",},{
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
};
    Class.tripleAutoSmasher = {
    PARENT: ["genericTank"],
    LABEL: "Triple Auto-Smasher",
    DANGER: 6,
    BODY: {FOV: 1.15 * base.FOV, DENSITY: 2 * base.DENSITY,},
    TURRETS: [{
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",},{
            POSITION: [6, 3, 5, 0, 360, 1],
            TYPE: ["autoTurret", { INDEPENDENT: true, COLOR: 16 }]},{
            POSITION: [6, 3, -5, 0, 360, 1],
            TYPE: ["autoTurret", { INDEPENDENT: true, COLOR: 16 }]},{
            POSITION: [6, -5, 0, 0, 360, 1],
            TYPE: ["autoTurret", { INDEPENDENT: true, COLOR: 16 }]},
    ],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
};
    Class.doubleAutoSmasher = makeAuto(Class.autoSmasher, "Double Auto-Smasher", {
    type: "autoSmasherTurret",
    size: 11,
});
Class.doubleAutoSmasher.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl];

    Class.tripletAutoSmasher = {
    PARENT: ["genericTank"],
    LABEL: "Triple Auto-Smasher",
    DANGER: 6,
    BODY: {FOV: 1.15 * base.FOV, DENSITY: 2 * base.DENSITY,},
    TURRETS: [{
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",},{
            POSITION: [6, 3, 5, 0, 360, 1],
            TYPE: ["triplet", { INDEPENDENT: true, COLOR: 16, CONTROLLERS: "nearestDifferentMaster", AUTOFIRE: true}]},
    ],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
};

    Class.banger = {
    PARENT: ["genericTank"],
    LABEL: "Banger",
    DANGER: 8,
    SIZE: 15,
    BODY: {FOV: 1.15 * base.FOV, DENSITY: 3 * base.DENSITY, DAMAGE: base.DAMAGE * 1.05},
    TURRETS: [{
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "bangerBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
};
    Class.sharper = {
    PARENT: ["genericTank"],
    LABEL: "Sharper",
    DANGER: 8,
    SIZE: 15,
    BODY: {FOV: 1.1 * base.FOV, DENSITY: 2.2 * base.DENSITY, DAMAGE: base.DAMAGE * 1.125},
    TURRETS: [{
            POSITION: [19, 0, 0, 0, 360, 0],
            TYPE: "drifterBody",},
             {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "sharperBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
};
    Class.megaBanger = {
    PARENT: ["genericTank"],
    LABEL: "Mega-Banger",
    DANGER: 8,
    SIZE: 15,
    BODY: {FOV: 1.15 * base.FOV, DENSITY: 4 * base.DENSITY, DAMAGE: base.DAMAGE * 1.05},
    TURRETS: [{
            POSITION: [25, 0, 0, 0, 360, 0],
            TYPE: "bangerBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
};
    Class.slammer = {
    PARENT: ["genericTank"],
    LABEL: "Slammer",
    DANGER: 8,
    SIZE: 18,
    BODY: {FOV: 1.2 * base.FOV, DENSITY: 4 * base.DENSITY, DAMAGE: base.DAMAGE * 1.1, SPEED: 0.7 * base.SPEED},
    TURRETS: [{
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "bangerBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
};
    Class.hexaAutoSmasher = {
    PARENT: ["genericTank"],
    LABEL: "Hexa Auto-Smasher",
    DANGER: 6,
    BODY: {FOV: 1.05 * base.FOV, DENSITY: 2 * base.DENSITY,},
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",
        },
        {
            POSITION: [11, 0, 0, 0, 360, 0],
            TYPE: ["hexaTank", { INDEPENDENT: true, COLOR: 16, CONTROLLERS: "nearestDifferentMaster", AUTOFIRE: true}]
        },
    ],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
};
    Class.autoLandmine = makeAuto(Class.landmine, "Auto-Landmine", {
    type: "autoSmasherTurret",
    size: 11,
});
Class.autoLandmine.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl];
    
    Class.autoBonker = makeAuto(Class.bonker, "Auto-Bonker", {
    type: "autoSmasherTurret",
    size: 11,
});
Class.autoBonker.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl];

    Class.autoBanger = makeAuto(Class.banger, "Auto-Banger", {
    type: "autoSmasherTurret",
    size: 11,
});
Class.autoBanger.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl];

    Class.autoDrifter = makeAuto(Class.drifter, "Auto-Drifter", {
    type: "autoSmasherTurret",
    size: 11,
});
Class.autoDrifter.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl];

    Class.limpet = {
    PARENT: ["genericTank"],
    LABEL: "Limpet",
    TOOLTIP: "You are always invisible!",
    DANGER: 8,
    ALPHA: 0.25,
    BODY: {SPEED: 1.1 * base.SPEED,FOV: 1.1 * base.FOV,DENSITY: 2 * base.DENSITY,},
    TURRETS: [{
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "limpetBody",},{
            POSITION: [21.5, 0, 0, 30, 360, 0],
            TYPE: "limpetBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
};
    Class.decoy = {
    PARENT: ["genericTank"],
    LABEL: "Decoy",
    TOOLTIP: "Stay Still to turn invisible.",
    DANGER: 8,
    SIZE: 10,
    INVISIBLE: 0.01, 0.06,
    BODY: {SPEED: 1.2 * base.SPEED,FOV: 1.025 * base.FOV,DENSITY: 1.5 * base.DENSITY,},
    TURRETS: [{
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",},{
            POSITION: [21.5, 0, 0, 30, 360, 0],
            TYPE: "landmineBody",},{
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",},{
            POSITION: [21.5, 0, 0, 30, 360, 0],
            TYPE: "landmineBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
};

    Class.tripwire = {
    PARENT: ["genericTank"],
    LABEL: "Tripwire",
    TOOLTIP: "Stay Still to turn invisible.",
    INVISIBLE: 0.01, 0.06,
    SIZE: 15,
    DANGER: 8,
    BODY: {SPEED: 0.99 * base.SPEED,FOV: 1.2 * base.FOV,DENSITY: 2.5 * base.DENSITY,},
    TURRETS: [{
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "bangerBody",},{
            POSITION: [21.5, 0, 0, 30, 360, 0],
            TYPE: "bangerBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
};
    Class.vessel = {
    PARENT: ["genericTank"],
    LABEL: "Vessel",
    TOOLTIP: "Stay Still to turn invisible.",
    INVISIBLE: 0.01, 0.06,
    SIZE: 15,
    DANGER: 8,
    BODY: {SPEED: 0.99 * base.SPEED,FOV: 1.2 * base.FOV,DENSITY: 2.5 * base.DENSITY,},
    TURRETS: [{
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "drifterBody",},{
            POSITION: [21.5, 0, 0, 30, 360, 0],
            TYPE: "drifterBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
};
    Class.basher = {
    PARENT: ["genericTank"],
    LABEL: "Basher",
    DANGER: 8,
    SIZE: 7,    
    BODY: { FOV: 0.8 * base.FOV, DENSITY: 1.15 * base.DENSITY, SPEED: 1.4 * base.SPEED },
    TURRETS: [{
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher, };

    Class.thwacker = {
    PARENT: ["genericTank"],
    LABEL: "Thwacker",
    DANGER: 8,
    BODY: {FOV: 1.1 * base.FOV, DENSITY: 2.5 * base.DENSITY, DAMAGE: base.DAMAGE * 1.1, SPEED: 1.025 * base.SPEED },
    TURRETS: [{
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "bangerBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
};
    Class.bundler = {
    PARENT: ["genericTank"],
    LABEL: "Bundler",
    DANGER: 8,
    SIZE: 10,
    BODY: {FOV: 1.05 * base.FOV, DENSITY: 1.5 * base.DENSITY,SPEED: 1.15 * base.SPEED},
    TURRETS: [{
            POSITION: [19.5, 0, 0, 0, 360, 0],
            TYPE: "drifterBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,};
    
    Class.prick = {
    PARENT: ["genericTank"],
    LABEL: "Prick",
    DANGER: 8,
    SIZE: 15,
    BODY: {FOV: 1.15 * base.FOV, DENSITY: 3 * base.DENSITY, DAMAGE: base.DAMAGE * 1.1, HEALTH: 1.15 * base.HEALTH },
    TURRETS: [{
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "prickBody",},],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
};
    //dev bosses
    Class.twilightBossBooster = {
        PARENT: ["bullet"],
        TYPE: "bullet",
        BODY: {
            ACCELERATION: base.ACCEL * 3,
            SPEED: base.SPEED * 2,
            HEALTH: base.HEALTH * 1.1,
            DAMAGE: base.DAMAGE * 1.3,
            PENETRATION: base.PENETRATION * 4,
            SHIELD: base.SHIELD * 0,
            REGEN: base.REGEN * 0,
            DENSITY: base.DENSITY * 0.3
        },
        GUNS: [{
            POSITION: [18, 8, 1, 0, 0, -150, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]), TYPE: "bullet", STAT_CALCULATOR: gunCalcNames.thruster }
        },{
            POSITION: [18, 8, 1, 0, 0, 150, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]), TYPE: "bullet", STAT_CALCULATOR: gunCalcNames.thruster }
        },{
            POSITION: [20, 8, 1, 0, 0, 0, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]), TYPE: "bullet", LABEL: 'Front' }
        }]
    };
    Class.twilightBossTwinMinion = {
        PARENT: ["minion"],
        LABEL: '',
        TYPE: 'minion',
        SHAPE: 0,
        DAMAGE_CLASS: 2,
        DANGER: 5,
        MOTION_TYPE: 'motor',
        FACING_TYPE: 'toTarget',
        SIZE: 12,
        MAX_CHILDREN: 0,
        DAMAGE_EFFECTS: false,
        BODY: {
            ACCELERATION: base.ACCEL * 0.9,
            SPEED: base.SPEED * 1.4,
            HEALTH: base.HEALTH * 0.875,
            DAMAGE: base.DAMAGE,
            PENETRATION: base.PENETRATION * 1.8,
            SHIELD: base.SHIELD * 0,
            REGEN: base.REGEN * 0,
            DENSITY: base.DENSITY * 0.7
        },
        GUNS: [{
            POSITION: [18, 8, 1, 0, 5.5, 0, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.minion]), TYPE: "bullet", LABEL: 'Twin Minion' }
        },{
            POSITION: [18, 8, 1, 0, -5.5, 0, 0.5 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.minion]), TYPE: "bullet", LABEL: 'Twin Minion' }
        }]
    };
    Class.twilightBossLayer5 = {
        PARENT: ["genericTank"],
        LABEL: '',
        SHAPE: 5,
        SIZE: 45,
        CONTROLLERS: [["spin", { independent: true, speed: -0.005 }]],
        COLOR: '#dab3ff',
        MAX_CHILDREN: 50,
        SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        GUNS: [{
            POSITION: [12, 7, -2, 0, 0, -35, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.battle, g.power]), TYPE: "autoswarm" }
        },{
            POSITION: [12, 7, -2, 0, 0, -107.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.battle, g.power]), TYPE: "autoswarm" }
        },{
            POSITION: [12, 7, -2, 0, 0, -179.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.battle, g.power]), TYPE: "autoswarm" }
        },{
            POSITION: [12, 7, -2, 0, 0, 108, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.battle, g.power]), TYPE: "autoswarm" }
        },{
            POSITION: [12, 7, -2, 0, 0, 36, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.battle, g.power]), TYPE: "autoswarm" }
        }]
    };

    Class.twilightBossLayer4 = {
        PARENT: ["genericTank"],
        LABEL: '4',
        SHAPE: 7,
        SIZE: 45,
        CONTROLLERS: [["spin", { independent: true, speed: 0.005 }]],
        COLOR: '#dab3ff',
        MAX_CHILDREN: 21,
        SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        GUNS: [{
            POSITION: [12, 4, 2.25, 0, 0, -25.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.overdrive]), TYPE: "turretedDrone" }
        },{
            POSITION: [12, 4, 2.25, 0, 0, -77, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.overdrive]), TYPE: "turretedDrone" }
        },{
            POSITION: [12, 4, 2.25, 0, 0, -128.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.overdrive]), TYPE: "turretedDrone" }
        },{
            POSITION: [12, 4, 2.25, 0, 0, -179.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.overdrive]), TYPE: "turretedDrone" }
        },{
            POSITION: [12, 4, 2.25, 0, 0, 129, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.overdrive]), TYPE: "turretedDrone" }
        },{
            POSITION: [12, 4, 2.25, 0, 0, 78, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.overdrive]), TYPE: "turretedDrone" }
        },{
            POSITION: [12, 4, 2.25, 0, 0, 26.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.overdrive]), TYPE: "turretedDrone" }
        }]
    };
    Class.twilightBossLayer3 = {
        PARENT: ["genericTank"],
        LABEL: '3',
        SHAPE: 9,
        CONTROLLERS: [["spin", { independent: true, speed: -0.005 }]],
        COLOR: '#dab3ff',
        SIZE: 45,
        MAX_CHILDREN: 18,
        SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        GUNS: [{
            POSITION: [12, 7, 1, 0, 0, -19, 0 ]
        },{
            POSITION: [12, 7, 1, 0, 0, -60, 0 ]
        },{
            POSITION: [12, 7, 1, 0, 0, -100, 0 ]
        },{
            POSITION: [12, 7, 1, 0, 0, -139.5, 0 ]
        },{
            POSITION: [12, 7, 1, 0, 0, 180, 0 ]
        },{
            POSITION: [12, 7, 1, 0, 0, 140.5, 0 ]
        },{
            POSITION: [12, 7, 1, 0, 0, 99.5, 0 ]
        },{
            POSITION: [12, 7, 1, 0, 0, 60.5, 0 ]
        },{
            POSITION: [12, 7, 1, 0, 0, 20, 0 ]
        },{
            POSITION: [2, 7, 1, 15.5, 0, -18.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.factory, g.power]), TYPE: "twilightBossTwinMinion" }
        },{
            POSITION: [2, 7, 1, 15.5, 0, -59.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.factory, g.power]), TYPE: "twilightBossTwinMinion" }
        },{
            POSITION: [2, 7, 1, 15.5, 0, -100, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.factory, g.power]), TYPE: "twilightBossTwinMinion" }
        },{
            POSITION: [2, 7, 1, 15.5, 0, -138.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.factory, g.power]), TYPE: "twilightBossTwinMinion" }
        },{
            POSITION: [2, 7, 1, 15.5, 0, -180, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.factory, g.power]), TYPE: "twilightBossTwinMinion" }
        },{
            POSITION: [2, 7, 1, 15.5, 0, 142, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.factory, g.power]), TYPE: "twilightBossTwinMinion" }
        },{
            POSITION: [2, 7, 1, 15.5, 0, 99.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.factory, g.power]), TYPE: "twilightBossTwinMinion" }
        },{
            POSITION: [2, 7, 1, 15.5, 0, 61, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.factory, g.power]), TYPE: "twilightBossTwinMinion" }
        },{
            POSITION: [2, 7, 1, 15.5, 0, 20, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.factory, g.power]), TYPE: "twilightBossTwinMinion" }
        },{
            POSITION: [5, 7, 1, 10.5, 0, -18.5, 0 ]
        },{
            POSITION: [5, 7, 1, 10.5, 0, -59.5, 0 ]
        },{
            POSITION: [5, 7, 1, 10.5, 0, -100, 0 ]
        },{
            POSITION: [5, 7, 1, 10.5, 0, -138.5, 0 ]
        },{
            POSITION: [5, 7, 1, 10.5, 0, 180, 0 ]
        },{
            POSITION: [5, 7, 1, 10.5, 0, 142, 0 ]
        },{
            POSITION: [5, 7, 1, 10.5, 0, 99.5, 0 ]
        },{
            POSITION: [5, 7, 1, 10.5, 0, 61, 0 ]
        },{
            POSITION: [5, 7, 1, 10.5, 0, 19.5, 0 ]
        }]
    };


    Class.twilightBossLayer2 = {
        PARENT: ["genericTank"],
        LABEL: '2',
        CONTROLLERS: [["spin", { independent: true, speed: 0.005 }]],
        SHAPE: 11,
        COLOR: '#dab3ff',
        SIZE: 50,
        SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        GUNS: [{
            POSITION: [14, 5, 1.25, 0, 0, -15, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.single]), TYPE: "twilightBossBooster" }
        },{
            POSITION: [14, 5, 1.25, 0, 0, -49, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.single]), TYPE: "twilightBossBooster" }
        },{
            POSITION: [14, 5, 1.25, 0, 0, -81.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.single]), TYPE: "twilightBossBooster" }
        },{
            POSITION: [14, 5, 1.25, 0, 0, -115.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.single]), TYPE: "twilightBossBooster" }
        },{
            POSITION: [14, 5, 1.25, 0, 0, -148.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.single]), TYPE: "twilightBossBooster" }
        },{
            POSITION: [14, 5, 1.25, 0, 0, 179.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.single]), TYPE: "twilightBossBooster" }
        },{
            POSITION: [14, 5, 1.25, 0, 0, 146.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.single]), TYPE: "twilightBossBooster" }
        },{
            POSITION: [14, 5, 1.25, 0, 0, 115, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.single]), TYPE: "twilightBossBooster" }
        },{
            POSITION: [14, 5, 1.25, 0, 0, 81.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.single]), TYPE: "twilightBossBooster" }
        },{
            POSITION: [14, 5, 1.25, 0, 0, 49, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.single]), TYPE: "twilightBossBooster" }
        },{
            POSITION: [14, 5, 1.25, 0, 0, 17, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.single]), TYPE: "twilightBossBooster" }
        },{
            POSITION: [1, 5, 1.25, 13, 0, -15, 0 ]
        },{
            POSITION: [1, 5, 1.25, 13, 0, -49, 0 ]
        },{
            POSITION: [1, 5, 1.25, 13, 0, -81.5, 0 ]
        },{
            POSITION: [1, 5, 1.25, 13, 0, -115, 0 ]
        },{
            POSITION: [1, 5, 1.25, 13, 0, -148, 0 ]
        },{
            POSITION: [1, 5, 1.25, 13, 0, 180, 0 ]
        },{
            POSITION: [1, 5, 1.25, 13, 0, 146.5, 0 ]
        },{
            POSITION: [1, 5, 1.25, 13, 0, 115, 0 ]
        },{
            POSITION: [1, 5, 1.25, 13, 0, 81, 0 ]
        },{
            POSITION: [1, 5, 1.25, 13, 0, 48.5, 0 ]
        },{
            POSITION: [1, 5, 1.25, 13, 0, 17, 0 ]
        },{
            POSITION: [2, 2, 1, 10.5, 0, -15, 0 ]
        },{
            POSITION: [2, 2, 1, 10.5, 0, -48.5, 0 ]
        },{
            POSITION: [2, 2, 1, 10.5, 0, -81.5, 0 ]
        },{
            POSITION: [2, 2, 1, 10.5, 0, -115.5, 0 ]
        },{
            POSITION: [2, 2, 1, 10.5, 0, -148.5, 0 ]
        },{
            POSITION: [2, 2, 1, 10.5, 0, 179.5, 0 ]
        },{
            POSITION: [2, 2, 1, 10.5, 0, 146.5, 0 ]
        },{
            POSITION: [2, 2, 1, 10.5, 0, 115, 0 ]
        },{
            POSITION: [2, 2, 1, 10.5, 0, 81, 0 ]
        },{
            POSITION: [2, 2, 1, 10.5, 0, 49, 0 ]
        },{
            POSITION: [2, 2, 1, 10.5, 0, 17, 0 ]
        }]
    };
    Class.twilightBoss = {
        PARENT: ["eternal"],
        LABEL: 'The Overseer of Bosses',
        SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        CONTROLLERS: [["spin", { independent: true, speed: -0.005 }]],
        SHAPE: 13,
        SIZE: 150,
        COLOR: '#dab3ff',
        FACING_TYPE: "smoothToTarget",
        VALUE: 16e6,
        MAX_CHILDREN: 39,
        BODY: {
            ACCELERATION: base.ACCEL * 0.6,
            SPEED: base.SPEED * 0.5,
            HEALTH: 5400,
            DAMAGE: base.DAMAGE * 6.6,
            PENETRATION: base.PENETRATION * 7,
            SHIELD: base.SHIELD * 100.5,
            REGEN: base.REGEN * 2,
            FOV: base.FOV * 2.2,
            DENSITY: base.DENSITY * 40
        },
        GUNS: [{
            POSITION: [15, 4.8, 1, 0, 0, -15, 0 ]
        },{
            POSITION: [15, 4.8, 1, 0, 0, -42, 0 ]
        },{
            POSITION: [15, 4.8, 1, 0, 0, -69.5, 0 ]
        },{
            POSITION: [15, 4.8, 1, 0, 0, -96.5, 0 ]
        },{
            POSITION: [15, 4.8, 1, 0, 0, -125, 0 ]
        },{
            POSITION: [15, 4.8, 1, 0, 0, -153.5, 0 ]
        },{
            POSITION: [15, 4.8, 1, 0, 0, 179.5, 0 ]
        },{
            POSITION: [15, 4.8, 1, 0, 0, 151.5, 0 ]
        },{
            POSITION: [15, 4.8, 1, 0, 0, 123.5, 0 ]
        },{
            POSITION: [15, 4.8, 1, 0, 0, 97, 0 ]
        },{
            POSITION: [15, 4.8, 1, 0, 0, 69, 0 ]
        },{
            POSITION: [15, 4.8, 1, 0, 0, 41.5, 0 ]
        },{
            POSITION: [15, 4.8, 1, 0, 0, 13.5, 0 ]
        },{
            POSITION: [3, 7, 1.5, 15, 0, -15, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]), TYPE: "trap" }
        },{
            POSITION: [3, 7, 1.5, 15, 0, -42, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]), TYPE: "trap", AUTOFIRE: true }
        },{
            POSITION: [3, 7, 1.5, 15, 0, -70, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]), TYPE: "trap" }
        },{
            POSITION: [3, 7, 1.5, 15, 0, -96.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]), TYPE: "trap" }
        },{
            POSITION: [3, 7, 1.5, 15, 0, -125, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]), TYPE: "trap" }
        },{
            POSITION: [3, 7, 1.5, 15, 0, -153, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]), TYPE: "trap" }
        },{
            POSITION: [3, 7, 1.5, 15, 0, -179.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]), TYPE: "trap" }
        },{
            POSITION: [3, 7, 1.5, 15, 0, 151, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]), TYPE: "trap" }
        },{
            POSITION: [3, 7, 1.5, 15, 0, 123, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]), TYPE: "trap" }
        },{
            POSITION: [3, 7, 1.5, 15, 0, 96.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]), TYPE: "trap" }
        },{
            POSITION: [3, 7, 1.5, 15, 0, 68, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]), TYPE: "trap" }
        },{
            POSITION: [3, 7, 1.5, 15, 0, 40.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]), TYPE: "trap" }
        },{
            POSITION: [3, 7, 1.5, 15, 0, 13.5, 0 ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]), TYPE: "trap" }
        }],
        TURRETS: [{
            POSITION: [15.5, 0, 0, 0, 360, 1], TYPE: ["twilightBossLayer2"]
        },{
            POSITION: [11, 0, 0, 0, 360, 1], TYPE: ["twilightBossLayer3"]
        },{
            POSITION: [6.5, 0, 0, 0, 360, 1], TYPE: ["twilightBossLayer4"]
        },{
            POSITION: [2, 0, 0, 0, 360, 1], TYPE: ["twilightBossLayer5"]
        }]
    };

    Class.avian = makeBird(Class.single, "Avian");
    Class.assistant = makeHybrid(Class.single, "Assistant");
    Class.autoSingle = makeAuto(Class.single);
    Class.autoBentDouble = makeAuto(Class.bentDouble);
    Class.autoDoubleFlankTwin = makeAuto(Class.doubleFlankTwin);

    Class.devBosses.UPGRADES_TIER_0.push("twilightBoss");
            Class.twin.UPGRADES_TIER_2.push ("duo")
            Class.sniper.UPGRADES_TIER_2.push ("sharpshooter")
            Class.machineGun.UPGRADES_TIER_2.push ("gadgetGun")
            Class.flankGuard.UPGRADES_TIER_2.push ("ternion")
            Class.director.UPGRADES_TIER_2.push ("coordinator")
            Class.pounder.UPGRADES_TIER_2.push ("bruiser")
            Class.trapper.UPGRADES_TIER_2.push ("tricker")
                Class.doubleTwin.UPGRADES_TIER_3.push("doubleFlankTwin");
                Class.smasher.UPGRADES_TIER_3.push("bonker", "banger", "drifter");
                    Class.tripleTwin.UPGRADES_TIER_4 = ["quadTwin", "autoTripleTwin", "bentTriple", "hewnTripleTwin", "tripleFlankTwin", "tripleGunner", "warkWarkWark"];
                    Class.hewnDouble.UPGRADES_TIER_4 = ["hewnTriple", "autoHewnDouble", "cleft", "skewnDouble", "hewnFlankDouble", "hewnGunner", "warkWaWarkrk"];
                    Class.autoDouble.UPGRADES_TIER_4 = ["megaAutoDoubleTwin", "tripleAutoDoubleTwin", "autoTripleTwin", "autoHewnDouble", "autoBentDouble", "autoDoubleFlankTwin"];
                    Class.doubleFlankTwin.UPGRADES_TIER_4 = ["autoDoubleFlankTwin"];
                    Class.single.UPGRADES_TIER_4 = ["duo", "sharpshooter", "gadgetGun", "ternion", "coordinator", "bruiser", "tricker", "mono", "avian", "assistant", "autoSingle"];
                    Class.megaSmasher.UPGRADES_TIER_4 = ["ultraSmasher", "megaSpike", "megaLandmine", "autoMegaSmasher", "megaBonker", "megaDrifter"]
                    Class.bonker.UPGRADES_TIER_4 = ["decoy", "spear", "autoBonker","megaBonker", "basher", "thwacker", "bundler"];
                    Class.drifter.UPGRADES_TIER_4 = ["megaDrifter"];
                    Class.spike.UPGRADES_TIER_4 = ["thorn", "megaSpike", "claymore", "autoSpike", "spear", "cauldron"];
                    Class.autoSmasher.UPGRADES_TIER_4 = ["megaAutoSmasher", "tripleAutoSmasher", "doubleAutoSmasher", "tripletAutoSmasher", "hexaAutoSmasher", "autoMegaSmasher", "autoSpike", "autoLandmine"
                                                       "autoBonker", "autoBanger", "autoDrifter"]
                    Class.landmine.UPGRADES_TIER_4 = ["limpet", "megaLandmine", "claymore", "autoLandmine", "decoy", "tripwire", "vessel"]
                    Class.banger.UPGRADES_TIER_4 = ["slammer", "megaBanger", "prick", "autoBanger", "tripwire", "thwacker", "sharper"]
                                                      
};
