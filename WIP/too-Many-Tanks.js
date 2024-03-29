const { dereference, combineStats, addBackGunner, makeAuto, makeHybrid, makeGuard } = require('../facilitators.js');
const { base, gunCalcNames, statnames, smshskl } = require('../constants.js');
const g = require('../gunvals.js');

let greekNumbers = ',Double ,Triple ,Quad ,Penta ,Hexa ,Septa ,Octo ,Nona ,Deca ,Undeca ,Dodeca ,Trideca ,Tetradeca ,Pentadeca ,Hexadeca ,Heptadeca ,Octadeca ,Nonadeca ,Icosa ,Henicosa ,Docosa ,Tricosa ,Triaconta ,Hentriaconta '.split(','),
makeMulti = (type, count, name = -1, startRotation = 0) => {
    let output = dereference(type),
        shootyBois = output.GUNS,
        fraction = 360 / count;
    output.GUNS = [];
    for (let gun of type.GUNS) {
        for (let i = 0; i < count; i++) {
            let newgun = dereference(gun);
            newgun.POSITION[5] += startRotation + fraction * i;
            if (gun.PROPERTIES) newgun.PROPERTIES.TYPE = gun.PROPERTIES.TYPE;
            output.GUNS.push(newgun);
        };
    }
    output.LABEL = name == -1 ? (greekNumbers[count - 1] || (count + ' ')) + type.LABEL : name;
    return output;
},

makeBird = (type, name = -1, color) => {
    let output = dereference(type),
        shootyBois = [{
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]), TYPE: "bullet", LABEL: gunCalcNames.thruster }
        },{
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]), TYPE: "bullet", LABEL: gunCalcNames.thruster }
        },{
            POSITION: [18, 8, 1, 0, 0, 180, 0.6],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]), TYPE: "bullet", LABEL: gunCalcNames.thruster }
        }];
    if (color) for (let i = 0; i < 3; i++) shootyBois[i].PROPERTIES.TYPE = [shootyBois[i].PROPERTIES.TYPE, { COLOR: color, KEEP_OWN_COLOR: true }];
    for (let i in output.GUNS) if (output.GUNS[i].PROPERTIES) output.GUNS[i].PROPERTIES.ALT_FIRE = true;
    if (output.FACING_TYPE == "locksFacing") output.FACING_TYPE = "toTarget";
    output.GUNS = type.GUNS == null ? [...shootyBois] : [...output.GUNS, ...shootyBois];
    output.LABEL = name == -1 ? "Bird " + type.LABEL : name;
    return output;
};

// Comment out the line below to enable this addon, uncomment it to disable this addon (WARNING: Increases load time by approximately 1.5x).
//return console.log('--- Too ManyTanks addon [too-Many-Tanks.js] is disabled. See lines 48-49 to enable it. ---');

//bullets
Class.laser = {
PARENT: ["bullet"],
SHAPE: "M -1 0.5 L -1 -0.5 L 1 -0.5 L 1 0.5",
BORDERLESS: true,
BODY: {
        PENETRATION: 999,
        SPEED: 15,
        RANGE: 135,
        DENSITY: 999,
        HEALTH: 0.18,
        DAMAGE: 8,
        PUSHABILITY: 0,
    },
ALPHA: 0.7
};
//tanks 
Class.twinPounder = {
   PARENT: ["genericTank"],
   LABEL: 'Twin Pounder',
   GUNS: [ {
         POSITION: [ 20.5, 12, 1, 0, 8, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 20.5, 12, 1, 0, -8, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
            TYPE: "bullet",
         }, },
	  {
         POSITION: [ 8, 9, 3, -9, 0, 0, 0, ],
         }, ],
};

