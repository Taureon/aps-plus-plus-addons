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
	RESIST: base.RESIST * 1.5,
	DENSITY: base.DENSITY * 1.5,
};
const squarenoughtBody = {
    SPEED: base.SPEED * 0.675,
    HEALTH: base.HEALTH * 2.5,
	SHIELD: base.SHIELD * 2,
	REGEN: base.REGEN * 2,
    FOV: base.FOV * 0.95,
	RESIST: base.RESIST * 2,
	DENSITY: base.DENSITY * 2,
};
const trinoughtBody = {
    SPEED: base.SPEED * 0.55,
    HEALTH: base.HEALTH * 3.5,
	SHIELD: base.SHIELD * 2.5,
	REGEN: base.REGEN * 2.5,
    FOV: base.FOV * 0.95,
	RESIST: base.RESIST * 2.5,
	DENSITY: base.DENSITY * 2.5,
};
const pentanoughtBody = {
    SPEED: base.SPEED * 0.425,
    HEALTH: base.HEALTH * 4.25,
	SHIELD: base.SHIELD * 3,
	REGEN: base.REGEN * 3,
    FOV: base.FOV * 0.95,
	RESIST: base.RESIST * 3,
	DENSITY: base.DENSITY * 3,
};
const hexnoughtBody = {
    SPEED: base.SPEED * 0.3,
    HEALTH: base.HEALTH * 5,
	SHIELD: base.SHIELD * 3.5,
	REGEN: base.REGEN * 3.5,
    FOV: base.FOV * 0.95,
	RESIST: base.RESIST * 3.5,
	DENSITY: base.DENSITY * 3.5,
};

