const { makeAuto } = require('../facilitators.js')
const tanks = require('../groups/tanks.js')

Class.znp_autoBasic = makeAuto('basic')
    Class.znp_autoTwin = makeAuto('twin')
        Class.znp_autoTripleShot = makeAuto('tripleShot')
    Class.znp_autoSniper = makeAuto('sniper')
        Class.znp_autoHunter = makeAuto('hunter')
        Class.znp_autoRifle = makeAuto('rifle')
    Class.znp_autoMachineGun = makeAuto('machineGun')
        Class.znp_autoMinigun = makeAuto('minigun')
        Class.znp_autoSprayer = makeAuto('sprayer')
    Class.znp_autoFlankGuard = makeAuto('flankGuard')
        Class.znp_autoHexaTank = makeAuto('hexaTank')
        Class.znp_autoAuto3 = makeAuto('auto3')
    Class.znp_autoDirector = makeAuto('director')
        Class.znp_autoUnderseer = makeAuto('underseer')
    Class.znp_autoPounder = makeAuto('pounder')
        Class.znp_autoDestroyer = makeAuto('destroyer')
        Class.znp_autoArtillery = makeAuto('artillery')
        Class.znp_autoLauncher = makeAuto('launcher')
    Class.znp_autoTrapper = makeAuto('trapper')
        Class.znp_autoTrapGuard = makeAuto('trapGuard')
    Class.znp_autoDesmos = makeAuto('desmos')
        Class.znp_autoHelix = makeAuto('helix')
        Class.znp_autoVolute = makeAuto('volute')

Class.basic.UPGRADES_TIER_1.push("znp_autoBasic")
    Class.twin.UPGRADES_TIER_2.push("znp_autoTwin")
        Class.tripleShot.UPGRADES_TIER_3.push("znp_autoTripleShot")
        Class.znp_autoTwin.UPGRADES_TIER_3 = ["autoDouble", "znp_autoTripleShot", "autoGunner", "znp_autoHexaTank", "znp_autoHelix"]
    Class.sniper.UPGRADES_TIER_2.push("znp_autoSniper")
        Class.hunter.UPGRADES_TIER_3.push("znp_autoHunter")
        Class.rifle.UPGRADES_TIER_3.push("znp_autoRifle")
        Class.znp_autoSniper.UPGRADES_TIER_3 = ["autoAssassin", "znp_autoHunter", "znp_autoMinigun", "znp_autoRifle"]
    Class.machineGun.UPGRADES_TIER_2.push("znp_autoMachineGun")
        Class.minigun.UPGRADES_TIER_3.push("znp_autoMinigun")
        Class.sprayer.UPGRADES_TIER_3.push("znp_autoSprayer")
        Class.znp_autoMachineGun.UPGRADES_TIER_3 = ["znp_autoArtillery", "znp_autoMinigun", "autoGunner", "znp_autoSprayer"]
    Class.flankGuard.UPGRADES_TIER_2.push("znp_autoFlankGuard")
        Class.hexaTank.UPGRADES_TIER_3.push("znp_autoHexaTank")
        Class.auto3.UPGRADES_TIER_3.push("znp_autoAuto3")
        Class.znp_autoFlankGuard.UPGRADES_TIER_3 = ["znp_autoHexaTank", "autoTriAngle", "znp_autoAuto3", "znp_autoTrapGuard", "hexaTrapper"]
    Class.director.UPGRADES_TIER_2.push("znp_autoDirector")
        Class.underseer.UPGRADES_TIER_3.push("znp_autoUnderseer")
        Class.znp_autoDirector.UPGRADES_TIER_3 = ["autoOverseer", "autoCruiser", "znp_autoUnderseer", "autoSpawner"]
    Class.pounder.UPGRADES_TIER_2.push("znp_autoPounder")
        Class.destroyer.UPGRADES_TIER_3.push("znp_autoDestroyer")
        Class.artillery.UPGRADES_TIER_3.push("znp_autoArtillery")
        Class.launcher.UPGRADES_TIER_3.push("znp_autoLauncher")
        Class.znp_autoPounder.UPGRADES_TIER_3 = ["znp_autoDestroyer", "autoBuilder", "znp_autoArtillery", "znp_autoLauncher", "znp_autoVolute"]
    Class.trapper.UPGRADES_TIER_2.push("znp_autoTrapper")
        Class.trapGuard.UPGRADES_TIER_3.push("znp_autoTrapGuard")
        Class.znp_autoTrapper.UPGRADES_TIER_3 = ["autoBuilder", "hexaTrapper", "znp_autoTrapGuard"]
    Class.desmos.UPGRADES_TIER_2.push("znp_autoDesmos")
        Class.helix.UPGRADES_TIER_3.push("znp_autoHelix")
        Class.volute.UPGRADES_TIER_3.push("znp_autoVolute")
        Class.znp_autoDesmos.UPGRADES_TIER_3 = ["znp_autoVolute", "znp_autoHelix"]
    Class.znp_autoBasic.UPGRADES_TIER_2 = ["znp_autoTwin", "znp_autoSniper", "znp_autoMachineGun", "znp_autoFlankGuard", "znp_autoDirector", "znp_autoPounder", "znp_autoTrapper", "znp_autoDesmos"]
        Class.znp_autoBasic.UPGRADES_TIER_3 = ["autoSmasher"]
