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

/*
These details make everything more understandable:

'code' refers to a BigInt that is split up into pairs of bits,
which makes the BigInt an array of 4 bit integers
it isn't ACTUALLY an array of 4 bit integers,
but we add bitwise operations to act like that it is

'(code >> someShift) & 3n' => gets an integer in that ""array of 4 bit integers""
*/

const { combineStats } = require('../facilitators.js');
const { base, gunCalcNames, statnames } = require('../constants.js');
const g = require('../gunvals.js');
const transformGStats = (from, _, to) => Object.keys(from).map(i => from[i] * _[i] / to[i]);

g.plugin_NET_droneToFactory = transformGStats(g.factory, g.babyfactory, g.drone);
g.plugin_NET_basicToDrone = transformGStats(g.drone, g.blank, g.basic);
g.plugin_NET_basicToTrap = transformGStats(g.trap, g.blank, g.basic);
g.plugin_NET_weakToOver = transformGStats(g.over, g.blank, g.weak);

function makeLauncherAndDriveVersions(item) {
    return [
        [''          ,           '_drive1',           '_drive2',           '_drive3'],
        ['_launcher1', '_launcher1_drive1', '_launcher1_drive2', '_launcher1_drive3'],
        ['_launcher2', '_launcher2_drive1', '_launcher2_drive2', '_launcher2_drive3'],
        ['_launcher3', '_launcher3_drive1', '_launcher3_drive2', '_launcher3_drive3']
    ].map(x => x.map(item + x));
}

const offsets = Object.fromEntries([
    'artillery' , 'hunter' , 'twin'   , 'multishot', 'tri',
    'machinegun', 'pound'  , 'sniper' , 'trapper'  , 'director',
    'launcher'  , 'brid'   , 'cruiser', 'auto'     , 'drive',
    'shimmer'   , 'smasher', 'aura'   , 'under'    , 'buck'
].map((_, i) => [_, BigInt(i * 4)])),
offsetsLength = Object.keys(offsets).length,

// add launcher and drive
mainTypeMatrix = [
    ['bullet'   , 'drone'                     , 'minion'                     , 'plugin_NET_twinion'          ],
    ['trap'     , 'plugin_NET_trap_drone'     , 'plugin_NET_trap_minion'     , 'plugin_NET_trap_twinion'     ],
    ['block'    , 'plugin_NET_block_drone'    , 'plugin_NET_block_minion'    , 'plugin_NET_block_twinion'    ],
    ['boomerang', 'plugin_NET_boomerang_drone', 'plugin_NET_boomerang_minion', 'plugin_NET_boomerang_twinion']
].map(x => x.map(makeLauncherAndDriveVersions)),
bridTypeArray = ['bullet', "plugin_NET_droneIndependent", 'drone', 'minion'].map(makeLauncherAndDriveVersions);

function getTankConfigFromCode(code) {
    let tankConfig = {};
    for (let key in offsets) {
        tankConfig[key] = parseInt((code >> offsets[key]) & 3n);
    }
    return tankConfig;
}

function getKeyFromCode(code) {
    return code.toString(2).split('').reduce((culm, curr, i) => {
        if (i & 1) return culm.concat(curr);
        culm[culm.length - 1] = (culm[culm.length - 1] * 4 + curr).toString(16);
        return culm;
    }, ['NET_']).join('');
}

function getLabelFromCode(code) {
    // optionally, you can parse the code with getTankConfigFromCode(code)
    // and then make a name out of that,
    // but while the tanks themselves havent been tested enough,
    // we simply set the label to the key
	return getKeyFromCode(code);
}

function getTierFromCode(code) {
    let accumulator = 0n,
        shift = BigInt(offsetsLength * 2);
    while (shift) {
        shift -= 2n;
        accumulator += (code >> shift) & 3n;
    }
	return parseInt(accumulator);
}

function makeBridGun(width, length, aspect, angle, stats, type) {
    return [{
        POSITION: [6 + length, 12 + width, 1.2 + aspect / 10, 8, 0, angle, 0],
        PROPERTIES: { SHOOT_SETTINGS: stats, TYPE: type, AUTOFIRE: true, SYNCS_SKILLS: true, STAT_CALCULATOR: gunCalcNames.drone, WAIT_TO_CYCLE: false, MAX_CHILDREN: 3 }
    }]
}

