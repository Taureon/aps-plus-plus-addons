const { combineStats, addBackGunner, makeAuto } = require('../facilitators.js');
const { base, gunCalcNames, statnames } = require('../constants.js');
const g = require('../gunvals.js');

//tripletwin upgrades

module.exports = ({ Class }) => {
    Class.quadtwin = {
        PARENT: 'genericTank',
        LABEL: 'Quad Twin',
        GUNS: [{
            POSITION: [ 20, 8, 1, 0, -5.5, 0, 0, ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' },
        }, {
            POSITION: [ 20, 8, 1, 0, -5.5, -90, 0, ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' },
        }, {
            POSITION: [ 20, 8, 1, 0, -5.5, 180, 0, ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' },
        }, {
            POSITION: [ 20, 8, 1, 0, -5.5, 90, 0, ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' },
        }, {
            POSITION: [ 20, 8, 1, 0, 5.5, 0, 0, ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' },
        }, {
            POSITION: [ 20, 8, 1, 0, 5.5, 90, 0, ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' },
        }, {
            POSITION: [ 20, 8, 1, 0, 5.5, 180, 0, ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' },
        }, {
            POSITION: [ 20, 8, 1, 0, 5.5, -90, 0, ],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.twin]), TYPE: 'bullet' },
        }]
    };
    Class.autotripletwin = makeAuto(Class.tripleTwin);
    Class.benttriple = {
    PARENT: ["genericTank"],
    LABEL: "Bent Triple",
    DANGER: 6,
    BODY: {
        SPEED: base.SPEED * 0.9,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 8, 1, 0, -2, -17.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 2, 17.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 8, 1, 0, -2, -137.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 2, 137.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [22, 8, 1, 0, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 8, 1, 0, -2, -257.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 2, 257.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [22, 8, 1, 0, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
    ],
};
    Class.hewntripletwin = {
    PARENT: ["genericTank"],
    LABEL: "Hewn Triple",
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 8, 1, 0, 5.5, 205, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.twin,
                    g.double,
                    g.hewn,
                    g.morerecoil,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, -5.5, -205, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.twin,
                    g.double,
                    g.hewn,
                    g.morerecoil,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 120, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 240, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                TYPE: "bullet",
            },
        },
    ],
};
    Class.tripleflanktwin = {
    PARENT: ["genericTank"],
    LABEL: "Triple Flank Twin",
    DANGER: 7,
    GUNS: [
                {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 120, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 240, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                TYPE: "bullet",
            },
        },
    ],
};
    Class.triplegunner = {
    PARENT: ["genericTank"],
    LABEL: "Triple Gunner",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 3.5, 1, 0, 127.25, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 3.5, 1, 0, -127.25, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, 123.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, -123.75, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        },
                {
            POSITION: [12, 3.5, 1, 0, 247.25, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 3.5, 1, 0, -247.25, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, 243.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, -243.75, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        },
    ],
};
    Class.tripleTwin.UPGRADES_TIER_4 = ["quadtwin", "autotripletwin", "benttriple", "hewntripletwin", "tripleflanktwin", "triplegunner"];
};
