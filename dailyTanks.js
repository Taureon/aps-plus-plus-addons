const { dereference, combineStats, makeMulti, makeDeco } = require('../facilitators.js');
const { base, gunCalcNames, statnames } = require('../constants.js');
const g = require('../gunvals.js');

const addToMain = false // you may change it, NOTE: these tanks are OP

// Bullets
Class.masterBullet = {
    PARENT: "missile",
    FACING_TYPE: "veryfastspin",
    MOTION_TYPE: "motor",
    HAS_NO_RECOIL: false,
    DIE_AT_RANGE: false,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront]),
                TYPE: "bullet",
                LABEL: "Front",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [13, 8, 1, 0, -1, 140, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: "Thruster",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [13, 8, 1, 0, 1, 220, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: "Thruster",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: "Thruster",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: "Thruster",
                AUTOFIRE: true,
            },
        },
    ],
}

// Satellites
Class.satellite = { 
    LABEL: "Satellite",
    TYPE: "drone",
    ACCEPTS_SCORE: false,
    DANGER: 2,
    SHAPE: 0,
    LAYER: 13,
    CONTROLLERS: ['orbit'],
    FACING_TYPE: "spin",
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.75,
        HEALTH: 0.3,
        DAMAGE: 3.375,
        SPEED: 10,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.5,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
    MOTION_TYPE: 'motor'
}
Class.squareSatellite = {
    PARENT: "satellite",
    SHAPE: 4
}

// Turrets
Class.lamgSpinnerTurret = makeMulti({
    PARENT: "genericTank",
    LABEL: "Spinner Turret",
    GUNS: [
        {
            POSITION: [15, 3.5, 1, 0, 0, 0, 0]
        }
    ]
}, 10)

// Decorations
Class.whirlwindDeco = makeDeco(6)
Class.whirlwindDeco.CONTROLLERS = [["spin", { independent: true, speed: 0.128 }]]
Class.tornadoDeco = makeDeco(4);
Class.tornadoDeco.CONTROLLERS = [["spin", { independent: true, speed: 0.128 }]];
Class.megaTornadoDeco = makeDeco([[0,-1],[0.5,0],[0,1],[-0.5,0]])
Class.megaTornadoDeco.CONTROLLERS = [["spin", { independent: true }]];
Class.tempestDeco1 = makeDeco(3);
Class.tempestDeco1.CONTROLLERS = [["spin", { independent: true, speed: 0.128 }]];
Class.tempestDeco2 = makeDeco(3);
Class.tempestDeco2.CONTROLLERS = [["spin", { independent: true, speed: -0.128 }]];
Class.thunderboltDeco = makeDeco(4);
Class.thunderboltDeco.CONTROLLERS = [["spin", { independent: true, speed: 0.16 }]];
Class.hurricaneDeco = makeDeco(8);
Class.hurricaneDeco.CONTROLLERS = [["spin", { independent: true, speed: 0.128 }]];
Class.typhoonDeco = makeDeco(10);
Class.typhoonDeco.CONTROLLERS = [["spin", { independent: true, speed: 0.128 }]];
Class.blizzardDeco1 = makeDeco(5);
Class.blizzardDeco1.CONTROLLERS = [["spin", { independent: true, speed: 0.128 }]];
Class.blizzardDeco2 = makeDeco(5);
Class.blizzardDeco2.CONTROLLERS = [["spin", { independent: true, speed: -0.128 }]];

// December 13th - Whirlwind
Class.whirlwind = {
    PARENT: "genericTank",
    LABEL: "Whirlwind",
    ANGLE: 60,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.whirlwind,
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
            TYPE: "whirlwindDeco"
        }
    ],
    AI: {
        SPEED: 2, 
    }, 
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 6; i++) { 
            output.push({ 
                POSITION: {WIDTH: 8, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite]), 
                    TYPE: ["satellite", {ANGLE: i * 60}], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        return output
    })()
}

