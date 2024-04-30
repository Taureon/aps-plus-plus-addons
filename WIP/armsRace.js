const { dereference, combineStats, makeDeco, makeAuto, makeBird, makeMulti, makeOver, makeSwarming, addBackGunner } = require('../facilitators.js');
const { base, gunCalcNames, statnames, dfltskl, smshskl } = require('../constants.js');
const g = require('../gunvals.js');
Class.znpAR_placeholder = { LABEL: "PLACEHOLDER", COLOR: "black", UPGRADE_COLOR: "black"}

// YES I KNOW THE LINE COUNT IS RIDICULOUS I'LL IMPROVE IT LATER OK
// return

// Cannon Functions
const makeFighter = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = dereference(type);
    let cannons = [{
        POSITION: [16, 8, 1, 0, -1, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront]),
            TYPE: "bullet",
            LABEL: "Side",
        },
    }, {
        POSITION: [16, 8, 1, 0, 1, -90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront]),
            TYPE: "bullet",
            LABEL: "Side",
        },
    }];
    output.GUNS = type.GUNS == null ? cannons : type.GUNS.concat(cannons);
    output.LABEL = name == -1 ? "Fighter " + type.LABEL : name;
    return output;
}
const makeSurfer = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = dereference(type);
    let cannons = [{
            POSITION: [7, 7.5, 0.6, 7, -1, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 1, -90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }];
    output.GUNS = type.GUNS == null ? cannons : type.GUNS.concat(cannons);
    output.LABEL = name == -1 ? "Surfer " + type.LABEL : name;
    return output;
}
const makeSuperbird = (type, name = -1, frontRecoilFactor = 1, backRecoilFactor = 1, color) => {
    type = ensureIsClass(type);
    let output = dereference(type);
    // Thrusters
    let backRecoil = 0.5 * backRecoilFactor;
    let thrusterProperties = { SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster, { recoil: backRecoil }]), TYPE: "bullet", LABEL: gunCalcNames.thruster };
    let shootyBois = [{
            POSITION: [14, 8, 1, 0, 0, 130, 0.6],
            PROPERTIES: thrusterProperties
        }, {
            POSITION: [14, 8, 1, 0, 0, -130, 0.6],
            PROPERTIES: thrusterProperties
        }, {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: thrusterProperties
        }, {
            POSITION: [16, 8, 1, 0, 0, -150, 0.1],
            PROPERTIES: thrusterProperties
        }, {
            POSITION: [18, 8, 1, 0, 0, 180, 0.35],
            PROPERTIES: thrusterProperties
        },];
    // Assign thruster color
    if (color) for (let gun of shootyBois) {
        gun.PROPERTIES.TYPE = [gun.PROPERTIES.TYPE, { COLOR: color }];
    }

    // Modify front barrels
    for (let gun of output.GUNS) {
        if (gun.PROPERTIES) {
            gun.PROPERTIES.ALT_FIRE = true;
            // Nerf front barrels
            if (gun.PROPERTIES.SHOOT_SETTINGS) {
                gun.PROPERTIES.SHOOT_SETTINGS = combineStats([gun.PROPERTIES.SHOOT_SETTINGS, g.flankGuard, g.triAngle, g.triAngleFront, {recoil: frontRecoilFactor}]);
            }
        }
    }
    // Assign misc settings
    if (output.FACING_TYPE == "locksFacing") output.FACING_TYPE = "toTarget";
    output.GUNS = type.GUNS == null ? [...shootyBois] : [...output.GUNS, ...shootyBois];
    output.LABEL = name == -1 ? "Bird " + type.LABEL : name;
    return output;
}
const makeSplit = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = dereference(type);
    let cannons = [{
        POSITION: [18, 8, 1, 0, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard]),
            TYPE: "bullet",
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard]),
            TYPE: "bullet",
        },
    }];
    output.GUNS = type.GUNS == null ? cannons : type.GUNS.concat(cannons);
    output.LABEL = name == -1 ? "Split " + type.LABEL : name;
    return output;
}
const makeTriGuard = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = dereference(type),
    cannons = [{
        POSITION: [13, 8, 1, 0, 0, 180, 0],
        }, {
        POSITION: [4, 8, 1.7, 13, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: "trap",
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    },{
        POSITION: [13, 8, 1, 0, 0, 90, 0],
        }, {
        POSITION: [4, 8, 1.7, 13, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: "trap",
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    },{
        POSITION: [13, 8, 1, 0, 0, 270, 0],
        }, {
        POSITION: [4, 8, 1.7, 13, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: "trap",
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }];
    output.GUNS = type.GUNS == null ? cannons : type.GUNS.concat(cannons);
    output.LABEL = name == -1 ? "Tri-" + type.LABEL + " Guard" : name;
    return output;
}
const makePenGuard = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = dereference(type),
    cannons = [{
        POSITION: [20, 8, 1, 0, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet",
        }
        }, {
        POSITION: [4, 8, 1.7, 13, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: "trap",
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }];
    output.GUNS = type.GUNS == null ? cannons : type.GUNS.concat(cannons);
    output.LABEL = name == -1 ? type.LABEL + " Guard" : name;
    return output;
}
const makeMechGuard = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = dereference(type),
    cannons = [{
            POSITION: [15, 8, 1, 0, 0, 180, 0]
        },
        {
            POSITION: [3, 8, 1.7, 15, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "znpAR_autoTrap",
                STAT_CALCULATOR: gunCalcNames.trap
            }
        },
        {
            POSITION: [12, 11, 1, 0, 0, 180, 0]
        }];
    output.GUNS = type.GUNS == null ? cannons : type.GUNS.concat(cannons);
    output.LABEL = name == -1 ? type.LABEL + " Guard" : name;
    return output;
}
const makeMachineGuard = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = dereference(type),
    cannons = [{
            POSITION: [15, 9, 1.4, 0, 0, 180, 0],
        },
        {
            POSITION: [3, 13, 1.3, 15, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.machineGun, {reload: 0.625, size: 0.625, spray: 0.75}]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }];
    output.GUNS = type.GUNS == null ? cannons : type.GUNS.concat(cannons);
    output.LABEL = name == -1 ? type.LABEL + " Guard" : name;
    return output;
}

// Spawner Functions
const makeHybrid = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = dereference(type);
    let spawner = {
        POSITION: [6, 12, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: ["drone", { INDEPENDENT: true }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,
            MAX_CHILDREN: 3,
        },
    };
    output.GUNS = type.GUNS == null ? [spawner] : [spawner, ...type.GUNS];
    output.LABEL = name == -1 ? "Hybrid " + type.LABEL : name;
    return output;
}

// Auto-Functions
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

// Misc Functions
const makeFast = (type, mult = 1.1, name = -1) => {
    type = ensureIsClass(type);
    let output = dereference(type);
    if (output.BODY.SPEED) output.BODY.SPEED = base.SPEED;
    output.BODY.SPEED *= mult;
    output.LABEL = name == -1 ? output.LABEL : name;
    return output;
}

// Missiles
Class.znpAR_autoMiniMissile = makeAuto('minimissile')
Class.znpAR_clusterMissile = {
    PARENT: "minimissile",
    TURRETS: [
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: "genericEntity",
        },
    ],
    GUNS: [
        {
            POSITION: [14, 6, 1, 0, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { recoil: 1.35 }, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [8, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.noSpread]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
    			SHOOT_ON_DEATH: true,
            }
        },
        {
            POSITION: [8, 8, 1, 0, 0, 30, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.noSpread]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
    			SHOOT_ON_DEATH: true,
            }
        },
        {
            POSITION: [8, 8, 1, 0, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.noSpread]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
    			SHOOT_ON_DEATH: true,
            }
        },
        {
            POSITION: [8, 8, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.noSpread]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
    			SHOOT_ON_DEATH: true,
            }
        },
        {
            POSITION: [8, 8, 1, 0, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.noSpread]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
    			SHOOT_ON_DEATH: true,
            }
        },
        {
            POSITION: [8, 8, 1, 0, 0, 150, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.noSpread]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
    			SHOOT_ON_DEATH: true,
            }
        },
        {
            POSITION: [8, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.noSpread]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
    			SHOOT_ON_DEATH: true,
            }
        },
        {
            POSITION: [8, 8, 1, 0, 0, 210, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.noSpread]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
    			SHOOT_ON_DEATH: true,
            }
        },
        {
            POSITION: [8, 8, 1, 0, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.noSpread]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
    			SHOOT_ON_DEATH: true,
            }
        },
        {
            POSITION: [8, 8, 1, 0, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.noSpread]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
    			SHOOT_ON_DEATH: true,
            }
        },
        {
            POSITION: [8, 8, 1, 0, 0, 300, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.noSpread]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
    			SHOOT_ON_DEATH: true,
            }
        },
        {
            POSITION: [8, 8, 1, 0, 0, 330, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.noSpread]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
    			SHOOT_ON_DEATH: true,
            }
        }
    ]
}
Class.znpAR_pitcherMissile = {
    PARENT: "minimissile",
    GUNS: [
        {
            POSITION: [14, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { recoil: 1.15 }, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
                STAT_CALCULATOR: gunCalcNames.thruster
            }
        },
        {
            POSITION: [14, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { recoil: 1.15 }, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
                STAT_CALCULATOR: gunCalcNames.thruster
            }
        }
    ]
}
Class.znpAR_projectorMissile = makeMulti('minimissile', 2, "Missile")

