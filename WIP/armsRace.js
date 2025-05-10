const { dereference, combineStats, makeDeco, makeAuto, makeBird, makeOver, addBackGunner, weaponArray } = require('../facilitators.js');
const { base, gunCalcNames, statnames, dfltskl, smshskl } = require('../constants.js');
const g = require('../gunvals.js');
Class.AR_placeholder = { LABEL: "PLACEHOLDER", COLOR: "black", UPGRADE_COLOR: "black"}

// YES I KNOW THE LINE COUNT IS RIDICULOUS I'LL IMPROVE IT LATER OK - zenphia
// return

/** MAIN VARIABLES **/
// Set this to false to disable desmos branch
const desmosAllowed = true;
//Set this to false to enable undertow
const noUndertow = true;

/** GUNVALS **/
g.diesel = { reload: 0.375, recoil: 0.8, shudder: 1.2, size: 0.625, health: 0.95, damage: 0.9, maxSpeed: 0.8, spray: 1.3 }

// Cannon Functions
const makeMulti = (type, count, name = -1, delayIncrement = 0) => {
    type = ensureIsClass(type);
    let greekNumbers = ',Double ,Triple ,Quad ,Penta ,Hexa ,Septa ,Octo ,Nona ,Deca ,Hendeca ,Dodeca ,Trideca ,Tetradeca ,Pentadeca ,Hexadeca ,Septadeca ,Octadeca ,Nonadeca ,Icosa ,Henicosa ,Doicosa ,Triaicosa ,Tetraicosa ,Pentaicosa ,Hexaicosa ,Septaicosa ,Octoicosa ,Nonaicosa ,Triaconta '.split(','),
        output = dereference(type),
        fraction = 360 / count;
    output.GUNS = weaponArray(type.GUNS, count, delayIncrement)
    output.LABEL = name === -1 ? (greekNumbers[count - 1] || (count + ' ')) + type.LABEL : name;
    return output;
}
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
                STAT_CALCULATOR: "swarm",
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 1, -90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: "swarm",
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
    let thrusterProperties = { SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster, { recoil: backRecoil }]), TYPE: "bullet", LABEL: "thruster" };
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
            STAT_CALCULATOR: "trap",
        },
    },{
        POSITION: [13, 8, 1, 0, 0, 90, 0],
        }, {
        POSITION: [4, 8, 1.7, 13, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: "trap",
            STAT_CALCULATOR: "trap",
        },
    },{
        POSITION: [13, 8, 1, 0, 0, 270, 0],
        }, {
        POSITION: [4, 8, 1.7, 13, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: "trap",
            STAT_CALCULATOR: "trap",
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
            STAT_CALCULATOR: "trap",
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
                TYPE: "AR_autoTrap",
                STAT_CALCULATOR: "trap"
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
                STAT_CALCULATOR: "trap",
            },
        }];
    output.GUNS = type.GUNS == null ? cannons : type.GUNS.concat(cannons);
    output.LABEL = name == -1 ? type.LABEL + " Guard" : name;
    return output;
}

// Spawner Functions
const makeSwarming = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = dereference(type);
    let spawner = {
        POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "autoswarm",
            STAT_CALCULATOR: "swarm",
        },
    };
    if (type.TURRETS != null) {
        output.TURRETS = type.TURRETS;
    }
    if (type.GUNS == null) {
        output.GUNS = [spawner];
    } else {
        output.GUNS = [...type.GUNS, spawner];
    }
    if (name == -1) {
        output.LABEL = "Swarming " + type.LABEL;
    } else {
        output.LABEL = name;
    }
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

//Variables for re-used guns
const gunnerGuns = [
    {
        POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
            TYPE: "bullet"
        }
    },
    {
        POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
            TYPE: "bullet"
        }
    },
    {
        POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
            TYPE: "bullet"
        }
    },
    {
        POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
            TYPE: "bullet"
        }
    },
]


// Missiles
Class.AR_autoMiniMissile = makeAuto('minimissile')
Class.AR_clusterMissile = {
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
                STAT_CALCULATOR: "thruster",
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
Class.AR_pitcherMissile = {
    PARENT: "minimissile",
    GUNS: [
        {
            POSITION: [14, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { recoil: 1.15 }, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
                STAT_CALCULATOR: "thruster"
            }
        },
        {
            POSITION: [14, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { recoil: 1.15 }, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
                STAT_CALCULATOR: "thruster"
            }
        }
    ]
}
Class.AR_projectorMissile = makeMulti('minimissile', 2, "Missile")

// Drones
Class.AR_fastDrone = makeFast('drone')
Class.AR_fasterDrone = makeFast('drone', 1.2)
Class.AR_fastestDrone = makeFast('drone', 1.4)
Class.AR_fastSwarm = makeFast('swarm')
Class.AR_fastMinion = makeFast('minion')
Class.AR_turretedFastDrone = makeAuto('AR_fastDrone', "Auto-Drone", {type: 'droneAutoTurret'})
Class.AR_swarmingDrone = makeAuto('drone', "Swarm Auto-Swarm", {type: 'AR_swarmDroneTurret'})
Class.AR_superSwarmingDrone = makeAuto('drone', "Swarm Auto-Swarm", {type: 'AR_superSwarmDroneTurret'})
Class.AR_turretedSwarm = makeAuto('swarm', "Auto-Swarm", {type: 'droneAutoTurret'})
Class.AR_turretedSunchip = makeAuto('sunchip', "Auto-Sunchip", {type: 'droneAutoTurret'})
Class.AR_turretedMinion = makeAuto('minion', "Auto-Minion", {type: 'droneAutoTurret'})
Class.AR_pounderMinion = {
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
Class.AR_autoTrap = makeAuto('trap')
Class.AR_chargerSetTrap = makeMulti({
	PARENT: "setTrap",
    INDEPENDENT: true,
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
            TYPE: "AR_chargerSetTrapDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [4, 4, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
    			SHOOT_ON_DEATH: true,
                STAT_CALCULATOR: "trap"
            }
        }
    ]
}, 5, "Set Trap")

// Decorations
Class.AR_directorstormDeco = makeMulti({
	SHAPE: 4,
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
        }
    ]
}, 2, "", 90)
Class.AR_cruiserdriveDeco = makeDeco(3.5);
Class.AR_chargerSetTrapDeco = makeDeco(5);
Class.AR_vortexDeco = makeMulti({
	SHAPE: 4,
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
        }
    ]
}, 4, "", 90)
Class.bangerBody = {
    LABEL: "",
    FACING_TYPE: ["spin", { speed: 0.1 }],
    COLOR: "black",
    SHAPE: -8,
    INDEPENDENT: true
}

// Turrets
Class.AR_sniper3Gun = {
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
Class.AR_crowbarGun = {
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
Class.AR_driveAutoTurret = {
	PARENT: "autoTurret",
	SHAPE: 4
}
Class.AR_swarmDroneTurret = makeMulti({
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
                STAT_CALCULATOR: "swarm",
            }
        }
    ]
}, 2)
Class.AR_superSwarmDroneTurret = makeMulti({
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
                STAT_CALCULATOR: "swarm",
            }
        }
    ]
}, 4)

