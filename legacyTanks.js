const { combineStats, makeAuto, makeDeco } = require('../facilitators.js');
const { base, gunCalcNames, statnames, dfltskl, smshskl } = require('../constants.js');
const tanks = require('../groups/tanks.js');
const g = require('../gunvals.js');

module.exports = ({ Class }) => {

// Set these to either true to display their respective tanks in the main tank branch.
// The enableLegacy option will make some existing tanks unplayable. They can always be accessed in the unplayable branch of the developer menu.
const enableScrapped = true;
const enableLegacy = false;

Class.weirdSpikeBody1 = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: 0.08 }]],
    COLOR: 9,
    SHAPE: 3,
    INDEPENDENT: true,
};
Class.weirdSpikeBody2 = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: -0.05 }]],
    COLOR: 9,
    SHAPE: 3,
    INDEPENDENT: true,
};
Class.weirdSpike = {
    PARENT: ["genericTank"],
    LABEL: "Spike",
    DANGER: 7,
    BODY: {
        DAMAGE: 1.15 * base.DAMAGE,
        FOV: 1.05 * base.FOV,
        DENSITY: 1.5 * base.DENSITY,
    },
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
    TURRETS: [
        {
            POSITION: [20.5, 0, 0, 0, 360, 0],
            TYPE: "weirdSpikeBody1",
        },
        {
            POSITION: [20.5, 0, 0, 180, 360, 0],
            TYPE: "weirdSpikeBody2",
        },
    ],
};
Class.oldBentBoomer = {
    PARENT: ["genericTank"],
    LABEL: "Boomer",
    DANGER: 7,
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 1.15 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [8, 10, 1, 8, -2, -35, 0],
        },
        {
            POSITION: [8, 10, 1, 8, 2, 35, 0],
        },
        {
            POSITION: [2, 10, 1.3, 16, -2, -35, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                TYPE: "boomerang",
            },
        },
        {
            POSITION: [2, 10, 1.3, 16, 2, 35, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                TYPE: "boomerang",
            },
        },
    ],
};
Class.quadBuilder = {
    PARENT: ["genericTank"],
    LABEL: "Quad Builder",
    DANGER: 7,
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 1.15 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [14, 6, 1, 0, 0, 45, 0],
        },
        {
            POSITION: [2, 6, 1.1, 14, 0, 45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                TYPE: "setTrap",
            },
        },
        {
            POSITION: [14, 6, 1, 0, 0, 135, 0],
        },
        {
            POSITION: [2, 6, 1.1, 14, 0, 135, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                TYPE: "setTrap",
            },
        },
        {
            POSITION: [14, 6, 1, 0, 0, 225, 0],
        },
        {
            POSITION: [2, 6, 1.1, 14, 0, 225, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                TYPE: "setTrap",
            },
        },
        {
            POSITION: [14, 6, 1, 0, 0, 315, 0],
        },
        {
            POSITION: [2, 6, 1.1, 14, 0, 315, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                TYPE: "setTrap",
            },
        },
    ],
};
Class.masterBullet = {
    PARENT: ["trap"],
    SHAPE: 0,
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.trifront,
                    g.tonsmorrecoil,
                    g.minion,
                    g.weak,
                ]),
                TYPE: "bullet",
                LABEL: "Front",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [13, 8, 1, 0, -1, 140, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                    g.minion,
                    g.weak,
                ]),
                TYPE: "bullet",
                LABEL: "Thruster",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [13, 8, 1, 0, 1, 220, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                    g.minion,
                    g.weak,
                ]),
                TYPE: "bullet",
                LABEL: "Thruster",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                    g.minion,
                    g.weak,
                ]),
                TYPE: "bullet",
                LABEL: "Thruster",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                    g.minion,
                    g.weak,
                ]),
                TYPE: "bullet",
                LABEL: "Thruster",
                AUTOFIRE: true,
            },
        },
    ],
};
Class.master = {
    PARENT: ["genericTank"],
    LABEL: "Master",
    STAT_NAMES: statnames.mixed,
    BODY: {
        HEALTH: base.HEALTH * 0.4,
        SHIELD: base.SHIELD * 0.4,
        DENSITY: base.DENSITY * 0.3,
    },
    DANGER: 8,
    MAX_CHILDREN: 6,
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [18, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "masterBullet",
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
Class.blunderbuss = {
    PARENT: ["genericTank"],
    LABEL: "Blunderbuss",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.225,
    },
    GUNS: [
        {
            POSITION: [13, 4, 1, 0, -3, -9, 0.3],
            PROPERTIES: {
                TYPE: "bullet",
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.blunderbuss]),
            },
        },
        {
            POSITION: [15, 4, 1, 0, -2.5, -6, 0.2],
            PROPERTIES: {
                TYPE: "bullet",
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.blunderbuss]),
            },
        },
        {
            POSITION: [16, 4, 1, 0, -2, -3, 0.1],
            PROPERTIES: {
                TYPE: "bullet",
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.blunderbuss]),
            },
        },
        {
            POSITION: [13, 4, 1, 0, 3, 9, 0.3],
            PROPERTIES: {
                TYPE: "bullet",
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.blunderbuss]),
            },
        },
        {
            POSITION: [15, 4, 1, 0, 2.5, 6, 0.2],
            PROPERTIES: {
                TYPE: "bullet",
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.blunderbuss]),
            },
        },
        {
            POSITION: [16, 4, 1, 0, 2, 3, 0.1],
            PROPERTIES: {
                TYPE: "bullet",
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.blunderbuss]),
            },
        },
        {
            POSITION: [25, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                TYPE: "bullet",
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
            },
        },
        {
            POSITION: [14, 10.5, 1, 0, 0, 0, 0],
        },
    ],
};
Class.oldRimfire = {
    PARENT: ["genericTank"],
    LABEL: "Rimfire",
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 5, 1, 0, 7.25, 15, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 5, 1, 0, -7.25, -15, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 5, 1, 0, 3.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 5, 1, 0, -3.75, -0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.fast]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.oldSpreadshot = {
    PARENT: ["genericTank"],
    LABEL: "Spreadshot",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [13, 4, 1, 0, -0.8, -75, 5 / 6],
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
            POSITION: [14.5, 4, 1, 0, -1.0, -60, 4 / 6],
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
            POSITION: [16, 4, 1, 0, -1.6, -45, 3 / 6],
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
            POSITION: [17.5, 4, 1, 0, -2.4, -30, 2 / 6],
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
            POSITION: [19, 4, 1, 0, -3.0, -15, 1 / 6],
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
            POSITION: [13, 4, 1, 0, 0.8, 75, 5 / 6],
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
            POSITION: [14.5, 4, 1, 0, 1.0, 60, 4 / 6],
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
            POSITION: [16, 4, 1, 0, 1.6, 45, 3 / 6],
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
            POSITION: [17.5, 4, 1, 0, 2.4, 30, 2 / 6],
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
            POSITION: [19, 4, 1, 0, 3.0, 15, 1 / 6],
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
            POSITION: [13, 10, 1.3, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pound,
                    g.spreadmain,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Pounder",
            },
        },
    ],
};
Class.oldCommanderGun = {
    PARENT: ["genericTank"],
    LABEL: "",
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ["nearestDifferentMaster"],
    COLOR: 16,
    MAX_CHILDREN: 6,
    AI: {
        NO_LEAD: true,
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [
        {
            POSITION: [8, 14, 1.3, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.commander]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
    ],
};
Class.oldCommander = {
    PARENT: ["genericTank"],
    LABEL: "Commander",
    STAT_NAMES: statnames.drone,
    DANGER: 7,
    BODY: {
        FOV: 1.15 * base.FOV,
    },
    FACING_TYPE: "autospin",
    TURRETS: [
        {
            POSITION: [16, 1, 0, 0, 0, 0],
            TYPE: "oldCommanderGun",
        },
        {
            POSITION: [16, 1, 0, 120, 0, 0],
            TYPE: ["oldCommanderGun", { INDEPENDENT: true }],
        },
        {
            POSITION: [16, 1, 0, 240, 0, 0],
            TYPE: ["oldCommanderGun", { INDEPENDENT: true }],
        },
    ],
};
Class.autoTrapper = makeAuto(Class.trapper);
Class.prodigy = {
    PARENT: ["genericTank"],
    LABEL: "Prodigy",
    DANGER: 7,
    STAT_NAMES: statnames.generic,
    SHAPE: 6,
    MAX_CHILDREN: 14,
    BODY: {
        FOV: base.FOV * 1.15,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 11, 1.3, 6, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 11, 1.3, 6, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 11, 1.3, 6, 0, 300, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 9, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 9, 1.5, 14, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [14, 9, 1, 0, 0, 120, 0],
        },
        {
            POSITION: [4, 9, 1.5, 14, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [14, 9, 1, 0, 0, 240, 0],
        },
        {
            POSITION: [4, 9, 1.5, 14, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
};
Class.menderDeco = makeDeco(3);
Class.mender = {
    PARENT: ["genericTank"],
    LABEL: "Mender",
    DANGER: 7,
    TOOLTIP: "Right click to heal yourself (use sparingly, has a long cooldown once used!)",
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 3, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 3, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
        { POSITION: [17, 10, 1, 0, 0, 180, 0] },
        {
            POSITION: [5, 18, 1, -19, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pound,
                    g.destroy,
                    [2, 0, 1, 1, 1, -1, 1, 1, 1, 0.1, 1, 1, 1],
                ]),
                TYPE: ["bullet", { HEAL_MYSELF: true }],
                ALT_FIRE: true,
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [7, 0, 0, 0, 0, 1],
            TYPE: "menderDeco",
        },
    ],
};
Class.tetraGunner = {
  PARENT: ["genericTank"],
  LABEL: "Tetra Gunner",
  DANGER: 7,
  GUNS: [
    {
      POSITION: [14, 3.5, 1, 0, 4, 90, 1 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [14, 3.5, 1, 0, -4, 90, 2 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [14, 3.5, 1, 0, 4, 270, 1 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [14, 3.5, 1, 0, -4, 270, 2 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [18, 3.5, 1, 0, 0, 90, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [18, 3.5, 1, 0, 0, 270, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [14, 3.5, 1, 0, 4, 0, 1 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [14, 3.5, 1, 0, -4, 0, 2 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [14, 3.5, 1, 0, 4, 180, 1 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [14, 3.5, 1, 0, -4, 180, 2 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [18, 3.5, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [18, 3.5, 1, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.corvette = {
    PARENT: ["genericTank"],
    LABEL: "Corvette",
    DANGER: 7,
    FACING_TYPE: "locksFacing",
    STAT_NAMES: statnames.swarm,
    BODY: {
        FOV: base.FOV * 1.2,
    },
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, -4, 0, 0, 0, 0],
            TYPE: "genericEntity",
        },
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [6, 16, 1, 16, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.fake]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [1, 3, 1, 3, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.machgun,
                    g.thruster,
                    [0.1, 3, 1, 1, 1, 1, 1, 1, 1, 0.075, 1, 2, 1],
                ]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.repeater = {
    PARENT: "genericTank",
    LABEL: "Repeater",
    TOOLTIP: "[DEV NOTE] The Repeater is not finished yet. This tank is currently just a mockup.",
    GUNS: [
        {
            POSITION: [20, 10, 0.8, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [4.625, 9.5, 2, 0.375, -8, 91.5, 0]
        },
        {
            POSITION: [4.625, 9.5, 2, 0.375, 8, -91.5, 0]
        },
        {
            POSITION: [3.75, 10, 2.125, 0, -4.75, 50, 0]
        },
        {
            POSITION: [3.75, 10, 2.125, 0, 4.75, -50, 0]
        }
    ]
}

// FLAIL!!!
Class.flailBallSpike = {
    PARENT: ["genericTank"],
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
Class.flailBall = {
    PARENT: ["genericTank"],
    HITS_OWN_TYPE: 'hard',
    TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [21.5, 0, 0, 0, 360, 0],
        TYPE: "flailBallSpike",
    }, ],
};
Class.flailBolt1 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [40, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        POSITION: [48, 56, 0, 0, 190, 1],
        TYPE: ["flailBall", {
            INDEPENDENT: true,
            VULNERABLE: true
        }]
        },
    ],
};
Class.flailBolt2 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [30, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [20, 36, 0, 0, 190, 1],
        TYPE: ["flailBolt1", {
            INDEPENDENT: true,
        }]
        },
    ],
};
Class.flailBolt3 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [30, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [18, 36, 0, 0, 190, 1],
        TYPE: ["flailBolt2", {
            INDEPENDENT: true,
        }]
        },
    ],
};
Class.flail = {
    PARENT: ["genericTank"],
    LABEL: "Flail",
    STAT_NAMES: statnames.flail,
    TOOLTIP: "[DEV NOTE] The Flail is not finished yet. This tank is currently just a mockup.",
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, 0, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};
Class.doubleFlail = {
    PARENT: ["genericTank"],
    LABEL: "Double Flail",
    DANGER: 6,
    STAT_NAMES: statnames.flail,
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, {
        POSITION: [6, 10, 0, 180, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, 0, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};
Class.tripleFlail = {
    PARENT: ["genericTank"],
    LABEL: "Triple Flail",
    DANGER: 7,
    STAT_NAMES: statnames.flail,
    TOOLTIP: "[DEV NOTE] The Triple Flail is not finished yet. This tank is currently just a mockup.",
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, {
        POSITION: [6, 10, 0, 120, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, {
        POSITION: [6, 10, 0, 240, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, 0, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};
Class.maceBallSpike = {
    PARENT: ["genericTank"],
    COLOR: 9,
    SHAPE: 3,
    INDEPENDENT: true,
};
Class.maceBall = {
    PARENT: ["genericTank"],
    HITS_OWN_TYPE: 'hard',
    TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [21.5, 0, 0, 0, 360, 0],
        TYPE: ["maceBallSpike", { SHAPE: 3 }]
    }, ],
};
Class.maceBolt1 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [48, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        POSITION: [76, 56, 0, 0, 190, 1],
        TYPE: ["maceBall", {
            INDEPENDENT: true,
            VULNERABLE: true
        }]
        },
    ],
};
Class.maceBolt2 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [24, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [20, 28, 0, 0, 190, 1],
        TYPE: ["maceBolt1", {
            INDEPENDENT: true,
        }]
        },
    ],
};
Class.maceBolt3 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [24, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [18, 28, 0, 0, 190, 1],
        TYPE: ["maceBolt2", {
            INDEPENDENT: true,
        }]
        },
    ],
};
Class.mace = {
    PARENT: ["genericTank"],
    LABEL: "Mace",
    DANGER: 6,
    STAT_NAMES: statnames.flail,
    TOOLTIP: "[DEV NOTE] The Mace is not finished yet. This tank is currently just a mockup.",
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["maceBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, 0, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};
Class.mamaBolt1 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [48, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        POSITION: [104, 56, 0, 0, 190, 1],
        TYPE: ["maceBall", {
            INDEPENDENT: true,
            VULNERABLE: true
        }]
        },
    ],
};
Class.mamaBolt2 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [18, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [20, 20, 0, 0, 190, 1],
        TYPE: ["mamaBolt1", {
            INDEPENDENT: true,
        }]
        },
    ],
};
Class.mamaBolt3 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [18, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [18, 20, 0, 0, 190, 1],
        TYPE: ["mamaBolt2", {
            INDEPENDENT: true,
        }]
        },
    ],
};
Class.bigMama = {
    PARENT: ["genericTank"],
    LABEL: "BIG MAMA",
    DANGER: 7,
    STAT_NAMES: statnames.flail,
    TOOLTIP: "[DEV NOTE] The BIG MAMA is not finished yet. This tank is currently just a mockup.",
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["mamaBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, 0, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};
Class.ihdtiBall = {
    PARENT: ["genericTank"],
    HITS_OWN_TYPE: 'hard',
    TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [21.5, 0, 0, 0, 360, 0],
        TYPE: "maceBallSpike"
    }, {
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [21.5, 0, 0, 180, 360, 0],
        TYPE: "maceBallSpike"
    },],
};
Class.ihdtiBolt1 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [48, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        POSITION: [76, 56, 0, 0, 190, 1],
        TYPE: ["ihdtiBall", {
            INDEPENDENT: true,
            VULNERABLE: true
        }]
        },
    ],
};
Class.ihdtiBolt2 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [24, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [20, 28, 0, 0, 190, 1],
        TYPE: ["ihdtiBolt1", {
            INDEPENDENT: true,
        }]
        },
    ],
};
Class.ihdtiBolt3 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [24, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [18, 28, 0, 0, 190, 1],
        TYPE: ["ihdtiBolt2", {
            INDEPENDENT: true,
        }]
        },
    ],
};
Class.itHurtsDontTouchIt = {
    PARENT: ["genericTank"],
    LABEL: "It hurts dont touch it",
    DANGER: 7,
    STAT_NAMES: statnames.flail,
    TOOLTIP: "[DEV NOTE] The It hurts dont touch it is not finished yet. This tank is currently just a mockup.",
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["ihdtiBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, 0, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};
Class.flangle = {
    PARENT: ["genericTank"],
    LABEL: "Flangle",
    DANGER: 6,
    STAT_NAMES: statnames.mixed,
    TOOLTIP: "[DEV NOTE] The Flangle is not finished yet. This tank is currently just a mockup.",
    GUNS: [
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
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};
Class.flooster = {
    PARENT: ["genericTank"],
    LABEL: "Flooster",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    TOOLTIP: "[DEV NOTE] The Flooster is not finished yet. This tank is currently just a mockup.",
    GUNS: [
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
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};
Class.flace = {
    PARENT: ["genericTank"],
    LABEL: "Flace",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    TOOLTIP: "[DEV NOTE] The Flace is not finished yet. This tank is currently just a mockup.",
    GUNS: [
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
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["maceBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};

Class.flail.UPGRADES_TIER_2 = ["doubleFlail", "mace", "flangle"];
    Class.doubleFlail.UPGRADES_TIER_3 = ["tripleFlail"];
    Class.mace.UPGRADES_TIER_3 = ["bigMama", "itHurtsDontTouchIt", "flace"];
    Class.flangle.UPGRADES_TIER_3 = ["flooster", "flace"];


// delicious spaghetti

if (enableScrapped == true && enableLegacy == false) {
Class.weirdSpike.UPGRADE_LABEL = "Weird Spike";
Class.oldBentBoomer.UPGRADE_LABEL = "Old Bent Boomer";
Class.oldRimfire.UPGRADE_LABEL = "Old Rimfire";
Class.oldSpreadshot.UPGRADE_LABEL = "Old Spreadshot";
Class.oldCommander.UPGRADE_LABEL = "Old Commander";

Class.basic.UPGRADES_TIER_1.push("flail");

    // machine gun
        Class.gunner.UPGRADES_TIER_3.push("tetraGunner");

    // director
        Class.cruiser.UPGRADES_TIER_3.push("corvette");
        Class.underseer.UPGRADES_TIER_3.push("prodigy");

    // pounder
        Class.artillery.UPGRADES_TIER_3.push("mender");

    Class.trapper.UPGRADES_TIER_2.push("autoTrapper");
        Class.autoTrapper.UPGRADES_TIER_3 = ["autoBuilder", "hexaTrapper"];
        Class.triTrapper.UPGRADES_TIER_3.push("prodigy");

    Class.desmos.UPGRADES_TIER_2.push("repeater");

Class.unavailable.UPGRADES_TIER_0.push("weirdSpike", "oldBentBoomer", "quadBuilder", "master", "blunderbuss", "oldRimfire", "oldSpreadshot", "oldCommander");

} else if (enableScrapped == false && enableLegacy == true) {
Class.basic.UPGRADES_TIER_3.push("master");
    Class.smasher.UPGRADES_TIER_3.splice(1, 1, "weirdSpike");

    // twin
        Class.tripleShot.UPGRADES_TIER_3.splice(1, 1, "oldSpreadshot");

    // sniper
        Class.rifle.UPGRADES_TIER_3.splice(1, 1, "blunderbuss");

    // machine gun
        Class.gunner.UPGRADES_TIER_3.push("oldRimfire");

    // director
        Class.overseer.UPGRADES_TIER_3.splice(6, 1, "oldCommander");
        Class.cruiser.UPGRADES_TIER_3.pop();

    // pounder
        Class.artillery.UPGRADES_TIER_3.splice(0, 1, "mortar", "oldSpreadshot");

    // trapper
        Class.builder.UPGRADES_TIER_3.splice(3, 1, "oldBentBoomer");
        Class.builder.UPGRADES_TIER_3.push("quadBuilder");

Class.unavailable.UPGRADES_TIER_0.push("spreadshot", "crossbow", "commander", "boomer", "spike", "autoTrapper", "prodigy", "mender", "tetraGunner", "corvette", "flail", "repeater");

} else if (enableScrapped == true && enableLegacy == true) {
Class.basic.UPGRADES_TIER_1.push("flail");
    Class.basic.UPGRADES_TIER_3.push("master");
    Class.smasher.UPGRADES_TIER_3.splice(1, 1, "weirdSpike");

    // twin
        Class.tripleShot.UPGRADES_TIER_3.splice(1, 1, "oldSpreadshot");

    // sniper
        Class.rifle.UPGRADES_TIER_3.splice(1, 1, "blunderbuss");

    // machine gun
        Class.gunner.UPGRADES_TIER_3.push("tetraGunner", "oldRimfire");

    // director
        Class.overseer.UPGRADES_TIER_3.splice(6, 1, "oldCommander");
        Class.cruiser.UPGRADES_TIER_3.pop();
        Class.cruiser.UPGRADES_TIER_3.push("corvette");
        Class.underseer.UPGRADES_TIER_3.push("prodigy");

    // pounder
        Class.artillery.UPGRADES_TIER_3.splice(0, 1, "mortar", "oldSpreadshot");
        Class.artillery.UPGRADES_TIER_3.push("mender");

    Class.trapper.UPGRADES_TIER_2.push("autoTrapper");
        Class.builder.UPGRADES_TIER_3.splice(3, 1, "oldBentBoomer");
        Class.builder.UPGRADES_TIER_3.push("quadBuilder");
        Class.triTrapper.UPGRADES_TIER_3.push("prodigy");
        Class.autoTrapper.UPGRADES_TIER_3 = ["autoBuilder", "hexaTrapper"];

    Class.desmos.UPGRADES_TIER_2.push("undertow", "repeater");

Class.unavailable.UPGRADES_TIER_0.push("spreadshot", "crossbow", "commander", "boomer", "spike");

} else {
Class.weirdSpike.UPGRADE_LABEL = "Weird Spike";
Class.oldBentBoomer.UPGRADE_LABEL = "Old Bent Boomer";
Class.oldRimfire.UPGRADE_LABEL = "Old Rimfire";
Class.oldSpreadshot.UPGRADE_LABEL = "Old Spreadshot";
Class.oldCommander.UPGRADE_LABEL = "Old Commander";

Class.unavailable.UPGRADES_TIER_0.push("weirdSpike", "oldBentBoomer", "quadBuilder", "master", "blunderbuss", "oldRimfire", "oldSpreadshot", "oldCommander", "autoTrapper", "prodigy", "mender", "tetraGunner", "corvette", "flail", "repeater");
}

};
