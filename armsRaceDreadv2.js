const { combineStats, addAura, makeAuto } = require('../facilitators.js');
const { gunCalcNames, smshskl, base } = require('../constants.js');
const g = require('../gunvals.js');
const ensureIsClass = (Class, str) => {
    if ("object" == typeof str) {
        return str;
    }
    if (str in Class) {
        return Class[str];
    }
    throw Error(`Definition ${str} is attempted to be gotten but does not exist!`);
};
const eggnoughtBody = {
    SPEED: base.SPEED * 0.8,
    HEALTH: base.HEALTH * 1.75,
	SHIELD: base.SHIELD * 1.5,
	REGEN: base.REGEN * 1.5,
    FOV: base.FOV,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 1.5,
};
const squarenoughtBody = {
    SPEED: base.SPEED * 0.675,
    HEALTH: base.HEALTH * 2.5,
	SHIELD: base.SHIELD * 2,
	REGEN: base.REGEN * 2,
    FOV: base.FOV * 0.95,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 2,
};
const trinoughtBody = {
    SPEED: base.SPEED * 0.55,
    HEALTH: base.HEALTH * 3.5,
	SHIELD: base.SHIELD * 2.5,
	REGEN: base.REGEN * 2.5,
    FOV: base.FOV * 0.95,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 2.5,
};
const pentanoughtBody = {
    SPEED: base.SPEED * 0.425,
    HEALTH: base.HEALTH * 4.25,
	SHIELD: base.SHIELD * 3,
	REGEN: base.REGEN * 3,
    FOV: base.FOV * 0.95,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 3,
};
const hexnoughtBody = {
    SPEED: base.SPEED * 0.3,
    HEALTH: base.HEALTH * 5,
	SHIELD: base.SHIELD * 3.5,
	REGEN: base.REGEN * 3.5,
    FOV: base.FOV * 0.95,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 3.5,
};