// Whirlwind upgrades
Class.tornado = {
    PARENT: "genericTank",
    LABEL: "Tornado",
    DANGER: 6,
    TURRETS: [
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
    ],
    ANGLE: 90,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.whirlwind,
    AI: {
        SPEED: 2, 
    }, 
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 4; i++) { 
            output.push({ 
                POSITION: {WIDTH: 12, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite, g.pounder]), 
                    TYPE: ["satellite", {ANGLE: i * 90}], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        return output
    })()
}
Class.hurricane = {
    PARENT: ["genericTank"],
    LABEL: "Hurricane",
    DANGER: 6,
    ANGLE: 45,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.whirlwind,
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
            TYPE: "hurricaneDeco",
        },
    ],
    AI: {
        SPEED: 2, 
    }, 
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 8; i++) { 
            output.push({ 
                POSITION: {WIDTH: 8, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite]), 
                    TYPE: ["satellite", {ANGLE: i * 45}], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        return output
    })()
}
Class.hexaWhirl = {
    PARENT: ["genericTank"],
    LABEL: "Hexa Whirl",
    DANGER: 7,
    ANGLE: 45,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.mixed,
    AI: {
        SPEED: 2, 
    }, 
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
    ],
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
        {
            POSITION: [18, 8, 1, 0, 0, 60, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 300, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["satellite", {ANGLE: 0}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0.25},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["satellite", {ANGLE: 90}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0.25},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["satellite", {ANGLE: 180}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0.25},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["satellite", {ANGLE: 270}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        }
    ],
}
Class.munition = {
    PARENT: ["genericTank"],
    DANGER: 7,
    LABEL: "Munition",
    ANGLE: 45,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.mixed,
    AI: {
        SPEED: 2,
    },
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [17, 3, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 3, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.artillery]),
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
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["satellite", {ANGLE: 0}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0.25},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["satellite", {ANGLE: 90}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0.25},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["satellite", {ANGLE: 180}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0.25},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["satellite", {ANGLE: 270}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        }
    ],
}
Class.whirl3 = {
    PARENT: "genericTank",
    LABEL: "Whirl-3",
    DANGER: 7,
    FACING_TYPE: "autospin",
    ANGLE: 90,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.mixed,
    AI: {
        SPEED: 2,
    },
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
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
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 4; i++) { 
            output.push({ 
                POSITION: {WIDTH: 8, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite]), 
                    TYPE: ["satellite", {ANGLE: i * 90}], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true,
                    HAS_NO_RECOIL: true
                }
            }) 
        }
        return output
    })()
}
Class.whirlGuard = {
    PARENT: ["genericTank"],
    LABEL: "Whirl Guard",
    ANGLE: 45,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.mixed,
    AI: {
        SPEED: 2,
    },
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
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
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["satellite", {ANGLE: 0}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0.25},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["satellite", {ANGLE: 90}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0.25},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["satellite", {ANGLE: 180}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0.25},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["satellite", {ANGLE: 270}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        }
    ],
}
Class.prophet = {
    PARENT: ["genericTank"],
    LABEL: "Prophet",
    DANGER: 7,
    ANGLE: 45,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.mixed,
    BODY: {
        SPEED: 0.9 * base.SPEED,
    },
    AI: {
        SPEED: 2,
    },
    SHAPE: 4,
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
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
                MAX_CHILDREN: 7,
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
                MAX_CHILDREN: 7,
            },
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["squareSatellite", {ANGLE: 0}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0.25},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["squareSatellite", {ANGLE: 90}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0.25},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["squareSatellite", {ANGLE: 180}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0.25},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["squareSatellite", {ANGLE: 270}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        }
    ],
}
Class.vortex = {
    PARENT: ["genericTank"],
    LABEL: "Vortex",
    BODY: {
        FOV: base.FOV * 1.1,
    },
    ANGLE: 45,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.mixed,
    AI: {
        SPEED: 2,
    },
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
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
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery]),
                TYPE: "minimissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["satellite", {ANGLE: 0}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0.25},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["satellite", {ANGLE: 90}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0.25},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["satellite", {ANGLE: 180}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        },
        {
            POSITION: {WIDTH: 8, LENGTH: 1, DELAY: 0.25},
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.satellite]), 
                TYPE: ["satellite", {ANGLE: 270}], 
                MAX_CHILDREN: 1,   
                AUTOFIRE: true,  
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                HAS_NO_RECOIL: true
            }
        }
    ],
}

