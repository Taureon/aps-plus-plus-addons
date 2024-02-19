// You can do '!roll [id]' in chat to roll an effect.
// Prefix can also be '$'' or '/'.
// 'id' parameter lets you pick the effect if defined.
// 'id' value corresponds to the index inside the 'effects' array.
// 'id' parameter requires 'chooseRoll' permission.
// Cooldown of 30 seconds after rolling.
// Cooldown bypass requires 'infiniteRolls' permission.

// NOTE: you need to verify that ALL of them work.

// ID | name                    | description

// Positive Effects
//  0 : WRATH                   : Every bullet you shoot is an Annihilator bullet.
//  1 : Vanish                  : Makes you COMPLETELY invisible for 15 seconds.
//  2 : Tornado                 : Makes your body spawn 5 ai-guided swarmers per second.
//  3   Exploding Projectiles     Applies SHOOT_ON_DEATH guns to fired projectiles.
//  4 : Spawn Sanctuary         : Spawns a small, much weaker sanctuary with reduced damage for your team at where you alt-fire.
//  5 : Spawn Dominator         : Spawns a small, lower health gunner dominator with reduced damage for your team at where you alt-fire.
//  6 : Sidewinder              : Gives you an invisible Sidewinder barrel which shoots a (straight-forward moving) snake when you alt-fire.
//  7   Noclip                    Disables all entity collisions with your main body, does not do anything to your projectiles.
//  8 : Thorns                  : Makes you immune against enemy knockback and increases body damage by 300%.
//  9 : Jalopy Reload           : Makes your guns shoot 8 times as fast as basic.
// 10 : Stronger                : Sets all your stats to 15.
// 11 : Boulder                 : Makes you ten times as immovable.
// 12 : Hedgehog                : Increases your max speed and acceleration by 400%.
// 13 : Focus                   : Decreases spread by 50% and all your guns shoot forward.
// 14 : Machine Gun             : Applies g.mach to your guns.
// 15 : Damage Sponge           : Increases your Max Health and Shield by 400%.
// 16 : Ant                     : Makes you 75% smaller.
// 17 : Carrot                  : Increase your FOV by 100%
// 18 : Magnetic Projectiles    : Shot bullets, traps, and drones get pulled to the nearest enemy.
// 19 : Guided Projectiles      : Makes your projectiles go to your mouse.

// Neutral Effects
// 20 : On The Move             : Forces your velocity to be your top speed.
// 21 : Mom-doer                : Makes your bullets spawn 500 units further away.
// 22 : Increased Recoil        : Multiplies your recoil received by 2.
// 23 : No Effect               : Does NOTHING..
// 24 : Drugged                 : Multiplies your FOV by a value that oscillates between 0.5 and 1.5. Goes from one number to the other in 2 seconds in a Sine-easing curve.
// 25 : Turtle                  : Makes you 5x as healthy, but also makes your max speed 80% slower.
// 26 : Gamer Neck              : Applies `CONTROLLER: [['zoom', { distance: 750, dynamic: true, permanent: true }]]` for 20 seconds.
// 27 : Random Barrel Positions : Randomises each of your barrels' angle and direction.
// 38 ? Random Tank             ? Sets you to a random tank available from c.SPAWN_CLASS
// 29 ? Random Projectiles      ? Gives you the projectiles of some other tank.
// 20   Orb                       Places an lvl45-tank-sized orb in front of you that absorbs any entity it touches, follows your tank's rotation.
// 31   Pumpkin                   Gives you the pumpkin curse: invis, orange, 0.0001 hp
// 32   Downgrade to Basic        Sets you to c.SPAWN_CLASS
// 33   Spy                       Changes player color to someone else's team
// 34   Paper-thin                Makes you 2x as fast, but 4x easier to kill
// 35   Just walking past         Makes you practically immune to damage, but stops your guns from firing
// 36   Spawn Rock                Spawns a rock that dies after a minute at where you alt fire
// 37   Teleport forward          Teleports you in the direction you're looking 1000 units
// 38   Heavy projectiles         Multiplies your guns' bullet health, reload and recoil by 2 and multiplies bullet size by 1.2
// 39   Auto-Balance              Makes you join another team