function getAspectFromSlice(totalLength, totalAspect, startX, endX) {
    if (startX < 0 || endX > totalLength) return 1;

    let startWidth, endWidth, positiveAspect;
    if (totalAspect > 0) {
        startWidth = 1;
        endWidth = totalAspect;
        positiveAspect = totalAspect;
    } else {
        startWidth = -totalAspect;
        endWidth = 1;
        positiveAspect = -1 / totalAspect;
    }
    
    let sectionStartWidth = startWidth * (1 + (positiveAspect - 1) * startX / totalLength),
        sectionEndWidth = startWidth * (1 + (positiveAspect - 1) * endX / totalLength);
    return sectionEndWidth / sectionStartWidth;
}

function makeAspectedSpawnerGun(baseBarrelWidth, baseBarrelLength, middleBarrelWidth, middleGapLength, endBarrelLength, aspect = 1, angle = 0, x = 0, y = 0, delay = 0, stats = [g.factory], TYPE = 'minion', MAX_CHILDREN = 4) {
    let middleBarrelLength = baseBarrelLength + middleGapLength;
    let totalLength = middleBarrelLength + endBarrelLength;
    let baseStartWidth, baseEndWidth, middleStartWidth, middleEndWidth;
    if (aspect > 0) {
        baseStartWidth = baseBarrelWidth;
        baseEndWidth = baseBarrelWidth * aspect;
        middleStartWidth = middleBarrelWidth;
        middleEndWidth = middleBarrelWidth * aspect;
    } else {
        baseStartWidth = baseBarrelWidth * aspect * -1;
        baseEndWidth = baseBarrelWidth;
        middleStartWidth = middleBarrelWidth * aspect * -1;
        middleEndWidth = middleBarrelWidth;
    }

    let baseBarrelAspect = getAspectFromSlice(totalLength, aspect, 0, baseBarrelLength);
    let baseBarrelFinal = { POSITION: [baseBarrelLength, baseStartWidth, baseBarrelAspect, x, y, angle, delay] };
    let middleBarrelAspect = getAspectFromSlice(totalLength, aspect, 0, middleBarrelLength);
    let middleBarrelFinal = { POSITION: [middleBarrelLength, middleStartWidth, middleBarrelAspect, x, y, angle, delay] };
    let endBarrelAspect = getAspectFromSlice(totalLength, aspect, middleBarrelLength, totalLength);
    let endBarrelFinal = {
        POSITION: [endBarrelLength, baseStartWidth * middleBarrelAspect, endBarrelAspect, x + middleBarrelLength, y, angle, delay],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([...stats, {size: 1 / middleBarrelAspect}]),
            TYPE, 
            MAX_CHILDREN,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
        }
    };

    return [middleBarrelFinal, endBarrelFinal, baseBarrelFinal];
}

