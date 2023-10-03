// You can do '!roll [id]' in chat to roll an effect.
// Prefix can also be '$'' or '/'.
// 'id' parameter lets you pick the effect if defined.
// 'id' parameter requires 'chooseRoll' permission.
// Cooldown of 30 seconds after rolling.
// Cooldown bypass requires 'infiniteRolls' permission.

// Stronger [0]:
//     Sets all your stats to 15.
//     Lasts 20 seconds.
//     Makes you rainbow colored.
//
// Boulder [1]:
//     Makes you ten times as immovable.
//     Lasts 20 seconds.
//
// Hedgehog [2]:
//     Increases your max speed and acceleration by 400%.
//     Lasts 20 seconds.
//
// Focus [3]:
//     Decreases spread by 50% and all your guns shoot forward.
//     Lasts 20 seconds.
//
// Machine Gun [4]:
//     Applies g.mach to your guns.
//     Lasts 20 seconds.
//
// Damage Sponge [5]:
//     Increases your Max Health and Shield by 400%.
//     Lasts 10 seconds.
//
// Ant [6]:
//     Makes you 75% smaller.
//     Lasts 15 seconds.
//
// Carrot [7]:
//     Increase your FOV by 100%
//     Lasts 20 seconds.

// Growth Annihilator [8]:
//     Spawns a Stronger LVL 250 Growth Annihilator, which shoots you once from 10-20 players of distance away and then despawns.
//
// No Health [9]:
//     Sets your shield to 0 and sets your health to 1% of max health.
//
// Slippery [10]:
//     Decreases your acceleration by 66% and increases your max speed by 50%.
//     Lasts 20 seconds.
//
// Vulnerable [11]:
//     Decreases your Max Health and Shield by 80%.
//     Lasts 10 seconds.
//
// Black Hole [12]:
//     Movable entities near you get pulled towards you.
//     Lasts 15 seconds.
//
// Old Age [13]:
//     Kills you in 20 seconds.
//
// Balloon [14]:
//     Makes you 300% larger.
//     Lasts 15 seconds.
//
// Blind [15]:
//     Decreases your fov by 80%.
//     lasts 10 seconds.

// Effects I considered but did not add because of the weirdness of the process of adding them:
// - Vanish: Makes you COMPLETELY invisible for 15 seconds.
// -#Sidewinder: Gives you an invisible Sidewinder barrel which shoots a (straight-forward moving) snake when you alt-fire. Was originally going to be an Annihilator bullet. Was replaced with Boulder.
// - Time Bomb: Puts a bomb on your head which explodes after 10 seconds, killing you and nearby enemies. Was replaced with Old Age.

// Effect ideas I thought of.
// -#WRATH: Every bullet you shoot is an Annihilator bullet (incl. strenght and size, but not its speed). Does not affect your tank's fire rate.
// - Magnetic Projectiles: Shot bullets, traps, and drones get pulled to the nearest enemy.
// - Summon Sanctuary: Spawns a small, much weaker sanctuary with reduced damage for your team at where you alt-fire.
// - Summon Dominator: Spawns a small, lower health gunner dominator with reduced damage for your team at where you alt-fire.
// -#Noclip: Disables all entity collisions with your main body, does not do anything to your projectiles.
// -#Thorns: Makes you immune against enemy knockback and increases body damage by 300%.
// -#Tornado: Makes your body spawn 5 ai-guided swarmers per second.
// - Guided Projectiles: Makes your projectiles go to your mouse.
// - Exploding Projectiles: Applies SHOOT_ON_DEATH guns to fired projectiles.
//
// - Random Projectiles: Gives you the projectiles of some other tank.
// -#Drugged: Multiplies your FOV by a value that oscillates between 0.5 and 1.5. Goes from one number to the other in 2 seconds in a Sine-easing curve.
// -#Mom-doer: Makes your bullets spawn 500 units further away.
// -#On The Move: Forces your velocity to be your top speed.
// -#Increased Recoil: Multiplies your recoil received by 2.
// - Blast: Blasts away nearby entities once, with a lot of force.
// -#Get Trolled: Does NOTHING..
// -#Turtle: Makes you 5x as healthy, but also makes your max speed 80% slower.
// - Orb: Places an lvl45-tank-sized orb in front of you that absorbs any entity it touches, follows your tank's rotation.
// -#Gamer Neck: Applies `CONTROLLER: [['zoom', { distance: 750, dynamic: true, permanent: true }]]` for 20 seconds.
//
// - Alcoholic: Rotates your velocity vector in a random clockwise direction for a random amount of time up to 2 seconds.
// -#Earthquake: Every game tick, changes your position by a maximum value of 5 in a random direction..
// - Death Mark: Puts you on the minimap for everyone, multiplies the score received when someone kills you by 2, spawns a large pulse around you.
// -#Frozen Camera: Applies `CONTROLLER: [['zoom', { distance: 0, permanent: true }]]` for 20 seconds.
// - Forced spin: Every 2 seconds, makes you spin at random speeds and rotations for 1.5 seconds, also prevents you from shooting.
// - Statue: Forces you to stand completely still for 10 seconds. Would be called Turret depending or not if you can fire your guns while standing still.
// -#Random Barrel Positions: Randomises each of your barrels' angle and direction.
// - Antisocial Projectiles: Projectiles get slightly repelled by enemy entities.
// -#Backpetal: Inverts movement directions.
// -#Impotence: Same as WRATH, but it's Machine Gunner bullets instead.