// Negative Effects
// 40 : Growth Annihilator      : Stronger LVL 250 Growth Annihilator, which shoots you once from 10-20 players of distance away and then despawns.
// 41 : No Health               : Sets your shield to 0 and sets your health to 1% of max health.
// 42 : Slippery                : Decreases your acceleration by 66% and increases your max speed by 50%.
// 43 : Vulnerable              : Decreases your Max Health and Shield by 80%.
// 44 : Black Hole              : Movable entities near you get pulled towards you.
// 45 : Old Age                 : Kills you in 20 seconds.
// 46 : Balloon                 : Makes you 300% larger.
// 47 : Blind                   : Decreases your fov by 80%.
// 48 : Frozen Camera           : Applies `CONTROLLER: [['zoom', { distance: 0, permanent: true }]]` for 20 seconds.
// 49 : Statue                  : Forces you to stand completely still for 10 seconds. Would be called Turret depending or not if you can fire your guns while standing still.
// 50 : Blast                   : Blasts away nearby entities once, with a lot of force.
// 51 : Impotence               : Same as WRATH, but it's Machine Gunner bullets instead.
// 52 : Railgun Reload          : Makes your guns shoot 1/8th as fast as basic.
// 53 : Alcoholic               : Rotates your velocity vector in a random clockwise direction for a random amount of time up to 2 seconds.
// 54 : Forced spin             : Every 2 seconds, makes you spin at random speeds and rotations for 1.5 seconds, also prevents you from shooting and moving.
// 55 : Earthquake              : Every game tick, changes your position by a maximum value of 5 in a random direction..
// 56 : Backpetal               : Inverts movement directions.
// 57 ? Bounty                  ? Puts you on the minimap for everyone, spawns a large pulse around you.
// 58 ? Introverted Projectiles ? Projectiles get slightly repelled by enemy entities.
// 59   Time Bomb                 Puts a bomb on your head which explodes after 10 seconds, killing you and nearby enemies. Was replaced with Old Age.

let { combineStats } = require('../facilitators.js'),
    { gunCalcNames } = require('../constants.js'),
    g = require('../gunvals.js'),

tanksInTree = [],
projectilesInTree = [],

effects = [
// Effect Blueprint
/*
{
    name: '', // Name of it
    splash: '', // Splash msg of it
    duration: 0, // how many seconds it lasts
    noEndNotification: false, // if it should display an "about to end" notification. duration doesnt need to be defined if this is true
    run: body => {}, // function to run when the effect gets rolled
    statusEffect: new StatusEffect(0 * 30), // the StatusEffect to apply which also includes a "run on every tick" function
},
*/

/// Positive Effects

{
    name: 'WRATH',
    splash: "You are all about to have a really bad day...",
    duration: 15,
    run: body => {
        let anniGunWidth = 19.5 / 10,
            anniStats = combineStats([g.basic, g.pounder, g.destroyer, g.annihilator]),
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
        setSyncedTimeout(() => {
            for (let gun of body.guns) {
                if (remember[gun.id]) {
                    for (let key in remember[gun.id]) {
                        gun.settings[key] = remember[gun.id][key];
                    }
                }
            }
        }, 15 * 30);
    }
},

{
    name: 'Vanish',
    splash: 'You are now completely invisible, now do some trolling!',
    duration: 15,
    stopChatMessage: true,
    run: body => {
        let alphaRange = body.alphaRange,
            invisible = body.invisible,
            ignoredByAi = body.ignoredByAi;
        body.alphaRange = [0, 0];
        body.invisible = [0, 0];
        body.ignoredByAi = true;
        setSyncedTimeout(() => {
            body.alphaRange = alphaRange;
            body.invisible = invisible;
            body.ignoredByAi = ignoredByAi;
        }, 15 * 30);
    }
},

{
    name: 'Tornado',
    splash: 'The Storm of Hell.',
    duration: 15,
    run: body => {
        let gun = new Gun(body, {
            POSITION: { LENGTH: 1, WIDTH: 7.5 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, { spray: 9999, speed: 3, maxSpeed: 3, reload: 0.02, recoil: 0}]),
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: "Effect Roller",
                TYPE: "autoswarm",
                AUTOFIRE: true
            },
        });
        body.guns.push(gun);
        setSyncedTimeout(() => body.guns = body.guns.filter(g => g !== gun), 15 * 30);
    }
},

