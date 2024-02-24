const { base } = require("../constants")
const { combineStats } = require("../facilitators")
const gunCalcNames = {
	default: 0,
	bullet: 1,
	drone: 2,
	swarm: 3,
	fixedReload: 4,
	thruster: 5,
	sustained: 6,
	necro: 7,
	trap: 8,
};
let g = {
    // Misc
    blank: { },
    small: { size: 0.8 },
    micro: { size: 0.4 },
    weak: { reload: 2, health: 0.6, damage: 0.6, pen: 0.8, speed: 0.5, maxSpeed: 0.7, range: 0.25, density: 0.3 },
    power: { shudder: 0.6, size: 1.2, pen: 1.25, speed: 2, maxSpeed: 1.7, density: 2, spray: 0.5, resist: 1.5 },
    fake: { recoil: 0.00001, size: 0.00001, health: 0.0001, speed: 0.00001, maxSpeed: 2, range: 0 },
    op: { reload: 0.5, recoil: 1.3, health: 4, damage: 4, pen: 4, speed: 3, maxSpeed: 2, density: 5, spray: 2 },
    closer: { reload: 1.25, recoil: 0.25, health: 1000, damage: 1000, pen: 1000, speed: 2.5, maxSpeed: 2.25, range: 1.4, density: 4, spray: 0.25 },

    // Bases
    basic: { reload: 18, recoil: 1.4, shudder: 0.1, damage: 0.75, speed: 4.5, spray: 15 },
    drone: { reload: 50, recoil: 0.25, shudder: 0.1, size: 0.6, speed: 2, spray: 0.1 },
    trap: { reload: 36, shudder: 0.25, size: 0.6, damage: 0.75, speed: 5, spray: 15, resist: 3 },
    swarm: { reload: 18, recoil: 0.25, shudder: 0.05, size: 0.4, damage: 0.75, speed: 4, spray: 5 },
    factory: { reload: 60, shudder: 0.1, size: 0.7, damage: 0.75, speed: 3, spray: 0.1 },
    productionist: { reload: 75, recoil: 0.25, shudder: 0.05, size: 0.7, damage: 0.75, speed: 4, range: 1.5, spray: 5 },

    // Spammers
    single: { reload: 1.05, speed: 1.05 },
    twin: { recoil: 0.5, shudder: 0.9, health: 0.9, damage: 0.7, spray: 1.2 },
    double: { damage: 0.9 },
    hewn: { reload: 1.25, recoil: 1.5, health: 0.9, damage: 0.85, maxSpeed: 0.9 },
    bent: { reload: 1.1, shudder: 0.8, health: 0.9, pen: 0.8, density: 0.8, spray: 0.5 },
    spreadmain: { reload: 0.781, recoil: 0.25, shudder: 0.5, health: 0.5, speed: 1.923, maxSpeed: 2.436 },
    spread: { reload: 1.5, shudder: 0.25, speed: 0.7, maxSpeed: 0.7, spray: 0.25 },
    triple: { reload: 1.2, recoil: 0.667, shudder: 0.9, health: 0.85, damage: 0.85, pen: 0.9, density: 1.1, spray: 0.9, resist: 0.95 },
    quint: { reload: 1.5, recoil: 0.667, shudder: 0.9, pen: 0.9, density: 1.1, spray: 0.9, resist: 0.95 },
    turret: { reload: 2, health: 0.8, damage: 0.6, pen: 0.7, density: 0.1 },

    // Snipers
    sniper: { reload: 1.35, shudder: 0.25, damage: 0.8, pen: 1.1, speed: 1.5, maxSpeed: 1.5, density: 1.5, spray: 0.2, resist: 1.15 },
    crossbow: { reload: 2, health: 0.6, damage: 0.6, pen: 0.8 },
    assass: { reload: 1.65, shudder: 0.25, health: 1.15, pen: 1.1, speed: 1.18, maxSpeed: 1.18, density: 3, resist: 1.3 },
    hunter: { reload: 1.5, recoil: 0.7, size: 0.95, damage: 0.9, speed: 1.1, maxSpeed: 0.8, density: 1.2, resist: 1.15 },
    hunter2: { size: 0.9, health: 2, damage: 0.5, pen: 1.5, density: 1.2, resist: 1.1 },
    preda: { reload: 1.4, size: 0.8, health: 1.5, damage: 0.9, pen: 1.2, speed: 0.9, maxSpeed: 0.9 },
    dual: { reload: 2, shudder: 0.8, health: 1.5, speed: 1.3, maxSpeed: 1.1, resist: 1.25 },
    rifle: { reload: 0.8, recoil: 0.8, shudder: 1.5, health: 0.8, damage: 0.8, pen: 0.9, spray: 2 },
    blunderbuss: { recoil: 0.1, shudder: 0.5, health: 0.4, damage: 0.2, pen: 0.4, spray: 0.5 },

    // Machine guns
    mach: { reload: 0.5, recoil: 0.8, shudder: 1.7, health: 0.7, damage: 0.7, maxSpeed: 0.8, spray: 2.5 },
    mini: { reload: 1.25, recoil: 0.6, size: 0.8, health: 0.55, damage: 0.45, pen: 1.25, speed: 1.33, density: 1.25, spray: 0.5, resist: 1.1 },
    stream: { reload: 1.1, recoil: 0.6, damage: 0.65, speed: 1.24 },
    nail: { reload: 0.85, recoil: 2.5, size: 0.8, damage: 0.7, density: 2 },
    gunner: { reload: 1.25, recoil: 0.25, shudder: 1.5, size: 1.1, damage: 0.35, pen: 1.35, speed: 0.9, maxSpeed: 0.8, density: 1.5, spray: 1.5, resist: 1.2 },
    puregunner: { recoil: 0.25, shudder: 1.5, size: 1.2, health: 1.35, damage: 0.25, pen: 1.25, speed: 0.8, maxSpeed: 0.65, density: 1.5, spray: 1.5, resist: 1.2 },
    machgun: { reload: 0.66, recoil: 0.8, shudder: 2, damage: 0.75, speed: 1.2, maxSpeed: 0.8, spray: 2.5 },
    blaster: { recoil: 1.2, shudder: 1.25, size: 1.1, health: 1.5, pen: 0.6, speed: 0.8, maxSpeed: 0.33, range: 0.6, density: 0.5, spray: 1.5, resist: 0.8 },
    chain: { reload: 1.25, recoil: 1.33, shudder: 0.8, health: 0.8, pen: 1.1, speed: 1.25, maxSpeed: 1.25, range: 1.1, density: 1.25, spray: 0.5, resist: 1.1 },
    atomizer: { reload: 0.3, recoil: 0.8, size: 0.5, damage: 0.75, speed: 1.2, maxSpeed: 0.8, spray: 2.25 },
    spam: { reload: 1.1, size: 1.05, damage: 1.1, speed: 0.9, maxSpeed: 0.7, resist: 1.05 },
    gunnerDominator: { reload: 1.1, recoil: 0, shudder: 1.1, size: 0.5, health: 0.5, damage: 0.5, speed: 1.1, density: 0.9, spray: 1.2, resist: 0.8 },

    // Flanks
    flank: { recoil: 1.2, health: 1.02, damage: 0.81, pen: 0.9, maxSpeed: 0.85, density: 1.2 },
    hurricane: { health: 1.3, damage: 1.3, pen: 1.1, speed: 1.5, maxSpeed: 1.15 },
    tri: { recoil: 0.9, health: 0.9, speed: 0.8, maxSpeed: 0.8, range: 0.6 },
    trifront: { recoil: 0.2, speed: 1.3, maxSpeed: 1.1, range: 1.5 },
    thruster: { recoil: 1.5, shudder: 2, health: 0.5, damage: 0.5, pen: 0.7, spray: 0.5, resist: 0.7 },

    // Autos
    auto: { reload: 0.9, recoil: 0.75, shudder: 0.5, size: 0.8, health: 0.9, damage: 0.6, pen: 1.2, speed: 1.1, range: 0.8, density: 1.3, resist: 1.25 },
    five: { reload: 1.15, speed: 1.05, maxSpeed: 1.05, range: 1.1, density: 2 },
    autosnipe: { size: 1.4, health: 2 },

    // Drones
    over: { reload: 1.25, size: 0.85, health: 0.7, damage: 0.8, maxSpeed: 0.9, density: 2 },
    meta: { reload: 1.333, damage: 0.667 },
    overdrive: { reload: 5, health: 0.8, damage: 0.8, pen: 0.8, speed: 0.9, maxSpeed: 0.9, range: 0.9, spray: 1.2 },
    commander: { reload: 3, size: 0.7, health: 0.4, damage: 0.7, range: 0.1, density: 0.5 },
    protectorswarm: { reload: 5, recoil: 0.000001, health: 100, range: 0.5, density: 5, resist: 10 },
    battle: { health: 1.25, damage: 1.15, maxSpeed: 0.85, resist: 1.1 },
    carrier: { reload: 1.5, damage: 0.8, speed: 1.3, maxSpeed: 1.2, range: 1.2 },
    bees: { reload: 1.3, size: 1.4, damage: 1.5, pen: 0.5, speed: 3, maxSpeed: 1.5, density: 0.25 },
    sunchip: { reload: 5, size: 1.4, health: 0.5, damage: 0.4, pen: 0.6, density: 0.8 },
    maleficitor: { reload: 0.5, size: 1.05, health: 1.15, damage: 1.15, pen: 1.15, speed: 0.8, maxSpeed: 0.8, density: 1.15 },
    summoner: { reload: 0.3, size: 1.125, health: 0.4, damage: 0.345, pen: 0.4, density: 0.8 },
    minion: { shudder: 2, health: 0.4, damage: 0.4, pen: 1.2, range: 0.75, spray: 2 },
    babyfactory: { reload: 1.5, maxSpeed: 1.35 },
    mehdrone: { size: 1.35, health: 1.75, speed: 1.125 },
    bigdrone: { size: 1.8, health: 2.5, speed: 1.25 },
    mothership: { reload: 1.25, pen: 1.1, speed: 0.775, maxSpeed: 0.8, range: 15, resist: 1.15 },

    // Heavy cannons
    pound: { reload: 2, recoil: 1.6, damage: 2, speed: 0.85, maxSpeed: 0.8, density: 1.5, resist: 1.15 },
    destroy: { reload: 2.2, recoil: 1.8, shudder: 0.5, health: 2, damage: 2, pen: 1.2, speed: 0.65, maxSpeed: 0.5, density: 2, resist: 3 },
    anni: { reload: 0.8, recoil: 1.25 },
    hive: { reload: 1.5, recoil: 0.8, size: 0.8, health: 0.7, damage: 0.3, maxSpeed: 0.6 },
    arty: { reload: 1.2, recoil: 0.7, size: 0.9, speed: 1.15, maxSpeed: 1.1, density: 1.5 },
    mortar: { reload: 1.2, health: 1.1, speed: 0.8, maxSpeed: 0.8 },
    destroyerDominator: { reload: 6.5, recoil: 0, size: 0.975, health: 6, damage: 6, pen: 6, speed: 0.575, maxSpeed: 0.475, spray: 0.5 },
    shotgun: { reload: 8, recoil: 0.4, size: 1.5, damage: 0.4, pen: 0.8, speed: 1.8, maxSpeed: 0.6, density: 1.2, spray: 1.2 },
    
    // Missiles
    launcher: { reload: 1.5, recoil: 1.5, shudder: 0.1, size: 0.72, health: 1.05, damage: 0.925, speed: 0.9, maxSpeed: 1.2, range: 1.1, resist: 1.5 },
    skim: { recoil: 0.8, shudder: 0.8, size: 0.9, health: 1.35, damage: 0.8, pen: 2, speed: 0.3, maxSpeed: 0.3, resist: 1.1 },
    snake: { reload: 0.4, shudder: 4, health: 1.5, damage: 0.9, pen: 1.2, speed: 0.2, maxSpeed: 0.35, density: 3, spray: 6, resist: 0.5 },
    sidewind: { reload: 1.5, recoil: 2, health: 1.5, damage: 0.9, speed: 0.15, maxSpeed: 0.5 },
    snakeskin: { reload: 0.6, shudder: 2, health: 0.5, damage: 0.5, maxSpeed: 0.2, range: 0.4, spray: 5 },
    rocketeer: { reload: 1.4, shudder: 0.9, size: 1.2, health: 1.5, damage: 1.4, pen: 1.4, speed: 0.3, range: 1.2, resist: 1.4 },
    missileTrail: { reload: 0.6, recoil: 0.25, shudder: 2, damage: 0.9, pen: 0.7, speed: 0.4, range: 0.5 },
    rocketeerMissileTrail: { reload: 0.5, recoil: 7, shudder: 1.5, size: 0.8, health: 0.8, damage: 0.7, speed: 0.9, maxSpeed: 0.8, spray: 5 },
    
    // Traps and blocks
    block: { reload: 1.1, recoil: 2, shudder: 0.1, size: 1.5, health: 2, pen: 1.25, speed: 1.5, maxSpeed: 2.5, range: 1.25, resist: 1.25 },
    construct: { reload: 1.3, size: 0.9, maxSpeed: 1.1 },
    boomerang: { reload: 0.8, health: 0.5, damage: 0.5, speed: 0.75, maxSpeed: 0.75, range: 1.333 },
    nest_keeper: { reload: 3, size: 0.75, health: 1.05, damage: 1.05, pen: 1.1, speed: 0.5, maxSpeed: 0.5, range: 0.5, density: 1.1 },
    hexatrap: { reload: 1.3, shudder: 1.25, speed: 0.8, range: 0.5 },
    megatrap: { reload: 2, recoil: 1.5, shudder: 0.75, size: 1.8, health: 1.52, damage: 1.52, pen: 1.52, speed: 0.9, maxSpeed: 0.8, range: 1.4, resist: 2.5 },
    trapperDominator: { reload: 1.26, recoil: 0, shudder: 0.25, health: 1.25, damage: 1.45, pen: 1.6, speed: 0.5, maxSpeed: 2, range: 0.7, spray: 0.5 },

    // Recoil
    tonsmorrecoil: { recoil: 4 },
    lotsmorrecoil: { recoil: 1.8 },
    muchmorerecoil: { recoil: 1.35 },
    morerecoil: { recoil: 1.15 },
    halfrecoil: { recoil: 0.5 },

    // Reload
    halfreload: { reload: 2 },
    lessreload: { reload: 1.5 },
    one_third_reload: { reload: 1.333 },
    morereload: { reload: 0.75 },
    doublereload: { reload: 0.5 },

    // Speed
    fast: { speed: 1.2 },
    veryfast: { speed: 2.5 },
    morespeed: { speed: 1.3, maxSpeed: 1.3 },
    bitlessspeed: { speed: 0.93, maxSpeed: 0.93 },
    slow: { speed: 0.7, maxSpeed: 0.7 },
    halfspeed: { speed: 0.5, maxSpeed: 0.5 },

    // Misc 2
    healer: { damage: -1 },
    lancer: { reload: 0.4, speed: 0.1, maxSpeed: 0.1, range: 0.1 },
    celeslower: { size: 0.5 },
    lowpower: { shudder: 2, health: 0.5, damage: 0.5, pen: 0.7, spray: 0.5, resist: 0.7 },
    notdense: { density: 0.1 },
    halfrange: { range: 0.5 },
    acc: { shudder: 0.1 },
    aura: { reload: 0.001, recoil: 0.001, shudder: 0.001, size: 6, damage: 3, speed: 0.001, maxSpeed: 0.001, spray: 0.001 },
    noRandom: { shudder: 0.00001, spray: 0.00001 }
};

