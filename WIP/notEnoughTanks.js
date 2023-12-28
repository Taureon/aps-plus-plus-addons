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
].map((_, i) => [_, i * 4]));

function makeNameFromCode(code) {
	return code.split('').reduce((culm, curr, i) => {
		if (i & 1) return culm.concat(curr);
		culm[culm.length - 1] = (culm[culm.length - 1] * 4 + curr).toString(16);
		return culm;
	}, ['NET-']).join('');
}

function makeTankFromCode(code) {
	let tankCfg = {
		artillery:  (code >> offsets.artillery ) & 3n, //
		hunter:     (code >> offsets.hunter    ) & 3n, //
		twin:       (code >> offsets.twin      ) & 3n, //
		multishot:  (code >> offsets.multishot ) & 3n, //
		tri:        (code >> offsets.tri       ) & 3n, //
		machinegun: (code >> offsets.machinegun) & 3n, //
		pound:      (code >> offsets.pound     ) & 3n, //
		sniper:     (code >> offsets.sniper    ) & 3n, //
		trapper:    (code >> offsets.trapper   ) & 3n, //
		director:   (code >> offsets.director  ) & 3n, //
		launcher:   (code >> offsets.launcher  ) & 3n, //
		brid:       (code >> offsets.brid      ) & 3n, //
		cruiser:    (code >> offsets.cruiser   ) & 3n, //
		auto:       (code >> offsets.auto      ) & 3n, //
		drive:      (code >> offsets.drive     ) & 3n, //
		shimmer:    (code >> offsets.shimmer   ) & 3n, //
		smasher:    (code >> offsets.smasher   ) & 3n, //
		aura:       (code >> offsets.aura      ) & 3n, //
		under:      (code >> offsets.under     ) & 3n, //
		buck:       (code >> offsets.buck      ) & 3n, //
	}, GUNS = [], TURRETS = [];

	let mainStats = [g.basic],
    	mainType = [
    		['bullet'   , 'drone'                     , 'minion'                     , 'plugin_NET_twinion'          ],
    		['trap'     , 'plugin_NET_trap_drone'     , 'plugin_NET_trap_minion'     , 'plugin_NET_trap_twinion'     ],
    		['block'    , 'plugin_NET_block_drone'    , 'plugin_NET_block_minion'    , 'plugin_NET_block_twinion'    ],
    		['boomerang', 'plugin_NET_boomerang_drone', 'plugin_NET_boomerang_minion', 'plugin_NET_boomerang_twinion']
    	][tankCfg.director][tankCfg.trapper];
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

	if (tankCfg.brid) {
		let bridStats = [g.weak],
			bridType = ['bullet', ["drone", { INDEPENDENT: true }], 'drone', 'minion'][tankCfg.brid];
		if (tankCfg.brid > 1) {
			bridStats.push(g.plugin_NET_weakToOver);
			if (tankCfg.brid > 2) {
				bridStats.push(g.plugin_NET_droneToFactory);
			}
		}
		bridStats = combineStats(mainStats.concat(bridStats));
		for (let i = 0; i < Math.max(1, tankCfg.tri * 3); i++) {
			let angle = tankCfg.tri ? 180 + 360 * i / tankCfg.tri : 180;
			if (tankCfg.brid == 1) {
				GUNS.push({
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
			    });
			} else {
				GUNS.push({
			        POSITION: [6, 12, 1.2, 8, 0, angle + 55, 0],
			        PROPERTIES: {
			            SHOOT_SETTINGS: bridStats,
			            TYPE: bridType,
			            AUTOFIRE: true,
			            SYNCS_SKILLS: true,
			            STAT_CALCULATOR: gunCalcNames.drone,
			            WAIT_TO_CYCLE: false,
			            MAX_CHILDREN: 3,
			        },
			    },{
			        POSITION: [6, 12, 1.2, 8, 0, angle - 55, 0],
			        PROPERTIES: {
			            SHOOT_SETTINGS: bridStats,
			            TYPE: bridType,
			            AUTOFIRE: true,
			            SYNCS_SKILLS: true,
			            STAT_CALCULATOR: gunCalcNames.drone,
			            WAIT_TO_CYCLE: false,
			            MAX_CHILDREN: 3,
			        },
			    });
			}
		}
	}

	for (let i = 0; i < Math.max(1, tankCfg.tri * 3); i++) {
		let angle = tankCfg.tri ? 360 * i / tankCfg.tri : 0;

		GUNS.push({
            POSITION: [16, 8, 1, 0, 0, angle, 0.1],
            PROPERTIES: {
            	SHOOT_SETTINGS: mainStats,
            	TYPE: mainType
            }
        })
	}

	let upgradesListKey = 'UPGRADES_TIER_' + code.toString(4).split('').reduce((culm, curr) => culm + parseInt(curr), 1);
	return {
		PARENT: 'genericTank',
		LABEL: getNameFromCode(code),
		GUNS, TURRETS,
		upgradesListKey,
		[upgradesListKey]: []
	}
}

module.exports = ({ Class, Events, Config }) => {
	let { MAX_UPGRADE_TIER } = Config;
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
	Class.plugin_NET_trap_drone = { PARENT: 'drone' };
	Class.plugin_NET_trap_minion = { PARENT: 'minion' };
	Class.plugin_NET_trap_twinion = { PARENT: 'twinion' };
	Class.plugin_NET_block_drone = { PARENT: 'drone' };
	Class.plugin_NET_block_minion = { PARENT: 'minion' };
	Class.plugin_NET_block_twinion = { PARENT: 'twinion' };
	Class.plugin_NET_boomerang_drone = { PARENT: 'drone' };
	Class.plugin_NET_boomerang_minion = { PARENT: 'minion' };
	Class.plugin_NET_boomerang_twinion = { PARENT: 'twinion' };
};