//{
//    name: 'Exploding Projectiles',
//    splash: 'Who turned on "4th Of July"?',
//    duration: 20,
//    run: body => {
//        //this is completely batshit insane
//        let h = ({ gun, child }) => {
//            child.on('dead', () => {
//                let count = Math.ceil(Math.random() * 32),
//                    angleStart = Math.random() * Math.PI * 2;
//
//                for (let i = 0; i < count; i++) {
//                    let angle = angleStart + (i * (Math.PI * 2)) / count,
//                    o = new Entity(child);
//                    o.define({ BODY: { DAMAGE: child.DAMAGE, HEALTH: child.HEALTH} }, false);
//                    o.velocity.x = 20 * Math.sin(angle);
//                    o.velocity.y = 20 * Math.cos(angle);
//                    o.facing = angle;
//                    o.team = child.team;
//                    o.size = child.size / 2;
//                    o.life();
//                    setSyncedTimeout(() => o.kill(), 5);
//                }
//            });
//        };
//        body.onDef.push({ event: "fire", handler: h }, { event: "altFire", handler: h });
//        setSyncedTimeout(() => {
//            body.onDef = body.onDef.filter(({ handler }) => handler !== h);
//        }, 20 * 30);
//    }
//},

{
    name: 'Spawn Sanctuary',
    splash: 'Press Alt-Fire to summon a Sanctuary',
    noEndNotification: true,
    run: body => {
        //this is completely batshit insane
        let gun = new Gun(body, {
            POSITION: [1, 1, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
                TYPE: "bullet",
                ALT_FIRE: true
            },
        }),
        h = () => {
            body.onDef = body.onDef.filter(({ handler }) => handler !== h);
            body.guns = body.guns.filter(g => g !== gun);
            let o = new Entity({
                x: body.x + body.control.target.x,
                y: body.y + body.control.target.y
            }, body);
            o.define('sanctuaryTier1');
            o.define({ LEVEL: 30, SIZE: 20 });
            o.health.max /= 2;
            o.shield.max /= 2;
            o.team = body.team;
            o.color = body.color;
        };
        body.onDef.push({ event: "altFire", handler: h });
        body.guns.push(gun);
    }
},

{
    name: 'Spawn Dominator',
    splash: 'Press Alt-Fire to summon a Dominator',
    noEndNotification: true,
    run: body => {
        //this is completely batshit insane
        let gun = new Gun(body, {
            POSITION: [1, 1, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
                TYPE: "bullet",
                ALT_FIRE: true
            },
        }),
        h = () => {
            body.onDef = body.onDef.filter(({ handler }) => handler !== h);
            body.guns = body.guns.filter(g => g !== gun);
            let o = new Entity({
                x: body.x + body.control.target.x,
                y: body.y + body.control.target.y
            }, body);
            o.define('gunnerDominator');
            o.define({ LEVEL: 30, SIZE: 20 });
            o.health.max /= 2;
            o.shield.max /= 2;
            o.team = body.team;
            o.color = body.color;
        };
        body.onDef.push({ event: "altFire", handler: h });
        body.guns.push(gun);
    }
},

{
    name: 'Sidewinder',
    splash: 'Press Alt-Fire to fire a Sidewinder Snake.',
    duration: 15,
    run: body => {
        let gun = new Gun(body, {
            POSITION: [15, 12, -1.1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder]),
                STAT_CALCULATOR: gunCalcNames.sustained,
                TYPE: "snake",
                ALT_FIRE: true
            },
        });
        body.guns.push(gun);
        setSyncedTimeout(() => body.guns = body.guns.filter(g => g !== gun), 15 * 30);
    }
},

{
    name: 'Noclip',
    splash: '',
    duration: 15,
    run: body => {
        body.removeFromGrid();
        setSyncedTimeout(() => body.addToGrid(), 15 * 30);
    }
},

{
    name: 'Thorns',
    splash: "Don't touch me!",
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, { damage: 4, pushability: 0 }),
},

{
    name: 'Jalopy Reload',
    splash: 'Flooding the screen with bullets!',
    duration: 15,
    run: body => {
        let newReload = combineStats([g.basic]).reload / 8,
            remember = {};

        for (let gun of body.guns) {
            if (gun.settings) {
                remember[gun.id] = gun.settings.reload;
                gun.settings.reload = newReload;
            }
        }
        setSyncedTimeout(() => {
            for (let gun of body.guns) {
                if (remember[gun.id]) {
                    gun.settings.reload = remember[gun.id];
                }
            }
        }, 15 * 30);
    },
},

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
        body.define({ COLOR: 36 });

        setSyncedTimeout(()=>{
            body.skill.setCaps(capsOld);
            body.skill.set(rawOld);
            body.color = colorOld;
            body.skill.points = pointsOld;
        }, 20 * 30);
    },
    statusEffect: new StatusEffect(20 * 30, { fov: 2 }, body => {
        let e = new Entity(body),
            ang = Math.random() * Math.PI * 2;
        e.define('genericEntity');
        e.velocity.x = 5 * Math.sin(ang);
        e.velocity.y = 5 * Math.cos(ang);
        e.SIZE = body.size;
        e.team = body.team;
        e.color = getTeamColor(body.team);
        e.alpha = 0.5;
        setSyncedTimeout(() => e.kill(), 3);
    })
},

