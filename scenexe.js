/*
  ----------------------------------------------------------------
  `scenexe.js` IS ENABLED BY DEFAULT
  You can disable it by uncommenting line 48

  Additionally c.SPAWN_CLASS is Node-Base by default
  You can disable it by commenting line 53

  THIS IS STILL IN BETA!
  THIS IS STILL IN BETA!
  THIS IS STILL IN BETA!
  ----------------------------------------------------------------
*/

const { base } = require("../constants")
const { combineStats, makeAuto } = require("../facilitators")
let g = require('../gunvals'),

addHearth = (damageFactor = 1, sizeFactor = 1, opacity = 0.3, auraColor) => {
    let isHeal = damageFactor < 0;
    let auraType = isHeal ? "healAura" : "aura";
    auraColor = auraColor ?? (isHeal ? 'lime' : 'red');
    return {
        PARENT: ["genericTank"],
        INDEPENDENT: true,
        LABEL: "",
        COLOR: 'gray',
        GUNS: [
            {
                POSITION: [0, 20, 1, 0, 0, 0, 0,],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.aura, { size: sizeFactor, damage: damageFactor }]),
                    TYPE: [auraType, { COLOR: auraColor, ALPHA: opacity }],
                    MAX_CHILDREN: 1,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                },
            },
        ],
        TURRETS: [
            {
                POSITION: [8.5, 0, 0, 0, 360, 1],
                TYPE: ['genericEntity', { COLOR: auraColor, INDEPENDENT: true }],
            },
        ]
    };
}

const baseScenexe = {
    FOV: base.FOV * 1.6
}

/**
 * 
 * @param {Object} params
 * @param {import("../../../..").Tanks} params.Class
 */