// Tier 2 tanks
Class.AR_diesel = {
    PARENT: "genericTank",
    LABEL: "Diesel",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [14, 12, 1.6, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.diesel]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.AR_directordrive = {
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
                STAT_CALCULATOR: "drone",
                MAX_CHILDREN: 6,
            },
        },
    ],
}
Class.AR_doper = {
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
      			TYPE: "AR_fastDrone",
      			AUTOFIRE: true,
      			SYNCS_SKILLS: true,
      			STAT_CALCULATOR: "drone",
      			MAX_CHILDREN: 6
    		}
  		},
  		{
    		POSITION: [3, 3, 0.35, 11, 0, 0, 0]
  		}
  	]
}
Class.AR_honcho = {
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
      STAT_CALCULATOR: "drone",
      MAX_CHILDREN: 3
    }
  }]
}
Class.AR_machineTrapper = {
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
                STAT_CALCULATOR: "trap",
            },
        },
    ],
}
Class.AR_mech = {
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
                TYPE: "AR_autoTrap",
                STAT_CALCULATOR: "trap"
            }
        },
        {
            POSITION: [12, 11, 1, 0, 0, 0, 0]
        }
    ]
}
Class.AR_pen = {
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
            	STAT_CALCULATOR: "trap",
        	},
    	}
    ]
}
Class.AR_wark = {
    PARENT: "genericTank",
    LABEL: "Wark",
    STAT_NAMES: statnames.trap,
    DANGER: 6,
    GUNS: [
        {
            POSITION: [14, 8, 1, 0, 5.5, 7.5, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, 5.5, 7.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
        {
            POSITION: [14, 8, 1, 0, -5.5, -7.5, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, -5.5, -7.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
    ],
}

// Tier 3 tanks
Class.AR_baltimore = {
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
                STAT_CALCULATOR: "swarm",
            },
        },
        {
            POSITION: [11, 8.5, 0.8, 4, -4.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, { reload: 1.2, size: 1.35, health: 1.75, speed: 1.125 }]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
            },
        },
    ], 
}
Class.AR_battery = {
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
Class.AR_bentGunner = {
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
Class.AR_bentMinigun = {
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
Class.AR_buttbuttin = addBackGunner('assassin', "Buttbuttin")
Class.AR_blower = addBackGunner('destroyer', "Blower")
Class.AR_brisker = {
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
      			TYPE: "AR_fasterDrone",
      			AUTOFIRE: true,
      			SYNCS_SKILLS: true,
      			STAT_CALCULATOR: "drone",
      			MAX_CHILDREN: 6
    		}
  		},
  		{
    		POSITION: [4, 2, 0.35, 11, 0, 0, 0]
  		}
  	]
}
Class.AR_captain = makeMulti('spawner', 2, "Captain", 90)
Class.AR_charger = {
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
                TYPE: "AR_chargerSetTrap",
                STAT_CALCULATOR: "block"
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
Class.AR_cluster = {
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
                TYPE: "AR_clusterMissile",
                STAT_CALCULATOR: "sustained",
            },
        },
    ],
}
Class.AR_cog = {
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
                TYPE: "AR_autoTrap",
                STAT_CALCULATOR: "trap"
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
                TYPE: "AR_autoTrap",
                STAT_CALCULATOR: "trap"
            }
        },
        {
            POSITION: [12, 11, 1, 0, -4.5, -10, 0.5]
        }
    ]
}
Class.AR_combo = {
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
Class.AR_courser = {
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
Class.AR_crowbar = {
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
            TYPE: "AR_crowbarGun"
        },
        {
            POSITION: [5.5, 30, 0, 0, 190, 1],
            TYPE: "AR_crowbarGun"
        },
        {
            POSITION: [5.5, 40, 0, 0, 190, 1],
            TYPE: "AR_crowbarGun"
        }
    ]
}
Class.AR_cruiserdrive = {
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
            TYPE: "AR_cruiserdriveDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "AR_turretedSwarm",
                STAT_CALCULATOR: "swarm",
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "AR_turretedSwarm",
                STAT_CALCULATOR: "swarm",
            },
        },
    ],
}
if (desmosAllowed) {
    Class.AR_recharger = {
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
                    TYPE: ["bullet", {CONTROLLERS: ["snake"]}],
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
}
Class.AR_deathStar = makeMulti({
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
Class.AR_dieselTrapper = {
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
                SHOOT_SETTINGS: combineStats([g.trap, g.machineGun, g.diesel, {reload: 0.625, size: 0.625, spray: 0.75}]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
    ],
}
Class.AR_directorstorm = {
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
            TYPE: "AR_directorstormDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [6, 11, 1.3, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone]),
                TYPE: "AR_swarmingDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                MAX_CHILDREN: 6,
            },
        },
    ],
}
Class.AR_discharger = {
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
Class.AR_doperdrive = {
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
      TYPE: "AR_turretedFastDrone",
      AUTOFIRE: true,
      SYNCS_SKILLS: true,
      STAT_CALCULATOR: "drone",
      MAX_CHILDREN: 6
    }
  }, {
    POSITION: [3, 3, 0.35, 11, 0, 0, 0]
  }]
}
Class.AR_dopeseer = makeMulti({
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
      TYPE: "AR_fastDrone",
      AUTOFIRE: true,
      SYNCS_SKILLS: true,
      STAT_CALCULATOR: "drone",
    }
  }, {
    POSITION: [4, 3, 0.35, 11, 0, 0, 0]
  }]
}, 2, "Dopeseer", 90)
Class.AR_doubleFlankTwin = makeMulti({
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
Class.AR_doubleGunner = makeMulti('gunner', 2)
Class.AR_doubleHelix = makeMulti('helix', 2)
Class.AR_encircler = {
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
                STAT_CALCULATOR: "trap",
            },
        },
    ],
}
Class.AR_enforcer = {
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
Class.AR_equalizer = {
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
Class.AR_expeller = {
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
                STAT_CALCULATOR: "trap",
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
                STAT_CALCULATOR: "trap",
            },
        },
    ]
}
Class.AR_faucet = {
    PARENT: "genericTank",
    LABEL: "Faucet",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 1.5, 25, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -1.5, -25, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
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
Class.AR_foamer = {
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
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.diesel]),
                TYPE: "bullet",
            },
        }
    ]
}
Class.AR_foctillery = {
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
Class.AR_foreman = makeMulti({
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
      STAT_CALCULATOR: "drone",
      MAX_CHILDREN: 3
    }
  }]
}, 2, "Foreman", 90)
Class.AR_forger = {
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
                STAT_CALCULATOR: "block",
            },
        },
    ],
}
Class.AR_foundry = {
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
            POSITION: [1, 17, 1, 15, 0, 0, 1],
            PROPERTIES: {
                MAX_CHILDREN: 3,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory, { reload: 3, size: 1.1, health: 1.75, speed: 0.825 }]),
                TYPE: "minion",
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [11.5, 17, 1, 0, 0, 0, 0],
        },
    ],
}
Class.AR_frother = {
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
                STAT_CALCULATOR: "trap"
            }
        }
    ]
}
Class.AR_hangar = {
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
                STAT_CALCULATOR: "swarm",
            },
        },
        {
            POSITION: [8, 7.5, 0.6, 3.5, -5.75, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
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
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [11.5, 12, 1, 0, 0, 0, 0],
        },
    ],
}
Class.AR_honchodrive = {
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
      STAT_CALCULATOR: "drone",
      MAX_CHILDREN: 3
    }
  }]
}
Class.AR_hurler = {
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
                STAT_CALCULATOR: "sustained",
            },
        },
    ],
}
Class.AR_hutch = {
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
                STAT_CALCULATOR: "trap",
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
                STAT_CALCULATOR: "trap",
            },
        },
    ],
}
Class.AR_incarcerator = makePenGuard({
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
Class.AR_inception = {
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
                TYPE: "AR_autoMiniMissile",
                STAT_CALCULATOR: "sustained",
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
Class.AR_issuer = {
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
      TYPE: "AR_fastMinion",
      STAT_CALCULATOR: "drone",
      AUTOFIRE: true,
      SYNCS_SKILLS: true
    }
  }, {
    POSITION: [11.5, 12, 1, 0, 0, 0, 0]
  }, {
    POSITION: [3, 3, 0.35, 11, 0, 0, 0]
  }]
}
Class.AR_jalopy = {
    PARENT: "genericTank",
    LABEL: "Jalopy",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [16, 13, 1.65, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.diesel, { reload: 0.5, recoil: 0.5, size: 0.95, spray: 1.25 }]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.AR_junkie = {
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
      TYPE: "AR_fastDrone",
      AUTOFIRE: true,
      SYNCS_SKILLS: true,
      STAT_CALCULATOR: "drone",
      MAX_CHILDREN: 3
    }
  }, {
    POSITION: [3, 3, 0.35, 11, 0, 0, 0]
  }]
}
Class.AR_laborer = {
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
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [11.5, 11, -1.5, 0, 0, 0, 0],
        },
    ],
}
Class.AR_machineGuard = makeMachineGuard({
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
Class.AR_machineMech = {
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
                TYPE: "AR_autoTrap",
                STAT_CALCULATOR: "trap",
            },
        },
        {
            POSITION: [11.5, 13, 1.2, 0, 0, 0, 0]
        }
    ]
}
Class.AR_mechGuard = makeMechGuard({
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
Class.AR_megaHunter = {
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
Class.AR_megaSpawner = {
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
                TYPE: "AR_pounderMinion",
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [11.5, 16, 1, 0, 0, 0, 0],
        },
    ],
}
Class.AR_megaTrapper = {
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
                STAT_CALCULATOR: "trap"
            }
        }
    ]
}
Class.AR_mingler = makeMulti({
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
Class.AR_mosey = {
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
                TYPE: "AR_fastSwarm",
                STAT_CALCULATOR: "swarm",
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "AR_fastSwarm",
                STAT_CALCULATOR: "swarm",
            },
        },{
    POSITION: [8, 3, 0.35, 7, -4, 0, 0]
  }, {
    POSITION: [8, 3, 0.35, 7, 4, 0, 0]
  },
    ], 
}
Class.AR_operator = {
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
                TYPE: "AR_autoTrap",
                STAT_CALCULATOR: "trap"
            }
        },
        {
            POSITION: [12, 11, 1, 0, 0, 0, 0]
        }
    ]
}
Class.AR_peashooter = makeSwarming('trapGuard', "Peashooter")
Class.AR_pentaseer = {
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
                STAT_CALCULATOR: "necro",
            },
        },
        {
            POSITION: [5.25, 12, 1.1, 8, 0, -36, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "demonchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "necro",
            },
        },
    ],
}
Class.AR_pitcher = {
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
                TYPE: "AR_pitcherMissile",
                STAT_CALCULATOR: "sustained",
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
Class.AR_prober = {
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
Class.AR_productionist = {
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
                STAT_CALCULATOR: "drone",
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
                STAT_CALCULATOR: "drone",
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [11, 10, 0.8, 0, -5, 0, 0.5],
        },
    ],
}
Class.AR_projector = {
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
                TYPE: "AR_projectorMissile",
                STAT_CALCULATOR: "sustained",
            },
        },
    ],
}
Class.AR_quadAngle = {
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
                LABEL: "thruster",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: "thruster",
            },
        },
    ],
}
Class.AR_queller = {
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
Class.AR_railgun = {
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
Class.AR_rimfire = {
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
Class.AR_slinker = {
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
Class.AR_sniper3 = {
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
      TYPE: "AR_sniper3Gun",
    },
    {
      POSITION: [13, 8, 0, 120, 170, 0],
      TYPE: "AR_sniper3Gun",
    },
    {
      POSITION: [13, 8, 0, 240, 170, 0],
      TYPE: "AR_sniper3Gun",
    },
  ],
}
Class.AR_spawnerdrive = {
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
      TYPE: "AR_turretedMinion",
      STAT_CALCULATOR: "drone",
      AUTOFIRE: true,
      SYNCS_SKILLS: true
    }
  }, {
    POSITION: [11.5, 12, 1, 0, 0, 0, 0]
  }]
}
Class.AR_splitShot = {
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
Class.AR_stall = {
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
                STAT_CALCULATOR: "block"
            }
        }
    ]
}
Class.AR_stormer = {
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
Class.AR_subverter = {
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
Class.AR_triHealer = makeMulti({
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
Class.AR_triMachine = makeMulti('AR_machineTrapper', 3, "Tri-Machine")
Class.AR_triMech = makeMulti('AR_mech', 3, "Tri-Mech")
Class.AR_triPen = makeMulti('AR_pen', 3, "Tri-Pen")
Class.AR_triTrapGuard = makeTriGuard({
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
Class.AR_underdrive = makeMulti({
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
                TYPE: "AR_turretedSunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "necro",
            }
        }
    ]
}, 2, "Underdrive", 90)
Class.AR_volley = {
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
Class.AR_waarrk = {
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
                STAT_CALCULATOR: "trap",
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
                STAT_CALCULATOR: "trap",
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
                STAT_CALCULATOR: "trap",
            },
        }
    ]
}
Class.AR_warkwark = makeMulti({
    PARENT: "genericTank",
    STAT_NAMES: statnames.mixed,
    DANGER: 7,
    GUNS: [
        {
            POSITION: [14, 8, 1, 0, 5.5, 7.5, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, 5.5, 7.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.doubleTwin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
        {
            POSITION: [14, 8, 1, 0, -5.5, -7.5, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, -5.5, -7.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.doubleTwin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
    ],
}, 2, "Warkwark")
Class.AR_widget = {
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
Class.AR_zipper = {
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
                STAT_CALCULATOR: "swarm",
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -1.5, -25, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
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
Class.AR_bonker = {
    PARENT: "genericSmasher",
    LABEL: "Bonker",
    DANGER: 6,
    SIZE: 0.75 * 12,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody"
        }
    ]
}
Class.AR_banger = {
    PARENT: "genericSmasher",
    LABEL: "Banger",
    DANGER: 6,
    SIZE: 1.25 * 12,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody"
        }
    ]
}

// Tier 3 bird tanks
Class.AR_defect = makeBird('tripleShot', "Defect")
Class.AR_cockatiel = makeBird('AR_pen', "Cockatiel")

// Tier 3 hybrid tanks
Class.AR_coalesce = makeOver('AR_wark', "Coalesce", {count: 1, independent: true, cycle: false})
Class.AR_cobbler = makeOver('AR_mech', "Cobbler", {count: 1, independent: true, cycle: false})
Class.AR_current = makeOver('volute', "Current", {count: 1, independent: true, cycle: false})
Class.AR_deviation = makeOver('AR_machineTrapper', "Deviation", {count: 1, independent: true, cycle: false})
Class.AR_fashioner = makeOver('builder', "Fashioner", {count: 1, independent: true, cycle: false})
Class.AR_force = makeOver('artillery', "Force", {count: 1, independent: true, cycle: false})
Class.AR_heaver = makeOver('launcher', "Heaver", {count: 1, independent: true, cycle: false})
Class.AR_hitman = makeOver('assassin', "Hitman", {count: 1, independent: true, cycle: false})
Class.AR_integrator = makeOver('triAngle', "Integrator", {count: 1, independent: true, cycle: false})
Class.AR_interner = makeOver('AR_pen', "Interner", {count: 1, independent: true, cycle: false})
Class.AR_polluter = makeOver('AR_diesel', "Polluter", {count: 1, independent: true, cycle: false})
Class.AR_shower = makeOver('sprayer', "Shower", {count: 1, independent: true, cycle: false})
Class.AR_spiral = makeOver('helix', "Spiral", {count: 1, independent: true, cycle: false})

// Tier 3 auto tanks
Class.AR_autoAuto3 = makeAuto('auto3')
Class.AR_autoArtillery = makeAuto('artillery')
Class.AR_autoDestroyer = makeAuto('destroyer')
Class.AR_autoDiesel = makeAuto('AR_diesel')
Class.AR_autoDirectordrive = makeAuto({
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
                STAT_CALCULATOR: "drone",
                MAX_CHILDREN: 6,
            },
        },
    ],
}, "Auto-Directordrive", { type: "AR_driveAutoTurret", size: 9 });
Class.AR_autoDoper = makeAuto('AR_doper')
if (desmosAllowed) {
    Class.AR_autoHelix = makeAuto('helix')
}
Class.AR_autoHexaTank = makeAuto('hexaTank')
Class.AR_autoHoncho = makeAuto('AR_honcho')
Class.AR_autoHunter = makeAuto('hunter')
Class.AR_autoLauncher = makeAuto('launcher')
Class.AR_autoMachineTrapper = makeAuto('AR_machineTrapper')
Class.AR_autoMech = makeAuto('AR_mech')
Class.AR_autoMinigun = makeAuto('minigun')
Class.AR_autoPen = makeAuto('AR_pen')
Class.AR_autoRifle = makeAuto('rifle')
Class.AR_autoSprayer = makeAuto('sprayer')
Class.AR_autoTrapGuard = makeAuto('trapGuard')
Class.AR_autoTripleShot = makeAuto('tripleShot')
Class.AR_autoUnderseer = makeAuto('underseer')
Class.AR_autoVolute = makeAuto('volute')
Class.AR_autoWark = makeAuto('AR_wark')