{
    name: 'Boulder',
    splash: 'I am become wall',
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, { pushability: 0.1, recoilReceived: 0.1 })
},

{
    name: 'Hedgehog',
    splash: 'Gotta go fast!',
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, { acceleration: 5, topSpeed: 5 })
},

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
        setSyncedTimeout(() => {
            for (let gun of body.guns) {
                if (remember[gun.id]) {
                    gun.angle = remember[gun.id].angle;
                    gun.direction = remember[gun.id].direction;
                }
                if (gun.settings) {
                    gun.settings.spray /= 0.5;
                }
            }
        }, 20 * 30);
    }
},

{
    name: 'Machine Gun',
    splash: 'I CANNOT AIM!',
    duration: 20,
    run: body => {
        for (let gun of body.guns) {
            if (gun.settings) {
                for (let stat in g.mach) {
                    gun.settings[stat] *= g.machineGun[stat];
                }
                gun.trueRecoil *= g.machineGun.recoil;
            }
        }
        setSyncedTimeout(() => {
            for (let gun of body.guns) {
                if (gun.settings) {
                    for (let stat in g.mach) {
                        gun.settings[stat] /= g.machineGun[stat];
                    }
                    gun.trueRecoil /= g.machineGun.recoil;
                }
            }
        }, 20 * 30);
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
    name: 'Magnetic Projectiles',
    splash: 'This game is so easy.',
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, undefined, body => {
        let hotPeople = [],
            hornyPeople = [];
        for (let i = 0; i < entities.length; i++) {
            if (entities[i].team != body.team && entities[i].team != TEAM_ROOM) {
                hotPeople.push(entities[i]);
            } else if (entities[i].id != body.id && entities[i].master.master.id == body.id) {
                hornyPeople.push(entities[i]);
            }
        }
        for (let i = 0; i < hornyPeople.length; i++) {
            let projectile = hornyPeople[i];
            for (let j = 0; j < hotPeople.length; j++) {
                let entity = hotPeople[j],
                    diffX = projectile.x - entity.x,
                    diffY = projectile.y - entity.y,
                    dist2 = diffX ** 2 + diffY ** 2;
                if (dist2 < 250 ** 2) {
                    let force = 10 * entity.size / Math.max(1500, dist2);
                    projectile.velocity.x -= diffX * force;
                    projectile.velocity.y -= diffY * force;
                }
            }
            if (projectile.velocity.length > projectile.topSpeed) {
                let factor = Math.sqrt(projectile.topSpeed / projectile.velocity.length);
                projectile.velocity.x *= factor;
                projectile.velocity.y *= factor;
            }
        }
    })
},

{
    name: 'Guided Projectiles',
    splash: 'Beware of the Overlord Main Pipeline!',
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, undefined, body => {
        let goal = {
            x: body.x + body.control.target.x,
            y: body.y + body.control.target.y
        };
        for (let i = 0; i < entities.length; i++) {
            let projectile = entities[i];
            if (entities[i].id != body.id && entities[i].master.master.id == body.id) {
                let length = projectile.velocity.length,
                    angle = projectile.facing + util.loopSmooth(projectile.facing, Math.atan2(goal.y - projectile.y, goal.x - projectile.x), 8 / c.runSpeed);
                projectile.facing = angle;
                projectile.velocity.x = length * Math.cos(angle);
                projectile.velocity.y = length * Math.sin(angle);
            }
        }
    })
},


/// Neutral Effects

{
    name: 'On The Move',
    splash: 'Doing the Cardio for the whole team!',
    duration: 20, // how many seconds it lasts
    statusEffect: new StatusEffect(20 * 30, undefined, body => {
        let factor = (body.topSpeed ** 2) / (body.velocity.x ** 2 + body.velocity.y ** 2);
        body.velocity.x *= factor;
        body.velocity.y *= factor;
    }),
},