// Drones
Class.znpAR_fastDrone = makeFast('drone')
Class.znpAR_fasterDrone = makeFast('drone', 1.2)
Class.znpAR_fastSwarm = makeFast('swarm')
Class.znpAR_fastMinion = makeFast('minion')
Class.znpAR_turretedFastDrone = makeAuto('znpAR_fastDrone', "Auto-Drone", {type: 'droneAutoTurret'})
Class.znpAR_swarmingDrone = makeAuto('drone', "Swarm Auto-Swarm", {type: 'znpAR_swarmDroneTurret'})
Class.znpAR_turretedSwarm = makeAuto('swarm', "Auto-Swarm", {type: 'droneAutoTurret'})
Class.znpAR_turretedSunchip = makeAuto('sunchip', "Auto-Sunchip", {type: 'droneAutoTurret'})
Class.znpAR_turretedMinion = makeAuto('minion', "Auto-Minion", {type: 'droneAutoTurret'})
Class.znpAR_pounderMinion = {
    PARENT: "minion",
    GUNS: [
        {
            POSITION: [19.5, 15, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.minionGun]),
                WAIT_TO_CYCLE: true,
                TYPE: "bullet",
            },
        },
    ],
}

// Traps
Class.znpAR_autoTrap = makeAuto('trap')
Class.znpAR_chargerSetTrap = makeMulti({
	PARENT: "setTrap",
    INDEPENDENT: true,
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
            TYPE: "znpAR_chargerSetTrapDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [4, 4, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
    			SHOOT_ON_DEATH: true,
                STAT_CALCULATOR: gunCalcNames.trap
            }
        }
    ]
}, 5, "Set Trap")

// Decorations
Class.znpAR_directorstormDeco = makeMulti({
	SHAPE: 4,
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
        }
    ]
}, 2, "", 90)
Class.znpAR_cruiserdriveDeco = makeDeco(3.5);
Class.znpAR_chargerSetTrapDeco = makeDeco(5);

// Turrets
Class.znpAR_sniper3Gun = {
  PARENT: "genericTank",
  LABEL: "",
  BODY: {
    FOV: 5,
  },
  CONTROLLERS: [
    "canRepel",
    "onlyAcceptInArc",
    "mapAltToFire",
    "nearestDifferentMaster",
  ],
  COLOR: 16,
  GUNS: [
    {
      POSITION: [27, 9, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.autoTurret,
          g.assassin,
          { size: 1.4, health: 2 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [5, 9, -1.5, 8, 0, 0, 0],
    },
  ],
}
Class.znpAR_crowbarGun = {
    PARENT: "genericTank",
    LABEL: "",
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: 16,
    INDEPENDENT: true,
    HAS_NO_RECOIL: true,
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.znpAR_driveAutoTurret = {
	PARENT: "autoTurret",
	SHAPE: 4
}
Class.znpAR_swarmDroneTurret = makeMulti({
    PARENT: "genericTank",
    LABEL: "Swarm Turret",
    COLOR: "grey",
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'],
    BODY: {
        FOV: 0.8,
    },
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            }
        }
    ]
}, 2)