module.exports = ({ Class }) => {
	// Comment out the line below to enable this addon, uncomment it to disable this addon (WARNING: Increases load time by approximately 3x).
	// return console.log('--- Arms Race Dreadnoughts v2 addon [armsRaceDreadv2.js] is disabled. See lines 60-61 to enable it. ---');
	console.log('--- The Arms Race Dreadnoughts v2 addon [armsRaceDreadv2.js] is intended to replace the regular Dreadnoughts v2 addon [dreadv2.js]. ' + 
				'Please make sure that the Dreadnoughts v2 addon has been disabled or does not exist.---');

	// Set the below variable to true to enable hex dreadnought building (WARNING: increases load time by approximately 10x)
	const buildHexnoughts = true;
	
	// For hexnought merging
	const hexnoughtScaleFactor = 0.9;

	// Missing stats
	g.flame = {reload: 0.5, recoil: 0.1, shudder: 1.5, range: 0.5, spray: 7, damage: 2, health: 1/3, speed: 0.6, maxSpeed: 0.3};
	g.honcho = {size: 2, damage: 2.5, health: 1.2, reload: 2, speed: 0.7};

	// Body helpers
	const hpBuffBodyStats = [
		{ HEALTH: 2.4, SHIELD: 2.4, REGEN: 2,   SPEED: 0.65 },
		{ HEALTH: 3.2, SHIELD: 3.2, REGEN: 2.5, SPEED: 0.5  },
		{ HEALTH: 4,   SHIELD: 4,   REGEN: 2.5, SPEED: 0.4  },
	];
	const speedBuffBodyStats = [
		{ SPEED: 1.75, HEALTH: 0.65 },
		{ SPEED: 2.15, HEALTH: 0.5  },
		{ SPEED: 2.35, HEALTH: 0.35 },
	];
	const sizeBuffBodyStats = [
		{ SPEED: 0.9,  HEALTH: 2.4 },
		{ SPEED: 0.85, HEALTH: 3.2 },
		{ SPEED: 0.8,  HEALTH: 3.7 },
	];
	function addTrinoughtAuraRing(heal = false) {
		let output = [],
			TYPE = heal ? "trinoughtSmallHealAura" : "trinoughtSmallAura";
		for (let i = 0; i < 3; i++) {
			output.push(
				{
					POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
					TYPE,
				},
			);
		}
		return output;
	}
	function addTrinoughtTurretRing() {
		let output = [];
		for (let i = 0; i < 3; i++) {
			output.push(
				{
					POSITION: [3.5, 10.5, 0, 120*i+60, 180, 1],
					TYPE: "spamAutoTurret",
				},
			);
		}
		return output;
	}
	function addPentanoughtAuraRing(heal = false) {
		let output = [],
			TYPE = heal ? "pentanoughtSmallHealAura" : "pentanoughtSmallAura";
		for (let i = 0; i < 5; i++) {
			output.push(
				{
					POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
					TYPE,
				},
			)
		}
		return output;
	}
	function addPentanoughtTurretRing() {
		let output = [];
		for (let i = 0; i < 5; i++) {
			output.push(
				{
					POSITION: [3.25, 9, 0, 72*i+36, 180, 1],
					TYPE: "spamAutoTurret",
				},
			)
		}
		return output;
	}

	// Misc
	Class.genericDreadnoughtARDreadV2 = {
		PARENT: ["genericTank"],
		SKILL_CAP: Array(10).fill(smshskl),
		REROOT_UPGRADE_TREE: ["dreadWeaponARDreadV2", "dreadBodyARDreadV2"],
	}
	Class.genericEggnought = {
		PARENT: ["genericDreadnoughtARDreadV2"],
		BODY: eggnoughtBody,
	    SHAPE: 0,
	    COLOR: 6,
	    SIZE: 14,
		DANGER: 8,
	}
	Class.genericSquarenought = {
		PARENT: ["genericDreadnoughtARDreadV2"],
		BODY: squarenoughtBody,
	    SHAPE: 4,
	    COLOR: 13,
	    SIZE: 18,
		DANGER: 9,
	}
	Class.genericTrinought = {
		PARENT: ["genericDreadnoughtARDreadV2"],
		BODY: trinoughtBody,
	    SHAPE: 3.5,
	    COLOR: 2,
	    SIZE: 21,
		DANGER: 10,
	}
	Class.genericPentanought = {
		PARENT: ["genericDreadnoughtARDreadV2"],
		BODY: pentanoughtBody,
	    SHAPE: 5.5,
	    COLOR: 14,
	    SIZE: 23,
		DANGER: 11,
	}
	Class.genericHexnought = {
		PARENT: ["genericDreadnoughtARDreadV2"],
		BODY: hexnoughtBody,
	    SHAPE: 6,
	    COLOR: 0,
	    SIZE: 24,
		DANGER: 12,
	}

	Class.spamAutoTurret = {
		PARENT: ["autoTankGun"],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [22, 10, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.auto, {recoil: 0.2}]),
					TYPE: "bullet",
				},
			},
		],
	}
	Class.supermissile = {
		PARENT: ["bullet"],
		LABEL: "Missile",
		INDEPENDENT: true,
		BODY: {
			RANGE: 120,
		},
		GUNS: [
			{
				POSITION: [14, 6, 1, 0, -2, 130, 0],
				PROPERTIES: {
					AUTOFIRE: true,
					SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
					TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
					STAT_CALCULATOR: gunCalcNames.thruster,
				},
			},
			{
				POSITION: [14, 6, 1, 0, 2, 230, 0],
				PROPERTIES: {
					AUTOFIRE: true,
					SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
					TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
					STAT_CALCULATOR: gunCalcNames.thruster,
				},
			},
			{
				POSITION: [14, 6, 1, 0, 0, 0, 0.2],
				PROPERTIES: {
					AUTOFIRE: true,
					SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.morespeed, g.morespeed]),
					TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
				},
			},
		],
	};
	Class.betadrone = {
		PARENT: ["drone"],
		TURRETS: [
			{
				POSITION: [10, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {COLOR: -1}],
			},
		]
	}

	// T0
	Class.dreadARDreadV2 = {
		PARENT: ["genericEggnought"],
		LABEL: "Dreadnought",
		UPGRADE_LABEL: "Dreadnought (V2)",
		LEVEL: 90,
		EXTRA_SKILL: 18,
	}
	Class.dreadWeaponARDreadV2 = {
		LABEL: "",
		COLOR: 6,
		REROOT_UPGRADE_TREE: "dreadWeaponARDreadV2",
	}
	Class.dreadBodyARDreadV2 = {
		LABEL: "",
		COLOR: 6,
		REROOT_UPGRADE_TREE: "dreadBodyARDreadV2",
	}

	// T1 Weapons
	Class.swordARDreadV2 = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Sword",
	    GUNS: [],
	}
	for (let i = 0; i < 2; i++) {
		Class.swordARDreadV2.GUNS.push(
			{
				POSITION: [20, 7, 1, 0, 0, 180*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.sword2ARDreadV2 = {
		PARENT: "swordARDreadV2",
		BATCH_UPGRADES: true,
	}
	Class.pacifierARDreadV2 = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Pacifier",
	    GUNS: [],
	}
	for (let i = 0; i < 2; i++) {
		Class.pacifierARDreadV2.GUNS.push(
			{
				POSITION: [15, 7, 1, 0, 0, 180*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, {reload: 0.8}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.pacifier2ARDreadV2 = {
		PARENT: "pacifierARDreadV2",
		BATCH_UPGRADES: true,
	}
	Class.peacekeeperARDreadV2 = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Peacekeeper",
	    GUNS: [],
	}
	for (let i = 0; i < 2; i++) {
		Class.peacekeeperARDreadV2.GUNS.push(
			{
				POSITION: [17, 9, 1, 0, 0, 180*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, {reload: 1.2, damage: 1.5}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.peacekeeper2ARDreadV2 = {
		PARENT: "peacekeeperARDreadV2",
		BATCH_UPGRADES: true,
	}
	Class.invaderARDreadV2 = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Invader",
	    GUNS: [],
	}
	for (let i = 0; i < 2; i++) {
		Class.invaderARDreadV2.GUNS.push(
			{
				POSITION: [5, 9, 1.2, 8, 0, 180*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, {reload: 0.85}]),
					TYPE: "drone",
					MAX_CHILDREN: 4,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
		)
	}
	Class.invader2ARDreadV2 = {
		PARENT: "invaderARDreadV2",
		BATCH_UPGRADES: true,
	}
	Class.centaurARDreadV2 = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Centaur",
	    GUNS: [],
	}
	for (let i = 0; i < 2; i++) {
		Class.centaurARDreadV2.GUNS.push(
			{
				POSITION: [13, 7, 1, 0, 0, 180*i, 0],
			},
			{
				POSITION: [3, 7, 1.5, 13, 0, 180*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, {health: 2}]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		)
	}
	Class.centaur2ARDreadV2 = {
		PARENT: "centaurARDreadV2",
		BATCH_UPGRADES: true,
	}

	// T1 Bodies
	Class.byteTurretARDreadV2 = {
		PARENT: ["autoTankGun"],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [22, 10, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.auto, {health: 1.2, speed: 0.8}]),
					TYPE: "bullet",
				},
			},
		],
	}
	Class.byteARDreadV2 = {
	    PARENT: ["genericEggnought"],
		LABEL: "Byte",
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 0, 0, 1],
				TYPE: 'egg',
			},
			{
				POSITION: [9, 0, 0, 0, 360, 1],
				TYPE: 'byteTurretARDreadV2',
			},
		],
	}
	Class.showerTurretARDreadV2 = {
		PARENT: "genericTank",
		LABEL: "",
		BODY: {
		  	FOV: 1.5,
		},
		CONTROLLERS: [[ 'spin', {speed: 0.03}]],
		COLOR: 16,
		INDEPENDENT: true,
		MAX_CHILDREN: 4,
		GUNS: [
			{
				POSITION: [6, 12, 1.2, 8, 0, 0, 0],
				PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.drone, {size: 1.3}]),
				TYPE: ['drone', {INDEPENDENT: true}],
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				STAT_CALCULATOR: gunCalcNames.drone,
				WAIT_TO_CYCLE: true,
				},
			},
		],
	}
	Class.showerARDreadV2 = { // Drones
	    PARENT: ["genericEggnought"],
	    LABEL: "Shower",
	    BODY: {
			SPEED: 0.93,
			FOV: 1.1,
		},
		TURRETS: [
			{
				POSITION: [15, 0, 0, 0, 0, 1],
				TYPE: 'egg',
			},
			{
				POSITION: [10, 0, 0, 0, 360, 1],
				TYPE: "showerTurretARDreadV2",
			},
		],
	}
	Class.atmosphereAuraARDreadV2 = addAura();
	Class.atmosphereARDreadV2 = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Atmosphere",
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 0, 0, 1],
				TYPE: 'egg',
			},
			{
				POSITION: [11, 0, 0, 0, 360, 1],
				TYPE: 'atmosphereAuraARDreadV2',
			},
		],
	}
	Class.juggernautARDreadV2 = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Juggernaut",
		BODY: {
			HEALTH: 1.6,
			SHIELD: 1.6,
			REGEN: 1.5,
			SPEED: 0.8,
		},
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 0, 0, 1],
				TYPE: 'egg',
			},
			{
				POSITION: [24, 0, 0, 0, 0, -1],
				TYPE: ['egg', {COLOR: 9}]
			},
		],
	}
	Class.stomperARDreadV2 = { // Size increase
	    PARENT: ["genericEggnought"],
		LABEL: "Stomper",
		SIZE: 1.2,
		BODY: {
			SPEED: 0.9,
			HEALTH: 1.6,
		},
		GUNS: [],
		TURRETS: [
			{
				POSITION: [10, 0, 0, 0, 0, 1],
				TYPE: 'egg',
			},
		],
	}
	for(let i = 0; i < 2; i++) {
		Class.stomperARDreadV2.GUNS.push(
			{
				POSITION: [10, 10, 0, 0, 0, 180*i+90, 0],
				PROPERTIES: {COLOR: 9, DRAW_ABOVE: true},
			},
		)
	}
	Class.dropperTurretARDreadV2 = {
		PARENT: 'genericTank',
		CONTROLLERS: [["spin", {speed: -0.035}]],
		INDEPENDENT: true,
		LABEL: "",
		COLOR: 16,
		GUNS: [
			{ 
				POSITION: [8, 32, 1, -4, 0, 0, 0],
			},
		],
	}
    Class.dropperARDreadV2 = { // Minelayer
	    PARENT: ["genericEggnought"],
	    LABEL: "Dropper",
		GUNS: [
			{
				POSITION: [0, 7, 1, 3, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, {maxSpeed: 1e-3, speed: 1e-3}]),
					TYPE: 'trap',
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			}
		],
		TURRETS: [
			{
				POSITION: [14, 0, 0, 0, 0, 1],
				TYPE: 'egg',
			},
			{
				POSITION: [10, 0, 0, 0, 360, 1],
				TYPE: 'dropperTurretARDreadV2',
			}
		],
	}
	Class.spotterRadarARDreadV2 = {
		PARENT: 'genericTank',
		CONTROLLERS: [['spin', {speed: 0.02}]],
		INDEPENDENT: true,
		SHAPE: [[0.225, 1], [0.225, -1], [-0.225, -1], [-0.225, 1]],
		COLOR: 17,
		GUNS: [
		  {
			POSITION: [4.5, 26, 1, -2.25, 0, 0, 0],
			PROPERTIES: {COLOR: -1}
		  }
		]
	};
    Class.spotterARDreadV2 = { // FOV
	    PARENT: ["genericEggnought"],
	    LABEL: "Spotter",
		BODY: {
			FOV: 1.1,
		},
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 0, 0, 1],
				TYPE: 'egg',
			},
			{
				POSITION: [9, 0, 0, 0, 0, 1],
				TYPE: 'egg',
			},
			{
				POSITION: [13, 0, 0, 0, 360, 1],
				TYPE: 'spotterRadarARDreadV2',
			},
		],
	}

	// T2 Weapons
	Class.sabreARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Sabre",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.sabreARDreadV2.GUNS.push(
			{
				POSITION: [24, 7, 1, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.assass, {reload: 0.85, density: 1/2}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [5, 7, -1.7, 7, 0, 90*i, 0],
			},
		)
	}
	Class.gladiusARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Gladius",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.gladiusARDreadV2.GUNS.push(
			{
				POSITION: [17, 8, 1, 0, 0, 90*i, 0],
			},
			{
				POSITION: [19.5, 5, 1, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, {health: 1.3}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.slingARDreadV2 = { // hunter
	    PARENT: ["genericSquarenought"],
	    LABEL: "Sling",
		CONTROLLERS: [["zoom", { distance: 300 }]],
    	TOOLTIP: "Hold right click to zoom.",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.slingARDreadV2.GUNS.push(
			{
				POSITION: [20, 6, 1, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, {health: 1.1, speed: 1.05}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 9, 1, 0, 0, 90*i, 0.25],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, {health: 1.1, speed: 1.05}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.catapultARDreadV2 = { // mega-sniper
	    PARENT: ["genericSquarenought"],
	    LABEL: "Catapult",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.catapultARDreadV2.GUNS.push(
			{
				POSITION: [22, 9, 1, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.preda, g.preda, g.preda, g.bitlessspeed, g.one_third_reload, {size: 2}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [4, 11, 1, 15, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.preda, g.preda, g.preda, g.one_third_reload, g.fake]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.dartARDreadV2 = { // railgun
	    PARENT: ["genericSquarenought"],
	    LABEL: "Dart",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.dartARDreadV2.GUNS.push(
			{
				POSITION: [21.5, 7, 1, 0, 0, 90*i, 0],
			},
			{
				POSITION: [25, 4, 1, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniper, g.sniper, g.pound, g.lessreload]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [5, 7, -1.7, 7, 0, 90*i, 0],
			},
		)
	}
	Class.mediatorARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Mediator",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.mediatorARDreadV2.GUNS.push(
			{
				POSITION: [15, 7, 1, 0, 4.25, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.twin, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [15, 7, 1, 0, -4.25, 90*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.twin, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.negotiatorARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Negotiator",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.negotiatorARDreadV2.GUNS.push(
			{
				POSITION: [9, 8, 1.4, 6, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, {size: 0.8, health: 1.3}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.melderAutoARDreadV2 = {
		PARENT: 'autoTankGun',
		GUNS: [
			{
				POSITION: [22, 10, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, {reload: 1.1}]),
					TYPE: "bullet",
				},
			},
		],
	}
	Class.melderARDreadV2 = { // all auto
	    PARENT: ["genericSquarenought"],
	    LABEL: "Melder",
		TURRETS: [],
	}
	for(let i = 0; i < 4; i++) {
		Class.melderARDreadV2.TURRETS.push(
			{
				POSITION: [10, 9, 0, 90*i, 195, 0],
				TYPE: 'autoTankGun',
			},
		)
	  }
	Class.crackerARDreadV2 = { // ultra bullet spam
	    PARENT: ["genericSquarenought"],
	    LABEL: "Cracker",
	    GUNS: [],
	}
	for(let i = 0; i < 4; i++) {
		Class.crackerARDreadV2.GUNS.push(
			{
				POSITION: [19, 8, 1, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mini, {reload: 0.85}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [17, 8, 1, 0, 0, 90*i, 1 / 3],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mini, {reload: 0.85}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [15, 8, 1, 0, 0, 90*i, 2 / 3],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mini, {reload: 0.85}]),
					TYPE: 'bullet',
				},
			},
		)
	}
	Class.grabberTurretARDreadV2 = {
		PARENT: ["autoTankGun"],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [22, 10, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.flank, g.auto, {reload: 0.9, recoil: 0.25}]),
					TYPE: "bullet",
				},
			},
		],
	};
	Class.grabberARDreadV2 = { // crowbar
	    PARENT: ["genericSquarenought"],
	    LABEL: "Grabber",
	    GUNS: [],
		TURRETS: [],
	}
	for(let i = 0; i < 4; i++) {
		Class.grabberARDreadV2.GUNS.push(
			{
				POSITION: [38, 6.5, 1, 0, 0, 90*i, 0],
			},
			{
				POSITION: [5, 8.5, -1.5, 8, 0, 90*i, 0],
			},
		)
		Class.grabberARDreadV2.TURRETS.push(
			{
				POSITION: [6.5, 38, 0, 90*i, 200, 1],
				TYPE: 'grabberTurretARDreadV2',
			},
			{
				POSITION: [6.5, 28, 0, 90*i, 200, 1],
				TYPE: 'grabberTurretARDreadV2',
			},
		)
	}
	Class.enforcerARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Enforcer",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.enforcerARDreadV2.GUNS.push(
			{
				POSITION: [17, 9, 1, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, {reload: 0.9}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.executorARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Executor",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.executorARDreadV2.GUNS.push(
			{
				POSITION: [11, 6, 1, 8, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.halfspeed, {reload: 0.8}]),
					TYPE: "missile",
					STAT_CALCULATOR: gunCalcNames.sustained,
				},
			},
			{
				POSITION: [17, 9, 1, 0, 0, 90*i, 0],	
			},
		)
	}
	Class.doserARDreadV2 = { // shotgun
	    PARENT: ["genericSquarenought"],
	    LABEL: "Doser",
	    GUNS: [],
	}
	for(let i = 0; i < 4; i++) {
		Class.doserARDreadV2.GUNS.push(
			{
				POSITION: [4, 3, 1, 11, -3, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, {health: 1.4, damage: 1.4}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [4, 3, 1, 11, 3, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, {health: 1.4, damage: 1.4}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [4, 4, 1, 13, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, {health: 1.4, damage: 1.4}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [1, 4, 1, 12, -1, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, {health: 1.4, damage: 1.4}]),
					TYPE: 'casing',
				},
			},
			{
				POSITION: [1, 4, 1, 11, 1, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, {health: 1.4, damage: 1.4}]),
					TYPE: 'casing',
				},
			},
			{
				POSITION: [15, 12, 1, 6, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
					TYPE: 'casing',
				},
			},
			{
				POSITION: [6, 12, -1.3, 6, 0, 90*i, 0],
			},
		)
	}
	Class.swirlMissileARDreadV2 = {
		PARENT: 'spinmissile',
		GUNS: [
			{
				POSITION: [14, 8, 1, 0, 0, 0, 0],
				PROPERTIES: {
					AUTOFIRE: !0,
					SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.morespeed]),
					TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
					STAT_CALCULATOR: gunCalcNames.thruster,
				},
			},
			{
				POSITION: [14, 8, 1, 0, 0, 180, 0],
				PROPERTIES: {
					AUTOFIRE: !0,
					SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.morespeed]),
					TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
					STAT_CALCULATOR: gunCalcNames.thruster,
				},
			},
		],
	}
	Class.swirlARDreadV2 = { // twister
	    PARENT: ["genericSquarenought"],
	    LABEL: "Swirl",
	    GUNS: [],
	}
	for(let i = 0; i < 4; i++) {
		Class.swirlARDreadV2.GUNS.push(
			{
				POSITION: [10, 9, -0.5, 9, 0, 90*i, 0],
			},
			{
				POSITION: [17, 10, -1.4, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.morespeed, g.one_third_reload]),
					TYPE: "swirlMissileARDreadV2",
					STAT_CALCULATOR: gunCalcNames.sustained,
				},
			},
		)
	}
	Class.pelterARDreadV2 = { // artillery
	    PARENT: ["genericSquarenought"],
	    LABEL: "Pelter",
	    GUNS: [],
	}
	for(let i = 0; i < 4; i++) {
		Class.pelterARDreadV2.GUNS.push(
			{
				POSITION: [15, 3, 1, 0, -3.5, 90*i-7, 0.25],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, {health: 1.1}]),
					TYPE: "bullet",
					LABEL: "Secondary",
				},
			},
			{
				POSITION: [15, 3, 1, 0, 3.5, 90*i+7, 0.75],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, {health: 1.1}]),
					TYPE: "bullet",
					LABEL: "Secondary",
				},
			},
			{
				POSITION: [17, 8, 1, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, {health: 1.1}]),
					TYPE: "bullet",
					LABEL: "Heavy",
				},
			},
		)
	}
	Class.inquisitorARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Inquisitor",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.inquisitorARDreadV2.GUNS.push(
			{
				POSITION: [5, 11, 1.1, 8, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, {size: 1.5, reload: 0.6}]),
					TYPE: "drone",
					MAX_CHILDREN: 3,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
		)
	}
	Class.assailantMinionARDreadV2 = {
		PARENT: ["minion"],
		BODY: {
			SPEED: 0.5,
		},
		SHAPE: 4,
	    COLOR: 13,
		GUNS: []
	}
	for (let i = 0; i < 4; i++) {
		Class.assailantMinionARDreadV2.GUNS.push(
			{
				POSITION: [15, 7.5, 1, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.assass, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		)
	}
	Class.assailantARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Assailant",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.assailantARDreadV2.GUNS.push(
			{
				POSITION: [5, 10, 1, 10.5, 0, 90*i, 0],
			},
			{
				POSITION: [1.5, 11, 1, 15, 0, 90*i, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, {size: 0.9, reload: 0.5}]),
					TYPE: "assailantMinionARDreadV2",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					MAX_CHILDREN: 2,
				},
			},
			{
				POSITION: [12, 11, 1, 0, 0, 90*i, 0],
			},
		)
	}
	Class.radiationARDreadV2 = { // auto-drones
	    PARENT: ["genericSquarenought"],
	    LABEL: "Radiation",
	    GUNS: [],
	}
	for(let i = 0; i < 4; i++) {
		Class.radiationARDreadV2.GUNS.push(
			{
				POSITION: [6, 10, 1.2, 8, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, {reload: 0.8}]),
					TYPE: "turretedDrone",
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
					MAX_CHILDREN: 2,
				},
			},
			{
				POSITION: [12, 5, 1, 0, 0, 90*i, 0],
			},
		)
	};
	Class.boxerARDreadV2 = { // honcho
	    PARENT: ["genericSquarenought"],
	    LABEL: "Boxer",
	    GUNS: [],
	}
	for(let i = 0; i < 4; i++) {
		Class.boxerARDreadV2.GUNS.push(
			{
				POSITION: [5, 11, 1.5, 8, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, g.honcho]),
					TYPE: "drone",
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
					MAX_CHILDREN: i % 2 + 1,
				},
			},
		)
	};
	Class.disablerARDreadV2 = { // swarms
	    PARENT: ["genericSquarenought"],
	    LABEL: "Disabler",
	    GUNS: [],
	}
	for(let i = 0; i < 4; i++) {
		Class.disablerARDreadV2.GUNS.push(
			{
				POSITION: [7, 7, 0.6, 6, 3.5, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.swarm, g.over, g.over, g.lessreload]),
					TYPE: "swarm",
					STAT_CALCULATOR: gunCalcNames.swarm,
				},
			},
			{
				POSITION: [7, 7, 0.6, 6, -3.5, 90*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.swarm, g.over, g.over, g.lessreload]),
					TYPE: "swarm",
					STAT_CALCULATOR: gunCalcNames.swarm,
				},
			},
		)
	};
	Class.daemonARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Daemon",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.daemonARDreadV2.GUNS.push(
			{
				POSITION: [11.5, 4.5, 1, 0, 4.5, 90*i, 0],
			},
			{
				POSITION: [2, 4.5, 1.7, 11, 4.5, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, {health: 2}]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [11.5, 4.5, 1, 0, -4.5, 90*i, 0],
			},
			{
				POSITION: [2, 4.5, 1.7, 11, -4.5, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, {health: 2}]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		)
	}
	Class.minotaurARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Minotaur",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.minotaurARDreadV2.GUNS.push(
			{
				POSITION: [13, 7, 1, 0, 0, 90*i, 0],
			},
			{
				POSITION: [3.75, 7, 1.75, 13, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, {health: 2}]),
					TYPE: "unsetTrap",
				},
			},
		)
	}
	Class.autoTrap = {
		PARENT: 'trap',
		TURRETS: [
			{
				POSITION: [11, 0, 0, 0, 360, 1],
				TYPE: "pillboxTurret",
			},
		],
	}
	Class.cleanerARDreadV2 = { // auto-traps
	    PARENT: ["genericSquarenought"],
	    LABEL: "Cleaner",
	    GUNS: [],
	}
	for(let i = 0; i < 4; i++) {
		Class.cleanerARDreadV2.GUNS.push(
			{
				POSITION: [15, 6, 1, 0, 0, 90*i, 0],
			},
			{
				POSITION: [12, 9, 1, 0, 0, 90*i, 0],
			},
			{
				POSITION: [3, 6, 1.7, 15, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, {health: 1.2, reload: 1.15}]),
					TYPE: 'autoTrap',
					STAT_CALCULATOR: gunCalcNames.trap,
					INDEPENDENT: true,
				},
			},
		)
	}
	Class.auraTrapAura = addAura(1/3, 2, 0.15);
	Class.auraTrap = makeAuto(Class.trap, "", {type: 'auraTrapAura'});
	Class.shadeARDreadV2 = { // aura-traps
	    PARENT: ["genericSquarenought"],
	    LABEL: "Shade",
	    GUNS: [],
	}
	for(let i = 0; i < 4; i++) {
		Class.shadeARDreadV2.GUNS.push(
			{
				POSITION: [14, 7, 1, 0, 0, 90*i, 0],
			},
			{
				POSITION: [3, 7, 1.6, 14, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, {range: 0.8, health: 1.2}]),
					TYPE: 'auraTrap',
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [2, 5, 1.6, 15, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.fake]),
					TYPE: 'bullet',
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		)
	}
	Class.screwdriverARDreadV2 = { // trap + gun
	    PARENT: ["genericSquarenought"],
	    LABEL: "Screwdriver",
	    GUNS: [],
	}
	for(let i = 0; i < 4; i++) {
		Class.screwdriverARDreadV2.GUNS.push(
			{
				POSITION: [19, 7, 1, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
					TYPE: 'bullet',
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [13.5, 8, 1, 0, 0, 90*i, 0],
			},
			{
				POSITION: [3, 8, 1.6, 13.5, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
					TYPE: 'trap',
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		)
	}

	// T2 Bodies
	Class.automationARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Automation",
	    TURRETS: [
			{
				POSITION: [11, 0, 0, 0, 0, 1],
				TYPE: ["square", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 4; i++) {
		Class.automationARDreadV2.TURRETS.push(
			{
				POSITION: [4, 9, 0, 90*i+45, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.kilobyteTurretARDreadV2 = {
		PARENT: ["autoTankGun"],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [26, 10, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.assass, g.auto, {health: 1.2, speed: 0.8}]),
					TYPE: "bullet",
				},
			},
		],
	}
	Class.kilobyteARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Kilobyte",
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: ["square", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [10, 0, 0, 0, 360, 1],
				TYPE: "kilobyteTurretARDreadV2",
			},
		],
	}
	Class.lighterTurretARDreadV2 = {
		PARENT: 'genericTank',
		COLOR: 16,
		CONTROLLERS: ['nearestDifferentMaster'],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [15, 11, 1, 0, 0, 180, 0],
				PROPERTIES: {COLOR: 13},
			},
			{
				POSITION: [16.5, 7, 1, 0, 0, 180, 0],
			},
			{
				POSITION: [14, 2, 1, 0, 7, 0, 0],
			},
			{
				POSITION: [14, 2, 1, 0, -7, 0, 0],
			},
			{
				POSITION: [22, 7, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.flame]),
					TYPE: 'growBullet',
				}
			},
		],
	};
	Class.lighterARDreadV2 = { // Flamethrower
	    PARENT: ["genericSquarenought"],
	    LABEL: "Lighter",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 0, 0, 1],
				TYPE: ["square", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [9, 0, 0, 0, 360, 1],
				TYPE: 'lighterTurretARDreadV2',
			}
		],
	}
	Class.stormTurretARDreadV2 = {
		PARENT: 'genericTank',
		LABEL: "",
		BODY: {
		  	FOV: 1.5,
		},
		CONTROLLERS: [[ 'spin', {speed: 0.03}]],
		COLOR: 16,
		INDEPENDENT: true,
		MAX_CHILDREN: 6,
		GUNS: [
			{
				POSITION: [6, 12, 1.2, 8, 0, 90, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, {size: 1.2}]),
					TYPE: ['drone', {INDEPENDENT: true}],
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
			{
				POSITION: [6, 12, 1.2, 8, 0, 270, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, {size: 1.3}]),
					TYPE: ['drone', {INDEPENDENT: true}],
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
		],
	};
	Class.stormARDreadV2 = { // Drones
	    PARENT: ["genericSquarenought"],
	    LABEL: "Storm",
		BODY: {
			SPEED: 0.93,
			FOV: 1.1,
		},
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 0, 0, 1],
				TYPE: ["square", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [10, 0, 0, 0, 360, 1],
				TYPE: 'stormTurretARDreadV2',
			}
		],
	}
	Class.coronaAuraARDreadV2 = addAura(1.5, 0.8);
	Class.coronaARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Corona",
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 0, 0, 1],
				TYPE: ["square", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [11, 0, 0, 0, 360, 1],
				TYPE: "coronaAuraARDreadV2",
			},
		],
	}
	Class.thermosphereAuraARDreadV2 = addAura(-1, 1.5);
	Class.thermosphereARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Thermosphere",
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 0, 0, 1],
				TYPE: ["square", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [11, 0, 0, 0, 360, 1],
				TYPE: "thermosphereAuraARDreadV2",
			},
		],
	}
	Class.jumboARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Jumbo",
	    BODY: hpBuffBodyStats[0],
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 0, 0, 1],
				TYPE: ['square', {MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [24, 0, 0, 0, 0, -1],
				TYPE: ['square', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
		],
	}
	Class.colossalTopARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.colossalTopARDreadV2.GUNS.push(
			{
				POSITION: [3.5, 17.5, 0.001, 9, 0, 90*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.colossalBottomARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.colossalTopARDreadV2.GUNS.push(
			{
				POSITION: [3.5, 17.5, 0.001, 9, 0, 90*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	for (let i = 0; i < 4; i++) {
		Class.colossalBottomARDreadV2.GUNS.push(
			{
				POSITION: [4, 17.5, 0.001, 9, 0, 90*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.colossalARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Colossal",
		BODY: speedBuffBodyStats[0],
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 0, 0, 1],
				TYPE: ['colossalTopARDreadV2', {MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [20, 0, 0, 0, 0, -1],
				TYPE: ['colossalBottomARDreadV2', {MIRROR_MASTER_ANGLE: true}]
			},
		],
	}
	Class.cottonTurretARDreadV2 = {
		PARENT: ["genericSquarenought"],
		MIRROR_MASTER_ANGLE: true,
		SHAPE: [[1, 0], [0, 1], [-1, 0], [0, -1]],
		GUNS: [],
	}
	for(let i = 0; i < 4; i++) {
		Class.cottonTurretARDreadV2.GUNS.push(
			{
				POSITION: [25, 16, 0.001, 0, 0, 90*i+45, 0],
				PROPERTIES: {COLOR: 9}
			},
		)
	}
	Class.cottonARDreadV2 = { // Drifter
	    PARENT: ["genericSquarenought"],
	    LABEL: "Cotton",
		BODY: {
			SPEED: 1.9,
			ACCELERATION: 0.25,
		},
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: 'cottonTurretARDreadV2',
			}
		],
	}
	Class.ironTopARDreadV2 = {
		PARENT: ["genericSquarenought"],
		SHAPE: 0,
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	for(let i = 0; i < 8; i++) {
		Class.ironTopARDreadV2.GUNS.push(
			{
				POSITION: [8, 6, 0.001, 20, 0, 45*i, 0],
				PROPERTIES: {COLOR: 9},
			},
			{
				POSITION: [8, 6, 0.001, -20, 0, 45*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.ironBottomARDreadV2 = {
		PARENT: ["genericSquarenought"],
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	for(let i = 0; i < 4; i++) {
		Class.ironBottomARDreadV2.GUNS.push(
			{
				POSITION: [6, 6, 0.001, 9.5, 5, 90*i, 0],
				PROPERTIES: {COLOR: 9},
			},
			{
				POSITION: [6, 6, 0.001, 9.5, -5, 90*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.ironARDreadV2 = { // Body damage increase
	    PARENT: ["genericSquarenought"],
	    LABEL: "Iron",
		BODY: {
			DAMAGE: 2,
			PENETRATION: 1.6,
		},
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [5.5, 0, 0, 0, 0, 1],
				TYPE: 'ironTopARDreadV2',
			},
			{
				POSITION: [20, 0, 0, 0, 0, -1],
				TYPE: 'ironBottomARDreadV2',
			},
		],
	}
	Class.rollerTurretARDreadV2 = {
		PARENT: ["genericSquarenought"],
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	for(let i = 0; i < 4; i++) {
		Class.rollerTurretARDreadV2.GUNS.push(
			{
				POSITION: [20, 20, 0, 0, 0, 90*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.rollerARDreadV2 = { // Size increase
	    PARENT: ["genericSquarenought"],
	    LABEL: "Roller",
		SIZE: 1.3,
		BODY: sizeBuffBodyStats[0],
	    TURRETS: [
			{
				POSITION: [10, 0, 0, 0, 0, 1],
				TYPE: 'rollerTurretARDreadV2',
			}
		],
	}
	Class.owlARDreadV2 = { // Size decrease
	    PARENT: ["genericSquarenought"],
	    LABEL: "Owl",
		SIZE: 0.85,
		BODY: {
			HEALTH: 0.8,
			SPEED: 1.1,
			ACCELERATION: 1.25,
		},
	    TURRETS: [
			{
				POSITION: [11, 0, 0, 0, 0, 1],
				TYPE: ['square', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [11 / Math.SQRT2, 0, 0, 45, 0, 1],
				TYPE: ['square', {MIRROR_MASTER_ANGLE: true}]
			},
		],
	}
	Class.baiterTurretARDreadV2 = {
		PARENT: 'genericTank',
		CONTROLLERS: [["spin", {speed: -0.035}]],
		INDEPENDENT: true,
		LABEL: "",
		COLOR: 16,
		GUNS: [
			{ 
			  	POSITION: [8, 28, 1, -4, 0, 0, 0],
			},
			{
				POSITION: [8, 28, 1, -4, 0, 90, 0],
			},
		],
		TURRETS: [
			{
			  	POSITION: [16, 0, 0, 0, 0, 1],
			  	TYPE: ['egg', {COLOR: 13}]
			},
		]
	}
    Class.baiterARDreadV2 = { // Minelayer
	    PARENT: ["genericSquarenought"],
	    LABEL: "Baiter",
		GUNS: [
			{
				POSITION: [0, 12, 1, 8, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, {health: 1.3, maxSpeed: 1e-3, speed: 1e-3}]),
					TYPE: 'trap',
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			}
		],
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 0, 0, 1],
				TYPE: ['square', {MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [11, 0, 0, 0, 360, 1],
				TYPE: 'baiterTurretARDreadV2'
			},
		],
	}
	Class.spyRadarARDreadV2 = {
		PARENT: 'genericTank',
		CONTROLLERS: [['spin', {speed: 0.02}]],
		INDEPENDENT: true,
		SHAPE: [[0.2, 1], [0.2, -1], [-0.2, -1], [-0.2, 1]],
		COLOR: 17,
		GUNS: [
			{
				POSITION: [4, 26, 1, -2, 0, 0, 0],
				PROPERTIES: {COLOR: 13}
			}
		]
	}
    Class.spyARDreadV2 = { // FOV
	    PARENT: ["genericSquarenought"],
	    LABEL: "Spy",
		BODY: {
			FOV: 1.2,
			SPEED: 0.95,
		},
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 0, 0, 1],
				TYPE: ['square', {MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [10, 0, 0, 0, 0, 1],
				TYPE: ['egg', {COLOR: 16, MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [6, 0, 0, 0, 0, 1],
				TYPE: ['egg', {COLOR: 13, MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [15, 0, 0, 0, 360, 1],
				TYPE: 'spyRadarARDreadV2',
			}
		],
	}

	// T3 Weapons
	Class.bayonetARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Bayonet",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.bayonetARDreadV2.GUNS.push(
			{
				POSITION: [28, 7, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.assass, g.assass, {reload: 0.8, density: 2/5}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [5, 7, -1.6, 7, 0, 120*i, 0],
			},
		)
	}
	Class.bladeARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Blade",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.bladeARDreadV2.GUNS.push(
			{
				POSITION: [17, 1, 1, 0, 6, 120*i, 0],
			},
			{
				POSITION: [17, 1, 1, 0, -6, 120*i, 0],
			},
			{
				POSITION: [18, 5, 1, 0, 3, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin, {speed: 0.8, health: 1.5}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [18, 5, 1, 0, -3, 120*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin, {speed: 0.8, health: 1.5}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.atlatlARDreadV2 = { // hunter
	    PARENT: ["genericTrinought"],
	    LABEL: "Atlatl",
	    CONTROLLERS: [["zoom", { distance: 500 }]],
    	TOOLTIP: "Hold right click to zoom.",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.atlatlARDreadV2.GUNS.push(
			{
				POSITION: [21, 6, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.hunter, g.hunter2, {health: 1.1}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [18, 9, 1, 0, 0, 120*i, 0.25],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.hunter, {health: 1.1}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [5, 9, -1.6, 6, 0, 120*i, 0],
			},
		)
	}
	Class.ballistaARDreadV2 = { // mega-sniper
	    PARENT: ["genericTrinought"],
	    LABEL: "Ballista",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.ballistaARDreadV2.GUNS.push(
			{
				POSITION: [22, 11, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.preda, g.preda, g.preda, g.bitlessspeed, g.lessreload, {health: 1.2, size: 2}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [4, 13, 1, 15, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.preda, g.preda, g.preda, g.lessreload, g.fake]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.barbARDreadV2 = { // railgun
	    PARENT: ["genericTrinought"],
	    LABEL: "Barb",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.barbARDreadV2.GUNS.push(
			{
				POSITION: [23, 7, 1, 0, 0, 120*i, 0],
			},
			{
				POSITION: [26.5, 4, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniper, g.sniper, g.pound, g.lessreload, {damage: 1.2}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [5, 7, -1.7, 7, 0, 120*i, 0],
			},
		)
	}
	Class.mitigatorARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Mitigator",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.mitigatorARDreadV2.GUNS.push(
			{
				POSITION: [13, 8, 1, 0, 5, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [13, 8, 1, 0, -5, 120*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.appeaserARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Appeaser",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.appeaserARDreadV2.GUNS.push(
			{
				POSITION: [7, 11, 1.35, 6, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, {size: 0.8}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [7, 10, 1.3, 8, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, {size: 0.8, reload: 0.9}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.amalgamAutoARDreadV2 = {
		PARENT: 'autoTankGun',
		BODY: {FOV: 2},
		GUNS: [
			{
				POSITION: [16, 4, 1, 0, -3.5, 0, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.power, g.twin, g.bent, {recoil: 0.5}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [16, 4, 1, 0, 3.5, 0, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.power, g.twin, g.bent, {recoil: 0.5}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [18, 4, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.power, g.twin, g.bent, {recoil: 0.5}]),
					TYPE: "bullet",
				},
			},
		],
	}
	Class.amalgamARDreadV2 = { // all auto
	    PARENT: ["genericTrinought"],
	    LABEL: "Amalgam",
		TOOLTIP: "Reverse tank to focus more fire.",
		TURRETS: [],
	}
	for(let i = 0; i < 3; i++) {
		Class.amalgamARDreadV2.TURRETS.push(
			{
				POSITION: [11, 7, 0, 120*i, 190, 0],
				TYPE: 'amalgamAutoARDreadV2',
			},
		)
	};
	Class.breakerARDreadV2 = { // ultra bullet spam
	    PARENT: ["genericTrinought"],
	    LABEL: "Breaker",
	    GUNS: [],
	}
	for(let i = 0; i < 3; i++) {
		Class.breakerARDreadV2.GUNS.push(
			{
				POSITION: [19, 2.75, 1, 0, -3, 120*i, 1/3],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.nail, {speed: 1.05, maxSpeed: 1.05}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [19, 2.75, 1, 0, 3, 120*i, 2/3],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.nail, {speed: 1.05, maxSpeed: 1.05}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [21.5, 2.75, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.nail, {speed: 1.05, maxSpeed: 1.05}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [5.5, 9, -1.8, 6.5, 0, 120*i, 0],
			},
		)
	}
	Class.clasperTurretARDreadV2 = {
		PARENT: ["auto4gun"],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [16, 4, 1, 0, -3.5, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.flank, g.flank, g.slow, {recoil: 0.25}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [16, 4, 1, 0, 3.5, 0, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.flank, g.flank, g.slow, {recoil: 0.25}]),
					TYPE: "bullet",
				},
			},
		],
	};
	Class.clasperARDreadV2 = { // crowbar
	    PARENT: ["genericTrinought"],
	    LABEL: "Clasper",
	    GUNS: [],
		TURRETS: [],
	}
	for(let i = 0; i < 3; i++) {
		Class.clasperARDreadV2.GUNS.push(
			{
				POSITION: [38, 6.5, 1, 0, 0, 120*i, 0],
			},
			{
				POSITION: [5, 8.5, -1.5, 8, 0, 120*i, 0],
			},
		)
		Class.clasperARDreadV2.TURRETS.push(
			{
				POSITION: [6.5, 38, 0, 120*i, 200, 1],
				TYPE: 'clasperTurretARDreadV2'
			},
			{
				POSITION: [6.5, 28, 0, 120*i, 200, 1],
				TYPE: 'clasperTurretARDreadV2'
			},
			{
				POSITION: [6.5, 18, 0, 120*i, 200, 1],
				TYPE: 'clasperTurretARDreadV2'
			},
		)
	}
	Class.suppressorARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Suppressor",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.suppressorARDreadV2.GUNS.push(
			{
				POSITION: [16.5, 11.5, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.inhibitorARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Inhibitor",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.inhibitorARDreadV2.GUNS.push(
			{
				POSITION: [10, 14, -0.75, 7, 0, 120*i, 0],
			},
			{
				POSITION: [15, 15, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.halfspeed, {reload: 0.8}]),
					TYPE: "supermissile",
					STAT_CALCULATOR: gunCalcNames.sustained,
				},
			},
		)
	}
	Class.tranquilizerARDreadV2 = { // shotgun
	    PARENT: ["genericTrinought"],
	    LABEL: "Tranquilizer",
	    GUNS: [],
	}
	for(let i = 0; i < 3; i++) {
		Class.tranquilizerARDreadV2.GUNS.push(
			{
				POSITION: [4, 3, 1, 11, -3, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, {health: 1.4, damage: 1.4}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [4, 3, 1, 11, 3, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, {health: 1.4, damage: 1.4}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [4, 4, 1, 13, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, {health: 1.4, damage: 1.4}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [1, 4, 1, 12, -1, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, {health: 1.4, damage: 1.4}]),
					TYPE: 'casing',
				},
			},
			{
				POSITION: [1, 5, 1, 11, 1, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, {health: 1.4, damage: 1.4}]),
					TYPE: 'casing',
				},
			},
			{
				POSITION: [1, 5, 1, 11, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, {health: 1.4, damage: 1.4}]),
					TYPE: 'casing',
				},
			},
			{
				POSITION: [15, 14, 1, 6, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
					TYPE: 'casing',
				},
			},
			{
				POSITION: [8, 14, -1.3, 4, 0, 120*i, 0],
			},
		)
	}
	Class.spiralMissileARDreadV2 = {
		PARENT: 'spinmissile',
		GUNS: [
			{
				POSITION: [14, 8, 1, 0, 0, 0, 0],
				PROPERTIES: {
					AUTOFIRE: !0,
					SHOOT_SETTINGS: combineStats([g.basic, g.rocketeer, g.morespeed]),
					TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
					STAT_CALCULATOR: gunCalcNames.thruster,
				},
			},
			{
				POSITION: [14, 8, 1, 0, 0, 180, 0],
				PROPERTIES: {
					AUTOFIRE: !0,
					SHOOT_SETTINGS: combineStats([g.basic, g.rocketeer, g.morespeed]),
					TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
					STAT_CALCULATOR: gunCalcNames.thruster,
				},
			},
		],
	}
	Class.spiralARDreadV2 = { // twister
	    PARENT: ["genericTrinought"],
	    LABEL: "Spiral",
	    GUNS: [],
	}
	for(let i = 0; i < 3; i++) {
		Class.spiralARDreadV2.GUNS.push(
			{
				POSITION: [10, 10, -0.5, 9, 0, 120*i, 0],
			},
			{
				POSITION: [17, 11, -1.4, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.morespeed, g.fast, g.one_third_reload]),
					TYPE: "spiralMissileARDreadV2",
					STAT_CALCULATOR: gunCalcNames.sustained,
				},
			},
		)
	}
	Class.shellerARDreadV2 = { // artillery
	    PARENT: ["genericTrinought"],
	    LABEL: "Sheller",
	    GUNS: [],
	}
	for(let i = 0; i < 3; i++) {
		Class.shellerARDreadV2.GUNS.push(
			{
				POSITION: [12.5, 3, 1, 0, -6.5, 120*i-7, 0.6],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
					TYPE: "bullet",
					LABEL: "Secondary",
				},
			},
			{
				POSITION: [12.5, 3, 1, 0, 6.5, 120*i+7, 0.8],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
					TYPE: "bullet",
					LABEL: "Secondary",
				},
			},
			{
				POSITION: [15.5, 3, 1, 0, -4.5, 120*i-7, 0.2],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
					TYPE: "bullet",
					LABEL: "Secondary",
				},
			},
			{
				POSITION: [15.5, 3, 1, 0, 4.5, 120*i+7, 0.4],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
					TYPE: "bullet",
					LABEL: "Secondary",
				},
			},
			{
				POSITION: [17.5, 10, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.destroy, g.arty]),
					TYPE: "bullet",
					LABEL: "Heavy",
				},
			},
		)
	}
	Class.infiltratorARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Infiltrator",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.infiltratorARDreadV2.GUNS.push(
			{
				POSITION: [5, 6, 1.4, 6, 5.5, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, {size: 1.5, reload: 0.6}]),
					TYPE: "drone",
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
			{
				POSITION: [5, 6, 1.4, 6, -5.5, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, {size: 1.5, reload: 0.6}]),
					TYPE: "drone",
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
			{
				POSITION: [5, 6, 1.4, 8, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, g.pound, {size: 2, reload: 0.4}]),
					TYPE: "betadrone",
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
		)
	}
	Class.aggressorMinionARDreadV2 = {
		PARENT: ["minion"],
		SHAPE: 3.5,
		COLOR: 2,
		BODY: {
			SPEED: 0.8,
		},
		GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.aggressorMinionARDreadV2.GUNS.push(
			{
				POSITION: [16, 8.5, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.bitlessspeed, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		)
	}
	Class.aggressorARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Aggressor",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.aggressorARDreadV2.GUNS.push(
			{
				POSITION: [5, 12, 1, 10, 0, 120*i, 0],
			},
			{
				POSITION: [1.5, 13, 1, 15, 0, 120*i, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, {size: 0.9, reload: 0.5}]),
					TYPE: "aggressorMinionARDreadV2",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					MAX_CHILDREN: 2,
				},
			},
			{
				POSITION: [12, 13, 1, 0, 0, 120*i, 0],
			},
		)
	}
	Class.haloARDreadV2 = { // auto-drones
	    PARENT: ["genericTrinought"],
	    LABEL: "Halo",
	    GUNS: [],
	}
	for(let i = 0; i < 3; i++) {
		Class.haloARDreadV2.GUNS.push(
			{
				POSITION: [5, 14.5, 1.2, 8, 0, 120*i, 0],
				PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.drone, g.over, {reload: 1.2, size: 0.8, speed: 1.15, maxSpeed: 1.15}]),
					TYPE: 'turretedDrone',
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
					MAX_CHILDREN: 4,
				},
			},
			{
				POSITION: [3, 7, 1, 8, 0, 120*i, 0],
			},
		)
	}
	Class.sluggerARDreadV2 = { // honcho
	    PARENT: ["genericTrinought"],
	    LABEL: "Slugger",
	    GUNS: [],
	}
	for(let i = 0; i < 3; i++) {
		Class.sluggerARDreadV2.GUNS.push(
			{
				POSITION: [5, 13, 1.5, 8, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.honcho, {maxSpeed: 0.9, size: 0.75}]),
					TYPE: "drone",
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
					MAX_CHILDREN: 2,
				},
			},
		)
	};
	Class.debilitatorARDreadV2 = { // swarms
	    PARENT: ["genericTrinought"],
	    LABEL: "Debilitator",
	    GUNS: [],
	}
	for(let i = 0; i < 3; i++) {
		Class.debilitatorARDreadV2.GUNS.push(
			{
				POSITION: [6, 9, 0.6, 6, 5, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.swarm, g.over, g.over, {reload: 1.1}]),
					TYPE: "swarm",
					STAT_CALCULATOR: gunCalcNames.swarm,
				},
			},
			{
				POSITION: [6, 9, 0.6, 6, -5, 120*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.swarm, g.over, g.over, {reload: 1.1}]),
					TYPE: "swarm",
					STAT_CALCULATOR: gunCalcNames.swarm,
				},
			},
		)
	};
	Class.hydraARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Hydra",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.hydraARDreadV2.GUNS.push(
			{
				POSITION: [6, 3.5, 1, 4, 8.5, 120*i, 0],
			},
			{
				POSITION: [2, 3.5, 1.8, 10, 8.5, 120*i, 2/3],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pound, g.fast]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [6, 3.5, 1, 4, -8.5, 120*i, 0],
			},
			{
				POSITION: [2, 3.5, 1.8, 10, -8.5, 120*i, 1/3],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pound, g.fast]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [12, 5, 1, 0, 0, 120*i, 0],
			},
			{
				POSITION: [2.5, 5, 1.7, 12, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.twin, g.pound, g.fast, {reload: 1/1.1}]),
					TYPE: "unsetTrap",
				},
			},
		)
	}
	Class.beelzebubARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Beelzebub",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.beelzebubARDreadV2.GUNS.push(
			{
				POSITION: [13, 10, 1, 0, 0, 120*i, 0],
			},
			{
				POSITION: [3.5, 10, 1.6, 13, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.morespeed, {size: 1.2, health: 2}]),
					TYPE: "unsetTrap",
				},
			},
		)
	}
	Class.sweeperARDreadV2 = { // auto-traps
	    PARENT: ["genericTrinought"],
	    LABEL: "Sweeper",
	    GUNS: [],
	}
	for(let i = 0; i < 3; i++) {
		Class.sweeperARDreadV2.GUNS.push(
			{
				POSITION: [5, 12, 1, 7.5, 0, 120*i, 0],
			},
			{
				POSITION: [3, 15, 1, 13, 0, 120*i, 0],
			},
			{
				POSITION: [2, 15, 1.3, 15.5, 0, 120*i, 0],
				PROPERTIES: {
					MAX_CHILDREN: 5,
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.halfreload, {reload: 1.25}]),
					TYPE: 'unsetPillbox',
					SYNCS_SKILLS: true,
					DESTROY_OLDEST_CHILD: true,
					INDEPENDENT: true,
				},
			},
			{
				POSITION: [5, 15, 1, 5, 0, 120*i, 0],
			},
		)
	}
	Class.auraBlockAura = addAura(1/3, 1.6, 0.15);
	Class.auraBlock = makeAuto(Class.unsetTrap, "", {type: 'auraBlockAura'});
	Class.aegisARDreadV2 = { // aura-traps
	    PARENT: ["genericTrinought"],
	    LABEL: "Aegis",
	    GUNS: [],
	}
	for(let i = 0; i < 3; i++) {
		Class.aegisARDreadV2.GUNS.push(
			{
				POSITION: [14, 8.5, 1, 0, 0, 120*i, 0],
			},
			{
				POSITION: [3, 10, 1, 11, 0, 120*i, 0],
			},
			{
				POSITION: [3, 10, 1.6, 14, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.hexatrap, {range: 0.8, health: 1.2}]),
					TYPE: 'auraBlock',
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [2, 8, 1.6, 15, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.hexatrap, g.fake]),
					TYPE: 'bullet',
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		)
	}
	Class.drillARDreadV2 = { // trap + gun
	    PARENT: ["genericTrinought"],
	    LABEL: "Drill",
	    GUNS: [],
	}
	for(let i = 0; i < 3; i++) {
		Class.drillARDreadV2.GUNS.push(
			{
				POSITION: [20, 9, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
					TYPE: 'bullet',
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [13.5, 11, 1, 0, 0, 120*i, 0],
			},
			{
				POSITION: [3, 11, 1.4, 13.5, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.hexatrap]),
					TYPE: 'unsetTrap',
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		)
	}

	// T3 Bodies
	Class.mechanismARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Mechanism",
	    TURRETS: [
			{
				POSITION: [10, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.mechanismARDreadV2.TURRETS.push(
			{
				POSITION: [3.5, 6, 0, 120*i, 180, 1],
				TYPE: "spamAutoTurret",
			},
			{
				POSITION: [3.5, 10, 0, 120*i+60, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.trinoughtBigAura = addAura(2, 1.5);
	Class.fusionARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Fusion",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			...addTrinoughtTurretRing(),
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigAura",
			},
		],
	}
	Class.binaryARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Binary",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			...addTrinoughtTurretRing(),
			{
				POSITION: [10, 0, 0, 0, 360, 1],
				TYPE: "kilobyteTurretARDreadV2",
			},
		],
	}
	Class.trinoughtBigHealAura = addAura(-1.5, 1.5);
	Class.exosphereARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Exosphere",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			...addTrinoughtTurretRing(),
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigHealAura",
			},
		],
	}
	Class.megabyteTurretARDreadV2 = {
		PARENT: ["autoTankGun"],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [26, 13, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pound, g.auto, {health: 1.2, speed: 0.8}]),
					TYPE: "bullet",
				},
			},
		],
	}
	Class.megabyteARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Megabyte",
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [12, 0, 0, 0, 360, 1],
				TYPE: "megabyteTurretARDreadV2",
			},
		],
	}
	Class.trinoughtSmallAura = addAura(1, 2.1, 0.15);
	Class.trojanARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Trojan",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			...addTrinoughtAuraRing(),
			{
				POSITION: [10, 0, 0, 0, 360, 1],
				TYPE: "kilobyteTurretARDreadV2",
			},
		],
	}
	Class.trinoughtSmallHealAura = addAura(-2/3, 2.1, 0.15);
	Class.hardwareARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Hardware",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			...addTrinoughtAuraRing(true),
			{
				POSITION: [10, 0, 0, 0, 360, 1],
				TYPE: "kilobyteTurretARDreadV2",
			},
		],
	}
	Class.burnerTurretARDreadV2 = {
		PARENT: 'genericTank',
		COLOR: 16,
		CONTROLLERS: ['nearestDifferentMaster'],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [15, 11, 1, 0, 0, 140, 0],
				PROPERTIES: {COLOR: 2},
			},
			{
				POSITION: [16.5, 7, 1, 0, 0, 140, 0],
			},
			{
				POSITION: [15, 11, 1, 0, 0, -140, 0],
				PROPERTIES: {COLOR: 2},
			},
			{
				POSITION: [16.5, 7, 1, 0, 0, -140, 0],
			},
			{
				POSITION: [16, 2, 1, 0, 7.5, 0, 0],
			},
			{
				POSITION: [16, 2, 1, 0, -7.5, 0, 0],
			},
			{
				POSITION: [24, 8, 1.25, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.flame, g.morespeed]),
					TYPE: 'growBullet',
				}
			},
		],
		TURRETS: [
			{
				POSITION: [11, 0, 0, 0, 0, 1],
				TYPE: ['egg', {COLOR: 2}]
			}
		]
	};
	Class.burnerARDreadV2 = { // Flamethrower
	    PARENT: ["genericTrinought"],
	    LABEL: "Burner",
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [9, 0, 0, 0, 360, 1],
				TYPE: 'burnerTurretARDreadV2',
			}
		],
	}
	Class.tempestTurretARDreadV2 = {
		PARENT: 'genericTank',
		LABEL: "",
		BODY: {
		  	FOV: 1.5,
		},
		CONTROLLERS: [[ 'spin', {speed: 0.03}]],
		COLOR: 16,
		INDEPENDENT: true,
		MAX_CHILDREN: 9,
		GUNS: [],
	};
	for (let i = 0; i < 3; i++) {
		Class.tempestTurretARDreadV2.GUNS.push(
			{
				POSITION: [6, 12, 1.2, 8, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, {size: 1.4}]),
					TYPE: ['drone', {INDEPENDENT: true}],
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
		)
	}
	Class.tempestARDreadV2 = { // Drones
	    PARENT: ["genericTrinought"],
	    LABEL: "Tempest",
	    BODY: {
			SPEED: 0.93,
			FOV: 1.1,
		},
		TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [10, 0, 0, 0, 360, 1],
				TYPE: 'tempestTurretARDreadV2',
			},
		]
	}
	Class.chromosphereARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Chromosphere",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			...addTrinoughtAuraRing(),
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigAura",
			},
		],
	}
	Class.mesosphereARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Mesosphere",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			...addTrinoughtAuraRing(true),
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigHealAura",
			},
		],
	}
	Class.goliathARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Goliath",
	    BODY: hpBuffBodyStats[1],
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 180, 0, 1],
				TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [24, 0, 0, 180, 0, -1],
				TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
		],
	}
	Class.planetARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Planet",
		BODY: hpBuffBodyStats[0],
	    TURRETS: [
			{
				POSITION: [24, 0, 0, 180, 0, -1],
				TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			...addTrinoughtAuraRing(),
		],
	}
	Class.moonARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Moon",
		BODY: hpBuffBodyStats[0],
	    TURRETS: [
			{
				POSITION: [24, 0, 0, 180, 0, -1],
				TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			...addTrinoughtAuraRing(true),
		],
	}
	Class.burgARDreadV2 = { // HP + auto spam
	    PARENT: ["genericTrinought"],
	    LABEL: "Burg",
		BODY: hpBuffBodyStats[0],
	    TURRETS: [
			{
				POSITION: [24, 0, 0, 180, 0, -1],
				TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			...addTrinoughtTurretRing(),
		],
	}
	Class.siloARDreadV2 = { // HP + big auto
	    PARENT: ["genericTrinought"],
	    LABEL: "Silo",
		BODY: hpBuffBodyStats[0],
	    TURRETS: [
			{
				POSITION: [24, 0, 0, 180, 0, -1],
				TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [10, 0, 0, 0, 360, 1],
				TYPE: "kilobyteTurretARDreadV2",
			},
		],
	}
	Class.titanTopARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.titanTopARDreadV2.GUNS.push(
			{
				POSITION: [5, 26, 0.001, 8, 0, 120*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.titanARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Titan",
		BODY: speedBuffBodyStats[1],
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [11, 0, 0, 0, 0, 1],
				TYPE: ["titanTopARDreadV2", {MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [20, 0, 0, 0, 0, -1],
				TYPE: ["titanTopARDreadV2", {MIRROR_MASTER_ANGLE: true}]
			},
		],
	}
	Class.sirenARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Siren",
		BODY: speedBuffBodyStats[0],
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [20, 0, 0, 0, 0, -1],
				TYPE: ["titanTopARDreadV2", {MIRROR_MASTER_ANGLE: true}]
			},
			...addTrinoughtAuraRing(),
		],
	}
	Class.harpyARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Harpy",
		BODY: speedBuffBodyStats[0],
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [20, 0, 0, 0, 0, -1],
				TYPE: ["titanTopARDreadV2", {MIRROR_MASTER_ANGLE: true}]
			},
			...addTrinoughtAuraRing(true),
		],
	}
	Class.batonARDreadV2 = { // Speed + auto spam
	    PARENT: ["genericTrinought"],
	    LABEL: "Baton",
		BODY: speedBuffBodyStats[0],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [20, 0, 0, 0, 0, -1],
				TYPE: ["titanTopARDreadV2", {MIRROR_MASTER_ANGLE: true}]
			},
			...addTrinoughtTurretRing(),
		],
	}
	Class.fireworkARDreadV2 = { // Speed + big auto
	    PARENT: ["genericTrinought"],
	    LABEL: "Firework",
		BODY: speedBuffBodyStats[0],
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [20, 0, 0, 0, 0, -1],
				TYPE: ["titanTopARDreadV2", {MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [10, 0, 0, 0, 360, 1],
				TYPE: "kilobyteTurretARDreadV2",
			},
		],
	}
	Class.armadaARDreadV2 = { // Speed + HP
	    PARENT: ["genericTrinought"],
	    LABEL: "Armada",
		BODY: {
			HEALTH: 1.8, 
			SHIELD: 1.8, 
			REGEN: 1.4, 
			SPEED: 1.75,
		},
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 180, 0, 1],
				TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [20, 0, 0, 0, 0, -1],
				TYPE: ["titanTopARDreadV2", {MIRROR_MASTER_ANGLE: true}]
			},
		],
	}
	Class.featherTurretARDreadV2 = {
		PARENT: ["genericTrinought"],
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	for(let i = 0; i < 3; i++) {
		Class.featherTurretARDreadV2.GUNS.push(
			{
				POSITION: [29, 19, 0.001, 3, 0, 120*i+60, 0],
				PROPERTIES: {COLOR: 9}
			},
		)
	}
	Class.featherARDreadV2 = { // Drifter
	    PARENT: ["genericTrinought"],
	    LABEL: "Feather",
		BODY: {
			SPEED: 2.05,
			ACCELERATION: 0.21,
		},
	    TURRETS: [
			{
				POSITION: [10, 0, 0, 0, 0, 1],
				TYPE: 'featherTurretARDreadV2',
			}
		],
	}
	Class.steelTopARDreadV2 = {
		PARENT: ["genericTrinought"],
		SHAPE: 0,
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	for(let i = 0; i < 9; i++) {
		Class.steelTopARDreadV2.GUNS.push(
			{
				POSITION: [8, 6, 0.001, 20, 0, 40*i, 0],
				PROPERTIES: {COLOR: 9},
			},
			{
				POSITION: [8, 6, 0.001, -20, 0, 40*i+20, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.steelBottomARDreadV2 = {
		PARENT: ["genericTrinought"],
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	for(let i = 0; i < 3; i++) {
		Class.steelBottomARDreadV2.GUNS.push(
			{
				POSITION: [3, 5, 0.001, 8, 7.5, 120*i, 0],
				PROPERTIES: {COLOR: 9},
			},
			{
				POSITION: [3, 5, 0.001, 8, 0, 120*i, 0],
				PROPERTIES: {COLOR: 9},
			},
			{
				POSITION: [3, 5, 0.001, 8, -7.5, 120*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.steelARDreadV2 = { // Body damage increase
	    PARENT: ["genericTrinought"],
	    LABEL: "Steel",
		BODY: {
			DAMAGE: 3,
			PENETRATION: 2.2,
		},
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [6, 0, 0, 0, 360, 1],
				TYPE: 'steelTopARDreadV2'
			},
			{
				POSITION: [20, 0, 0, 0, 360, -1],
				TYPE: 'steelBottomARDreadV2'
			},
		],
	}
	Class.flattenerTurretARDreadV2 = {
		PARENT: ["genericTrinought"],
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	Class.flattenerTurret2ARDreadV2 = {
		PARENT: ["genericTrinought"],
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	for(let i = 0; i < 3; i++) {
		Class.flattenerTurretARDreadV2.GUNS.push(
			{
				POSITION: [18, 25, 0, 0, 0, 120*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.flattenerTurret2ARDreadV2.GUNS.push(
			{
				POSITION: [17, 20, 0, 0, 0, 120*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.flattenerARDreadV2 = { // Size increase
	    PARENT: ["genericTrinought"],
	    LABEL: "Flattener",
		SIZE: 1.4,
		BODY: sizeBuffBodyStats[1],
	    TURRETS: [
			{
				POSITION: [10, 0, 0, 0, 0, 1],
				TYPE: 'flattenerTurretARDreadV2'
			}
		],
	}
	Class.towerARDreadV2 = { // Size increase + auras
	    PARENT: ["genericTrinought"],
	    LABEL: "Tower",
		SIZE: 1.3,
		BODY: sizeBuffBodyStats[0],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: 'flattenerTurret2ARDreadV2'
			},
			...addTrinoughtAuraRing(),
		],
	}
	Class.creatureARDreadV2 = { // Size increase + heal auras
	    PARENT: ["genericTrinought"],
	    LABEL: "Creature",
	    SIZE: 1.3,
		BODY: sizeBuffBodyStats[0],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: 'flattenerTurret2ARDreadV2'
			},
			...addTrinoughtAuraRing(true),
		],
	}
	Class.spotlightARDreadV2 = { // Size increase + big aura
	    PARENT: ["genericTrinought"],
	    LABEL: "Spotlight",
	    SIZE: 1.3,
		BODY: sizeBuffBodyStats[0],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: 'flattenerTurretARDreadV2'
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigAura",
			},
		],
	}
	Class.furnaceARDreadV2 = { // Size increase + big heal aura
	    PARENT: ["genericTrinought"],
	    LABEL: "Furnace",
	    SIZE: 1.3,
		BODY: sizeBuffBodyStats[0],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: 'flattenerTurretARDreadV2'
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigHealAura",
			},
		],
	}
	Class.asteroidARDreadV2 = { // Size increase + big auto
	    PARENT: ["genericTrinought"],
	    LABEL: "Asteroid",
	    SIZE: 1.3,
		BODY: sizeBuffBodyStats[0],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: 'flattenerTurretARDreadV2'
			},
			{
				POSITION: [10, 0, 0, 0, 360, 1],
				TYPE: "kilobyteTurretARDreadV2",
			},
		],
	}
	Class.cardinalARDreadV2 = { // Size decrease
	    PARENT: ["genericTrinought"],
	    LABEL: "Cardinal",
		SIZE: 0.75,
		BODY: {
			HEALTH: 0.65,
			SPEED: 1.2,
			ACCELERATION: 1.4,
		},
	    TURRETS: [
			{
				POSITION: [10, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {COLOR: 9, MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [5, 0, 0, 0, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	Class.cagerTurretARDreadV2 = {
		PARENT: 'genericTank',
		CONTROLLERS: [["spin", {speed: -0.035}]],
		INDEPENDENT: true,
		LABEL: "",
		COLOR: 16,
		GUNS: [
			{ 
				POSITION: [8, 30, 1, -4, 1.5, 0, 0],
			},
			{
				POSITION: [8, 30, 1, -4, 1.5, 120, 0],
			},
			{
				POSITION: [8, 30, 1, -4, 1.5, 240, 0],
			},
		],
		TURRETS: [
			{
				POSITION: [16, 0, 0, 30, 0, 1],
				TYPE: ['hexagon', {COLOR: 2}]
			},
		]
	};
    Class.cagerARDreadV2 = { // Minelayer
	    PARENT: ["genericTrinought"],
	    LABEL: "Cager",
		GUNS: [
			{
				POSITION: [0, 9, 1, 8, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 5,
					SHOOT_SETTINGS: combineStats([g.trap, g.block, {maxSpeed: 1e-3, speed: 1e-3}]),
					TYPE: 'unsetPillbox',
					INDEPENDENT: true,
					SYNCS_SKILLS: true,
					DESTROY_OLDEST_CHILD: true,
				}
			},
		],
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [11, 0, 0, 0, 360, 1],
				TYPE: 'cagerTurretARDreadV2',
			}
		],
	}
	Class.monitorRadarARDreadV2 = {
		PARENT: 'genericTank',
		CONTROLLERS: [['spin', {speed: 0.02}]],
		INDEPENDENT: true,
		SHAPE: [[0.175, 1], [0.175, -1], [-0.175, -1], [-0.175, 1]],
		COLOR: 17,
		GUNS: [
			{
				POSITION: [3.5, 26, 1, -1.75, 0, 0, 0],
				PROPERTIES: {COLOR: 2}
			}
		]
	};
    Class.monitorARDreadV2 = { // FOV
	    PARENT: ["genericTrinought"],
	    LABEL: "Monitor",
	    BODY: {
			FOV: 1.3,
			SPEED: 0.9,
		  },
		  TURRETS: [
			{
				POSITION: [14, 0, 0, 180, 0, 1],
				TYPE: ['triangle', {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [9, 0, 0, 0, 0, 1],
				TYPE: ['egg', {COLOR: 16}]
			},
			{
				POSITION: [6, 0, 0, 0, 0, 1],
				TYPE:['egg', {COLOR: 2}]
			},
			{
				POSITION: [19, 0, 0, 0, 360, 1],
				TYPE: 'monitorRadarARDreadV2'
			}
		]
	}

	// T4 Weapons
	Class.javelinARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Javelin",
	    GUNS: [],
	}
  	for (let i = 0; i < 5; i++) {
		Class.javelinARDreadV2.GUNS.push(
			{
				POSITION: [28, 7, 1, 0, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.assass, g.assass, g.assass, {reload: 0.8, density: 2/9}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [5, 7, -1.6, 7, 0, 72*i, 0],
			},
		)
	}
	Class.rapierARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Rapier",
	    GUNS: [],
	}
  	for (let i = 0; i < 5; i++) {
		Class.rapierARDreadV2.GUNS.push(
			{
				POSITION: [17, 1, 1, 0, 6, 72*i, 0],
			},
			{
				POSITION: [17, 1, 1, 0, -6, 72*i, 0],
			},
			{
				POSITION: [18, 5, 1, 0, 3, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, {speed: 0.8, health: 1.5}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [18, 5, 1, 0, -3, 72*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, {speed: 0.8, health: 1.5}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.woomeraARDreadV2 = { // hunter
	    PARENT: ["genericPentanought"],
	    LABEL: "Woomera",
		CONTROLLERS: [["zoom", { distance: 450 }]],
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.woomeraARDreadV2.GUNS.push(
			{
				POSITION: [25, 5.5, 1, 0, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.hunter, g.hunter2, g.hunter2, g.preda, {health: 1.1}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [22.5, 8, 1, 0, 0, 72*i, 0.15],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.hunter, g.hunter2, g.preda, {health: 1.1}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [20, 10.5, 1, 0, 0, 72*i, 0.3],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.hunter, g.preda, {health: 1.1}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [2.7, 10.5, -1.3, 10, 0, 72*i, 0],
			},
		)
	}
	Class.trebuchetARDreadV2 = { // mega-sniper
	    PARENT: ["genericPentanought"],
	    LABEL: "Trebuchet",
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.trebuchetARDreadV2.GUNS.push(
			{
				POSITION: [24, 9.5, 1, 0, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.preda, g.preda, g.preda, g.preda, g.bitlessspeed, g.lessreload, {health: 1.4, size: 2}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [4, 11.5, 1, 17, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.preda, g.preda, g.preda, g.preda, g.lessreload, g.fake]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.boltARDreadV2 = { // railgun
	    PARENT: ["genericPentanought"],
	    LABEL: "Bolt",
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.boltARDreadV2.GUNS.push(
			{
				POSITION: [25, 7, 1, 0, 0, 72*i, 0],
			},
			{
				POSITION: [28.5, 4, 1, 0, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniper, g.sniper, g.pound, g.lessreload, {damage: 1.2, speed: 1.2, maxSpeed: 1.2}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [5, 7, -1.7, 8, 0, 72*i, 0],
			},
		)
	}
	Class.diplomatARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Diplomat",
	    GUNS: [],
	}
  	for (let i = 0; i < 5; i++) {
		Class.diplomatARDreadV2.GUNS.push(
			{
				POSITION: [13, 7, 1, 0, 3.25, 72*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.spam, g.spam, {size: 0.85}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [13, 7, 1, 0, -3.25, 72*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.spam, g.spam, {size: 0.85}]),
					TYPE: "bullet",
				},
			},
      		{
				POSITION: [15, 7, 1, 0, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.spam, g.spam, {size: 0.85}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.arbitratorARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Arbitrator",
	    GUNS: [],
	}
  	for (let i = 0; i < 5; i++) {
		Class.arbitratorARDreadV2.GUNS.push(
			{
				POSITION: [7.5, 10.75, 1.33, 5.5, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.spam, g.spam, {size: 0.7, reload: 1.2}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [7.5, 9.5, 1.33, 7.5, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.spam, g.spam, {size: 0.7, reload: 1.1}]),
					TYPE: "bullet",
				},
			},
      		{
				POSITION: [7.5, 7.25, 1.25, 9.5, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.spam, g.spam, {size: 0.7, reload: 1}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.dissolverAutoARDreadV2 = {
		PARENT: 'autoTankGun',
		BODY: {FOV: 5},
		GUNS: [
			{
				POSITION: [25.5, 5, 1, 0, -3.5, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.flank, g.flank, g.auto]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [25.5, 5, 1, 0, 3.5, 0, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.flank, g.flank, g.auto]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [7, 13, -1.3, 6, 0, 0, 0],
			},
		]
	}
	Class.dissolverARDreadV2 = { // all auto
	    PARENT: ["genericPentanought"],
	    LABEL: "Dissolver",
		TURRETS: [],
	}
	for(let i = 0; i < 5; i++) {
		Class.dissolverARDreadV2.TURRETS.push(
			{
				POSITION: [9, 10, 0, 72*i, 200, 0],
				TYPE: 'dissolverAutoARDreadV2',
			},
		)
	}
	Class.eroderARDreadV2 = { // ultra bullet spam
	    PARENT: ["genericPentanought"],
	    LABEL: "Eroder",
	    GUNS: [],
	}
	for(let i = 0; i < 5; i++) {
		Class.eroderARDreadV2.GUNS.push(
			{
				POSITION: [13, 4, 1, 0, 4.5, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mini, {health: 1.1}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [11, 4, 1, 0, 4.5, 72*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mini, {health: 1.1}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [13, 4, 1, 0, -4.5, 72*i, 0.25],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mini, {health: 1.1}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [11, 4, 1, 0, -4.5, 72*i, 0.75],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mini, {health: 1.1}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [18, 1.6, 1, 0, -2, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.twin, g.power, g.slow]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [18, 1.6, 1, 0, 2, 72*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.twin, g.power, g.slow]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [13, 7.5, 1, 0, 0, 72*i, 0],
			},
		)
	}
	Class.gripperTurretARDreadV2 = {
		PARENT: ["autoTankGun"],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [23, 13, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.flank, g.flank, g.auto, {reload: 0.9, recoil: 0.25}]),
					TYPE: "bullet",
				},
			},
		],
	};
	Class.gripperARDreadV2 = { // crowbar
	    PARENT: ["genericPentanought"],
	    LABEL: "Gripper",
	    GUNS: [],
		TURRETS: [],
	}
	for(let i = 0; i < 5; i++) {
		Class.gripperARDreadV2.GUNS.push(
			{
				POSITION: [38, 7.5, 1, 0, 0, 72*i, 0],
			},
			{
				POSITION: [5, 9.5, -1.5, 8, 0, 72*i, 0],
			},
		)
		Class.gripperARDreadV2.TURRETS.push(
			{
				POSITION: [7.5, 38, 0, 72*i, 200, 1],
				TYPE: 'gripperTurretARDreadV2',
			},
			{
				POSITION: [7.5, 28, 0, 72*i, 200, 1],
				TYPE: 'gripperTurretARDreadV2',
			},
		)
	}
	Class.retardantARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Retardant",
	    GUNS: [],
	}
  	for (let i = 0; i < 5; i++) {
		Class.retardantARDreadV2.GUNS.push(
			{
				POSITION: [17, 12, 1, 0, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, {reload: 0.9, health: 1.1}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.tyrantARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Tyrant",
	    GUNS: [],
	}
  	for (let i = 0; i < 5; i++) {
		Class.tyrantARDreadV2.GUNS.push(
			{
				POSITION: [10, 11, -0.75, 7, 0, 72*i, 0],
			},
			{
				POSITION: [15, 12, 1, 0, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.destroy, g.arty, g.skim, g.halfspeed, {reload: 0.8}]),
					TYPE: "supermissile",
					STAT_CALCULATOR: gunCalcNames.sustained,
				},
			},
		)
	}
	Class.anesthesiologistARDreadV2 = { // shotgun
	    PARENT: ["genericPentanought"],
	    LABEL: "Anesthesiologist",
	    GUNS: [],
	}
	for(let i = 0; i < 5; i++) {
		Class.anesthesiologistARDreadV2.GUNS.push(
			{
				POSITION: [4, 4, 1, 11, -3, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, {reload: 1.2, health: 1.4, damage: 1.4}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [4, 4, 1, 11, 3, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, {reload: 1.2, health: 1.4, damage: 1.4}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [4, 5, 1, 13, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, {reload: 1.2, health: 1.4, damage: 1.4}]),
					TYPE: 'casing',
				},
			},
			{
				POSITION: [1, 5, 1, 12, -2, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, {reload: 1.2, health: 1.4, damage: 1.4}]),
					TYPE: 'casing',
				},
			},
			{
				POSITION: [1, 1.5, 1, 11, -1, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.fast, {reload: 1.2}]),
					TYPE: 'bullet',
				},
			},
			{
				POSITION: [1, 2, 1, 11, 1, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.fast, {reload: 1.2}]),
					TYPE: 'casing',
				},
			},
			{
				POSITION: [1, 2, 1, 11, 2, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.fast, {reload: 1.2}]),
					TYPE: 'casing',
				},
			},
			{
				POSITION: [17, 7.5, 1, 6, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake, {reload: 1.2}]),
					TYPE: 'casing',
				},
			},
			{
				POSITION: [14.5, 11, 1, 6, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake, {reload: 1.2}]),
					TYPE: 'casing',
				},
			},
			{
				POSITION: [8, 11, -1.3, 5.5, 0, 72*i, 0],
			},
		)
	}
	Class.helixARDreadV2 = { // twister
	    PARENT: ["genericPentanought"],
	    LABEL: "Helix",
	    GUNS: [],
	}
	for(let i = 0; i < 5; i++) {
		Class.helixARDreadV2.GUNS.push(
			{
				POSITION: [10, 8.5, -0.5, 9, 0, 72*i, 0],
			},
			{
				POSITION: [17, 9.5, -1.4, 0, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.morespeed, g.fast, g.fast, g.one_third_reload]),
					TYPE: "spiralMissileARDreadV2",
					STAT_CALCULATOR: gunCalcNames.sustained,
				},
			},
		)
	}
	Class.bombardmentARDreadV2 = { // artillery
	    PARENT: ["genericPentanought"],
	    LABEL: "Bombardment",
	    GUNS: [],
	}
	for(let i = 0; i < 5; i++) {
		Class.bombardmentARDreadV2.GUNS.push(
			{
				POSITION: [12.5, 2, 1, 0, -4.25, 72*i-7, 0.6],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, {speed: 1.1, maxSpeed: 1.1}]),
					TYPE: "bullet",
					LABEL: "Secondary",
				},
			},
			{
				POSITION: [12.5, 2, 1, 0, 4.25, 72*i+7, 0.8],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, {speed: 1.1, maxSpeed: 1.1}]),
					TYPE: "bullet",
					LABEL: "Secondary",
				},
			},
			{
				POSITION: [15.5, 2.5, 1, 0, -2.5, 72*i-7, 0.2],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
					TYPE: "bullet",
					LABEL: "Secondary",
				},
			},
			{
				POSITION: [15.5, 2.5, 1, 0, 2.5, 72*i+7, 0.4],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
					TYPE: "bullet",
					LABEL: "Secondary",
				},
			},
			{
				POSITION: [17.5, 8, 1, 0, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.destroy, g.arty, {speed: 1.1, maxSpeed: 1.1}]),
					TYPE: "bullet",
					LABEL: "Heavy",
				},
			},
		)
	}
	Class.raiderARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Raider",
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.raiderARDreadV2.GUNS.push(
			{
				POSITION: [4, 5, 2.1, 8, 3.25, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, g.over, {size: 1.5, reload: 0.6}]),
					TYPE: ["drone", {COLOR: 5}],
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
			{
				POSITION: [4, 5, 2.1, 8, -3.25, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, g.over, {size: 1.5, reload: 0.6}]),
					TYPE: ["drone", {COLOR: 5}],
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
			{
				POSITION: [6, 6.5, 1.4, 8, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, g.over, g.pound, {size: 2, reload: 0.4}]),
					TYPE: ["betadrone", {COLOR: 5}],
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
		)
	}
	Class.gladiatorGenericMinionARDreadV2 = {
	    PARENT: ["minion"],
		BODY: {
			SPEED: 1,
		},
		SHAPE: 3.5,
	    COLOR: 5,
		GUNS: [],
	}
	Class.gladiatorTritankMinionARDreadV2 = {
	    PARENT: ["gladiatorGenericMinionARDreadV2"],
		GUNS: [],
	}
	Class.gladiatorTritrapMinionARDreadV2 = {
	    PARENT: ["gladiatorGenericMinionARDreadV2"],
		GUNS: [],
	}
	Class.gladiatorTriswarmMinionARDreadV2 = {
	    PARENT: ["gladiatorGenericMinionARDreadV2"],
		GUNS: [],
	}
	Class.gladiatorAutoMinionARDreadV2 = makeAuto({
	    PARENT: ["gladiatorGenericMinionARDreadV2"],
	}, "Minion", {size: 12, angle: 0});
	Class.gladiatorAuraMinionAuraARDreadV2 = addAura(1, 1.2);
	Class.gladiatorAuraMinionARDreadV2 = {
	    PARENT: ["gladiatorGenericMinionARDreadV2"],
		TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 360, 1],
				TYPE: "gladiatorAuraMinionAuraARDreadV2",
			}
		]
	}
	Class.gladiatorHealAuraMinionAuraARDreadV2 = addAura(-2/3, 1.2);
	Class.gladiatorHealAuraMinionARDreadV2 = {
	    PARENT: ["gladiatorGenericMinionARDreadV2"],
		TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 360, 1],
				TYPE: "gladiatorHealAuraMinionAuraARDreadV2",
			}
		]
	}
	for (let i = 0; i < 3; i++) {
		Class.gladiatorTritankMinionARDreadV2.GUNS.push(
			{
				POSITION: [15, 8.5, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.slow, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: ["bullet", {COLOR: 5}],
				},
			},
		);
		Class.gladiatorTritrapMinionARDreadV2.GUNS.push(
			{
				POSITION: [13, 7, 1, 0, 0, 120*i, 0],
			},
			{
				POSITION: [3, 7, 1.7, 13, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.flank, g.minion]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		);
		Class.gladiatorTriswarmMinionARDreadV2.GUNS.push(
			{
				POSITION: [7, 8.5, -1.5, 7, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.swarm, {size: 1.6, range: 0.5}]),
					TYPE: ["swarm", {COLOR: 5}],
					STAT_CALCULATOR: gunCalcNames.swarm,
				},
			},
		);
	}
	Class.gladiatorARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Gladiator",
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.gladiatorARDreadV2.GUNS.push(
			{
				POSITION: [4.75, 12, 1, 10, 0, 72*i, 0],
			},
			{
				POSITION: [1.5, 13, 1, 14.75, 0, 72*i, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, {size: 0.9, reload: 0.5}]),
					TYPE: "minion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					MAX_CHILDREN: 2,
				},
			},
			{
				POSITION: [12, 13, 1, 0, 0, 72*i, 0],
			},
		)
	}
	Class.gladiatorARDreadV2.GUNS[1].PROPERTIES.TYPE = "gladiatorTritankMinionARDreadV2";
	Class.gladiatorARDreadV2.GUNS[4].PROPERTIES.TYPE = "gladiatorTritrapMinionARDreadV2";
	Class.gladiatorARDreadV2.GUNS[7].PROPERTIES.TYPE = "gladiatorTriswarmMinionARDreadV2";
	Class.gladiatorARDreadV2.GUNS[10].PROPERTIES.TYPE = "gladiatorAutoMinionARDreadV2";
	Class.gladiatorARDreadV2.GUNS[13].PROPERTIES.TYPE = "gladiatorAuraMinionARDreadV2";
	Class.starlightARDreadV2 = { // auto-drones
	    PARENT: ["genericPentanought"],
	    LABEL: "Starlight",
	    GUNS: [],
	}
	for(let i = 0; i < 5; i++) {
		Class.starlightARDreadV2.GUNS.push(
			{
				POSITION: [5, 10, 1.2, 8, 0, 72*i, 0],
				PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.drone, g.over, {reload: 1.5, speed: 1.15, maxSpeed: 1.15}]),
					TYPE: 'turretedDrone',
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
					MAX_CHILDREN: 3,
				},
			},
			{
				POSITION: [3, 5, 1, 8, 0, 72*i, 0],
			},
		)
	}
	Class.bruiserARDreadV2 = { // honcho
	    PARENT: ["genericPentanought"],
	    LABEL: "Bruiser",
	    GUNS: [],
	}
	for(let i = 0; i < 5; i++) {
		Class.bruiserARDreadV2.GUNS.push(
			{
				POSITION: [5, 10, 1.5, 9, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, g.honcho, {maxSpeed: 0.85}]),
					TYPE: "drone",
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
					MAX_CHILDREN: 2,
				},
			},
		)
	};
	Class.incapacitatorARDreadV2 = { // swarms
	    PARENT: ["genericPentanought"],
	    LABEL: "Incapacitator",
	    GUNS: [],
	}
	for(let i = 0; i < 5; i++) {
		Class.incapacitatorARDreadV2.GUNS.push(
			{
				POSITION: [6, 6, 0.6, 6.5, 3.25, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.swarm, g.over, g.over, g.over, {reload: 1.15}]),
					TYPE: "swarm",
					STAT_CALCULATOR: gunCalcNames.swarm,
				},
			},
			{
				POSITION: [6, 6, 0.6, 6.5, -3.25, 72*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.swarm, g.over, g.over, g.over, {reload: 1.15}]),
					TYPE: "swarm",
					STAT_CALCULATOR: gunCalcNames.swarm,
				},
			},
		)
	};
	Class.cerberusARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Cerberus",
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.cerberusARDreadV2.GUNS.push(
			{
				POSITION: [12, 4, 1, 0, 2.5, 72*i+10, 0.5],
			},
			{
				POSITION: [1.5, 4, 1.6, 12, 2.5, 72*i+10, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.fast, {reload: 1.09}]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [12, 4, 1, 0, -2.5, 72*i-10, 0.5],
			},
			{
				POSITION: [1.5, 4, 1.6, 12, -2.5, 72*i-10, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.fast, {reload: 1.09}]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [14, 5.5, 1, 0, 0, 72*i, 0],
			},
			{
				POSITION: [2, 5.5, 1.7, 14, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.fast, {reload: 1.09}]),
					TYPE: "unsetTrap",
				},
			},
		)
	}
	Class.luciferARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Lucifer",
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.luciferARDreadV2.GUNS.push(
			{
				POSITION: [13, 10, 1, 0, 0, 72*i, 0],
			},
			{
				POSITION: [3.5, 10, 1.6, 13, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.morespeed, {size: 1.3, health: 2}]),
					TYPE: "unsetTrap",
				},
			},
		)
	}
	Class.sterilizerARDreadV2 = { // auto-traps
	    PARENT: ["genericPentanought"],
	    LABEL: "Sterilizer",
	    GUNS: [],
	}
	for(let i = 0; i < 5; i++) {
		Class.sterilizerARDreadV2.GUNS.push(
			{
				POSITION: [5, 10, 1, 8.5, 0, 72*i, 0],
			},
			{
				POSITION: [3, 13, 1, 14, 0, 72*i, 0],
			},
			{
				POSITION: [2, 13, 1.3, 16.5, 0, 72*i, 0],
				PROPERTIES: {
					MAX_CHILDREN: 5,
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.halfreload, g.one_third_reload]),
					TYPE: 'unsetPillbox',
					SYNCS_SKILLS: true,
					DESTROY_OLDEST_CHILD: true,
					INDEPENDENT: true,
				},
			},
			{
				POSITION: [5, 13, 1, 6, 0, 72*i, 0],
			},
		)
	}
	Class.hielamanARDreadV2 = { // aura-traps
	    PARENT: ["genericPentanought"],
	    LABEL: "Hielaman",
	    GUNS: [],
	}
	for(let i = 0; i < 5; i++) {
		Class.hielamanARDreadV2.GUNS.push(
			{
				POSITION: [13, 7.5, 1, 0, 0, 72*i, 0],
			},
			{
				POSITION: [3, 9, 1, 13, 0, 72*i, 0],
			},
			{
				POSITION: [3, 9, 1.6, 15, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.hexatrap, {reload: 1.2, range: 0.8, health: 1.2}]),
					TYPE: 'auraBlock',
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [2, 7, 1.6, 16, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.hexatrap, g.fake, {reload: 1.2}]),
					TYPE: 'bullet',
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		)
	}
	Class.jackhammerARDreadV2 = { // trap + gun
	    PARENT: ["genericPentanought"],
	    LABEL: "Jackhammer",
	    GUNS: [],
	}
	for(let i = 0; i < 5; i++) {
		Class.jackhammerARDreadV2.GUNS.push(
			{
				POSITION: [21, 8, 1, 0, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic]),
					TYPE: 'bullet',
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [14.5, 10, 1, 0, 0, 72*i, 0],
			},
			{
				POSITION: [3, 10, 1.4, 14.5, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.hexatrap]),
					TYPE: 'unsetTrap',
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		)
	}

	// T4 Bodies
	Class.skynetARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Skynet",
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			}
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.skynetARDreadV2.TURRETS.push(
			{
				POSITION: [3.25, 4.5, 0, 72*i, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	for (let i = 0; i < 5; i++) {
		Class.skynetARDreadV2.TURRETS.push(
			{
				POSITION: [3.25, 8, 0, 72*i+36, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.pentanoughtBigAura = addAura(2.5, 1.5);
	Class.supernovaARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Supernova",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			...addPentanoughtTurretRing(),
			{
				POSITION: [9, 0, 0, 0, 360, 1],
				TYPE: "pentanoughtBigAura",
			},
		],
	}
	Class.cipherARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Cipher",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			...addPentanoughtTurretRing(),
			{
				POSITION: [11.5, 0, 0, 0, 360, 1],
				TYPE: "megabyteTurretARDreadV2",
			},
		],
	}
	Class.pentanoughtBigHealAura = addAura(-2, 1.45);
	Class.interstellarARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Interstellar",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "pentanoughtBigHealAura",
			},
			...addPentanoughtTurretRing(),
		],
	}
	Class.gigabyteTurretARDreadV2 = {
		PARENT: ["autoTankGun"],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [26, 16, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.auto, {speed: 1.1, health: 0.8}]),
					TYPE: "bullet",
				},
			},
		],
	}
	Class.gigabyteARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Gigabyte",
	    TURRETS: [
			{
				POSITION: [14.5, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [13, 0, 0, 0, 360, 1],
				TYPE: "gigabyteTurretARDreadV2",
			},
		],
	}
	Class.pentanoughtSmallAura = addAura(1, 1.6, 0.15);
	Class.malwareARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Malware",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			...addPentanoughtAuraRing(),
			{
				POSITION: [11.5, 0, 0, 0, 360, 1],
				TYPE: "megabyteTurretARDreadV2",
			},
		],
	}
	Class.pentanoughtSmallHealAura = addAura(-2/3, 1.6, 0.15);
	Class.softwareARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Software",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			...addPentanoughtAuraRing(true),
			{
				POSITION: [11.5, 0, 0, 0, 360, 1],
				TYPE: "megabyteTurretARDreadV2",
			},
		],
	}
	Class.roasterTurretARDreadV2 = {
		PARENT: 'genericTank',
		COLOR: 16,
		CONTROLLERS: ['nearestDifferentMaster'],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [15, 12, 1.6, 0, 0, 180, 0],
				PROPERTIES: {COLOR: -1},
			},
			{
			  	POSITION: [16.5, 7, 1.5, 0, 0, 180, 0],
			},
			{
			  	POSITION: [13, 2, 1, 0, -8, -10, 0],
			},
			{
			  	POSITION: [19, 7, 1, 0, -2, -10, 0],
			  	PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.auto, g.flame]),
					TYPE: 'growBullet',
			  	}
			},
			{
			  POSITION: [13, 2, 1, 0, 8, 10, 0],
			},
			{
				POSITION: [19, 7, 1, 0, 2, 10, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.auto, g.flame]),
					TYPE: 'growBullet',
				}
			},
		],
		TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: ['egg', {COLOR: -1, MIRROR_MASTER_ANGLE: true}],
			}
		]
	};
	Class.roasterARDreadV2 = { // Flamethrower
	    PARENT: ["genericPentanought"],
	    LABEL: "Roaster",
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 180, 0, 1],
				TYPE: ['pentagon', {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [11, 0, 0, 0, 360, 1],
				TYPE: 'roasterTurretARDreadV2'
			},
		],
	}
	Class.monsoonTurretARDreadV2 = {
		PARENT: 'genericTank',
		LABEL: "",
		BODY: {
			FOV: 1.5,
		},
		CONTROLLERS: [[ 'spin', {speed: 0.03}]],
		COLOR: 16,
		INDEPENDENT: true,
		MAX_CHILDREN: 9,
		GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.monsoonTurretARDreadV2.GUNS.push(
			{
				POSITION: [6, 13, 1.2, 8, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, {size: 1.5, health: 1.1}]),
					TYPE: ["drone", { INDEPENDENT: true }],
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
		)
	}
	Class.monsoonARDreadV2 = { // Drones
	    PARENT: ["genericPentanought"],
	    LABEL: "Monsoon",
		BODY: {
			SPEED: 0.93,
			FOV: 1.1,
		},
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 180, 0, 1],
				TYPE: ['pentagon', {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [10, 0, 0, 0, 360, 1],
				TYPE: 'monsoonTurretARDreadV2'
			},
		],
	}
	Class.photosphereSmallAuraARDreadV2 = addAura(1, 1.85, 0.15);
	Class.photosphereBigAuraARDreadV2 = addAura(1.5, 4);
	Class.photosphereARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Photosphere",
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.photosphereARDreadV2.TURRETS.push(
			{
				POSITION: [3.5, 8.75, 0, 72*i+36, 360, 1],
				TYPE: "photosphereSmallAuraARDreadV2",
			},
		)
	}
	for (let i = 0; i < 5; i++) {
		Class.photosphereARDreadV2.TURRETS.push(
			{
				POSITION: [3, 4, 0, 72*i, 360, 1],
				TYPE: "photosphereBigAuraARDreadV2",
			},
		)
	}
	Class.stratosphereARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Stratosphere",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			...addPentanoughtAuraRing(true),
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "pentanoughtBigHealAura",
			},
		],
	}
	Class.behemothARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Behemoth",
		BODY: hpBuffBodyStats[2],
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {COLOR: 9, MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [24, 0, 0, 180, 0, -1],
				TYPE: ["pentagon", {COLOR: 9, MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	Class.astronomicARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Astronomic",
		BODY: hpBuffBodyStats[1],
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [24, 0, 0, 180, 0, -1],
				TYPE: ["pentagon", {COLOR: 9, MIRROR_MASTER_ANGLE: true}],
			},
			...addPentanoughtAuraRing(),
		],
	}
	Class.grandioseARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Grandiose",
		BODY: hpBuffBodyStats[1],
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [24, 0, 0, 180, 0, -1],
				TYPE: ["pentagon", {COLOR: 9, MIRROR_MASTER_ANGLE: true}],
			},
			...addPentanoughtAuraRing(true),
		],
	}
	Class.bunkerARDreadV2 = { // HP + auto spam
	    PARENT: ["genericPentanought"],
	    LABEL: "Bunker",
		BODY: hpBuffBodyStats[1],
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [24, 0, 0, 180, 0, -1],
				TYPE: ["pentagon", {COLOR: 9, MIRROR_MASTER_ANGLE: true}],
			},
			...addPentanoughtTurretRing(),
		],
	}
	Class.arsenalARDreadV2 = { // HP + big auto
	    PARENT: ["genericPentanought"],
	    LABEL: "Arsenal",
		BODY: hpBuffBodyStats[1],
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [24, 0, 0, 180, 0, -1],
				TYPE: ["pentagon", {COLOR: 9, MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [11.5, 0, 0, 0, 360, 1],
				TYPE: "megabyteTurretARDreadV2",
			},
		],
	}
	Class.pentagonLeviathanTopARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Leviathan",
		MIRROR_MASTER_ANGLE: true,
	    GUNS: [],
	}
	Class.pentagonLeviathanBottomARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Leviathan",
		MIRROR_MASTER_ANGLE: true,
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.pentagonLeviathanTopARDreadV2.GUNS.push(
			{
				POSITION: [6, 13.5, 0.001, 9, 0, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		);
		Class.pentagonLeviathanBottomARDreadV2.GUNS.push(
			{
				POSITION: [7, 17, 0.001, 9, 0, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		);
	}
	Class.hexagonLeviathanTopARDreadV2 = {
	    PARENT: ["genericHexnought"],
	    LABEL: "Leviathan",
		MIRROR_MASTER_ANGLE: true,
	    GUNS: [],
	}
	Class.hexagonLeviathanBottomARDreadV2 = {
	    PARENT: ["genericHexnought"],
	    LABEL: "Leviathan",
		MIRROR_MASTER_ANGLE: true,
	    GUNS: [],
	}
	for (let i = 0; i < 6; i++) {
		Class.hexagonLeviathanTopARDreadV2.GUNS.push(
			{
				POSITION: [6, 10, 0.001, 9.5, 0, 60*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.hexagonLeviathanBottomARDreadV2.GUNS.push(
			{
				POSITION: [7, 13.5, 0.001, 9.5, 0, 60*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.leviathanARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Leviathan",
		BODY: speedBuffBodyStats[2],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: ["pentagonLeviathanTopARDreadV2", {MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [20, 0, 0, 0, 0, -1],
				TYPE: ["pentagonLeviathanBottomARDreadV2", {MIRROR_MASTER_ANGLE: true}]
			},
		],
	}
	Class.valrayvnARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Valrayvn",
		BODY: speedBuffBodyStats[1],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [20, 0, 0, 0, 0, -1],
				TYPE: ["pentagonLeviathanBottomARDreadV2", {MIRROR_MASTER_ANGLE: true}]
			},
			...addPentanoughtAuraRing(),
		],
	}
	Class.pegasusARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Pegasus",
		BODY: speedBuffBodyStats[1],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [20, 0, 0, 0, 0, -1],
				TYPE: ["pentagonLeviathanBottomARDreadV2", {MIRROR_MASTER_ANGLE: true}]
			},
			...addPentanoughtAuraRing(true),
		],
	}
	Class.maceARDreadV2 = { // Speed + auto spam
	    PARENT: ["genericPentanought"],
	    LABEL: "Mace",
		BODY: speedBuffBodyStats[1],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [20, 0, 0, 0, 0, -1],
				TYPE: ["pentagonLeviathanBottomARDreadV2", {MIRROR_MASTER_ANGLE: true}]
			},
			...addPentanoughtTurretRing(),
		],
	}
	Class.missileARDreadV2 = { // Speed + big auto
	    PARENT: ["genericPentanought"],
	    LABEL: "Missile",
		BODY: speedBuffBodyStats[1],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [20, 0, 0, 0, 0, -1],
				TYPE: ["pentagonLeviathanBottomARDreadV2", {MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [11.5, 0, 0, 0, 360, 1],
				TYPE: "megabyteTurretARDreadV2",
			},
		],
	}
	Class.battalionARDreadV2 = { // Speed + HP
	    PARENT: ["genericPentanought"],
	    LABEL: "Battalion",
		BODY: {
			HEALTH: 2.8, 
			SHIELD: 2.8, 
			REGEN: 1.8, 
			SPEED: 2.15,
		},
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {COLOR: 9, MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [20, 0, 0, 0, 0, -1],
				TYPE: ["pentagonLeviathanBottomARDreadV2", {MIRROR_MASTER_ANGLE: true}]
			},
		],
	}
	Class.pentagonWispTurretARDreadV2 = {
		PARENT: ["genericPentanought"],
		SHAPE: 5,
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	for(let i = 0; i < 5; i++) {
		Class.pentagonWispTurretARDreadV2.GUNS.push(
			{
				POSITION: [26, 13, 0.001, 3, 0, 72*i+36, 0],
				PROPERTIES: {COLOR: 9}
			},
		)
	}
	Class.hexagonWispTurretARDreadV2 = {
		PARENT: ["genericHexnought"],
		SHAPE: 6,
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	for(let i = 0; i < 6; i++) {
		Class.hexagonWispTurretARDreadV2.GUNS.push(
			{
				POSITION: [26, 13, 0.001, 3, 0, 60*i+30, 0],
				PROPERTIES: {COLOR: 9}
			},
		)
	}
	Class.wispARDreadV2 = { // Drifter
	    PARENT: ["genericPentanought"],
	    LABEL: "Wisp",
		BODY: {
			SPEED: 2.2,
			ACCELERATION: 0.18,
		},
	    TURRETS: [
			{
				POSITION: [11, 0, 0, 0, 0, 1],
				TYPE: ['pentagonWispTurretARDreadV2', {}]
			}
		],
	}
	Class.pentagonTitaniumTopARDreadV2 = {
		PARENT: ["genericPentanought"],
		SHAPE: 0,
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	for(let i = 0; i < 10; i++) {
		Class.pentagonTitaniumTopARDreadV2.GUNS.push(
			{
				POSITION: [8, 6, 0.001, 20, 0, 36*i, 0],
				PROPERTIES: {COLOR: 9},
			},
			{
				POSITION: [8, 6, 0.001, -20, 0, 36*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.pentagonTitaniumBottomARDreadV2 = {
		PARENT: ["genericPentanought"],
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	for(let i = 0; i < 5; i++) {
		Class.pentagonTitaniumBottomARDreadV2.GUNS.push(
			{
				POSITION: [5, 6, 0.001, 9.5, 3.5, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
			{
				POSITION: [5, 6, 0.001, 9.5, -3.5, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.hexagonTitaniumTopARDreadV2 = {
		PARENT: ["genericHexnought"],
		SHAPE: 0,
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	for(let i = 0; i < 12; i++) {
		Class.hexagonTitaniumTopARDreadV2.GUNS.push(
			{
				POSITION: [8, 6, 0.001, 20, 0, 30*i, 0],
				PROPERTIES: {COLOR: 9},
			},
			{
				POSITION: [8, 6, 0.001, -20, 0, 30*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.hexagonTitaniumBottomARDreadV2 = {
		PARENT: ["genericHexnought"],
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	for(let i = 0; i < 6; i++) {
		Class.hexagonTitaniumBottomARDreadV2.GUNS.push(
			{
				POSITION: [5, 5.5, 0.001, 9.5, 3.5, 60*i, 0],
				PROPERTIES: {COLOR: 9},
			},
			{
				POSITION: [5, 5.5, 0.001, 9.5, -3.5, 60*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.titaniumARDreadV2 = { // Body damage increase
	    PARENT: ["genericPentanought"],
	    LABEL: "Titanium",
		BODY: {
			DAMAGE: 3.7,
			PENETRATION: 2.9,
		},
	    TURRETS: [
			{
				POSITION: [6, 0, 0, 0, 360, 1],
				TYPE: ['pentagonTitaniumTopARDreadV2', {}]
			},
			{
				POSITION: [20, 0, 0, 0, 360, -1],
				TYPE: ['pentagonTitaniumBottomARDreadV2', {}]
			},
		],
	}
	Class.pentagonCrusherTurretARDreadV2 = {
		PARENT: ["genericPentanought"],
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	Class.pentagonCrusherTurret2ARDreadV2 = {
		PARENT: ["genericPentanought"],
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	Class.pentagonCrusherTurret3ARDreadV2 = {
		PARENT: ["genericPentanought"],
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	for(let i = 0; i < 5; i++) {
		Class.pentagonCrusherTurretARDreadV2.GUNS.push(
			{
				POSITION: [20, 16, 0, 0, 0, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.pentagonCrusherTurret2ARDreadV2.GUNS.push(
			{
				POSITION: [21, 11, 0, 0, 0, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.pentagonCrusherTurret3ARDreadV2.GUNS.push(
			{
				POSITION: [17, 16, 0, 0, 0, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.hexagonCrusherTurretARDreadV2 = {
		PARENT: ["genericHexnought"],
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	Class.hexagonCrusherTurret2ARDreadV2 = {
		PARENT: ["genericHexnought"],
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	Class.hexagonCrusherTurret3ARDreadV2 = {
		PARENT: ["genericHexnought"],
		MIRROR_MASTER_ANGLE: true,
		GUNS: [],
	}
	for(let i = 0; i < 6; i++) {
		Class.hexagonCrusherTurretARDreadV2.GUNS.push(
			{
				POSITION: [20, 13.5, 0, 0, 0, 60*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.hexagonCrusherTurret2ARDreadV2.GUNS.push(
			{
				POSITION: [21, 8.5, 0, 0, 0, 60*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.hexagonCrusherTurret3ARDreadV2.GUNS.push(
			{
				POSITION: [17, 13.5, 0, 0, 0, 60*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.crusherARDreadV2 = { // Size increase
	    PARENT: ["genericPentanought"],
	    LABEL: "Crusher",
		SIZE: 1.5,
		BODY: sizeBuffBodyStats[2],
	    TURRETS: [
			{
				POSITION: [10, 0, 0, 0, 0, 1],
				TYPE: ['pentagonCrusherTurretARDreadV2', {}]
			}
		],
	}
	Class.mountainARDreadV2 = { // Size increase + auras
	    PARENT: ["genericPentanought"],
	    LABEL: "Mountain",
		SIZE: 1.4,
		BODY: sizeBuffBodyStats[1],
	    TURRETS: [
			{
				POSITION: [10, 0, 0, 0, 0, 1],
				TYPE: ['pentagonCrusherTurret2ARDreadV2', {}]
			},
			...addPentanoughtAuraRing(),
		],
	}
	Class.beastARDreadV2 = { // Size increase + heal auras
	    PARENT: ["genericPentanought"],
	    LABEL: "Beast",
		SIZE: 1.4,
		BODY: sizeBuffBodyStats[1],
	    TURRETS: [
			{
				POSITION: [10, 0, 0, 0, 0, 1],
				TYPE: ['pentagonCrusherTurret2ARDreadV2', {}]
			},
			...addPentanoughtAuraRing(true),
		],
	}
	Class.luminanceARDreadV2 = { // Size increase + big aura
	    PARENT: ["genericPentanought"],
	    LABEL: "Luminance",
		SIZE: 1.4,
		BODY: sizeBuffBodyStats[1],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: ['pentagonCrusherTurret3ARDreadV2', {}]
			},
			{
				POSITION: [9, 0, 0, 0, 360, 1],
				TYPE: "pentanoughtBigAura",
			},
		],
	}
	Class.foundryARDreadV2 = { // Size increase + big heal aura
	    PARENT: ["genericPentanought"],
	    LABEL: "Foundry",
		SIZE: 1.4,
		BODY: sizeBuffBodyStats[1],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: ['pentagonCrusherTurret3ARDreadV2', {}]
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "pentanoughtBigHealAura",
			},
		],
	}
	Class.planetoidARDreadV2 = { // Size increase + big auto
	    PARENT: ["genericPentanought"],
	    LABEL: "Planetoid",
		SIZE: 1.4,
		BODY: sizeBuffBodyStats[1],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: ['pentagonCrusherTurret3ARDreadV2', {}]
			},
			{
				POSITION: [11.5, 0, 0, 0, 360, 1],
				TYPE: "megabyteTurretARDreadV2",
			},
		],
	}
	Class.pentagonFinchTurretARDreadV2 = {
		PARENT: ["genericPentanought"],
		MIRROR_MASTER_ANGLE: true,
		COLOR: 9,
		TURRETS: [
			{
				POSITION: [15.5, 0, 0, 0, 0, 1],
				TYPE: ['pentagon', {MIRROR_MASTER_ANGLE: true}]
			}
		]
	}
	Class.hexagonFinchTurretARDreadV2 = {
		PARENT: ["genericHexnought"],
		MIRROR_MASTER_ANGLE: true,
		COLOR: 9,
		TURRETS: [
			{
				POSITION: [16.5, 0, 0, 30, 0, 1],
				TYPE: ['hexagon', {MIRROR_MASTER_ANGLE: true}]
			}
		]
	}
	Class.finchARDreadV2 = { // Size decrease
	    PARENT: ["genericPentanought"],
	    LABEL: "Finch",
		SIZE: 0.65,
		BODY: {
			HEALTH: 0.5,
			SPEED: 1.3,
			ACCELERATION: 1.6,
		},
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 0, 0, 1],
				TYPE: ['pentagonFinchTurretARDreadV2', {}]
			}
		],
	}
	Class.pentagonHoarderTurretARDreadV2 = {
		PARENT: 'genericTank',
		CONTROLLERS: [["spin", {speed: -0.035}]],
		INDEPENDENT: true,
		LABEL: "",
		COLOR: 16,
		GUNS: [],
		TURRETS: [
			{
				POSITION: [17, 0, 0, 0, 0, 1],
				TYPE: ['egg', {COLOR: -1}]
			},
			{
				POSITION: [10, 0, 0, 0, 0, 1],
				TYPE: ['egg', {COLOR: 16}]
			},
		]
	};
	Class.hexagonHoarderTurretARDreadV2 = {
		PARENT: 'genericTank',
		CONTROLLERS: [["spin", {speed: -0.035}]],
		INDEPENDENT: true,
		LABEL: "",
		COLOR: 16,
		GUNS: [],
		TURRETS: [
			{
				POSITION: [17, 0, 0, 0, 0, 1],
				TYPE: ['egg', {COLOR: -1}]
			},
			{
				POSITION: [10, 0, 0, 0, 0, 1],
				TYPE: ['egg', {COLOR: 16}]
			},
		]
	};
	for(let i = 0; i < 5; i++) {
		Class.pentagonHoarderTurretARDreadV2.GUNS.push(
			{ 
				POSITION: [15, 5.5, -2.5, 0, 0, 72*i, 0],
			},
		)
	}
	for(let i = 0; i < 6; i++) {
		Class.hexagonHoarderTurretARDreadV2.GUNS.push(
			{ 
				POSITION: [16, 5, -2.5, 0, 0, 60*i, 0],
			},
		)
	}
    Class.hoarderARDreadV2 = { // Minelayer
	    PARENT: ["genericPentanought"],
	    LABEL: "Hoarder",
	    GUNS: [
			{
				POSITION: [0, 14, 1, 0, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 5,
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct, {maxSpeed: 1e-3, speed: 1e-3}]),
					TYPE: 'unsetPillbox',
					INDEPENDENT: true,
					SYNCS_SKILLS: true,
					DESTROY_OLDEST_CHILD: true,
				}
			},
		],
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [10, 0, 0, 0, 360, 1],
				TYPE: ['pentagonHoarderTurretARDreadV2', {}]
			}
		],
	}
	Class.trackerRadarARDreadV2 = {
		PARENT: 'genericTank',
		CONTROLLERS: [['spin', {speed: 0.02}]],
		INDEPENDENT: true,
		SHAPE: [
			[-1,0],[-0.94,0.34],[-0.77,0.64],[-0.5,0.87], 
			[-0.4,0.69],[-0.61,0.51],[-0.75,0.27], 
			[-0.8,0],[-0.75,-0.27],[-0.61,-0.51],[-0.4,-0.69], 
			[-0.5,-0.87],[-0.77,-0.64],[-0.94,-0.34],
		],
    	COLOR: 17,
		GUNS: [
			{
				POSITION: [1.75, 17, 1, 2, 0, -75, 0],
			},
			{
				POSITION: [1.75, 17, 1, 2, 0, 75, 0],
			},
		],
		TURRETS: [
			{
				POSITION: [6, 8.2, 0, 0, 0, 1],
				TYPE: ["egg", {COLOR: -1}],
			},
			{
				POSITION: [3, 8.2, 0, 0, 0, 1],
				TYPE: ["egg", {COLOR: 17}],
			},
		]
	};
    Class.trackerARDreadV2 = { // FOV
	    PARENT: ["genericPentanought"],
	    LABEL: "Tracker",
		BODY: {
			FOV: 1.4,
			SPEED: 0.85
		},
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [9, 0, 0, 180, 0, 1],
				TYPE: ["egg", {COLOR: 16, MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [4.5, 0, 0, 180, 0, 1],
				TYPE: ["egg", {COLOR: -1, MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [15, 0, 0, 0, 360, 1],
				TYPE: 'trackerRadarARDreadV2'
			},
		],
	}

	Class.addons.UPGRADES_TIER_0.push("dreadARDreadV2");
		Class.dreadARDreadV2.UPGRADES_TIER_0 = [
			["sword2ARDreadV2", "dreadBodyARDreadV2",],
			["pacifier2ARDreadV2", "dreadBodyARDreadV2"],
			["peacekeeper2ARDreadV2", "dreadBodyARDreadV2"],
			["invader2ARDreadV2", "dreadBodyARDreadV2"],
			["centaur2ARDreadV2", "dreadBodyARDreadV2"],
		];

		Class.sword2ARDreadV2.UPGRADES_TIER_0 = ["swordARDreadV2"];
		Class.pacifier2ARDreadV2.UPGRADES_TIER_0 = ["pacifierARDreadV2"];
		Class.peacekeeper2ARDreadV2.UPGRADES_TIER_0 = ["peacekeeperARDreadV2"];
		Class.invader2ARDreadV2.UPGRADES_TIER_0 = ["invaderARDreadV2"];
		Class.centaur2ARDreadV2.UPGRADES_TIER_0 = ["centaurARDreadV2"];

		Class.dreadWeaponARDreadV2.UPGRADES_TIER_0 = ["swordARDreadV2", "pacifierARDreadV2", "peacekeeperARDreadV2", "invaderARDreadV2", "centaurARDreadV2"];

			Class.swordARDreadV2.UPGRADES_TIER_0 = ["gladiusARDreadV2", "sabreARDreadV2", "slingARDreadV2", "catapultARDreadV2", "dartARDreadV2"];
				Class.gladiusARDreadV2.UPGRADES_TIER_0 = ["bladeARDreadV2"];
					Class.bladeARDreadV2.UPGRADES_TIER_0 = ["rapierARDreadV2"];
						Class.rapierARDreadV2.UPGRADES_TIER_0 = [];
				Class.sabreARDreadV2.UPGRADES_TIER_0 = ["bayonetARDreadV2"];
					Class.bayonetARDreadV2.UPGRADES_TIER_0 = ["javelinARDreadV2"];
						Class.javelinARDreadV2.UPGRADES_TIER_0 = [];
				Class.slingARDreadV2.UPGRADES_TIER_0 = ["atlatlARDreadV2"];
					Class.atlatlARDreadV2.UPGRADES_TIER_0 = ["woomeraARDreadV2"];
						Class.woomeraARDreadV2.UPGRADES_TIER_0 = [];
				Class.catapultARDreadV2.UPGRADES_TIER_0 = ["ballistaARDreadV2"];
					Class.ballistaARDreadV2.UPGRADES_TIER_0 = ["trebuchetARDreadV2"];
						Class.trebuchetARDreadV2.UPGRADES_TIER_0 = [];
				Class.dartARDreadV2.UPGRADES_TIER_0 = ["barbARDreadV2"];
					Class.barbARDreadV2.UPGRADES_TIER_0 = ["boltARDreadV2"];
						Class.boltARDreadV2.UPGRADES_TIER_0 = [];

			Class.pacifierARDreadV2.UPGRADES_TIER_0 = ["mediatorARDreadV2", "negotiatorARDreadV2", "melderARDreadV2", "crackerARDreadV2", "grabberARDreadV2"];
				Class.mediatorARDreadV2.UPGRADES_TIER_0 = ["mitigatorARDreadV2"];
					Class.mitigatorARDreadV2.UPGRADES_TIER_0 = ["diplomatARDreadV2"];
						Class.diplomatARDreadV2.UPGRADES_TIER_0 = [];
				Class.negotiatorARDreadV2.UPGRADES_TIER_0 = ["appeaserARDreadV2"];
					Class.appeaserARDreadV2.UPGRADES_TIER_0 = ["arbitratorARDreadV2"];
						Class.arbitratorARDreadV2.UPGRADES_TIER_0 = [];
				Class.melderARDreadV2.UPGRADES_TIER_0 = ["amalgamARDreadV2"];
					Class.amalgamARDreadV2.UPGRADES_TIER_0 = ["dissolverARDreadV2"];
						Class.dissolverARDreadV2.UPGRADES_TIER_0 = [];
				Class.crackerARDreadV2.UPGRADES_TIER_0 = ["breakerARDreadV2"];
					Class.breakerARDreadV2.UPGRADES_TIER_0 = ["eroderARDreadV2"];
						Class.eroderARDreadV2.UPGRADES_TIER_0 = [];
				Class.grabberARDreadV2.UPGRADES_TIER_0 = ["clasperARDreadV2"];
					Class.clasperARDreadV2.UPGRADES_TIER_0 = ["gripperARDreadV2"];
						Class.gripperARDreadV2.UPGRADES_TIER_0 = [];

			Class.peacekeeperARDreadV2.UPGRADES_TIER_0 = ["enforcerARDreadV2", "executorARDreadV2", "doserARDreadV2", "swirlARDreadV2", "pelterARDreadV2"];
				Class.enforcerARDreadV2.UPGRADES_TIER_0 = ["suppressorARDreadV2"];
					Class.suppressorARDreadV2.UPGRADES_TIER_0 = ["retardantARDreadV2"];
						Class.retardantARDreadV2.UPGRADES_TIER_0 = [];
				Class.executorARDreadV2.UPGRADES_TIER_0 = ["inhibitorARDreadV2"];
					Class.inhibitorARDreadV2.UPGRADES_TIER_0 = ["tyrantARDreadV2"];
						Class.tyrantARDreadV2.UPGRADES_TIER_0 = [];
				Class.doserARDreadV2.UPGRADES_TIER_0 = ["tranquilizerARDreadV2"];
					Class.tranquilizerARDreadV2.UPGRADES_TIER_0 = ["anesthesiologistARDreadV2"];
						Class.anesthesiologistARDreadV2.UPGRADES_TIER_0 = [];
				Class.swirlARDreadV2.UPGRADES_TIER_0 = ["spiralARDreadV2"];
					Class.spiralARDreadV2.UPGRADES_TIER_0 = ["helixARDreadV2"];
						Class.helixARDreadV2.UPGRADES_TIER_0 = [];
				Class.pelterARDreadV2.UPGRADES_TIER_0 = ["shellerARDreadV2"];
					Class.shellerARDreadV2.UPGRADES_TIER_0 = ["bombardmentARDreadV2"];
						Class.bombardmentARDreadV2.UPGRADES_TIER_0 = [];

			Class.invaderARDreadV2.UPGRADES_TIER_0 = ["inquisitorARDreadV2", "assailantARDreadV2", "radiationARDreadV2", "boxerARDreadV2", "disablerARDreadV2"];
				Class.inquisitorARDreadV2.UPGRADES_TIER_0 = ["infiltratorARDreadV2"];
					Class.infiltratorARDreadV2.UPGRADES_TIER_0 = ["raiderARDreadV2"];
						Class.raiderARDreadV2.UPGRADES_TIER_0 = [];
				Class.assailantARDreadV2.UPGRADES_TIER_0 = ["aggressorARDreadV2"];
					Class.aggressorARDreadV2.UPGRADES_TIER_0 = ["gladiatorARDreadV2"];
						Class.gladiatorARDreadV2.UPGRADES_TIER_0 = [];
				Class.radiationARDreadV2.UPGRADES_TIER_0 = ["haloARDreadV2"];
					Class.haloARDreadV2.UPGRADES_TIER_0 = ["starlightARDreadV2"];
						Class.starlightARDreadV2.UPGRADES_TIER_0 = [];
				Class.boxerARDreadV2.UPGRADES_TIER_0 = ["sluggerARDreadV2"];
					Class.sluggerARDreadV2.UPGRADES_TIER_0 = ["bruiserARDreadV2"];
						Class.bruiserARDreadV2.UPGRADES_TIER_0 = [];
				Class.disablerARDreadV2.UPGRADES_TIER_0 = ["debilitatorARDreadV2"];
					Class.debilitatorARDreadV2.UPGRADES_TIER_0 = ["incapacitatorARDreadV2"];
						Class.incapacitatorARDreadV2.UPGRADES_TIER_0 = [];

			Class.centaurARDreadV2.UPGRADES_TIER_0 = ["daemonARDreadV2", "minotaurARDreadV2", "cleanerARDreadV2", "shadeARDreadV2", "screwdriverARDreadV2"];
				Class.daemonARDreadV2.UPGRADES_TIER_0 = ["hydraARDreadV2"];
					Class.hydraARDreadV2.UPGRADES_TIER_0 = ["cerberusARDreadV2"];
						Class.cerberusARDreadV2.UPGRADES_TIER_0 = [];
				Class.minotaurARDreadV2.UPGRADES_TIER_0 = ["beelzebubARDreadV2"];
					Class.beelzebubARDreadV2.UPGRADES_TIER_0 = ["luciferARDreadV2"];
						Class.luciferARDreadV2.UPGRADES_TIER_0 = [];
				Class.cleanerARDreadV2.UPGRADES_TIER_0 = ["sweeperARDreadV2"];
					Class.sweeperARDreadV2.UPGRADES_TIER_0 = ["sterilizerARDreadV2"];
						Class.sterilizerARDreadV2.UPGRADES_TIER_0 = [];
				Class.shadeARDreadV2.UPGRADES_TIER_0 = ["aegisARDreadV2"];
					Class.aegisARDreadV2.UPGRADES_TIER_0 = ["hielamanARDreadV2"];
						Class.hielamanARDreadV2.UPGRADES_TIER_0 = [];
				Class.screwdriverARDreadV2.UPGRADES_TIER_0 = ["drillARDreadV2"];
					Class.drillARDreadV2.UPGRADES_TIER_0 = ["jackhammerARDreadV2"];
						Class.jackhammerARDreadV2.UPGRADES_TIER_0 = [];

		Class.dreadBodyARDreadV2.UPGRADES_TIER_0 = ["byteARDreadV2", "showerARDreadV2", "atmosphereARDreadV2", "juggernautARDreadV2", "stomperARDreadV2", "dropperARDreadV2", "spotterARDreadV2"];

			Class.byteARDreadV2.UPGRADES_TIER_0 = ["automationARDreadV2", "kilobyteARDreadV2", "lighterARDreadV2"];

				Class.automationARDreadV2.UPGRADES_TIER_0 = ["mechanismARDreadV2", "fusionARDreadV2", "binaryARDreadV2", "exosphereARDreadV2", "burgARDreadV2", "batonARDreadV2"];
					Class.mechanismARDreadV2.UPGRADES_TIER_0 = ["skynetARDreadV2"];
						Class.skynetARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("skynetARDreadV2")];
					Class.fusionARDreadV2.UPGRADES_TIER_0 = ["supernovaARDreadV2"];
						Class.supernovaARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("supernovaARDreadV2")];
					Class.binaryARDreadV2.UPGRADES_TIER_0 = ["cipherARDreadV2"];
						Class.cipherARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("cipherARDreadV2")];
					Class.exosphereARDreadV2.UPGRADES_TIER_0 = ["interstellarARDreadV2"];
						Class.interstellarARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("interstellarARDreadV2")];
					Class.burgARDreadV2.UPGRADES_TIER_0 = ["bunkerARDreadV2"];
						Class.bunkerARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("bunkerARDreadV2")];
					Class.batonARDreadV2.UPGRADES_TIER_0 = ["maceARDreadV2"];
						Class.maceARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("maceARDreadV2")];

				Class.kilobyteARDreadV2.UPGRADES_TIER_0 = ["megabyteARDreadV2", "binaryARDreadV2", "trojanARDreadV2", "hardwareARDreadV2", "siloARDreadV2", "fireworkARDreadV2"];
					Class.megabyteARDreadV2.UPGRADES_TIER_0 = ["gigabyteARDreadV2"];
						Class.gigabyteARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("gigabyteARDreadV2")];
					// Class.binaryARDreadV2.UPGRADES_TIER_0 = ["cipherARDreadV2"];
					Class.trojanARDreadV2.UPGRADES_TIER_0 = ["malwareARDreadV2"];
						Class.malwareARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("malwareARDreadV2")];
					Class.hardwareARDreadV2.UPGRADES_TIER_0 = ["softwareARDreadV2"];
						Class.softwareARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("softwareARDreadV2")];
					Class.siloARDreadV2.UPGRADES_TIER_0 = ["arsenalARDreadV2"];
						Class.arsenalARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("arsenalARDreadV2")];
					Class.fireworkARDreadV2.UPGRADES_TIER_0 = ["missileARDreadV2"];
						Class.missileARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("missileARDreadV2")];
					
				Class.lighterARDreadV2.UPGRADES_TIER_0 = ["burnerARDreadV2"];
					Class.burnerARDreadV2.UPGRADES_TIER_0 = ["roasterARDreadV2"];
						Class.roasterARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("roasterARDreadV2")];

			Class.showerARDreadV2.UPGRADES_TIER_0 = ["stormARDreadV2"];
				Class.stormARDreadV2.UPGRADES_TIER_0 = ["tempestARDreadV2"];
					Class.tempestARDreadV2.UPGRADES_TIER_0 = ["monsoonARDreadV2"];
						Class.monsoonARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("monsoonARDreadV2")];

			Class.atmosphereARDreadV2.UPGRADES_TIER_0 = ["coronaARDreadV2", "thermosphereARDreadV2"];

				Class.coronaARDreadV2.UPGRADES_TIER_0 = ["chromosphereARDreadV2", "fusionARDreadV2", "trojanARDreadV2", "planetARDreadV2", "sirenARDreadV2", "towerARDreadV2"];
					Class.chromosphereARDreadV2.UPGRADES_TIER_0 = ["photosphereARDreadV2"];
						Class.photosphereARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("photosphereARDreadV2")];
					// Class.fusionARDreadV2.UPGRADES_TIER_0 = ["supernovaARDreadV2"];
					// Class.trojanARDreadV2.UPGRADES_TIER_0 = ["malwareARDreadV2"];
					Class.planetARDreadV2.UPGRADES_TIER_0 = ["astronomicARDreadV2"];
						Class.astronomicARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("astronomicARDreadV2")];
					Class.sirenARDreadV2.UPGRADES_TIER_0 = ["valrayvnARDreadV2"];
						Class.valrayvnARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("valrayvnARDreadV2")];
					Class.towerARDreadV2.UPGRADES_TIER_0 = ["mountainARDreadV2"];
						Class.mountainARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("mountainARDreadV2")];

				Class.thermosphereARDreadV2.UPGRADES_TIER_0 = ["mesosphereARDreadV2", "exosphereARDreadV2", "hardwareARDreadV2", "moonARDreadV2", "harpyARDreadV2", "creatureARDreadV2"];
					Class.mesosphereARDreadV2.UPGRADES_TIER_0 = ["stratosphereARDreadV2"];
						Class.stratosphereARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("stratosphereARDreadV2")];
					// Class.exosphereARDreadV2.UPGRADES_TIER_0 = ["interstellarARDreadV2"];
					// Class.hardwareARDreadV2.UPGRADES_TIER_0 = ["softwareARDreadV2"];
					Class.moonARDreadV2.UPGRADES_TIER_0 = ["grandioseARDreadV2"];
						Class.grandioseARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("grandioseARDreadV2")];
					Class.harpyARDreadV2.UPGRADES_TIER_0 = ["pegasusARDreadV2"];
						Class.pegasusARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("pegasusARDreadV2")];
					Class.creatureARDreadV2.UPGRADES_TIER_0 = ["beastARDreadV2"];
						Class.beastARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("beastARDreadV2")];

			Class.juggernautARDreadV2.UPGRADES_TIER_0 = ["jumboARDreadV2", "colossalARDreadV2", "cottonARDreadV2", "ironARDreadV2"];

				Class.jumboARDreadV2.UPGRADES_TIER_0 = ["goliathARDreadV2", "planetARDreadV2", "moonARDreadV2", "burgARDreadV2", "siloARDreadV2", "armadaARDreadV2"];
					Class.goliathARDreadV2.UPGRADES_TIER_0 = ["behemothARDreadV2"];
						Class.behemothARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("behemothARDreadV2")];
					// Class.planetARDreadV2.UPGRADES_TIER_0 = ["astronomicARDreadV2"];
					// Class.moonARDreadV2.UPGRADES_TIER_0 = ["grandioseARDreadV2"];
					// Class.burgARDreadV2.UPGRADES_TIER_0 = ["bunkerARDreadV2"];
					// Class.siloARDreadV2.UPGRADES_TIER_0 = ["arsenalARDreadV2"];
					Class.armadaARDreadV2.UPGRADES_TIER_0 = ["battalionARDreadV2"];
						Class.battalionARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("battalionARDreadV2")];

				Class.colossalARDreadV2.UPGRADES_TIER_0 = ["titanARDreadV2", "sirenARDreadV2", "harpyARDreadV2", "batonARDreadV2", "fireworkARDreadV2", "armadaARDreadV2"];
					Class.titanARDreadV2.UPGRADES_TIER_0 = ["leviathanARDreadV2"];
						Class.leviathanARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("leviathanARDreadV2")];
					// Class.sirenARDreadV2.UPGRADES_TIER_0 = ["valrayvnARDreadV2"];
					// Class.harpyARDreadV2.UPGRADES_TIER_0 = ["pegasusARDreadV2"];
					// Class.batonARDreadV2.UPGRADES_TIER_0 = ["maceARDreadV2"];
					// Class.fireworkARDreadV2.UPGRADES_TIER_0 = ["missileARDreadV2"];
					// Class.armadaARDreadV2.UPGRADES_TIER_0 = ["battalionARDreadV2"];

				Class.cottonARDreadV2.UPGRADES_TIER_0 = ["featherARDreadV2"];
					Class.featherARDreadV2.UPGRADES_TIER_0 = ["wispARDreadV2"];
						Class.wispARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("wispARDreadV2")];

				Class.ironARDreadV2.UPGRADES_TIER_0 = ["steelARDreadV2"];
					Class.steelARDreadV2.UPGRADES_TIER_0 = ["titaniumARDreadV2"];
						Class.titaniumARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("titaniumARDreadV2")];
			
			Class.stomperARDreadV2.UPGRADES_TIER_0 = ["rollerARDreadV2", "owlARDreadV2"];

				Class.rollerARDreadV2.UPGRADES_TIER_0 = ["flattenerARDreadV2", "towerARDreadV2", "creatureARDreadV2", "spotlightARDreadV2", "furnaceARDreadV2", "asteroidARDreadV2"];
					Class.flattenerARDreadV2.UPGRADES_TIER_0 = ["crusherARDreadV2"];
						Class.crusherARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("crusherARDreadV2")];
					// Class.towerARDreadV2.UPGRADES_TIER_0 = ["mountainARDreadV2"];
					// Class.creatureARDreadV2.UPGRADES_TIER_0 = ["beastARDreadV2"];
					Class.spotlightARDreadV2.UPGRADES_TIER_0 = ["luminanceARDreadV2"];
						Class.luminanceARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("luminanceARDreadV2")];
					Class.furnaceARDreadV2.UPGRADES_TIER_0 = ["foundryARDreadV2"];
						Class.foundryARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("foundryARDreadV2")];
					Class.asteroidARDreadV2.UPGRADES_TIER_0 = ["planetoidARDreadV2"];
						Class.planetoidARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("planetoidARDreadV2")];

				Class.owlARDreadV2.UPGRADES_TIER_0 = ["cardinalARDreadV2"];
					Class.cardinalARDreadV2.UPGRADES_TIER_0 = ["finchARDreadV2"];
						Class.finchARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("finchARDreadV2")];

			Class.dropperARDreadV2.UPGRADES_TIER_0 = ["baiterARDreadV2"];
				Class.baiterARDreadV2.UPGRADES_TIER_0 = ["cagerARDreadV2"];
					Class.cagerARDreadV2.UPGRADES_TIER_0 = ["hoarderARDreadV2"];
						Class.hoarderARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("hoarderARDreadV2")];

			Class.spotterARDreadV2.UPGRADES_TIER_0 = ["spyARDreadV2"];
				Class.spyARDreadV2.UPGRADES_TIER_0 = ["monitorARDreadV2"];
					Class.monitorARDreadV2.UPGRADES_TIER_0 = ["trackerARDreadV2"];
						Class.trackerARDreadV2.UPGRADES_TIER_0 = [makeHexnoughtBodyV2("trackerARDreadV2")];

	const hexDreadNames = {
		Javelin: {
			Javelin: 'Javelin',
			Rapier: 'Lance',
			Woomera: 'Shikari',
			Trebuchet: 'Ballista',
			Bolt: 'Tomahawk',
			Diplomat: 'Envoy',
			Arbitrator: 'Cutlass',
			Dissolver: 'Hellfire',
			Eroder: 'Partisan',
			Gripper: 'Encircler',
			Retardant: 'Rebel',
			Tyrant: 'Autocrat',
			Anesthesiologist: 'Patriot',
			Helix: 'Stinger',
			Bombardment: 'Downpour',
			Raider: 'Pirate',
			Gladiator: 'Pillager',
			Starlight: 'Hornet',
			Bruiser: 'Felon',
			Incapacitator: 'Stretcher',
			Cerberus: 'Argonaut',
			Lucifer: 'Kitsune',
			Sterilizer: 'Mastermind',
			Hielaman: 'Swordsman', 
			Jackhammer: 'Fissure',
		},
		Rapier: {
			Rapier: 'Rapier',
			Woomera: 'Cavalier',
			Trebuchet: 'Katana',
			Bolt: 'Claymore',
			Diplomat: 'Emissary',
			Arbitrator: 'Umpire',
			Dissolver: 'Relocator',
			Eroder: 'Debris',
			Gripper: 'Interrogator',
			Retardant: 'Impeder',
			Tyrant: 'Oppressor',
			Anesthesiologist: 'Slumberer',
			Helix: 'Vortex',
			Bombardment: 'Butcher',
			Raider: 'Bandit',
			Gladiator: 'Injurer',
			Starlight: 'Radiance',
			Bruiser: 'Ringster',
			Incapacitator: 'Swamper',
			Cerberus: 'Cyclops',
			Lucifer: 'Damocles',
			Sterilizer: 'Sanitizer',
			Hielaman: 'Escutcheon', 
			Jackhammer: 'Borer',
		},
		Woomera: {
			Woomera: 'Woomera',
			Trebuchet: 'Cannonball',
			Bolt: 'Piercer', // Soap
			Diplomat: 'Contractor',
			Arbitrator: 'Spirit',
			Dissolver: 'Venom',
			Eroder: 'Decomposer',
			Gripper: 'Crucifier',
			Retardant: 'Overrunner',
			Tyrant: 'Revolutionary',
			Anesthesiologist: 'Guerilla',
			Helix: 'Cultivator',
			Bombardment: 'Incendiary',
			Raider: 'Dispatcher', // Soap
			Gladiator: 'Pugilist',
			Starlight: 'Starborne',
			Bruiser: 'Soldier',
			Incapacitator: 'Scavenger', // Soap
			Cerberus: 'Poltergeist',
			Lucifer: 'Hunkerer',
			Sterilizer: 'Janitor',
			Hielaman: 'Reinforcer', 
			Jackhammer: 'Pyroclastic',
		},
		Trebuchet: {
			Trebuchet: 'Trebuchet',
			Bolt: 'Archer',
			Diplomat: 'Sherman',
			Arbitrator: 'Ultimatum',
			Dissolver: 'Grapeshot',
			Eroder: 'Shrapnel',
			Gripper: 'Razer',
			Retardant: 'Mangonel',
			Tyrant: 'Incarcerator', // Zenphia
			Anesthesiologist: 'Evacuator',
			Helix: 'Hurricane',
			Bombardment: 'Surrenderer',
			Raider: 'Capitulator',
			Gladiator: 'Uprising',
			Starlight: 'Magnetar',
			Bruiser: 'Crumpler',
			Incapacitator: 'Pinner',
			Cerberus: 'Phantom', // Umbra
			Lucifer: 'Sisyphus',
			Sterilizer: 'Operation',
			Hielaman: 'Entrencher', 
			Jackhammer: 'Demolitionist',
		},
		Bolt: {
			Bolt: 'Bolt',
			Diplomat: 'Informant',
			Arbitrator: 'Assaulter',
			Dissolver: 'Sprinter',
			Eroder: 'Discharger', // Soap
			Gripper: 'Lightning',
			Retardant: 'Evicter',
			Tyrant: 'Minister',
			Anesthesiologist: 'Ambusher',
			Helix: 'Ultraviolet',
			Bombardment: 'Dynamo',
			Raider: 'Infector',
			Gladiator: 'Blinder',
			Starlight: 'Neutrino',
			Bruiser: 'Impactor',
			Incapacitator: 'Volt',
			Cerberus: 'Collapse',
			Lucifer: 'Barycenter',
			Sterilizer: 'Greenhouse',
			Hielaman: 'Nebula', 
			Jackhammer: 'Archaeologist',
		},
		Diplomat: {
			Diplomat: 'Diplomat',
			Arbitrator: 'Moderator',
			Dissolver: 'Impaler', // Soap
			Eroder: 'Vulcan',
			Gripper: 'Politician',
			Retardant: 'Insurgent',
			Tyrant: 'Dictator',
			Anesthesiologist: 'Transporter',
			Helix: 'Signature',
			Bombardment: 'Berserker', // Soap
			Raider: 'Marauder',
			Gladiator: 'Champion',
			Starlight: 'Comet',
			Bruiser: 'Ambassador',
			Incapacitator: 'Erebus', // Yharon
			Cerberus: 'Orion',
			Lucifer: 'Manticore',
			Sterilizer: 'Officer',
			Hielaman: 'Investigator', 
			Jackhammer: 'Devourer', // Soap
		},
		Arbitrator: {
			Arbitrator: 'Arbitrator',
			Dissolver: 'Bargainer',
			Eroder: 'Stipulator',
			Gripper: 'Adjudicator',
			Retardant: 'Extinguisher',
			Tyrant: 'Shogun',
			Anesthesiologist: 'Brute',
			Helix: 'Referee',
			Bombardment: 'Jury',
			Raider: 'Buccaneer',
			Gladiator: 'Warrior',
			Starlight: 'Genesis', // Siece
			Bruiser: 'Terminator', // Soap
			Incapacitator: 'Debater',
			Cerberus: 'Gorgon',
			Lucifer: 'Keres',
			Sterilizer: 'Warden',
			Hielaman: 'Crusader', 
			Jackhammer: 'Excavator',
		},
		Dissolver: {
			Dissolver: 'Dissolver',
			Eroder: 'Current',
			Gripper: 'Patronizer',
			Retardant: 'Corroder',
			Tyrant: 'Throne',
			Anesthesiologist: 'Neurotoxin',
			Helix: 'Solution',
			Bombardment: 'Chlorine',
			Raider: 'Traitor',
			Gladiator: 'Abolitionist',
			Starlight: 'Accretion',
			Bruiser: 'Piranha',
			Incapacitator: 'Sandstorm',
			Cerberus: 'Appalachian',
			Lucifer: 'Styx',
			Sterilizer: 'Peroxide',
			Hielaman: 'Frontier', 
			Jackhammer: 'Fracker',
		},
		Eroder: {
			Eroder: 'Eroder',
			Gripper: 'Psychologist',
			Retardant: 'Shatterer',
			Tyrant: 'Crackdown',
			Anesthesiologist: 'Torrent',
			Helix: 'Tornado',
			Bombardment: 'Backstabber',
			Raider: 'Militant', // Umbra
			Gladiator: 'Vitrifier',
			Starlight: 'Stardust',
			Bruiser: 'Gasher', // Soap
			Incapacitator: 'Lacerator', // Soap
			Cerberus: 'Inevitability',
			Lucifer: 'Fragment',
			Sterilizer: 'Cynic',
			Hielaman: 'Polisher', 
			Jackhammer: 'Hoser',
		},
		Gripper: {
			Gripper: 'Gripper',
			Retardant: 'Arrestor',
			Tyrant: 'Tormentor', // Soap
			Anesthesiologist: 'Experimenter',
			Helix: 'Blockader',
			Bombardment: 'Striker',
			Raider: 'Warmongerer', // Umbra
			Gladiator: 'Throwdown',
			Starlight: 'Cryogen',
			Bruiser: 'Knockout',
			Incapacitator: 'Restrainer',
			Cerberus: 'Prometheus',
			Lucifer: 'Mortician',
			Sterilizer: 'Cleanser',
			Hielaman: 'Periscope', 
			Jackhammer: 'Vice',
		},
		Retardant: {
			Retardant: 'Retardant',
			Tyrant: 'Anarchist',
			Anesthesiologist: 'Buckshot', // Soap
			Helix: 'Magnetron',
			Bombardment: 'Sergeant',
			Raider: 'Freebooter',
			Gladiator: 'Combatant',
			Starlight: 'Apparition',
			Bruiser: 'Executioner', // Soap
			Incapacitator: 'Smotherer',
			Cerberus: 'Gigantes',
			Lucifer: 'Demogorgon',
			Sterilizer: 'Fumigator',
			Hielaman: 'Avalanche', 
			Jackhammer: 'Propagator',
		},
		Tyrant: {
			Tyrant: 'Tyrant',
			Anesthesiologist: 'Barbarian',
			Helix: 'Nautilus',
			Bombardment: 'Admiral',
			Raider: 'Corsair',
			Gladiator: 'Amazon',
			Starlight: 'Theocrat',
			Bruiser: 'Authoritarian',
			Incapacitator: 'Jailkeeper',
			Cerberus: 'Ouroboros',
			Lucifer: 'Raiju',
			Sterilizer: 'Purifier',
			Hielaman: 'Protectorate', 
			Jackhammer: 'Detailer',
		},
		Anesthesiologist: {
			Anesthesiologist: 'Anesthesiologist',
			Helix: 'Blizzard',
			Bombardment: 'Nightmare',
			Raider: 'Vaccinator',
			Gladiator: 'Harbinger', // Siece
			Starlight: 'Hypnotizer',
			Bruiser: 'Tactician',
			Incapacitator: 'Psychic', // Soap
			Cerberus: 'Revenant',
			Lucifer: 'Rehabilitator',
			Sterilizer: 'Pestilence',
			Hielaman: 'Heater', 
			Jackhammer: 'Sledgehammer',
		},
		Helix: {
			Helix: 'Helix',
			Bombardment: 'Derecho',
			Raider: 'Deliverer',
			Gladiator: 'Constrictor',
			Starlight: 'Orbit',
			Bruiser: 'Cobra',
			Incapacitator: 'Windfall',
			Cerberus: 'Viper',
			Lucifer: 'Taipan',
			Sterilizer: 'Networker',
			Hielaman: 'Turbine', 
			Jackhammer: 'Spindler',
		},
		Bombardment: {
			Bombardment: 'Bombardment',
			Raider: 'Specialist',
			Gladiator: 'Leonidas',
			Starlight: 'Meteor',
			Bruiser: 'Grenadier',
			Incapacitator: 'Shellshocker',
			Cerberus: 'Deluge',
			Lucifer: 'Containment',
			Sterilizer: 'Haven',
			Hielaman: 'Ballistic', 
			Jackhammer: 'Mallet', // Soap
		},
		Raider: {
			Raider: 'Raider',
			Gladiator: 'Filibuster',
			Starlight: 'Colonizer',
			Bruiser: 'Plunderer', // Umbra
			Incapacitator: 'Blitzkrieg',
			Cerberus: 'Wyvern',
			Lucifer: 'Kraken',
			Sterilizer: 'Splatterer',
			Hielaman: 'Strategist', 
			Jackhammer: 'Extractor',
		},
		Gladiator: {
			Gladiator: 'Gladiator',
			Starlight: 'Enveloper',
			Bruiser: 'Fistfighter',
			Incapacitator: 'Overloader', // Umbra
			Cerberus: 'Ogre',
			Lucifer: 'Wendigo',
			Sterilizer: 'Garrison', // Umbra
			Hielaman: 'Uziel', // Zenphia
			Jackhammer: 'Warlord',
		},
		Starlight: {
			Starlight: 'Starlight',
			Bruiser: 'Wanderer',
			Incapacitator: 'Starstruck',
			Cerberus: 'Constellation',
			Lucifer: 'Galaxy',
			Sterilizer: 'Evaporator',
			Hielaman: 'Protostar', 
			Jackhammer: 'Illuminator',
		},
		Bruiser: {
			Bruiser: 'Bruiser',
			Incapacitator: 'Mauler',
			Cerberus: 'Serpent',
			Lucifer: 'Trident',
			Sterilizer: 'Suture',
			Hielaman: 'Heavyweight', 
			Jackhammer: 'Stapler',
		},
		Incapacitator: {
			Incapacitator: 'Incapacitator',
			Cerberus: 'Opportunist',
			Lucifer: 'Condemner',
			Sterilizer: 'Poisoner',
			Hielaman: 'Eyrie', 
			Jackhammer: 'Thrasher', // Soap
		},
		Cerberus: {
			Cerberus: 'Cerberus',
			Lucifer: 'Oni',
			Sterilizer: 'Antibody',
			Hielaman: 'Typhon', 
			Jackhammer: 'Paver',
		},
		Lucifer: {
			Lucifer: 'Lucifer',
			Sterilizer: 'Lipid',
			Hielaman: 'Insulator', 
			Jackhammer: 'Earthquaker',
		},
		Sterilizer: {
			Sterilizer: 'Sterilizer',
			Hielaman: 'Homeland', 
			Jackhammer: 'Bulldozer',
		},
		Hielaman: {
			Hielaman: 'Hielaman', 
			Jackhammer: 'Compactor',
		},
		Jackhammer: {
			Jackhammer: 'Jackhammer',
		},
	};

	function mergeHexnoughtWeaponV2(weapon1, weapon2) {
		weapon1 = ensureIsClass(Class, weapon1);
		weapon2 = ensureIsClass(Class, weapon2);

		let PARENT = Class.genericHexnought,
			BODY = JSON.parse(JSON.stringify(PARENT.BODY)),
			GUNS = [],
			gunsOnOneSide = [],
			weapon2GunsOnOneSide = [],
			TURRETS = [],
			turretsOnOneSide = [],
			weapon2TurretsOnOneSide = [],
			CONTROLLERS = weapon2.CONTROLLERS;

		// Label
		let name1 = hexDreadNames[weapon1.LABEL][weapon2.LABEL],
			name2 = hexDreadNames[weapon2.LABEL][weapon1.LABEL],
			weaponName = weapon1.LABEL + weapon2.LABEL,
			orientationId = 0;
		if (name1) {
			weaponName = name1;
		} else if (name2) {
			weaponName = name2,
			orientationId = 1;
		}
		let LABEL = weaponName,
			className = weapon1.LABEL.toLowerCase() + weapon2.LABEL + orientationId + "ARDreadV2";
		
		// Guns ----------------------
		if (weapon1.GUNS) gunsOnOneSide.push(...JSON.parse(JSON.stringify(weapon1.GUNS.slice(0, weapon1.GUNS.length / 5))));
		if (weapon2.GUNS) weapon2GunsOnOneSide = JSON.parse(JSON.stringify(weapon2.GUNS.slice(0, weapon2.GUNS.length / 5)));

		for (let g in weapon2GunsOnOneSide) weapon2GunsOnOneSide[g].POSITION[5] += 60;
		gunsOnOneSide.push(...weapon2GunsOnOneSide)

		// Turrets -------------------
		if (weapon1.TURRETS) turretsOnOneSide.push(...JSON.parse(JSON.stringify(weapon1.TURRETS.slice(0, weapon1.TURRETS.length / 5))));
		if (weapon2.TURRETS) weapon2TurretsOnOneSide = JSON.parse(JSON.stringify(weapon2.TURRETS.slice(0, weapon2.TURRETS.length / 5)));

		for (let t in weapon2TurretsOnOneSide) weapon2TurretsOnOneSide[t].POSITION[3] += 60;
		turretsOnOneSide.push(...weapon2TurretsOnOneSide)

		// Scale to fit size constraints
		for (let g in gunsOnOneSide) {
			gunsOnOneSide[g].POSITION[1] *= hexnoughtScaleFactor ** 2;
			gunsOnOneSide[g].POSITION[4] *= hexnoughtScaleFactor ** 2;
		}

		for (let t in turretsOnOneSide) {
			turretsOnOneSide[t].POSITION[0] *= hexnoughtScaleFactor ** 2;
		}

		for (let i = 0; i < 3; i++) {
			for (let g in gunsOnOneSide) {
				let gun = JSON.parse(JSON.stringify(gunsOnOneSide[g]));
				gun.POSITION[5] += 120 * i;
				GUNS.push(gun);
			}
			for (let t in turretsOnOneSide) {
				let turret = JSON.parse(JSON.stringify(turretsOnOneSide[t]));
				turret.POSITION[3] += 120 * i;
				TURRETS.push(turret);
			}
		};

		// Gladiator
		if (weapon1.LABEL == "Gladiator" || weapon2.LABEL == "Gladiator") {
			let droneSpawnerIndex = 0
			for (let g in GUNS) {
				let gun = GUNS[g];
				if (gun.PROPERTIES && gun.PROPERTIES.TYPE == "gladiatorTritankMinionARDreadV2") {
					switch (droneSpawnerIndex) {
						case 1:
							gun.PROPERTIES.TYPE = "gladiatorTritrapMinionARDreadV2";
							break;
						case 2:
							gun.PROPERTIES.TYPE = "gladiatorTriswarmMinionARDreadV2";
							break;
						case 3:
							gun.PROPERTIES.TYPE = "gladiatorAutoMinionARDreadV2";
							break;
						case 4:
							gun.PROPERTIES.TYPE = "gladiatorAuraMinionARDreadV2";
							break;
						case 5:
							gun.PROPERTIES.TYPE = "gladiatorHealAuraMinionARDreadV2";
							break;
					}
					droneSpawnerIndex++;
				}
			}
		}
		
		// Body stat modification
		if (weapon1.BODY) for (let m in weapon1.BODY) BODY[m] *= weapon1.BODY[m];
		if (weapon2.BODY) for (let m in weapon2.BODY) BODY[m] *= weapon2.BODY[m];

		// Smash it together
		Class[className] = {
			PARENT, BODY, LABEL, GUNS, TURRETS, CONTROLLERS
		};
		return className;
	}

	function makeHexnoughtBodyV2(body) {
		if (!buildHexnoughts) return;
		
		body = ensureIsClass(Class, body);

		let PARENT = Class.genericHexnought,
			SIZE = body.SIZE ?? 1,
			BODY = {},
			GUNS = body.GUNS ?? [],
			TURRETS = [],
			LABEL = body.LABEL;

		// Label
		let className = LABEL.toLowerCase() + "HexARDreadV2";
		
		// Turrets --------------------
		let turretRingLoopLength = Math.floor(body.TURRETS.length / 5);
  
    	// Turret adding
		for (let t = 0; t < body.TURRETS.length; t++) {
			let turret = body.TURRETS[t];
			if (turret.TYPE[0].indexOf('pentagon') >= 0) { // Replace pentagons with hexagons
				TURRETS.push(
					{
						POSITION: [turret.POSITION[0], 0, 0, turret.POSITION[3], turret.POSITION[4], turret.POSITION[5]],
						TYPE: ['hexagon' + turret.TYPE[0].substring(8), turret.TYPE[1]],
					}
				);
			} else if (turret.POSITION[1]) { // Do whole turret loop at once
				for (let i = 0; i < turretRingLoopLength; i++) {
					for (let j = 0; j < 6; j++) {
						turret = body.TURRETS[t + i * 5];
						TURRETS.push(
							{
								POSITION: [turret.POSITION[0] * hexnoughtScaleFactor, turret.POSITION[1] * hexnoughtScaleFactor ** 0.5, turret.POSITION[2], turret.POSITION[3] / 6 * 5 + 60 * j, turret.POSITION[4], turret.POSITION[5]],
								TYPE: turret.TYPE,
							}
						)
					}
				}
				t += 5 * turretRingLoopLength - 1;
			} else { // Centered turrets
				TURRETS.push(
					{
						POSITION: [turret.POSITION[0] * hexnoughtScaleFactor ** 0.5, 0, 0, turret.POSITION[3], turret.POSITION[4], turret.POSITION[5]],
						TYPE: turret.TYPE,
					}
				) 
      		}
		}
		
		// Body stat modification
		if (body.BODY) for (let m in body.BODY) BODY[m] = body.BODY[m];

		// Smash it together
		Class[className] = {
			PARENT, SIZE, BODY, LABEL, GUNS, TURRETS,
		};
		return className;
	}

	// Merge hexdreads
	const pentanoughtWeapons = [
								"rapierARDreadV2",     "javelinARDreadV2",     "woomeraARDreadV2",           "trebuchetARDreadV2",  "boltARDreadV2",
								"diplomatARDreadV2",   "arbitratorARDreadV2",  "dissolverARDreadV2",         "eroderARDreadV2",     "gripperARDreadV2",
								"retardantARDreadV2",  "tyrantARDreadV2",      "anesthesiologistARDreadV2",  "helixARDreadV2",      "bombardmentARDreadV2",
								"raiderARDreadV2",     "gladiatorARDreadV2",   "starlightARDreadV2",         "bruiserARDreadV2",    "incapacitatorARDreadV2",
								"cerberusARDreadV2",   "luciferARDreadV2",     "sterilizerARDreadV2",        "hielamanARDreadV2",   "jackhammerARDreadV2",
								];
	if(buildHexnoughts) {
		for (let i of pentanoughtWeapons) {
			for (let j of pentanoughtWeapons) {
				Class[i].UPGRADES_TIER_0.push(mergeHexnoughtWeaponV2(i, j));
			}
		}
	}
};