let { combineStats } = require('../facilitators.js'),
    { gunCalcNames } = require('../constants.js'),
    g = require('../gunvals.js'),

effects = [
// Effect Blueprint
/*
{
    name: '', // Name of it
    splash '', // Splash msg of it
    duration: 0, // how many seconds it lasts
    noEndNotification: false, // if it should display an "about to end" notification. duration doesnt need to be defined if this is
    run: body => {}, // function to run when the effect gets rolled
    statusEffect: new StatusEffect(0 * 30), // the StatusEffect to apply which also includes a "run on every tick" function
},
*/

/// Positive Effects

/*{
    name: 'WRATH',
    splash "You are all about to have a really bad day...",
    duration: 15,
    run: body => {
        let anniGunWidth = 19.5 / 10,
            anniStats = combineStats([g.basic, g.pound, g.destroy, g.anni]),
            remember = {};

        delete anniStats.reload;
        delete anniStats.recoil;
        delete anniStats.shudder;
        delete anniStats.speed;
        delete anniStats.maxSpeed;
        delete anniStats.range;
        delete anniStats.spray;
        //leftover: size, health, damage, pen, density, resist

        for (let gun of body.guns) {
            if (gun.settings) {
                remember[gun.id] = { size: gun.settings.size };
                gun.settings.size = anniStats.size * anniGunWidth / gun.width;
                for (let key in anniStats) {
                    if (key !== "size") {
                        remember[gun.id][key] = gun.settings[key];
                        gun.settings[key] = anniStats[key];
                    }
                }
            }
        }
        setTimeout(() => {
            for (let gun of body.guns) {
                if (remember[gun.id]) {
                    for (let key in remember[gun.id]) {
                        gun.settings[key] = remember[gun.id][key];
                    }
                }
            }
        }, 15 * 1000);
    }
},

{
    name: 'Tornado',
    splash 'The Storm of Hell.',
    duration: 15,
    run: body => {
        let gun = new Gun(body, {
            POSITION: { LENGTH: 1, WIDTH: 7.5 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, { spray: 9999, reload: 0.25}]),
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: "Effect Roller",
                TYPE: "autoswarm",
                AUTOFIRE: true
            },
        });
        body.guns.push(gun);
        setTimeout(() => body.guns = body.guns.filter(g => g !== gun), 15 * 1000);
    }
},

{
    name: 'Sidewinder',
    splash 'Press Alt-Fire to fire a Sidewinder Snake.',
    duration: 15,
    run: body => {
        let gun = new Gun(body, {
            POSITION: [15, 12, -1.1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
                STAT_CALCULATOR: gunCalcNames.sustained,
                TYPE: "snake",
                ALT_FIRE: true
            },
        });
        body.guns.push(gun);
        setTimeout(() => body.guns = body.guns.filter(g => g !== gun), 15 * 1000);
    }
},

{
    name: 'Noclip',
    splash '',
    duration: 15,
    run: body => {
        body.removeFromGrid();
        setTimeout(() => body.addToGrid(), 15 * 1000);
    }
},

{
    name: 'Thorns',
    splash: "Don't touch me!",
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, { damage: 4, pushability: 0 }),
},

{
    name: 'On The Move',
    splash 'Doing the Cardio for the whole team!',
    duration: 20, // how many seconds it lasts
    statusEffect: new StatusEffect(20 * 30, undefined, body => {
        let factor = (body.topSpeed ** 2) / (body.velocity.x ** 2 + body.velocity.y ** 2);
        body.velocity.x *= factor;
        body.velocity.y *= factor;
    }),
},

{
    name: 'Mom-doer',
    splash '',
    duration: 20,
    run: body => {
        let remember = {};
        for (let gun of body.guns) {
            remember[gun.id] = true;
            gun.length += 50;
        }
        setTimeout(() => {
            for (let gun of body.guns) {
                if (remember[gun.id]) {
                    gun.length -= 50;
                }
            }
        }, 20 * 1000);
    }
},

{
    name: 'Increased Recoil',
    splash '',
    duration: 15,
    run: body => {
        let remember = {};
        for (let gun of body.guns) {
            if (gun.settings) {
                remember[gun.id] = true;
                gun.settings.recoil *= 2;
            }
        }
        setTimeout(() => {
            for (let gun of body.guns) {
                if (remember[gun.id]) {
                    gun.settings.recoil /= 2;
                }
            }
        }, 20 * 1000);
    }
},

{
    name: 'No Effect',
    splash 'Get Trolled',
    noEndNotification: true
},

{
    name: 'Drugged',
    splash "Ohhh... that's the stuff!",
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, {}, (body, effect) => {
        effect.fov = 1 + Math.sin(Math.PI * effect.duration / 15) / 2
        body.refreshBodyAttributes();
    })
},

{
    name: 'Turtle',
    splash 'Are you rammer or not?',
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, { acceleration: 0.2, topSpeed: 0.2, health: 5, shield: 5 })
},

{
    name: 'Gamer Neck',
    splash 'Maybe you should stand up more..',
    duration: 20,
    run: body => {
        let controller = new ioTypes.zoom(body, { distance: 750, dynamic: true, permanent: true });
        body.addController(controller);
        setTimeout(() => body.controllers = body.controllers.filter(c => c !== controller), 20 * 1000);
    }
},

{
    name: 'Earthquake',
    splash 'Welcome to Chile.',
    duration: 15,
    statusEffect: new StatusEffect(15 * 30, undefined, body => {
        let angle = Math.PI * 2 * Math.random(),
            x = Math.cos(angle) * Math.random() * 5,
            y = Math.sin(angle) * Math.random() * 5;
        body.x += x;
        body.y += y;
        body.velocity.x += x;
        body.velocity.y += y;
    })
},

{
    name: 'Backpetal',
    splash 'Muscle memory be damned.',
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, { acceleration: -1 })
},

{
    name: 'Random Barrel Positions',
    splash 'In which direction do I aim?',
    duration: 20,
    run: body => {
        let remember = {};

        for (let gun of body.guns) {
            remember[gun.id] = gun.angle;
            gun.angle = Math.PI * 2 * Math.random();
        }
        setTimeout(() => {
            for (let gun of body.guns) {
                if (remember[gun.id] != null) {
                    gun.angle = remember[gun.id];
                }
            }
        }, 15 * 1000);
    }
},

{
    name: 'Frozen Camera',
    splash 'This area looks pretty nice.',
    duration: 20,
    run: body => {
        let controller = new ioTypes.zoom(body, { distance: 0, permanent: true });
        body.addController(controller);
        setTimeout(() => body.controllers = body.controllers.filter(c => c !== controller), 20 * 1000);
    }
},

{
    name: 'Impotence',
    splash "Your gun is weak! Haha!",
    duration: 15,
    run: body => {
        let mgGunWidth = 3 / 10,
            mgStats = combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
            remember = {};

        delete mgStats.reload;
        delete mgStats.recoil;
        delete mgStats.shudder;
        delete mgStats.speed;
        delete mgStats.maxSpeed;
        delete mgStats.range;
        delete mgStats.spray;
        //leftover: size, health, damage, pen, density, resist

        for (let gun of body.guns) {
            if (gun.settings) {
                remember[gun.id] = { size: gun.settings.size };
                gun.settings.size = mgStats.size * mgGunWidth / gun.width;
                for (let key in mgStats) {
                    if (key !== "size") {
                        remember[gun.id][key] = gun.settings[key];
                        gun.settings[key] = mgStats[key];
                    }
                }
            }
        }
        setTimeout(() => {
            for (let gun of body.guns) {
                if (remember[gun.id]) {
                    for (let key in remember[gun.id]) {
                        gun.settings[key] = remember[gun.id][key];
                    }
                }
            }
        }, 15 * 1000);
    }
},*/

// Stronger
{
    name: 'Stronger',
    splash: 'I feel powerful...',
    duration: 20,
    run: body => {
        let colorOld = body.color,
            pointsOld = body.skill.points,
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
            body.skill.points = pointsOld;
        }, 20 * 1000);
    },
    statusEffect: new StatusEffect(20 * 30, undefined, body => {
        let e = new Entity(body),
            ang = Math.random() * Math.PI * 2;
        e.define('genericEntity');
        e.velocity.x = 5 * Math.sin(ang);
        e.velocity.y = 5 * Math.cos(ang);
        e.SIZE = body.size;
        e.team = body.team;
        e.color = getTeamColor(body.team);
        e.alpha = 0.5;
        setTimeout(() => e.kill(), 100);
    })
},

