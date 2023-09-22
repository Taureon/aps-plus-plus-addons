// Stronger:
//     Sets all your stats to 15.
//     Lasts 20 seconds.
//     Makes you rainbow colored.
//
// Sidewinder:
//     Summons a Stronger Sidewinder Snake when you left click, which has a 3 second cooldown
//     Lasts 20 seconds.
//
// Hedgehog:
//     Increases your max speed and acceleration by 400%.
//     Lasts 20 seconds.
//
// Focus:
//     Decreases spread by 50% and all your guns shoot forward.
//     Lasts 10 seconds.
//
// Machine Gun:
//     Applies g.mach to your guns.
//     Lasts 20 seconds.
//
// Damage Sponge:
//     Increases your Max Health and Shield by 400%.
//     Lasts 10 seconds.
//
// Vanish:
//     Makes you invisible.
//     Lasts 20 seconds.
//
// Ant:
//     Makes you 75% smaller.
//     Lasts 15 seconds.
//
// Carrot:
//     Increase your FOV by 100%
//     Lasts 20 seconds.

// Growth Annihilator:
//     Spawns a Stronger LVL 250 Growth Annihilator, which shoots you once from 10-20 players of distance away and then despawns.
//
// No Health:
//     Sets your shield to 0 and sets your health to 1% of max health.
//
// Slippery:
//     Decreases your acceleration by 66% and increases your max speed by 50%.
//     Lasts 20 seconds.
//
// Vulnerable:
//     Decreases your Max Health and Shield by 80%.
//     Lasts 10 seconds.
//
// Black Hole:
//     Movable entities near you get pulled towards you.
//     Lasts 15 seconds.
//
// Time Bomb:
//     Makes you explode in 10 seconds, killing you and damaging nearby entities.
//
// Balloon:
//     Makes you 300% larger.
//     Lasts 15 seconds.
//
// Blind:
//     Decreases your fov by 80%.
//     lasts 10 seconds.

let { mach: gMach } = require('../gunvals.js'),

effects = [{
    name: 'Stronger',
    splash: 'I feel very strong...',
    duration: 20,
    run: body => {
        let colorOld = body.color,
            rawOld = body.skill.raw.map(x=>x),
            capsOld = body.skill.caps.map(x=>x),
            stronk = Array(10).fill(15);
        body.skill.setCaps(stronk);
        body.skill.set(stronk);
        body.color = 36;

        setTimeout(()=>{
            body.skill.setCaps(capsOld);
            body.skill.set(rawOld);
            body.color = colorOld;
        }, 20 * 1000);
    },
    statusEffect: new StatusEffect(20 * 30, undefined, body => {
        let e = new Entity(body),
            ang = Math.random() * Math.PI * 2;
        e.define('genericEntity');
        e.velocity.x = 5 * Math.sin(ang);
        e.velocity.y = 5 * Math.cos(ang);
        e.SIZE = body.SIZE;
        e.coreSize = body.coreSize;
        e.alpha = 0.5;
        setTimeout(() => e.kill(), 100);
    })
},

{
    name: 'Sidewinder',         
    splash: 'Press Alt-Fire to launch a Snake.',
    duration: 20
    //TODO: add invisible sidewinder barrel
},

{
    name: 'Hedgehog',           
    splash: 'Gotta go fast!',
    duration: 20
    statusEffect: new StatusEffect(20 * 30, { acceleration: 5, topSpeed: 5 })
},

{
    name: 'Focus',              
    splash: 'I CAN AIM.',
    duration: 10,
    run: body => {
        //TODO: undo it after effect ends
        for (let gun of body.guns) {
            let gun;
            for (let stat in gMach) {
                gun.settings[stat].angle = 0;
                gun.settings[stat].spray *= 0.5;
            }
        }
    }
},

{
    name: 'Machine Gun',        
    splash: 'I CANNOT AIM!',
    duration: 20,
    run: body => {
        //TODO: undo it after effect ends
        for (let gun of body.guns) {
            let gun;
            for (let stat in gMach) {
                gun.settings[stat] *= gMach[stat];
            }
            gun.trueRecoil = gMach.recoil;
        }
    }
},
{
    name: 'Damage Sponge',      
    splash: 'Hehe, that bullet tickles!',
    duration: 10,
    statusEffect: new StatusEffect(10 * 30, { health: 5, shield: 5 })
},

{
    name: 'Ant',                
    splash: 'Time to be annoying >:3',
    duration: 15,
    statusEffect: new StatusEffect(15 * 30, { size: 0.25, fov: 2 })
},

{
    name: 'Carrot',             
    splash: 'Ranger²',
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, { fov: 2 })
},

