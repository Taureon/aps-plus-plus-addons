const { dereference, combineStats, makeDeco, makeAuto, makeBird, makeOver, addBackGunner } = require('../facilitators.js');
const { base, gunCalcNames, statnames, dfltskl, smshskl } = require('../constants.js');
const g = require('../gunvals.js');
Class.znpHlnAR_placeholder = { LABEL: "PLACEHOLDER", COLOR: "black", UPGRADE_COLOR: "black"}

// YES I KNOW THE LINE COUNT IS RIDICULOUS I'LL IMPROVE IT LATER OK
// return

// Set this to false to disable desmos branch
const desmosAllowed = true;
//Set this to false to enable undertow
const noUndertow = true;

// Cannon Functions
const makeMulti = (type, count, name = -1, startRotation = 0) => {
    type = ensureIsClass(type);
    let greekNumbers = ',Double ,Triple ,Quad ,Penta ,Hexa ,Septa ,Octo ,Nona ,Deca ,Hendeca ,Dodeca ,Trideca ,Tetradeca ,Pentadeca ,Hexadeca ,Septadeca ,Octadeca ,Nonadeca ,Icosa ,Henicosa ,Doicosa ,Triaicosa ,Tetraicosa ,Pentaicosa ,Hexaicosa ,Septaicosa ,Octoicosa ,Nonaicosa ,Triaconta '.split(','),
        output = dereference(type),
        fraction = 360 / count;
    output.GUNS = [];
    for (let gun of type.GUNS) {
        for (let i = 0; i < count; i++) {
            let newgun = dereference(gun);
            if (Array.isArray(newgun.POSITION)) {
                newgun.POSITION[5] += startRotation + fraction * i;
            } else {
                newgun.POSITION.ANGLE = (newgun.POSITION.ANGLE ?? 0) + startRotation + fraction * i;
            }
            if (gun.PROPERTIES) newgun.PROPERTIES = gun.PROPERTIES;
            output.GUNS.push(newgun);
        };
    }
    output.LABEL = name == -1 ? (greekNumbers[count - 1] || (count + ' ')) + type.LABEL : name;
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
                TYPE: "znpHlnAR_autoTrap",
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
            STAT_CALCULATOR: "drone",
            WAIT_TO_CYCLE: false,
            MAX_CHILDREN: 3,
        },
    };
    output.GUNS = type.GUNS == null ? [spawner] : [spawner, ...type.GUNS];
    output.LABEL = name == -1 ? "Hybrid " + type.LABEL : name;
    return output;
}
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

