const { combineStats, addBackGunner } = require('../facilitators.js');
const { base, gunCalcNames, statnames, smshskl } = require('../constants.js');
const g = require('../gunvals.js');

module.exports = ({ Class }) => {

// BASIC TANK AND UPGRADES
Class.diepTank = {
    PARENT: ["genericTank"],
    LABEL: "Tank",
    GUNS: [
        {
            POSITION: [19, 7.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};
Class.diepTwin = {
    PARENT: ["genericTank"],
    LABEL: "Twin",
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};
Class.diepSniper = {
    PARENT: ["genericTank"],
    LABEL: "Sniper",
    BODY: {
        FOV: 1.2 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [24, 7.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};
Class.diepMachineGun = {
    PARENT: ["genericTank"],
    LABEL: "Machine Gun",
    GUNS: [
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};
Class.diepFlankGuard = {
    PARENT: ["genericTank"],
    LABEL: "Flank Guard",
    BODY: {
        SPEED: 1.1 * base.SPEED,
    },
    GUNS: [
        {
            POSITION: [19, 7.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 7.5, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};
Class.diepSmasher = {
    PARENT: ["genericTank"],
    LABEL: "Smasher",
    DANGER: 6,
    BODY: {
        FOV: 1.05 * base.FOV,
        DENSITY: 2 * base.DENSITY,
    },
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",
        },
    ],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
    REROOT_UPGRADE_TREE: "diepTank",
};

// TWIN UPGRADES
Class.diepTripleShot = {
    PARENT: ["genericTank"],
    LABEL: "Triple Shot",
    DANGER: 6,
    BODY: {
        SPEED: base.SPEED * 0.9,
    },
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [19, 7.5, 1, 0, 0, -45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 7.5, 1, 0, 0, 45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 7.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};
Class.diepTwinFlank = {
    PARENT: ["genericTank"],
    LABEL: "Twin Flank",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                TYPE: exports.bullet,
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};

// TRIPLE SHOT UPGRADES
Class.diepTriplet = {
    PARENT: ["genericTank"],
    LABEL: "Triplet",
    DANGER: 6,
    BODY: {
        FOV: 1.05 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [16.5, 7.5, 1, 0, 5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.morereload]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16.5, 7.5, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.morereload]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19.5, 7.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.morereload]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};
Class.diepPentaShot = {
    PARENT: ["genericTank"],
    LABEL: "Penta Shot",
    DANGER: 7,
    BODY: {
        SPEED: 0.85 * base.SPEED,
    },
    GUNS: [
        {
            POSITION: [16, 8, 1, 0, -3, -30, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 3, 30, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, -2, -15, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 2, 15, 0],
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
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};
Class.diepSpreadShot = {
    PARENT: ["genericTank"],
    LABEL: "Spread Shot",
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [13, 4, 1, 0, -0.5, -75, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [13, 4, 1, 0, 0.5, 75, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [14.5, 4, 1, 0, -0.5, -60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [14.5, 4, 1, 0, 0.5, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [16, 4, 1, 0, -0.5, -45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [16, 4, 1, 0, 0.5, 45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [17.5, 4, 1, 0, -0.5, -30, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [17.5, 4, 1, 0, 0.5, 30, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [19, 4, 1, 0, -1, -15, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [19, 4, 1, 0, 1, 15, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [12, 8, 1, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};

// TWIN FLANK UPGRADES
Class.diepTripleTwin = {
    PARENT: ["genericTank"],
    LABEL: "Triple Twin",
    DANGER: 7,
    GUNS: [
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
    REROOT_UPGRADE_TREE: "diepTank",
};

// SNIPER UPGRADES
Class.diepAssassin = {
    PARENT: ["genericTank"],
    DANGER: 6,
    LABEL: "Assassin",
    BODY: {
        SPEED: 0.85 * base.SPEED,
        FOV: 1.4 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [27, 7.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};
Class.diepHunter = {
    PARENT: ["genericTank"],
    LABEL: "Hunter",
    DANGER: 6,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25,
    },
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [21, 12, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};
Class.diepOverseer = {
    PARENT: ["genericTank"],
    LABEL: "Overseer",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.9 * base.SPEED,
        FOV: 1.1 * base.FOV,
    },
    MAX_CHILDREN: 8,
    GUNS: [
        {
            POSITION: [6, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
        {
            POSITION: [6, 12, 1.2, 8, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};
Class.diepTrapper = {
    PARENT: ["genericTank"],
    LABEL: "Trapper",
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: [13, 8, 1, 0, 0, 0, 0]
        },
        {
            POSITION: [4, 8, 1.7, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};

// ASSASSIN UPGRADES
Class.diepRanger = {
    PARENT: ["genericTank"],
    LABEL: "Ranger",
    DANGER: 7,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 1.5 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [27, 8.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [5, 8.5, -1.6, 8, 0, 0, 0],
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};

// HUNTER UPGRADES
Class.diepPredator = {
    PARENT: ["genericTank"],
    LABEL: "Predator",
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25,
    },
    CONTROLLERS: ["zoom"],
    TOOLTIP: "Hold right click to zoom.",
    GUNS: [
        {
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                    g.hunter2,
                    g.preda,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [21, 12, 1, 0, 0, 0, 0.15],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                    g.preda,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 16, 1, 0, 0, 0, 0.3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};
Class.diepXHunter = {
    PARENT: ["genericTank"],
    LABEL: "X Hunter",
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25,
    },
    GUNS: [
        {
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                    g.hunter2,
                    g.preda,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [21, 12, 1, 0, 0, 0, 0.15],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                    g.preda,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 16, 1, 0, 0, 0, 0.3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};
Class.diepOldPredator = {
    PARENT: ["genericTank"],
    LABEL: "Predator",
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25,
    },
    CONTROLLERS: [["zoom"]],
    TOOLTIP: "Hold right click to zoom.",
    GUNS: [
        {
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [21, 12, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [8, 12, -1.25, 7, 0, 0, 0],
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};

// OVERSEER UPGRADES
Class.diepBattleship = {
    PARENT: ["genericTank"],
    LABEL: "Battleship",
    DANGER: 7,
    STAT_NAMES: statnames.swarm,
    FACING_TYPE: "locksFacing",
    BODY: {
        FOV: 1.2 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 4, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: "Guided",
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: ["autoswarm"],
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: "Autonomous",
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 4, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: ["autoswarm"],
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: "Autonomous",
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 270, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: "Guided",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};

// MACHINE GUN UPGRADES
Class.diepDestroyer = {
    PARENT: ["genericTank"],
    LABEL: "Destroyer",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [21, 14, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};
Class.diepGunner = {
    PARENT: ["genericTank"],
    LABEL: "Gunner",
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
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};

// FLANK GUARD UPGRADES
Class.diepTriAngle = {
    PARENT: ["genericTank"],
    LABEL: "Tri-Angle",
    BODY: {
        HEALTH: 0.8 * base.HEALTH,
        SHIELD: 0.8 * base.SHIELD,
        DENSITY: 0.6 * base.DENSITY,
    },
    DANGER: 6,
    GUNS: [
        {
            POSITION: [19, 7.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.trifront,
                    g.tonsmorrecoil,
                ]),
                TYPE: "bullet",
                LABEL: "Front",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};
Class.diepQuadTank = {
    PARENT: ["genericTank"],
    LABEL: "Quad Tank",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [19, 7.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 7.5, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 7.5, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 7.5, 1, 0, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};
Class.diepAuto3 = {
    PARENT: ["genericTank"],
    LABEL: "Auto 3",
    DANGER: 6,
    FACING_TYPE: "autospin",
    TURRETS: [
        {
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: "autoTankGun",
        },
        {
            POSITION: [11, 8, 0, 120, 190, 0],
            TYPE: "autoTankGun",
        },
        {
            POSITION: [11, 8, 0, 240, 190, 0],
            TYPE: "autoTankGun",
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};

// TRI-ANGLE UPGRADES
Class.diepBooster = {
    PARENT: ["genericTank"],
    LABEL: "Booster",
    BODY: {
        HEALTH: base.HEALTH * 0.4,
        SHIELD: base.SHIELD * 0.4,
        DENSITY: base.DENSITY * 0.3,
    },
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [19, 7.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.trifront,
                    g.tonsmorrecoil,
                ]),
                TYPE: "bullet",
                LABEL: "Front",
            },
        },
        {
            POSITION: [13, 8, 1, 0, -1, 140, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [13, 8, 1, 0, 1, 220, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
};

// QUAD TANK UPGRADES
Class.diepOctoTank = {
    PARENT: ["genericTank"],
    LABEL: "Octo Tank",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [19, 7.5, 1, 0, 0, 45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 7.5, 1, 0, 0, 135, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 7.5, 1, 0, 0, 225, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 7.5, 1, 0, 0, 315, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 7.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 7.5, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 7.5, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 7.5, 1, 0, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};

// AUTO 3 UPGRADES
Class.diepAuto5 = {
    PARENT: ["genericTank"],
    LABEL: "Auto 5",
    DANGER: 7,
    FACING_TYPE: "autospin",
    TURRETS: [
        {
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: "autoTankGun",
        },
        {
            POSITION: [11, 8, 0, 72, 190, 0],
            TYPE: "autoTankGun",
        },
        {
            POSITION: [11, 8, 0, 144, 190, 0],
            TYPE: "autoTankGun",
        },
        {
            POSITION: [11, 8, 0, -144, 190, 0],
            TYPE: "autoTankGun",
        },
        {
            POSITION: [11, 8, 0, -72, 190, 0],
            TYPE: "autoTankGun",
        },
    ],
    REROOT_UPGRADE_TREE: "diepTank",
};

// UNCLASSED TANKS
Class.diepBall = {
    PARENT: ["genericTank"],
    LABEL: "",
    REROOT_UPGRADE_TREE: "diepTank",
};

Class.diepTanks = {
    PARENT: ["menu"],
    LABEL: "Diep.io Tanks",
    COLOR: "#00B1DE",
    REROOT_UPGRADE_TREE: "diepTank",
};
Class.tanks.UPGRADES_TIER_0.push("diepTanks");
Class.diepTanks.UPGRADES_TIER_0 = ["diepTank", "diepXHunter", "diepOldPredator", "diepBall"];
    Class.diepTank.UPGRADES_TIER_1 = ["diepTwin", "diepSniper", "diepMachineGun", "diepFlankGuard"];
        Class.diepTank.UPGRADES_TIER_2 = ["diepSmasher"];
        Class.diepTwin.UPGRADES_TIER_2 = ["diepTripleShot", "diepQuadTank", "diepTwinFlank"];
            Class.diepTripleShot.UPGRADES_TIER_3 = ["diepTriplet", "diepPentaShot", "diepSpreadShot"];
            Class.diepTwinFlank.UPGRADES_TIER_3 = ["diepTripleTwin", "diepBattleship"];
        Class.diepSniper.UPGRADES_TIER_2 = ["diepAssassin", "diepHunter", "diepOverseer", "diepTrapper"];
            Class.diepAssassin.UPGRADES_TIER_3 = ["diepRanger"];
            Class.diepHunter.UPGRADES_TIER_3 = ["diepPredator"];
            Class.diepOverseer.UPGRADES_TIER_3 = ["diepBattleship"];
        Class.diepMachineGun.UPGRADES_TIER_2 = ["diepDestroyer", "diepGunner"];
        Class.diepFlankGuard.UPGRADES_TIER_2 = ["diepTriAngle", "diepQuadTank", "diepTwinFlank", "diepAuto3"];
            Class.diepTriAngle.UPGRADES_TIER_3 = ["diepBooster"];
            Class.diepQuadTank.UPGRADES_TIER_3 = ["diepOctoTank", "diepAuto5"];
            Class.diepAuto3.UPGRADES_TIER_3 = ["diepAuto5"];

};