// Boulder
{
    name: 'Boulder',
    splash: 'I am become wall',
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, { pushability: 0.1, recoilReceived: 0.1 })
},

// Hedgehog
{
    name: 'Hedgehog',
    splash: 'Gotta go fast!',
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, { acceleration: 5, topSpeed: 5 })
},

// Focus
{
    name: 'Focus',
    splash: 'I CAN AIM.',
    duration: 20,
    run: body => {
        let remember = {};
        for (let gun of body.guns) {
            remember[gun.id] = {
                angle: gun.angle,
                direction: gun.direction
            };
            gun.angle = 0;
            gun.direction = 0;
            if (gun.settings) {
                gun.settings.spray *= 0.5;
            }
        }
        setTimeout(() => {
            for (let gun of body.guns) {
                if (remember[gun.id]) {
                    gun.angle = remember[gun.id].angle;
                    gun.direction = remember[gun.id].direction;
                }
                if (gun.settings) {
                    gun.settings.spray /= 0.5;
                }
            }
        }, 20 * 1000);
    }
},

// Machine Gun
{
    name: 'Machine Gun',
    splash: 'I CANNOT AIM!',
    duration: 20,
    run: body => {
        for (let gun of body.guns) {
            if (gun.settings) {
                for (let stat in g.mach) {
                    gun.settings[stat] *= g.mach[stat];
                }
                gun.trueRecoil *= g.mach.recoil;
            }
        }
        setTimeout(() => {
            for (let gun of body.guns) {
                if (gun.settings) {
                    for (let stat in g.mach) {
                        gun.settings[stat] /= g.mach[stat];
                    }
                    gun.trueRecoil /= g.mach.recoil;
                }
            }
        }, 20 * 1000);
    }
},

