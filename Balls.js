const { combineStats } = require('../facilitators.js');
const { base } = require('../constants.js');
const g = require('../gunvals.js');

// This addon is disabled by default.
// Realy simple addon.
// return console.log('[balls.js] Addon disabled by default');

Class.ball_thrower = {
    PARENT: ["genericTank"],
    LABEL: "Ball thrower",
    BODY: {
        FOV: 2,
        HEALTH: base.HEALTH * 2,
        SPEED: base.SPEED * 3,
    },
    DANGER: 6,
    GUNS: [{
        POSITION: [0, 20],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, { reload: 1.5, recoil: 0.25, health: 200, damage: 50, pen: 200, speed: 0.1, maxSpeed: 1000, range: 1.4, density: 4, spray: 0.25 }]),
            TYPE: 'bullet',
        }
    }],
};

Class.addons.UPGRADES_TIER_0.push("ball_thrower");
console.log('[balls] has been loaded.');
