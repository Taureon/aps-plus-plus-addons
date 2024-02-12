const { combineStats, makeDeco } = require('../facilitators.js');
const { statnames } = require('../constants.js');
const g = require('../gunvals.js');

// This addon is disabled by default.
return console.log('[florr-flower.js] Addon disabled by default');

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
class orbitPetal extends IO {
    constructor(body, opts = {}) {
        super(body);
        this.realDist = 0;
        this.invert = opts.invert ?? false;
    }
  
    think(input) {
        let invertFactor = this.invert ? -1 : 1,
            master = this.body.master.master,
            dist = this.invert ? master.inverseDist : master.dist,
            angle = (this.body.angle * Math.PI / 180 + master.angle) * invertFactor;
        
        if(this.realDist > dist){
            this.realDist -= Math.min(10, Math.abs(this.realDist - dist));
        }
        else if(this.realDist < dist){
            this.realDist += Math.min(10, Math.abs(dist - this.realDist));
        }
        this.body.x = master.x + Math.cos(angle) * this.realDist;
        this.body.y = master.y + Math.sin(angle) * this.realDist;
        
        this.body.facing = angle;
    }
}

ioTypes.petals = petals;
ioTypes.orbitPetal = orbitPetal;

Class.petal = {
    LABEL: "Petal",
    TYPE: "satellite",
    ACCEPTS_SCORE: false,
    DANGER: 2,
    SHAPE: 0,
    LAYER: 13,
    CONTROLLERS: ['orbitPetal'],
    FACING_TYPE: "spin",
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.75,
        HEALTH: 0.3,
        DAMAGE: 3.375,
        SPEED: 10,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.5,
    },
    COLOR: 'mirror',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
    MOTION_TYPE: 'motor'
}

Class.flower = {
    PARENT: "genericTank",
    LABEL: "flower",
    ANGLE: 60,
    CONTROLLERS: ["petals"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: {
        BULLET_SPEED: 'Petal Speed',
        BULLET_HEALTH: 'Petal Health',
        BULLET_PEN: 'Petal Penetration',
        BULLET_DAMAGE: 'Petal Damage',
        RELOAD: 'Respawn Rate',
    },
    AI: {
        SPEED: 2, 
    }, 
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 6; i++) { 
            output.push({ 
                POSITION: {WIDTH: 8, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([{ size: 0.8, reload: 3, damage: 2 }]),
                    TYPE: ["petal", {ANGLE: i * 60}],
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