function makeCapGun(width, length, aspect, angle, stats, type) {
    // TODO: update inputted values to match function
    // return makeAspectedSpawnerGun(12 + width, 16 + length, 1 + aspect / 10, angle, stats, type);
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

    let tankCfg = getTankConfigFromCode(code), GUNS = [], TURRETS = [], BODY = {};

    let gunCount = Math.max(1, tankCfg.tri * 3),
        mainWidth = figureOut,
        mainLength = figureOut,
        mainAspect = figureOut;

    let mainStats = [g.basic],
        mainType = mainTypeMatrix[tankCfg.director][tankCfg.trapper][tankCfg.launcher][tankCfg.drive]; // TODO: add 'launcher' variations
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
            bridType = bridTypeArray[tankCfg.brid][tankCfg.launcher][tankCfg.drive],
            bridWidth = figureOut,
            bridLength = figureOut,
            bridAspect = figureOut;
        if (tankCfg.brid > 1) {
            bridStats.push(g.plugin_NET_weakToOver);
            if (tankCfg.brid > 2) {
                bridStats.push(g.plugin_NET_droneToFactory);
            }
        }
        bridStats = combineStats(mainStats.concat(bridStats));
        for (let i = 0; i < gunCount; i++) {
            let angle = 180 + 360 * i / gunCount;
            switch (tankCfg.brid) {
                case 1: GUNS.push(...makeBridGun(bridWidth, bridLength, bridAspect, angle, bridStats, bridType)); break;
                case 2: GUNS.push(...makeBridGun(bridWidth, bridLength, bridAspect, angle + 55, bridStats, bridType), ...makeBridGun(angle - 55, bridStats, bridType)); break;
                case 3: GUNS.push(...makeCapGun(bridWidth, bridLength, bridAspect, angle + 55, bridStats, bridType), ...makeCapGun(angle - 55, bridStats, bridType)); break;
            }
        }
    }

    for (let i = 0; i < gunCount; i++) {
        let angle = 360 * i / gunCount,
            fullWidthHalf = mainWidth * (1 + !!tankCfg.twin) / 2;

        // TODO: add 'artillery' side guns
        if (tankCfg.artillery) {
            if (tankCfg.artillery > 1) {
                if (tankCfg.artillery > 2) {
                    GUNS.push([{
                        POSITION: [9, 3, 1, 0, -(fullWidthHalf + 4), angle - 7, 0.6], PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]), TYPE: "bullet", LABEL: "Secondary" }
                    }, {
                        POSITION: [9, 3, 1, 0, (fullWidthHalf + 4), angle + 7, 0.8], PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]), TYPE: "bullet", LABEL: "Secondary" }
                    }]);
                }
                GUNS.push([{
                    POSITION: [13, 3, 1, 0, -(fullWidthHalf + 2), angle - 7, 0.6], PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]), TYPE: "bullet", LABEL: "Secondary" }
                }, {
                    POSITION: [13, 3, 1, 0, (fullWidthHalf + 2), angle + 7, 0.8], PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]), TYPE: "bullet", LABEL: "Secondary" }
                }]);
            }
            GUNS.push([{
                POSITION: [17, 3, 1, 0, -fullWidthHalf, angle - 7, 0.2], PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]), TYPE: "bullet", LABEL: "Secondary" }
            }, {
                POSITION: [17, 3, 1, 0, fullWidthHalf, angle + 7, 0.4], PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]), TYPE: "bullet", LABEL: "Secondary" }
            }]);
        }
        fullWidthHalf += tankCfg.artillery;

        // TODO: add 'cruiser' side guns
        switch (tankCfg.cruiser) {
            case 1:
                GUNS.push([{
                    POSITION: [7, 8, 0.6, 7, fullWidthHalf + 2, angle + 30, 0.5], PROPERTIES: { SHOOT_SETTINGS: combineStats([g.swarm, g.battleship, g.carrier]), TYPE: "swarm", STAT_CALCULATOR: gunCalcNames.swarm }
                }, {
                    POSITION: [7, 8, 0.6, 7, fullWidthHalf - 2, angle - 30, 0.5], PROPERTIES: { SHOOT_SETTINGS: combineStats([g.swarm, g.battleship, g.carrier]), TYPE: "swarm", STAT_CALCULATOR: gunCalcNames.swarm }
                }]);
                break;
        }

        // TODO- add 'twin' loop
	        // TODO: add 'multishot' loop
		        // TODO: add 'hunter' loop
		        	// TODO: add 'launcher' decoration
		        	// TODO: add 'trapper' decoration

	        		// TODO: if 'buck', instead of a single gun, add more smaller guns with the big one being decorative
			        GUNS.push({ POSITION: [16, 8, 1, 0, 0, angle, 0.1], PROPERTIES: { SHOOT_SETTINGS: mainStats, TYPE: mainType } });
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
        LABEL: getLabelFromCode(code),
        BODY, GUNS, TURRETS,
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
                let upgradeCode = code + (1n << offset);
                if ((upgradeCode >> offset) & 3n) {
		    	    Class[key][Class[key].upgradesListKey].push(makeTankTreeRecursively(Class, upgradeCode, maxTier));
                }
		    }
		}
	}
	return key;
}

module.exports = ({ Events, Config }) => {
    let maxTier = Config.NOT_ENOUGH_TANKS_MAX_UPGRADE_TIER ?? Config.MAX_UPGRADE_TIER ?? 4;
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

    Class.plugin_NET_droneIndependent = { PARENT: "drone", INDEPENDENT: true };

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

    for (let parent of [])
    makeLauncherAndDriveVersions()

    //fuck it, recursion because why not
    let start = Date.now();
    Config.SPAWN_CLASS = makeTankTreeRecursively(Class, 0n, maxTier);

    console.log(`time taken: ${(Date.now() - start) / 1000} seconds`);
};