// Tornado upgrades
Class.megaTornado = {
    PARENT: "genericTank",
    LABEL: "Mega Tornado",
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [16, 0, 0, 0, 360, 1],
            TYPE: "megaTornadoDeco",
        },
    ],
    ANGLE: 180,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.whirlwind,
    AI: {
        SPEED: 2, 
    }, 
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 2; i++) { 
            output.push({ 
                POSITION: {WIDTH: 16, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite, g.pounder, g.destroyer]), 
                    TYPE: ["satellite", {ANGLE: i * 180}], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        return output
    })()
}
Class.tempest = {
    PARENT: "genericTank",
    LABEL: "Tempest",
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
            TYPE: "tempestDeco1",
        },
        {
            POSITION: [4, 0, 0, 180, 360, 1],
            TYPE: "tempestDeco2",
        },
    ],
    ANGLE: 120,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.whirlwind,
    AI: {
        SPEED: 2, 
    }, 
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 3; i++) { 
            output.push({ 
                POSITION: {WIDTH: 12, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite, g.pounder]), 
                    TYPE: ["satellite", {ANGLE: i * 120}], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        for (let i = 0; i < 3; i++) { 
            output.push({ 
                POSITION: {WIDTH: 12, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite, g.pounder]), 
                    TYPE: ["satellite", { ANGLE: i * 120, CONTROLLERS: [['orbit', {invert: true}]] }], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        return output
    })()
}
Class.thunderbolt = {
    PARENT: ["genericTank"],
    LABEL: "Thunderbolt",
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: "thunderboltDeco",
        },
    ],
    ANGLE: 90,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.whirlwind,
    AI: {
        SPEED: 2.5, 
    }, 
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 4; i++) { 
            output.push({ 
                POSITION: {WIDTH: 12, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite, g.pounder]), 
                    TYPE: ["satellite", {ANGLE: i * 90}], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        return output
    })()
}

