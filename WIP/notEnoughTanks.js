/*
artillery            => mortar                          => sheller
hunter               => pred                            => carniv (no sniper stats on branch)
twin                 => triplet                         => quintuplet
multishot            => minigun                         => streamliner
tri                  => hexa                            => nona
buck(shot)           => shot(gun)                       => boom(stick)
launcher             => skimmer                         => hyperskimmer

machinegun           => gunner                          => machine gunner (2 barrels only for machine gunner)
pound                => destroy                         => anni
sniper               => assassin                        => ranger
trapper              => builder                         => boomer
director             => spawner                         => twinspawner

brid                 => over                            => cap
cruiser              => initiator                       => twiniator
auto                 => twinauto                        => tripletauto
drive                => twindrive                       => tripletdrive

shimmer (slow invis) => hider (0.5 alpha, faster invis) => shadow (0.2 alpha, slow invis)
smasher              => spike                           => thorn
aura                 => sphere                          => bubble
under (+square)      => necro (+triangle)               => lich (+egg)
*/

const { combineStats } = require('../facilitators.js');
const { base, gunCalcNames, statnames } = require('../constants.js');
const g = require('../gunvals.js');

g.plugin_NET_droneToFactory = g.factory.map((x, i) => x * g.babyfactory[i] / g.drone[i]);
g.plugin_NET_basicToDrone = g.drone.map((x, i) => x / g.basic[i]);
g.plugin_NET_basicToTrap = g.trap.map((x, i) => x / g.basic[i]);
g.plugin_NET_weakToOver = g.over.map((x, i) => x / g.weak[i]);

const offsets = Object.fromEntries([
    'artillery' , 'hunter' , 'twin'   , 'multishot', 'tri',
    'machinegun', 'pound'  , 'sniper' , 'trapper'  , 'director',
    'launcher'  , 'brid'   , 'cruiser', 'auto'     , 'drive',
    'shimmer'   , 'smasher', 'aura'   , 'under'    , 'buck'
].map((_, i) => [_, BigInt(i * 4)])),
mainTypeMatrix = [
    ['bullet'   , 'drone'                     , 'minion'                     , 'plugin_NET_twinion'          ],
    ['trap'     , 'plugin_NET_trap_drone'     , 'plugin_NET_trap_minion'     , 'plugin_NET_trap_twinion'     ],
    ['block'    , 'plugin_NET_block_drone'    , 'plugin_NET_block_minion'    , 'plugin_NET_block_twinion'    ],
    ['boomerang', 'plugin_NET_boomerang_drone', 'plugin_NET_boomerang_minion', 'plugin_NET_boomerang_twinion']
],
bridTypeArray = ['bullet', ["drone", { INDEPENDENT: true }], 'drone', 'minion'];

function getKeyFromCode(code) {
    return code.toString(2).split('').reduce((culm, curr, i) => {
        if (i & 1) return culm.concat(curr);
        culm[culm.length - 1] = (culm[culm.length - 1] * 4 + curr).toString(16);
        return culm;
    }, ['NET_']).join('');
}

function makeNameFromCode(code) {
	return getKeyFromCode(code);
}

function getTierFromCode(code) {
	return code.toString(4).split('').reduce((culm, curr) => culm + parseInt(curr), 1);
}

function makeBridGun(angle, bridStats, bridType) {
    return {
        POSITION: [6, 12, 1.2, 8, 0, angle, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: bridStats,
            TYPE: bridType,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,
            MAX_CHILDREN: 3,
        },
    };
}