// Tier 2 tanks
Class.znpAR_diesel = {
    PARENT: "genericTank",
    LABEL: "Diesel",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [14, 12, 1.6, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { reload: 0.375, recoil: 0.8, shudder: 1.2, size: 0.625, health: 0.95, damage: 0.9, maxSpeed: 0.8, spray: 1.3 }]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.znpAR_directordrive = {
    PARENT: "genericTank",
    LABEL: "Directordrive",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1,
    },
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "overdriveDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [6, 11, 1.3, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone]),
                TYPE: "turretedDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                MAX_CHILDREN: 6,
            },
        },
    ],
}
Class.znpAR_doper = {
	PARENT: "genericTank",
	LABEL: "Doper",
	DANGER: 6,
	STAT_NAMES: statnames.drone,
	BODY: {
		FOV: base.FOV * 1.1
	},
	GUNS: [
		{
    		POSITION: [6, 11, 1.3, 7, 0, 0, 0],
    		PROPERTIES: {
      			SHOOT_SETTINGS: combineStats([g.drone]),
      			TYPE: "znpAR_fastDrone",
      			AUTOFIRE: true,
      			SYNCS_SKILLS: true,
      			STAT_CALCULATOR: gunCalcNames.drone,
      			MAX_CHILDREN: 6
    		}
  		},
  		{
    		POSITION: [3, 3, 0.35, 11, 0, 0, 0]
  		}
  	]
}
Class.znpAR_honcho = {
  PARENT: "genericTank",
  LABEL: "Honcho",
  DANGER: 6,
  STAT_NAMES: statnames.drone,
  BODY: {
    FOV: base.FOV * 1.1
  },
  GUNS: [{
    POSITION: [13, 13, 1.4, 0, 0, 0, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, { reload: 1.2, size: 1.35, health: 1.75, speed: 1.125 }]),
      TYPE: "drone",
      AUTOFIRE: true,
      SYNCS_SKILLS: true,
      STAT_CALCULATOR: gunCalcNames.drone,
      MAX_CHILDREN: 3
    }
  }]
}
Class.znpAR_machineTrapper = {
    PARENT: "genericTank",
    LABEL: "Machine Trapper",
    DANGER: 6,
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: [15, 9, 1.4, 0, 0, 0, 0],
        },
        {
            POSITION: [3, 13, 1.3, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.machineGun, {reload: 0.625, size: 0.625, spray: 0.75}]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
Class.znpAR_mech = {
    PARENT: "genericTank",
    LABEL: "Mech",
    DANGER: 6,
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: [15, 8, 1, 0, 0, 0, 0]
        },
        {
            POSITION: [3, 8, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "znpAR_autoTrap",
                STAT_CALCULATOR: gunCalcNames.trap
            }
        },
        {
            POSITION: [12, 11, 1, 0, 0, 0, 0]
        }
    ]
}
Class.znpAR_pen = {
    PARENT: "genericTank",
    LABEL: "Pen",
    DANGER: 6,
    STAT_NAMES: statnames.mixed,
    GUNS: [
    	{
        	POSITION: [20, 8, 1, 0, 0, 0, 0],
        	PROPERTIES: {
            	SHOOT_SETTINGS: combineStats([g.basic]),
            	TYPE: "bullet",
        	},
    	},
    	{
        	POSITION: [4, 8, 1.7, 13, 0, 0, 0],
        	PROPERTIES: {
            	SHOOT_SETTINGS: combineStats([g.trap]),
            	TYPE: "trap",
            	STAT_CALCULATOR: gunCalcNames.trap,
        	},
    	}
    ]
}
Class.znpAR_wark = {
    PARENT: "genericTank",
    LABEL: "Wark",
    STAT_NAMES: statnames.trap,
    DANGER: 6,
    GUNS: [
        {
            POSITION: [14, 8, 1, 0, 5.5, 5, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, 5.5, 5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [14, 8, 1, 0, -5.5, -5, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, -5.5, -5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}

// Tier 3 tanks
Class.znpAR_baltimore = {
    PARENT: "genericTank",
    LABEL: "Baltimore",
    DANGER: 7,
    FACING_TYPE: "locksFacing",
    STAT_NAMES: statnames.swarm,
    BODY: {
        FOV: 1.2 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [11, 8.5, 0.8, 4, 4.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, { reload: 1.2, size: 1.35, health: 1.75, speed: 1.125 }]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [11, 8.5, 0.8, 4, -4.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, { reload: 1.2, size: 1.35, health: 1.75, speed: 1.125 }]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ], 
}
Class.znpAR_battery = {
    PARENT: "genericTank",
    LABEL: "Battery",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 3.5, 1, 0, 3.75, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 3.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
    ]
}
Class.znpAR_bentGunner = {
    PARENT: "genericTank",
    LABEL: "Bent Gunner",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [8.5, 3.5, 1, 2, 8, 20, 4/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [8.5, 3.5, 1, 2, -8, -20, 5/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 3.5, 1, 2, 5, 17.5, 2/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 3.5, 1, 2, -5, -17.5, 3/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, -3.75, 0, 1/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.znpAR_bentMinigun = {
    PARENT: "genericTank",
    LABEL: "Bent Minigun",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.2
    },
    GUNS: [
        {
            POSITION: [17, 8, 1, 0, -2, -15, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 8, 1, 0, -2, -15, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 8, 1, 0, 2, 15, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 8, 1, 0, 2, 15, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [21, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 0, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 8, 1, 0, 0, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.znpAR_buttbuttin = addBackGunner('assassin', "Buttbuttin")
Class.znpAR_blower = addBackGunner('destroyer', "Blower")
Class.znpAR_brisker = {
	PARENT: "genericTank",
	LABEL: "Brisker",
	DANGER: 7,
	STAT_NAMES: statnames.drone,
	BODY: {
		FOV: base.FOV * 1.1
	},
	GUNS: [
		{
    		POSITION: [6, 11, 1.3, 7, 0, 0, 0],
    		PROPERTIES: {
      			SHOOT_SETTINGS: combineStats([g.drone]),
      			TYPE: "znpAR_fasterDrone",
      			AUTOFIRE: true,
      			SYNCS_SKILLS: true,
      			STAT_CALCULATOR: gunCalcNames.drone,
      			MAX_CHILDREN: 6
    		}
  		},
  		{
    		POSITION: [4, 2, 0.35, 11, 0, 0, 0]
  		}
  	]
}
Class.znpAR_captain = makeMulti('spawner', 2, "Captain", 90)
Class.znpAR_charger = {
    PARENT: "genericTank",
    LABEL: "Charger",
    DANGER: 7,
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 1.15 * base.FOV
    },
    GUNS: [
        {
            POSITION: [18, 12, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 12, 1.1, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
                TYPE: "znpAR_chargerSetTrap",
                STAT_CALCULATOR: gunCalcNames.block
            }
        },
        {
            POSITION: [2, 4, 0.125, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.fake]),
                TYPE: "bullet",
            }
        }
    ]
}
Class.znpAR_cluster = {
    PARENT: "genericTank",
    LABEL: "Cluster",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.1,
    },
    GUNS: [
        {
            POSITION: [7.5, 8, -1.2, 12, 0, 0, 0],
        },
        {
            POSITION: [17, 13, 1.2, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery]),
                TYPE: "znpAR_clusterMissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
}
Class.znpAR_cog = {
    PARENT: "genericTank",
    LABEL: "Cog",
    DANGER: 7,
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: [15, 8, 1, 0, 4.5, 10, 0]
        },
        {
            POSITION: [3, 8, 1.7, 15, 4.5, 10, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "znpAR_autoTrap",
                STAT_CALCULATOR: gunCalcNames.trap
            }
        },
        {
            POSITION: [12, 11, 1, 0, 4.5, 10, 0]
        },
        {
            POSITION: [15, 8, 1, 0, -4.5, -10, 0.5]
        },
        {
            POSITION: [3, 8, 1.7, 15, -4.5, -10, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "znpAR_autoTrap",
                STAT_CALCULATOR: gunCalcNames.trap
            }
        },
        {
            POSITION: [12, 11, 1, 0, -4.5, -10, 0.5]
        }
    ]
}
Class.znpAR_combo = {
  PARENT: "genericTank",
  LABEL: "Combo",
  DANGER: 7,
  GUNS: [
    {
      POSITION: [18, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [18, 8, 1, 0, 0, 120, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [18, 8, 1, 0, 0, 240, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
        TYPE: "bullet",
      },
    },
  ],
  TURRETS: [
    {
      POSITION: [11, 8, 0, 60, 190, 0],
      TYPE: "autoTankGun",
      INDEPENDENT: true,
    },
    {
      POSITION: [11, 8, 0, 180, 190, 0],
      TYPE: "autoTankGun",
      INDEPENDENT: true,
    },
    {
      POSITION: [11, 8, 0, 300, 190, 0],
      TYPE: "autoTankGun",
      INDEPENDENT: true,
    },
  ],
}
Class.znpAR_courser = {
    PARENT: "genericTank",
    LABEL: "Courser",
    DANGER: 7,
    BODY: {
        SPEED: 0.85 * base.SPEED,
        FOV: 1.4 * base.FOV
    },
    CONTROLLERS: ["zoom"],
    TOOLTIP: "Hold right click to zoom.",
    GUNS: [
        {
            POSITION: [27, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, g.hunter, g.hunterSecondary]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [24, 11, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, g.hunter]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [10, 11, -1.4, 3, 0, 0, 0],
        }
    ]
}
Class.znpAR_crowbar = {
    PARENT: "genericTank",
    LABEL: "Crowbar",
    DANGER: 7,
    BODY: {
        FOV: 1.1
    },
    GUNS: [
        {
            POSITION: [40, 6, 1, 0, 0, 0, 0]
        },
        {
            POSITION: [5, 8, -1.4, 8, 0, 0, 0]
        }
    ],
    TURRETS: [
        {
            POSITION: [5.5, 20, 0, 0, 190, 1],
            TYPE: "znpAR_crowbarGun"
        },
        {
            POSITION: [5.5, 30, 0, 0, 190, 1],
            TYPE: "znpAR_crowbarGun"
        },
        {
            POSITION: [5.5, 40, 0, 0, 190, 1],
            TYPE: "znpAR_crowbarGun"
        }
    ]
}
Class.znpAR_cruiserdrive = {
    PARENT: "genericTank",
    LABEL: "Cruiserdrive",
    DANGER: 7,
    FACING_TYPE: "locksFacing",
    STAT_NAMES: statnames.swarm,
    BODY: {
        FOV: 1.2 * base.FOV,
    },
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
            TYPE: "znpAR_cruiserdriveDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "znpAR_turretedSwarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "znpAR_turretedSwarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
Class.znpAR_recharger = {
    PARENT: "genericTank",
    LABEL: "Recharger",
    DANGER: 7,
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [17, 3, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 3, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [20, 13, 0.8, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos, g.pounder]),
                TYPE: ["bullet", {MOTION_TYPE: "desmos"}],
                LABEL: "Heavy",
            },
        },
        {
            POSITION: [5, 10, 2.125, 1, -6.375, 90, 0],
        },
        {
            POSITION: [5, 10, 2.125, 1, 6.375, -90, 0],
        },
    ],
}
Class.znpAR_deathStar = makeMulti({
    PARENT: "genericTank",
    GUNS: [
        {
            POSITION: [20.5, 12, 1, 0, 0, 60, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20.5, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ]
}, 3, "Death Star")
Class.znpAR_dieselTrapper = {
    PARENT: "genericTank",
    LABEL: "Diesel Trapper",
    DANGER: 7,
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: [17, 11, 1.5, 0, 0, 0, 0],
        },
        {
            POSITION: [3, 17, 1.3, 17, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.machineGun, { reload: 0.375, recoil: 0.8, shudder: 1.2, size: 0.625, health: 0.95, damage: 0.9, maxSpeed: 0.8, spray: 1.3 }, {reload: 0.625, size: 0.625, spray: 0.75}]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
Class.znpAR_directorstorm = {
    PARENT: "genericTank",
    LABEL: "Directorstorm",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1,
    },
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "znpAR_directorstormDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [6, 11, 1.3, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone]),
                TYPE: "znpAR_swarmingDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                MAX_CHILDREN: 6,
            },
        },
    ],
}
Class.znpAR_discharger = {
    PARENT: "genericTank",
    LABEL: "Discharger",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [15, 3, 1, 0, -6, -7, 0],
        },
        {
            POSITION: [2, 3, 1.7, 15, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [15, 3, 1, 0, 6, 7, 0],
        },
        {
            POSITION: [2, 3, 1.7, 15, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
    ],
}
Class.znpAR_doperdrive = {
  PARENT: "genericTank",
  LABEL: "Doperdrive",
  DANGER: 7,
  STAT_NAMES: statnames.drone,
  BODY: {
    FOV: base.FOV * 1.1
  },
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "overdriveDeco",
        },
    ],
  GUNS: [{
    POSITION: [6, 11, 1.3, 7, 0, 0, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone]),
      TYPE: "znpAR_turretedFastDrone",
      AUTOFIRE: true,
      SYNCS_SKILLS: true,
      STAT_CALCULATOR: gunCalcNames.drone,
      MAX_CHILDREN: 6
    }
  }, {
    POSITION: [3, 3, 0.35, 11, 0, 0, 0]
  }]
}
Class.znpAR_dopeseer = makeMulti({
  PARENT: "genericTank",
  DANGER: 7,
  STAT_NAMES: statnames.drone,
  BODY: {
    FOV: base.FOV * 1.1
  },
  MAX_CHILDREN: 8,
  GUNS: [{
    POSITION: [6, 12, 1.2, 8, 0, 0, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
      TYPE: "znpAR_fastDrone",
      AUTOFIRE: true,
      SYNCS_SKILLS: true,
      STAT_CALCULATOR: gunCalcNames.drone,
    }
  }, {
    POSITION: [4, 3, 0.35, 11, 0, 0, 0]
  }]
}, 2, "Dopeseer", 90)
Class.znpAR_doubleFlankTwin = makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 0, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin]),
                TYPE: "bullet",
            },
        },
    ],
}, 2, "Double Flank Twin")
Class.znpAR_doubleGunner = makeMulti('gunner', 2)
Class.znpAR_doubleHelix = makeMulti('helix', 2)
Class.znpAR_encircler = {
    PARENT: "genericTank",
    LABEL: "Encircler",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    GUNS: [
    	{
        	POSITION: [21, 8, 1, 0, 0, 0, 0],
        	PROPERTIES: {
            	SHOOT_SETTINGS: combineStats([g.basic]),
            	TYPE: "bullet",
        	},
    	},
        {
            POSITION: [15, 9, 1.4, 0, 0, 0, 0],
        },
        {
            POSITION: [3, 13, 1.3, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.machineGun, {reload: 0.625, size: 0.625, spray: 0.75}]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
Class.znpAR_enforcer = {
    PARENT: "genericTank",
    LABEL: "Enforcer",
    DANGER: 7,
    BODY: {
        SPEED: 0.85 * base.SPEED,
        FOV: 1.4 * base.FOV
    },
    GUNS: [
        {
            POSITION: [23, 12, 1, 0, 0, 0, 0]
        },
        {
            POSITION: [27, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, g.rifle]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [5, 7, -1.4, 8, 0, 0, 0]
        }
    ]
}
Class.znpAR_equalizer = {
    PARENT: "genericTank",
    LABEL: "Equalizer",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [12, 3.5, 1, 0, 7.25, 0, 0],
        },
        {
            POSITION: [2, 4, 1.5, 12, 7.25, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "trap"
            }
        },
        {
            POSITION: [12, 3.5, 1, 0, -7.25, 0, 0],
        },
        {
            POSITION: [2, 4, 1.5, 12, -7.25, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "trap"
            }
        },
        {
            POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
        },
        {
            POSITION: [2, 4, 1.5, 16, 3.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "trap"
            }
        },
        {
            POSITION: [16, 3.5, 1, 0, -3.75, 0, 0],
        },
        {
            POSITION: [2, 4, 1.5, 16, -3.75, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "trap"
            }
        }
    ]
}
Class.znpAR_expeller = {
    PARENT: "genericTank",
    LABEL: "Expeller",
    DANGER: 7,
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: [14, 8, 1.5, 0, 5.75, 5, 0],
        },
        {
            POSITION: [3.5, 12, 1.3, 14, 5.75, 5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.machineGun, {reload: 0.625, size: 0.625, spray: 0.75}]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [14, 8, 1.5, 0, -5.75, -5, 0.5],
        },
        {
            POSITION: [3.5, 12, 1.3, 14, -5.75, -5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.machineGun, {reload: 0.625, size: 0.625, spray: 0.75}]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ]
}
Class.znpAR_faucet = {
    PARENT: "genericTank",
    LABEL: "Faucet",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 1.5, 25, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -1.5, -25, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [23, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.lowPower, g.pelleter, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.znpAR_foamer = {
    PARENT: "genericTank",
    LABEL: "Foamer",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [25, 9, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.lowPower, g.pelleter, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [14, 12, 1.6, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { reload: 0.375, recoil: 0.8, shudder: 1.2, size: 0.625, health: 0.95, damage: 0.9, maxSpeed: 0.8, spray: 1.3 }]),
                TYPE: "bullet",
            },
        }
    ]
}
Class.znpAR_foctillery = {
    PARENT: "genericTank",
    LABEL: "Foctillery",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [17, 3, 1, 0, -7, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 3, 1, 0, 7, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
    ],
}
Class.znpAR_foreman = makeMulti({
  PARENT: "genericTank",
  DANGER: 7,
  STAT_NAMES: statnames.drone,
  BODY: {
    FOV: base.FOV * 1.1
  },
  GUNS: [{
    POSITION: [14, 14, 1.3, 0, 0, 0, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, { size: 1.35, health: 1.75, speed: 1.125 }]),
      TYPE: "drone",
      AUTOFIRE: true,
      SYNCS_SKILLS: true,
      STAT_CALCULATOR: gunCalcNames.drone,
      MAX_CHILDREN: 3
    }
  }]
}, 2, "Foreman", 90)
Class.znpAR_forger = {
    PARENT: "genericTank",
    LABEL: "Forger",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [17, 3, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 3, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [18, 12, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 12, 1.1, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
                TYPE: "setTrap",
                STAT_CALCULATOR: gunCalcNames.block,
            },
        },
    ],
}
Class.znpAR_foundry = {
    PARENT: "genericTank",
    LABEL: "Foundry",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: 1.1,
    },
    GUNS: [
        {
            POSITION: [4.5, 15, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [1, 17, 1, 15, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 3,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory, { reload: 1.2, size: 1.35, health: 1.75, speed: 1.125 }]),
                TYPE: "minion",
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [11.5, 17, 1, 0, 0, 0, 0],
        },
    ],
}
Class.znpAR_frother = {
    PARENT: "genericTank",
    LABEL: "Frother",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    GUNS: [
    	{
        	POSITION: [3, 7, 1.3, 18, 0, 0, 0],
        	PROPERTIES: {
            	SHOOT_SETTINGS: combineStats([g.trap, g.machineGun, { health: 0.6, damage: 0.6, pen: 0.8, maxSpeed: 0.7, density: 0.3, size: 0.4 }]),
            	TYPE: "trap"
        	},
    	},
        {
            POSITION: [15, 9, 1.4, 0, 0, 0, 0]
        },
        {
            POSITION: [3, 13, 1.3, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.machineGun, {reload: 0.625, size: 0.625, spray: 0.75}]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            }
        }
    ]
}
Class.znpAR_hangar = {
    PARENT: "genericTank",
    LABEL: "Hangar",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            POSITION: [8, 7.5, 0.6, 3.5, 5.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [8, 7.5, 0.6, 3.5, -5.75, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [1, 12, 1, 15, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 4,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                TYPE: "minion",
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [11.5, 12, 1, 0, 0, 0, 0],
        },
    ],
}
Class.znpAR_honchodrive = {
  PARENT: "genericTank",
  LABEL: "Honchodrive",
  DANGER: 7,
  STAT_NAMES: statnames.drone,
  BODY: {
    FOV: base.FOV * 1.1
  },
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "overdriveDeco",
        },
    ],
  GUNS: [{
    POSITION: [13, 13, 1.4, 0, 0, 0, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, { size: 1.35, health: 1.75, speed: 1.125 }]),
      TYPE: "turretedDrone",
      AUTOFIRE: true,
      SYNCS_SKILLS: true,
      STAT_CALCULATOR: gunCalcNames.drone,
      MAX_CHILDREN: 3
    }
  }]
}
Class.znpAR_hurler = {
    PARENT: "genericTank",
    LABEL: "Hurler",
    DANGER: 6,
    BODY: {
        FOV: base.FOV * 1.1,
    },
    GUNS: [
        {
            POSITION: [10, 12, 1, 9, 0, 0, 0],
        },
        {
            POSITION: [17, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.artillery, g.artillery]),
                TYPE: "minimissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
}
Class.znpAR_hutch = {
    PARENT: "genericTank",
    LABEL: "Hutch",
    STAT_NAMES: statnames.mixed,
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 5.5, 5, 0],
        	PROPERTIES: {
            	SHOOT_SETTINGS: combineStats([g.basic]),
            	TYPE: "bullet",
        	},
        },
        {
            POSITION: [3, 9, 1.5, 14, 5.5, 5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, -5, 0.5],
        	PROPERTIES: {
            	SHOOT_SETTINGS: combineStats([g.basic]),
            	TYPE: "bullet",
        	},
        },
        {
            POSITION: [3, 9, 1.5, 14, -5.5, -5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
Class.znpAR_incarcerator = makePenGuard({
    PARENT: "genericTank",
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ]
}, "Incarcerator")
Class.znpAR_inception = {
    PARENT: "genericTank",
    LABEL: "Inception",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.1,
    },
    GUNS: [
        {
            POSITION: [10, 9, 1, 9, 0, 0, 0],
        },
        {
            POSITION: [17, 13, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery]),
                TYPE: "znpAR_autoMiniMissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
        {
            POSITION: [4, 8, 1, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.fake]),
                TYPE: "bullet",
            }
        }
    ]
}
Class.znpAR_issuer = {
  PARENT: "genericTank",
  LABEL: "Issuer",
  DANGER: 7,
  STAT_NAMES: statnames.drone,
  BODY: {
    SPEED: base.SPEED * 0.8,
    FOV: 1.1
  },
  GUNS: [{
    POSITION: [4.5, 10, 1, 10.5, 0, 0, 0]
  }, {
    POSITION: [1, 12, 1, 15, 0, 0, 0],
    PROPERTIES: {
      MAX_CHILDREN: 4,
      SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
      TYPE: "znpAR_fastMinion",
      STAT_CALCULATOR: gunCalcNames.drone,
      AUTOFIRE: true,
      SYNCS_SKILLS: true
    }
  }, {
    POSITION: [11.5, 12, 1, 0, 0, 0, 0]
  }, {
    POSITION: [3, 3, 0.35, 11, 0, 0, 0]
  }]
}
Class.znpAR_jalopy = {
    PARENT: "genericTank",
    LABEL: "Jalopy",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [16, 13, 1.65, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { reload: 0.375, recoil: 0.8, shudder: 1.2, size: 0.625, health: 0.95, damage: 0.9, maxSpeed: 0.8, spray: 1.3 }, { reload: 0.5, recoil: 0.5, size: 0.95, spray: 1.25 }]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.znpAR_junkie = {
  PARENT: "genericTank",
  LABEL: "Junkie",
  DANGER: 7,
  STAT_NAMES: statnames.drone,
  BODY: {
    FOV: base.FOV * 1.1
  },
  GUNS: [{
    POSITION: [13, 13, 1.4, 0, 0, 0, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, { size: 1.35, health: 1.75, speed: 1.125 }]),
      TYPE: "znpAR_fastDrone",
      AUTOFIRE: true,
      SYNCS_SKILLS: true,
      STAT_CALCULATOR: gunCalcNames.drone,
      MAX_CHILDREN: 3
    }
  }, {
    POSITION: [3, 3, 0.35, 11, 0, 0, 0]
  }]
}
Class.znpAR_laborer = {
    PARENT: "genericTank",
    LABEL: "Laborer",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: 1.1,
    },
    GUNS: [
        {
            POSITION: [3.5, 10, 1.2, 11.5, 0, 0, 0],
        },
        {
            POSITION: [1, 12, 1, 15, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 4,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                TYPE: ["minion", {INVISIBLE: [0.06, 0.03]}],
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [11.5, 11, -1.5, 0, 0, 0, 0],
        },
    ],
}
Class.znpAR_machineGuard = makeMachineGuard({
    PARENT: "genericTank",
    LABEL: "Machine",
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ]
})
Class.znpAR_machineMech = {
    PARENT: "genericTank",
    LABEL: "Machine Mech",
    DANGER: 7,
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: [15, 9, 1.4, 0, 0, 0, 0],
        },
        {
            POSITION: [3, 13, 1.3, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.machineGun, {reload: 0.625, size: 0.625, spray: 0.75}]),
                TYPE: "znpAR_autoTrap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [11.5, 13, 1.2, 0, 0, 0, 0]
        }
    ]
}
Class.znpAR_mechGuard = makeMechGuard({
    PARENT: "genericTank",
    LABEL: "Mech",
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ]
})
Class.znpAR_megaHunter = {
    PARENT: "genericTank",
    LABEL: "Mega Hunter",
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25
    },
    CONTROLLERS: ["zoom"],
    TOOLTIP: "Hold right click to zoom.",
    GUNS: [
        {
            POSITION: [24, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.sniper, g.hunter, g.hunterSecondary]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [21, 16, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.sniper, g.hunter]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.znpAR_megaSpawner = {
    PARENT: "genericTank",
    LABEL: "Mega Spawner",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: 1.1,
    },
    GUNS: [
        {
            POSITION: [4.5, 14, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [1, 16, 1, 15, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 4,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory, { size: 0.75 }]),
                TYPE: "znpAR_pounderMinion",
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [11.5, 16, 1, 0, 0, 0, 0],
        },
    ],
}
Class.znpAR_megaTrapper = {
    PARENT: "genericTank",
    LABEL: "Mega Trapper",
    DANGER: 7,
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: [15, 12, 1, 0, 0, 0, 0]
        },
        {
            POSITION: [5, 20, -0.625, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.pounder, g.destroyer]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            }
        }
    ]
}
Class.znpAR_mingler = makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [15, 3.5, 1, 0, 0, 30, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, 90, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 8, 1, 0, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ]
}, 3, "Mingler")
Class.znpAR_mosey = {
    PARENT: "genericTank",
    LABEL: "Mosey",
    DANGER: 7,
    FACING_TYPE: "locksFacing",
    STAT_NAMES: statnames.swarm,
    BODY: {
        FOV: 1.2 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "znpAR_fastSwarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "znpAR_fastSwarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },{
    POSITION: [8, 3, 0.35, 7, -4, 0, 0]
  }, {
    POSITION: [8, 3, 0.35, 7, 4, 0, 0]
  },
    ], 
}
Class.znpAR_operator = {
    PARENT: "genericTank",
    LABEL: "Operator",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [21, 8, 1, 0, 0, 0, 0],
        	PROPERTIES: {
            	SHOOT_SETTINGS: combineStats([g.basic]),
            	TYPE: "bullet",
        	},
        },
        {
            POSITION: [3, 8, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "znpAR_autoTrap",
                STAT_CALCULATOR: gunCalcNames.trap
            }
        },
        {
            POSITION: [12, 11, 1, 0, 0, 0, 0]
        }
    ]
}
Class.znpAR_peashooter = makeSwarming('trapGuard', "Peashooter")
Class.znpAR_pentaseer = {
    PARENT: "genericTank",
    LABEL: "Pentaseer",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.9 * base.SPEED,
    },
    SHAPE: 5,
    MAX_CHILDREN: 14,
    GUNS: [
        {
            POSITION: [5.25, 12, 1.1, 8, 0, 36, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "demonchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
            },
        },
        {
            POSITION: [5.25, 12, 1.1, 8, 0, -36, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "demonchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
            },
        },
    ],
}
Class.znpAR_pitcher = {
    PARENT: "genericTank",
    LABEL: "Pitcher",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.1,
    },
    GUNS: [
        {
            POSITION: [10, 9, 1, 9, 0, 0, 0],
        },
        {
            POSITION: [17, 13, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery]),
                TYPE: "znpAR_pitcherMissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
        {
            POSITION: [14, 5, 1, 0, 4, 0, 0],
        },
        {
            POSITION: [14, 5, 1, 0, -4, 0, 0],
        },
    ],
}
Class.znpAR_prober = {
    PARENT: "genericTank",
    LABEL: "Prober",
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25
    },
    GUNS: [
        {
            POSITION: [20, 12, 1, 0, 0, 0, 0]
        },
        {
            POSITION: [26, 5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.rifle]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [24, 7, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.rifle]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.znpAR_productionist = {
    PARENT: "genericTank",
    LABEL: "Productionist",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.75,
        FOV: 1.1,
    },
    GUNS: [
        {
            POSITION: [4, 6, 1, 10, 5, 0, 0],
        },
        {
            POSITION: [1, 8, 1, 15, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.babyfactory, { size: 1.2, reload: 1.5 }]),
                TYPE: "tinyMinion",
                STAT_CALCULATOR: gunCalcNames.drone,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [11, 10, 0.8, 0, 5, 0, 0],
        },
        {
            POSITION: [4, 6, 1, 10, -5, 0, 0.5],
        },
        {
            POSITION: [1, 8, 1, 15, -5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.babyfactory, { size: 1.2, reload: 1.5 }]),
                TYPE: "tinyMinion",
                STAT_CALCULATOR: gunCalcNames.drone,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [11, 10, 0.8, 0, -5, 0, 0.5],
        },
    ],
}
Class.znpAR_projector = {
    PARENT: "genericTank",
    LABEL: "Projector",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.1,
    },
    GUNS: [
        {
            POSITION: [7, 12, 1.2, 10, 0, 0, 0],
        },
        {
            POSITION: [14, 14, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [10, 9, 1.1, 9, 0, 0, 0],
        },
        {
            POSITION: [17, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, { size: 1.3 }]),
                TYPE: "znpAR_projectorMissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
}
Class.znpAR_quadAngle = {
    PARENT: "genericTank",
    LABEL: "Quad-Angle",
    BODY: {
        HEALTH: 0.8 * base.HEALTH,
        SHIELD: 0.8 * base.SHIELD,
        DENSITY: 0.6 * base.DENSITY,
    },
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [9, 8, 0, 45, 190, 0],
            TYPE: "autoTankGun",
        },
        {
            POSITION: [9, 8, 0, -45, 190, 0],
            TYPE: "autoTankGun",
        },
    ],
    GUNS: [
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
}
Class.znpAR_queller = {
    PARENT: "genericTank",
    LABEL: "Queller",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [17, 3, 1, 0, -7, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 3, 1, 0, 7, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [19, 14, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
    ],
}
Class.znpAR_railgun = {
  PARENT: "genericTank",
  LABEL: "Railgun",
  DANGER: 7,
  BODY: {
    SPEED: base.SPEED * 0.85,
    FOV: base.FOV * 1.3
  },
  GUNS: [
    {
      POSITION: [20, 8, 1, 0, 0, 0, 0]
    },
    {
      POSITION: [24, 5, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, { reload: 5, size: 0.9, health: 0.9, damage: 1.35, pen: 1.25, speed: 1.5, maxSpeed: 1.04, density: 3.5 }]),
        TYPE: "bullet"
      },
    },
    {
      POSITION: [4, 8, -1.5, 8, 0, 0, 0]
    }
  ]
}
Class.znpAR_rimfire = {
    PARENT: "genericTank",
    LABEL: "Rimfire",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [12, 3.5, 1, 0, 7, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [12, 3.5, 1, 0, -7, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 2, 1, 0, -2.5, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 2, 1, 0, 2.5, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 10, 1, 0, 0, 0, 0],
        },
    ],
}
Class.znpAR_slinker = {
    PARENT: "genericTank",
    LABEL: "Slinker",
    DANGER: 7,
    INVISIBLE: [0.08, 0.03],
    TOOLTIP: "Stay still to turn invisible.",
    GUNS: [
        {
            POSITION: [21, 14, -1.2, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.znpAR_sniper3 = {
  PARENT: "genericTank",
  LABEL: "Sniper-3",
  DANGER: 7,
  BODY: {
    SPEED: 0.8 * base.SPEED,
    FOV: 1.25 * base.FOV,
  },
  FACING_TYPE: "autospin",
  TURRETS: [
    {
      POSITION: [13, 8, 0, 0, 170, 0],
      TYPE: "znpAR_sniper3Gun",
    },
    {
      POSITION: [13, 8, 0, 120, 170, 0],
      TYPE: "znpAR_sniper3Gun",
    },
    {
      POSITION: [13, 8, 0, 240, 170, 0],
      TYPE: "znpAR_sniper3Gun",
    },
  ],
}
Class.znpAR_spawnerdrive = {
  PARENT: "genericTank",
  LABEL: "Spawnerdrive",
  DANGER: 7,
  STAT_NAMES: statnames.drone,
  BODY: {
    SPEED: base.SPEED * 0.8,
    FOV: 1.1
  },
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "overdriveDeco",
        },
    ],
  GUNS: [{
    POSITION: [4.5, 10, 1, 10.5, 0, 0, 0]
  }, {
    POSITION: [1, 12, 1, 15, 0, 0, 0],
    PROPERTIES: {
      MAX_CHILDREN: 4,
      SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
      TYPE: "znpAR_turretedMinion",
      STAT_CALCULATOR: gunCalcNames.drone,
      AUTOFIRE: true,
      SYNCS_SKILLS: true
    }
  }, {
    POSITION: [11.5, 12, 1, 0, 0, 0, 0]
  }]
}
Class.znpAR_splitShot = {
    PARENT: "genericTank",
    LABEL: "Split Shot",
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.9
    },
    GUNS: [
        {
            POSITION: [19, 8, 1, 0, -2, -17.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 8, 1, 0, 2, 17.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 4, 1, 0, -0.5, 17.5, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.pelleter, g.artillery]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 4, 1, 0, 0.5, -17.5, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.pelleter, g.artillery]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.znpAR_stall = {
    PARENT: "genericTank",
    LABEL: "Stall",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 1.1 * base.FOV
    },
    GUNS: [
    	{
        	POSITION: [23, 8, 1, 0, 0, 0, 0],
        	PROPERTIES: {
            	SHOOT_SETTINGS: combineStats([g.basic]),
            	TYPE: "bullet",
        	},
    	},
        {
            POSITION: [18, 12, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 12, 1.1, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
                TYPE: "setTrap",
                STAT_CALCULATOR: gunCalcNames.block
            }
        }
    ]
}
Class.znpAR_stormer = {
    PARENT: "genericTank",
    LABEL: "Stormer",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [30, 2, 1, 0, -2.5, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [30, 2, 1, 0, 2.5, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [24, 10, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet"
            }
        }
    ],
}
Class.znpAR_subverter = {
    PARENT: "genericTank",
    LABEL: "Subverter",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.2
    },
    GUNS: [
        {
            POSITION: [21, 14, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.minigun]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 14, 1, 0, 0, 0, 1 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.minigun]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [17, 14, 1, 0, 0, 0, 2 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.minigun]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.znpAR_triHealer = makeMulti({
    PARENT: "genericTank",
    STAT_NAMES: statnames.heal,
    TURRETS: [
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol"
        }
    ],
    GUNS: [
        {
            POSITION: [8, 9, -0.5, 12.5, 0, 0, 0]
        },
        {
            POSITION: [18, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.healer]),
                TYPE: "healerBullet"
            }
        }
    ]
}, 3, "Tri-Healer")
Class.znpAR_triMachine = makeMulti('znpAR_machineTrapper', 3, "Tri-Machine")
Class.znpAR_triMech = makeMulti('znpAR_mech', 3, "Tri-Mech")
Class.znpAR_triPen = makeMulti('znpAR_pen', 3, "Tri-Pen")
Class.znpAR_triTrapGuard = makeTriGuard({
    PARENT: "genericTank",
    LABEL: "Trap",
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ]
})
Class.znpAR_underdrive = makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.9 * base.SPEED,
    },
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "overdriveDeco",
        },
    ],
    SHAPE: 4,
    MAX_CHILDREN: 14,
    GUNS: [
        {
            POSITION: [5.25, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "znpAR_turretedSunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
            }
        }
    ]
}, 2, "Underdrive", 90)
Class.znpAR_volley = {
    PARENT: "genericTank",
    LABEL: "Volley",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [12, 5, 1, 0, 7.25, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.twin, g.gunner, { reload: 0.75, speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [12, 5, 1, 0, -7.25, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.twin, g.gunner, { reload: 0.75, speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 5, 1, 0, 3.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.twin, g.gunner, { reload: 0.75, speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 5, 1, 0, -3.75, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.twin, g.gunner, { reload: 0.75, speed: 1.2 }]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.znpAR_waarrk = {
    PARENT: "genericTank",
    LABEL: "Waarrk",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [16, 8, 1, 0, -2, -17.5, 0.5],
        },
        {
            POSITION: [3.5, 9, 1.6, 16, -2, -17.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.tripleShot]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 2, 17.5, 0.5],
        },
        {
            POSITION: [3.5, 9, 1.6, 16, 2, 17.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.tripleShot]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [3.5, 9, 1.6, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.tripleShot]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }
    ]
}
Class.znpAR_warkwark = makeMulti({
    PARENT: "genericTank",
    STAT_NAMES: statnames.mixed,
    DANGER: 7,
    GUNS: [
        {
            POSITION: [14, 8, 1, 0, 5.5, 5, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, 5.5, 5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.doubleTwin]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [14, 8, 1, 0, -5.5, -5, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, -5.5, -5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.doubleTwin]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}, 2, "Warkwark")
Class.znpAR_widget = {
    PARENT: "genericTank",
    LABEL: "Widget",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.2
    },
    GUNS: [
        {
            POSITION: [21, 8, 1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.minigun]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 8, 1.4, 0, 0, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.minigun]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [17, 8, 1.4, 0, 0, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.minigun]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.znpAR_zipper = {
    PARENT: "genericTank",
    LABEL: "Zipper",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.2
    },
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 1.5, 25, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -1.5, -25, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [21, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 0, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 8, 1, 0, 0, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet",
            },
        },
    ],
}

// Tier 3 bird tanks
Class.znpAR_defect = makeBird('tripleShot', "Defect")
Class.znpAR_cockatiel = makeBird('znpAR_pen', "Cockatiel")

// Tier 3 hybrid tanks
Class.znpAR_coalesce = makeHybrid('znpAR_wark', "Coalesce")
Class.znpAR_cobbler = makeHybrid('znpAR_mech', "Cobbler")
Class.znpAR_current = makeHybrid('volute', "Current")
Class.znpAR_deviation = makeHybrid('znpAR_machineTrapper', "Deviation")
Class.znpAR_fashioner = makeHybrid('builder', "Fashioner")
Class.znpAR_force = makeHybrid('artillery', "Force")
Class.znpAR_heaver = makeHybrid('launcher', "Heaver")
Class.znpAR_hitman = makeHybrid('assassin', "Hitman")
Class.znpAR_integrator = makeHybrid('triAngle', "Integrator")
Class.znpAR_interner = makeHybrid('znpAR_pen', "Interner")
Class.znpAR_polluter = makeAuto('znpAR_diesel', "Polluter")
Class.znpAR_shower = makeHybrid('sprayer', "Shower")
Class.znpAR_spiral = makeHybrid('helix', "Spiral")

// Tier 3 auto tanks
Class.znpAR_autoAuto3 = makeAuto('auto3')
Class.znpAR_autoArtillery = makeAuto('artillery')
Class.znpAR_autoDestroyer = makeAuto('destroyer')
Class.znpAR_autoDiesel = makeAuto('znpAR_diesel')
Class.znpAR_autoDirectordrive = makeAuto({
    PARENT: "genericTank",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1,
    },
    GUNS: [
        {
            POSITION: [6, 11, 1.3, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone]),
                TYPE: "turretedDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                MAX_CHILDREN: 6,
            },
        },
    ],
}, "Auto-Directordrive", { type: "znpAR_driveAutoTurret", size: 9 });
Class.znpAR_autoDoper = makeAuto('znpAR_doper')
Class.znpAR_autoHelix = makeAuto('helix')
Class.znpAR_autoHexaTank = makeAuto('hexaTank')
Class.znpAR_autoHoncho = makeAuto('znpAR_honcho')
Class.znpAR_autoHunter = makeAuto('hunter')
Class.znpAR_autoLauncher = makeAuto('launcher')
Class.znpAR_autoMachineTrapper = makeAuto('znpAR_machineTrapper')
Class.znpAR_autoMech = makeAuto('znpAR_mech')
Class.znpAR_autoMinigun = makeAuto('minigun')
Class.znpAR_autoPen = makeAuto('znpAR_pen')
Class.znpAR_autoRifle = makeAuto('rifle')
Class.znpAR_autoSprayer = makeAuto('sprayer')
Class.znpAR_autoTrapGuard = makeAuto('trapGuard')
Class.znpAR_autoTripleShot = makeAuto('tripleShot')
Class.znpAR_autoUnderseer = makeAuto('underseer')
Class.znpAR_autoVolute = makeAuto('volute')
Class.znpAR_autoWark = makeAuto('znpAR_wark')