Class.pacifierNormalTank = {
   PARENT: ["genericTank"],
   LABEL: 'Pacifier',
   GUNS: [ {
         POSITION: [ 17, 7, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 17, 7, 1, 0, 0, -180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: "bullet",
         }, }, ],
};
	
   Class.bentTwin = {
   PARENT: ["genericTank"],
   LABEL: 'Bent Twin',
   GUNS: [ {
         POSITION: [ 20, 8, 1, 0, 0, -30, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 20, 8, 1, 0, 0, 30, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin]),
            TYPE: "bullet",
         }, }, 
     ],
};
   Class.twinSniper = {
   PARENT: ["genericTank"],
   LABEL: 'Double Sniper',
   BODY: {
      FOV: base.FOV * 1.3,
   },
   GUNS: [ {
         POSITION: [ 25, 8.5, 1, 0, -5.5, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 25, 8.5, 1, 0, 5.5, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
            TYPE: "bullet",
         }, }, 
     ],
};
Class.sniperHybrid = makeHybrid (Class.sniper, "Soldier")
Class.sniperBird = makeBird (Class.sniper, "Kingfisher")
Class.hunterBird = makeBird (Class.hunter, "Hawk")
Class.rifleBird = makeBird (Class.rifle, "Owl")
Class.bbGun = {
   PARENT: ["genericTank"],
   LABEL: 'BB Gun',
   BODY: {
      FOV: base.FOV * 1.2,
   },
   GUNS: [ {
         POSITION: [ 24, 8.5, 1.4, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sniper]),
            TYPE: "bullet",
         }, }, 
     ],
};
Class.twinAssassin = {
   PARENT: ["genericTank"],
   LABEL: 'Double Assasin',
   BODY: {
      SPEED: base.SPEED * 0.8,
      FOV: base.FOV * 1.5,
   },
   GUNS: [ {
         POSITION: [ 27, 8, 1, 0, 5.5, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.assass]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 27, 8, 1, 0, -5.5, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.assass]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 5, 6, -1.4, 8, -5.5, 0, 0, ],
         }, {
         POSITION: [ 5, 6, -1.4, 8, 5.5, 0, 0, ],
         }, 
     ],
};
Class.twinHunter = {
   PARENT: ["genericTank"],
   LABEL: 'Double Hunter',
   BODY: {
      SPEED: base.SPEED * 0.9, FOV: base.FOV * 1.25,
   },
   GUNS: [ {
         POSITION: [ 24, 8, 1, 0, 8, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 24, 8, 1, 0, -8, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 21, 12, 1, 0, 8, 0, 0.75, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 21, 12, 1, 0, -8, 0, 0.25, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 8, 9, 3, -9, 0, 0, 0, ],
         }, 
     ],
};
   Class.twinMinigun = {
   PARENT: ["genericTank"],
   LABEL: 'Double Minigun',
   BODY: {
      FOV: base.FOV * 1.2,
   },
   GUNS: [ {
         POSITION: [ 21, 8, 1, 0, -5.5, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.twin]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 21, 8, 1, 0, 5.5, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.twin]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 19, 8, 1, 0, 5.5, 0, 1 / 3, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.twin]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 19, 8, 1, 0, -5.5, 0, 0.5 + 1 / 3, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.twin]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 17, 8, 1, 0, -5.5, 0,0.5 + 2 / 3, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.twin]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 17, 8, 1, 0, 5.5, 0, 2 / 3, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.twin]),
            TYPE: "bullet",
         }, }, 
     ],
};
Class.assassinHybrid = makeHybrid (Class.assassin, "Armyman")
Class.twinRifle = {
   PARENT: ["genericTank"],
   LABEL: 'Double Rifle',
   BODY: {
      FOV: base.FOV * 1.3,
   },
   GUNS: [ {
         POSITION: [ 20, 12, 1, 0, 8, 0, 0, ],
         }, {
         POSITION: [ 20, 12, 1, 0, -8, 0, 0, ],
         }, {
         POSITION: [ 24, 7, 1, 0, -8, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 24, 7, 1, 0, 8, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 8, 9, 3, -9, 0, 0, 0, ],
         }, 
     ],
};
Class.twinBushwhacker = makeGuard(Class.twinSniper, "Bushbushwhacker");
Class.assassinBushwhacker = makeGuard(Class.assassin, "Bushthrower");
Class.hunterBushwhacker = makeGuard(Class.hunter, "Bushthwaker");
Class.minigunBushwhacker = makeGuard(Class.minigun, "Minibusher");
Class.rifleBushwhacker = makeGuard(Class.rifle, "Bushrunner");
Class.tetraSniper = makeMulti (Class.sniper, 4, 'Tetra-Sniper')
Class.doubleTwinSniper = {
    PARENT: ["genericTank"],
    LABEL: "Double Twin Sniper",
    BODY: {FOV: base.FOV * 1.4},
    GUNS: [{
            POSITION: [24, 8.5, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.sniper]),
                TYPE: "bullet",},},{
            POSITION: [24, 8.5, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.sniper]),
                TYPE: "bullet",},},{
            POSITION: [24, 8.5, 1, 0, 5.5, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.sniper]),
                TYPE: "bullet",
            },},{
            POSITION: [24, 8.5, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.sniper]),
                TYPE: "bullet",},},
    ],
};
Class.twinDestroyer = {
   PARENT: ["genericTank"],
   LABEL: 'Twin Destroyer',
   DANGER: 7,
   GUNS: [ {
         POSITION: [ 21, 14, 1, 0, 10, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound, g.destroy]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 21, 14, 1, 0, -10, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound, g.destroy]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 10, 6.8, 5, -10.5, 0, 0, 0, ],
         }, 
     ],
};
Class.triplePounder = makeMulti (Class.pounder, 3, 'Triple-Pounder')
Class.laserGun = {
   PARENT: ["genericTank"],
   LABEL: 'Laser Gun',
   GUNS: [ {
         POSITION: [ 20, 10, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
            TYPE: "laser",
         }, }, {
         POSITION: [ 5, 5, 1, 13, 0, 0, 0, ],
         PROPERTIES: {COLOR: -1, ALPHA: 0.7, BORDERLESS: false},
         }, 
     ],
};
Class.twinLaserGun = {
   PARENT: ["genericTank"],
   LABEL: 'Double Laser Gun',
   GUNS: [ {
         POSITION: [ 20, 8, 1, 0, -6, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.twin]),
            TYPE: "laser",
         }, }, {
         POSITION: [ 5, 5, 1, 13, -6, 0, 0, ],
         PROPERTIES: {COLOR: -1, ALPHA: 0.7, BORDERLESS: false},
         }, {
         POSITION: [ 20, 8, 1, 0, 6, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.twin]),
            TYPE: "laser",
         }, }, {
         POSITION: [ 5, 5, 1, 13, 6, 0, 0, ],
         PROPERTIES: {COLOR: -1, ALPHA: 0.7, BORDERLESS: false},
         }, 
     ],
};
Class.sniperLaserGun = {
   PARENT: ["genericTank"],
   LABEL: 'Accurater',
   BODY: {FOV: base.FOV * 1.5},
   GUNS: [ {
         POSITION: [ 26, 10.5, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sniper]),
            TYPE: "laser",
         }, }, {
         POSITION: [ 5, 5, 1, 15, 0, 0, 0, ],
         PROPERTIES: {COLOR: -1, ALPHA: 0.7, BORDERLESS: false},
         }, 
     ],
};
Class.machineLaserGun = {
   PARENT: ["genericTank"],
   LABEL: 'Machine Laser Gun',
   GUNS: [ {
         POSITION: [ 20, 10, 1.5, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.mach]),
            TYPE: "laser",
         }, }, {
         POSITION: [ 5, 5, 1, 13, 0, 0, 0, ],
         PROPERTIES: {COLOR: -1, ALPHA: 0.7, BORDERLESS: false},
         }, 
     ],
};
Class.flankLaserGun = makeMulti (Class.laserGun, 3, 'Tri Laser Gun')

