const { combineStats, makeAuto, makeCeption } = require('../facilitators.js');
const { base, gunCalcNames, statnames } = require('../constants.js');
const tanks = require('../groups/tanks.js');

Class.znpAutoBasic = makeAuto('basic');
Class.basic.UPGRADES_TIER_1.push("znpAutoBasic");
    Class.znpAutoBasic.UPGRADES_TIER_2 = ["znpAutoTwin", "znpAutoSniper", "znpAutoMachineGun", "znpAutoFlankGuard", "znpAutoDirector", "znpAutoPounder", "znpAutoTrapper", "znpAutoDesmos", "znpCeptBasic"];
    Class.znpAutoBasic.UPGRADES_TIER_3 = ["autoSmasher"];

Class.znpAutoTwin = makeAuto('twin');
Class.twin.UPGRADES_TIER_2.push("znpAutoTwin");
    Class.znpAutoTwin.UPGRADES_TIER_3 = ["autoDouble", "znpAutoTripleShot", "autoGunner", "znpAutoHexaTank", "znpAutoHelix", "znpCeptTwin"];

Class.znpAutoSniper = makeAuto('sniper');
Class.sniper.UPGRADES_TIER_2.push("znpAutoSniper");
    Class.znpAutoSniper.UPGRADES_TIER_3 = ["autoAssassin", "znpAutoHunter", "znpAutoMinigun", "znpAutoRifle", "znpCeptSniper"];

Class.znpAutoMachineGun = makeAuto('machineGun');
Class.machineGun.UPGRADES_TIER_2.push("znpAutoMachineGun");
    Class.znpAutoMachineGun.UPGRADES_TIER_3 = ["znpAutoArtillery", "znpAutoMinigun", "autoGunner", "znpAutoSprayer", "znpCeptMachineGun"];

Class.znpAutoFlankGuard = makeAuto('flankGuard');
Class.flankGuard.UPGRADES_TIER_2.push("znpAutoFlankGuard");
    Class.znpAutoFlankGuard.UPGRADES_TIER_3 = ["znpAutoHexaTank", "autoTriAngle", "znpAutoAuto3", "znpAutoTrapGuard", "hexaTrapper", "znpCeptFlankGuard"];

Class.znpAutoDirector = makeAuto('director');
Class.director.UPGRADES_TIER_2.push("znpAutoDirector");
    Class.znpAutoDirector.UPGRADES_TIER_3 = ["autoOverseer", "autoCruiser", "znpAutoUnderseer", "autoSpawner", "znpCeptDirector"];

Class.znpAutoPounder = makeAuto('pounder');
Class.pounder.UPGRADES_TIER_2.push("znpAutoPounder");
    Class.znpAutoPounder.UPGRADES_TIER_3 = ["znpAutoDestroyer", "autoBuilder", "znpAutoArtillery", "znpAutoLauncher", "znpAutoVolute", "znpCeptPounder"];

Class.znpAutoTrapper = makeAuto('trapper');
Class.trapper.UPGRADES_TIER_2.push("znpAutoTrapper");
    Class.znpAutoTrapper.UPGRADES_TIER_3 = ["autoBuilder", "hexaTrapper", "znpAutoTrapGuard", "znpCeptTrapper"];

Class.znpAutoDesmos = makeAuto('desmos');
Class.desmos.UPGRADES_TIER_2.push("znpAutoDesmos");
    Class.znpAutoDesmos.UPGRADES_TIER_3 = ["znpAutoVolute", "znpAutoHelix", "znpCeptDesmos"];

Class.znpAutoTripleShot = makeAuto(Class.tripleShot);
Class.tripleShot.UPGRADES_TIER_3.push("znpAutoTripleShot");

Class.znpAutoHunter = makeAuto(Class.hunter);
Class.hunter.UPGRADES_TIER_3.push("znpAutoHunter");

Class.znpAutoRifle = makeAuto(Class.rifle);
Class.rifle.UPGRADES_TIER_3.push("znpAutoRifle");

Class.znpAutoMinigun = makeAuto(Class.minigun);
Class.minigun.UPGRADES_TIER_3.push("znpAutoMinigun");

Class.znpAutoSprayer = makeAuto(Class.sprayer);
Class.sprayer.UPGRADES_TIER_3.push("znpAutoSprayer");

Class.znpAutoHexaTank = makeAuto(Class.hexaTank);
Class.hexaTank.UPGRADES_TIER_3.push("znpAutoHexaTank");

Class.znpAutoAuto3 = makeAuto(Class.auto3);
Class.auto3.UPGRADES_TIER_3.push("znpAutoAuto3");

Class.znpAutoUnderseer = makeAuto(Class.underseer);
Class.underseer.UPGRADES_TIER_3.push("znpAutoUnderseer");

Class.znpAutoDestroyer = makeAuto(Class.destroyer);
Class.destroyer.UPGRADES_TIER_3.push("znpAutoDestroyer");

Class.znpAutoArtillery = makeAuto(Class.artillery);
Class.artillery.UPGRADES_TIER_3.push("znpAutoArtillery");

Class.znpAutoLauncher = makeAuto(Class.launcher);
Class.launcher.UPGRADES_TIER_3.push("znpAutoLauncher");

Class.znpAutoTrapGuard = makeAuto(Class.trapGuard);
Class.trapGuard.UPGRADES_TIER_3.push("znpAutoTrapGuard");

Class.znpAutoHelix = makeAuto(Class.helix);
Class.helix.UPGRADES_TIER_3.push("znpAutoHelix");

Class.znpAutoVolute = makeAuto(Class.volute);
Class.volute.UPGRADES_TIER_3.push("znpAutoVolute");

Class.znpCeptBasic = makeCeption(Class.basic, "Inception");
    Class.znpCeptBasic.UPGRADES_TIER_3 = ["znpCeptTwin", "znpCeptSniper", "znpCeptMachineGun", "znpCeptFlankGuard", "znpCeptDirector", "znpCeptPounder", "znpCeptTrapper", "znpCeptDesmos", "znpCept2Basic"];

Class.znpCeptTwin = makeCeption(Class.twin, "Twinception")
Class.znpCeptSniper = makeCeption(Class.sniper, "Snipeception")
Class.znpCeptMachineGun = makeCeption(Class.machineGun, "Machineception")
Class.znpCeptFlankGuard = makeCeption(Class.flankGuard, "Flankception")
Class.znpCeptDirector = makeCeption(Class.director, "Direction")
Class.znpCeptPounder = makeCeption(Class.pounder, "Poundception")
Class.znpCeptTrapper = makeCeption(Class.trapper, "Trapception")
Class.znpCeptDesmos = makeCeption(Class.desmos, "Deception")

Class.znpCept2Basic = makeAuto(Class.basic, "Recursion", {
    type: "znpCeptBasic",
    size: 12,
})
