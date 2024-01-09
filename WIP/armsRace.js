const { dereference, combineStats, makeDeco, makeAuto, makeBird, makeHybrid, makeMulti, makeSwarming, addBackGunner } = require('../facilitators.js');
const { base, gunCalcNames, statnames, dfltskl, smshskl } = require('../constants.js');
const g = require('../gunvals.js');
Class.znpAR_placeholder = {
	LABEL: "PLACEHOLDER",
	COLOR: "black",
	UPGRADE_COLOR: "black",
}


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

// Auto-Functions
const makeMegaAuto = (type, name = -1, options = {}) => {
    type = ensureIsClass(type);
    let turret = {
        type: "megaAutoTurret",
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
const makeFast = (type, mult = 1.2, name = -1) => {
    type = ensureIsClass(type);
    let output = dereference(type);
    if (output.BODY.SPEED) output.BODY.SPEED = base.SPEED;
    output.BODY.SPEED *= mult;
    output.LABEL = name == -1 ? output.LABEL : name;
    return output;
}

// Drones
Class.znpAR_fastDrone = makeFast('drone')
Class.znpAR_turretedSwarm = makeAuto('swarm', "Auto-Swarm", {type: 'droneAutoTurret'})
Class.znpAR_turretedSunchip = makeAuto('sunchip', "Auto-Sunchip", {type: 'droneAutoTurret'})
Class.znpAR_turretedMinion = makeAuto('minion', "Auto-Minion", {type: 'droneAutoTurret'})

// Traps
Class.znpAR_autoTrap = makeAuto('trap')

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
      SHOOT_SETTINGS: combineStats([g.drone, { size: 1.35, health: 1.75, speed: 1.125 }]),
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

// Tier 2 upgrade paths
Class.twin.UPGRADES_TIER_2.push(
	"znpAR_wark",
)
Class.machineGun.UPGRADES_TIER_2.push(
	"znpAR_diesel",
	"znpAR_machineTrapper",
)
Class.director.UPGRADES_TIER_2.push(
	"znpAR_directordrive",
	"znpAR_honcho",
	"znpAR_doper",
)
Class.trapper.UPGRADES_TIER_2.push(
	"znpAR_pen",
	"znpAR_mech",
	"znpAR_machineTrapper",
	"znpAR_wark",
)


// Tier 3 tanks
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
Class.znpAR_current = {
    PARENT: "genericTank",
    LABEL: "Current",
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
};

// Tier 3 bird tanks
Class.znpAR_defect = makeBird('tripleShot', "Defect")
Class.znpAR_cockatiel = makeBird('znpAR_pen', "Cockatiel")

// Tier 3 hybrid tanks
Class.znpAR_coalesce = makeHybrid('znpAR_wark', "Coalesce")
Class.znpAR_cobbler = makeHybrid('znpAR_mech', "Cobbler")
Class.znpAR_coil = makeHybrid('volute', "Coil")
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
Class.znpAR_autoHelix = makeAuto('helix')
Class.znpAR_autoHexaTank = makeAuto('hexaTank')
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


// Tier 3 upgrade paths
Class.twin.UPGRADES_TIER_3.splice(1, 1) // remove bulwark
Class.doubleTwin.UPGRADES_TIER_3.push(
	"znpAR_placeholder",//"znpAR_doubleFlankTwin",
	"znpAR_doubleGunner",
	"znpAR_doubleHelix",
	"znpAR_warkwark",
)
Class.tripleShot.UPGRADES_TIER_3.push(
	"znpAR_placeholder",//"znpAR_splitShot",
	"znpAR_autoTripleShot",
	"znpAR_placeholder",//"znpAR_bentGunner",
	"znpAR_bentMinigun",
	"znpAR_defect",
	"znpAR_placeholder",//"znpAR_waarrk",
)

Class.sniper.UPGRADES_TIER_3.push(
	"znpAR_placeholder",//"znpAR_railgun",
)
Class.assassin.UPGRADES_TIER_3.push(
	"znpAR_buttbuttin",
	"znpAR_hitman",
	"znpAR_placeholder",//"znpAR_sniper3",
	"znpAR_placeholder",//"znpAR_enforcer",
	"znpAR_placeholder",//"znpAR_courser",
)
Class.hunter.UPGRADES_TIER_3.push(
	"znpAR_autoHunter",
	"znpAR_placeholder",//"znpAR_megaHunter",
	"znpAR_placeholder",//"znpAR_prober",
	"znpAR_placeholder",//"znpAR_courser",
)
Class.rifle.UPGRADES_TIER_3.push(
	"znpAR_autoRifle",
	"znpAR_placeholder",//"znpAR_enforcer",
	"znpAR_placeholder",//"znpAR_prober",
)

Class.minigun.UPGRADES_TIER_3.push(
	"znpAR_subverter",
	"znpAR_zipper",
	"znpAR_bentMinigun",
	"znpAR_autoMinigun",
	"znpAR_placeholder",//"znpAR_widget",
)
Class.gunner.UPGRADES_TIER_3.push(
	"znpAR_placeholder",//"znpAR_battery",
	"znpAR_buttbuttin",
	"znpAR_blower",
	"znpAR_placeholder",//"znpAR_rimfire",
	"znpAR_placeholder",//"znpAR_volley",
	"znpAR_doubleGunner",
	"znpAR_placeholder",//"znpAR_bentGunner",
	"znpAR_placeholder",//"znpAR_equalizer",
)
Class.sprayer.UPGRADES_TIER_3.push(
	//"znpAR_frother",
	"znpAR_foamer",
	//"znpAR_faucet",
	"znpAR_shower",
	"znpAR_autoSprayer",
	//"znpAR_stormer",
)
Class.znpAR_diesel.UPGRADES_TIER_3 = [
	"znpAR_placeholder",//"znpAR_jalopy",
	"machineGunner",
	"znpAR_dieselTrapper",
	"znpAR_polluter",
	"znpAR_autoDiesel",
	"znpAR_foamer",
]

Class.hexaTank.UPGRADES_TIER_3.push(
	"znpAR_placeholder",//"znpAR_deathStar",
	"znpAR_autoHexaTank",
	"znpAR_placeholder",//"znpAR_mingler",
	"znpAR_placeholder",//"znpAR_combo",
)
Class.triAngle.UPGRADES_TIER_3.push(
	"znpAR_cockatiel",
	"znpAR_integrator",
	"znpAR_defect",
	"znpAR_placeholder",//"znpAR_quadAngle",
)
Class.auto3.UPGRADES_TIER_3.push(
	"znpAR_placeholder",//"znpAR_sniper3",
	"znpAR_placeholder",//"znpAR_crowbar",
	"znpAR_autoAuto3",
	"znpAR_placeholder",//"znpAR_combo",
)

Class.director.UPGRADES_TIER_3.splice(1, 1) // remove big cheese
Class.overseer.UPGRADES_TIER_3.splice(2, 1) // remove overgunner
Class.overseer.UPGRADES_TIER_3.splice(1, 1) // remove overtrapper
Class.overseer.UPGRADES_TIER_3.push(
	"znpAR_placeholder",//"znpAR_captain",
	"znpAR_placeholder",//"znpAR_foreman",
	"znpAR_placeholder",//"znpAR_dopeseer",
)
Class.cruiser.UPGRADES_TIER_3.push(
	"znpAR_placeholder",//"znpAR_productionist",
	"znpAR_placeholder",//"znpAR_cruiserdrive",
	"znpAR_placeholder",//"znpAR_hangar",
	"znpAR_zipper",
	"znpAR_placeholder",//"znpAR_baltimore",
	"znpAR_placeholder",//"znpAR_mosey",
)
Class.underseer.UPGRADES_TIER_3.push(
	"znpAR_autoUnderseer",
	"znpAR_underdrive",
	"znpAR_placeholder",//"znpAR_pentaseer",
)
Class.spawner.UPGRADES_TIER_3.push(
	"znpAR_placeholder",//"znpAR_megaSpawner",
	"znpAR_placeholder",//"znpAR_productionist",
	"znpAR_placeholder",//"znpAR_spawnerdrive",
	"znpAR_placeholder",//"znpAR_captain",
	"znpAR_placeholder",//"znpAR_hangar",
	"znpAR_placeholder",//"znpAR_laborer",
	"znpAR_placeholder",//"znpAR_foundry",
	"znpAR_placeholder",//"znpAR_issuer",
)
Class.znpAR_directordrive.UPGRADES_TIER_3 = [
	"znpAR_placeholder",//"znpAR_directorstorm",
	"overdrive",
	"znpAR_placeholder",//"znpAR_cruiserdrive",
	"znpAR_underdrive",
	"znpAR_placeholder",//"znpAR_spawnerdrive",
	"znpAR_placeholder",//"znpAR_autoDirectordrive",
	"znpAR_placeholder",//"znpAR_honchodrive",
	"znpAR_placeholder",//"znpAR_doperdrive",
]
Class.znpAR_honcho.UPGRADES_TIER_3 = [
	"znpAR_placeholder",//"znpAR_foreman",
	"znpAR_placeholder",//"znpAR_baltimore",
	"znpAR_placeholder",//"znpAR_foundry",
	"bigCheese",
	"znpAR_placeholder",//"znpAR_autoHoncho",
	"znpAR_placeholder",//"znpAR_honchodrive",
	"znpAR_placeholder",//"znpAR_junkie",
]
Class.znpAR_doper.UPGRADES_TIER_3 = [
	"znpAR_placeholder",//"znpAR_brisker",
	"znpAR_placeholder",//"znpAR_dopeseer",
	"znpAR_placeholder",//"znpAR_mosey",
	"znpAR_placeholder",//"znpAR_issuer",
	"znpAR_placeholder",//"znpAR_junkie",
	"znpAR_placeholder",//"znpAR_doperdrive",
	"znpAR_placeholder",//"znpAR_autoDoper",
]

Class.pounder.UPGRADES_TIER_3.push(
	"znpAR_subverter",
)
Class.destroyer.UPGRADES_TIER_3.push(
	"znpAR_blower",
	"znpAR_megaTrapper",
	"znpAR_placeholder",//"znpAR_queller",
	"znpAR_autoDestroyer",
	"znpAR_placeholder",//"znpAR_hurler",
	"znpAR_placeholder",//"znpAR_slinker",
)
Class.artillery.UPGRADES_TIER_3.push(
	"znpAR_placeholder",//"znpAR_queller",
	"znpAR_forger",
	"znpAR_current",
	"znpAR_force",
	"znpAR_autoArtillery",
	"znpAR_placeholder",//"znpAR_foctillery",
	"znpAR_placeholder",//"znpAR_discharger",
)
Class.launcher.UPGRADES_TIER_3.push(
	"znpAR_placeholder",//"znpAR_pitcher",
	"znpAR_placeholder",//"znpAR_cluster",
	"znpAR_placeholder",//"znpAR_projector",
	"znpAR_heaver",
	"znpAR_autoLauncher",
	"znpAR_placeholder",//"znpAR_hurler",
	"znpAR_placeholder",//"znpAR_inception",
)

Class.trapper.UPGRADES_TIER_3.splice(0, 1) // remove barricade
Class.trapper.UPGRADES_TIER_3.push(
	"znpAR_megaTrapper",
)
Class.builder.UPGRADES_TIER_3.push(
	"znpAR_forger",
	"znpAR_stall",
	"znpAR_fashioner",
	"znpAR_placeholder",//"znpAR_charger",
)
Class.triTrapper.UPGRADES_TIER_3.push(
	"znpAR_triPen",
	"znpAR_triMech",
	"znpAR_triMachine",
	"znpAR_triTrapGuard",
)
Class.trapGuard.UPGRADES_TIER_3.push(
	"znpAR_peashooter",
	"znpAR_incarcerator",
	"znpAR_mechGuard",
	"znpAR_autoTrapGuard",
	"znpAR_machineGuard",
	"znpAR_triTrapGuard",
)
Class.znpAR_pen.UPGRADES_TIER_3 = [
	"znpAR_stall",
	"znpAR_triPen",
	"znpAR_encircler",
	"znpAR_incarcerator",
	"znpAR_operator",
	"znpAR_cockatiel",
	"znpAR_hutch",
	"znpAR_interner",
	"znpAR_autoPen",
]
Class.znpAR_mech.UPGRADES_TIER_3 = [
	"engineer",
	"znpAR_triMech",
	"znpAR_machineMech",
	"znpAR_mechGuard",
	"znpAR_operator",
	"znpAR_cog",
	"znpAR_cobbler",
	"znpAR_autoMech",
]
Class.znpAR_machineTrapper.UPGRADES_TIER_3 = [
	"znpAR_dieselTrapper",
	"barricade",
	"znpAR_placeholder",//"znpAR_equalizer",
	"znpAR_machineGuard",
	"znpAR_encircler",
	"znpAR_machineMech",
	"znpAR_triMachine",
	"znpAR_placeholder",//"znpAR_expeller",
	"znpAR_autoMachineTrapper",
	"znpAR_deviation",
]
Class.znpAR_wark.UPGRADES_TIER_3 = [
	"znpAR_warkwark",
	"znpAR_placeholder",//"znpAR_waarrk",
	"znpAR_placeholder",//"znpAR_equalizer",
	"hexaTrapper",
	"znpAR_hutch",
	"znpAR_cog",
	"znpAR_placeholder",//"znpAR_expeller",
	"bulwark",
	"znpAR_coalesce",
	"znpAR_autoWark"
]

Class.volute.UPGRADES_TIER_3.push(
	"znpAR_current",
	"znpAR_coil",
	"znpAR_autoVolute",
)
Class.helix.UPGRADES_TIER_3.push(
	"znpAR_doubleHelix",
	"znpAR_spiral",
	"znpAR_autoHelix",
)

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
	"znpAR_placeholder",//"znpAR_triHealer",
	"znpAR_placeholder",//"znpAR_analyzer",
	"znpAR_placeholder",//"znpAR_psychiatrist",
	"znpAR_placeholder",//"znpAR_soother",
)


return

// Tier 4 tanks [WIP!]
Class.znpAR_birdOfPrey = makeFighter('phoenix', "Bird of Prey")
Class.znpAR_blitz = makeFighter('bomber', "Blitz")
Class.znpAR_boxer = {
    PARENT: "genericTank",
    LABEL: "Boxer",
    BODY: {
        DENSITY: 0.6 * base.DENSITY,
    },
    DANGER: 7,
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
Class.znpAR_cockatoo = makeFighter('znpAR_cockatiel', "Cockatoo")
Class.znpAR_griffin = makeFighter('eagle', "Griffin")
Class.znpAR_mangle = makeFighter('znpAR_defect', "Mangle")
Class.znpAR_pug = makeHybrid('fighter', "Pug")
Class.znpAR_shocker = makeFighter('vulture', "Shocker")
Class.znpAR_sparrow = makeFighter('falcon', "Sparrow")
Class.znpAR_strider = makeSurfer('fighter', "Strider")

// Tier 4 bird tanks
Class.znpAR_alicanto = makeBird('focal', "Alicanto")
Class.znpAR_avian = makeBird('single', "Avian")
Class.znpAR_erne = makeBird('artillery', "Erne")
Class.znpAR_harrier = makeBird('destroyer', "Harrier")
Class.znpAR_nymph = makeBird('redistributor', "Nymph")
Class.znpAR_owl = makeBird('stalker', "Owl")
Class.znpAR_peregrine = makeBird('ranger', "Peregrine")
Class.znpAR_seriemas = makeBird('launcher', "Seriemas")
Class.znpAR_ziz = makeBird('atomizer', "Ziz")

// Tier 4 auto tanks
Class.znpAR_autoBooster = makeAuto('booster')
Class.znpAR_autoEagle = makeAuto('eagle')
Class.znpAR_autoFighter = makeAuto('fighter')

// Tier 4 mega auto tanks
Class.znpAR_megaAutoSprayer = makeMegaAuto('sprayer')

// Tier 4 triple auto tanks
Class.znpAR_tripleAutoSprayer = makeTripleAuto('sprayer')