// Missiles
Class.znpHlnAR_autoMiniMissile = makeAuto('minimissile')
Class.znpHlnAR_clusterMissile = {
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
Class.znpHlnAR_pitcherMissile = {
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
Class.znpHlnAR_projectorMissile = makeMulti('minimissile', 2, "Missile")

// Drones
Class.znpHlnAR_fastDrone = makeFast('drone')
Class.znpHlnAR_fasterDrone = makeFast('drone', 1.2)
Class.znpHlnAR_fastestDrone = makeFast('drone', 1.4)
Class.znpHlnAR_fastSwarm = makeFast('swarm')
Class.znpHlnAR_fastMinion = makeFast('minion')
Class.znpHlnAR_turretedFastDrone = makeAuto('znpHlnAR_fastDrone', "Auto-Drone", {type: 'droneAutoTurret'})
Class.znpHlnAR_swarmingDrone = makeAuto('drone', "Swarm Auto-Swarm", {type: 'znpHlnAR_swarmDroneTurret'})
Class.znpHlnAR_superSwarmingDrone = makeAuto('drone', "Swarm Auto-Swarm", {type: 'znpHlnAR_superSwarmDroneTurret'})
Class.znpHlnAR_turretedSwarm = makeAuto('swarm', "Auto-Swarm", {type: 'droneAutoTurret'})
Class.znpHlnAR_turretedSunchip = makeAuto('sunchip', "Auto-Sunchip", {type: 'droneAutoTurret'})
Class.znpHlnAR_turretedMinion = makeAuto('minion', "Auto-Minion", {type: 'droneAutoTurret'})
Class.znpHlnAR_pounderMinion = {
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
Class.znpHlnAR_autoTrap = makeAuto('trap')
Class.znpHlnAR_chargerSetTrap = makeMulti({
	PARENT: "setTrap",
    INDEPENDENT: true,
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
            TYPE: "znpHlnAR_chargerSetTrapDeco",
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
Class.znpHlnAR_directorstormDeco = makeMulti({
	SHAPE: 4,
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
        }
    ]
}, 2, "", 90)
Class.znpHlnAR_cruiserdriveDeco = makeDeco(3.5);
Class.znpHlnAR_chargerSetTrapDeco = makeDeco(5);
Class.znpHlnAR_vortexDeco = makeMulti({
	SHAPE: 4,
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
        }
    ]
}, 4, "", 90)

// Turrets
Class.znpHlnAR_sniper3Gun = {
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
Class.znpHlnAR_crowbarGun = {
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
Class.znpHlnAR_driveAutoTurret = {
	PARENT: "autoTurret",
	SHAPE: 4
}
Class.znpHlnAR_swarmDroneTurret = makeMulti({
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
Class.znpHlnAR_superSwarmDroneTurret = makeMulti({
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
Class.znpHlnAR_diesel = {
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
Class.znpHlnAR_directordrive = {
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
Class.znpHlnAR_doper = {
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
      			TYPE: "znpHlnAR_fastDrone",
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
Class.znpHlnAR_honcho = {
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
Class.znpHlnAR_machineTrapper = {
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
Class.znpHlnAR_mech = {
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
                TYPE: "znpHlnAR_autoTrap",
                STAT_CALCULATOR: "trap"
            }
        },
        {
            POSITION: [12, 11, 1, 0, 0, 0, 0]
        }
    ]
}
Class.znpHlnAR_pen = {
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
Class.znpHlnAR_wark = {
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
                STAT_CALCULATOR: "trap",
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
                STAT_CALCULATOR: "trap",
            },
        },
    ],
}

// Tier 3 tanks
Class.znpHlnAR_baltimore = {
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
Class.znpHlnAR_battery = {
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
Class.znpHlnAR_bentGunner = {
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
Class.znpHlnAR_bentMinigun = {
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
Class.znpHlnAR_buttbuttin = addBackGunner('assassin', "Buttbuttin")
Class.znpHlnAR_blower = addBackGunner('destroyer', "Blower")
Class.znpHlnAR_brisker = {
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
      			TYPE: "znpHlnAR_fasterDrone",
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
Class.znpHlnAR_captain = makeMulti('spawner', 2, "Captain", 90)
Class.znpHlnAR_charger = {
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
                TYPE: "znpHlnAR_chargerSetTrap",
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
Class.znpHlnAR_cluster = {
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
                TYPE: "znpHlnAR_clusterMissile",
                STAT_CALCULATOR: "sustained",
            },
        },
    ],
}
Class.znpHlnAR_cog = {
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
                TYPE: "znpHlnAR_autoTrap",
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
                TYPE: "znpHlnAR_autoTrap",
                STAT_CALCULATOR: "trap"
            }
        },
        {
            POSITION: [12, 11, 1, 0, -4.5, -10, 0.5]
        }
    ]
}
Class.znpHlnAR_combo = {
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
Class.znpHlnAR_courser = {
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
Class.znpHlnAR_crowbar = {
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
            TYPE: "znpHlnAR_crowbarGun"
        },
        {
            POSITION: [5.5, 30, 0, 0, 190, 1],
            TYPE: "znpHlnAR_crowbarGun"
        },
        {
            POSITION: [5.5, 40, 0, 0, 190, 1],
            TYPE: "znpHlnAR_crowbarGun"
        }
    ]
}
Class.znpHlnAR_cruiserdrive = {
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
            TYPE: "znpHlnAR_cruiserdriveDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "znpHlnAR_turretedSwarm",
                STAT_CALCULATOR: "swarm",
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "znpHlnAR_turretedSwarm",
                STAT_CALCULATOR: "swarm",
            },
        },
    ],
}
if (desmosAllowed) {
    Class.znpHlnAR_recharger = {
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
Class.znpHlnAR_deathStar = makeMulti({
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
Class.znpHlnAR_dieselTrapper = {
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
                STAT_CALCULATOR: "trap",
            },
        },
    ],
}
Class.znpHlnAR_directorstorm = {
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
            TYPE: "znpHlnAR_directorstormDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [6, 11, 1.3, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone]),
                TYPE: "znpHlnAR_swarmingDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                MAX_CHILDREN: 6,
            },
        },
    ],
}
Class.znpHlnAR_discharger = {
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
Class.znpHlnAR_doperdrive = {
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
      TYPE: "znpHlnAR_turretedFastDrone",
      AUTOFIRE: true,
      SYNCS_SKILLS: true,
      STAT_CALCULATOR: "drone",
      MAX_CHILDREN: 6
    }
  }, {
    POSITION: [3, 3, 0.35, 11, 0, 0, 0]
  }]
}
Class.znpHlnAR_dopeseer = makeMulti({
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
      TYPE: "znpHlnAR_fastDrone",
      AUTOFIRE: true,
      SYNCS_SKILLS: true,
      STAT_CALCULATOR: "drone",
    }
  }, {
    POSITION: [4, 3, 0.35, 11, 0, 0, 0]
  }]
}, 2, "Dopeseer", 90)
Class.znpHlnAR_doubleFlankTwin = makeMulti({
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
Class.znpHlnAR_doubleGunner = makeMulti('gunner', 2)
Class.znpHlnAR_doubleHelix = makeMulti('helix', 2)
Class.znpHlnAR_encircler = {
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
Class.znpHlnAR_enforcer = {
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
Class.znpHlnAR_equalizer = {
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
Class.znpHlnAR_expeller = {
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
Class.znpHlnAR_faucet = {
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
Class.znpHlnAR_foamer = {
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
Class.znpHlnAR_foctillery = {
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
Class.znpHlnAR_foreman = makeMulti({
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
Class.znpHlnAR_forger = {
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
Class.znpHlnAR_foundry = {
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
Class.znpHlnAR_frother = {
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
Class.znpHlnAR_hangar = {
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
Class.znpHlnAR_honchodrive = {
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
Class.znpHlnAR_hurler = {
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
Class.znpHlnAR_hutch = {
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
Class.znpHlnAR_incarcerator = makePenGuard({
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
Class.znpHlnAR_inception = {
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
                TYPE: "znpHlnAR_autoMiniMissile",
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
Class.znpHlnAR_issuer = {
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
      TYPE: "znpHlnAR_fastMinion",
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
Class.znpHlnAR_jalopy = {
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
Class.znpHlnAR_junkie = {
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
      TYPE: "znpHlnAR_fastDrone",
      AUTOFIRE: true,
      SYNCS_SKILLS: true,
      STAT_CALCULATOR: "drone",
      MAX_CHILDREN: 3
    }
  }, {
    POSITION: [3, 3, 0.35, 11, 0, 0, 0]
  }]
}
Class.znpHlnAR_laborer = {
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
Class.znpHlnAR_machineGuard = makeMachineGuard({
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
Class.znpHlnAR_machineMech = {
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
                TYPE: "znpHlnAR_autoTrap",
                STAT_CALCULATOR: "trap",
            },
        },
        {
            POSITION: [11.5, 13, 1.2, 0, 0, 0, 0]
        }
    ]
}
Class.znpHlnAR_mechGuard = makeMechGuard({
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
Class.znpHlnAR_megaHunter = {
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
Class.znpHlnAR_megaSpawner = {
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
                TYPE: "znpHlnAR_pounderMinion",
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
Class.znpHlnAR_megaTrapper = {
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
Class.znpHlnAR_mingler = makeMulti({
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
Class.znpHlnAR_mosey = {
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
                TYPE: "znpHlnAR_fastSwarm",
                STAT_CALCULATOR: "swarm",
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "znpHlnAR_fastSwarm",
                STAT_CALCULATOR: "swarm",
            },
        },{
    POSITION: [8, 3, 0.35, 7, -4, 0, 0]
  }, {
    POSITION: [8, 3, 0.35, 7, 4, 0, 0]
  },
    ], 
}
Class.znpHlnAR_operator = {
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
                TYPE: "znpHlnAR_autoTrap",
                STAT_CALCULATOR: "trap"
            }
        },
        {
            POSITION: [12, 11, 1, 0, 0, 0, 0]
        }
    ]
}
Class.znpHlnAR_peashooter = makeSwarming('trapGuard', "Peashooter")
Class.znpHlnAR_pentaseer = {
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
Class.znpHlnAR_pitcher = {
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
                TYPE: "znpHlnAR_pitcherMissile",
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
Class.znpHlnAR_prober = {
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
Class.znpHlnAR_productionist = {
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
Class.znpHlnAR_projector = {
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
                TYPE: "znpHlnAR_projectorMissile",
                STAT_CALCULATOR: "sustained",
            },
        },
    ],
}
Class.znpHlnAR_quadAngle = {
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
Class.znpHlnAR_queller = {
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
Class.znpHlnAR_railgun = {
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
Class.znpHlnAR_rimfire = {
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
Class.znpHlnAR_slinker = {
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
Class.znpHlnAR_sniper3 = {
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
      TYPE: "znpHlnAR_sniper3Gun",
    },
    {
      POSITION: [13, 8, 0, 120, 170, 0],
      TYPE: "znpHlnAR_sniper3Gun",
    },
    {
      POSITION: [13, 8, 0, 240, 170, 0],
      TYPE: "znpHlnAR_sniper3Gun",
    },
  ],
}
Class.znpHlnAR_spawnerdrive = {
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
      TYPE: "znpHlnAR_turretedMinion",
      STAT_CALCULATOR: "drone",
      AUTOFIRE: true,
      SYNCS_SKILLS: true
    }
  }, {
    POSITION: [11.5, 12, 1, 0, 0, 0, 0]
  }]
}
Class.znpHlnAR_splitShot = {
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
Class.znpHlnAR_stall = {
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
Class.znpHlnAR_stormer = {
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
Class.znpHlnAR_subverter = {
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
Class.znpHlnAR_triHealer = makeMulti({
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
Class.znpHlnAR_triMachine = makeMulti('znpHlnAR_machineTrapper', 3, "Tri-Machine")
Class.znpHlnAR_triMech = makeMulti('znpHlnAR_mech', 3, "Tri-Mech")
Class.znpHlnAR_triPen = makeMulti('znpHlnAR_pen', 3, "Tri-Pen")
Class.znpHlnAR_triTrapGuard = makeTriGuard({
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
Class.znpHlnAR_underdrive = makeMulti({
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
                TYPE: "znpHlnAR_turretedSunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "necro",
            }
        }
    ]
}, 2, "Underdrive", 90)
Class.znpHlnAR_volley = {
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
Class.znpHlnAR_waarrk = {
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
Class.znpHlnAR_warkwark = makeMulti({
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
                STAT_CALCULATOR: "trap",
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
                STAT_CALCULATOR: "trap",
            },
        },
    ],
}, 2, "Warkwark")
Class.znpHlnAR_widget = {
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
Class.znpHlnAR_zipper = {
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

// Tier 3 bird tanks
Class.znpHlnAR_defect = makeBird('tripleShot', "Defect")
Class.znpHlnAR_cockatiel = makeBird('znpHlnAR_pen', "Cockatiel")

// Tier 3 hybrid tanks
Class.znpHlnAR_coalesce = makeOver('znpHlnAR_wark', "Coalesce", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_cobbler = makeOver('znpHlnAR_mech', "Cobbler", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_current = makeOver('volute', "Current", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_deviation = makeOver('znpHlnAR_machineTrapper', "Deviation", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_fashioner = makeOver('builder', "Fashioner", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_force = makeOver('artillery', "Force", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_heaver = makeOver('launcher', "Heaver", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_hitman = makeOver('assassin', "Hitman", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_integrator = makeOver('triAngle', "Integrator", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_interner = makeOver('znpHlnAR_pen', "Interner", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_polluter = makeOver('znpHlnAR_diesel', "Polluter", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_shower = makeOver('sprayer', "Shower", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_spiral = makeOver('helix', "Spiral", {count: 1, independent: true, cycle: false})

// Tier 3 auto tanks
Class.znpHlnAR_autoAuto3 = makeAuto('auto3')
Class.znpHlnAR_autoArtillery = makeAuto('artillery')
Class.znpHlnAR_autoDestroyer = makeAuto('destroyer')
Class.znpHlnAR_autoDiesel = makeAuto('znpHlnAR_diesel')
Class.znpHlnAR_autoDirectordrive = makeAuto({
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
}, "Auto-Directordrive", { type: "znpHlnAR_driveAutoTurret", size: 9 });
Class.znpHlnAR_autoDoper = makeAuto('znpHlnAR_doper')
Class.znpHlnAR_autoHelix = makeAuto('helix')
Class.znpHlnAR_autoHexaTank = makeAuto('hexaTank')
Class.znpHlnAR_autoHoncho = makeAuto('znpHlnAR_honcho')
Class.znpHlnAR_autoHunter = makeAuto('hunter')
Class.znpHlnAR_autoLauncher = makeAuto('launcher')
Class.znpHlnAR_autoMachineTrapper = makeAuto('znpHlnAR_machineTrapper')
Class.znpHlnAR_autoMech = makeAuto('znpHlnAR_mech')
Class.znpHlnAR_autoMinigun = makeAuto('minigun')
Class.znpHlnAR_autoPen = makeAuto('znpHlnAR_pen')
Class.znpHlnAR_autoRifle = makeAuto('rifle')
Class.znpHlnAR_autoSprayer = makeAuto('sprayer')
Class.znpHlnAR_autoTrapGuard = makeAuto('trapGuard')
Class.znpHlnAR_autoTripleShot = makeAuto('tripleShot')
Class.znpHlnAR_autoUnderseer = makeAuto('underseer')
Class.znpHlnAR_autoVolute = makeAuto('volute')
Class.znpHlnAR_autoWark = makeAuto('znpHlnAR_wark')

// Tier 4 tanks
Class.znpHlnAR_bentTriple = makeMulti({
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
Class.znpHlnAR_birdOfPrey = makeFighter('phoenix', "Bird of Prey")
Class.znpHlnAR_blitz = makeFighter('bomber', "Blitz")
Class.znpHlnAR_boxer = {
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
Class.znpHlnAR_brawler = makeFighter('booster', "Brawler")
Class.znpHlnAR_cleft = makeMulti({
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
Class.znpHlnAR_cockatoo = makeFighter('znpHlnAR_cockatiel', "Cockatoo")
Class.znpHlnAR_coordinator = {
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
Class.znpHlnAR_griffin = makeFighter('eagle', "Griffin")
Class.znpHlnAR_hewnTriple = {
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
Class.znpHlnAR_mangle = makeFighter('znpHlnAR_defect', "Mangle")
Class.znpHlnAR_pug = makeOver('fighter', "Pug", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_quadTwin = makeMulti({
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
Class.znpHlnAR_shocker = makeFighter('vulture', "Shocker")
Class.znpHlnAR_skewnDouble = {
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
Class.znpHlnAR_sparrow = makeFighter('falcon', "Sparrow")
Class.znpHlnAR_strider = makeSurfer('fighter', "Strider")
Class.znpHlnAR_ternion = makeMulti({
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
Class.znpHlnAR_triFrother = makeMulti({
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
Class.znpHlnAR_tripleFlankTwin = makeMulti({
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
Class.znpHlnAR_tripleGunner = makeMulti('gunner', 3)
Class.znpHlnAR_tripleHelix = makeMulti('helix', 3)
Class.znpHlnAR_warkwarkwark = makeMulti({
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
                STAT_CALCULATOR: "trap",
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
                STAT_CALCULATOR: "trap",
            },
        },
    ],
}, 2, "Warkwarkwark")
Class.znpHlnAR_adderall = { 
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
      			TYPE: "znpHlnAR_fastestDrone",
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
Class.znpHlnAR_vortex = {
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
            TYPE: "znpHlnAR_vortexDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [6, 11, 1.3, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone]),
                TYPE: "znpHlnAR_superSwarmingDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                MAX_CHILDREN: 6,
            },
        },
    ],
}

// Tier 4 hybrid tanks
Class.znpHlnAR_abberation = makeOver('znpHlnAR_frother', "Abberation", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_gusher = makeOver('znpHlnAR_foamer', "Gusher", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_hose = makeOver('redistributor', "Hose", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_pressureWasher = makeOver('focal', "Pressure Washer", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_raincloud = makeOver('znpHlnAR_faucet', "Raincloud", {count: 1, independent: true, cycle: false})
Class.znpHlnAR_sprinkler = makeOver('atomizer', "Sprinkler", {count: 1, independent: true, cycle: false})

// Tier 4 over tanks
Class.znpHlnAR_oversprayer = makeOver('sprayer')

// Tier 4 bird tanks
Class.znpHlnAR_aethon = makeBird('znpHlnAR_foamer', "Aethon")
Class.znpHlnAR_alicanto = makeBird('focal', "Alicanto")
Class.znpHlnAR_avian = makeBird('single', "Avian")
Class.znpHlnAR_erne = makeBird('artillery', "Erne")
Class.znpHlnAR_harrier = makeBird('destroyer', "Harrier")
Class.znpHlnAR_nymph = makeBird('redistributor', "Nymph")
Class.znpHlnAR_owl = makeBird('stalker', "Owl")
Class.znpHlnAR_pamola = makeBird('znpHlnAR_frother', "Pamola")
Class.znpHlnAR_peregrine = makeBird('ranger', "Peregrine")
Class.znpHlnAR_seriemas = makeBird('launcher', "Seriemas")
Class.znpHlnAR_simurgh = makeBird('znpHlnAR_faucet', "Simurgh")
Class.znpHlnAR_sirin = makeBird('znpHlnAR_stormer', "Sirin")
Class.znpHlnAR_ziz = makeBird('atomizer', "Ziz")

// Tier 4 superbird tanks
Class.znpHlnAR_firebird = makeSuperbird('sprayer', "Firebird")

// Tier 4 auto tanks
Class.znpHlnAR_auto = makeAuto('znpHlnAR_placeholder')
Class.znpHlnAR_autoAtomizer = makeAuto('atomizer')
Class.znpHlnAR_autoBooster = makeAuto('booster')
Class.znpHlnAR_autoBentDouble = makeAuto('bentDouble')
Class.znpHlnAR_autoDoubleFlankTwin = makeAuto('znpHlnAR_doubleFlankTwin')
Class.znpHlnAR_autoDoubleGunner = makeAuto('znpHlnAR_doubleGunner')
Class.znpHlnAR_autoDoubleHelix = makeAuto('znpHlnAR_doubleHelix')
Class.znpHlnAR_autoEagle = makeAuto('eagle')
Class.znpHlnAR_autoFaucet = makeAuto('znpHlnAR_faucet')
Class.znpHlnAR_autoFighter = makeAuto('fighter')
Class.znpHlnAR_autoFoamer = makeAuto('znpHlnAR_foamer')
Class.znpHlnAR_autoFocal = makeAuto('focal')
Class.znpHlnAR_autoFrother = makeAuto('znpHlnAR_frother')
Class.znpHlnAR_autoHewnDouble = makeAuto('hewnDouble')
Class.znpHlnAR_autoPhoenix = makeAuto('phoenix')
Class.znpHlnAR_autoRedistributor = makeAuto('redistributor')
Class.znpHlnAR_autoShower = makeAuto('znpHlnAR_shower')
Class.znpHlnAR_autoStormer = makeAuto('znpHlnAR_stormer')
Class.znpHlnAR_autoTripleTwin = makeAuto('tripleTwin')
Class.znpHlnAR_autoWarkwark = makeAuto('znpHlnAR_warkwark')

// Tier 4 mega auto tanks
Class.znpHlnAR_megaAutoDouble = makeMegaAuto('doubleTwin', "Mega Auto-Double")
Class.znpHlnAR_megaAutoSprayer = makeMegaAuto('sprayer')

// Tier 4 triple auto tanks
Class.znpHlnAR_tripleAutoDouble = makeTripleAuto('doubleTwin', "Triple Auto-Double")
Class.znpHlnAR_tripleAutoSprayer = makeTripleAuto('sprayer')


// Upgrade paths
Class.basic.UPGRADES_TIER_3 = ["single"]
    Class.single.UPGRADES_TIER_3 = ["znpHlnAR_placeholder", "znpHlnAR_placeholder", "znpHlnAR_placeholder", "znpHlnAR_ternion", "znpHlnAR_placeholder", "znpHlnAR_coordinator", "znpHlnAR_placeholder", "znpHlnAR_placeholder", "znpHlnAR_placeholder", "znpHlnAR_placeholder", "znpHlnAR_placeholder", "znpHlnAR_placeholder"]
    Class.twin.UPGRADES_TIER_2.push("znpHlnAR_wark")
        Class.twin.UPGRADES_TIER_3.splice(1, 1) // remove bulwark
        Class.doubleTwin.UPGRADES_TIER_3.push("znpHlnAR_doubleFlankTwin", "znpHlnAR_doubleGunner", "znpHlnAR_doubleHelix", "znpHlnAR_warkwark")
            Class.tripleTwin.UPGRADES_TIER_3 = ["znpHlnAR_quadTwin", "znpHlnAR_autoTripleTwin", "znpHlnAR_bentTriple", "znpHlnAR_hewnTriple", "znpHlnAR_tripleFlankTwin", "znpHlnAR_tripleGunner", "znpHlnAR_warkwarkwark", "znpHlnAR_tripleHelix"]
            Class.autoDouble.UPGRADES_TIER_3 = ["znpHlnAR_megaAutoDouble", "znpHlnAR_tripleAutoDouble", "znpHlnAR_autoTripleTwin", "znpHlnAR_autoHewnDouble", "znpHlnAR_autoBentDouble", "znpHlnAR_autoDoubleFlankTwin", "znpHlnAR_autoDoubleGunner", "znpHlnAR_autoWarkwark", "znpHlnAR_autoDoubleHelix"]
        Class.tripleShot.UPGRADES_TIER_3.push("znpHlnAR_splitShot", "znpHlnAR_autoTripleShot", "znpHlnAR_bentGunner", "znpHlnAR_bentMinigun", "znpHlnAR_defect", "znpHlnAR_waarrk")
    Class.sniper.UPGRADES_TIER_3.push("znpHlnAR_railgun")
        Class.assassin.UPGRADES_TIER_3.splice(4, 1) // remove single
        Class.assassin.UPGRADES_TIER_3.push("znpHlnAR_buttbuttin", "znpHlnAR_hitman", "znpHlnAR_sniper3", "znpHlnAR_enforcer", "znpHlnAR_courser")
        Class.hunter.UPGRADES_TIER_3.push("znpHlnAR_autoHunter", "znpHlnAR_megaHunter", "znpHlnAR_prober", "znpHlnAR_courser")
        Class.rifle.UPGRADES_TIER_3.push("znpHlnAR_autoRifle", "znpHlnAR_enforcer", "znpHlnAR_prober")
    Class.machineGun.UPGRADES_TIER_2.push("znpHlnAR_diesel", "znpHlnAR_machineTrapper")
        Class.minigun.UPGRADES_TIER_3.push("znpHlnAR_subverter", "znpHlnAR_zipper", "znpHlnAR_bentMinigun", "znpHlnAR_autoMinigun", "znpHlnAR_widget")
        Class.gunner.UPGRADES_TIER_3.push("znpHlnAR_battery", "znpHlnAR_buttbuttin", "znpHlnAR_blower", "znpHlnAR_rimfire", "znpHlnAR_volley", "znpHlnAR_doubleGunner", "znpHlnAR_bentGunner", "znpHlnAR_equalizer")
        Class.sprayer.UPGRADES_TIER_3.push("znpHlnAR_frother", "znpHlnAR_foamer", "znpHlnAR_faucet", "znpHlnAR_shower", "znpHlnAR_autoSprayer", "znpHlnAR_stormer")
            Class.znpHlnAR_autoSprayer.UPGRADES_TIER_3 = ["znpHlnAR_megaAutoSprayer", "znpHlnAR_tripleAutoSprayer", "znpHlnAR_autoRedistributor", "znpHlnAR_autoPhoenix", "znpHlnAR_autoAtomizer", "znpHlnAR_autoFocal", "znpHlnAR_autoFrother", "znpHlnAR_autoFoamer", "znpHlnAR_autoFaucet", "znpHlnAR_autoShower", "znpHlnAR_autoStormer"]
        Class.znpHlnAR_diesel.UPGRADES_TIER_3 = ["znpHlnAR_jalopy", "machineGunner", "znpHlnAR_dieselTrapper", "znpHlnAR_polluter", "znpHlnAR_autoDiesel", "znpHlnAR_foamer"]
    Class.flankGuard.UPGRADES_TIER_3 = ["znpHlnAR_ternion"]
        Class.hexaTank.UPGRADES_TIER_3.push("znpHlnAR_deathStar", "znpHlnAR_autoHexaTank", "znpHlnAR_mingler", "znpHlnAR_combo")
        Class.triAngle.UPGRADES_TIER_3.push("znpHlnAR_cockatiel", "znpHlnAR_integrator", "znpHlnAR_defect", "znpHlnAR_quadAngle")
        Class.auto3.UPGRADES_TIER_3.push("znpHlnAR_sniper3", "znpHlnAR_crowbar", "znpHlnAR_autoAuto3", "znpHlnAR_combo")
    Class.director.UPGRADES_TIER_2.push("znpHlnAR_directordrive", "znpHlnAR_honcho", "znpHlnAR_doper")
        Class.director.UPGRADES_TIER_3.splice(1, 1) // remove big cheese
            Class.director.UPGRADES_TIER_3.push("znpHlnAR_coordinator")
        Class.overseer.UPGRADES_TIER_3.splice(2, 1) // remove overgunner
        Class.overseer.UPGRADES_TIER_3.splice(1, 1) // remove overtrapper
        Class.overseer.UPGRADES_TIER_3.push("znpHlnAR_captain", "znpHlnAR_foreman", "znpHlnAR_dopeseer")
        Class.cruiser.UPGRADES_TIER_3.push("znpHlnAR_productionist", "znpHlnAR_cruiserdrive", "znpHlnAR_hangar", "znpHlnAR_zipper", "znpHlnAR_baltimore", "znpHlnAR_mosey")
        Class.underseer.UPGRADES_TIER_3.push("znpHlnAR_autoUnderseer", "znpHlnAR_underdrive", "znpHlnAR_pentaseer")
        Class.spawner.UPGRADES_TIER_3.push("znpHlnAR_megaSpawner", "znpHlnAR_productionist", "znpHlnAR_spawnerdrive", "znpHlnAR_captain", "znpHlnAR_hangar", "znpHlnAR_laborer", "znpHlnAR_foundry", "znpHlnAR_issuer")
        Class.znpHlnAR_directordrive.UPGRADES_TIER_3 = ["znpHlnAR_directorstorm", "overdrive", "znpHlnAR_cruiserdrive", "znpHlnAR_underdrive", "znpHlnAR_spawnerdrive", "znpHlnAR_autoDirectordrive", "znpHlnAR_honchodrive", "znpHlnAR_doperdrive"]
        Class.znpHlnAR_honcho.UPGRADES_TIER_3 = ["znpHlnAR_foreman", "znpHlnAR_baltimore", "znpHlnAR_foundry", "bigCheese", "znpHlnAR_autoHoncho", "znpHlnAR_honchodrive", "znpHlnAR_junkie"]
        Class.znpHlnAR_doper.UPGRADES_TIER_3 = ["znpHlnAR_brisker", "znpHlnAR_dopeseer", "znpHlnAR_mosey", "znpHlnAR_issuer", "znpHlnAR_junkie", "znpHlnAR_doperdrive", "znpHlnAR_autoDoper"]
    Class.pounder.UPGRADES_TIER_3.push("znpHlnAR_subverter")
        Class.destroyer.UPGRADES_TIER_3.push("znpHlnAR_blower", "znpHlnAR_megaTrapper", "znpHlnAR_queller", "znpHlnAR_autoDestroyer", "znpHlnAR_hurler", "znpHlnAR_slinker")
        Class.artillery.UPGRADES_TIER_3.push("znpHlnAR_queller", "znpHlnAR_forger", "znpHlnAR_force", "znpHlnAR_autoArtillery", "znpHlnAR_foctillery", "znpHlnAR_discharger")
        if (desmosAllowed) {
          Class.artillery.UPGRADES_TIER_3.push("znpHlnAR_recharger")
        }
        Class.launcher.UPGRADES_TIER_3.push("znpHlnAR_pitcher", "znpHlnAR_cluster", "znpHlnAR_projector", "znpHlnAR_heaver", "znpHlnAR_autoLauncher", "znpHlnAR_hurler", "znpHlnAR_inception")
    Class.trapper.UPGRADES_TIER_2.push("znpHlnAR_pen", "znpHlnAR_mech", "znpHlnAR_machineTrapper", "znpHlnAR_wark")
        Class.trapper.UPGRADES_TIER_3.splice(0, 1) // remove barricade
        Class.trapper.UPGRADES_TIER_3.push("znpHlnAR_megaTrapper")
        Class.builder.UPGRADES_TIER_3.push("znpHlnAR_forger", "znpHlnAR_stall", "znpHlnAR_fashioner", "znpHlnAR_charger")
        Class.triTrapper.UPGRADES_TIER_3.push("znpHlnAR_triPen", "znpHlnAR_triMech", "znpHlnAR_triMachine", "znpHlnAR_triTrapGuard")
        Class.trapGuard.UPGRADES_TIER_3.push("znpHlnAR_peashooter", "znpHlnAR_incarcerator", "znpHlnAR_mechGuard", "znpHlnAR_autoTrapGuard", "znpHlnAR_machineGuard", "znpHlnAR_triTrapGuard")
        Class.znpHlnAR_pen.UPGRADES_TIER_3 = ["znpHlnAR_stall", "znpHlnAR_triPen", "znpHlnAR_encircler", "znpHlnAR_incarcerator", "znpHlnAR_operator", "znpHlnAR_cockatiel", "znpHlnAR_hutch", "znpHlnAR_interner", "znpHlnAR_autoPen"]
        Class.znpHlnAR_mech.UPGRADES_TIER_3 = ["engineer", "znpHlnAR_triMech", "znpHlnAR_machineMech", "znpHlnAR_mechGuard", "znpHlnAR_operator", "znpHlnAR_cog", "znpHlnAR_cobbler", "znpHlnAR_autoMech"]
        Class.znpHlnAR_machineTrapper.UPGRADES_TIER_3 = ["znpHlnAR_dieselTrapper", "barricade", "znpHlnAR_equalizer", "znpHlnAR_machineGuard", "znpHlnAR_encircler", "znpHlnAR_machineMech", "znpHlnAR_triMachine", "znpHlnAR_expeller", "znpHlnAR_autoMachineTrapper", "znpHlnAR_deviation", "znpHlnAR_frother"]
        Class.znpHlnAR_wark.UPGRADES_TIER_3 = ["znpHlnAR_warkwark", "znpHlnAR_waarrk", "znpHlnAR_equalizer", "hexaTrapper", "znpHlnAR_hutch", "znpHlnAR_cog", "znpHlnAR_expeller", "bulwark", "znpHlnAR_coalesce", "znpHlnAR_autoWark"]
    // desmos
    if (desmosAllowed) {
        Class.volute.UPGRADES_TIER_3.push("znpHlnAR_recharger", "znpHlnAR_current", "znpHlnAR_autoVolute")
        Class.helix.UPGRADES_TIER_3.push("znpHlnAR_doubleHelix", "znpHlnAR_spiral", "znpHlnAR_autoHelix")
    }
    if (desmosAllowed === false) {
        Class.basic.UPGRADES_TIER_1.splice(7, 1) // remove desmos
    }

// WIP Upgrade paths
Class.hewnDouble.UPGRADES_TIER_3 = [
    "znpHlnAR_hewnTriple",
    "znpHlnAR_autoHewnDouble",
    "znpHlnAR_cleft",
    "znpHlnAR_skewnDouble",
    "znpHlnAR_placeholder",//"znpHlnAR_hewnFlankDouble",
    "znpHlnAR_placeholder",//"znpHlnAR_hewnGunner",
    "znpHlnAR_placeholder",//"znpHlnAR_warkwawarkrk",
]
Class.znpHlnAR_doubleHelix.UPGRADES_TIER_3 = [
    "znpHlnAR_tripleHelix",
    "znpHlnAR_autoDoubleHelix",
]

Class.redistributor.UPGRADES_TIER_3 = [
    "znpHlnAR_placeholder",
    "znpHlnAR_nymph",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_hose",
    "znpHlnAR_placeholder",
    "znpHlnAR_autoRedistributor",
    "znpHlnAR_placeholder",
]
Class.phoenix.UPGRADES_TIER_3 = [
    "znpHlnAR_firebird",
    "znpHlnAR_birdOfPrey",
    "znpHlnAR_nymph",
    "znpHlnAR_ziz",
    "znpHlnAR_alicanto",
    "znpHlnAR_pamola",
    "znpHlnAR_aethon",
    "znpHlnAR_simurgh",
    "znpHlnAR_autoPhoenix",
    "znpHlnAR_sirin",
]
Class.atomizer.UPGRADES_TIER_3 = [
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_ziz",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_sprinkler",
    "znpHlnAR_placeholder",
    "znpHlnAR_autoAtomizer",
    "znpHlnAR_placeholder",
]
Class.focal.UPGRADES_TIER_3 = [
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_alicanto",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_pressureWasher",
    "znpHlnAR_placeholder",
    "znpHlnAR_autoFocal",
    "znpHlnAR_placeholder",
]
Class.znpHlnAR_frother.UPGRADES_TIER_3 = [
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_triFrother",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_pamola",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_abberation",
    "znpHlnAR_placeholder",
    "znpHlnAR_autoFrother",
    "znpHlnAR_placeholder",
]
Class.znpHlnAR_foamer.UPGRADES_TIER_3 = [
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_aethon",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_gusher",
    "znpHlnAR_autoFoamer",
    "znpHlnAR_placeholder",
]
Class.znpHlnAR_faucet.UPGRADES_TIER_3 = [
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_simurgh",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_raincloud",
    "znpHlnAR_placeholder",
    "znpHlnAR_autoFaucet",
    "znpHlnAR_placeholder",
]
Class.znpHlnAR_shower.UPGRADES_TIER_3 = [
    "znpHlnAR_oversprayer",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_hose",
    "znpHlnAR_sprinkler",
    "znpHlnAR_pressureWasher",
    "znpHlnAR_abberation",
    "znpHlnAR_gusher",
    "znpHlnAR_raincloud",
    "znpHlnAR_autoShower",
    "znpHlnAR_placeholder",
]
Class.znpHlnAR_stormer.UPGRADES_TIER_3 = [
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_sirin",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_placeholder",
    "znpHlnAR_autoStormer",
]

Class.smasher.UPGRADES_TIER_3.push(
    "znpHlnAR_placeholder",//"znpHlnAR_bonker",
    "znpHlnAR_placeholder",//"znpHlnAR_banger",
    "znpHlnAR_placeholder",//"znpHlnAR_drifter",
)

Class.healer.UPGRADES_TIER_3.splice(3, 1) // remove paramedic
Class.healer.UPGRADES_TIER_3.splice(2, 1) // remove surgeon
Class.healer.UPGRADES_TIER_3.splice(1, 1) // remove ambulance
Class.healer.UPGRADES_TIER_3.push(
    "znpHlnAR_placeholder",//"znpHlnAR_scientist",
    "znpHlnAR_placeholder",//"znpHlnAR_nurse",
    "znpHlnAR_triHealer",
    "znpHlnAR_placeholder",//"znpHlnAR_analyzer",
    "znpHlnAR_placeholder",//"znpHlnAR_psychiatrist",
    "znpHlnAR_placeholder",//"znpHlnAR_soother",
)
if (noUndertow) {
    Class.desmos.UPGRADES_TIER_2.splice(1, 1)
}
Class.znpHlnAR_directorstorm.UPGRADES_TIER_3 = ["znpHlnAR_vortex"]

// DEBUG
const addHealerToMain = false
if (addHealerToMain) {
Class.basic.UPGRADES_TIER_2.push("healer")
Class.twin.UPGRADES_TIER_3.push("znpHlnAR_placeholder"/*"znpHlnAR_nurse"*/)
Class.sniper.UPGRADES_TIER_3.push("medic")
Class.machineGun.UPGRADES_TIER_3 = ["znpHlnAR_placeholder"/*"znpHlnAR_psychiatrist"*/]
Class.flankGuard.UPGRADES_TIER_3.push("znpHlnAR_triHealer")
Class.director.UPGRADES_TIER_3.push("znpHlnAR_placeholder"/*"znpHlnAR_soother"*/)
Class.pounder.UPGRADES_TIER_3.push("znpHlnAR_placeholder"/*"znpHlnAR_analyzer"*/)
Class.trapper.UPGRADES_TIER_3.push("znpHlnAR_placeholder"/*"znpHlnAR_scientist"*/)
//Class.smasher.UPGRADES_TIER_3.push("znpHlnAR_placeholder"/*"znpHlnAR_physician"*/)
//Class.single.UPGRADES_TIER_3.push("znpHlnAR_placeholder"/*"znpHlnAR_renovater"*/)
}
