const { combineStats, weaponArray, dereference } = require('../../facilitators.js')
const { base, gunCalcNames, statnames } = require('../../constants.js')
const makeMulti = (type, count, name = -1, delayIncrement = 0) => {
    type = ensureIsClass(type);
    let greekNumbers = ',Double ,Triple ,Quad ,Penta ,Hexa ,Septa ,Octo ,Nona ,Deca ,Hendeca ,Dodeca ,Trideca ,Tetradeca ,Pentadeca ,Hexadeca ,Septadeca ,Octadeca ,Nonadeca ,Icosa ,Henicosa ,Doicosa ,Triaicosa ,Tetraicosa ,Pentaicosa ,Hexaicosa ,Septaicosa ,Octoicosa ,Nonaicosa ,Triaconta '.split(','),
        output = dereference(type);
    output.GUNS = weaponArray(type.GUNS, count, delayIncrement)
    output.LABEL = name === -1 ? (greekNumbers[count - 1] || (count + ' ')) + type.LABEL : name;
    return output;
}
Class.ringer = makeMulti("sniper", 3, "Ringer")
	Class.winger = makeMulti("sniper", 6, "Winger")
	Class.cateran = makeMulti("assassin", 3, "Cateran")
	Class.faucile = makeMulti("hunter", 3, "Faucile")
	Class.carbine = makeMulti("rifle", 3, "Carbine")
Class.yoke = makeMulti("machineGun", 3, "Yoke")
	Class.machinist = makeMulti("machineGun", 6, "Machinist")
	Class.contender = makeMulti("minigun", 3, "Contender")
	Class.watchcat = makeMulti("sprayer", 3, "Watchcat")
Class.smacker = makeMulti("pounder", 3, "Smacker")
	Class.deathStar = makeMulti("pounder", 6, "Death Star")
	Class.whammer = makeMulti("destroyer", 3, "Whammer")
	Class.howitzer = makeMulti("artillery", 3, "Howitzer")
	Class.catalyst = makeMulti("launcher", 3, "Catalyst")
Class.hexidecimator = makeMulti("trapGuard", 3, "Hexidecimator")
Class.sniper.UPGRADES_TIER_2.push("ringer")
	Class.ringer.UPGRADES_TIER_3 = ["winger", "cateran", "faucile", "carbine"]
	Class.assassin.UPGRADES_TIER_3.push("cateran")
	Class.hunter.UPGRADES_TIER_3.push("faucile")
	Class.rifle.UPGRADES_TIER_3.push("carbine")
Class.machineGun.UPGRADES_TIER_2.push("yoke")
	Class.yoke.UPGRADES_TIER_3 = ["machinist", "howitzer", "contender", "cyclone", "watchcat"]
	Class.minigun.UPGRADES_TIER_3.push("contender")
	Class.sprayer.UPGRADES_TIER_3.push("watchcat")
// flank guard
	Class.hexaTank.UPGRADES_TIER_3.push("winger", "machinist", "deathStar", "hexidecimator")
Class.pounder.UPGRADES_TIER_2.push("smacker")
	Class.smacker.UPGRADES_TIER_3 = ["deathStar", "whammer", "howitzer", "catalyst"]
	Class.destroyer.UPGRADES_TIER_3.push("whammer")
	Class.artillery.UPGRADES_TIER_3.push("howitzer")
	Class.launcher.UPGRADES_TIER_3.push("catalyst")
// trapper
	Class.triTrapper.UPGRADES_TIER_3.push("hexidecimator")
	Class.trapGuard.UPGRADES_TIER_3.push("hexidecimator")