module.exports = ({ Class, Config }) => {

    //return console.log('Addon [scenexe.js] is disabled')
    
    Config.SPAWN_CLASS = ['SCENEXEnode', 'SCENEXEbase']
    Class.SCENEXEnode = {
        PARENT: 'genericTank',
        REROOT_UPGRADE_TREE: 'SCENEXEnode',
        LABEL: 'Node',
    }
    Class.SCENEXEbase = {
        PARENT: 'genericTank',
        REROOT_UPGRADE_TREE: 'SCENEXEbase',
        LABEL: 'Base',
        BODY: {
            FOV: baseScenexe.FOV
        },
    }

    // -------------------------------------------------------------------
    // -----------------------------WEAPONS-------------------------------
    // -------------------------------------------------------------------
    // MONO BRANCH
    Class.SCENEXEmono = {
        PARENT: 'SCENEXEnode',
        LABEL: 'Mono',
        GUNS: [{
            POSITION: { LENGTH: 20, WIDTH: 10 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: 'bullet'
            }
        }]
    }

    Class.SCENEXEduo = {
        PARENT: 'SCENEXEnode',
        LABEL: 'Duo',
        GUNS: [{
            POSITION: { LENGTH: 20, WIDTH: 8, Y: 5.1 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: 'bullet'
            }
        }, {
            POSITION: { LENGTH: 20, WIDTH: 8, Y: -5.1, DELAY: 0.5 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: 'bullet'
            }
        }]
    }

    Class.SCENEXEflank = {
        PARENT: 'SCENEXEnode',
        LABEL: 'Flank',
        GUNS: [{
            POSITION: { LENGTH: 20, WIDTH: 9.5 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: 'bullet'
            }
        }, {
            POSITION: { LENGTH: 15, WIDTH: 9.5, ANGLE: 180 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: 'bullet'
            }
        }]
    }

    Class.SCENEXEsplit = {
        PARENT: 'SCENEXEnode',
        LABEL: 'Split',
        GUNS: [
            {
                POSITION: { LENGTH: 15, WIDTH: 5, ANGLE: 35, DELAY: 0.5 },
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, {damage: 0.75, pen: 1.15 }]),
                    TYPE: 'bullet'
                }
            },
            {
                POSITION: { LENGTH: 15, WIDTH: 5, ANGLE: -35, DELAY: 1 },
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, { damage: 0.75, pen: 1.15 }]),
                    TYPE: 'bullet'
                }
            },
            {...Class.SCENEXEmono.GUNS[0]},
        ]
    }

    Class.SCENEXEsingle = {
        PARENT: 'SCENEXEnode',
        LABEL: 'Single',
        GUNS: [{
            POSITION: { LENGTH: 21.5, WIDTH: 12.5 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: 'bullet'
            }
        }]
    }

    /* 
        Class.alloy = { under SCENEXEcommander }
    */

    /*
        Class.guard = { under SCENEXEtrapper }
    */

    Class.SCENEXEsniper = {
        PARENT: 'SCENEXEnode',
        LABEL: 'Sniper',
        BODY: {
            FOV: baseScenexe.FOV * 1.1
        },
        GUNS: [{
            POSITION: { LENGTH: 25, WIDTH: 9.5 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: 'bullet'
            }
        }]
    }

    // COMMANDER BRANCH

    Class.SCENEXEcommander = {
        PARENT: 'SCENEXEnode',
        LABEL: 'Commander',
        GUNS: [{
            POSITION: { LENGTH: 20, WIDTH: 9.5, ASPECT: -0.5, X: -4 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone]),
                TYPE: 'drone',
                MAX_CHILDREN: 3,
                SYNCS_SKILLS: true
            }
        }]
    }

    Class.SCENEXEdirector = {
        PARENT: 'SCENEXEnode',
        LABEL: 'Director',
        GUNS: [{
            POSITION: { LENGTH: 25, WIDTH: 14.5, ASPECT: -0.5, X: -4 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, {damage: 2, reload: 1.15, pen: 2}]),
                TYPE: 'drone',
                MAX_CHILDREN: 3,
                SYNCS_SKILLS: true
            }
        }]
    }

    Class.SCENEXEoverseer = {
        PARENT: 'SCENEXEnode',
        LABEL: 'Overseer',
        GUNS: [
            {
                POSITION: { ...Class.SCENEXEcommander.GUNS[0].POSITION },
                PROPERTIES: { ...Class.SCENEXEcommander.GUNS[0].PROPERTIES, MAX_CHILDREN: 4 },
            },
            {
                POSITION: {...Class.SCENEXEcommander.GUNS[0].POSITION, ANGLE: 180},
                PROPERTIES: {...Class.SCENEXEcommander.GUNS[0].PROPERTIES, MAX_CHILDREN: 4},
            },
        ]
    }

    Class.SCENEXEalloy = {
        PARENT: 'SCENEXEnode',
        LABEL: 'Alloy',
        GUNS: [
            { ...Class.SCENEXEmono.GUNS[0] },
            {
                POSITION: { ...Class.SCENEXEcommander.GUNS[0].POSITION, ANGLE: 180 },
                PROPERTIES: {...Class.SCENEXEcommander.GUNS[0].PROPERTIES}
            }
        ]
    }

    /* 
        Class.SCENEXEfusion = { under SCENEXEtrapper }
    */

    // TRAPPER BRANCH

    Class.SCENEXEtrap = {
        PARENT: 'trap',
        SHAPE: 4,
        FACING_TYPE: 'withMotion',
        BODY: {
            HEALTH: 5
        }
    }

    Class.SCENEXEtrapper = {
        PARENT: 'SCENEXEnode',
        LABEL: 'Trapper',
        GUNS: [{
            POSITION: { LENGTH: 5, WIDTH: 12, ASPECT: -0.4, X: 15 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, { reload: 1.4, damage: 0.8, speed: 0.35, pen: 2, size: 1.1 }]),
                TYPE: 'SCENEXEtrap'
            }
        }, {
            POSITION: { LENGTH: 15, WIDTH: 6 }
        }]
    }

    Class.SCENEXEgamma = {
        PARENT: 'SCENEXEnode',
        LABEL: 'Gamma',
        GUNS: [{
            POSITION: { LENGTH: 5, WIDTH: 14, ASPECT: -0.4, X: 15 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, { reload: 1.6, damage: 2, speed: 0.2, pen: 1.5, size: 1.25 }]),
                TYPE: 'SCENEXEtrap'
            }
        }, {
            POSITION: { LENGTH: 15, WIDTH: 8 }
        }]
    }

    Class.SCENEXEblockade = {
        PARENT: 'SCENEXEnode',
        LABEL: 'Blockade',
        GUNS: [
            {...Class.SCENEXEtrapper.GUNS[0]},
            {
                POSITION: {...Class.SCENEXEtrapper.GUNS[0].POSITION, ANGLE: 180},
                PROPERTIES: {...Class.SCENEXEtrapper.GUNS[0].PROPERTIES}
            },
            { ...Class.SCENEXEtrapper.GUNS[1] },
            {
                POSITION: { ...Class.SCENEXEtrapper.GUNS[1].POSITION, ANGLE: 180 },
            }
        ]
    }

    Class.SCENEXErubble = {
        PARENT: 'SCENEXEnode',
        LABEL: 'Rubble',
        GUNS: (() => {
            let output = []
            for (let i = 0; i < 4; i++) output.push({
                POSITION: { LENGTH: 3, WIDTH: 9, ASPECT: -0.4, X: 12, ANGLE: (360/4)*i },
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, { reload: 1.4, damage: 0.5, speed: 0.35, pen: 2, size: 1.1 }]),
                    TYPE: 'SCENEXEtrap'
                }
            }, {
                POSITION: { LENGTH: 12, WIDTH: 4, ANGLE: (360/4)*i }
            })
            return output
        })()
    }

    Class.SCENEXEfusion = {
        PARENT: 'SCENEXEnode',
        LABEL: 'Fusion',
        GUNS: [
            { ...Class.SCENEXEtrapper.GUNS[0] },
            { ...Class.SCENEXEtrapper.GUNS[1] },
            {
                POSITION: { ...Class.SCENEXEcommander.GUNS[0].POSITION, ANGLE: 180 },
                PROPERTIES: { ...Class.SCENEXEcommander.GUNS[0].PROPERTIES }
            }
        ]
    }

    Class.SCENEXEguard = {
        PARENT: 'SCENEXEnode',
        LABEL: 'Guard',
        GUNS: [
            { ...Class.SCENEXEmono.GUNS[0] },
            {
                POSITION: { ...Class.SCENEXEtrapper.GUNS[0].POSITION, ANGLE: 180 },
                PROPERTIES: {...Class.SCENEXEtrapper.GUNS[0].PROPERTIES}
            },
            {
                POSITION: { ...Class.SCENEXEtrapper.GUNS[1].POSITION, ANGLE: 180 },
            }
        ]
    }

    // -------------------------------------------------------------------
    // -----------------------------BODIES-------------------------------
    // -------------------------------------------------------------------
    Class.SCENEXEsmasher = {
        PARENT: 'SCENEXEbase',
        LABEL: 'Smasher',
        BODY: {...Class.smasher.BODY},
        TURRETS: [{
            POSITION: { SIZE: 26 },
            TYPE: 'smasherBody'
        }],
    }

    Class.SCENEXEsentryAutoTurret = {
        PARENT: 'autoTankGun',
        INDEPENDENT: true,
        GUNS: [{
            POSITION: { LENGTH: 25, WIDTH: 10 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: 'bullet'
            }
        }]
    }
    Class.SCENEXEsentry = {
        PARENT: 'SCENEXEbase',
        LABEL: 'Sentry',
        TURRETS: [{
            POSITION: { SIZE: 8, LAYER: 1 },
            TYPE: 'SCENEXEsentryAutoTurret'
        }]
    }

    Class.SCENEXEwall = {
        PARENT: 'SCENEXEbase',
        LABEL: 'Wall',
        BODY: {
            HEALTH: base.HEALTH * 1.75,
            SPEED: base.SPEED * 0.2
        },
        TURRETS: [{ POSITION: { SIZE: 21, LAYER: 1 }, TYPE: ['hexagon', { COLOR: -1, MIRROR_MASTER_ANGLE: true }] }]
    }

    Class.SCENEXEhearthAura = addHearth(1, 1.25)
    Class.SCENEXEhearth = {
        PARENT: 'SCENEXEbase',
        LABEL: 'Hearth',
        TURRETS: [{
            POSITION: { SIZE: 12.5, LAYER: 1 },
            TYPE: 'SCENEXEhearthAura'
        }]
    }

    Class.SCENEXEhangarDroneSpawner = {
        PARENT: 'genericTank',
        LABEL: '',
        SHAPE: 4,
        GUNS: [{
            POSITION: { LENGTH: 15, WIDTH: 15, X: -8 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, {size: 1.2}]),
                MAX_CHILDREN: 3,
                TYPE: 'drone',
                SYNCS_SKILLS: true,
                AUTOFIRE: true
            }
        }]
    }

    Class.SCENEXEhangar = {
        PARENT: 'SCENEXEbase',
        LABEL: 'Hangar',
        TURRETS: [{
            POSITION: { SIZE: 10, LAYER: 1 },
            TYPE: ['SCENEXEhangarDroneSpawner', { COLOR: 'gray', MIRROR_MASTER_ANGLE: true }]
        }]
    }

    Class.SCENEXEnode.UPGRADES_TIER_1 = ['SCENEXEmono', 'SCENEXEcommander', 'SCENEXEtrapper']
        Class.SCENEXEmono.UPGRADES_TIER_2 = ['SCENEXEduo', 'SCENEXEflank', 'SCENEXEsplit', 'SCENEXEsingle', 'SCENEXEalloy', 'SCENEXEguard', 'SCENEXEsniper']
        Class.SCENEXEcommander.UPGRADES_TIER_2 = ['SCENEXEdirector', 'SCENEXEoverseer', 'SCENEXEalloy', 'SCENEXEfusion']
        Class.SCENEXEtrapper.UPGRADES_TIER_2 = ['SCENEXEgamma', 'SCENEXEblockade', 'SCENEXErubble', 'SCENEXEguard', 'SCENEXEfusion']
    Class.SCENEXEbase.UPGRADES_TIER_1 = ['SCENEXEsmasher', 'SCENEXEsentry', 'SCENEXEwall', 'SCENEXEhearth', 'SCENEXEhangar']

    Class.addons.UPGRADES_TIER_0.push(['SCENEXEnode', 'SCENEXEbase'])
}