// Damage Sponge
{
    name: 'Damage Sponge',
    splash: 'Hehe, that bullet tickles!',
    duration: 10,
    statusEffect: new StatusEffect(10 * 30, { health: 5, shield: 5 })
},

// Ant
{
    name: 'Ant',
    splash: 'Time to be annoying >:3',
    duration: 15,
    statusEffect: new StatusEffect(15 * 30, { size: 0.25, fov: 2 })
},

// Carrot
{
    name: 'Carrot',
    splash: 'Ranger²',
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, { fov: 2 })
},


/// Neutral Effects




/// Negative Effects

// Growth Annihilator
{
    name: 'Growth Annihilator',
    splash: 'WATCH OUT!!',
    noEndNotification: true,
    run: body => {
        let angle = Math.random() * 2 * Math.PI,
        anni = new Entity({
            x: body.x - Math.sin(angle) * 400,
            y: body.y - Math.cos(angle) * 400
        });
        anni.define('plugin_effectRoller_strongerGrowthAnnihilator');
        anni.define({ CONTROLLERS: [["plugin_effectRoller_lookAtEntity", { entity: body }]] });
        anni.facing = angle;
        anni.team = TEAM_ROOM;
        anni.color = getTeamColor(TEAM_ROOM);
        setTimeout(() => anni.kill(), 3000);
    }
},

// No Health
{
    name: 'No Health',
    splash: 'Oh..',
    noEndNotification: true,
    run: body => {
        body.shield.amount = 0.001;
        body.health.amount = body.health.max / 100;
    }
},

