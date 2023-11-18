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
let g = require('../gunvals')

// yeash

/**
 * 
 * @param {Object} params
 * @param {import("../../../..").Tanks} params.Class
 */
module.exports = ({ Class, Config }) => {

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
