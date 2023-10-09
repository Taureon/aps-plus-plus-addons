//twilight :)

// note from trplnr: please dont use glitch or github.com's text editor
// use https://github.dev/Taureon/aps-plus-plus-addons/blob/main/Armsrace.js if you dont plan on getting a code editor
// im telling u this bcuz syntax errors

const { combineStats, addBackGunner, makeAuto } = require('../facilitators.js');
const { base, gunCalcNames, statnames } = require('../constants.js');
const g = require('../gunvals.js');
module.exports = ({ Class }) => {
    //needed turrets
    Class.megaautoturret = {
        PARENT: "genericTank",
        LABEL: "",
        BODY: {
            FOV: 2,
            SPEED: 0.9
        },
        CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
        COLOR: 16
        GUNS: [{
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [22, 14, 1, 0, 0, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]), TYPE: "bullet" }
        }]
    };
    //tripletwin upgrades
    Class.quadtwin = {
        PARENT: 'genericTank',
        LABEL: 'Quad Twin',
        GUNS: [{
            POSITION: [20, 8, 1, 0, -5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, -90, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 90, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 90, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, -90, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' }
        }]
    };
    Class.autotripletwin = makeAuto(Class.tripleTwin);
    Class.benttriple = {
        PARENT: ["genericTank"],
        LABEL: "Bent Triple",
        DANGER: 6,
        BODY: {
            SPEED: base.SPEED * 0.9
        },
        GUNS: [{
            POSITION: [19, 8, 1, 0, -2, -17.5, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        }, {
            POSITION: [19, 8, 1, 0, 2, 17.5, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        }, {
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        }, {
            POSITION: [19, 8, 1, 0, -2, -137.5, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        }, {
            POSITION: [19, 8, 1, 0, 2, 137.5, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        }, {
            POSITION: [22, 8, 1, 0, 0, 120, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        }, {
            POSITION: [19, 8, 1, 0, -2, -257.5, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        }, {
            POSITION: [19, 8, 1, 0, 2, 257.5, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        }, {
            POSITION: [22, 8, 1, 0, 0, 240, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]), TYPE: "bullet" }
        }]
    };
    Class.hewntripletwin = {
        PARENT: ["genericTank"],
        LABEL: "Hewn Triple",
        DANGER: 7,
        GUNS: [{
            POSITION: [19, 8, 1, 0, 5.5, 205, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [19, 8, 1, 0, -5.5, -205, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 120, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 120, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 240, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 240, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        }]
    };
    Class.tripleflanktwin = {
        PARENT: ["genericTank"],
        LABEL: "Triple Flank Twin",
        DANGER: 7,
        GUNS: [{
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank]), TYPE: "bullet" }
        }, {
            POSITION: [18, 8, 1, 0, 0, 120, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank]), TYPE: "bullet" }
        }, {
            POSITION: [18, 8, 1, 0, 0, 240, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 120, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 120, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 240, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 240, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]), TYPE: "bullet" }
        }]
    };
    Class.triplegunner = {
        PARENT: ["genericTank"],
        LABEL: "Triple Gunner",
        DANGER: 6,
        GUNS: [{
            POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [12, 3.5, 1, 0, 127.25, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [12, 3.5, 1, 0, -127.25, 0, 0.75],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [16, 3.5, 1, 0, 123.75, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [16, 3.5, 1, 0, -123.75, 0, 0.25],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [12, 3.5, 1, 0, 247.25, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [12, 3.5, 1, 0, -247.25, 0, 0.75],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [16, 3.5, 1, 0, 243.75, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [16, 3.5, 1, 0, -243.75, 0, 0.25],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }]
    };
    Class.warkwarkwark = {
        PARENT: ["genericTank"],
        LABEL: "Warkwarkwark",
        STAT_NAMES: statnames.generic,
        DANGER: 7,
        GUNS: [{
            POSITION: [13, 8, 1, 0, 5.5, 185, 0]
        }, {
            POSITION: [3, 9, 1.5, 13, 5.5, 185, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        }, {
            POSITION: [13, 8, 1, 0, -5.5, 175, 0]
        }, {
            POSITION: [3, 9, 1.5, 13, -5.5, 175, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        }, {
            POSITION: [13, 8, 1, 0, 5.5, 305, 0]
        }, {
            POSITION: [3, 9, 1.5, 13, 5.5, 305, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        }, {
            POSITION: [13, 8, 1, 0, -5.5, 295, 0]
        }, {
            POSITION: [3, 9, 1.5, 13, -5.5, 295, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        }, {
            POSITION: [13, 8, 1, 0, 5.5, 65, 0]
        }, {
            POSITION: [3, 9, 1.5, 13, 5.5, 65, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        }, {
            POSITION: [13, 8, 1, 0, -5.5, 55, 0]
        }, {
            POSITION: [3, 9, 1.5, 13, -5.5, 55, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        }]
    };
    //hewn double upgrades
    Class.autohewndouble = makeAuto(hewnDouble)
    Class.cleft = {
        PARENT: ["genericTank"],
        LABEL: "Cleft",
        DANGER: 7,
        GUNS: [{
            POSITION: [19, 8, 1, 0, 5.5, 205, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [19, 8, 1, 0, -5.5, -205, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, -180, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [19, 8, 1, 0, 5.5, 25, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [19, 8, 1, 0, -5.5, -25, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }]
    };
    Class.skewndouble = {
        PARENT: ["genericTank"],
        LABEL: "Skewn Double",
        DANGER: 7,
        GUNS: [{
            POSITION: [19, 8, 1, 0, 5.5, 205, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [19, 8, 1, 0, -5.5, -205, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [19, 8, 1, 0, 5.5, 215, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [19, 8, 1, 0, -5.5, -215, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]), TYPE: "bullet" }
        }]
    };
    Class.hewnflankdouble = {
        PARENT: ["genericTank"],
        LABEL: "Hewn Flank Double",
        DANGER: 7,
        GUNS: [{
            POSITION: [19, 8, 1, 0, 5.5, 205, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [19, 8, 1, 0, -5.5, -205, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, 0, 135, 1],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, 0, 270, 1],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]), TYPE: "bullet" }
        }]
    };
    Class.hewngunner = {
        PARENT: ["genericTank"],
        LABEL: "Gunner",
        DANGER: 6,
        GUNS: [{
            POSITION: [19, 8, 1, 0, 5.5, 205, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [19, 8, 1, 0, -5.5, -205, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]), TYPE: "bullet" }
        }, {
            POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [12, 3.5, 1, 0, 7.25, 180, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [12, 3.5, 1, 0, -7.25, 180, 0.75],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [16, 3.5, 1, 0, 3.75, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }, {
            POSITION: [16, 3.5, 1, 0, -3.75, 180, 0.25],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]), TYPE: "bullet" }
        }]
    };
    Class.warkwawarkrk = {
        PARENT: ["genericTank"],
        LABEL: "Warkwawarkrk",
        DANGER: 7,
        GUNS: [{
            POSITION: [19, 8, 1, 0, 5.5, 205, 0.5]
        }, {
            POSITION: [19, 8, 1.5, 13, 5.5, 205, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        }, {
            POSITION: [19, 8, 1, 0, -5.5, -205, 0]
        }, {
            POSITION: [19, 8, 1.5, 13, -5.5, -205, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 180, 0]
        }, {
            POSITION: [20, 8, 1.5, 13, 5.5, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5]
        }, {
            POSITION: [20, 8, 1.5, 13, -5.5, 180, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0]
        }, {
            POSITION: [20, 8, 1.5, 13, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5]
        }, {
            POSITION: [20, 8, 1.5, 13, -5.5, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.trap, g.twin]), TYPE: "trap", STAT_CALCULATOR: gunCalcNames.trap }
        }]
    };
    //auto-double upgrades
    Class.megaautodoubletwin = {
        PARENT: ["genericTank"],
        LABEL: "Mega Auto-Double Twin",
        DANGER: 6,
        GUNS: [{
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        }],
        TURRETS: [{
            POSITION: [10, 0, 0, 0, 180, 1], TYPE: "megaautoturret"
        }]
    };
    Class.tripleautodoubletwin = {
        PARENT: ["genericTank"],
        LABEL: "Mega Auto-Double Twin",
        DANGER: 6,
        GUNS: [{
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]), TYPE: "bullet" }
        }],
        TURRETS: [{
            /*********  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 3, 5, 0, 360, 1],
            TYPE: [exports.autoTurret, { INDEPENDENT: true, COLOR: 16 }],
          },
          {
            /*********  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 3, -5, 0, 360, 1],
            TYPE: [exports.autoTurret, { INDEPENDENT: true, COLOR: 16 }],
          },
          {
            /*********  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, -5, 0, 0, 360, 1],
            TYPE: [exports.autoTurret, { INDEPENDENT: true, COLOR: 16 }],
          },]
    };
    exports.doubleflanktwin = {
        PARENT: ["genericTank"],
        LABEL: "Double Flank Twin",
        DANGER: 6,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 5.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, 5.5, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, o, 135, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, o, 270, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
        ],
    };
Class.autobentdouble = makeAuto (bentDouble)
Class.autodoubleflanktwin = makeAuto (doubleflanktwin)
    //upgrades
    //NOTE: Once you do more than just tier 4, don't forget to indent like in tanks.js to give this tree representation some structure.

    //tier 3
    Class.doubleTwin.UPGRADES_TIER_3 = ["doubleflanktwin"];
    //tier 4

    Class.tripleTwin.UPGRADES_TIER_4 = ["quadtwin", "autotripletwin", "benttriple", "hewntripletwin", "tripleflanktwin", "triplegunner", "warkwarkwark"];
    Class.hewnDouble.UPGRADES_TIER_4 = ["hewntriple", "autohewndouble", "cleft", "skewndouble", "hewnflankdouble", "hewngunner", "warkwawarkrk"];
    Class.autoDouble.UPGRADES_TIER_4 = ["megaautodoubletwin", "tripleautodoubletwin", "autotripletwin", "autohewndouble", "autobentdouble", "autodoubleflanktwin"];
    Class.doubleflanktwin.UPGRADES_TIER_4 = ["autodoubleflanktwin"];
};