// Tier 4 tanks
Class.znpAR_bentTriple = makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [19, 8, 1, 0, -2, -17.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.doubleTwin]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 8, 1, 0, 2, 17.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.doubleTwin]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.doubleTwin]),
                TYPE: "bullet"
            }
        }
    ]
}, 3, "Bent Triple")
Class.znpAR_birdOfPrey = makeFighter('phoenix', "Bird of Prey")
Class.znpAR_blitz = makeFighter('bomber', "Blitz")
Class.znpAR_boxer = {
    PARENT: "genericTank",
    LABEL: "Boxer",
    DANGER: 7,
    BODY: {
        DENSITY: 0.6 * base.DENSITY,
    },
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront, { recoil: 4 }]),
                TYPE: "bullet",
                LABEL: "Front",
            },
        },
        {
            POSITION: [16, 12, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.flankGuard, g.triAngle, g.triAngleFront]),
                TYPE: "bullet",
                LABEL: "Side",
            },
        },
        {
            POSITION: [16, 12, 1, 0, 0, -90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.flankGuard, g.triAngle, g.triAngleFront]),
                TYPE: "bullet",
                LABEL: "Side",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
}
Class.znpAR_brawler = makeFighter('booster', "Brawler")
Class.znpAR_cleft = makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [19, 8, 1, 0, 5.5, 25, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 8, 1, 0, -5.5, -25, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        }
    ]
}, 2, "Cleft")
Class.znpAR_cockatoo = makeFighter('znpAR_cockatiel', "Cockatoo")
Class.znpAR_coordinator = {
    PARENT: "genericTank",
    LABEL: "Coordinator",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: [6, 11, 1.3, 9, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.single]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                MAX_CHILDREN: 6,
                WAIT_TO_CYCLE: true
            }
        },
        {
            POSITION: [6.5, 13, -1.3, 5.5, 0, 0, 0]
        }
    ]
}
Class.znpAR_griffin = makeFighter('eagle', "Griffin")
Class.znpAR_hewnTriple = {
    PARENT: "genericTank",
    LABEL: "Hewn Triple",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [19, 8, 1, 0, 5.5, 25, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 8, 1, 0, -5.5, -25, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.hewnDouble]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 240, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.hewnDouble]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.hewnDouble]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 120, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.hewnDouble]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.znpAR_mangle = makeFighter('znpAR_defect', "Mangle")