Class.pounderLaserGun = {
   PARENT: ["genericTank"],
   LABEL: 'Heavy Laser Gun',
   GUNS: [ {
         POSITION: [ 22.5, 13, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound]),
            TYPE: "laser",
         }, }, {
         POSITION: [ 7, 7, 1, 13, 0, 0, 0, ],
         PROPERTIES: {COLOR: -1, ALPHA: 0.7, BORDERLESS: false},
         }, 
     ],
};
Class.autoLaserGun = makeAuto (Class.laserGun, 'Auto Laser Gun')
Class.zapperTurret = {
   PARENT: ["genericEntity"],
   LABEL: '',
   TYPE: 'tank',
   SHAPE: 6,
};
Class.zapper = {
   PARENT: ["genericTank"],
   LABEL: 'Zapper',
   GUNS: [ {
         POSITION: [ 20, 10, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.single]),
            TYPE: "laser",
         }, }, {
         POSITION: [ 8, 8, 1, 10, 0, 0, 0, ],
	 PROPERTIES: {Color: -1,ALPHA: 0.7, BORDERLESS: true},
         }, {
         POSITION: [ 5, 5, 1, 12, 0, 0, 0, ],
	 PROPERTIES: {COLOR: -1, ALPHA: 0.7, BORDERLESS: false},
         }, 
     ],
  TURRETS: [{
            /** SIZE     X       Y     ANGLE    ARC */
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "zapperTurret",},],
};
Class.hologram = {
   PARENT: ["genericTank"],
   LABEL: 'Hologram',
   INVISIBLE: [0.06, 0.01],
   TOOLTIP: "Stay still to turn invisible.",
   SHAPE: 6,
   GUNS: [ {
         POSITION: [ 20, 10, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
            TYPE: "laser",
         }, }, {
         POSITION: [ 5, 5, 1, 13, 0, 0, 0, ],
         PROPERTIES: {COLOR: -1, ALPHA: 0.7, BORDERLESS: false},
         }, 
     ],
};

