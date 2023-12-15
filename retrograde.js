const { combineStats, makeMulti, makeGuard } = require('../facilitators.js');
const { base, gunCalcNames, statnames } = require('../constants.js');
const g = require('../gunvals.js');

module.exports = ({ Class }) => {
// Anything that was added to Arms Race (like the Quad Twin and Blower) has been removed.

// Sniper upgrades
Class.retrogradeRifle = {
    PARENT: "genericTank",
    LABEL: "Rifle",
    BODY: {
        FOV: base.FOV * 1.225
    },
    GUNS: [
        {
            POSITION: [22, 7, 1, 0, 0, 0, 0],
                PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [14, 10, 1, 0, 0, 0, 0]
        }
    ]
}

// Rifle upgrades
Class.retrogradeSniperRifle = {
    PARENT: "genericTank",
    LABEL: "Sniper Rifle",
    BODY: {
        FOV: 1.4 * base.FOV
    },
    GUNS: [
        {
            POSITION: [28, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.rifle]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [14, 10, 1, 0, 0, 0, 0]
        }
    ]
}
Class.retrogradeRifleGuard = makeGuard(Class.retrogradeRifle, "Rifle Guard")

Class.retrogradeSpreadRifle = {
    PARENT: "genericTank",
    LABEL: "Spread Rifle",
    BODY: {
        FOV: base.FOV * 1.225,
    },
    GUNS: [
        {
            POSITION: [18, 2, 1, 0, 5, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.rifle,
                    g.halfspeed,
                    g.halfrecoil,
                ]),
                TYPE: "bullet",
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
                TYPE: "bullet",
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
                TYPE: "bullet",
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
                TYPE: "bullet",
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
                TYPE: "bullet",
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
                    g.halfrecoil
                ]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [22, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [14, 10, 1, 0, 0, 0, 0]
        }
    ]
}
Class.retrogradeRifle.UPGRADES_TIER_3 = ["retrogradeSniperRifle", "retrogradeRifleGuard", "retrogradeSpreadRifle"]

// Machine Gun upgrades
Class.retrogradeBlaster = {
    PARENT: "genericTank",
    LABEL: "Blaster",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [11.5, 10.5, 1.4, 4, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                TYPE: "bullet",
            }
        }
    ]
}
Class.retrogradeGatlingGun = {
    PARENT: "genericTank",
    LABEL: "Gatling Gun",
    DANGER: 6,
    BODY: {
        FOV: base.FOV * 1.2
    },
    GUNS: [
        {
            POSITION: [16, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.retrogradeMachineFlank = makeMulti({
    PARENT: "genericTank",
    GUNS: [
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flank]),
                TYPE: "bullet",
            },
        },
    ],
}, 2, "Machine Flank")
Class.machineGun.UPGRADES_TIER_2.push("retrogradeBlaster", "retrogradeGatlingGun", "retrogradeMachineFlank")

// Blaster upgrades
Class.retrogradeTriBlaster = {
    PARENT: "genericTank",
    LABEL: "Tri-Blaster",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [11.5, 10.5, 1.4, 1.75, -0.75, 27.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.bent, g.halfrecoil]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [11.5, 10.5, 1.4, 1.75, 0.75, -27.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.bent, g.halfrecoil]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [11.5, 10.5, 1.4, 4, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.bent, g.halfrecoil]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.retrogradeSplasher = {
    PARENT: "genericTank",
    LABEL: "Splasher",
    GUNS: [
        {
            POSITION: [17, 7, 1, 4, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.lowpower,
                    g.mach,
                    g.morerecoil,
                ]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [10, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.retrogradeFlamethrower = {
    PARENT: "genericTank",
    LABEL: "Flamethrower",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [4, 11, -1.8, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.mach,
                    g.blaster,
                    g.bitlessspeed,
                    g.bitlessspeed,
                ]),
                TYPE: "growBullet"
            }
        },
        {
            POSITION: [10, 14, 1.8, 8, 0, 0, 0]
        }
    ]
}
Class.retrogradeBlaster.UPGRADES_TIER_3 = ["retrogradeTriBlaster", "retrogradeSplasher", "retrogradeFlamethrower"]

Class.sprayer.UPGRADES_TIER_3.push("retrogradeSplasher")

// Gatling Gun upgrades
Class.retrogradeSprayer = {
    PARENT: "genericTank",
    LABEL: "Sprayer",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.2
    },
    GUNS: [
        {
            POSITION: [14, 8, 1.4, 8, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.retrogradeAccurator = {
    PARENT: "genericTank",
    LABEL: "Accurator",
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.5
    },
    GUNS: [
        {
            POSITION: [5, 1, -5, 24, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain, g.fake]),
                TYPE: "speedBullet",
                HAS_NO_RECOIL: true,
            },
        },
        {
            POSITION: [16, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain]),
                TYPE: "speedBullet",
            },
        },
    ],
};
Class.retrogradeGatlingGun.UPGRADES_TIER_3 = ["focal", "retrogradeAccurator"]

// Machine Flank upgrades
Class.retrogradeMachineTriple = makeMulti({
    PARENT: "genericTank",
    GUNS: [
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flank]),
                TYPE: "bullet"
            }
        }
    ]
}, 3, "Machine Triple")
Class.retrogradeHalfNHalf = {
    PARENT: "genericTank",
    LABEL: "Half'n Half",
    GUNS: [
        {
            POSITION: [12, 10, 1.4, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flank]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain, g.flank]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.retrogradeMachineFlank.UPGRADES_TIER_3 = ["retrogradeMachineTriple", "retrogradeHalfNHalf"]
Class.flankGuard.UPGRADES_TIER_3.push("retrogradeMachineTriple")

// Pounder upgrade
Class.retrogradeProtector = {
    PARENT: "genericTank",
    LABEL: "Protector",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [11, 12, 1, 6, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfrecoil]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [10, 14, 1, 6, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            }
        },
        {
            POSITION: [8, 14, -1.3, 4, 0, 0, 0]
        },
    ],
};
Class.pounder.UPGRADES_TIER_3.push("retrogradeProtector")
Class.trapper.UPGRADES_TIER_3.push("retrogradeProtector")

// Trap Guard upgrades
Class.retrogradeDoubleTrapGuard = {
    PARENT: "genericTank",
    LABEL: "Double Trap Guard",
    STAT_NAMES: statnames.generic,
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.95,
    },
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 7, 1, 0, -6, 180, 0],
        },
        {
            POSITION: [4, 7, 1.5, 14, -6, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            }
        },
        {
            POSITION: [14, 7, 1, 0, 6, 180, 0.5],
        },
        {
            POSITION: [4, 7, 1.5, 14, 6, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            }
        }
    ]
}

// Dev Tanks
Class.unavailable.UPGRADES_TIER_0.push("retrogradeDoubleTrapGuard", "retrogradeRifle", "retrogradeSprayer")

}