// Slippery
{
    name: 'Slippery',
    splash: 'Why is the floor suddenly out of ice?',
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, { acceleration: 1 / 3, topSpeed: 1.5 })
},

// Vulnerable
{
    name: 'Vulnerable',
    splash: "Don't even get breathed on!",
    duration: 10,
    statusEffect: new StatusEffect(10 * 30, { health: 0.2, shield: 0.2 })
},

// Black Hole
{
    name: 'Black Hole',
    splash: 'GROUP HUG!!!',
    duration: 15,
    statusEffect: new StatusEffect(15 * 30, undefined, body => {
        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];
            if (entity.pushability) {
                let diffX = entity.x - body.x,
                    diffY = entity.y - body.y,
                    dist2 = diffX ** 2 + diffY ** 2;
                if (dist2 < 250000) {
                    let force = 1000 * entity.pushability / Math.max(1, dist2);
                    entity.velocity.x -= diffX * force;
                    entity.velocity.y -= diffY * force;
                }
            }
        }
    })
},

// Old Age
{
    name: 'Old Age',
    splash: 'Oh no where is my life support???',
    noEndNotification: true,
    run: (body, socket) => {
        setTimeout(()=> body.kill(), 20 * 1000);
    }
},

// Balloon
{
    name: 'Balloon',
    splash: "I shouldn't have ordered fast food before this..",
    duration: 15,
    statusEffect: new StatusEffect(15 * 30, { size: 2, fov: Math.SQRT1_2 })
},

// Blind
{
    name: 'Blind',
    splash: "Short sightedness, a common eye condition.",
    duration: 10,
    statusEffect: new StatusEffect(10 * 30, { fov: 0.2 })
},
];

class io_plugin_effectRoller_lookAtEntity extends IO {
    constructor(body, { entity } = {}) {
        super(body);
        this.entity = entity;
    }
    think() {
        return {
            target: {
                x: this.entity.x - this.body.x,
                y: this.entity.y - this.body.y
            }
        }
    }
}
ioTypes.plugin_effectRoller_lookAtEntity = io_plugin_effectRoller_lookAtEntity;

module.exports = ({ Class, Config, Events }) => {

    Class.plugin_effectRoller_strongerGrowthAnnihilator = {
        PARENT: ["genericTank"],
        LABEL: "Annihilator",
        SKILL_CAP: Array(10).fill(15),
        SKILL: Array(10).fill(15),
        LEVEL_CAP: 250,
        LEVEL: 250,
        DANGER: 10,
        GUNS: [{
            POSITION: {
                LENGTH: 20.5,
                WIDTH: 19.5,
                DELAY: 0.75
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                AUTOFIRE: true
            }
        }]
    };

    let recent = {},
        regex = /^[!\/$]roll ?(\d*)?$/i,
        rollCooldown = 30_000;

    Events.on('chatMessage', ({message, socket}) => {

        if (!regex.test(message)) return;

        let body = socket.player.body,
            perms = socket.permissions ?? {};

        if (!(perms && perms.infiniteRolls)) {
            if (recent[body.id]) {
                socket.talk('m', `§3§[Effect Roller]§reset§ You need to wait §12§${Math.ceil((recent[body.id] - Date.now()) / 1000)}§reset§ seconds to roll again!`);
                return;
            }

            recent[body.id] = Date.now() + rollCooldown;
            setTimeout(() => {
                delete recent[body.id];
            }, rollCooldown);
        }

        let match = (perms && perms.chooseRoll) ? message.match(regex) : null,
            effectId = match && !isNaN(match[1]) ? parseInt(match[1]) : Math.floor(Math.random() * effects.length),
            effect = effects[effectId];

        if (effect.splash) {
            socket.talk('m', effect.splash);
        }

        util.log(`${body.name} [${body.id}] rolled effect: ${effect.name} [${effectId}]`);
        socket.talk('m', '§3§[Effect Roller]§reset§ Rolled: §2§' + effect.name);

        if (effect.statusEffect) {
            body.addStatusEffect(effect.statusEffect);
        }

        if (effect.run) {
            effect.run(body, socket);
        }

        if (!effect.noEndNotification) {
            setTimeout(() => {
                socket.talk('m', '§3§[Effect Roller] §2§' + effect.name + '§reset§ is about to end in §12§5§reset§ seconds!');
            }, effect.duration * 1000 - 5000);
        }
    });
};