function makeTankFromCode(code) {
    //artillery  : unfinished
    //hunter     : unfinished
    //twin       : unfinished
    //multishot  : unfinished
    //tri        : finished (?)
    //machinegun : unfinished
    //pound      : unfinished
    //sniper     : unfinished
    //trapper    : finished (?) (incomplete crossover projectiles with 'director')
    //director   : finished (?) (incomplete crossover projectiles with 'trapper')
    //launcher   : unfinished
    //brid       : finished (?) (assuming 'brid' is different)
    //cruiser    : unfinished
    //auto       : unfinished
    //drive      : unfinished (potentially has to affect main projectiles instead of just brid projectiles)
    //shimmer    : unfinished
    //smasher    : unfinished
    //aura       : unfinished
    //under      : unfinished (potentially has to affect projectiles instead of just ramming)
    //buck       : unfinished
    // (?) = i am not sure if it really is that state
    // (..text..) = description, potentially to add context to '(?)'
    let tankCfg = {}, GUNS = [], TURRETS = [];
    for (let key in offsets) {
    	tankCfg[key] = (code >> offsets[key]) & 3n;
    }

    let gunCount = Math.max(1, tankCfg.tri * 3);

    let mainStats = [g.basic],
        mainType = mainTypeMatrix[tankCfg.director][tankCfg.trapper]; // TODO: add 'launcher' variations
    if (tankCfg.director) {
        mainStats.push(g.plugin_NET_basicToDrone);
        if (tankCfg.director > 1) {
            mainStats.push(g.plugin_NET_droneToFactory);
        }
    }
    if (tankCfg.trapper) {
        mainStats.push(g.plugin_NET_basicToTrap);
        if (tankCfg.trapper > 1) {
            mainStats.push(g.block);
            if (tankCfg.trapper > 2) {
                mainStats.push(g.boomerang);
            }
        }
    }
    mainStats = combineStats(mainStats.concat(Array(tankCfg.tri).fill(g.flank)));
    // TODO: add 'twin' to mainStats
	// TODO: add 'machinegun' to mainStats
	// TODO: add 'pound' to mainStats
	// TODO: add 'sniper' to mainStats

    if (tankCfg.brid) {
        let bridStats = [g.weak],
            bridType = bridTypeArray[tankCfg.brid]
       // , width = figureOut,
       // , length = figureOut,
       // , aspect = figureOut
        	;
        if (tankCfg.brid > 1) {
            bridStats.push(g.plugin_NET_weakToOver);
            if (tankCfg.brid > 2) {
                bridStats.push(g.plugin_NET_droneToFactory);
            }
        }
        bridStats = combineStats(mainStats.concat(bridStats));
        for (let i = 0; i < gunCount; i++) {
            let angle = 180 + 360 * i / gunCount;
            if (tankCfg.brid == 1) {
                GUNS.push(makeBridGun(angle, bridStats, bridType));
            } else {
                GUNS.push(makeBridGun(angle + 55, bridStats, bridType), makeBridGun(angle - 55, bridStats, bridType));
            }
        }
    }

    for (let i = 0; i < gunCount; i++) {
        let angle = 360 * i / gunCount
       // , width = figureOut,
       // , length = figureOut,
       // , aspect = figureOut
        	;

        // TODO: add 'artillery' side guns

        // TODO: add 'cruiser' side guns

        // TODO- add 'twin' loop
	        // TODO: add 'multishot' loop
		        // TODO: add 'hunter' loop
		        	// TODO: add 'launcher' decoration
		        	// TODO: add 'trapper' decoration

	        		// TODO: if 'buck', instead of a single gun, add more smaller guns with the big one being decorative
			        GUNS.push({
			            POSITION: [16, 8, 1, 0, 0, angle, 0.1],
			            PROPERTIES: {
			                SHOOT_SETTINGS: mainStats,
			                TYPE: mainType
			            }
			        });
		        // close 'hunter' loop
			// close 'multishot' loop
		// close 'twin' loop

	    // TODO: add 'buck' decoration
    }

    // TODO: add 'auto' turret
	// TODO: add 'aura' turret
	// TODO: add 'smasher' turrets and effects
	// TODO: add 'shimmer' effects

    let upgradesListKey = 'UPGRADES_TIER_' + getTierFromCode(code);
    return {
        PARENT: 'genericTank',
        LABEL: getNameFromCode(code),
        GUNS, TURRETS,
        upgradesListKey,
        [upgradesListKey]: []
    }
}

function makeTankTreeRecursively(Class, code, maxTier) {
	let key = getKeyFromCode(code);
	if (!(key in Class)) {
		Class[key] = makeTankFromCode(code);
		if (getTierFromCode(code) < maxTier) {
		    for (let offset of offsets) {
		    	Class[key][Class[key].upgradesListKey].push(makeTankTreeRecursively(Class, code + (1n << offset), maxTier));
		    }
		}
	}
	return key;
}

module.exports = ({ Class, Events, Config }) => {
    let maxTier = Config.NOT_ENOUGH_TANKS_MAX_UPGRADE_TIER ?? Config.MAX_UPGRADE_TIER ?? 4;
    Config.NOT_ENOUGH_TANKS_MAX_UPGRADE_TIER = Math.max(Config.NOT_ENOUGH_TANKS_MAX_UPGRADE_TIER, Config.MAX_UPGRADE_TIER);
    Class.plugin_NET_twinion = {
        PARENT: 'minion',
        LABEL: "Twinion",
        GUNS: [{
            POSITION: [17, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.twin]),
                WAIT_TO_CYCLE: true, TYPE: "bullet"
            }
        },{
            POSITION: [17, 8, 1, 0,-5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.twin]),
                WAIT_TO_CYCLE: true, TYPE: "bullet"
            }
        }]
    };

    // TODO: add an indicator for how many tanks will be added
    console.log(`maxTier: ${maxTier}\nWARNING: large maxTier leads to exponentially longer loading times!\ngenerating tanks now...`);

	// for now, they are just stronger versions
	// i wonder what else could be added though, especially boomerang
    Class.plugin_NET_trap_drone        = { PARENT: 'drone'             , LABEL: "Trap Drone"       , SHAPE: -3 };
    Class.plugin_NET_trap_minion       = { PARENT: 'minion'            , LABEL: "Trap Minion"      , SHAPE: -3 };
    Class.plugin_NET_trap_twinion      = { PARENT: 'plugin_NET_twinion', LABEL: "Trap Twinion"     , SHAPE: -3 };
    Class.plugin_NET_block_drone       = { PARENT: 'drone'             , LABEL: "Block Drone"      , SHAPE: -4 };
    Class.plugin_NET_block_minion      = { PARENT: 'minion'            , LABEL: "Block Minion"     , SHAPE: -4 };
    Class.plugin_NET_block_twinion     = { PARENT: 'plugin_NET_twinion', LABEL: "Block Twinion"    , SHAPE: -4 };
    Class.plugin_NET_boomerang_drone   = { PARENT: 'drone'             , LABEL: "Boomerang Drone"  , SHAPE: -5 };
    Class.plugin_NET_boomerang_minion  = { PARENT: 'minion'            , LABEL: "Boomerang Minion" , SHAPE: -5 };
    Class.plugin_NET_boomerang_twinion = { PARENT: 'plugin_NET_twinion', LABEL: "Boomerang Twinion", SHAPE: -5 };
    // TODO: add 'launcher' variations

    //fuck it, recursion because why not
    let start = Date.now();
    Config.SPAWN_CLASS = makeTankTreeRecursively(Class, 0n, maxTier);

    console.log(`time taken: ${(Date.now() - start) / 1000} seconds`);
};