// Hurricane upgrades
Class.typhoon = {
    PARENT: ["genericTank"],
    LABEL: "Typhoon",
    DANGER: 7,
    ANGLE: 36,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.whirlwind,
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
            TYPE: "typhoonDeco",
        },
    ],
    AI: {
        SPEED: 2, 
    }, 
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 10; i++) { 
            output.push({ 
                POSITION: {WIDTH: 8, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite]), 
                    TYPE: ["satellite", {ANGLE: i * 36}], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        return output
    })()
}
Class.blizzard = {
    PARENT: "genericTank",
    LABEL: "Blizzard",
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
            TYPE: "blizzardDeco1",
        },
        {
            POSITION: [6, 0, 0, 180, 360, 1],
            TYPE: "blizzardDeco2",
        },
    ],
    ANGLE: 72,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.whirlwind,
    AI: {
        SPEED: 2, 
    }, 
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 5; i++) { 
            output.push({ 
                POSITION: {WIDTH: 8, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite]), 
                    TYPE: ["satellite", {ANGLE: i * 72}], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        for (let i = 0; i < 5; i++) { 
            output.push({ 
                POSITION: {WIDTH: 8, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite]), 
                    TYPE: ["satellite", { ANGLE: i * 72, CONTROLLERS: [['orbit', {invert: true}]] }], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        return output
    })()
}

// Whirlwind upgrade paths
Class.whirlwind.UPGRADES_TIER_2 = ["tornado", "hurricane"]
	Class.whirlwind.UPGRADES_TIER_3 = ["hexaWhirl", "munition", "whirl3", "whirlGuard", "prophet", "vortex"]
	Class.tornado.UPGRADES_TIER_3 = ["megaTornado", "tempest", "thunderbolt"]
	Class.hurricane.UPGRADES_TIER_3 = ["typhoon", "blizzard"]

// December 14th - Master
Class.master = {
    PARENT: "genericTank",
    LABEL: "Master",
    BODY: {
        HEALTH: base.HEALTH * 0.4,
        SHIELD: base.SHIELD * 0.4,
        DENSITY: base.DENSITY * 0.3,
    },
    DANGER: 8,
    GUNS: [
        {
            POSITION: [18, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "masterBullet",
                MAX_CHILDREN: 4,
                DESTROY_OLDEST_CHILD: true,
            },
        },
        {
            POSITION: [13, 8, 1, 0, -1, 140, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [13, 8, 1, 0, 1, 220, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
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

// December 15th - Undertow
Class.undertow = {
    PARENT: "genericTank",
    LABEL: "Undertow",
    DANGER: 6,
    TOOLTIP: "[DEV NOTE] The Undertow does not function as intended yet!",
    GUNS: [
        {
            POSITION: [14, 12, 0.8, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, { size: 0.8, reload: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [11.25, 8, 0.15, 4.25, 4, 13.5, 0]
        },
        {
            POSITION: [11.25, 8, 0.15, 4.25, -4, -13.5, 0]
        }
    ]
}

// Undertow upgrades
Class.riptide = {
    PARENT: "genericTank",
    LABEL: "Riptide",
    DANGER: 7,
    TOOLTIP: "[DEV NOTE] The Riptide does not function as intended yet!",
    GUNS: [
        {
            POSITION: [6.5, 23.5, 0.25, 3, 0, 180, 0],
        },
        {
            POSITION: [18, 16, 0.75, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, { size: 0.75, reload: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [17, 16, 0.1, 0.25, 4, 13.5, 0]
        },
        {
            POSITION: [17, 16, 0.1, 0.25, -4, -13.5, 0]
        }
    ]
}
Class.undertow.UPGRADES_TIER_3 = ["riptide"]

// December 16th - Literally a Machine Gun
Class.literallyAMachineGun = {
    PARENT: "genericTank",
    LABEL: "Literally a Machine Gun",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.2
    },
    TOOLTIP: "[DEV NOTE] This tank does not function as intended yet!",
    TURRETS: [
        {
            POSITION: [10, 14, 0, 0, 0, 1],
            TYPE: "lamgSpinnerTurret"
        }
    ],
    GUNS: [
        {
            POSITION: [22, 8, 1, 0, 0, 0, 0]
        }
    ]
}

// Dev shit
Class.dailyTanks = {
	PARENT: "menu",
	LABEL: "Daily Tanks!",
	UPGRADE_COLOR: "rainbow",
	UPGRADES_TIER_0: [
		"whirlwind",
		"master",
		"undertow",
		"literallyAMachineGun",
		"literallyATank",
		"rocketeer",
		"jumpSmasher",
	]
}

// December 19th-20th - Jump Smasher
Class.jumpSmasher = {
    PARENT: "genericSmasher",
    LABEL: "Jump Smasher",
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody"
        }
    ]
}

// *InsertCorrectDateHereCuzIdk* - Literally A Tank
class io_turretWithMotion extends IO {
    constructor(b, opts = {}) {
        super(b)
    }
    think(input) {
        return {
            target: this.body.master.velocity,
            main: true,
        };
    }
}
ioTypes.turretWithMotion = io_turretWithMotion
Class.latTop = makeDeco(0)
Class.latDeco1 = {
    PARENT: "genericTank",
    LABEL: "Tank Deco",
	FACING_TYPE: ["turnWithSpeed"],
    COLOR: "#5C533F",
    SHAPE: "M -1 -2 C -1 -2 -1 -3 0 -3 C 1 -3 1 -2 1 -2 V 2 C 1 2 1 3 0 3 C -1 3 -1 2 -1 2 V -2",
	MIRROR_MASTER_ANGLE: true,
}
Class.latDeco2 = {
    PARENT: "genericTank",
    LABEL: "Tank Deco",
	FACING_TYPE: ["turnWithSpeed"],
    COLOR: "#5C533F",
    SHAPE: "M -2 0 H 2 L 0 1 L -2 0",
	MIRROR_MASTER_ANGLE: true,
}
Class.latDeco3 = {
    PARENT: "genericTank",
    LABEL: "Tank Deco",
	FACING_TYPE: ["turnWithSpeed"],
    COLOR: "#3F3B2D",
    SHAPE: "M -10 -1 L 10 -1 L 10 1 L -10 1 L -10 -1",
	MIRROR_MASTER_ANGLE: true,
}
Class.latRight = {
    PARENT: "genericTank",
    LABEL: "Tank Side",
	FACING_TYPE: ["turnWithSpeed"],
    COLOR: "#96794E",
    SHAPE: "M -6 0 H 5 V 1 C 5 2 4 2 4 2 H -5 C -6 2 -6 1 -6 1 V 0",
	MIRROR_MASTER_ANGLE: true,
    TURRETS: [
        {
            POSITION: [4.8, 31, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, 24, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, 17, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, -42, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, -35, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, -28, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [18, -5, 0, 0, 0, 1],
            TYPE: "latDeco2",
        },
    ]
}
Class.latLeft = {
    PARENT: "genericTank",
    LABEL: "Tank Side",
	FACING_TYPE: ["turnWithSpeed"],
    COLOR: "#96794E",
    SHAPE: "M -5 0 H 6 V 1 C 6 2 5 2 5 2 H -4 C -5 2 -5 1 -5 1 V 0",
	MIRROR_MASTER_ANGLE: true,
    TURRETS: [
        {
            POSITION: [4.8, -31, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, -24, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, -17, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, 42, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, 35, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, 28, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [18, 5, 0, 0, 0, 1],
            TYPE: "latDeco2",
        },
    ]
}
Class.latBase = {
    PARENT: "genericTank",
    LABEL: "Tank Base",
	CONTROLLERS: ["turretWithMotion"],
    COLOR: "#96794E",
    SHAPE: [
        [1.1, 1],
		[1.4, 0],
		[1.1, -1],
		[-1.1, -1],
		[-0.8, 0],
		[-1.1, 1]
    ],
    GUNS: [
        {
            POSITION: [16, 5.5, 1, 1, 6.5, 0, 0]
        },
        {
            POSITION: [14.5, 5.5, 1, 1, 6.5, 0, 0]
        },
        {
            POSITION: [13, 5.5, 1, 1, 6.5, 0, 0]
        },
        {
            POSITION: [16, 5.5, 1, 1, -6.5, 0, 0]
        },
        {
            POSITION: [14.5, 5.5, 1, 1, -6.5, 0, 0]
        },
        {
            POSITION: [13, 5.5, 1, 1, -6.5, 0, 0]
        },
        {
            POSITION: [13, 5.5, 1, 1, 6.5, 180, 0]
        },
        {
            POSITION: [11.5, 5.5, 1, 1, 6.5, 180, 0]
        },
        {
            POSITION: [10, 5.5, 1, 1, 6.5, 180, 0]
        },
        {
            POSITION: [8.5, 5.5, 1, 1, 6.5, 180, 0]
        },
        {
            POSITION: [13, 5.5, 1, 1, -6.5, 180, 0]
        },
        {
            POSITION: [11.5, 5.5, 1, 1, -6.5, 180, 0]
        },
        {
            POSITION: [10, 5.5, 1, 1, -6.5, 180, 0]
        },
        {
            POSITION: [8.5, 5.5, 1, 1, -6.5, 180, 0]
        },
    ],
    TURRETS: [
        {
            POSITION: [5.3, 0, -10, 0, 0, 1],
            TYPE: "latLeft",
        },
        {
            POSITION: [5.3, 0, -10, 180, 0, 1],
            TYPE: "latRight",
        },
        {
            POSITION: [2, 0, -1.4, 90, 0, 1],
            TYPE: "latDeco3",
        },
    ]
}
Class.literallyATank = {
    PARENT: "genericTank",
    DANGER: 6,
	BODY: {
		HEALTH: base.HEALTH * 1.2,
	},
    LABEL: "Literally a Tank",
    SHAPE: "M -1 -1 H 0 C 1 -1 1 0 1 0 C 1 0 1 1 0 1 H -1 V -1",
    GUNS: [
        {
            POSITION: [30, 8, 1, 0, 0, 0, 0]
        },
        {
            POSITION: [4, 8, -1.4, 8, 0, 0, 0]
        },
        {
            POSITION: [12, 8, 1.3, 30, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "developerBullet"
            }
        },
        {
            POSITION: [2, 11, 1, 34, 0, 0, 0]
        }
    ],
    TURRETS: [
        {
            POSITION: [15, 0, 0, 0, 360, 1],
            TYPE: [ "latTop", { COLOR: "#5C533F" } ],
        },
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: [ "latTop", { COLOR: "#736245" } ],
        },
        {
            POSITION: [35, 0, 0, 0, 360, 0],
            TYPE: [ "latBase", { COLOR: "#96794E" } ],
        },
    ]
}
	
if (addToMain == true) {
Class.basic.UPGRADES_TIER_1.push("whirlwind")
Class.basic.UPGRADES_TIER_2.push("literallyATank")
Class.hexaTank.UPGRADES_TIER_3.push("hexaWhirl")
Class.artillery.UPGRADES_TIER_3.push("munition")
Class.auto3.UPGRADES_TIER_3.push("whirl3")
Class.trapGuard.UPGRADES_TIER_3.push("whirlGuard")
Class.underseer.UPGRADES_TIER_3.push("prophet")
Class.launcher.UPGRADES_TIER_3.push("vortex")
Class.desmos.UPGRADES_TIER_2.push("undertow")
} else {
Class.basic.UPGRADES_TIER_3 = ["dailyTanks"]
}

