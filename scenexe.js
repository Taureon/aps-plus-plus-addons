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
const { combineStats } = require("../facilitators")
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

/**
 * 
 * @param {import("../../../..").Tanks} Class 
 */
module.exports = ({ Class, Config }) => {

    // return console.log('Addon [scenexe.js] is disabled')

    Config.SPAWN_CLASS = ['SCENEXE_node', 'SCENEXE_base']
    Class.SCENEXE_node = {
        PARENT: 'genericTank',
        REROOT_UPGRADE_TREE: 'node',
        LABEL: 'Node',
        BODY: {
            FOV: base.FOV * 1.6
        },
    }
    Class.SCENEXE_base = {
        PARENT: 'genericTank',
        REROOT_UPGRADE_TREE: 'base',
        LABEL: 'Base'
    }

    // -------------------------------------------------------------------
    // -----------------------------WEAPONS-------------------------------
    // -------------------------------------------------------------------
    // MONO BRANCH
    Class.SCENEXE_mono = {
        PARENT: 'SCENEXE_node',
        LABEL: 'Mono',
        GUNS: [{
            POSITION: { LENGTH: 20, WIDTH: 9.5 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: 'bullet'
            }
        }]
    }

    Class.SCENEXE_duo = {
        PARENT: 'SCENEXE_node',
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

    Class.SCENEXE_flank = {
        PARENT: 'SCENEXE_node',
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

    // COMMANDER BRANCH

    Class.SCENEXE_commander = {
        PARENT: 'SCENEXE_node',
        LABEL: 'Commander',
        GUNS: [{
            POSITION: { LENGTH: 20, WIDTH: 9.5, ASPECT: -0.5, X: -3 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone]),
                TYPE: 'drone',
                MAX_CHILDREN: 3
            }
        }]
    }

    // TRAPPER BRANCH
    Class.SCENEXE_trapper = {
        PARENT: 'SCENEXE_node',
        LABEL: 'Trapper',
        GUNS: [{
            POSITION: { LENGTH: 5, WIDTH: 12, ASPECT: -0.4, X: 15 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, { reload: 1.4, damage: 1.5, speed: 0.35 }]),
                TYPE: 'trap'
            }
        }, {
            POSITION: { LENGTH: 15, WIDTH: 6 }
        }]
    }

    // -------------------------------------------------------------------
    // -----------------------------BODIES-------------------------------
    // -------------------------------------------------------------------
    Class.SCENEXE_smasher = {
        PARENT: 'SCENEXE_base',
        LABEL: 'Smasher',
        BODY: {...Class.smasher.BODY},
        TURRETS: [...Class.smasher.TURRETS],
    }

    Class.SCENEXE_sentryAutoTurret = {
        PARENT: 'autoTurret',
        GUNS: [{
            POSITION: { LENGTH: 25, WIDTH: 10 },
            SHOOT_SETTINGS: combineStats([g.basic, g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
            TYPE: 'bullet'
        }]
    }
    Class.SCENEXE_sentry = {
        PARENT: 'SCENEXE_base',
        LABEL: 'Sentry',
        TURRETS: [{
            POSITION: { SIZE: 8, LAYER: 1, ARC: 360, ANGLE: 180 },
            TYPE: 'SCENEXE_sentryAutoTurret'
        }]
    }

    Class.SCENEXE_wall = {
        PARENT: 'SCENEXE_base',
        LABEL: 'Wall',
        BODY: {
            HEALTH: base.HEALTH * 1.75,
            SPEED: base.SPEED * 0.2
        },
        TURRETS: [{ POSITION: { SIZE: 21, LAYER: 1 }, TYPE: ['hexagon', { COLOR: -1, MIRROR_MASTER_ANGLE: true }] }]
    }

    Class.SCENEXE_hearthAura = addHearth(1, 1.25)
    Class.SCENEXE_hearth = {
        PARENT: 'SCENEXE_base',
        LABEL: 'Hearth',
        TURRETS: [{
            POSITION: { SIZE: 12.5, LAYER: 1 },
            TYPE: 'SCENEXE_hearthAura'
        }]
    }

    Class.SCENEXE_hangarDroneSpawner = {
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

    Class.SCENEXE_hangar = {
        PARENT: 'SCENEXE_base',
        LABEL: 'Hangar',
        TURRETS: [{
            POSITION: { SIZE: 10, LAYER: 1 },
            TYPE: ['SCENEXE_hangarDroneSpawner', { COLOR: 'gray', MIRROR_MASTER_ANGLE: true }]
        }]
    }

    Class.SCENEXE_node.UPGRADES_TIER_1 = ['SCENEXE_mono', 'SCENEXE_commander', 'SCENEXE_trapper']
        Class.SCENEXE_mono.UPGRADES_TIER_2 = ['SCENEXE_duo', 'SCENEXE_flank']
    Class.SCENEXE_base.UPGRADES_TIER_1 = ['SCENEXE_smasher', 'SCENEXE_sentry', 'SCENEXE_wall', 'SCENEXE_hearth', 'SCENEXE_hangar']

    Class.addons.UPGRADES_TIER_0.push(['SCENEXE_node', 'SCENEXE_base'])
}