Class.znpAR_pug = makeHybrid('fighter', "Pug")
Class.znpAR_quadTwin = makeMulti({
    PARENT: "genericTank",
    LABEL: "Twin",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.doubleTwin]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.doubleTwin]),
                TYPE: "bullet"
            }
        }
    ]
}, 4)
Class.znpAR_shocker = makeFighter('vulture', "Shocker")
Class.znpAR_skewnDouble = {
    PARENT: "genericTank",
    LABEL: "Skewn Double",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [16, 8, 1, 0, 5.5, 225, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 8, 1, 0, -5.5, -225, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 8, 1, 0, 5.5, 205, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 8, 1, 0, -5.5, -205, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.hewnDouble]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.hewnDouble]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.znpAR_sparrow = makeFighter('falcon', "Sparrow")
Class.znpAR_strider = makeSurfer('fighter', "Strider")
Class.znpAR_ternion = makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [19, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.single]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0]
        }
    ]
}, 3, "Ternion")
Class.znpAR_triFrother = makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [3, 7, 1.3, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.machineGun, { health: 0.6, damage: 0.6, pen: 0.8, maxSpeed: 0.7, density: 0.3, size: 0.4 }, g.flankGuard]),
                TYPE: "trap"
            },
        },
        {
            POSITION: [15, 9, 1.4, 0, 0, 0, 0]
        },
        {
            POSITION: [3, 13, 1.3, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.machineGun, {reload: 0.625, size: 0.625, spray: 0.75}, g.flankGuard]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            }
        }
    ]
}, 3, "Tri-Frother")
Class.znpAR_tripleFlankTwin = makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 0, 60, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin]),
                TYPE: "bullet",
            },
        },
    ],
}, 3, "Triple Flank Twin")
Class.znpAR_tripleGunner = makeMulti('gunner', 3)
Class.znpAR_tripleHelix = makeMulti('helix', 3)
Class.znpAR_warkwarkwark = makeMulti({
    PARENT: "genericTank",
    STAT_NAMES: statnames.mixed,
    DANGER: 7,
    GUNS: [
        {
            POSITION: [14, 8, 1, 0, 5.5, 5, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, 5.5, 5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.doubleTwin]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [14, 8, 1, 0, -5.5, -5, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, -5.5, -5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.doubleTwin]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}, 2, "Warkwarkwark")

// Tier 4 hybrid tanks
Class.znpAR_abberation = makeHybrid('znpAR_frother', "Abberation")
Class.znpAR_gusher = makeHybrid('znpAR_foamer', "Gusher")
Class.znpAR_hose = makeHybrid('redistributor', "Hose")
Class.znpAR_pressureWasher = makeHybrid('focal', "Pressure Washer")
Class.znpAR_raincloud = makeHybrid('znpAR_faucet', "Raincloud")
Class.znpAR_sprinkler = makeHybrid('atomizer', "Sprinkler")

// Tier 4 over tanks
Class.znpAR_oversprayer = makeOver('sprayer')

// Tier 4 bird tanks
Class.znpAR_aethon = makeBird('znpAR_foamer', "Aethon")
Class.znpAR_alicanto = makeBird('focal', "Alicanto")
Class.znpAR_avian = makeBird('single', "Avian")
Class.znpAR_erne = makeBird('artillery', "Erne")
Class.znpAR_harrier = makeBird('destroyer', "Harrier")
Class.znpAR_nymph = makeBird('redistributor', "Nymph")
Class.znpAR_owl = makeBird('stalker', "Owl")
Class.znpAR_pamola = makeBird('znpAR_frother', "Pamola")
Class.znpAR_peregrine = makeBird('ranger', "Peregrine")
Class.znpAR_seriemas = makeBird('launcher', "Seriemas")
Class.znpAR_simurgh = makeBird('znpAR_faucet', "Simurgh")
Class.znpAR_sirin = makeBird('znpAR_stormer', "Sirin")
Class.znpAR_ziz = makeBird('atomizer', "Ziz")

// Tier 4 superbird tanks
Class.znpAR_firebird = makeSuperbird('sprayer', "Firebird")

// Tier 4 auto tanks
Class.znpAR_auto = makeAuto('znpAR_placeholder')
Class.znpAR_autoAtomizer = makeAuto('atomizer')
Class.znpAR_autoBooster = makeAuto('booster')
Class.znpAR_autoBentDouble = makeAuto('bentDouble')
Class.znpAR_autoDoubleFlankTwin = makeAuto('znpAR_doubleFlankTwin')
Class.znpAR_autoDoubleGunner = makeAuto('znpAR_doubleGunner')
Class.znpAR_autoDoubleHelix = makeAuto('znpAR_doubleHelix')
Class.znpAR_autoEagle = makeAuto('eagle')
Class.znpAR_autoFaucet = makeAuto('znpAR_faucet')
Class.znpAR_autoFighter = makeAuto('fighter')
Class.znpAR_autoFoamer = makeAuto('znpAR_foamer')
Class.znpAR_autoFocal = makeAuto('focal')
Class.znpAR_autoFrother = makeAuto('znpAR_frother')
Class.znpAR_autoHewnDouble = makeAuto('hewnDouble')
Class.znpAR_autoPhoenix = makeAuto('phoenix')
Class.znpAR_autoRedistributor = makeAuto('redistributor')
Class.znpAR_autoShower = makeAuto('znpAR_shower')
Class.znpAR_autoStormer = makeAuto('znpAR_stormer')
Class.znpAR_autoTripleTwin = makeAuto('tripleTwin')
Class.znpAR_autoWarkwark = makeAuto('znpAR_warkwark')

// Tier 4 mega auto tanks
Class.znpAR_megaAutoDouble = makeMegaAuto('doubleTwin', "Mega Auto-Double")
Class.znpAR_megaAutoSprayer = makeMegaAuto('sprayer')

// Tier 4 triple auto tanks
Class.znpAR_tripleAutoDouble = makeTripleAuto('doubleTwin', "Triple Auto-Double")
Class.znpAR_tripleAutoSprayer = makeTripleAuto('sprayer')


// Upgrade paths
Class.basic.UPGRADES_TIER_3 = ["single"]
    Class.single.UPGRADES_TIER_3 = ["znpAR_placeholder", "znpAR_placeholder", "znpAR_placeholder", "znpAR_ternion", "znpAR_placeholder", "znpAR_coordinator", "znpAR_placeholder", "znpAR_placeholder", "znpAR_placeholder", "znpAR_placeholder", "znpAR_placeholder", "znpAR_placeholder"]
    Class.twin.UPGRADES_TIER_2.push("znpAR_wark")
        Class.twin.UPGRADES_TIER_3.splice(1, 1) // remove bulwark
        Class.doubleTwin.UPGRADES_TIER_3.push("znpAR_doubleFlankTwin", "znpAR_doubleGunner", "znpAR_doubleHelix", "znpAR_warkwark")
            Class.tripleTwin.UPGRADES_TIER_3 = ["znpAR_quadTwin", "znpAR_autoTripleTwin", "znpAR_bentTriple", "znpAR_hewnTriple", "znpAR_tripleFlankTwin", "znpAR_tripleGunner", "znpAR_warkwarkwark", "znpAR_tripleHelix"]
            Class.autoDouble.UPGRADES_TIER_3 = ["znpAR_megaAutoDouble", "znpAR_tripleAutoDouble", "znpAR_autoTripleTwin", "znpAR_autoHewnDouble", "znpAR_autoBentDouble", "znpAR_autoDoubleFlankTwin", "znpAR_autoDoubleGunner", "znpAR_autoWarkwark", "znpAR_autoDoubleHelix"]
        Class.tripleShot.UPGRADES_TIER_3.push("znpAR_splitShot", "znpAR_autoTripleShot", "znpAR_bentGunner", "znpAR_bentMinigun", "znpAR_defect", "znpAR_waarrk")
    Class.sniper.UPGRADES_TIER_3.push("znpAR_railgun")
        Class.assassin.UPGRADES_TIER_3.splice(4, 1) // remove single
        Class.assassin.UPGRADES_TIER_3.push("znpAR_buttbuttin", "znpAR_hitman", "znpAR_sniper3", "znpAR_enforcer", "znpAR_courser")
        Class.hunter.UPGRADES_TIER_3.push("znpAR_autoHunter", "znpAR_megaHunter", "znpAR_prober", "znpAR_courser")
        Class.rifle.UPGRADES_TIER_3.push("znpAR_autoRifle", "znpAR_enforcer", "znpAR_prober")
    Class.machineGun.UPGRADES_TIER_2.push("znpAR_diesel", "znpAR_machineTrapper")
        Class.minigun.UPGRADES_TIER_3.push("znpAR_subverter", "znpAR_zipper", "znpAR_bentMinigun", "znpAR_autoMinigun", "znpAR_widget")
        Class.gunner.UPGRADES_TIER_3.push("znpAR_battery", "znpAR_buttbuttin", "znpAR_blower", "znpAR_rimfire", "znpAR_volley", "znpAR_doubleGunner", "znpAR_bentGunner", "znpAR_equalizer")
        Class.sprayer.UPGRADES_TIER_3.push("znpAR_frother", "znpAR_foamer", "znpAR_faucet", "znpAR_shower", "znpAR_autoSprayer", "znpAR_stormer")
            Class.znpAR_autoSprayer.UPGRADES_TIER_3 = ["znpAR_megaAutoSprayer", "znpAR_tripleAutoSprayer", "znpAR_autoRedistributor", "znpAR_autoPhoenix", "znpAR_autoAtomizer", "znpAR_autoFocal", "znpAR_autoFrother", "znpAR_autoFoamer", "znpAR_autoFaucet", "znpAR_autoShower", "znpAR_autoStormer"]
        Class.znpAR_diesel.UPGRADES_TIER_3 = ["znpAR_jalopy", "machineGunner", "znpAR_dieselTrapper", "znpAR_polluter", "znpAR_autoDiesel", "znpAR_foamer"]
    Class.flankGuard.UPGRADES_TIER_3 = ["znpAR_ternion"]
        Class.hexaTank.UPGRADES_TIER_3.push("znpAR_deathStar", "znpAR_autoHexaTank", "znpAR_mingler", "znpAR_combo")
        Class.triAngle.UPGRADES_TIER_3.push("znpAR_cockatiel", "znpAR_integrator", "znpAR_defect", "znpAR_quadAngle")
        Class.auto3.UPGRADES_TIER_3.push("znpAR_sniper3", "znpAR_crowbar", "znpAR_autoAuto3", "znpAR_combo")
    Class.director.UPGRADES_TIER_2.push("znpAR_directordrive", "znpAR_honcho", "znpAR_doper")
        Class.director.UPGRADES_TIER_3.splice(1, 1) // remove big cheese
            Class.director.UPGRADES_TIER_3.push("znpAR_coordinator")
        Class.overseer.UPGRADES_TIER_3.splice(2, 1) // remove overgunner
        Class.overseer.UPGRADES_TIER_3.splice(1, 1) // remove overtrapper
        Class.overseer.UPGRADES_TIER_3.push("znpAR_captain", "znpAR_foreman", "znpAR_dopeseer")
        Class.cruiser.UPGRADES_TIER_3.push("znpAR_productionist", "znpAR_cruiserdrive", "znpAR_hangar", "znpAR_zipper", "znpAR_baltimore", "znpAR_mosey")
        Class.underseer.UPGRADES_TIER_3.push("znpAR_autoUnderseer", "znpAR_underdrive", "znpAR_pentaseer")
        Class.spawner.UPGRADES_TIER_3.push("znpAR_megaSpawner", "znpAR_productionist", "znpAR_spawnerdrive", "znpAR_captain", "znpAR_hangar", "znpAR_laborer", "znpAR_foundry", "znpAR_issuer")
        Class.znpAR_directordrive.UPGRADES_TIER_3 = ["znpAR_directorstorm", "overdrive", "znpAR_cruiserdrive", "znpAR_underdrive", "znpAR_spawnerdrive", "znpAR_autoDirectordrive", "znpAR_honchodrive", "znpAR_doperdrive"]
        Class.znpAR_honcho.UPGRADES_TIER_3 = ["znpAR_foreman", "znpAR_baltimore", "znpAR_foundry", "bigCheese", "znpAR_autoHoncho", "znpAR_honchodrive", "znpAR_junkie"]
        Class.znpAR_doper.UPGRADES_TIER_3 = ["znpAR_brisker", "znpAR_dopeseer", "znpAR_mosey", "znpAR_issuer", "znpAR_junkie", "znpAR_doperdrive", "znpAR_autoDoper"]
    Class.pounder.UPGRADES_TIER_3.push("znpAR_subverter")
        Class.destroyer.UPGRADES_TIER_3.push("znpAR_blower", "znpAR_megaTrapper", "znpAR_queller", "znpAR_autoDestroyer", "znpAR_hurler", "znpAR_slinker")
        Class.artillery.UPGRADES_TIER_3.push("znpAR_queller", "znpAR_forger", "znpAR_force", "znpAR_autoArtillery", "znpAR_foctillery", "znpAR_discharger", "znpAR_recharger")
        Class.launcher.UPGRADES_TIER_3.push("znpAR_pitcher", "znpAR_cluster", "znpAR_projector", "znpAR_heaver", "znpAR_autoLauncher", "znpAR_hurler", "znpAR_inception")
    Class.trapper.UPGRADES_TIER_2.push("znpAR_pen", "znpAR_mech", "znpAR_machineTrapper", "znpAR_wark")
        Class.trapper.UPGRADES_TIER_3.splice(0, 1) // remove barricade
        Class.trapper.UPGRADES_TIER_3.push("znpAR_megaTrapper")
        Class.builder.UPGRADES_TIER_3.push("znpAR_forger", "znpAR_stall", "znpAR_fashioner", "znpAR_charger")
        Class.triTrapper.UPGRADES_TIER_3.push("znpAR_triPen", "znpAR_triMech", "znpAR_triMachine", "znpAR_triTrapGuard")
        Class.trapGuard.UPGRADES_TIER_3.push("znpAR_peashooter", "znpAR_incarcerator", "znpAR_mechGuard", "znpAR_autoTrapGuard", "znpAR_machineGuard", "znpAR_triTrapGuard")
        Class.znpAR_pen.UPGRADES_TIER_3 = ["znpAR_stall", "znpAR_triPen", "znpAR_encircler", "znpAR_incarcerator", "znpAR_operator", "znpAR_cockatiel", "znpAR_hutch", "znpAR_interner", "znpAR_autoPen"]
        Class.znpAR_mech.UPGRADES_TIER_3 = ["engineer", "znpAR_triMech", "znpAR_machineMech", "znpAR_mechGuard", "znpAR_operator", "znpAR_cog", "znpAR_cobbler", "znpAR_autoMech"]
        Class.znpAR_machineTrapper.UPGRADES_TIER_3 = ["znpAR_dieselTrapper", "barricade", "znpAR_equalizer", "znpAR_machineGuard", "znpAR_encircler", "znpAR_machineMech", "znpAR_triMachine", "znpAR_expeller", "znpAR_autoMachineTrapper", "znpAR_deviation", "znpAR_frother"]
        Class.znpAR_wark.UPGRADES_TIER_3 = ["znpAR_warkwark", "znpAR_waarrk", "znpAR_equalizer", "hexaTrapper", "znpAR_hutch", "znpAR_cog", "znpAR_expeller", "bulwark", "znpAR_coalesce", "znpAR_autoWark"]
    // desmos
        Class.volute.UPGRADES_TIER_3.push("znpAR_recharger", "znpAR_current", "znpAR_autoVolute")
        Class.helix.UPGRADES_TIER_3.push("znpAR_doubleHelix", "znpAR_spiral", "znpAR_autoHelix")

// WIP Upgrade paths
Class.hewnDouble.UPGRADES_TIER_3 = [
    "znpAR_hewnTriple",
    "znpAR_autoHewnDouble",
    "znpAR_cleft",
    "znpAR_skewnDouble",
    "znpAR_placeholder",//"znpAR_hewnFlankDouble",
    "znpAR_placeholder",//"znpAR_hewnGunner",
    "znpAR_placeholder",//"znpAR_warkwawarkrk",
]
Class.znpAR_doubleHelix.UPGRADES_TIER_3 = [
    "znpAR_tripleHelix",
    "znpAR_autoDoubleHelix",
]


Class.redistributor.UPGRADES_TIER_3 = [
    "znpAR_placeholder",
    "znpAR_nymph",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_hose",
    "znpAR_placeholder",
    "znpAR_autoRedistributor",
    "znpAR_placeholder",
]
Class.phoenix.UPGRADES_TIER_3 = [
    "znpAR_firebird",
    "znpAR_birdOfPrey",
    "znpAR_nymph",
    "znpAR_ziz",
    "znpAR_alicanto",
    "znpAR_pamola",
    "znpAR_aethon",
    "znpAR_simurgh",
    "znpAR_autoPhoenix",
    "znpAR_sirin",
]
Class.atomizer.UPGRADES_TIER_3 = [
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_ziz",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_sprinkler",
    "znpAR_placeholder",
    "znpAR_autoAtomizer",
    "znpAR_placeholder",
]
Class.focal.UPGRADES_TIER_3 = [
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_alicanto",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_pressureWasher",
    "znpAR_placeholder",
    "znpAR_autoFocal",
    "znpAR_placeholder",
]
Class.znpAR_frother.UPGRADES_TIER_3 = [
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_triFrother",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_pamola",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_abberation",
    "znpAR_placeholder",
    "znpAR_autoFrother",
    "znpAR_placeholder",
]
Class.znpAR_foamer.UPGRADES_TIER_3 = [
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_aethon",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_gusher",
    "znpAR_autoFoamer",
    "znpAR_placeholder",
]
Class.znpAR_faucet.UPGRADES_TIER_3 = [
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_simurgh",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_raincloud",
    "znpAR_placeholder",
    "znpAR_autoFaucet",
    "znpAR_placeholder",
]
Class.znpAR_shower.UPGRADES_TIER_3 = [
    "znpAR_oversprayer",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_hose",
    "znpAR_sprinkler",
    "znpAR_pressureWasher",
    "znpAR_abberation",
    "znpAR_gusher",
    "znpAR_raincloud",
    "znpAR_autoShower",
    "znpAR_placeholder",
]
Class.znpAR_stormer.UPGRADES_TIER_3 = [
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_sirin",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_placeholder",
    "znpAR_autoStormer",
]

Class.smasher.UPGRADES_TIER_3.push(
    "znpAR_placeholder",//"znpAR_bonker",
    "znpAR_placeholder",//"znpAR_banger",
    "znpAR_placeholder",//"znpAR_drifter",
)

Class.healer.UPGRADES_TIER_3.splice(3, 1) // remove paramedic
Class.healer.UPGRADES_TIER_3.splice(2, 1) // remove surgeon
Class.healer.UPGRADES_TIER_3.splice(1, 1) // remove ambulance
Class.healer.UPGRADES_TIER_3.push(
    "znpAR_placeholder",//"znpAR_scientist",
    "znpAR_placeholder",//"znpAR_nurse",
    "znpAR_triHealer",
    "znpAR_placeholder",//"znpAR_analyzer",
    "znpAR_placeholder",//"znpAR_psychiatrist",
    "znpAR_placeholder",//"znpAR_soother",
)

// DEBUG
const addHealerToMain = false
if (addHealerToMain) {
Class.basic.UPGRADES_TIER_2.push("healer")
Class.twin.UPGRADES_TIER_3.push("znpAR_placeholder"/*"znpAR_nurse"*/)
Class.sniper.UPGRADES_TIER_3.push("medic")
Class.machineGun.UPGRADES_TIER_3 = ["znpAR_placeholder"/*"znpAR_psychiatrist"*/]
Class.flankGuard.UPGRADES_TIER_3.push("znpAR_triHealer")
Class.director.UPGRADES_TIER_3.push("znpAR_placeholder"/*"znpAR_soother"*/)
Class.pounder.UPGRADES_TIER_3.push("znpAR_placeholder"/*"znpAR_analyzer"*/)
Class.trapper.UPGRADES_TIER_3.push("znpAR_placeholder"/*"znpAR_scientist"*/)
//Class.smasher.UPGRADES_TIER_3.push("znpAR_placeholder"/*"znpAR_physician"*/)
//Class.single.UPGRADES_TIER_3.push("znpAR_placeholder"/*"znpAR_renovater"*/)
}
