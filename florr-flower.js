const { combineStats, makeDeco } = require('../facilitators.js');
const { statnames } = require('../constants.js');
const g = require('../gunvals.js');

// This addon is disabled by default.
// return console.log('[florr-flower.js] Addon disabled by default');

class petals extends IO {
    constructor(body, opts = {}) {
        super(body);
        this.body.angle = 0;
        this.minDistance = opts.minDistance ?? 2;
        this.maxDistance = opts.maxDistance ?? 13;
        this.norDistance = opts.norDistance ?? 4;
        this.body.dist = opts.initialDist || this.norDistance * this.body.size;
        this.body.inverseDist = this.maxDistance * this.body.size - this.body.dist + this.norDistance * this.body.size;
        this.radiusScalingSpeed = opts.radiusScalingSpeed || 10;
    }

    setStage() {
        let trueMaxDistance = this.maxDistance * this.body.size;
        let trueMinDistance = this.minDistance * this.body.size;
        let trueNorDistance = this.norDistance * this.body.size;
        this.body.dist = this.stage == 1
            ? trueNorDistance
            : this.stage == 2
                ? trueMaxDistance
                : trueMinDistance
    }

    think(input) {
        this.body.angle += (this.body.skill.spd * 2 + this.body.aiSettings.SPEED) * Math.PI / 180;

        // 1 - nor
        // 2 - max
        // 3 - min
        this.stage = 1;
        if(input.fire) { this.stage = 2 }
        if(input.alt) { this.stage = 3 }
        this.setStage();
    }
}
ioTypes.petals = petals;

// based on whirlwind code
Class.flower = {
    PARENT: "genericTank",
    LABEL: "flower",
    ANGLE: 60,
    CONTROLLERS: ["petals"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.whirlwind,
    AI: {
        SPEED: 2, 
    }, 
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 6; i++) { 
            output.push({ 
                POSITION: {WIDTH: 8, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite]), 
                    TYPE: ["satellite", {ANGLE: i * 60}],
                    MAX_CHILDREN: 1,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        return output
    })()
};

Class.addons.UPGRADES_TIER_0.push("flower");
console.log('[florr-flower] has been loaded.');
