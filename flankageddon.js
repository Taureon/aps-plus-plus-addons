const { combineStats, makeMulti } = require('../facilitators.js');
const { base, gunCalcNames, statnames, smshskl } = require('../constants.js');
const tanks = require('../groups/tanks.js');
const g = require('../gunvals.js');

module.exports = ({ Class }) => {

// t2 tris
Class.znpSniper3 = makeMulti(Class.sniper, 3, "Ringer");
Class.znpSniper3.UPGRADES_TIER_3 = ["znpAssassin3", "znpHunter3", "znpMinigun3", "znpRifle3", "znpSniper6"];
Class.flankGuard.UPGRADES_TIER_2.push("znpSniper3");
Class.sniper.UPGRADES_TIER_2.push("znpSniper3");

Class.znpMachineGun3 = makeMulti(Class.machineGun, 3, "Yoke");
Class.znpMachineGun3.UPGRADES_TIER_3 = ["znpArtillery3", "znpMinigun3", "cyclone", "znpSprayer3", "znpMachineGun6"];
Class.flankGuard.UPGRADES_TIER_2.push("znpMachineGun3");
Class.machineGun.UPGRADES_TIER_2.push("znpMachineGun3");

Class.znpPounder3 = makeMulti(Class.pounder, 3, "Smacker");
Class.znpPounder3.UPGRADES_TIER_3 = ["znpDestroyer3", "architect", "znpArtillery3", "znpLauncher3", "znpPounder6"];
Class.flankGuard.UPGRADES_TIER_2.push("znpPounder3");
Class.pounder.UPGRADES_TIER_2.push("znpPounder3");

Class.triTrapper.UPGRADES_TIER_3.push("znpTrapGuard3");
Class.hexaTank.UPGRADES_TIER_3.push("znpTrapGuard3");

// t3 tris
Class.znpAssassin3 = makeMulti(Class.assassin, 3, "Cateran");
Class.assassin.UPGRADES_TIER_3.push("znpAssassin3");

Class.znpHunter3 = makeMulti(Class.hunter, 3, "Faucile");
Class.hunter.UPGRADES_TIER_3.push("znpHunter3");

Class.znpRifle3 = makeMulti(Class.rifle, 3, "Carbine");
Class.rifle.UPGRADES_TIER_3.push("znpRifle3");

Class.znpMinigun3 = makeMulti(Class.minigun, 3, "Contender");
Class.minigun.UPGRADES_TIER_3.push("znpMinigun3");

Class.znpSprayer3 = makeMulti(Class.sprayer, 3, "Watchcat");
Class.sprayer.UPGRADES_TIER_3.push("znpSprayer3");

Class.znpSpawner2 = makeMulti(Class.spawner, 2, "Captain", 90);
Class.spawner.UPGRADES_TIER_3.push("znpSpawner2");
Class.overseer.UPGRADES_TIER_3.push("battleship", "necromancer", "znpSpawner2");

Class.znpDestroyer3 = makeMulti(Class.destroyer, 3, "Whammer");
Class.destroyer.UPGRADES_TIER_3.push("znpDestroyer3");

Class.znpArtillery3 = makeMulti(Class.artillery, 3, "Howitzer");
Class.artillery.UPGRADES_TIER_3.push("znpArtillery3");

Class.znpLauncher3 = makeMulti(Class.launcher, 3, "Catalyst");
Class.launcher.UPGRADES_TIER_3.push("znpLauncher3");

Class.znpTrapGuard3 = makeMulti(Class.trapGuard, 3, "Hexidecimator");
Class.trapGuard.UPGRADES_TIER_3.push("znpTrapGuard3");

// hexas
Class.znpSniper6 = makeMulti(Class.sniper, 6, "Winger");
Class.hexaTank.UPGRADES_TIER_3.push("znpSniper6");

Class.znpMachineGun6 = makeMulti(Class.machineGun, 6, "Machinist");
Class.hexaTank.UPGRADES_TIER_3.push("znpMachineGun6");

Class.znpPounder6 = makeMulti(Class.pounder, 6, "Death Star");
Class.hexaTank.UPGRADES_TIER_3.push("znpPounder6");

};