module.exports = ({ Class }) => {
	// Comment out the line below to enable this addon, uncomment it to disable this addon (WARNING: Increases load time by approximately 3x).
	//return console.log('--- Arms Race Dreadnoughts v2 addon [armsRace_dreadv2.js] is disabled. See lines 60-61 to enable it. ---');
	console.log('--- The Arms Race Dreadnoughts v2 addon [armsRace_dreadv2.js] cannot coexist with the regular Dreadnoughts v2 addon [dreadv2.js]. ' + 
				'Please make sure that the Dreadnoughts v2 addon has been disabled or does not exist.---');

	// Set the below variable to true to enable hex dreadnought building (WARNING: increases load time by approximately 10x)
	const buildHexnoughts = false;

	// Comment out lines from the arrays below to disable that branch of the tree from being generated.
	const eggnoughtWeapons = [
		"swordARDreadV2",
		"pacifierARDreadV2",
		"peacekeeperARDreadV2",
		"invaderARDreadV2",
		"centaurARDreadV2",
	];
	const eggnoughtBodies = [
		"byteARDreadV2",
		"showerARDreadV2",
		"atmosphereARDreadV2",
		"juggernautARDreadV2",
		"stomperARDreadV2",
		"dropperARDreadV2",
		"spotterARDreadV2",
	];

	// Misc
	Class.genericDreadnoughtARDreadV2 = {
		PARENT: ["genericTank"],
		SKILL_CAP: Array(10).fill(smshskl),
		REROOT_UPGRADE_TREE: "dreadARDreadV2",
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
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.auto]),
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
		LEVEL: 90,
		EXTRA_SKILL: 18,
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
	Class.showerARDreadV2 = { // Drones
	    PARENT: ["genericEggnought"],
	    LABEL: "Shower",
	    TURRETS: [],
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
				POSITION: [24, 0, 0, 0, 0, 0],
				TYPE: ['egg', {COLOR: 9}]
			},
		],
	}
	Class.stomperARDreadV2 = { // Size increase
	    PARENT: ["genericEggnought"],
	    LABEL: "Stomper",
	    TURRETS: [],
	}
    Class.dropperARDreadV2 = { // Minelayer
	    PARENT: ["genericEggnought"],
	    LABEL: "Dropper",
	    TURRETS: [],
	}
    Class.spotterARDreadV2 = { // FOV
	    PARENT: ["genericEggnought"],
	    LABEL: "Spotter",
	    TURRETS: [],
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
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.assass, {reload: 0.85}]),
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
	    GUNS: [],
	}
	Class.catapultARDreadV2 = { // mega-sniper
	    PARENT: ["genericSquarenought"],
	    LABEL: "Catapult",
	    GUNS: [],
	}
	Class.dartARDreadV2 = { // railgun
	    PARENT: ["genericSquarenought"],
	    LABEL: "Dart",
	    GUNS: [],
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
	Class.melderARDreadV2 = { // combo
	    PARENT: ["genericSquarenought"],
	    LABEL: "Melder",
	    GUNS: [],
	}
	Class.crackerARDreadV2 = { // ultra bullet spam
	    PARENT: ["genericSquarenought"],
	    LABEL: "Cracker",
	    GUNS: [],
	}
	Class.grabberARDreadV2 = { // crowbar
	    PARENT: ["genericSquarenought"],
	    LABEL: "Grabber",
	    GUNS: [],
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
	Class.swirlARDreadV2 = { // twister
	    PARENT: ["genericSquarenought"],
	    LABEL: "Swirl",
	    GUNS: [],
	}
	Class.pelterARDreadV2 = { // artillery
	    PARENT: ["genericSquarenought"],
	    LABEL: "Pelter",
	    GUNS: [],
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
	Class.boxerARDreadV2 = { // honcho
	    PARENT: ["genericSquarenought"],
	    LABEL: "Boxer",
	    GUNS: [],
	}
	Class.disablerARDreadV2 = { // swarms
	    PARENT: ["genericSquarenought"],
	    LABEL: "Disabler",
	    GUNS: [],
	}
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
	Class.cleanerARDreadV2 = { // auto-traps
	    PARENT: ["genericSquarenought"],
	    LABEL: "Cleaner",
	    GUNS: [],
	}
	Class.shadeARDreadV2 = { // aura-traps
	    PARENT: ["genericSquarenought"],
	    LABEL: "Shade",
	    GUNS: [],
	}
	Class.screwdriverARDreadV2 = { // trap + gun
	    PARENT: ["genericSquarenought"],
	    LABEL: "Screwdriver",
	    GUNS: [],
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
	Class.lighterARDreadV2 = { // Flamethrower
	    PARENT: ["genericSquarenought"],
	    LABEL: "Lighter",
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: ["square", {TURRET_FACES_CLIENT: true}],
			},
		],
	}
	Class.stormARDreadV2 = { // Drones
	    PARENT: ["genericSquarenought"],
	    LABEL: "Storm",
	    TURRETS: [],
	}
	Class.coronaAuraARDreadV2 = addAura(1.5, 0.7);
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
	    BODY: {
			HEALTH: 2.4,
			SHIELD: 2.4,
			REGEN: 2,
			SPEED: 0.65,
		},
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 0, 0, 1],
				TYPE: ['square', {MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [24, 0, 0, 0, 0, 0],
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
	Class.colossalARDreadV2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Colossal",
		BODY: {
			SPEED: 1.75,
			HEALTH: 0.65,
		},
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 0, 0, 1],
				TYPE: ['colossalTopARDreadV2', {MIRROR_MASTER_ANGLE: true}]
			},
		],
	}
	for (let i = 0; i < 4; i++) {
		Class.colossalARDreadV2.GUNS.push(
			{
				POSITION: [4, 17.5, 0.001, 9, 0, 90*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.cottonARDreadV2 = { // Drifter
	    PARENT: ["genericSquarenought"],
	    LABEL: "Cotton",
		GUNS: [],
	    TURRETS: [],
	}
	Class.ironARDreadV2 = { // Body damage increase
	    PARENT: ["genericSquarenought"],
	    LABEL: "Iron",
		GUNS: [],
	    TURRETS: [],
	}
	Class.rollerARDreadV2 = { // Size increase
	    PARENT: ["genericSquarenought"],
	    LABEL: "Roller",
	    TURRETS: [],
	}
	Class.owlARDreadV2 = { // Size decrease
	    PARENT: ["genericSquarenought"],
	    LABEL: "Owl",
	    TURRETS: [],
	}
    Class.baiterARDreadV2 = { // Minelayer
	    PARENT: ["genericSquarenought"],
	    LABEL: "Baiter",
	    TURRETS: [],
	}
    Class.spyARDreadV2 = { // FOV
	    PARENT: ["genericSquarenought"],
	    LABEL: "Spy",
	    TURRETS: [],
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
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.assass, g.assass, {reload: 0.8}]),
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
	    GUNS: [],
	}
	Class.ballistaARDreadV2 = { // mega-sniper
	    PARENT: ["genericTrinought"],
	    LABEL: "Ballista",
	    GUNS: [],
	}
	Class.barbARDreadV2 = { // railgun
	    PARENT: ["genericTrinought"],
	    LABEL: "Barb",
	    GUNS: [],
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
	Class.amalgamARDreadV2 = { // combo
	    PARENT: ["genericTrinought"],
	    LABEL: "Amalgam",
	    GUNS: [],
	}
	Class.breakerARDreadV2 = { // ultra bullet spam
	    PARENT: ["genericTrinought"],
	    LABEL: "Breaker",
	    GUNS: [],
	}
	Class.clasperARDreadV2 = { // crowbar
	    PARENT: ["genericTrinought"],
	    LABEL: "Clasper",
	    GUNS: [],
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
	Class.spiralARDreadV2 = { // twister
	    PARENT: ["genericTrinought"],
	    LABEL: "Spiral",
	    GUNS: [],
	}
	Class.shellerARDreadV2 = { // artillery
	    PARENT: ["genericTrinought"],
	    LABEL: "Sheller",
	    GUNS: [],
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
	Class.sluggerARDreadV2 = { // honcho
	    PARENT: ["genericTrinought"],
	    LABEL: "Slugger",
	    GUNS: [],
	}
	Class.debilitatorARDreadV2 = { // swarms
	    PARENT: ["genericTrinought"],
	    LABEL: "Debilitator",
	    GUNS: [],
	}
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
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.twin, g.pound, g.fast]),
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
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.morespeed, {health: 2}]),
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
	Class.aegisARDreadV2 = { // aura-traps
	    PARENT: ["genericTrinought"],
	    LABEL: "Aegis",
	    GUNS: [],
	}
	Class.drillARDreadV2 = { // trap + gun
	    PARENT: ["genericTrinought"],
	    LABEL: "Drill",
	    GUNS: [],
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
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigAura",
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.fusionARDreadV2.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.binaryARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Binary",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.binaryARDreadV2.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.binaryARDreadV2.TURRETS.push(
		{
			POSITION: [10, 0, 0, 0, 360, 1],
			TYPE: "kilobyteTurretARDreadV2",
		},
	)
	Class.trinoughtBigHealAura = addAura(-1.5, 1.5);
	Class.exosphereARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Exosphere",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigHealAura",
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.exosphereARDreadV2.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
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
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.trojanARDreadV2.TURRETS.push(
			{
				POSITION: [3.5, 11, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.trojanARDreadV2.TURRETS.push(
		{
			POSITION: [10, 0, 0, 0, 360, 1],
			TYPE: "kilobyteTurretARDreadV2",
		},
	)
	Class.trinoughtSmallHealAura = addAura(-2/3, 2.1, 0.15);
	Class.hardwareARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Hardware",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.hardwareARDreadV2.TURRETS.push(
			{
				POSITION: [3.5, 11, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}
	Class.hardwareARDreadV2.TURRETS.push(
		{
			POSITION: [10, 0, 0, 0, 360, 1],
			TYPE: "kilobyteTurretARDreadV2",
		},
	)
	Class.burnerARDreadV2 = { // Flamethrower
	    PARENT: ["genericTrinought"],
	    LABEL: "Burner",
	    TURRETS: [],
	}
	Class.tempestARDreadV2 = { // Drones
	    PARENT: ["genericTrinought"],
	    LABEL: "Tempest",
	    TURRETS: [],
	}
	Class.chromosphereARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Chromosphere",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigAura",
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.chromosphereARDreadV2.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.mesosphereARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Mesosphere",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigHealAura",
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.mesosphereARDreadV2.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}
	Class.goliathARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Goliath",
	    BODY: {
			HEALTH: 3.2,
			SHIELD: 3.2,
			REGEN: 2.5,
			SPEED: 0.5,
		},
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 180, 0, 1],
				TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
		],
	}
	Class.planetARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Planet",
		BODY: {
			HEALTH: 2.4,
			SHIELD: 2.4,
			REGEN: 2,
			SPEED: 0.65,
		},
	    TURRETS: [
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			}
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.planetARDreadV2.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.moonARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Moon",
		BODY: {
			HEALTH: 2.4,
			SHIELD: 2.4,
			REGEN: 2,
			SPEED: 0.65,
		},
	    TURRETS: [
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			}
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.moonARDreadV2.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}
	Class.burgARDreadV2 = { // HP + auto spam
	    PARENT: ["genericTrinought"],
	    LABEL: "Burg",
	    TURRETS: [],
	}
	Class.siloARDreadV2 = { // HP + big auto
	    PARENT: ["genericTrinought"],
	    LABEL: "Silo",
	    TURRETS: [],
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
		BODY: {
			SPEED: 2.15,
			HEALTH: 0.5,
		},
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [11, 0, 0, 0, 0, 1],
				TYPE: ["titanTopARDreadV2", {MIRROR_MASTER_ANGLE: true}]
			}
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.titanARDreadV2.GUNS.push(
			{
				POSITION: [5, 26, 0.001, 8, 0, 120*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.sirenARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Siren",
		BODY: {
			SPEED: 1.75,
			HEALTH: 0.65,
		},
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			}
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.sirenARDreadV2.GUNS.push(
			{
				POSITION: [5, 26, 0.001, 8, 0, 120*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.sirenARDreadV2.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.harpyARDreadV2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Harpy",
		BODY: {
			SPEED: 1.75,
			HEALTH: 0.65,
		},
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			}
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.harpyARDreadV2.GUNS.push(
			{
				POSITION: [5, 26, 0.001, 8, 0, 120*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.harpyARDreadV2.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}
	Class.batonARDreadV2 = { // Speed + auto spam
	    PARENT: ["genericTrinought"],
	    LABEL: "Baton",
	    TURRETS: [],
	}
	Class.fireworkARDreadV2 = { // Speed + big auto
	    PARENT: ["genericTrinought"],
	    LABEL: "Firework",
	    TURRETS: [],
	}
	Class.armadaARDreadV2 = { // Speed + HP
	    PARENT: ["genericTrinought"],
	    LABEL: "Armada",
	    TURRETS: [],
	}
	Class.featherARDreadV2 = { // Drifter
	    PARENT: ["genericTrinought"],
	    LABEL: "Feather",
		GUNS: [],
	    TURRETS: [],
	}
	Class.steelARDreadV2 = { // Body damage increase
	    PARENT: ["genericTrinought"],
	    LABEL: "Steel",
		GUNS: [],
	    TURRETS: [],
	}
	Class.flattenerARDreadV2 = { // Size increase
	    PARENT: ["genericTrinought"],
	    LABEL: "Flattener",
	    TURRETS: [],
	}
	Class.towerARDreadV2 = { // Size increase + auras
	    PARENT: ["genericTrinought"],
	    LABEL: "Tower",
	    TURRETS: [],
	}
	Class.creatureARDreadV2 = { // Size increase + heal auras
	    PARENT: ["genericTrinought"],
	    LABEL: "Creature",
	    TURRETS: [],
	}
	Class.spotlightARDreadV2 = { // Size increase + big aura
	    PARENT: ["genericTrinought"],
	    LABEL: "Spotlight",
	    TURRETS: [],
	}
	Class.furnaceARDreadV2 = { // Size increase + big heal aura
	    PARENT: ["genericTrinought"],
	    LABEL: "Furnace",
	    TURRETS: [],
	}
	Class.asteroidARDreadV2 = { // Size increase + big auto
	    PARENT: ["genericTrinought"],
	    LABEL: "Asteroid",
	    TURRETS: [],
	}
	Class.cardinalARDreadV2 = { // Size decrease
	    PARENT: ["genericTrinought"],
	    LABEL: "Cardinal",
	    TURRETS: [],
	}
    Class.cagerARDreadV2 = { // Minelayer
	    PARENT: ["genericTrinought"],
	    LABEL: "Cager",
	    TURRETS: [],
	}
    Class.monitorARDreadV2 = { // FOV
	    PARENT: ["genericTrinought"],
	    LABEL: "Monitor",
	    TURRETS: [],
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
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.assass, g.assass, g.assass, {reload: 0.8}]),
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
	    GUNS: [],
	}
	Class.trebuchetARDreadV2 = { // mega-sniper
	    PARENT: ["genericPentanought"],
	    LABEL: "Trebuchet",
	    GUNS: [],
	}
	Class.boltARDreadV2 = { // railgun
	    PARENT: ["genericPentanought"],
	    LABEL: "Bolt",
	    GUNS: [],
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
	Class.dissolverARDreadV2 = { // combo
	    PARENT: ["genericPentanought"],
	    LABEL: "Dissolver",
	    GUNS: [],
	}
	Class.eroderARDreadV2 = { // ultra bullet spam
	    PARENT: ["genericPentanought"],
	    LABEL: "Eroder",
	    GUNS: [],
	}
	Class.gripperARDreadV2 = { // crowbar
	    PARENT: ["genericPentanought"],
	    LABEL: "Gripper",
	    GUNS: [],
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
	Class.helixARDreadV2 = { // twister
	    PARENT: ["genericPentanought"],
	    LABEL: "Helix",
	    GUNS: [],
	}
	Class.bombardmentARDreadV2 = { // artillery
	    PARENT: ["genericPentanought"],
	    LABEL: "Bombardment",
	    GUNS: [],
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
	Class.bruiserARDreadV2 = { // honcho
	    PARENT: ["genericPentanought"],
	    LABEL: "Bruiser",
	    GUNS: [],
	}
	Class.incapacitatorARDreadV2 = { // swarms
	    PARENT: ["genericPentanought"],
	    LABEL: "Incapacitator",
	    GUNS: [],
	}
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
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pound, g.fast]),
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
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pound, g.fast]),
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
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.twin, g.pound, g.fast]),
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
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.morespeed, {health: 2}]),
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
	Class.hielamanARDreadV2 = { // aura-traps
	    PARENT: ["genericPentanought"],
	    LABEL: "Hielaman",
	    GUNS: [],
	}
	Class.jackhammerARDreadV2 = { // trap + gun
	    PARENT: ["genericPentanought"],
	    LABEL: "Jackhammer",
	    GUNS: [],
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
			{
				POSITION: [9, 0, 0, 0, 360, 1],
				TYPE: "pentanoughtBigAura",
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.supernovaARDreadV2.TURRETS.push(
			{
				POSITION: [3.25, 9, 0, 72*i+36, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.cipherARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Cipher",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.cipherARDreadV2.TURRETS.push(
			{
				POSITION: [3.25, 9, 0, 72*i+36, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.cipherARDreadV2.TURRETS.push(
		{
			POSITION: [11.5, 0, 0, 0, 360, 1],
			TYPE: "megabyteTurretARDreadV2",
		},
	)
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
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.interstellarARDreadV2.TURRETS.push(
			{
				POSITION: [3.25, 9, 0, 72*i+36, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
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
	Class.malwareARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Malware",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	Class.pentanoughtSmallAura = addAura(1, 1.6, 0.15);
	for (let i = 0; i < 5; i++) {
		Class.malwareARDreadV2.TURRETS.push(
			{
				POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
				TYPE: "pentanoughtSmallAura",
			},
		)
	}
	Class.malwareARDreadV2.TURRETS.push(
		{
			POSITION: [11.5, 0, 0, 0, 360, 1],
			TYPE: "megabyteTurretARDreadV2",
		},
	)
	Class.pentanoughtSmallHealAura = addAura(-2/3, 1.6, 0.15);
	Class.softwareARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Software",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.softwareARDreadV2.TURRETS.push(
			{
				POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
				TYPE: "pentanoughtSmallHealAura",
			},
		)
	}
	Class.softwareARDreadV2.TURRETS.push(
		{
			POSITION: [11.5, 0, 0, 0, 360, 1],
			TYPE: "megabyteTurretARDreadV2",
		},
	)
	Class.roasterARDreadV2 = { // Flamethrower
	    PARENT: ["genericPentanought"],
	    LABEL: "Roaster",
	    TURRETS: [],
	}
	Class.monsoonARDreadV2 = { // Drones
	    PARENT: ["genericPentanought"],
	    LABEL: "Monsoon",
	    TURRETS: [],
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
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "pentanoughtBigHealAura",
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.stratosphereARDreadV2.TURRETS.push(
			{
				POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
				TYPE: "pentanoughtSmallHealAura",
			},
		)
	}
	Class.behemothARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Behemoth",
		BODY: {
			HEALTH: 4,
			SHIELD: 4,
			REGEN: 2.5,
			SPEED: 0.4,
		},
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {COLOR: 9, MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ["pentagon", {COLOR: 9, MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	Class.astronomicARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Astronomic",
		BODY: {
			HEALTH: 3.2,
			SHIELD: 3.2,
			REGEN: 2.5,
			SPEED: 0.5,
		},
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ["pentagon", {COLOR: 9,MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.astronomicARDreadV2.TURRETS.push(
			{
				POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
				TYPE: "pentanoughtSmallAura",
			},
		)
	}
	Class.grandioseARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Grandiose",
		BODY: {
			HEALTH: 3.2,
			SHIELD: 3.2,
			REGEN: 2.5,
			SPEED: 0.5,
		},
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ["pentagon", {COLOR: 9,MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.grandioseARDreadV2.TURRETS.push(
			{
				POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
				TYPE: "pentanoughtSmallHealAura",
			},
		)
	}
	Class.bunkerARDreadV2 = { // HP + auto spam
	    PARENT: ["genericPentanought"],
	    LABEL: "Bunker",
	    TURRETS: [],
	}
	Class.arsenalARDreadV2 = { // HP + big auto
	    PARENT: ["genericPentanought"],
	    LABEL: "Arsenal",
	    TURRETS: [],
	}
	Class.pentagonLeviathanTopARDreadV2 = {
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
		)
	}
	Class.hexagonLeviathanTopARDreadV2 = {
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
	}
	Class.leviathanARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Leviathan",
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: ["pentagonLeviathanTopARDreadV2", {MIRROR_MASTER_ANGLE: true}]
			}
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.leviathanARDreadV2.GUNS.push(
			{
				POSITION: [7, 17, 0.001, 9, 0, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.valrayvnARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Valrayvn",
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.valrayvnARDreadV2.GUNS.push(
			{
				POSITION: [7, 17, 0.001, 9, 0, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.valrayvnARDreadV2.TURRETS.push(
			{
				POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
				TYPE: "pentanoughtSmallAura",
			},
		)
	}
	Class.pegasusARDreadV2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Pegasus",
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.pegasusARDreadV2.GUNS.push(
			{
				POSITION: [7, 17, 0.001, 9, 0, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.pegasusARDreadV2.TURRETS.push(
			{
				POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
				TYPE: "pentanoughtSmallHealAura",
			},
		)
	}
	Class.maceARDreadV2 = { // Speed + auto spam
	    PARENT: ["genericTrinought"],
	    LABEL: "Mace",
	    TURRETS: [],
	}
	Class.missileARDreadV2 = { // Speed + big auto
	    PARENT: ["genericTrinought"],
	    LABEL: "Missile",
	    TURRETS: [],
	}
	Class.battalionARDreadV2 = { // Speed + HP
	    PARENT: ["genericTrinought"],
	    LABEL: "Battalion",
	    TURRETS: [],
	}
	Class.wispARDreadV2 = { // Drifter
	    PARENT: ["genericTrinought"],
	    LABEL: "Wisp",
		GUNS: [],
	    TURRETS: [],
	}
	Class.titaniumARDreadV2 = { // Body damage increase
	    PARENT: ["genericTrinought"],
	    LABEL: "Titanium",
		GUNS: [],
	    TURRETS: [],
	}
	Class.crusherARDreadV2 = { // Size increase
	    PARENT: ["genericTrinought"],
	    LABEL: "Crusher",
	    TURRETS: [],
	}
	Class.mountainARDreadV2 = { // Size increase + auras
	    PARENT: ["genericTrinought"],
	    LABEL: "Mountain",
	    TURRETS: [],
	}
	Class.beastARDreadV2 = { // Size increase + heal auras
	    PARENT: ["genericTrinought"],
	    LABEL: "Beast",
	    TURRETS: [],
	}
	Class.luminanceARDreadV2 = { // Size increase + big aura
	    PARENT: ["genericTrinought"],
	    LABEL: "Luminance",
	    TURRETS: [],
	}
	Class.foundryARDreadV2 = { // Size increase + big heal aura
	    PARENT: ["genericTrinought"],
	    LABEL: "Foundry",
	    TURRETS: [],
	}
	Class.planetoidARDreadV2 = { // Size increase + big auto
	    PARENT: ["genericTrinought"],
	    LABEL: "Planetoid",
	    TURRETS: [],
	}
	Class.finchARDreadV2 = { // Size decrease
	    PARENT: ["genericTrinought"],
	    LABEL: "Finch",
	    TURRETS: [],
	}
    Class.hoarderARDreadV2 = { // Minelayer
	    PARENT: ["genericTrinought"],
	    LABEL: "Hoarder",
	    TURRETS: [],
	}
    Class.trackerARDreadV2 = { // FOV
	    PARENT: ["genericTrinought"],
	    LABEL: "Tracker",
	    TURRETS: [],
	}

	Class.tanks.UPGRADES_TIER_0.push("dreadARDreadV2");
		Class.dreadARDreadV2.UPGRADES_TIER_1 = ["swordARDreadV2", "pacifierARDreadV2", "peacekeeperARDreadV2", "invaderARDreadV2", "centaurARDreadV2"];

			// Weapons
			Class.swordARDreadV2.UPGRADES_TIER_M1 = ["gladiusARDreadV2", "sabreARDreadV2", "slingARDreadV2", "catapultARDreadV2", "dartARDreadV2"];
				Class.gladiusARDreadV2.UPGRADES_TIER_M1 = ["bladeARDreadV2"];
					Class.bladeARDreadV2.UPGRADES_TIER_M1 = ["rapierARDreadV2"];
				Class.sabreARDreadV2.UPGRADES_TIER_M1 = ["bayonetARDreadV2"];
					Class.bayonetARDreadV2.UPGRADES_TIER_M1 = ["javelinARDreadV2"];
				Class.slingARDreadV2.UPGRADES_TIER_M1 = ["atlatlARDreadV2"];
					Class.atlatlARDreadV2.UPGRADES_TIER_M1 = ["woomeraARDreadV2"];
				Class.catapultARDreadV2.UPGRADES_TIER_M1 = ["ballistaARDreadV2"];
					Class.ballistaARDreadV2.UPGRADES_TIER_M1 = ["trebuchetARDreadV2"];
				Class.dartARDreadV2.UPGRADES_TIER_M1 = ["barbARDreadV2"];
					Class.barbARDreadV2.UPGRADES_TIER_M1 = ["boltARDreadV2"];

			Class.pacifierARDreadV2.UPGRADES_TIER_M1 = ["mediatorARDreadV2", "negotiatorARDreadV2", "melderARDreadV2", "crackerARDreadV2", "grabberARDreadV2"];
				Class.mediatorARDreadV2.UPGRADES_TIER_M1 = ["mitigatorARDreadV2"];
					Class.mitigatorARDreadV2.UPGRADES_TIER_M1 = ["diplomatARDreadV2"];
				Class.negotiatorARDreadV2.UPGRADES_TIER_M1 = ["appeaserARDreadV2"];
					Class.appeaserARDreadV2.UPGRADES_TIER_M1 = ["arbitratorARDreadV2"];
				Class.melderARDreadV2.UPGRADES_TIER_M1 = ["amalgamARDreadV2"];
					Class.amalgamARDreadV2.UPGRADES_TIER_M1 = ["dissolverARDreadV2"];
				Class.crackerARDreadV2.UPGRADES_TIER_M1 = ["breakerARDreadV2"];
					Class.breakerARDreadV2.UPGRADES_TIER_M1 = ["eroderARDreadV2"];
				Class.grabberARDreadV2.UPGRADES_TIER_M1 = ["clasperARDreadV2"];
					Class.clasperARDreadV2.UPGRADES_TIER_M1 = ["gripperARDreadV2"];

			Class.peacekeeperARDreadV2.UPGRADES_TIER_M1 = ["enforcerARDreadV2", "executorARDreadV2", "doserARDreadV2", "swirlARDreadV2", "pelterARDreadV2"];
				Class.enforcerARDreadV2.UPGRADES_TIER_M1 = ["suppressorARDreadV2"];
					Class.suppressorARDreadV2.UPGRADES_TIER_M1 = ["retardantARDreadV2"];
				Class.executorARDreadV2.UPGRADES_TIER_M1 = ["inhibitorARDreadV2"];
					Class.inhibitorARDreadV2.UPGRADES_TIER_M1 = ["tyrantARDreadV2"];
				Class.doserARDreadV2.UPGRADES_TIER_M1 = ["tranquilizerARDreadV2"];
					Class.tranquilizerARDreadV2.UPGRADES_TIER_M1 = ["anesthesiologistARDreadV2"];
				Class.swirlARDreadV2.UPGRADES_TIER_M1 = ["spiralARDreadV2"];
					Class.spiralARDreadV2.UPGRADES_TIER_M1 = ["helixARDreadV2"];
				Class.pelterARDreadV2.UPGRADES_TIER_M1 = ["shellerARDreadV2"];
					Class.shellerARDreadV2.UPGRADES_TIER_M1 = ["bombardmentARDreadV2"];

			Class.invaderARDreadV2.UPGRADES_TIER_M1 = ["inquisitorARDreadV2", "assailantARDreadV2", "radiationARDreadV2", "boxerARDreadV2", "disablerARDreadV2"];
				Class.inquisitorARDreadV2.UPGRADES_TIER_M1 = ["infiltratorARDreadV2"];
					Class.infiltratorARDreadV2.UPGRADES_TIER_M1 = ["raiderARDreadV2"];
				Class.assailantARDreadV2.UPGRADES_TIER_M1 = ["aggressorARDreadV2"];
					Class.aggressorARDreadV2.UPGRADES_TIER_M1 = ["gladiatorARDreadV2"];
				Class.radiationARDreadV2.UPGRADES_TIER_M1 = ["haloARDreadV2"];
					Class.haloARDreadV2.UPGRADES_TIER_M1 = ["starlightARDreadV2"];
				Class.boxerARDreadV2.UPGRADES_TIER_M1 = ["sluggerARDreadV2"];
					Class.sluggerARDreadV2.UPGRADES_TIER_M1 = ["bruiserARDreadV2"];
				Class.disablerARDreadV2.UPGRADES_TIER_M1 = ["debilitatorARDreadV2"];
					Class.debilitatorARDreadV2.UPGRADES_TIER_M1 = ["incapacitatorARDreadV2"];

			Class.centaurARDreadV2.UPGRADES_TIER_M1 = ["daemonARDreadV2", "minotaurARDreadV2", "cleanerARDreadV2", "shadeARDreadV2", "screwdriverARDreadV2"];
				Class.daemonARDreadV2.UPGRADES_TIER_M1 = ["hydraARDreadV2"];
					Class.hydraARDreadV2.UPGRADES_TIER_M1 = ["cerberusARDreadV2"];
				Class.minotaurARDreadV2.UPGRADES_TIER_M1 = ["beelzebubARDreadV2"];
					Class.beelzebubARDreadV2.UPGRADES_TIER_M1 = ["luciferARDreadV2"];
				Class.cleanerARDreadV2.UPGRADES_TIER_M1 = ["sweeperARDreadV2"];
					Class.sweeperARDreadV2.UPGRADES_TIER_M1 = ["sterilizerARDreadV2"];
				Class.shadeARDreadV2.UPGRADES_TIER_M1 = ["aegisARDreadV2"];
					Class.aegisARDreadV2.UPGRADES_TIER_M1 = ["hielamanARDreadV2"];
				Class.screwdriverARDreadV2.UPGRADES_TIER_M1 = ["drillARDreadV2"];
					Class.drillARDreadV2.UPGRADES_TIER_M1 = ["jackhammerARDreadV2"];

			// Bodies
			Class.byteARDreadV2.UPGRADES_TIER_M1 = ["automationARDreadV2", "kilobyteARDreadV2", "lighterARDreadV2"];

				Class.automationARDreadV2.UPGRADES_TIER_M1 = ["mechanismARDreadV2", "fusionARDreadV2", "binaryARDreadV2", "exosphereARDreadV2", "burgARDreadV2", "batonARDreadV2"];
					Class.mechanismARDreadV2.UPGRADES_TIER_M1 = ["skynetARDreadV2"];
					Class.fusionARDreadV2.UPGRADES_TIER_M1 = ["supernovaARDreadV2"];
					Class.binaryARDreadV2.UPGRADES_TIER_M1 = ["cipherARDreadV2"];
					Class.exosphereARDreadV2.UPGRADES_TIER_M1 = ["interstellarARDreadV2"];
					Class.burgARDreadV2.UPGRADES_TIER_M1 = ["bunkerARDreadV2"];
					Class.batonARDreadV2.UPGRADES_TIER_M1 = ["maceARDreadV2"];

				Class.kilobyteARDreadV2.UPGRADES_TIER_M1 = ["megabyteARDreadV2", "binaryARDreadV2", "trojanARDreadV2", "hardwareARDreadV2", "siloARDreadV2", "fireworkARDreadV2"];
					Class.megabyteARDreadV2.UPGRADES_TIER_M1 = ["gigabyteARDreadV2"];
					// Class.binaryARDreadV2.UPGRADES_TIER_M1 = ["cipherARDreadV2"];
					Class.trojanARDreadV2.UPGRADES_TIER_M1 = ["malwareARDreadV2"];
					Class.hardwareARDreadV2.UPGRADES_TIER_M1 = ["softwareARDreadV2"];
					Class.siloARDreadV2.UPGRADES_TIER_M1 = ["arsenalARDreadV2"];
					Class.fireworkARDreadV2.UPGRADES_TIER_M1 = ["missileARDreadV2"];

				Class.lighterARDreadV2.UPGRADES_TIER_M1 = ["burnerARDreadV2"];
					Class.burnerARDreadV2.UPGRADES_TIER_M1 = ["roasterARDreadV2"];

			Class.showerARDreadV2.UPGRADES_TIER_M1 = ["stormARDreadV2"];
				Class.stormARDreadV2.UPGRADES_TIER_M1 = ["tempestARDreadV2"];
					Class.tempestARDreadV2.UPGRADES_TIER_M1 = ["monsoonARDreadV2"];

			Class.atmosphereARDreadV2.UPGRADES_TIER_M1 = ["coronaARDreadV2", "thermosphereARDreadV2"];

				Class.coronaARDreadV2.UPGRADES_TIER_M1 = ["chromosphereARDreadV2", "fusionARDreadV2", "trojanARDreadV2", "planetARDreadV2", "sirenARDreadV2", "towerARDreadV2"];
					Class.chromosphereARDreadV2.UPGRADES_TIER_M1 = ["photosphereARDreadV2"];
					// Class.fusionARDreadV2.UPGRADES_TIER_M1 = ["supernovaARDreadV2"];
					// Class.trojanARDreadV2.UPGRADES_TIER_M1 = ["malwareARDreadV2"];
					Class.planetARDreadV2.UPGRADES_TIER_M1 = ["astronomicARDreadV2"];
					Class.sirenARDreadV2.UPGRADES_TIER_M1 = ["valrayvnARDreadV2"];
					Class.towerARDreadV2.UPGRADES_TIER_M1 = ["mountainARDreadV2"];

				Class.thermosphereARDreadV2.UPGRADES_TIER_M1 = ["mesosphereARDreadV2", "exosphereARDreadV2", "hardwareARDreadV2", "moonARDreadV2", "harpyARDreadV2", "creatureARDreadV2"];
					Class.mesosphereARDreadV2.UPGRADES_TIER_M1 = ["stratosphereARDreadV2"];
					// Class.exosphereARDreadV2.UPGRADES_TIER_M1 = ["interstellarARDreadV2"];
					// Class.hardwareARDreadV2.UPGRADES_TIER_M1 = ["softwareARDreadV2"];
					Class.moonARDreadV2.UPGRADES_TIER_M1 = ["grandioseARDreadV2"];
					Class.harpyARDreadV2.UPGRADES_TIER_M1 = ["pegasusARDreadV2"];
					Class.creatureARDreadV2.UPGRADES_TIER_M1 = ["beastARDreadV2"];

			Class.juggernautARDreadV2.UPGRADES_TIER_M1 = ["jumboARDreadV2", "colossalARDreadV2", "cottonARDreadV2", "ironARDreadV2"];

				Class.jumboARDreadV2.UPGRADES_TIER_M1 = ["goliathARDreadV2", "planetARDreadV2", "moonARDreadV2", "burgARDreadV2", "siloARDreadV2", "armadaARDreadV2"];
					Class.goliathARDreadV2.UPGRADES_TIER_M1 = ["behemothARDreadV2"];
					// Class.planetARDreadV2.UPGRADES_TIER_M1 = ["astronomicARDreadV2"];
					// Class.moonARDreadV2.UPGRADES_TIER_M1 = ["grandioseARDreadV2"];
					// Class.burgARDreadV2.UPGRADES_TIER_M1 = ["bunkerARDreadV2"];
					// Class.siloARDreadV2.UPGRADES_TIER_M1 = ["arsenalARDreadV2"];
					Class.armadaARDreadV2.UPGRADES_TIER_M1 = ["battalionARDreadV2"];

				Class.colossalARDreadV2.UPGRADES_TIER_M1 = ["titanARDreadV2", "sirenARDreadV2", "harpyARDreadV2", "batonARDreadV2", "fireworkARDreadV2", "armadaARDreadV2"];
					Class.titanARDreadV2.UPGRADES_TIER_M1 = ["leviathanARDreadV2"];
					// Class.sirenARDreadV2.UPGRADES_TIER_M1 = ["valrayvnARDreadV2"];
					// Class.harpyARDreadV2.UPGRADES_TIER_M1 = ["pegasusARDreadV2"];
					// Class.batonARDreadV2.UPGRADES_TIER_M1 = ["maceARDreadV2"];
					// Class.fireworkARDreadV2.UPGRADES_TIER_M1 = ["missileARDreadV2"];
					// Class.armadaARDreadV2.UPGRADES_TIER_M1 = ["battalionARDreadV2"];

				Class.cottonARDreadV2.UPGRADES_TIER_M1 = ["featherARDreadV2"];
					Class.featherARDreadV2.UPGRADES_TIER_M1 = ["wispARDreadV2"];

				Class.ironARDreadV2.UPGRADES_TIER_M1 = ["steelARDreadV2"];
					Class.steelARDreadV2.UPGRADES_TIER_M1 = ["titaniumARDreadV2"];
			
			Class.stomperARDreadV2.UPGRADES_TIER_M1 = ["rollerARDreadV2", "owlARDreadV2"];

				Class.rollerARDreadV2.UPGRADES_TIER_M1 = ["flattenerARDreadV2", "towerARDreadV2", "creatureARDreadV2", "spotlightARDreadV2", "furnaceARDreadV2", "asteroidARDreadV2"];
					Class.flattenerARDreadV2.UPGRADES_TIER_M1 = ["crusherARDreadV2"];
					// Class.towerARDreadV2.UPGRADES_TIER_M1 = ["mountainARDreadV2"];
					// Class.creatureARDreadV2.UPGRADES_TIER_M1 = ["beastARDreadV2"];
					Class.spotlightARDreadV2.UPGRADES_TIER_M1 = ["luminanceARDreadV2"];
					Class.furnaceARDreadV2.UPGRADES_TIER_M1 = ["foundryARDreadV2"];
					Class.asteroidARDreadV2.UPGRADES_TIER_M1 = ["planetoidARDreadV2"];

				Class.owlARDreadV2.UPGRADES_TIER_M1 = ["cardinalARDreadV2"];
					Class.cardinalARDreadV2.UPGRADES_TIER_M1 = ["finchARDreadV2"];

			Class.dropperARDreadV2.UPGRADES_TIER_M1 = ["baiterARDreadV2"];
				Class.baiterARDreadV2.UPGRADES_TIER_M1 = ["cagerARDreadV2"];
					Class.cagerARDreadV2.UPGRADES_TIER_M1 = ["hoarderARDreadV2"];

			Class.spotterARDreadV2.UPGRADES_TIER_M1 = ["spyARDreadV2"];
				Class.spyARDreadV2.UPGRADES_TIER_M1 = ["monitorARDreadV2"];
					Class.monitorARDreadV2.UPGRADES_TIER_M1 = ["trackerARDreadV2"];

	const hexDreadNames = {
		Javelin: {
			Javelin: 'Javelin',
			Rapier: 'Lance',
			Diplomat: 'Envoy',
			Arbitrator: 'Cutlass',
			Retardant: 'Rebel',
			Tyrant: 'Autocrat',
			Raider: 'Pirate',
			Gladiator: 'Pillager',
			Cerberus: 'Argonaut',
			Lucifer: 'Kitsune',
		},
		Rapier: {
			Rapier: 'Rapier',
			Diplomat: 'Emissary',
			Arbitrator: 'Umpire',
			Retardant: 'Impeder',
			Tyrant: 'Oppressor',
			Raider: 'Bandit',
			Gladiator: 'Bruiser',
			Cerberus: 'Cyclops',
			Lucifer: 'Damocles',
		},
		Diplomat: {
			Diplomat: 'Diplomat',
			Arbitrator: 'Moderator',
			Retardant: 'Insurgent',
			Tyrant: 'Dictator',
			Raider: 'Marauder',
			Gladiator: 'Champion',
			Cerberus: 'Orion',
			Lucifer: 'Manticore',
		},
		Arbitrator: {
			Arbitrator: 'Arbitrator',
			Retardant: 'Extinguisher',
			Tyrant: 'Shogun',
			Raider: 'Buccaneer',
			Gladiator: 'Warrior',
			Cerberus: 'Gorgon',
			Lucifer: 'Keres',
		},
		Retardant: {
			Retardant: 'Retardant',
			Tyrant: 'Anarchist',
			Raider: 'Freebooter',
			Gladiator: 'Combatant',
			Cerberus: 'Gigantes',
			Lucifer: 'Demogorgon',
		},
		Tyrant: {
			Tyrant: 'Tyrant',
			Raider: 'Corsair',
			Gladiator: 'Amazon',
			Cerberus: 'Ouroboros',
			Lucifer: 'Raiju',
		},
		Raider: {
			Raider: 'Raider',
			Gladiator: 'Filibuster',
			Cerberus: 'Wyvern',
			Lucifer: 'Kraken',
		},
		Gladiator: {
			Gladiator: 'Gladiator',
			Cerberus: 'Ogre',
			Lucifer: 'Wendigo',
		},
		Cerberus: {
			Cerberus: 'Cerberus',
			Lucifer: 'Oni',
		},
		Lucifer: {
			Lucifer: 'Lucifer',
		},
	};

	const hexnoughtScaleFactor = 0.9;
	function mergeHexnoughtV2(weapon1, weapon2, body) {
		weapon1 = ensureIsClass(Class, weapon1);
		weapon2 = ensureIsClass(Class, weapon2);
		body = ensureIsClass(Class, body);

		let PARENT = Class.genericHexnought,
			BODY = JSON.parse(JSON.stringify(PARENT.BODY)),
			GUNS = [],
			gunsOnOneSide = [],
			weapon2GunsOnOneSide = [],
			TURRETS = [],
			bodyLabel = body.LABEL;

		// Label
		let name1 = hexDreadNames[weapon1.LABEL][weapon2.LABEL],
			name2 = hexDreadNames[weapon2.LABEL][weapon1.LABEL],
			weaponName = "",
			orientationId = 0;
		if(name1) {
			weaponName = name1;
		} else {
			weaponName = name2,
			orientationId = 1;
		}
		let LABEL = weaponName + "-" + bodyLabel,
			className = weaponName.toLowerCase() + orientationId + bodyLabel.toLowerCase() + "ARDreadV2";
		
		// Guns ----------------------
		if (body.GUNS) gunsOnOneSide.push(...JSON.parse(JSON.stringify(body.GUNS.slice(0, body.GUNS.length / 5 * 2))));
		for (let g in gunsOnOneSide) {
			gunsOnOneSide[g].POSITION[5] *= 5 / 6;
			gunsOnOneSide[g].POSITION[1] *= hexnoughtScaleFactor;
		}
		if (weapon1.GUNS) gunsOnOneSide.push(...JSON.parse(JSON.stringify(weapon1.GUNS.slice(0, weapon1.GUNS.length / 5))));
		if (weapon2.GUNS) weapon2GunsOnOneSide = JSON.parse(JSON.stringify(weapon2.GUNS.slice(0, weapon2.GUNS.length / 5)));

		for (let g in weapon2GunsOnOneSide) weapon2GunsOnOneSide[g].POSITION[5] += 60;
		gunsOnOneSide.push(...weapon2GunsOnOneSide)

		// Scale to fit size constraints
		for (let g in gunsOnOneSide) {
			gunsOnOneSide[g].POSITION[1] *= hexnoughtScaleFactor ** 2;
			gunsOnOneSide[g].POSITION[4] *= hexnoughtScaleFactor ** 2;
		}

		for (let i = 0; i < 3; i++) {
			for (let g in gunsOnOneSide) {
				let gun = JSON.parse(JSON.stringify(gunsOnOneSide[g]));
				gun.POSITION[5] += 120 * i;
				GUNS.push(gun);
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
		
		// Turrets --------------------
		let turretRingLoopLength = Math.floor(body.TURRETS.length / 5);
  
    	// Turret adding
		for (let t = 0; t < body.TURRETS.length; t++) {
			let turret = body.TURRETS[t];
			if (turret.TYPE[0].indexOf('pentagon') >= 0) { // Replace pentagons with hexagons
				TURRETS.push(
					{
						POSITION: [turret.POSITION[0], 0, 0, 0, 0, turret.POSITION[5]],
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
		if (weapon1.BODY) for (let m in weapon1.BODY) BODY[m] *= weapon1.BODY[m];
		if (weapon2.BODY) for (let m in weapon2.BODY) BODY[m] *= weapon2.BODY[m];
		if (body.BODY) for (let m in body.BODY) BODY[m] *= body.BODY[m];

		// Smash it together
		Class[className] = {
			PARENT, BODY, LABEL, GUNS, TURRETS,
		};
		return className;
	}

	// Merge function
	let mergedDreads = [];
	const pentanoughtWeapons = ["rapierARDreadV2", "javelinARDreadV2", "diplomatARDreadV2", "arbitratorARDreadV2", "retardantARDreadV2", "tyrantARDreadV2", "raiderARDreadV2", "gladiatorARDreadV2", "cerberusARDreadV2", "luciferARDreadV2"];

	function mergeDreadv2(weapon, body) {
		let className = weapon.split("_")[0] + body;

		weapon = ensureIsClass(Class, weapon);
		body = ensureIsClass(Class, body);

		let PARENT = ensureIsClass(Class, weapon.PARENT[0]),
			BODY = JSON.parse(JSON.stringify(PARENT.BODY)),
			GUNS = [],
			TURRETS = [],
			LABEL = weapon.LABEL + "-" + body.LABEL,
			UPGRADES_TIER_0 = [];
		
		// Guns
		if (body.GUNS) GUNS.push(...body.GUNS);
		if (weapon.GUNS) GUNS.push(...weapon.GUNS);
		
		// Turrets
		TURRETS.push(...body.TURRETS);
		
		// Body stat modification
		if (weapon.BODY) for (let m in weapon.BODY) BODY[m] *= weapon.BODY[m];
		if (body.BODY) for (let m in body.BODY) BODY[m] *= body.BODY[m];

		// Upgrades
		for (let w in weapon.UPGRADES_TIER_M1) {
			for (let b in body.UPGRADES_TIER_M1) {
				let weaponName = weapon.UPGRADES_TIER_M1[w],
					bodyName = body.UPGRADES_TIER_M1[b];

				if (!mergedDreads.includes(weaponName + bodyName))
					mergeDreadv2(weaponName, bodyName);
				
				UPGRADES_TIER_0.push(weaponName.split("_")[0] + bodyName);
			}
		}

		// Hexnought building
		if (weapon.PARENT[0] == "genericPentanought" && buildHexnoughts) {
			for (let i in pentanoughtWeapons) {
				UPGRADES_TIER_0.push(mergeHexnoughtV2(weapon, ensureIsClass(Class, pentanoughtWeapons[i]), body));
			}
		}

		// Can he build it? Yes he can!
		Class[className] = {
			PARENT, BODY, LABEL, GUNS, TURRETS, UPGRADES_TIER_0,
		};
	}

	// Initiate build for all dread paths and do upgrades for all eggnoughts
	for (let w in eggnoughtWeapons) {
		let weaponName = eggnoughtWeapons[w];
		Class[weaponName].UPGRADES_TIER_1 = [];
		for (let b in eggnoughtBodies) {
			let bodyName = eggnoughtBodies[b];
			mergeDreadv2(weaponName, bodyName);
			Class[weaponName].UPGRADES_TIER_1.push(weaponName.split("_")[0] + bodyName);
		}
	}
};