{
    name: 'Mom-doer',
    splash: '',
    duration: 20,
    run: body => {
        let remember = {};
        for (let gun of body.guns) {
            remember[gun.id] = true;
            gun.length += 20;
        }
        setSyncedTimeout(() => {
            for (let gun of body.guns) {
                if (remember[gun.id]) {
                    gun.length -= 20;
                }
            }
        }, 20 * 30);
    }
},

{
    name: 'Increased Recoil',
    splash: '',
    duration: 15,
    run: body => {
        let remember = body.RECOIL_MULTIPLIER;
        body.define({ BODY: { RECOIL_MULTIPLIER: remember * 2} });
        setSyncedTimeout(() => body.define({ BODY: { remember } }), 20 * 30);
    }
},

{
    name: 'No Effect',
    splash: 'Get Trolled',
    noEndNotification: true
},

{
    name: 'Drugged',
    splash: "Ohhh... that's the stuff!",
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, {}, (body, effect, durationLeftover) => {
        effect.fov = 1.5 + Math.sin(Math.PI * 15 * durationLeftover / effect.duration);
        return true;
    })
},

{
    name: 'Turtle',
    splash: 'Are you rammer or not?',
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, { acceleration: 0.2, topSpeed: 0.2, health: 5, shield: 5 })
},

{
    name: 'Gamer Neck',
    splash: 'Maybe you should stand up more..',
    duration: 20,
    run: body => {
        let controller = new ioTypes.zoom(body, { distance: 500, dynamic: true, permanent: true });
        body.addController(controller);
        setSyncedTimeout(() => {
            body.controllers = body.controllers.filter(c => c !== controller);
            body.cameraOverrideX = null;
            body.cameraOverrideY = null;
        }, 20 * 30);
    }
},

{
    name: 'Random Barrel Positions',
    splash: 'In which direction do I aim?',
    duration: 20,
    run: body => {
        let remember = {};

        for (let gun of body.guns) {
            remember[gun.id] = gun.angle;
            gun.angle = Math.PI * 2 * Math.random();
        }
        setSyncedTimeout(() => {
            for (let gun of body.guns) {
                if (remember[gun.id] != null) {
                    gun.angle = remember[gun.id];
                }
            }
        }, 20 * 30);
    }
},

{
    name: 'Random Tank',
    splash: "I'm finally switching off of my main and trying something new!",
    duration: 20,
    run: body => {
        let oldDef = body.def;

        for (let gun of body.guns) {
            body.define(Array.isArray(Config.SPAWN_CLASS) ?
                Config.SPAWN_CLASS.map(x => tanksInTree[Math.floor(Math.random() * tanksInTree.length)])
            :
                tanksInTree[Math.floor(Math.random() * tanksInTree.length)]
            );
        }
        setSyncedTimeout(() => body.define(oldDef), 20 * 30);
    }
},

{
    name: 'Random Projectiles',
    splash: 'I have no idea what I am shooting..',
    duration: 20,
    run: body => {
        let remember = {},
            projMap;

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
        setSyncedTimeout(() => {
            for (let gun of body.guns) {
                if (remember[gun.id]) {
                    for (let key in remember[gun.id]) {
                        gun.settings[key] = remember[gun.id][key];
                    }
                }
            }
        }, 20 * 30);
    }
},



/// Negative Effects

{
    name: 'Growth Annihilator',
    splash: 'WATCH OUT!!',
    noEndNotification: true,
    run: body => {
        let angle = Math.random() * 2 * Math.PI,
        anni = new Entity({
            x: body.x - Math.sin(angle) * 375,
            y: body.y - Math.cos(angle) * 375
        });
        anni.define('plugin_effectRoller_strongerGrowthAnnihilator');
        anni.define({ CONTROLLERS: [["plugin_effectRoller_lookAtEntity", { entity: body }]] });
        anni.facing = angle;
        setSyncedTimeout(() => anni.kill(), 3 * 30);
    }
},

{
    name: 'No Health',
    splash: 'Oh..',
    noEndNotification: true,
    run: body => {
        body.shield.amount = 0.001;
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
            if (entity.pushability > 0 && entity.master.master.id != body.id) {
                let diffX = entity.x - body.x,
                    diffY = entity.y - body.y,
                    dist2 = diffX ** 2 + diffY ** 2;
                if (dist2 < 750 ** 2) {
                    let force = 1000 * entity.pushability / Math.max(1000, dist2);
                    entity.velocity.x -= diffX * force;
                    entity.velocity.y -= diffY * force;
                }
            }
        }
    })
},

