const { combineStats, addBackGunner } = require('../facilitators.js');
const { base, gunCalcNames, statnames } = require('../constants.js');
const g = require('../gunvals.js');

module.exports = ({ Class }) => {
// This addon has been repurposed to hold removed/scrapped arras.io tanks.
// Anything that was added to Arms Race (like the Quad Twin and Blower) has been removed.

    // SNIPER UPGRADES
    Class.rifle_retrograde = {
        PARENT: ["genericTank"],
        LABEL: "Rifle",
        BODY: {
            FOV: base.FOV * 1.225,
        },
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [22, 7, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                    TYPE: Class.bullet,
                },
            },
            {
                POSITION: [14, 10, 1, 0, 0, 0, 0],
            },
        ],
    };

    // RIFLE UPGRADES
    Class.sniperRifle = {
        PARENT: ["genericTank"],
        LABEL: "Sniper Rifle",
        BODY: {
            FOV: 1.4 * base.FOV,
        },
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [28, 7, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.rifle]),
                    TYPE: Class.bullet,
                },
            },
            {
                POSITION: [14, 10, 1, 0, 0, 0, 0],
            },
        ],
    };
    Class.rifleGuard = {
        PARENT: ["genericTank"],
        LABEL: "Rifle Guard",
        BODY: {
            FOV: base.FOV * 1.225,
        },
        DANGER: 7,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [22, 7, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                    TYPE: Class.bullet,
                },
            },
            {
                POSITION: [14, 10, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [13, 8.5, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [4, 8.5, 1.7, 13, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: Class.trap,
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.spreadRifle = {
        PARENT: ["genericTank"],
        LABEL: "Spread Rifle",
        BODY: {
            FOV: base.FOV * 1.225,
        },
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [18, 2, 1, 0, 5, 0, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.sniper,
                        g.rifle,
                        g.halfspeed,
                        g.halfrecoil,
                    ]),
                    TYPE: Class.bullet,
                },
            },
            {
                POSITION: [18, 2, 1, 0, -5, 0, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.sniper,
                        g.rifle,
                        g.halfspeed,
                        g.halfrecoil,
                    ]),
                    TYPE: Class.bullet,
                },
            },
            {
                POSITION: [14, 2, 1, 0, 6, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.sniper,
                        g.rifle,
                        g.halfspeed,
                        g.halfrecoil,
                    ]),
                    TYPE: Class.bullet,
                },
            },
            {
                POSITION: [14, 2, 1, 0, -6, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.sniper,
                        g.rifle,
                        g.halfspeed,
                        g.halfrecoil,
                    ]),
                    TYPE: Class.bullet,
                },
            },
            {
                POSITION: [10, 2, 1, 0, 7, 0, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.sniper,
                        g.rifle,
                        g.halfspeed,
                        g.halfrecoil,
                    ]),
                    TYPE: Class.bullet,
                },
            },
            {
                POSITION: [10, 2, 1, 0, -7, 0, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.sniper,
                        g.rifle,
                        g.halfspeed,
                        g.halfrecoil,
                    ]),
                    TYPE: Class.bullet,
                },
            },
            {
                POSITION: [22, 7, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                    TYPE: Class.bullet,
                },
            },
            {
                POSITION: [14, 10, 1, 0, 0, 0, 0],
            },
        ],
    };
    Class.rifle_retrograde.UPGRADES_TIER_3 = ["sniperRifle", "rifleGuard", "spreadRifle"];

    // MACHINE GUN UPGRADES
    Class.blaster = {
        PARENT: ["genericTank"],
        LABEL: "Blaster",
        DANGER: 6,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [11.5, 10.5, 1.4, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                    TYPE: Class.bullet,
                },
            },
        ],
    };
    Class.gatlingGun = {
        PARENT: ["genericTank"],
        LABEL: "Gatling Gun",
        DANGER: 6,
        BODY: {
            FOV: base.FOV * 1.2,
        },
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [16, 10, 1.4, 8, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain]),
                    TYPE: Class.bullet,
                },
            },
        ],
    };
    Class.machineFlank = {
        PARENT: ["genericTank"],
        LABEL: "Machine Flank",
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [12, 10, 1.4, 8, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flank]),
                    TYPE: Class.bullet,
                },
            },
            {
                POSITION: [12, 10, 1.4, 8, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flank]),
                    TYPE: Class.bullet,
                },
            },
        ],
    };
    Class.machineGun.UPGRADES_TIER_2.push("blaster", "gatlingGun", "machineFlank");

    // BLASTER UPGRADES
    Class.triBlaster = {
        PARENT: ["genericTank"],
        LABEL: "Tri-Blaster",
        DANGER: 7,
        HAS_NO_RECOIL: true,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [11.5, 10.5, 1.4, 1.75, -0.75, 27.5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.bent]),
                    TYPE: Class.bullet,
                },
            },
            {
                POSITION: [11.5, 10.5, 1.4, 1.75, 0.75, -27.5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.bent]),
                    TYPE: Class.bullet,
                },
            },
            {
                POSITION: [11.5, 10.5, 1.4, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.bent]),
                    TYPE: Class.bullet,
                },
            },
        ],
    };
    Class.splasher = {
        PARENT: ["genericTank"],
        LABEL: "Splasher",
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [17, 7, 1, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.lowpower,
                        g.mach,
                        g.morerecoil,
                    ]),
                    TYPE: Class.bullet,
                },
            },
            {
                POSITION: [10, 10, 1.4, 8, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                    TYPE: Class.bullet,
                },
            },
        ],
    };
    Class.flamethrower = {
        PARENT: ["genericTank"],
        LABEL: "Flamethrower",
        DANGER: 7,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [4, 11, -1.8, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.mach,
                        g.blaster,
                        g.bitlessspeed,
                        g.bitlessspeed,
                    ]),
                    TYPE: Class.growBullet,
                },
            },
            {
                POSITION: [10, 14, 1.8, 8, 0, 0, 0],
            },
        ],
    };
    Class.blaster.UPGRADES_TIER_3 = ["triBlaster", "splasher", "flamethrower"];

    // GATLING GUN UPGRADES
    Class.retrogradeSprayer = {
        PARENT: ["genericTank"],
        LABEL: "Sprayer",
        DANGER: 7,
        BODY: {
            FOV: base.FOV * 1.2,
        },
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [14, 8, 1.4, 8, 0, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain]),
                    TYPE: Class.bullet,
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [12, 10, 1.4, 8, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain]),
                    TYPE: Class.bullet,
                },
            },
        ],
    };
    Class.accurator = {
        PARENT: ["genericTank"],
        LABEL: "Accurator",
        DANGER: 7,
        BODY: {
            SPEED: base.SPEED * 0.8,
            FOV: base.FOV * 1.5,
        },
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [5, 1, -5, 24, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain, g.fake]),
                    TYPE: Class.speedBullet,
                    HAS_NO_RECOIL: true,
                },
            },
            {
                POSITION: [16, 10, 1.4, 8, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain]),
                    TYPE: Class.speedBullet,
                },
            },
        ],
    };
    Class.gatlingGun.UPGRADES_TIER_3 = ["retrogradeSprayer", "accurator"];

    // MACHINE FLANK UPGRADES
    Class.machineTriple = {
        PARENT: ["genericTank"],
        LABEL: "Machine Triple",
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [12, 10, 1.4, 8, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flank]),
                    TYPE: Class.bullet,
                },
            },
            {
                POSITION: [12, 10, 1.4, 8, 0, 120, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flank]),
                    TYPE: Class.bullet,
                },
            },
            {
                POSITION: [12, 10, 1.4, 8, 0, 240, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flank]),
                    TYPE: Class.bullet,
                },
            },
        ],
    };
    Class.halfNHalf = {
        PARENT: ["genericTank"],
        LABEL: "Half 'n Half",
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [12, 10, 1.4, 8, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flank]),
                    TYPE: Class.bullet,
                },
            },
            {
                POSITION: [16, 10, 1.4, 8, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain, g.flank]),
                    TYPE: Class.bullet,
                },
            },
        ],
    };
    Class.machineFlank.UPGRADES_TIER_3 = ["machineTriple", "halfNHalf"];

    // POUNDER UPGRADES
    Class.protector = {
        PARENT: ["genericTank"],
        LABEL: "Protector",
        DANGER: 7,
        GUNS: [
            /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                POSITION: [11, 12, 1, 6, 0, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                    TYPE: Class.bullet,
                    HAS_NO_RECOIL: true,
                },
            },
            {
                POSITION: [10, 14, 1, 6, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: Class.trap,
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [8, 14, -1.3, 4, 0, 0, 0],
            },
        ],
    };
    Class.pounder.UPGRADES_TIER_3.push("protector");

    // TRAP GUARD UPGRADES
    Class.doubleTrapGuard = {
        PARENT: ["genericTank"],
        LABEL: "Double Trap Guard",
        STAT_NAMES: statnames.generic,
        DANGER: 7,
        BODY: {
            SPEED: base.SPEED * 0.95,
        },
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [20,     8,      1,      0,    -5.5,     0,      0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                    TYPE: Class.bullet,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [20,     8,      1,      0,     5.5,     0,     0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                    TYPE: Class.bullet,
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [14,     7,      1,      0,     -6,     180,     0],
            },
            {
                POSITION: [4,      7,     1.5,    14,     -6,     180,     0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: Class.trap,
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [14,     7,      1,      0,      6,     180,    0.5],
            },
            {
                POSITION: [4,      7,     1.5,    14,      6,     180,    0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: Class.trap,
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };

    // Dev Tanks
    Class.removed = {
        PARENT: ["menu"],
        LABEL: "Removed Tanks",
    };
    Class.removed.UPGRADES_TIER_0 = ["rifle_retrograde", "blaster", "gatlingGun", "machineFlank", "protector", "doubleTrapGuard"];
    Class.developer.UPGRADES_TIER_0.push("removed");
};
