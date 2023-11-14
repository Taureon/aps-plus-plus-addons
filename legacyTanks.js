const { combineStats, makeAuto, makeDeco } = require('../facilitators.js');
const { base, gunCalcNames, statnames, dfltskl, smshskl } = require('../constants.js');
const tanks = require('../groups/tanks.js');
const g = require('../gunvals.js');

module.exports = ({ Class }) => {

Class.weirdSpike = {
    PARENT: ["genericTank"],
    LABEL: "Spike",
    UPGRADE_LABEL: "Weird Spike",
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
    UPGRADE_LABEL: "Old Bent Boomer",
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
Class.master = {
    PARENT: ["genericTank"],
    LABEL: "Master",
    STAT_NAMES: statnames.drone,
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
    UPGRADE_LABEL: "Old Rimfire",
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
    UPGRADE_LABEL: "Old Spreadshot",
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
    UPGRADE_LABEL: "Old Commander",
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

// WHIRLWIND!!!
Class.whirlwindDeco = makeDeco(6);
Class.whirlwindDeco.CONTROLLERS = [["spin", { independent: true, speed: 0.05 }]];
Class.whirlwind = {
    PARENT: ["genericTank"],
    LABEL: "Whirlwind",
    TOOLTIP: "[DEV NOTE] The Whirlwind is not finished yet. This tank is currently just a mockup.",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "whirlwindDeco",
        },
    ],
};
Class.tornadoDeco = makeDeco(4);
Class.tornadoDeco.CONTROLLERS = [["spin", { independent: true }]];
Class.tornado = {
    PARENT: ["genericTank"],
    LABEL: "Tornado",
    DANGER: 6,
    TOOLTIP: "[DEV NOTE] The Tornado is not finished yet. This tank is currently just a mockup.",
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
    ],
};
Class.megaTornadoDeco = makeDeco([[0,-1],[0.5,0],[0,1],[-0.5,0]])
Class.megaTornadoDeco.CONTROLLERS = [["spin", { independent: true }]];
Class.megaTornado = {
    PARENT: ["genericTank"],
    LABEL: "Mega Tornado",
    DANGER: 7,
    TOOLTIP: "[DEV NOTE] The Mega Tornado is not finished yet. This tank is currently just a mockup.",
    TURRETS: [
        {
            POSITION: [16, 0, 0, 0, 360, 1],
            TYPE: "megaTornadoDeco",
        },
    ],
};
Class.tempestDeco1 = makeDeco(3);
Class.tempestDeco1.CONTROLLERS = [["spin", { independent: true }]];
Class.tempestDeco2 = makeDeco(3);
Class.tempestDeco2.CONTROLLERS = [["spin", { independent: true, speed: 0.025 }]];
Class.tempest = {
    PARENT: ["genericTank"],
    LABEL: "Tempest",
    DANGER: 7,
    TOOLTIP: "[DEV NOTE] The Tempest is not finished yet. This tank is currently just a mockup.",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "tempestDeco1",
        },
        {
            POSITION: [4.5, 0, 0, 180, 360, 1],
            TYPE: "tempestDeco2",
        },
    ],
};
Class.thunderboltDeco = makeDeco(4);
Class.thunderboltDeco.CONTROLLERS = [["spin", { independent: true, speed: 0.1 }]];
Class.thunderbolt = {
    PARENT: ["genericTank"],
    LABEL: "Thunderbolt",
    DANGER: 7,
    TOOLTIP: "[DEV NOTE] The Thunderbolt is not finished yet. This tank is currently just a mockup.",
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: "thunderboltDeco",
        },
    ],
};
Class.hurricaneDeco = makeDeco(8);
Class.hurricaneDeco.CONTROLLERS = [["spin", { independent: true }]];
Class.hurricane = {
    PARENT: ["genericTank"],
    LABEL: "Hurricane",
    DANGER: 6,
    TOOLTIP: "[DEV NOTE] The Hurricane is not finished yet. This tank is currently just a mockup.",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "hurricaneDeco",
        },
    ],
};
Class.typhoonDeco = makeDeco(10);
Class.typhoonDeco.CONTROLLERS = [["spin", { independent: true }]];
Class.typhoon = {
    PARENT: ["genericTank"],
    LABEL: "Typhoon",
    DANGER: 7,
    TOOLTIP: "[DEV NOTE] The Typhoon is not finished yet. This tank is currently just a mockup.",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "typhoonDeco",
        },
    ],
};
Class.blizzardDeco1 = makeDeco(5);
Class.blizzardDeco1.CONTROLLERS = [["spin", { independent: true }]];
Class.blizzardDeco2 = makeDeco(5);
Class.blizzardDeco2.CONTROLLERS = [["spin", { independent: true, speed: 0.025 }]];
Class.blizzard = {
    PARENT: ["genericTank"],
    LABEL: "Blizzard",
    DANGER: 7,
    TOOLTIP: "[DEV NOTE] The Blizzard is not finished yet. This tank is currently just a mockup.",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "blizzardDeco1",
        },
        {
            POSITION: [6.5, 0, 0, 180, 360, 1],
            TYPE: "blizzardDeco2",
        },
    ],
};
Class.hexaWhirl = {
    PARENT: ["genericTank"],
    LABEL: "Hexa Whirl",
    DANGER: 7,
    TOOLTIP: "[DEV NOTE] The Hexa Whirl is not finished yet. This tank is currently just a mockup.",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 60, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 300, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.munition = {
    PARENT: ["genericTank"],
    DANGER: 7,
    LABEL: "Munition",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
    ],
    TOOLTIP: "[DEV NOTE] The Munition is not finished yet. This tank is currently just a mockup.",
    GUNS: [
        {
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
    ],
};
Class.whirl3 = {
    PARENT: ["genericTank"],
    LABEL: "Whirl-3",
    DANGER: 7,
    FACING_TYPE: "autospin",
    TOOLTIP: "[DEV NOTE] The Whirl-3 is not finished yet. This tank is currently just a mockup.",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
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
};
Class.whirlGuard = {
    PARENT: ["genericTank"],
    LABEL: "Whirl Guard",
    STAT_NAMES: statnames.mixed,
    DANGER: 7,
    TOOLTIP: "[DEV NOTE] The Whirl Guard is not finished yet. This tank is currently just a mockup.",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [13, 8, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [4, 8, 1.7, 13, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
};
Class.prohpet = {
    PARENT: ["genericTank"],
    LABEL: "Prophet",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.9 * base.SPEED,
    },
    SHAPE: 4,
    MAX_CHILDREN: 14,
    TOOLTIP: "[DEV NOTE] The Phophet is not finished yet. This tank is currently just a mockup.",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [5.25, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
            },
        },
        {
            POSITION: [5.25, 12, 1.2, 8, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
            },
        },
    ],
};
Class.vortex = {
    PARENT: ["genericTank"],
    LABEL: "Vortex",
    BODY: {
        FOV: base.FOV * 1.1,
    },
    DANGER: 7,
    TOOLTIP: "[DEV NOTE] The Vortex is not finished yet. This tank is currently just a mockup.",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [10, 9, 1, 9, 0, 0, 0],
        },
        {
            POSITION: [17, 13, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty]),
                TYPE: "minimissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
};

Class.whirlwind.UPGRADES_TIER_2 = ["tornado", "hurricane"];
    Class.whirlwind.UPGRADES_TIER_3 = ["hexaWhirl", "munition", "whirl3", "whirlGuard", "prohpet", "vortex"];
    Class.tornado.UPGRADES_TIER_3 = ["megaTornado", "tempest", "thunderbolt"];
    Class.hurricane.UPGRADES_TIER_3 = ["typhoon", "blizzard"];

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

Class.legacyTanks = {
    PARENT: ["menu"],
    LABEL: "Legacy Tanks",
    UPGRADES_TIER_0: ["weirdSpike", "oldBentBoomer", "quadBuilder", "master", "blunderbuss", "oldRimfire", "oldSpreadshot", "oldCommander", "autoTrapper", "prodigy", "mender", "tetraGunner", "corvette", "whirlwind", "flail"]
};
Class.addons.UPGRADES_TIER_0.push("legacyTanks");

};