{
    name: 'Old Age',
    splash: 'Oh no where is my life support???',
    noEndNotification: true,
    run: (body, socket) => setSyncedTimeout(()=> body.kill(), 20 * 30),
    statusEffect: new StatusEffect(20 * 30, { acceleration: 0.8, topSpeed: 0.8 })
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
},

{
    name: 'Frozen Camera',
    splash: 'This area looks pretty nice.',
    duration: 20,
    run: body => {
        let controller = new ioTypes.zoom(body, { distance: 0, permanent: true });
        body.addController(controller);
        setSyncedTimeout(() => {
            body.controllers = body.controllers.filter(c => c !== controller);
            body.cameraOverrideX = null;
            body.cameraOverrideY = null;
        }, 20 * 30);
    }
},

{
    name: 'Statue',
    splash: 'Arras, Become Turret',
    duration: 10,
    statusEffect: new StatusEffect(10 * 30, { acceleration: 0, topSpeed: 0 })
},

{
    name: 'Blast',
    splash: 'Look how many close friends I have!',
    noEndNotification: true,
    run: body => {
        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];
            if (entity.pushability) {
                let diffX = entity.x - body.x,
                    diffY = entity.y - body.y,
                    dist2 = diffX ** 2 + diffY ** 2;
                if (dist2 < 750 ** 2) {
                    let force = 50000 * entity.pushability / Math.max(1000, dist2);
                    entity.velocity.x += diffX * force;
                    entity.velocity.y += diffY * force;
                }
            }
        }
    }
},

{
    name: 'Impotence',
    splash: "Your gun is weak! Haha!",
    duration: 15,
    run: body => {
        let mgGunWidth = 3 / 10,
            mgStats = combineStats([g.basic, g.twin, g.gunner, g.machineGunner]),
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
        setSyncedTimeout(() => {
            for (let gun of body.guns) {
                if (remember[gun.id]) {
                    for (let key in remember[gun.id]) {
                        gun.settings[key] = remember[gun.id][key];
                    }
                }
            }
        }, 15 * 30);
    }
},

{
    name: 'Railgun Reload',
    splash: 'Where did my reload speed go?',
    duration: 15,
    run: body => {
        let newReload = combineStats([g.basic]).reload * 8,
            remember = {};

        for (let gun of body.guns) {
            if (gun.settings) {
                remember[gun.id] = gun.settings.reload;
                gun.settings.reload = newReload;
            }
        }
        setSyncedTimeout(() => {
            for (let gun of body.guns) {
                if (remember[gun.id]) {
                    gun.settings.reload = remember[gun.id];
                }
            }
        }, 15 * 30);
    },
},

{
    name: 'Alcoholic',
    splash: "I can't walk straight...",
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, undefined, body => {
        let angle = body.velocity.direction + Math.sin(body.id + Date.now() / 750),
            speed = body.velocity.length / 30;
        body.velocity.x += Math.cos(angle) * speed;
        body.velocity.y += Math.sin(angle) * speed;
    })
},

{
    name: 'Forced spin',
    splash: "Can't.. stop.. teaming...",
    duration: 20,
    run: body => {
        body.controllers.unshift(new io_plugin_effectRoller_forcedSpin(body));
        setSyncedTimeout(() => body.controllers = body.controllers.filter(x => !(x instanceof io_plugin_effectRoller_forcedSpin)), 20 * 30);
    }
},

{
    name: 'Earthquake',
    splash: 'Welcome to Chile.',
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
    splash: 'Muscle memory be damned.',
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, { acceleration: -1 })
},

{
    name: 'Bounty',
    splash: "EVERYOOOONE! I'M RIGHT HEEERE!!",
    duration: 20,
    run: body => {
        let mark = new Entity(body, body),
            continuePulsing = true;
        mark.define({ PARENT: "plugin_effectRoller_bountyMark", SIZE: body.SIZE });
        setSyncedTimeout(() => { mark.kill(); continuePulsing = false; }, 20 * 30);
    }
}, 