{
    name: 'Growth Annihilator', 
    splash: 'WATCH OUT!!',
    endNotification: false,
    run: body => {
        let angle = Math.random() * 2 * Math.PI,
        anni = new Entity({
            x: body.x - Math.sin(angle) * 100,
            y: body.y - Math.cos(angle) * 100
        })
        anni.define('plugin_effectRoller_strongerGrowthAnnihilator');
        anni.facing = angle;
        setTimeout(() => {
            for (let i = 0; i < this.guns.length; i++) {
                this.guns.autofire = true;
            }
        }, 2000);
        setTimeout(() => anni.kill(), 3000);
    }
},

{
    name: 'No Health',          
    splash: 'Oh..',
    endNotification: false,
    run: body => {
        body.shield.amount = 0;
        body.health.amount = body.health.max / 100;
    }
},

{
    name: 'Slippery',           
    splash: 'Why is the floor suddenly out of ice?',
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, { acceleration: 1 / 3, topSpeed: 1.5 })
},

{
    name: 'Vulnerable',         
    splash: "Don't even get breathed on!",
    duration: 10,
    statusEffect: new StatusEffect(10 * 30, { health: 0.2, shield: 0.2 })
},

{
    name: 'Black Hole',         
    splash: 'GROUP HUG!!!',
    duration: 15,
    statusEffect: new StatusEffect(15 * 30, undefined, body => {
        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];
            if (entity.id == body.id || !entity.PUSHABILITY) continue;
            let angle = Math.atan2(entity.y - body.y, entity.x - body.x),
                force = entity.PUSHABILITY * 100 / ((entity.y - body.y) ** 2 + (entity.x - body.x) ** 2);
            entity.accel.x += force * Math.sin(angle);
            entity.accel.y += force * Math.cos(angle);
        }
    })
},

{
    name: 'Time Bomb',          
    splash: 'I must sacrifice myself suddenly...',
    endNotification: false,
    run: body => {
        // TODO: put bomb on player
        socket.talk('m', name + ' is about to detonate in ' + 10 + ' seconds!');
        setTimeout(()=> body.kill(), 10 * 1000);
    }
},

{
    name: 'Balloon',            
    splash: "I shouldn't have ordered fast food before this..",
    duration: 15,
    statusEffect: new StatusEffect(15 * 30, { size: 2, fov: Math.SQRT1_2 })
},

{
    name: 'Blind',              
    splash: "Short sightedness, a common eye condition.",
    duration: 10,
    statusEffect: new StatusEffect(10 * 30, { fov: 0.2 })
}];

module.exports = ({ Class, Config, Events }) => {

    Class.plugin_effectRoller_strongerGrowthAnnihilator = {
        PARENT: ["annihilator"],
        DANGER: 10,
        SKILL_CAP: Array(10).fill(15),
        SKILL: Array(10).fill(15),
        LEVEL_MAX: 250,
        LEVEL: 250
    };

    Events.on('chatMessage', ({message, socket}) => {
        if (!/[!\/$]roll/.test(message)) return;

        let body = socket.player.body,
            effect = effect[Math.floor(Math.random() * effects.length)];

        if (effect.splash) {
            socket.talk('m', effect.splash);
        }

        socket.talk('m', effect.name);

        if (effect.statusEffect) {
            body.addStatusEffect(effect.statusEffect);
        }

        if (effect.run) {
            effect.run(body);
        }

        if (effect.endNotification) {
            setTimeout(() => {
                socket.talk('m', effect.name + ' is about to end in 5 seconds!');
            }, effect.duration * 1000 - 5000);
        }
    });
};