Class.blaster = {
   PARENT: ["genericTank"],
   LABEL: 'Blaster',
   BODY: { SPEED: base.SPEED * 1.1,FOV: base.FOV * 0.9,},
   GUNS: [ {
         POSITION: [ 20, 12, 1.5, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound]),
            TYPE: "bullet",
         }, }, ],
};
Class.blazer = {
   PARENT: ["genericTank"],
   LABEL: 'Blazer',
   BODY: {
      SPEED: base.SPEED * 0.8,
      FOV: base.FOV * 1.2,
   },
   GUNS: [ {
         POSITION: [ 21, 14, 1.3, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound, g.destroy]),
            TYPE: "bullet",
         }, }, 
     ],
};
Class.bloomer = {
   PARENT: ["genericTank"],
   LABEL: 'Bloomer',
   BODY: {
      SPEED: base.SPEED * 0.8,
      HEALTH: base.HEALTH * 0.95,
      FOV: base.FOV * 1.125,
   },
   GUNS: [ {
         POSITION: [ 20, 12, 1.8, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound, g.muchmorerecoil, g.morereload]),
            TYPE: "bullet",
         }, }, 
     ],
};
Class.blocker = {
   PARENT: ["genericTank"],
   LABEL: 'Blocker',
   GUNS: [ {
         POSITION: [ 20, 12, 1.4, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 5, 18, 1.4, 20, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound, g.block]),
            TYPE: "setTrap",
         }, }, {
         POSITION: [ 5, 8, 1, 20, 0, 0, 0, ],
         }, 
     ],
};

//upgrades

Class.twin.UPGRADES_TIER_2.push ("twinPounder", "pacifierNormalTank", "bentTwin", "twinSniper", "twinLaserGun")
Class.basic.UPGRADES_TIER_2.push ("laserGun")
Class.laserGun.UPGRADES_TIER_3 = ["twinLaserGun", "machineLaserGun", "sniperLaserGun", "flankLaserGun", "pounderLaserGun", "zapper", "autoLaserGun", "hologram"]  
Class.flankGuard.UPGRADES_TIER_3.push ("flankLaserGun") 
Class.minigun.UPGRADES_TIER_3.push ("minigunBushwhacker")
Class.pounder.UPGRADES_TIER_2.push ("twinPounder", "blaster")
Class.pounder.UPGRADES_TIER_3.push ("pounderLaserGun")
Class.twinPounder.UPGRADES_TIER_2 = ["twinDestroyer", "triplePounder"]
Class.sniper.UPGRADES_TIER_2.push ("twinSniper", "sniperHybrid", "sniperBird")
Class.sniper.UPGRADES_TIER_3.push ("bbGun", "sniperLaserGun")
Class.machineGun.UPGRADES_TIER_3 = ["bbGun", "machineLaserGun"]
Class.machineGun.UPGRADES_TIER_2.push ("blaster")
Class.sniperBird.UPGRADES_TIER_3 = ["falcon", "hunterBird", "vulture", "rifleBird"];
Class.sniperHybrid.UPGRADES_TIER_3 = ["assassinHybrid", "poacher", "cropDuster", "armsman"]
Class.assassin.UPGRADES_TIER_3.push ("twinAssassin", "assassinBushwhacker")
Class.hunter.UPGRADES_TIER_3.push ("twinHunter", "hunterBushwhacker",)
Class.minigun.UPGRADES_TIER_3.push ("twinMinigun")
Class.rifle.UPGRADES_TIER_3.push ("twinRifle", "rifleBushwhacker")
Class.bushwhacker.UPGRADES_TIER_3 = ["assassinBushwhacker", "hunterBushwhacker", "minigunBushwhacker", "rifleBushwhacker", "twinBushwhacker"]
Class.twinSniper.UPGRADES_TIER_3 = ["twinAssassin", "twinHunter", "twinMinigun", "twinRifle", "twinBushwhacker", "tetraSniper", "doubleTwinSniper"]
Class.blaster.UPGRADES_TIER_3 = ["blazer", "bloomer", "blocker"]