{
    name: 'Introverted Projectiles',
    splash: 'Asocial Ammunition.',
    duration: 20,
    statusEffect: new StatusEffect(20 * 30, undefined, body => {
        let extroverts = [],
            introverts = [];
        for (let i = 0; i < entities.length; i++) {
            if (entities[i].team != body.team && entities[i].team != TEAM_ROOM) {
                extroverts.push(entities[i]);
            } else if (entities[i].id != body.id && entities[i].master.master.id == body.id) {
                introverts.push(entities[i]);
            }
        }
        for (let i = 0; i < introverts.length; i++) {
            let projectile = introverts[i];
            for (let j = 0; j < extroverts.length; j++) {
                let entity = extroverts[j],
                    diffX = projectile.x - entity.x,
                    diffY = projectile.y - entity.y,
                    dist2 = diffX ** 2 + diffY ** 2;
                if (dist2 < 250 ** 2) {
                    let force = 10 * entity.size / Math.max(1500, dist2);
                    projectile.velocity.x -= diffX * force;
                    projectile.velocity.y -= diffY * force;
                }
            }
            if (projectile.velocity.length > projectile.topSpeed) {
                let factor = Math.sqrt(projectile.topSpeed / projectile.velocity.length);
                projectile.velocity.x *= factor;
                projectile.velocity.y *= factor;
            }
        }
    })
},

{
    name: 'Time Bomb',
    splash: 'You will explode in a moment, now go kill people with that information.',
    noEndNotification: true,
    run: body => {
        let o = new Entity(body, body);
        o.define("plugin_effectRoller_bomb");
        o.bindToMaster({ SIZE: 15, ANGLE: 225, LAYER: 1 }, body);
        setSyncedTimeout(() => o.define({ COLOR: 17 }), 10 * 30);
        setSyncedTimeout(() => {
            if (body.isDead()) return;

            let sizeSqrd = 16 + Math.ceil(Math.sqrt(o.size)),
                sizeSqrdTimesSelfLog = sizeSqrd * Math.log(sizeSqrd),
                sizeSqrdPI = sizeSqrd * Math.PI,
                angleShift = 32400 / sizeSqrdPI, // ((360 / sizeSqrt) / (180 / Math.PI)) / 2
                BODY = {
                    HEALTH: Math.sqrt(o.health.max),
                    DAMAGE: Math.sqrt(o.damage),
                    RANGE: sizeSqrd
                };
            for (let i = 0; i < sizeSqrd; i++) {
                let angle1 = i * 180 / sizeSqrdPI,
                    angle2 = i * 180 / sizeSqrdPI + angleShift,
                o1 = new Entity({
                    x: body.x + o.size * Math.cos(angle1),
                    y: body.y + o.size * Math.sin(angle1)
                }, body),
                o2 = new Entity({
                    x: body.x + o.size * Math.cos(angle2),
                    y: body.y + o.size * Math.sin(angle2)
                }, body);

                o1.define("growBullet", false);
                o2.define("growBullet", false);
                o1.define({ BODY }, false);
                o2.define({ BODY }, false);
                o1.velocity.x = -sizeSqrd * Math.cos(angle1);
                o1.velocity.y = -sizeSqrd * Math.sin(angle1);
                o2.velocity.x = sizeSqrdTimesSelfLog * Math.cos(angle2);
                o2.velocity.y = sizeSqrdTimesSelfLog * Math.sin(angle2);
                o1.team = body.team;
                o2.team = body.team;
                o1.life();
                o2.life();
            }

            body.kill();
        }, 15 * 30);
    }
}];

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
class io_plugin_effectRoller_forcedSpin extends IO {
    constructor(body) {
        super(body);
        this.start = Date.now();
    }
    think() {
        let selfTime = Date.now() - this.start;
        if (selfTime % 4000 < 2000) return {
            goal: this.body,
            fire: false,
            main: false,
            alt: false,
            power: false,
            target: {
                x: Math.cos(selfTime / 420) * 2,
                y: Math.sin(selfTime / 666)
            }
        };
    }
}
ioTypes.plugin_effectRoller_lookAtEntity = io_plugin_effectRoller_lookAtEntity;
ioTypes.plugin_effectRoller_forcedSpin = io_plugin_effectRoller_forcedSpin;

Class.plugin_effectRoller_strongerGrowthAnnihilator = {
    PARENT: "genericTank",
    LABEL: "Annihilator",
    SKILL_CAP: Array(10).fill(15),
    SKILL: Array(10).fill(15),
    LEVEL_CAP: 250,
    LEVEL: 250,
    DANGER: 10,
    TEAM: TEAM_ROOM,
    COLOR: getTeamColor(TEAM_ROOM),
    GUNS: [{
        POSITION: { LENGTH: 20.5, WIDTH: 19.5, DELAY: 0.75 },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator]),
            TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
            AUTOFIRE: true
        }
    }]
};