// yeash

/**
 * 
 * @param {Object} params
 * @param {import("../../../..").Tanks} params.Class
 */
module.exports = ({ Config }) => {

	// Comment out the line below to enable this addon, uncomment it to disable this addon.
     //return console.log('addon [rocketer.js] is now currently disabled')
  
    //Config.SPAWN_CLASS = ['ROCKETER_Basic', 'ROCKETER_Node']
    function gun(length,width,a,x,y,an,d,properties) {
      return {
        POSITION: { LENGTH: length*20, WIDTH: width*20, ASPECT: a, X: x*20, Y: y*10, ANGLE: an, DELAY: d },
        PROPERTIES: properties
      }
    }
    function tankSection(size,x,y,angle,arc,layer,type) {
      return {
        POSITION: { SIZE: size*20, X: x*20, Y: y*10, ANGLE: angle, ARC: arc, LAYER: layer },
        TYPE: type
      }
    }
Class.ROCKETER_Damage_Aura = {
    PARENT: ["auraBase"],
    LABEL: "Aura",
    COLOR: 2,
    BODY: {
        DAMAGE: 0.25,
    },
};
Class.ROCKETER_Heal_Aura = {
    PARENT: ["auraBase"],
    LABEL: "Aura",
    COLOR: 11,
    BODY: {
        DAMAGE: 0.25,
    },
};
Class.ROCKETER_Blizzard_Aura = {
    PARENT: ["auraBase"],
    LABEL: "Aura",
    COLOR: 0,
    BODY: {
        DAMAGE: 0.25,
    },
};
Class.ROCKETER_DmgAuraTop = {
  PARENT: ["genericEntity"],
  LABEL: "",
  GUNS:[
    gun(0.01,1,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.aura,{size:2.5,damage:0.5}]),TYPE:"ROCKETER_Damage_Aura",MAX_CHILDREN:1})
  ],
  TURRETS: [
    tankSection(0.5,0,0,0,0,1,{COLOR:2}),
  ],
};
Class.ROCKETER_HealAuraTop = {
  PARENT: ["genericEntity"],
  LABEL: "",
  GUNS:[
    gun(0.01,1,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.aura,{size:2.5,damage:-0.5}]),TYPE:"ROCKETER_Heal_Aura",MAX_CHILDREN:1})
  ],
  TURRETS: [
    tankSection(0.5,0,0,0,0,1,{COLOR:11}),
  ],
};
Class.ROCKETER_BlizzardAuraTop = {
  PARENT: ["genericEntity"],
  LABEL: "",
  GUNS:[
    gun(0.01,1,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.aura,{size:2.5,damage:0.5}]),TYPE:"ROCKETER_Blizzard_Aura",MAX_CHILDREN:1})
  ],
  TURRETS: [
    tankSection(0.5,0,0,0,0,1,{COLOR:0}),
  ],
};
                                     
  // parents
  Class.ROCKETER_ParentA = {
    REROOT_UPGRADE_TREE: 'ROCKETER_Basic',
    PARENT: "genericTank",
  };
  Class.ROCKETER_ParentB = {
    REROOT_UPGRADE_TREE: 'ROCKETER_Node',
    PARENT: "genericTank",
  };
  // weapons
  Class.ROCKETER_Basic = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Basic",
    GUNS: [
      gun(0.9,0.4,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic]),TYPE:"bullet"}),
    ]
  };
  // basic branch
  Class.ROCKETER_Twin = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Twin",
    GUNS: [
      gun(1,0.4,1,0,0.55,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.twin]),TYPE:"bullet"}),
      gun(1,0.4,1,0,-0.55,0,0.5,{SHOOT_SETTINGS:combineStats([g.basic,g.twin]),TYPE:"bullet"}),
    ]
  };
  Class.ROCKETER_Sniper = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Sniper",
    BODY:{FOV:1.2},
    GUNS: [
      gun(1.2,0.425,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.sniper]),TYPE:"bullet"}),
    ]
  };
  Class.ROCKETER_Cannon = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Cannon",
    GUNS: [
      gun(1,0.6,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,{reload:2.5,damage:4,pen:3}]),TYPE:"bullet"}),
    ]
  };
  Class.ROCKETER_Flank = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Flank",
    GUNS: [
      gun(0.9,0.4,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.flank]),TYPE:"bullet"}),
      gun(0.8,0.4,1,0,0,180,0,{SHOOT_SETTINGS:combineStats([g.basic,g.flank]),TYPE:"bullet"}),
    ]
  };
  Class.ROCKETER_Fortress = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Fortress",
    GUNS: [
      gun(0.65,0.4,1,0,0,0,0,{}),
      gun(0.35,0.4,1.6,0.65,0,0,0,{SHOOT_SETTINGS:combineStats([g.trap]),TYPE:"trap"}),
    ]
  };
  Class.ROCKETER_Guard = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Guard",
    GUNS: [
      gun(1,0.4,2,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.drone]),TYPE:"drone",MAX_CHILDREN:4}),
    ]
  };
  Class.ROCKETER_HangarSection = {
    PARENT: "autoTurret",
    LABEL: "Section",
    GUNS: [
      gun(1,0.4,2,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.drone,{reload:1/2}]),TYPE:"drone",MAX_CHILDREN:4}),
    ]
  };
  // twin branch weapons
  Class.ROCKETER_Gunner = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Gunner",
    GUNS: [
      gun(0.75,0.15,1,0,0.8,0,0.5,{SHOOT_SETTINGS:combineStats([g.basic,g.twin,g.puregunner,g.fast]),TYPE:"bullet"}),
      gun(0.75,0.15,1,0,-0.8,0,0.5,{SHOOT_SETTINGS:combineStats([g.basic,g.twin,g.puregunner,g.fast]),TYPE:"bullet"}),
      gun(1,0.15,1,0,0.3,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.twin,g.puregunner,g.fast]),TYPE:"bullet"}),
      gun(1,0.15,1,0,-0.3,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.twin,g.puregunner,g.fast]),TYPE:"bullet"}),
    ]
  };
  Class.ROCKETER_Quad = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Quad",
    GUNS: [
      gun(1,0.5,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic]),TYPE:"bullet"}),
      gun(1,0.5,1,0,0,90,0,{SHOOT_SETTINGS:combineStats([g.basic]),TYPE:"bullet"}),
      gun(1,0.5,1,0,0,180,0,{SHOOT_SETTINGS:combineStats([g.basic]),TYPE:"bullet"}),
      gun(1,0.5,1,0,0,270,0,{SHOOT_SETTINGS:combineStats([g.basic]),TYPE:"bullet"}),
    ]
  };
  Class.ROCKETER_Split = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Split",
    GUNS: [
      gun(0.7,0.2,1,0,0,-30,0,{SHOOT_SETTINGS:combineStats([g.basic,{recoil:1/3}]),TYPE:"bullet"}),
      gun(0.7,0.2,1,0,0,30,0,{SHOOT_SETTINGS:combineStats([g.basic,{recoil:1/3}]),TYPE:"bullet"}),
      gun(1,0.5,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,{recoil:1/3}]),TYPE:"bullet"}),
    ]
  };
  Class.ROCKETER_Stream = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Stream",
    GUNS: [
      gun(0.6,0.5,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,{reload:1/3}]),TYPE:"growBullet"}),
    ]
  };
  // sniper branch weapons
  Class.ROCKETER_Targeter = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Targeter",
    GUNS: [
      gun(1,0.5,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,{reload:1/3.5,speed:1.2}]),TYPE:"bullet"}),
    ]
  };
  Class.ROCKETER_Marksman = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Marksman",
    BODY:{FOV:1.5},
    GUNS: [
      gun(1.5,0.5,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.sniper,{reload:1.3,damage:1.4,pen:2,speed:1.5}]),TYPE:"bullet"}),
    ]
  };
  // cannon branch weapons
  Class.ROCKETER_Single = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Single",
    GUNS: [
      gun(1,0.8,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,{reload:3.75,damage:8,pen:3.6}]),TYPE:"bullet"}),
    ]
  };
  // flank branch weapons
  Class.ROCKETER_TriAngle = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Tri-Angle",
    GUNS: [
      gun(0.9,0.4,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.flank]),TYPE:"bullet"}),
      gun(0.8,0.4,1,0,0,150,0.5,{SHOOT_SETTINGS:combineStats([g.basic,g.flank,{recoil:1.5}]),TYPE:"bullet"}),
      gun(0.8,0.4,1,0,0,210,0.5,{SHOOT_SETTINGS:combineStats([g.basic,g.flank,{recoil:1.5}]),TYPE:"bullet"}),
    ]
  };
  // fortress branch weapons
  Class.ROCKETER_Palisade = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Palisade",
    GUNS: [
      gun(0.65,0.5,1,0,0,0,0,{}),
      gun(0.35,0.5,1.6,0.65,0,0,0,{SHOOT_SETTINGS:combineStats([g.trap,{reload:0.5,damage:0.7,pen:1.3}]),TYPE:"trap"}),
    ]
  };
  Class.ROCKETER_Minelayer = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Minelayer",
    GUNS: [
      gun(0.9,0.4,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.trap,g.block,{range:0.4}]),TYPE:"pillbox"}),
      gun(0.65,0.6,1,0,0,0,0,{}),
    ]
  };
  // guard branch weapons
  Class.ROCKETER_Commander = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Commander",
    GUNS: [
      gun(1.05,0.5,2,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.drone,{reload:1/2}]),TYPE:"drone",MAX_CHILDREN:6}),
    ]
  };
  Class.ROCKETER_Protector = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Protector",
    GUNS: [
      gun(0.7,0.35,2,0,0,90,0,{SHOOT_SETTINGS:combineStats([g.drone]),TYPE:"drone",MAX_CHILDREN:4}),
      gun(0.7,0.35,2,0,0,270,0,{SHOOT_SETTINGS:combineStats([g.drone]),TYPE:"drone",MAX_CHILDREN:4}),
    ]
  };
  // gunner branch weapons
  Class.ROCKETER_Minesweeper = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Minesweeper",
    GUNS: [
      gun(0.75,0.15,1,0,0.3,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.twin,g.puregunner,g.fast]),TYPE:"bullet"}),
      gun(0.75,0.15,1,0,-0.3,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.twin,g.puregunner,g.fast]),TYPE:"bullet"}),
      gun(0.65,0.4,1,0,0,180,0,{}),
      gun(0.35,0.4,1.6,0.65,0,180,0,{SHOOT_SETTINGS:combineStats([g.trap,g.flank]),TYPE:"trap"}),
    ]
  };
  Class.ROCKETER_Blaster = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Blaster",
    GUNS: [
      gun(1,0.15,1,0,0.6,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.twin,g.puregunner,g.fast,{reload:1/2}]),TYPE:"bullet"}),
      gun(1,0.15,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.twin,g.puregunner,g.fast,{reload:1/2}]),TYPE:"bullet"}),
      gun(1,0.15,1,0,-0.6,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.twin,g.puregunner,g.fast,{reload:1/2}]),TYPE:"bullet"}),
    ]
  };
  Class.ROCKETER_Rimfire = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Rimfire",
    GUNS: [
      gun(0.95,0.3,1,0,0.7,15,0,{SHOOT_SETTINGS:combineStats([g.basic,g.twin,g.puregunner,g.fast,{reload:2,speed:1.2}]),TYPE:"bullet"}),
      gun(0.95,0.3,1,0,-0.7,-15,0,{SHOOT_SETTINGS:combineStats([g.basic,g.twin,g.puregunner,g.fast,{reload:2,speed:1.2}]),TYPE:"bullet"}),
      gun(1,0.15,1,0,0.3,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.twin,g.puregunner,g.fast]),TYPE:"bullet"}),
      gun(1,0.15,1,0,-0.3,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.twin,g.puregunner,g.fast]),TYPE:"bullet"}),
    ]
  };
  // quad branch weapons
  Class.ROCKETER_Blitz = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Blitz",
    GUNS: [
      gun(1,0.5,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic]),TYPE:"bullet"}),
      gun(1,0.5,1,0,0,90,0,{SHOOT_SETTINGS:combineStats([g.basic]),TYPE:"bullet"}),
      gun(1,0.5,1,0,0,180,0,{SHOOT_SETTINGS:combineStats([g.basic]),TYPE:"bullet"}),
      gun(1,0.5,1,0,0,270,0,{SHOOT_SETTINGS:combineStats([g.basic]),TYPE:"bullet"}),
      gun(1,0.5,1,0,0,45,0,{SHOOT_SETTINGS:combineStats([g.basic]),TYPE:"bullet"}),
      gun(1,0.5,1,0,0,135,0,{SHOOT_SETTINGS:combineStats([g.basic]),TYPE:"bullet"}),
      gun(1,0.5,1,0,0,225,0,{SHOOT_SETTINGS:combineStats([g.basic]),TYPE:"bullet"}),
      gun(1,0.5,1,0,0,315,0,{SHOOT_SETTINGS:combineStats([g.basic]),TYPE:"bullet"}),
    ]
  };
  // split branch weapons
  Class.ROCKETER_Tower = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Tower",
    GUNS: [
      gun(0.9,0.5,1,0,0.1,30,2/3,{SHOOT_SETTINGS:combineStats([g.basic,{recoil:1/5}]),TYPE:"bullet"}),
      gun(0.9,0.5,1,0,-0.1,-30,2/3,{SHOOT_SETTINGS:combineStats([g.basic,{recoil:1/5}]),TYPE:"bullet"}),
      gun(1,0.5,1,0,0.05,15,1/3,{SHOOT_SETTINGS:combineStats([g.basic,{recoil:1/5}]),TYPE:"bullet"}),
      gun(1,0.5,1,0,-0.05,-15,1/3,{SHOOT_SETTINGS:combineStats([g.basic,{recoil:1/5}]),TYPE:"bullet"}),
      gun(1.1,0.5,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,{recoil:1/5}]),TYPE:"bullet"}),
    ]
  };
  // stream branch weapons
  Class.ROCKETER_Jet = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Jet",
    GUNS: [
      gun(0.6,0.5,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,{reload:1/5,recoil:1/3}]),TYPE:"growBullet"}),
    ]
  };
  // targeter branch weapons
  Class.ROCKETER_Streamliner = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Streamliner",
    GUNS: [
      gun(1.2,0.4,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,{reload:1/2,speed:1.25}]),TYPE:"bullet"}),
      gun(1.05,0.4,1,0,0,0,0.5,{SHOOT_SETTINGS:combineStats([g.basic,{reload:1/2,speed:1.25}]),TYPE:"bullet"}),
    ]
  };
  // marksman branch weapons
  Class.ROCKETER_Duel = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Duel",
    BODY:{FOV:1.75},
    GUNS: [
      gun(1.75,0.5,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.sniper,{reload:2.5,damage:3,pen:5,speed:1.75}]),TYPE:"bullet"}),
    ]
  };
  // single branch weapons
  Class.ROCKETER_Destroyer = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Destroyer",
    GUNS: [
      gun(1,1,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,{reload:5,damage:12,pen:6.25}]),TYPE:"bullet"}),
    ]
  };
  // tri-angle branch weapons
  Class.ROCKETER_Booster = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Booster",
    GUNS: [
      gun(0.9,0.4,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.flank]),TYPE:"bullet"}),
      gun(0.7,0.4,1,0,0,135,0,{SHOOT_SETTINGS:combineStats([g.basic,g.flank,{recoil:1.5}]),TYPE:"bullet"}),
      gun(0.7,0.4,1,0,0,225,0,{SHOOT_SETTINGS:combineStats([g.basic,g.flank,{recoil:1.5}]),TYPE:"bullet"}),
      gun(0.8,0.4,1,0,0,150,0.5,{SHOOT_SETTINGS:combineStats([g.basic,g.flank,{recoil:1.5}]),TYPE:"bullet"}),
      gun(0.8,0.4,1,0,0,210,0.5,{SHOOT_SETTINGS:combineStats([g.basic,g.flank,{recoil:1.5}]),TYPE:"bullet"}),
    ]
  };
  Class.ROCKETER_Fighter = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Fighter",
    GUNS: [
      gun(0.9,0.4,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.flank]),TYPE:"bullet"}),
      gun(0.8,0.4,1,0,0,90,0.5,{SHOOT_SETTINGS:combineStats([g.basic,g.flank]),TYPE:"bullet"}),
      gun(0.8,0.4,1,0,0,270,0.5,{SHOOT_SETTINGS:combineStats([g.basic,g.flank]),TYPE:"bullet"}),
      gun(0.8,0.4,1,0,0,150,0.5,{SHOOT_SETTINGS:combineStats([g.basic,g.flank,{recoil:1.5}]),TYPE:"bullet"}),
      gun(0.8,0.4,1,0,0,210,0.5,{SHOOT_SETTINGS:combineStats([g.basic,g.flank,{recoil:1.5}]),TYPE:"bullet"}),
    ]
  };
  // palisade branch weapons
  Class.ROCKETER_Builder = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Builder",
    GUNS: [
      gun(0.65,0.7,1,0,0,0,0,{}),
      gun(0.35,0.7,1.6,0.65,0,0,0,{SHOOT_SETTINGS:combineStats([g.trap,{reload:0.4,damage:0.8,pen:1.6}]),TYPE:"trap"}),
    ]
  };
  Class.ROCKETER_Warden = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Warden",
    GUNS: [
      gun(0.65,0.3,1,0,0,0,0,{}),
      gun(0.1,0.3,1.8,0.65,0,0,0,{SHOOT_SETTINGS:combineStats([g.trap,{reload:0.8,damage:0.8,pen:1.1}]),TYPE:"trap"}),
      
      gun(0.65,0.3,1,0,0,90,0,{}),
      gun(0.1,0.3,1.8,0.65,0,90,0,{SHOOT_SETTINGS:combineStats([g.trap,{reload:0.8,damage:0.8,pen:1.1}]),TYPE:"trap"}),
      
      gun(0.65,0.3,1,0,0,180,0,{}),
      gun(0.1,0.3,1.8,0.65,0,180,0,{SHOOT_SETTINGS:combineStats([g.trap,{reload:0.8,damage:0.8,pen:1.1}]),TYPE:"trap"}),
      
      gun(0.65,0.3,1,0,0,270,0,{}),
      gun(0.1,0.3,1.8,0.65,0,270,0,{SHOOT_SETTINGS:combineStats([g.trap,{reload:0.8,damage:0.8,pen:1.1}]),TYPE:"trap"}),
    ]
  };
  // minelayer branch weapons
  Class.ROCKETER_Engineer = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Engineer",
    GUNS: [
      gun(1,0.4,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.trap,g.block,{reload:0.7,range:0.4}]),TYPE:"pillbox"}),
      gun(0.75,0.6,1,0,0,0,0,{}),
    ]
  };
  // commander branch weapons
  Class.ROCKETER_Manager = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Manager",
    GUNS: [
      gun(1.05,0.55,2,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.drone,{reload:1/2.5}]),TYPE:"drone",MAX_CHILDREN:6}),
    ]
  };
  Class.ROCKETER_Executive = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Executive",
    GUNS: [
      gun(1.05,0.65,2,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.drone,{reload:1/3}]),TYPE:"drone",MAX_CHILDREN:8}),
    ]
  };
  Class.ROCKETER_Spawner = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Spawner",
    GUNS: [
      gun(0.2,0.35,1,0.6,0,0,0,{}),
      gun(0.15,0.55,1,0.8,0,0,0,{SHOOT_SETTINGS:combineStats([g.factory,{reload:1/4,speed:1.6}]),TYPE:"minion",MAX_CHILDREN:5,
                SYNCS_SKILLS: true,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.drone}),
      gun(0.6,0.55,1,0,0,0,0,{}),
    ]
  };
  // protector branch weapons
  Class.ROCKETER_King = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "King",
    GUNS: [
      gun(0.7,0.35,2,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.drone]),TYPE:"drone",MAX_CHILDREN:4}),
      gun(0.7,0.35,2,0,0,120,1/3,{SHOOT_SETTINGS:combineStats([g.drone]),TYPE:"drone",MAX_CHILDREN:4}),
      gun(0.7,0.35,2,0,0,240,1/3,{SHOOT_SETTINGS:combineStats([g.drone]),TYPE:"drone",MAX_CHILDREN:4}),
    ]
  };
  
  // bodies
  Class.ROCKETER_Node = {
    PARENT: 'ROCKETER_ParentB',
    PARENT: "genericTank",
    LABEL: "Node",
    TURRETS: [
      //none of this now
    ]
  };
  // node branch bodies
  Class.ROCKETER_Smasher = {
    PARENT: 'ROCKETER_ParentB',
    LABEL: "Smasher",
    BODY: {
      HEALTH: 0.8,
      DAMAGE: 1.25
    },
    TURRETS: [
      tankSection(1.1,0,0,0,0,0,["smasherBody",{TURRET_FACES_CLIENT:true}])
    ]
  };
  Class.ROCKETER_Raider = {
    PARENT: 'ROCKETER_ParentB',
    LABEL: "Raider",
    TURRETS: [
      tankSection(0.5,0,0,0,360,1,"ROCKETER_DmgAuraTop")
    ]
  };
  Class.ROCKETER_Wall = {
    PARENT: 'ROCKETER_ParentB',
    LABEL: "Wall",
    BODY: {
      HEALTH: 0.9,
      DAMAGE: 1.15,
      SPEED: 0.9
    },
    TURRETS: [
      tankSection(1.1,0,0,0,360,0,[{COLOR:9}])
    ]
  };
  Class.ROCKETER_Mono = {
    PARENT: 'ROCKETER_ParentB',
    LABEL: "Mono",
    TURRETS: [
      tankSection(0.5,0,0,0,360,1,["autoTurret",{INDEPENDENT: true, CONTROLLERS: ["nearestDifferentMaster"]}])
    ]
  };
  Class.ROCKETER_Hangar = {
    PARENT: 'ROCKETER_ParentB',
    LABEL: "Hangar",
    TURRETS: [
      tankSection(0.5,0,0,0,360,1,["ROCKETER_HangarSection",{INDEPENDENT: true, CONTROLLERS: ["nearestDifferentMaster"]}])
    ]
  };
  // smasher branch bodies
  Class.ROCKETER_Spike = {
    PARENT: 'ROCKETER_ParentB',
    LABEL: "Spike",
    BODY: {
      HEALTH: 0.7,
      DAMAGE: 1.4
    },
    TURRETS: [
      tankSection(1.2,0,0,0,0,0,["smasherBody",{TURRET_FACES_CLIENT:true}])
    ]
  };
  Class.ROCKETER_Armory = { // tip: this makes sense
    PARENT: 'ROCKETER_ParentB',
    LABEL: "Armory",
    BODY: {
      HEALTH: 0.8,
      DAMAGE: 1.25
    },
    TURRETS: [
      tankSection(1.1,0,0,0,0,0,["smasherBody",{TURRET_FACES_CLIENT:true}]),
      tankSection(0.5,0,0,0,360,1,["autoTurret",{INDEPENDENT: true, CONTROLLERS: ["nearestDifferentMaster"]}])
    ]
  };
  // raider branch bodies
  Class.ROCKETER_Forge = {
    PARENT: 'ROCKETER_ParentB',
    LABEL: "Forge",
    TURRETS: [
      tankSection(0.65,0,0,0,360,1,"ROCKETER_DmgAuraTop")
    ]
  };
  Class.ROCKETER_Mender = {
    PARENT: 'ROCKETER_ParentB',
    LABEL: "Mender",
    TURRETS: [
      tankSection(0.65,0,0,0,360,1,"ROCKETER_HealAuraTop")
    ]
  };
  Class.ROCKETER_Hail = { // one more type yesss
    PARENT: 'ROCKETER_ParentB',
    LABEL: "Hail",
    TURRETS: [
      tankSection(0.65,0,0,0,360,1,"ROCKETER_BlizzardAuraTop")
    ]
  };
  // wall branch bodies
  Class.ROCKETER_Castle = {
    PARENT: 'ROCKETER_ParentB',
    LABEL: "Castle",
    BODY: {
      HEALTH: 0.8,
      DAMAGE: 1.25,
      SPEED: 0.8
    },
    TURRETS: [
      tankSection(1.25,0,0,0,360,0,[{COLOR:9}])
    ]
  };
  // mono branch bodies
  Class.ROCKETER_SentrySection = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Section",
    GUNS: [
      gun(1,0.6,1,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.basic,{reload:5,damage:4,pen:3}]),TYPE:"bullet"}),
    ]
  };
  Class.ROCKETER_Sentry = { // tip: this makes sense
    PARENT: 'ROCKETER_ParentB',
    LABEL: "Sentry",
    TURRETS: [
      tankSection(0.6,0,0,0,360,1,["ROCKETER_SentrySection",{INDEPENDENT: true, CONTROLLERS: ["nearestDifferentMaster"]}])
    ]
  };
  Class.ROCKETER_TwinSection = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Section",
    GUNS: [
      gun(1,0.4,1,0,0.55,0,0,{SHOOT_SETTINGS:combineStats([g.basic,g.twin,{reload:2}]),TYPE:"bullet"}),
      gun(1,0.4,1,0,-0.55,0,0.5,{SHOOT_SETTINGS:combineStats([g.basic,g.twin,{reload:2}]),TYPE:"bullet"}),
    ]
  };
  Class.ROCKETER_Turret = {
    PARENT: 'ROCKETER_ParentB',
    LABEL: "Turret",
    TURRETS: [
      tankSection(0.6,0,0,0,360,1,["ROCKETER_TwinSection",{INDEPENDENT: true, CONTROLLERS: ["nearestDifferentMaster"]}])
    ]
  };
  // hangar branch bodies
  Class.ROCKETER_WarshipSection = {
    PARENT: "ROCKETER_ParentA",
    LABEL: "Section",
    GUNS: [
      gun(1.05,0.5,2,0,0,0,0,{SHOOT_SETTINGS:combineStats([g.drone,{reload:1/2}]),TYPE:"drone",MAX_CHILDREN:6}),
    ]
  };
  Class.ROCKETER_Warship = { 
    PARENT: 'ROCKETER_ParentB',
    LABEL: "Warship",
    TURRETS: [
      tankSection(0.6,0,0,0,360,1,["ROCKETER_WarshipSection",{INDEPENDENT: true, CONTROLLERS: ["nearestDifferentMaster"]}])
    ]
  };
  
  Class.addons.UPGRADES_TIER_0.push(
    ["ROCKETER_Basic","ROCKETER_Node"]
  );// if split upgrades don't exist in old aps++ templates just use the new version instead
  
  // weapon
  Class.ROCKETER_Basic.UPGRADES_TIER_1 = [
    "ROCKETER_Twin",
    "ROCKETER_Sniper",
    "ROCKETER_Cannon",
    "ROCKETER_Flank",
    "ROCKETER_Fortress",
    "ROCKETER_Guard",
  ];
    Class.ROCKETER_Twin.UPGRADES_TIER_2 = [
      "ROCKETER_Gunner",
      "ROCKETER_Quad",
      "ROCKETER_Split",
      "ROCKETER_Stream",
    ];
      Class.ROCKETER_Gunner.UPGRADES_TIER_3 = [
        "ROCKETER_Minesweeper",
        "ROCKETER_Blaster",
        "ROCKETER_Rimfire",
      ];
      Class.ROCKETER_Quad.UPGRADES_TIER_3 = [
        "ROCKETER_Blitz",
      ];
      Class.ROCKETER_Split.UPGRADES_TIER_3 = [
        "ROCKETER_Tower",
      ];
      Class.ROCKETER_Stream.UPGRADES_TIER_3 = [
        "ROCKETER_Jet",
      ];
    Class.ROCKETER_Sniper.UPGRADES_TIER_2 = [
      "ROCKETER_Targeter",
      "ROCKETER_Marksman",
    ];
      Class.ROCKETER_Targeter.UPGRADES_TIER_3 = [
        "ROCKETER_Streamliner",
      ];
      Class.ROCKETER_Marksman.UPGRADES_TIER_3 = [
        "ROCKETER_Duel",
      ];
    Class.ROCKETER_Cannon.UPGRADES_TIER_2 = [
      "ROCKETER_Single",
    ];
      Class.ROCKETER_Single.UPGRADES_TIER_3 = [
        "ROCKETER_Destroyer",
      ];
    Class.ROCKETER_Flank.UPGRADES_TIER_2 = [
      "ROCKETER_TriAngle",
    ];
      Class.ROCKETER_TriAngle.UPGRADES_TIER_3 = [
        "ROCKETER_Booster",
        "ROCKETER_Fighter",
      ];
    Class.ROCKETER_Fortress.UPGRADES_TIER_2 = [
      "ROCKETER_Palisade",
      "ROCKETER_Minelayer",
    ];
      Class.ROCKETER_Palisade.UPGRADES_TIER_3 = [
        "ROCKETER_Builder",
        "ROCKETER_Warden",
      ];
      Class.ROCKETER_Minelayer.UPGRADES_TIER_3 = [
        "ROCKETER_Engineer",
      ];
    Class.ROCKETER_Guard.UPGRADES_TIER_2 = [
      "ROCKETER_Commander",
      "ROCKETER_Protector",
    ];
      Class.ROCKETER_Commander.UPGRADES_TIER_3 = [
        "ROCKETER_Manager",
        "ROCKETER_Executive",
        "ROCKETER_Spawner",
      ];
      Class.ROCKETER_Protector.UPGRADES_TIER_3 = [
        "ROCKETER_King",
      ];
  // body
  Class.ROCKETER_Node.UPGRADES_TIER_1 = [
    "ROCKETER_Smasher",
    "ROCKETER_Raider",
    "ROCKETER_Wall",
    "ROCKETER_Mono",
    "ROCKETER_Hangar",
  ];
    Class.ROCKETER_Smasher.UPGRADES_TIER_2 = [
      "ROCKETER_Spike",
      "ROCKETER_Armory",
    ];
    Class.ROCKETER_Raider.UPGRADES_TIER_2 = [
      "ROCKETER_Forge",
      "ROCKETER_Mender",
      "ROCKETER_Hail",
    ];
    Class.ROCKETER_Wall.UPGRADES_TIER_2 = [
      "ROCKETER_Castle",
    ];
    Class.ROCKETER_Mono.UPGRADES_TIER_2 = [
      "ROCKETER_Sentry",
      "ROCKETER_Turret",
    ];
    Class.ROCKETER_Hangar.UPGRADES_TIER_2 = [
      "ROCKETER_Warship",
    ];
  
}
