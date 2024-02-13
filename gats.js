// This addon is disabled by default.
// You can also disable addons by not making them end with '.js'
// If you want to enable, simply make the line below just not run.
// return console.log('[gats.js] Addon disabled by default');

const { combineStats } = require('../facilitators.js');
const { base, statnames, gunCalcNames, dfltskl, smshskl } = require('../constants.js');
const g = {
// Bases
	gun: { reload: 18, recoil: 1.4, shudder: 0.01, damage: 0.75, speed: 9, spray: 15, size: 0.4, range: 0.5 },
        pistol: { reload: 0.8, recoil: 0.1, damage: 0.4, spray: 0.9, size: 0.5, range: 0.8 },
        smg: { reload: 0.15, recoil: 0.1, damage: 0.2, spray: 25, range: 0.4 },
        shotgun: { reload: 2.5, recoil: 0.8, damage: 0.3, spray: 15, size: 0.5 , range: 0.6},
        assault: { reload: 0.25, recoil: 0.2, damage: 0.1, spray: 5, range: 0.6 },
        sniper: { reload: 3, recoil: 1, damage: 0.5, spray: 0.1, speed: 1.7 },
        lmg: { reload: 0.3, recoil: 0.2, damage: 0.1, spray: 10, range: 0.8, },
        bulletCase: { range: 0.2, speed: 0.3, recoil: 0 },
};
Class.gatsBullet = {
	PARENT: ["bullet"],
        COLOR: 'black',
	SHAPE: [
		[1, 1],
		[1, -1],
		[-5, -1],
		[-5, 1],
	],
};
Class.gatsCase = {
	PARENT: ["bullet"],
        COLOR: 'yellow',
	BODY: {
		DAMAGE: 0,
	},
	SHAPE: [
		[1, 1],
		[-1, 1],
		[-1, -5],
		[1, -5],
	],
};
const guns = {
pistol: [
        {
        	POSITION: [0, 3, 1, 8, 17, -90, 0],
        	PROPERTIES: {
        		SHOOT_SETTINGS: combineStats([ g.gun, g.pistol, g.bulletCase ]),
        		TYPE: "gatsCase",
		},
        },
        {
            	POSITION: [13, 1, 1, 11, -8, 0, 0],
	    	PROPERTIES: {
			COLOR: "black",
		},
        },
        {
		POSITION: [13, 3, 1, 11, -8, 0, 0],
		PROPERTIES: {
                	SHOOT_SETTINGS: combineStats([ g.gun, g.pistol ]),
                	TYPE: "gatsBullet",
			COLOR: "black",
		},
        },
        {
            	POSITION: [3, 1, 1, 16, -8, 0, 0],
	    	PROPERTIES: {
			COLOR: "darkGrey",
		},
        },
	],
smg: [
        {
	        POSITION: [25, 3, 1, 0, -7, 0, 0],
		PROPERTIES: {
			COLOR: "grey",
		},
        },
        {
        	POSITION: [29, 0.7, 1, 0, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
			SHOOT_SETTINGS: combineStats([ g.gun, g.smg ]),
        		TYPE: "gatsBullet",
		},
        },
        {
                POSITION: [29, 0.7, 1, 0, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
		},
        },
        {
                POSITION: [17, 3, 1, 0, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
		},
        },
        {
        	POSITION: [0.5, 3, 1, 23, -8.5, 0, 0],
		PROPERTIES: {
			COLOR: "black",
		},
        },
	],
    	shotgun: [
        {
        	POSITION: [0, 1, 1, 30, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
			SHOOT_SETTINGS: combineStats([ g.gun, g.shotgun ]),
                	TYPE: "gatsBullet",
		},
        },
	{
        	POSITION: [0, 1, 1, 30, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
			SHOOT_SETTINGS: combineStats([ g.gun, g.shotgun ]),
                	TYPE: "gatsBullet",
		},
        },
	{
        	POSITION: [0, 1, 1, 30, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
			SHOOT_SETTINGS: combineStats([ g.gun, g.shotgun ]),
                	TYPE: "gatsBullet",
		},
        },
	{
            	POSITION: [0, 1, 1, 30, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
			SHOOT_SETTINGS: combineStats([ g.gun, g.shotgun ]),
                	TYPE: "gatsBullet",
		},
        },
	{
            	POSITION: [0, 1, 1, 30, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
			SHOOT_SETTINGS: combineStats([ g.gun, g.shotgun ]),
                	TYPE: "gatsBullet",
		},
        },
	{
            	POSITION: [0, 1, 1, 30, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
			SHOOT_SETTINGS: combineStats([ g.gun, g.shotgun ]),
                	TYPE: "gatsBullet",
		},
        },
	{
            	POSITION: [0, 1, 1, 30, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
			SHOOT_SETTINGS: combineStats([ g.gun, g.shotgun ]),
                	TYPE: "gatsBullet",
		},
        },
        {
        	POSITION: [6, 3, 1, 16, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
		},
        },
        {
            	POSITION: [30, 1, 1, 0, -7, 0, 0],
			PROPERTIES: {
			COLOR: "grey",
		},
        },
        {
           	POSITION: [11, 3, 1, 0, -7, 0, 0],
			PROPERTIES: {
			COLOR: "black",
		},
        },
	],
assault: [
        {
            	POSITION: [0, 0.7, 1, 7, 14, -90, 0],
            	PROPERTIES: {
                	SHOOT_SETTINGS: combineStats([ g.gun, g.assault, g.bulletCase ]),
                	TYPE: "gatsCase",
		},
        },
        {
            	POSITION: [32, 0.7, 1, 0, -7, 0, 0],
		PROPERTIES: {
				COLOR: "black",
				SHOOT_SETTINGS: combineStats([ g.gun, g.assault ]),
                		TYPE: "gatsBullet",
		},
        },
        {
            	POSITION: [32, 0.7, 1, 0, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
		},
        },
        {
            	POSITION: [25, 3, 1, 0, -7, 0, 0],
		PROPERTIES: {
			COLOR: "orange",
		},
        },
        {
            	POSITION: [7, 3, 1, 12, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
		},
        },
	],
sniper: [
        {
            	POSITION: [25, 2.5, 1, 0, -7, 0, 0],
		PROPERTIES: {
			COLOR: "grey",
		},
        },
        {
            	POSITION: [20, 0.7, 1, 18, -7, 0, 0],
		PROPERTIES: {
			COLOR: "yellow",
			SHOOT_SETTINGS: combineStats([ g.gun, g.sniper ]),
                	TYPE: "gatsBullet",
		},
        },
        {
            	POSITION: [20, 0.7, 1, 18, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
		},
        },
        {
            	POSITION: [2, 0.7, 1, 12, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
		},
        },
	],
lmg: [
        {
            	POSITION: [0, 0.7, 1, -3, -20, 90, 0],
            	PROPERTIES: {
                	SHOOT_SETTINGS: combineStats([ g.gun, g.lmg, g.bulletCase ]),
                	TYPE: "gatsCase",
		},
        },
        {
            	POSITION: [4, 10, 1, 17, -7, 0, 0],
		PROPERTIES: {
			COLOR: "green",
		},
        },
        {
            	POSITION: [40, 0.7, 1, 0, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
		},
        },
        {
            	POSITION: [40, 0.7, 1, 0, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
			SHOOT_SETTINGS: combineStats([ g.gun, g.lmg ]),
                	TYPE: "gatsBullet",
		},
        },
        {
            	POSITION: [0, 3, 1, 28, -4, 0, 0],
		PROPERTIES: {
			COLOR: "black",
		},
        },
        {
            	POSITION: [3, 0, 1, 25, -2.5, 0, 0],
		PROPERTIES: {
			COLOR: "black",
		},
        },
        {
            	POSITION: [25, 2, 1, 0, -7, 0, 0],
		PROPERTIES: {
			COLOR: "darkGrey",
		},
        },
        {
            	POSITION: [20, 2.8, 1, 13, -7, 0, 0],
		PROPERTIES: {
			COLOR: "black",
		},
        },
        {
            	POSITION: [8, 3, 1, 26, -7, 0, 0],
		PROPERTIES: {
			COLOR: "grey",
		},
        },
	],
};
Class.gatsBody = {
    PARENT: "genericTank",
    LABEL: "Gats.io",
    DANGER: 6,
	BODY: {
		FOV: 1.2,
	},
};
Class.gatsPistol = {
    PARENT: "gatsBody",
    LABEL: "Pistol",
    DANGER: 6,
	GUNS: guns.pistol,
};
Class.gatsSMG = {
    PARENT: "gatsBody",
    LABEL: "SMG",
    DANGER: 6,
	GUNS: guns.smg,
};
Class.gatsShotgun = {
    PARENT: "gatsBody",
    LABEL: "Shotgun",
    DANGER: 6,
	GUNS: guns.shotgun,
};
Class.gatsAssault = {
    PARENT: "gatsBody",
    LABEL: "Assault",
    DANGER: 6,
	GUNS: guns.assault,
};
Class.gatsSniper = {
    PARENT: "gatsBody",
    LABEL: "Sniper",
    DANGER: 6,
	GUNS: guns.sniper,
};
Class.gatsLMG = {
    PARENT: "gatsBody",
    LABEL: "LMG",
    DANGER: 6,
	GUNS: guns.lmg,
};

Class.addons.UPGRADES_TIER_0.push("gatsBody");
	Class.gatsBody.UPGRADES_TIER_0 = [ "gatsPistol", "gatsSMG", "gatsShotgun", "gatsAssault", "gatsSniper", "gatsLMG" ];