Class.plugin_effectRoller_bomb = {
    PARENT: 'genericTank',
    FACING_TYPE: "bound",
    MOTION_TYPE: "bound",
    COLOR: 17,
    GUNS: [{
        POSITION: { WIDTH: 5, LENGTH: 15 },
        PROPERTIES: {
            SHOOT_SETTINGS: { reload: 1, recoil: 0, shudder: 1, damage: 0, speed: 1.5, spray: 150, size: 0.5, range: 0.15 },
            TYPE: ["bullet", { COLOR: 35, BORDERLESS: true }],
            COLOR: 17,
            AUTOFIRE: true
        }
    }]
};

Class.plugin_effectRoller_bountyMark = {
    PARENT: 'genericEntity',
    COLOR: '#ff0000',
    MOTION_TYPE: 'withMaster',
    SHAPE: 'M 1 0 A 1 1 0 0 0 -1 0 A 1 1 0 0 0 1 0 L 0.8 0 A 0.81 1 0 0 1 -0.8 0 A 0.81 1 0 0 1 0.8 0 M -1.2 -0.1 L -0.6 -0.1 L -0.6 0.1 L -1.2 0.1 L -1.2 -0.1 M -0.1 -0.6 L -0.1 -1.2 L 0.1 -1.2 L 0.1 -0.6 L -0.1 -0.6 M 1.2 0.1 L 0.6 0.1 L 0.6 -0.1 L 1.2 -0.1 L 1.2 0.1 M 0.1 0.6 L 0.1 1.2 L -0.1 1.2 L -0.1 0.6 L 0.1 0.6',
    CONTROLLERS: [['spin', { speed: 0.1, independent: true }]]
};

setTimeout(() => console.log(effects.map((x, i) => i + ': ' + x.name).join('\n')));

module.exports = ({ Events }) => {
    let recent = {},
        regex = /^[!\/$]roll ?(\d*)?$/i,
        rollCooldown = 30; // unit is seconds

    Events.on('chatMessage', ({ message, socket, preventDefault }) => {

        if (!regex.test(message)) return;

        let body = socket.player.body,
            perms = socket.permissions ?? {};

        if (!(perms && perms.infiniteRolls)) {
            if (recent[body.id]) {
                socket.talk('m', `§3§[Effect Roller]§reset§ You need to wait §12§${Math.ceil((recent[body.id] - Date.now()) / 1000)}§reset§ seconds to roll again!`);
                return;
            }

            recent[body.id] = Date.now() + rollCooldown;
            setSyncedTimeout(() => {
                delete recent[body.id];
            }, rollCooldown * 30);
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
            if (effect.duration > 5) {
                setSyncedTimeout(() => socket.talk('m', '§3§[Effect Roller] §2§' + effect.name + '§reset§ is about to end in §12§5§reset§ seconds!'), (effect.duration - 5) * 30);
            } else {
                socket.talk('m', '§3§[Effect Roller] §2§' + effect.name + '§reset§ ends in §12§' + effect.duration + '§reset§ seconds!');
            }
        }

        //rolling vanish would make your chat msg reveal you lmao
        if (effect.stopChatMessage) {
            preventDefault();
        }
    });

    let alreadySeen = [],
    next = [Config.SPAWN_CLASS].flat(),
    limit = 1000;
    while (next.length && limit--) {
        let current = next;
        next = [];
        for (let i = 0; i < current.length; i++) {

            let now = ensureIsClass(current[i]);

            if (alreadySeen.includes(now.LABEL)) continue;
            alreadySeen.push(now.LABEL);
            tanksInTree.push(current[i]);

            if (now.GUNS) {
                projectilesInTree.push(...now.GUNS.filter(gun => gun.PROPERTIES).map(gun => {
                    let { size, health, damage, pen, density, resist } = gun.PROPERTIES.SHOOT_SETTINGS;
                    return { size, health, damage, pen, density, resist, width: gun.PROPERTIES.WIDTH ?? gun.PROPERTIES[1] };
                }));
            }
            if (now.TURRETS) next.push(...now.TURRETS);

            for (let key of Object.keys(now)) if (key.startsWith('UPGRADES_TIER_')) next.push(...now[key]);
        }
    };
};