// Tier 4 tanks
Class.AR_bentTriple = makeMulti({
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
Class.AR_birdOfPrey = makeFighter('phoenix', "Bird of Prey")
Class.AR_blitz = makeFighter('bomber', "Blitz")
Class.AR_boxer = {
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
                LABEL: "thruster",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: "thruster",
            },
        },
    ],
}
Class.AR_brawler = makeFighter('booster', "Brawler")
Class.AR_cleft = makeMulti({
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
Class.AR_cockatoo = makeFighter('AR_cockatiel', "Cockatoo")
Class.AR_coordinator = {
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
                STAT_CALCULATOR: "drone",
                MAX_CHILDREN: 6,
                WAIT_TO_CYCLE: true
            }
        },
        {
            POSITION: [6.5, 13, -1.3, 5.5, 0, 0, 0]
        }
    ]
}
Class.AR_griffin = makeFighter('eagle', "Griffin")
Class.AR_hewnTriple = {
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
Class.AR_mangle = makeFighter('AR_defect', "Mangle")
Class.AR_pug = makeOver('fighter', "Pug", {count: 1, independent: true, cycle: false})
Class.AR_quadTwin = makeMulti({
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
Class.AR_shocker = makeFighter('vulture', "Shocker")
Class.AR_skewnDouble = {
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
Class.AR_sparrow = makeFighter('falcon', "Sparrow")
Class.AR_strider = makeSurfer('fighter', "Strider")
Class.AR_ternion = makeMulti({
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
Class.AR_triFrother = makeMulti({
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
                STAT_CALCULATOR: "trap"
            }
        }
    ]
}, 3, "Tri-Frother")
Class.AR_tripleFlankTwin = makeMulti({
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
Class.AR_tripleGunner = makeMulti('gunner', 3)
Class.AR_tripleHelix = makeMulti('helix', 3)
Class.AR_warkwarkwark = makeMulti({
    PARENT: "genericTank",
    STAT_NAMES: statnames.mixed,
    DANGER: 7,
    GUNS: [
        {
            POSITION: [14, 8, 1, 0, 5.5, 7.5, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, 5.5, 7.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.doubleTwin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
        {
            POSITION: [14, 8, 1, 0, -5.5, -7.5, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, -5.5, -7.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.doubleTwin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
    ],
}, 2, "Warkwarkwark")
Class.AR_adderall = { 
	PARENT: "genericTank",
	LABEL: "Adderall",
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
      			TYPE: "AR_fastestDrone",
                AUTOFIRE: true,
      			SYNCS_SKILLS: true,
      			STAT_CALCULATOR: "drone",
      			MAX_CHILDREN: 6
    		}
  		},
  		{
    		POSITION: [4, 2, 0.35, 11, 0, 0, 0]
  		}
  	]
}
Class.AR_vortex = {
    PARENT: "genericTank",
    LABEL: "Vortex",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1,
    },
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "AR_vortexDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [6, 11, 1.3, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone]),
                TYPE: "AR_superSwarmingDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                MAX_CHILDREN: 6,
            },
        },
    ],
}
Class.AR_hewnFlankDouble = {
    PARENT: "genericTank",
    DANGER: 7,
    LABEL: "Hewn Flank Double",
    GUNS: [
        {
            POSITION: [19, 8, 1, 0, 5.5, 205, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 8, 1, 0, -5.5, -205, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, 0, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 0, -90, 0.5],
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
        {
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin]),
                TYPE: "bullet",
            },
        }
    ],
}
Class.AR_hewnGunner = {
    PARENT: "genericTank",
    LABEL: "Hewn Gunner",
    DANGER: 6,
    GUNS: [
        ...gunnerGuns,
        {
            POSITION: [12, 3.5, 1, -2, 8.25, 205, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [12, 3.5, 1, -2, -8.25, -205, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [12, 3.5, 1, 0, 5.25, 205, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [12, 3.5, 1, 0, -5.25, -205, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [12, 3.5, 1, 0, 7.25, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [12, 3.5, 1, 0, -7.25, 180, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 3.5, 1, 0, 3.75, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 3.5, 1, 0, -3.75, 180, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.AR_basher = {
    PARENT: "genericSmasher",
    LABEL: "Basher",
    DANGER: 6,
    SIZE: 0.475 * 12,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody"
        }
    ]
}
Class.AR_slammer = {
    PARENT: "genericSmasher",
    LABEL: "Slammer",
    DANGER: 6,
    SIZE: 1.5 * 12,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody"
        }
    ]
}
Class.AR_warkwawarkrk = {
    PARENT: "genericTank",
    LABEL: "Warkwawarkrk",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [14, 8, 1, 0, 5.5, 205, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, 5.5, 205, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        },
        {
            POSITION: [14, 8, 1, 0, -5.5, -205, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, -5.5, -205, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        },
        {
            POSITION: [14, 8, 1, 0, 5.5, 180, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, 5.5, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        },
        {
            POSITION: [14, 8, 1, 0, -5.5, 180, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, -5.5, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        },
        {
            POSITION: [14, 8, 1, 0, 5.5, 0, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.hewnDouble]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        },
        {
            POSITION: [14, 8, 1, 0, -5.5, 0, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.hewnDouble]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        }
    ]
}
Class.AR_pentaDouble = makeMulti("pentaShot", 2, "Penta Double")
Class.AR_doubleTriplet = makeMulti("triplet", 2, "Double Triplet")
Class.AR_doubleSpreadshot = makeMulti("spreadshot", 2, "Double Spreadshot")
Class.AR_splitDouble = makeMulti("AR_splitShot", 2, "Split Double")
Class.AR_bentFlankDouble = makeMulti(
    {
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
            },
            {
                POSITION: [19, 8, 1, 0, 0, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.doubleTwin]),
                    TYPE: "bullet"
                }
            }
        ]
    }, 2, "Bent Flank Double"
)
Class.AR_bentDoubleGunner = makeMulti("AR_bentGunner", 2, "Bent Double Gunner")
Class.AR_bentDoubleMinigun = makeMulti("AR_bentMinigun", 2, "Bent Double Minigun")
Class.AR_waarrkwaarrk = {
    PARENT: "genericTank",
    LABEL: "Waarrkwaarrk",
    DANGER: 7,
    GUNS: weaponArray([
        {
            POSITION: [14, 8, 1, 0, -2, -17.5, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, -2, -17.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.tripleShot, g.doubleTwin]),
                TYPE: "trap"
            }
        },
        {
            POSITION: [14, 8, 1, 0, 2, 17.5, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, 2, 17.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.tripleShot, g.doubleTwin]),
                TYPE: "trap"
            }
        },
        {
            POSITION: [17, 8, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [3, 9, 1.5, 17, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.tripleShot, g.doubleTwin]),
                TYPE: "trap"
            }
        }
    ], 2)
}
Class.AR_doubleFlankGunner = makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
    GUNS: [
        ...gunnerGuns,
        {
            POSITION: [19, 2.5, 1, 0, 2.75, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 2.5, 1, 0, -2.75, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [12, 11, 1, 0, 0, 90, 0],
        }, 
    ]
}, 2, "Double Flank Gunner")
Class.AR_hipwatch = makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
    GUNS: [
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
    TURRETS: [
        {
            POSITION: [10, 9, 0, 90, 190, 0],
            TYPE: ["autoTankGun", { INDEPENDENT: true }],
        },
        {
            POSITION: [10, 9, 0, -90, 190, 0],
            TYPE: ["autoTankGun", { INDEPENDENT: true }],
        }
    ]
}, 2, "Hipwatch")
Class.AR_scuffler = makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
    GUNS: [
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
        {
            POSITION: [15, 12, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.pounder]),
                TYPE: "bullet",
            },
        },
    ],
}, 2, "Scuffler")
Class.AR_warkwawawark = makeMulti({
    PARENT: "genericTank",
    STAT_NAMES: statnames.mixed,
    DANGER: 7,
    GUNS: [
        {
            POSITION: [14, 8, 1, 0, 5.5, 7.5, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, 5.5, 7.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.doubleTwin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        },
        {
            POSITION: [14, 8, 1, 0, -5.5, -7.5, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, -5.5, -7.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.doubleTwin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        },
        {
            POSITION: [14, 8, 1, 0, 0, 90, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, 0, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.doubleTwin, g.flankGuard]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        }
    ],
}, 2, "Warkwawawark")
Class.AR_doubleNailgun = makeMulti("nailgun", 2, "Double Nailgun")
Class.AR_doubleMachineGunner = makeMulti("machineGunner", 2, "Double Machine Gunner")
Class.AR_doubleBattery = makeMulti("AR_battery", 2, "Double Battery")
Class.AR_doubleVolley = makeMulti("AR_volley", 2, "Double Volley")
Class.AR_doubleEqualizer = makeMulti("AR_equalizer", 2, "Double Equalizer")
Class.AR_doubleRimfire = makeMulti("AR_rimfire", 2, "Double Rimfire")
Class.AR_guardrail = makeMulti("AR_hutch", 2, "Setup")
Class.AR_sealer = makeMulti("AR_cog", 2, "Sealer")
Class.AR_setup = makeMulti("AR_expeller", 2, "Setup")
Class.AR_doubleDual = makeMulti("dual", 2, "Double Dual")
Class.AR_doubleMusket = makeMulti("musket", 2, "Double Musket")
Class.AR_heptaShot = {
    PARENT: "genericTank",
    LABEL: "Hepta Shot",
    DANGER: 7,
    BODY: {
        SPEED: 0.85 * base.SPEED
    },
    HAS_NO_RECOIL: true,
    GUNS: [
        {
            POSITION: [13, 8, 1, 0, -4, -45, 3/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [13, 8, 1, 0, 4, 45, 3/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 8, 1, 0, -3, -30, 2/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 8, 1, 0, 3, 30, 2/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 8, 1, 0, -2, -15, 1/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 8, 1, 0, 2, 15, 1/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
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
Class.AR_flexedGunner = {
    PARENT: "genericTank",
    DANGER: 7,
    LABEL: "Flexed Gunner",
    GUNS: [

        {
            POSITION: [15, 3.5, 1, 0, 5.5, 45, 6/8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [15, 3.5, 1, 0, -5.5, -45, 7/8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 3.5, 1, 0, 4.5, 30, 4/8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 3.5, 1, 0, -4.5, -30, 5/8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [17, 3.5, 1, 0, 3.5, 15, 2/8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [17, 3.5, 1, 0, -3.5, -15, 3/8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 3.5, 1, 0, 2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 3.5, 1, 0, -2.5, 0, 1/8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        }
    ]
};


// Tier 4 hybrid/over tanks
Class.AR_abberation = makeOver('AR_frother', "Abberation", {count: 1, independent: true, cycle: false})
Class.AR_gusher = makeOver('AR_foamer', "Gusher", {count: 1, independent: true, cycle: false})
Class.AR_hose = makeOver('redistributor', "Hose", {count: 1, independent: true, cycle: false})
Class.AR_pressureWasher = makeOver('focal', "Pressure Washer", {count: 1, independent: true, cycle: false})
Class.AR_raincloud = makeOver('AR_faucet', "Raincloud", {count: 1, independent: true, cycle: false})
Class.AR_sprinkler = makeOver('atomizer', "Sprinkler", {count: 1, independent: true, cycle: false})
Class.AR_overDoubleTwin = makeMulti({
    PARENT: "genericTank",
    STAT_NAMES: statnames.mixed,
    DANGER: 7,
    GUNS: [
        {
            POSITION: [6, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
                TYPE: ["drone", { INDEPENDENT: true }],
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 3
            }
        },
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                Y: 5.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                Y: -5.5,
                DELAY: 0.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin]),
                TYPE: "bullet"
            }
        },
    ]
}, 2, "Overdouble Twin")
Class.AR_overDoubleGunner = makeMulti({
    PARENT: "genericTank",
    STAT_NAMES: statnames.mixed,
    DANGER: 7,
    GUNS: [
        {
            POSITION: [6, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
                TYPE: ["drone", { INDEPENDENT: true }],
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 3
            }
        },
        {
            POSITION: [19, 2, 1, 0, -2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 2, 1, 0, 2.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 11, 1, 0, 0, 0, 0],
        }
    ]
}, 2, "Overdouble Gunner")
Class.AR_oversprayer = makeOver('sprayer')
Class.AR_flexedHybrid = makeOver('pentaShot', "Flexed Hybrid", {count: 1, independent: true, cycle: false})

// Tier 4 bird tanks
Class.AR_aethon = makeBird('AR_foamer', "Aethon")
Class.AR_alicanto = makeBird('focal', "Alicanto")
Class.AR_avian = makeBird('single', "Avian")
Class.AR_erne = makeBird('artillery', "Erne")
Class.AR_harrier = makeBird('destroyer', "Harrier")
Class.AR_nymph = makeBird('redistributor', "Nymph")
Class.AR_owl = makeBird('stalker', "Owl")
Class.AR_pamola = makeBird('AR_frother', "Pamola")
Class.AR_peregrine = makeBird('ranger', "Peregrine")
Class.AR_seriemas = makeBird('launcher', "Seriemas")
Class.AR_simurgh = makeBird('AR_faucet', "Simurgh")
Class.AR_sirin = makeBird('AR_stormer', "Sirin")
Class.AR_ziz = makeBird('atomizer', "Ziz")
Class.AR_deficiency = makeBird("pentaShot", "Deficiency")

// Tier 4 superbird tanks
Class.AR_firebird = makeSuperbird('sprayer', "Firebird")

// Tier 4 auto tanks
Class.AR_auto = makeAuto('AR_placeholder')
Class.AR_autoAtomizer = makeAuto('atomizer')
Class.AR_autoBooster = makeAuto('booster')
Class.AR_autoBentDouble = makeAuto('bentDouble')
Class.AR_autoDoubleFlankTwin = makeAuto('AR_doubleFlankTwin')
Class.AR_autoDoubleGunner = makeAuto('AR_doubleGunner')
Class.AR_autoDoubleHelix = makeAuto('AR_doubleHelix')
Class.AR_autoEagle = makeAuto('eagle')
Class.AR_autoFaucet = makeAuto('AR_faucet')
Class.AR_autoFighter = makeAuto('fighter')
Class.AR_autoFoamer = makeAuto('AR_foamer')
Class.AR_autoFocal = makeAuto('focal')
Class.AR_autoFrother = makeAuto('AR_frother')
Class.AR_autoHewnDouble = makeAuto('hewnDouble')
Class.AR_autoPhoenix = makeAuto('phoenix')
Class.AR_autoRedistributor = makeAuto('redistributor')
Class.AR_autoShower = makeAuto('AR_shower')
Class.AR_autoStormer = makeAuto('AR_stormer')
Class.AR_autotripleTwin = makeAuto('tripleTwin')
Class.AR_autoWarkwark = makeAuto('AR_warkwark')
Class.AR_autoPentaShot = makeAuto("pentaShot")

// Tier 4 mega auto tanks
Class.AR_megaAutoDouble = makeMegaAuto('doubleTwin', "Mega Auto-Double")
Class.AR_megaAutoSprayer = makeMegaAuto('sprayer')

// Tier 4 triple auto tanks
Class.AR_tripleAutoDouble = makeTripleAuto('doubleTwin', "Triple Auto-Double")
Class.AR_tripleAutoSprayer = makeTripleAuto('sprayer')


// Upgrade paths
Class.basic.UPGRADES_TIER_3 = ["single"]
    Class.single.UPGRADES_TIER_3 = ["AR_placeholder", "AR_placeholder", "AR_placeholder", "AR_ternion", "AR_placeholder", "AR_coordinator", "AR_placeholder", "AR_placeholder", "AR_placeholder", "AR_placeholder", "AR_placeholder", "AR_placeholder"]
    Class.twin.UPGRADES_TIER_2.push("AR_wark")
        Class.twin.UPGRADES_TIER_3.splice(1, 1) // remove bulwark
        Class.doubleTwin.UPGRADES_TIER_3.push("AR_doubleFlankTwin", "AR_doubleGunner", "AR_doubleHelix", "AR_warkwark", "AR_doubleDual", "AR_doubleMusket", "AR_overDoubleTwin")
            Class.tripleTwin.UPGRADES_TIER_3 = ["AR_quadTwin", "AR_autotripleTwin", "AR_bentTriple", "AR_hewnTriple", "AR_tripleFlankTwin", "AR_tripleGunner", "AR_warkwarkwark", "AR_tripleHelix"]
            Class.autoDouble.UPGRADES_TIER_3 = ["AR_megaAutoDouble", "AR_tripleAutoDouble", "AR_autotripleTwin", "AR_autoHewnDouble", "AR_autoBentDouble", "AR_autoDoubleFlankTwin", "AR_autoDoubleGunner", "AR_autoWarkwark", "AR_autoDoubleHelix"]
        Class.tripleShot.UPGRADES_TIER_3.push("AR_splitShot", "AR_autoTripleShot", "AR_bentGunner", "AR_bentMinigun", "AR_defect", "AR_waarrk")
    Class.sniper.UPGRADES_TIER_3.push("AR_railgun")
        Class.assassin.UPGRADES_TIER_3.splice(4, 1) // remove single
        Class.assassin.UPGRADES_TIER_3.push("AR_buttbuttin", "AR_hitman", "AR_sniper3", "AR_enforcer", "AR_courser")
        Class.hunter.UPGRADES_TIER_3.push("AR_autoHunter", "AR_megaHunter", "AR_prober", "AR_courser")
        Class.rifle.UPGRADES_TIER_3.push("AR_autoRifle", "AR_enforcer", "AR_prober")
    Class.machineGun.UPGRADES_TIER_2.push("AR_diesel", "AR_machineTrapper")
        Class.minigun.UPGRADES_TIER_3.push("AR_subverter", "AR_zipper", "AR_bentMinigun", "AR_autoMinigun", "AR_widget")
        Class.gunner.UPGRADES_TIER_3.push("AR_battery", "AR_buttbuttin", "AR_blower", "AR_rimfire", "AR_volley", "AR_doubleGunner", "AR_bentGunner", "AR_equalizer")
        Class.sprayer.UPGRADES_TIER_3.push("AR_frother", "AR_foamer", "AR_faucet", "AR_shower", "AR_autoSprayer", "AR_stormer")
            Class.AR_autoSprayer.UPGRADES_TIER_3 = ["AR_megaAutoSprayer", "AR_tripleAutoSprayer", "AR_autoRedistributor", "AR_autoPhoenix", "AR_autoAtomizer", "AR_autoFocal", "AR_autoFrother", "AR_autoFoamer", "AR_autoFaucet", "AR_autoShower", "AR_autoStormer"]
        Class.AR_diesel.UPGRADES_TIER_3 = ["AR_jalopy", "machineGunner", "AR_dieselTrapper", "AR_polluter", "AR_autoDiesel", "AR_foamer"]
    Class.flankGuard.UPGRADES_TIER_3 = ["AR_ternion"]
        Class.hexaTank.UPGRADES_TIER_3.push("AR_deathStar", "AR_autoHexaTank", "AR_mingler", "AR_combo")
        Class.triAngle.UPGRADES_TIER_3.push("AR_cockatiel", "AR_integrator", "AR_defect", "AR_quadAngle")
        Class.auto3.UPGRADES_TIER_3.push("AR_sniper3", "AR_crowbar", "AR_autoAuto3", "AR_combo")
    Class.director.UPGRADES_TIER_2.push("AR_directordrive", "AR_honcho", "AR_doper")
        Class.director.UPGRADES_TIER_3.splice(1, 1) // remove big cheese
            Class.director.UPGRADES_TIER_3.push("AR_coordinator")
        Class.overseer.UPGRADES_TIER_3.splice(2, 1) // remove overgunner
        Class.overseer.UPGRADES_TIER_3.splice(1, 1) // remove overtrapper
        Class.overseer.UPGRADES_TIER_3.push("AR_captain", "AR_foreman", "AR_dopeseer")
        Class.cruiser.UPGRADES_TIER_3.push("AR_productionist", "AR_cruiserdrive", "AR_hangar", "AR_zipper", "AR_baltimore", "AR_mosey")
        Class.underseer.UPGRADES_TIER_3.push("AR_autoUnderseer", "AR_underdrive", "AR_pentaseer")
        Class.spawner.UPGRADES_TIER_3.push("AR_megaSpawner", "AR_productionist", "AR_spawnerdrive", "AR_captain", "AR_hangar", "AR_laborer", "AR_foundry", "AR_issuer")
        Class.AR_directordrive.UPGRADES_TIER_3 = ["AR_directorstorm", "overdrive", "AR_cruiserdrive", "AR_underdrive", "AR_spawnerdrive", "AR_autoDirectordrive", "AR_honchodrive", "AR_doperdrive"]
        Class.AR_honcho.UPGRADES_TIER_3 = ["AR_foreman", "AR_baltimore", "AR_foundry", "bigCheese", "AR_autoHoncho", "AR_honchodrive", "AR_junkie"]
        Class.AR_doper.UPGRADES_TIER_3 = ["AR_brisker", "AR_dopeseer", "AR_mosey", "AR_issuer", "AR_junkie", "AR_doperdrive", "AR_autoDoper"]
    Class.pounder.UPGRADES_TIER_3.push("AR_subverter")
        Class.destroyer.UPGRADES_TIER_3.push("AR_blower", "AR_megaTrapper", "AR_queller", "AR_autoDestroyer", "AR_hurler", "AR_slinker")
        Class.artillery.UPGRADES_TIER_3.push("AR_queller", "AR_forger", "AR_force", "AR_autoArtillery", "AR_foctillery", "AR_discharger")
        if (desmosAllowed) {
          Class.artillery.UPGRADES_TIER_3.push("AR_recharger")
        }
        Class.launcher.UPGRADES_TIER_3.push("AR_pitcher", "AR_cluster", "AR_projector", "AR_heaver", "AR_autoLauncher", "AR_hurler", "AR_inception")
    Class.trapper.UPGRADES_TIER_2.push("AR_pen", "AR_mech", "AR_machineTrapper", "AR_wark")
        Class.trapper.UPGRADES_TIER_3.splice(0, 1) // remove barricade
        Class.trapper.UPGRADES_TIER_3.push("AR_megaTrapper")
        Class.builder.UPGRADES_TIER_3.push("AR_forger", "AR_stall", "AR_fashioner", "AR_charger")
        Class.triTrapper.UPGRADES_TIER_3.push("AR_triPen", "AR_triMech", "AR_triMachine", "AR_triTrapGuard")
        Class.trapGuard.UPGRADES_TIER_3.push("AR_peashooter", "AR_incarcerator", "AR_mechGuard", "AR_autoTrapGuard", "AR_machineGuard", "AR_triTrapGuard")
        Class.AR_pen.UPGRADES_TIER_3 = ["AR_stall", "AR_triPen", "AR_encircler", "AR_incarcerator", "AR_operator", "AR_cockatiel", "AR_hutch", "AR_interner", "AR_autoPen"]
        Class.AR_mech.UPGRADES_TIER_3 = ["engineer", "AR_triMech", "AR_machineMech", "AR_mechGuard", "AR_operator", "AR_cog", "AR_cobbler", "AR_autoMech"]
        Class.AR_machineTrapper.UPGRADES_TIER_3 = ["AR_dieselTrapper", "barricade", "AR_equalizer", "AR_machineGuard", "AR_encircler", "AR_machineMech", "AR_triMachine", "AR_expeller", "AR_autoMachineTrapper", "AR_deviation", "AR_frother"]
        Class.AR_wark.UPGRADES_TIER_3 = ["AR_warkwark", "AR_waarrk", "AR_equalizer", "hexaTrapper", "AR_hutch", "AR_cog", "AR_expeller", "bulwark", "AR_coalesce", "AR_autoWark"]
    // desmos
    if (desmosAllowed) {
        //Class.volute.UPGRADES_TIER_3.push("AR_recharger", "AR_current", "AR_autoVolute")
        Class.helix.UPGRADES_TIER_3.push("AR_doubleHelix", "AR_spiral", "AR_autoHelix")
        Class.AR_doubleHelix.UPGRADES_TIER_3 = [
            "AR_tripleHelix",
            "AR_autoDoubleHelix"
        ]
    }
    if (desmosAllowed === false) {
        Class.basic.UPGRADES_TIER_1.splice(7, 1) // remove desmos
    }
    Class.hewnDouble.UPGRADES_TIER_3 = [
        "AR_hewnTriple",
        "AR_autoHewnDouble",
        "AR_cleft",
        "AR_skewnDouble",
        "AR_hewnFlankDouble",
        "AR_hewnGunner",
        "AR_warkwawarkrk",
    ]
    Class.bentDouble.UPGRADES_TIER_3 = [
        "AR_bentTriple",
        "AR_pentaDouble",
        "AR_autoBentDouble",
        "AR_doubleTriplet",
        "AR_cleft",
        "AR_doubleSpreadshot",
        "AR_bentFlankDouble",
        "AR_bentDoubleGunner",
        "AR_bentDoubleMinigun",
        "AR_splitDouble",
        "AR_waarrkwaarrk"
    ]
    Class.AR_doubleFlankTwin.UPGRADES_TIER_3 = [
        "AR_quadTwin",
        "AR_tripleFlankTwin",
        "AR_hewnFlankDouble",
        "AR_autoDoubleFlankTwin",
        "AR_bentFlankDouble",
        "AR_doubleFlankGunner",
        "AR_hipwatch",
        "AR_scuffler",
        "AR_warkwawawark"
    ]
    Class.AR_doubleGunner.UPGRADES_TIER_3 = [
        "AR_tripleGunner",
        "AR_hewnGunner",
        "AR_autoDoubleGunner",
        "AR_bentDoubleGunner",
        "AR_doubleFlankGunner",
        "AR_doubleNailgun",
        "AR_doubleMachineGunner",
        "AR_overDoubleGunner",
        "AR_doubleBattery",
        "AR_doubleRimfire",
        "AR_doubleVolley",
        "AR_doubleEqualizer"
    ]
    Class.AR_warkwark.UPGRADES_TIER_3 = [
        "AR_warkwarkwark", 
        "AR_warkwawarkrk",
        "AR_autoWarkwark",
        "AR_waarrkwaarrk",
        "AR_warkwawawark",
        "AR_doubleEqualizer",
        "AR_guardrail",
        "AR_sealer",
        "AR_setup"
    ]
    //WIP
    Class.pentaShot.UPGRADES_TIER_3 = [
        "AR_heptaShot",
        "AR_pentaDouble",
        "AR_flexedHybrid",
        "quintuplet",
        "AR_placeholder", // AR_crackshot
        "AR_autoPentaShot",
        "AR_flexedGunner",
        "AR_placeholder", // AR_flexedMinigun
        "AR_deficiency",
        "AR_placeholder" // AR_waarararrk
    ]

Class.redistributor.UPGRADES_TIER_3 = [
    "AR_placeholder",
    "AR_nymph",
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_hose",
    "AR_placeholder",
    "AR_autoRedistributor",
    "AR_placeholder",
]
Class.phoenix.UPGRADES_TIER_3 = [
    "AR_firebird",
    "AR_birdOfPrey",
    "AR_nymph",
    "AR_ziz",
    "AR_alicanto",
    "AR_pamola",
    "AR_aethon",
    "AR_simurgh",
    "AR_autoPhoenix",
    "AR_sirin",
]
Class.atomizer.UPGRADES_TIER_3 = [
    "AR_placeholder",
    "AR_placeholder",
    "AR_ziz",
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_sprinkler",
    "AR_placeholder",
    "AR_autoAtomizer",
    "AR_placeholder",
]
Class.focal.UPGRADES_TIER_3 = [
    "AR_placeholder",
    "AR_placeholder",
    "AR_alicanto",
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_pressureWasher",
    "AR_placeholder",
    "AR_autoFocal",
    "AR_placeholder",
]
Class.AR_frother.UPGRADES_TIER_3 = [
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_triFrother",
    "AR_placeholder",
    "AR_placeholder",
    "AR_pamola",
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_abberation",
    "AR_placeholder",
    "AR_autoFrother",
    "AR_placeholder",
]
Class.AR_foamer.UPGRADES_TIER_3 = [
    "AR_placeholder",
    "AR_placeholder",
    "AR_aethon",
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_gusher",
    "AR_autoFoamer",
    "AR_placeholder",
]
Class.AR_faucet.UPGRADES_TIER_3 = [
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_simurgh",
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_raincloud",
    "AR_placeholder",
    "AR_autoFaucet",
    "AR_placeholder",
]
Class.AR_shower.UPGRADES_TIER_3 = [
    "AR_oversprayer",
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_hose",
    "AR_sprinkler",
    "AR_pressureWasher",
    "AR_abberation",
    "AR_gusher",
    "AR_raincloud",
    "AR_autoShower",
    "AR_placeholder",
]
Class.AR_stormer.UPGRADES_TIER_3 = [
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_sirin",
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_placeholder",
    "AR_autoStormer",
]

Class.smasher.UPGRADES_TIER_3.push(
    "AR_bonker",
    "AR_banger",
    "AR_placeholder",//"AR_drifter",
)
Class.AR_bonker.UPGRADES_TIER_3 = [
    "AR_placeholder", // AR_decoy
    "AR_placeholder", // AR_spear
    "AR_placeholder", // AR_autoBonker
    "AR_placeholder", // AR_megaBonker
    "AR_basher",
    "AR_placeholder", // AR_thwacker
    "AR_placeholder" // AR_bundler
]
Class.AR_banger.UPGRADES_TIER_3 = [
    "AR_slammer"
]

Class.healer.UPGRADES_TIER_3.splice(3, 1) // remove paramedic
Class.healer.UPGRADES_TIER_3.splice(2, 1) // remove surgeon
Class.healer.UPGRADES_TIER_3.splice(1, 1) // remove ambulance
Class.healer.UPGRADES_TIER_3.push(
    "AR_placeholder",//"AR_scientist",
    "AR_placeholder",//"AR_nurse",
    "AR_triHealer",
    "AR_placeholder",//"AR_analyzer",
    "AR_placeholder",//"AR_psychiatrist",
    "AR_placeholder",//"AR_soother",
)
if (noUndertow) {
    Class.desmos.UPGRADES_TIER_2.splice(1, 1)
}
Class.AR_directorstorm.UPGRADES_TIER_3 = ["AR_vortex"]

// DEBUG
const addHealerToMain = false
if (addHealerToMain) {
Class.basic.UPGRADES_TIER_2.push("healer")
Class.twin.UPGRADES_TIER_3.push("AR_placeholder"/*"AR_nurse"*/)
Class.sniper.UPGRADES_TIER_3.push("medic")
Class.machineGun.UPGRADES_TIER_3 = ["AR_placeholder"/*"AR_psychiatrist"*/]
Class.flankGuard.UPGRADES_TIER_3.push("AR_triHealer")
Class.director.UPGRADES_TIER_3.push("AR_placeholder"/*"AR_soother"*/)
Class.pounder.UPGRADES_TIER_3.push("AR_placeholder"/*"AR_analyzer"*/)
Class.trapper.UPGRADES_TIER_3.push("AR_placeholder"/*"AR_scientist"*/)
//Class.smasher.UPGRADES_TIER_3.push("AR_placeholder"/*"AR_physician"*/)
//Class.single.UPGRADES_TIER_3.push("AR_placeholder"/*"AR_renovater"*/)
}
