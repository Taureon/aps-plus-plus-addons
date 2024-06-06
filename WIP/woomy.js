const { dereference, combineStats, makeAuto } = require('../facilitators.js');
const { base, gunCalcNames, statnames } = require('../constants.js');

module.exports = ({ Config }) => {

// Comment out the line below to enable this addon, uncomment it to disable this addon.
//return console.log('--- Woomy-Arras addon [woomy.js] is disabled. See lines 6-7 to enable it. ---');

Config.LEVEL_CAP = 60
Config.LEVEL_CHEAT_CAP = 60
Config.SPAWN_CLASS = "woomyBasic"
Config.WELCOME_MESSAGE = "You have spawned! Welcome to the game. Hold N to level up.\n"
                    +"You will be invulnerable until you move, shoot, or your timer runs out."

// Prerequisites
const makeMulti = (type, count, name = -1, startRotation = 0) => {
    type = ensureIsClass(type);
    let greekNumbers = ',Double ,Triple ,Quad ,Penta ,Hexa ,Septa ,Octo ,Nona ,Deca ,Hendeca ,Dodeca ,Trideca ,Tetradeca ,Pentadeca ,Hexadeca ,Septadeca ,Octadeca ,Nonadeca ,Icosa ,Henicosa ,Doicosa ,Triaicosa ,Tetraicosa ,Pentaicosa ,Hexaicosa ,Septaicosa ,Octoicosa ,Nonaicosa ,Triaconta '.split(','),
        output = dereference(type),
        fraction = 360 / count;
    output.GUNS = [];
    for (let gun of type.GUNS) {
        for (let i = 0; i < count; i++) {
            let newgun = dereference(gun);
            if (Array.isArray(newgun.POSITION)) {
                newgun.POSITION[5] += startRotation + fraction * i;
            } else {
                newgun.POSITION.ANGLE = (newgun.POSITION.ANGLE ?? 0) + startRotation + fraction * i;
            }
            if (gun.PROPERTIES) newgun.PROPERTIES = gun.PROPERTIES;
            output.GUNS.push(newgun);
        };
    }
    output.LABEL = name == -1 ? (greekNumbers[count - 1] || (count + ' ')) + type.LABEL : name;
    return output;
}
const statNames = statnames
const g = {
    blank: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    double_health: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 2,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    serpenttail: {
        reload: 0.5,
        recoil: 0,
        shudder: 1,
        size: 1,
        health: 75,
        damage: 3,
        pen: 0.75,
        speed: 0,
        maxSpeed: 0,
        range: 5959,
        density: 1,
        spray: 1,
        resist: 1
    },
    sparkle: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.35,
        damage: 1.15,
        pen: 1.35,
        speed: 0.8,
        maxSpeed: 0.8,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    explosion: {
        reload: 1,
        recoil: 0,
        shudder: .1,
        size: 50,
        health: 50,
        damage: .125,
        pen: 100,
        speed: 0,
        maxSpeed: 0,
        range: 1.75,
        density: 5,
        spray: 1,
        resist: 2
    },
    trap: {
        reload: 39,
        recoil: 1,
        shudder: .25,
        size: .65,
        health: 1.025,
        damage: .3,
        pen: 1.08,
        speed: 4.9,
        maxSpeed: 1,
        range: 1.125,
        density: 1,
        spray: 15,
        resist: 3
    },
    swarm: {
        reload: 27,
        recoil: .25,
        shudder: .05,
        size: .4,
        health: .9,
        damage: .235,
        pen: .85,
        speed: 3.5,
        maxSpeed: 1,
        range: 1,
        density: .8,
        spray: 5,
        resist: 1.25
    },
    drone: {
        reload: 60,
        recoil: .25,
        shudder: .1,
        size: .6,
        health: 4.2/*4.334*/,
        damage: 0.3/*.334*/,
        pen: 1.1,
        speed: 2.334,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: .1,
        resist: 1.1
    },
    factory: {
        reload: 72,
        recoil: 1,
        shudder: .1,
        size: .7,
        health: 1.6,
        damage: .2,
        pen: 1,
        speed: 3,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: .1,
        resist: 1
    },
    pushFactory: {
        reload: 72,
        recoil: 1,
        shudder: .1,
        size: .7,
        health: 5,
        damage: .1,
        pen: 1,
        speed: 1.5,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: .1,
        resist: 1
    },
    basic: {
        reload: 20,
        recoil: 1.4,
        shudder: .1,
        size: 1,
        health: 1.8/*2*/,
        damage: 0.15/*.2*/,
        pen: 1,
        speed: 4.5,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 15,
        resist: 1
    },
    command: {
        reload: 3,
        recoil: 1.5,
        shudder: .1,
        size: 1.25,
        health: 1,
        damage: .75,
        pen: .85,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    spam: {
        reload: 1.1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1.1,
        pen: 1,
        speed: .9,
        maxSpeed: .785,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    minion: {
        reload: 1,
        recoil: 1,
        shudder: 2,
        size: 1,
        health: .4,
        damage: .8,
        pen: 1.5,
        speed: 1,
        maxSpeed: 1,
        range: .75,
        density: 1,
        spray: 2,
        resist: 1
    },
    single: {
        reload: 1.1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.05,
        damage: 1.05,
        pen: 1,
        speed: 1.05,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    sniper: {
        reload: 1.32/*1.295*/,
        recoil: 1,
        shudder: .25,
        size: 1,
        health: 1,
        damage: 1.075,
        pen: 1.225,
        speed: 1.25,
        maxSpeed: 1.35,
        range: 1,
        density: 1.1,
        spray: .25,
        resist: 1.1
    },
    assassin: {
        reload: 1.5,
        recoil: 1,
        shudder: .25,
        size: 1,
        health: 1.1,
        damage: 1,
        pen: 1.1,
        speed: 1.1,
        maxSpeed: 1.1,
        range: 1,
        density: 1.05,
        spray: .5,
        resist: 1.05
    },
    ranger: {
        reload: 1.1,
        recoil: 1.1,
        shudder: .5,
        size: 1,
        health: 1.1,
        damage: 1,
        pen: 1,
        speed: 1.3,
        maxSpeed: 1.3,
        range: 1.05,
        density: 1,
        spray: .5,
        resist: 1
    },
    warden: {
        reload: 1.1,
        recoil: 1.05,
        shudder: .5,
        size: 1,
        health: 1.05,
        damage: 1,
        pen: 1,
        speed: 1.05,
        maxSpeed: 1.05,
        range: 1,
        density: 1,
        spray: .5,
        resist: 1
    },
    rifle: {
        reload: .85,
        recoil: .8,
        shudder: 1.5,
        size: .95,
        health: .9,
        damage: .785,
        pen: .9,
        speed: 1.05,
        maxSpeed: 1.05,
        range: 1,
        density: 1,
        spray: 2,
        resist: 1
    },
    pistol: {
        reload: .8,
        recoil: .7,
        shudder: 1.75,
        size: 1,
        health: .95,
        damage: 1,
        pen: .95,
        speed: .9,
        maxSpeed: .9,
        range: 1,
        density: .9,
        spray: 2.5,
        resist: .9
    },
    snake: {
        reload: .4,
        recoil: 1,
        shudder: 4,
        size: 1,
        health: 1.5,
        damage: .9,
        pen: 1.2,
        speed: .2,
        maxSpeed: .35,
        range: 1,
        density: 3,
        spray: 6,
        resist: .5
    },
    sidewind: {
        reload: 1.5,
        recoil: 2,
        shudder: 1,
        size: 1,
        health: 1.6,
        damage: 1,
        pen: 1,
        speed: .2,
        maxSpeed: .6,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    snake_skin: {
        reload: .6,
        recoil: 1,
        shudder: 2,
        size: 1,
        health: .5,
        damage: .5,
        pen: 1,
        speed: 1,
        maxSpeed: .2,
        range: .4,
        density: 1,
        spray: 5,
        resist: 1
    },
    hunter: {
        reload: 1.5,
        recoil: .7,
        shudder: 1,
        size: .8,
        health: .9,
        damage: .8,
        pen: 1,
        speed: 1.05,
        maxSpeed: .8,
        range: 1,
        density: 1.2,
        spray: 1,
        resist: 1.15
    },
    hunter2: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .9,
        damage: .85,
        pen: .9,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: .9,
        spray: 1,
        resist: 1
    },
    preda: {
        reload: 1.3,
        recoil: 1,
        shudder: 1,
        size: .9,
        health: 1.35,
        damage: .9,
        pen: 1.2,
        speed: .9,
        maxSpeed: .9,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    rocket_thrust: {
        reload: .5,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    mach: {
        reload: .5,
        recoil: .8,
        shudder: 1.7,
        size: 1,
        health: .75,
        damage: .8,
        pen: 1,
        speed: 1,
        maxSpeed: .82,
        range: 1,
        density: 1,
        spray: 2.5,
        resist: 1
    },
    blast: {
        reload: .88,
        recoil: 1.25,
        shudder: 1.25,
        size: 1.05,
        health: .95,
        damage: 1.1,
        pen: 1.1,
        speed: .8,
        maxSpeed: .465,
        range: .65,
        density: .5,
        spray: 1.5,
        resist: .8
    },
    chain: {
        reload: 1.25,
        recoil: 1.33,
        shudder: .8,
        size: 1,
        health: .8,
        damage: 1,
        pen: 1,
        speed: 1.25,
        maxSpeed: 1.25,
        range: 1.1,
        density: 1.25,
        spray: .5,
        resist: 1.1
    },
    mini: {
        reload: 1.25,
        recoil: .6,
        shudder: 1,
        size: .8,
        health: .55,
        damage: .55,
        pen: 1,
        speed: 1.315,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: .6,
        resist: 1
    },
    stream: {
        reload: 1.1,
        recoil: .6,
        shudder: 1,
        size: 1,
        health: 1,
        damage: .65,
        pen: 1,
        speed: 1.24,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    smother: {
        reload: 1.2,
        recoil: 1,
        shudder: 1.1,
        size: 1,
        health: .95,
        damage: .95,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: .9,
        resist: 1
    },
    x_smother: {
        reload: 1.325,
        recoil: 1,
        shudder: .9,
        size: 1,
        health: .95,
        damage: .95,
        pen: 1,
        speed: 1.05,
        maxSpeed: 1.1,
        range: .95,
        density: 1,
        spray: .9,
        resist: 1
    },
    barricade: {
        reload: .475,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .9,
        damage: 1.15,
        pen: .9,
        speed: 1.1,
        maxSpeed: 1,
        range: .5,
        density: 1,
        spray: 1,
        resist: 1
    },
    sgun: {
        reload: 9,
        recoil: .325,
        shudder: 1.1,
        size: 1.5,
        health: 1,
        damage: .75,
        pen: .72,
        speed: 1.675,
        maxSpeed: .6,
        range: 1,
        density: 1.2,
        spray: 1.2,
        resist: 1
    },
    flank: {
        reload: 1,
        recoil: 1.2,
        shudder: 1,
        size: 1,
        health: 1,
        damage: .95,
        pen: .9,
        speed: 1,
        maxSpeed: .875,
        range: 1,
        density: 1.2,
        spray: 1,
        resist: 1
    },
    tri: {
        reload: 1,
        recoil: .9,
        shudder: 1,
        size: 1,
        health: 1,
        damage: .95,
        pen: .95,
        speed: .8,
        maxSpeed: .8,
        range: .6,
        density: 1,
        spray: 1,
        resist: 1
    },
    tri_front: {
        reload: 1,
        recoil: .2,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1.3,
        maxSpeed: 1.1,
        range: 1.5,
        density: 1,
        spray: 1,
        resist: 1
    },
    thruster: {
        reload: 1,
        recoil: 1.33,
        shudder: 2,
        size: 1,
        health: .5,
        damage: .5,
        pen: .7,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: .5,
        resist: .7
    },
    auto: {
        reload: 1.1,
        recoil: .75,
        shudder: .5,
        size: .8,
        health: 1.5,
        damage: .45,
        pen: 1.5,
        speed: 1.1,
        maxSpeed: 1,
        range: .8,
        density: 1.25,
        spray: 1,
        resist: 1.25
    },
    five: {
        reload: 1.125,
        recoil: 1,
        shudder: 1.1,
        size: 1,
        health: .85,
        damage: .85,
        pen: 1.2,
        speed: 1.05,
        maxSpeed: 1.05,
        range: 1.1,
        density: 1,
        spray: 1.1,
        resist: 1
    },
    seven: {
        reload: 1.15,
        recoil: .9,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1.05,
        density: 1.75,
        spray: 1.1,
        resist: 1
    },
    snipe3: {
        reload: 1.85,
        recoil: 1,
        shudder: .25,
        size: 1.4,
        health: 1,
        damage: .95,
        pen: .95,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 2,
        spray: .5,
        resist: 1.3
    },
    heavy3: {
        reload: .95,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.1,
        damage: 1.1,
        pen: 1.1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    clusterbomb: {
        reload: 2.15,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.8,
        damage: 1.375,
        pen: 1.5,
        speed: .7,
        maxSpeed: .7,
        range: .67,
        density: 1,
        spray: 1,
        resist: 1
    },
    clbexplode: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: .4,
        density: 1,
        spray: 1,
        resist: 1
    },
    giga3: {
        reload: 1.25,
        recoil: 1.3,
        shudder: 1,
        size: 1.1,
        health: .9,
        damage: .9,
        pen: .9,
        speed: 1,
        maxSpeed: .95,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    boomer3: {
        reload: 1.1,
        recoil: 1,
        shudder: 1,
        size: 1.25,
        health: .95,
        damage: .95,
        pen: .95,
        speed: 1,
        maxSpeed: .95,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    auto_turret: {
        reload: 1.1,
        recoil: .3,
        shudder: .9,
        size: 1.125,
        health: .6,
        damage: .255,
        pen: .94,
        speed: 1.6,
        maxSpeed: 1.2,
        range: 1,
        density: .3,
        spray: .75,
        resist: 1.75
    },
    sanctuaryPoly: {
        reload: 1,
        recoil: 0,
        shudder: .01,
        size: 1,
        health: 1.1,
        damage: 1.2,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    super_auto: {
        reload: 3.5,
        recoil: 0,
        shudder: .65,
        size: .9,
        health: .85,
        damage: .75,
        pen: 1.15,
        speed: 1.1,
        maxSpeed: 1.1,
        range: .875,
        density: 1.3,
        spray: 1.1,
        resist: 1.25
    },
    defend_auto: {
        reload: 1.25,
        recoil: 1,
        shudder: 1.1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1.2,
        maxSpeed: 1,
        range: 1.1,
        density: 1,
        spray: 1.1,
        resist: 1
    },
    legacyclose: {
        reload: 1.2,
        recoil: 0.2,
        shudder: 0.5,
        size: 1,
        health: 5.5,
        damage: 0.55,
        pen: 2.25,
        speed: 2,
        maxSpeed: 3,
        range: 1,
        density: 1.6,
        spray: 0.5,
        resist: 1.15
    },
    sans: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 50,
        damage: 0.1,
        pen: 4,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1.6,
        spray: 0.5,
        resist: 1.15
    },
    pound: {
        reload: 2,
        recoil: 1.75,
        shudder: 1,
        size: 1,
        health: 1.1,
        damage: 1.65,
        pen: 1.05,
        speed: .875,
        maxSpeed: .925,
        range: 1,
        density: 1.6,
        spray: 1,
        resist: 1.15
    },
    destroy: {
        reload: 2.25,
        recoil: 1.85,
        shudder: .5,
        size: 1,
        health: 1.72,
        damage: 1.65,
        pen: 1.2,
        speed: .75,
        maxSpeed: .575,
        range: 1,
        density: 1.6,
        spray: 1,
        resist: 3
    },
    anni: {
        reload: 1,
        recoil: 1.2,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1.2,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    rainbowMegaTrap: {
        reload: 1,
        recoil: 1.75,
        shudder: 1,
        size: 2.5,
        health: 1.1,
        damage: 1.65,
        pen: 1.05,
        speed: .675,
        maxSpeed: .725,
        range: 1,
        density: 1.6,
        spray: 1,
        resist: 1.15
    },
    steam: {
        reload: 1.125,
        recoil: 1,
        shudder: .85,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1.25,
        maxSpeed: 1.1,
        range: 1,
        density: 1,
        spray: .85,
        resist: 1
    },
    shell: {
        reload: 2.5,
        recoil: 1.75,
        shudder: 1,
        size: .7,
        health: .7,
        damage: 1,
        pen: .9,
        speed: .8,
        maxSpeed: .925,
        range: .7,
        density: 1.6,
        spray: 1,
        resist: 1.15
    },
    sShell: {
        reload: 3.5,
        recoil: 1.75,
        shudder: 1,
        size: .7,
        health: .7,
        damage: 1,
        pen: .9,
        speed: 1,
        maxSpeed: 1.2,
        range: .7,
        density: 1.6,
        spray: 1,
        resist: 1.15
    },
    ssShell: {
        reload: 4.7,
        recoil: 1.75,
        shudder: 1,
        size: .7,
        health: .7,
        damage: 1,
        pen: .9,
        speed: 1.5,
        maxSpeed: 1.7,
        range: .7,
        density: 1.6,
        spray: 1,
        resist: 1.15
    },
    decentralize: {
        reload: 1.24,
        recoil: 1.3,
        shudder: 1.1,
        size: 1.25,
        health: 1.1,
        damage: 1.1,
        pen: 1.1,
        speed: 1.1,
        maxSpeed: 1.075,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    intercept: {
        reload: 1.375,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: .975,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: .925,
        density: 1,
        spray: 1,
        resist: 1
    },
    wreck: {
        reload: 1.25,
        recoil: .7,
        shudder: 1,
        size: 1,
        health: .9,
        damage: .9,
        pen: .9,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: .9,
        spray: 1,
        resist: .9
    },
    op_anni: {
        reload: .5,
        recoil: 0,
        shudder: .25,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 2,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    mini_hive: {
        reload: 1.05,
        recoil: .25,
        shudder: 1,
        size: .9,
        health: .85,
        damage: .9,
        pen: 1,
        speed: 1,
        maxSpeed: .6,
        range: .925,
        density: .95,
        spray: 1,
        resist: .95
    },
    hive: {
        reload: .75,
        recoil: .3,
        shudder: 1,
        size: .8,
        health: .85,
        damage: .65,
        pen: 1,
        speed: 1.05,
        maxSpeed: .65,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    arty: {
        reload: 1.175,
        recoil: .75,
        shudder: 1,
        size: .9,
        health: 1,
        damage: .975,
        pen: 1.01,
        speed: 1.15,
        maxSpeed: 1.1,
        range: 1,
        density: 1.5,
        spray: 1,
        resist: 1
    },
    mortar: {
        reload: 1.2,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.1,
        damage: 1,
        pen: 1,
        speed: .8,
        maxSpeed: .8,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    spread_main: {
        reload: .75,
        recoil: .25,
        shudder: .5,
        size: 1,
        health: .63,
        damage: 1,
        pen: .9,
        speed: 1.92,
        maxSpeed: 1.154,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    spread: {
        reload: 1.5,
        recoil: 1,
        shudder: .25,
        size: 1,
        health: 1.1,
        damage: 1.16,
        pen: 1,
        speed: .7,
        maxSpeed: .7,
        range: 1,
        density: 1,
        spray: .25,
        resist: 1
    },
    spread1: {
        reload: 2.2,
        recoil: .4375,
        shudder: .125,
        size: 1,
        health: .65,
        damage: 1.7,
        pen: .95,
        speed: 1.05,
        maxSpeed: .75,
        range: 1,
        density: 1.5,
        spray: .25,
        resist: 1.15
    },
    spread2: {
        reload: 1,
        recoil: .1,
        shudder: .345,
        size: 1,
        health: .835,
        damage: .495,
        pen: 1.2,
        speed: .825,
        maxSpeed: .775,
        range: 1,
        density: .9,
        spray: .5,
        resist: .8
    },
    skim: {
        reload: 1.275,
        recoil: .8,
        shudder: .8,
        size: .9,
        health: 1.35,
        damage: 1.05,
        pen: 2,
        speed: .4,
        maxSpeed: .4,
        range: 1.325,
        density: 1,
        spray: 1,
        resist: .995
    },
    dustbowlDust: {
        reload: 0.95,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.1,
        damage: 0.95,
        pen: 1.5,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 2
    },
    twin: {
        reload: 1.125,
        recoil: .6,
        shudder: .9,
        size: 1,
        health: .85,
        damage: .9,
        pen: .925,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1.2,
        resist: 1
    },
    bent: {
        reload: 1,
        recoil: 1,
        shudder: .8,
        size: 1,
        health: .85,
        damage: 1,
        pen: .85,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: .8,
        spray: .5,
        resist: 1
    },
    triplet: {
        reload: 1.2,
        recoil: .6666666666666666,
        shudder: .9,
        size: 1,
        health: .815,
        damage: .95,
        pen: .9,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1.1,
        spray: .9,
        resist: .95
    },
    quint: {
        reload: 1.385,
        recoil: .6666666666666666,
        shudder: 1,
        size: 1,
        health: 1,
        damage: .95,
        pen: .95,
        speed: 1,
        maxSpeed: .975,
        range: 1,
        density: 1,
        spray: .9,
        resist: .9
    },
    dual: {
        reload: 2.85,
        recoil: 1,
        shudder: .8,
        size: .98,
        health: 1.32,
        damage: 1,
        pen: 1.1,
        speed: 1.3,
        maxSpeed: 1.1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1.25
    },
    dual2: {
        reload: 1,
        recoil: 1,
        shudder: .8,
        size: 1,
        health: .5,
        damage: .55,
        pen: .7,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: .75
    },
    double: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .9,
        damage: .9,
        pen: .9,
        speed: 1,
        maxSpeed: .975,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    hewn: {
        reload: 1.25,
        recoil: 1.5,
        shudder: 1,
        size: 1,
        health: .95,
        damage: .9,
        pen: 1,
        speed: 1,
        maxSpeed: .95,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    pure_gunner: {
        reload: 1,
        recoil: .25,
        shudder: 1,
        size: 1.1,
        health: 1.45,
        damage: .3,
        pen: 1.25,
        speed: .9,
        maxSpeed: 1,
        range: 1,
        density: 1.5,
        spray: 1,
        resist: 1.2
    },
    machgun: {
        reload: .66,
        recoil: .8,
        shudder: 2,
        size: 1,
        health: .95,
        damage: .75,
        pen: .9,
        speed: 1.125,
        maxSpeed: .8,
        range: 1,
        density: 1,
        spray: 2.5,
        resist: 1
    },
    gunner: {
        reload: 1.25,
        recoil: .25,
        shudder: 1.5,
        size: 1.1,
        health: 1,
        damage: .35,
        pen: 1.25,
        speed: .9,
        maxSpeed: .8,
        range: 1,
        density: 1.5,
        spray: 1.5,
        resist: 1.2
    },
    power: {
        reload: 1,
        recoil: 1,
        shudder: .6,
        size: 1.2,
        health: 1,
        damage: 1,
        pen: 1.25,
        speed: 2,
        maxSpeed: 1.7,
        range: 1,
        density: 2,
        spray: .5,
        resist: 1.5
    },
    nail: {
        reload: .85,
        recoil: 2.5,
        shudder: 1,
        size: .8,
        health: 1.15,
        damage: .8,
        pen: 1.1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 2,
        spray: 1,
        resist: 1
    },
    pebble: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1.21,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1.125,
        maxSpeed: 1.1,
        range: 1,
        density: .5,
        spray: 1,
        resist: .5
    },
    nano: {
        reload: 1.3,
        recoil: 1,
        shudder: 1,
        size: 1.5,
        health: 1,
        damage: 1.25,
        pen: 1.5,
        speed: 1.25,
        maxSpeed: 1.15,
        range: 1,
        density: .4,
        spray: 1,
        resist: .4
    },
    staple: {
        reload: 1.25,
        recoil: 1,
        shudder: 1.1,
        size: 1,
        health: .95,
        damage: .65,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: .9,
        resist: 1
    },
    turret: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: .85,
        health: .6,
        damage: .6,
        pen: .6,
        speed: .9,
        maxSpeed: .85,
        range: 1,
        density: .1,
        spray: 1,
        resist: 1
    },
    bees: {
        reload: 1.8,
        recoil: 1,
        shudder: 1,
        size: 1.4,
        health: 1.3,
        damage: .9,
        pen: .65,
        speed: 3,
        maxSpeed: 1.5,
        range: 1,
        density: .25,
        spray: 1,
        resist: 1
    },
    battle: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.2,
        damage: 1.1,
        pen: 1,
        speed: .8,
        maxSpeed: 1.15,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1.1
    },
    tempest: {
        reload: .4,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 2.5,
        damage: .3,
        pen: .7,
        speed: 6.75,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    carrier: {
        reload: 1.1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: .9,
        pen: 1,
        speed: 1.2,
        maxSpeed: 1.2,
        range: 1.1,
        density: 1,
        spray: 1,
        resist: 1
    },
    hexatrap: {
        reload: 1.25,
        recoil: 1,
        shudder: 1.2,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: .8,
        maxSpeed: 1,
        range: .575,
        density: 1,
        spray: 1,
        resist: 1
    },
    octog: {
        reload: 1.25,
        recoil: 0,
        shudder: .25,
        size: 1.45,
        health: 1,
        damage: 1,
        pen: 1,
        speed: .6,
        maxSpeed: 1,
        range: 1.1,
        density: 1,
        spray: 1,
        resist: 1
    },
    defend: {
        reload: 1.24,
        recoil: 1,
        shudder: .25,
        size: .85,
        health: 1.1,
        damage: 1.2,
        pen: 1.1,
        speed: .85,
        maxSpeed: 1,
        range: 2.3,
        density: 1,
        spray: 1,
        resist: 1
    },
    block: {
        reload: 1.25,
        recoil: 2,
        shudder: .1,
        size: 1.5,
        health: 1.875,
        damage: 1,
        pen: .95,
        speed: 1.475,
        maxSpeed: 2.475,
        range: 1.215,
        density: 1.1,
        spray: 1,
        resist: 1.5
    },
    construct: {
        reload: 1.3,
        recoil: 1,
        shudder: 1,
        size: .9,
        health: 1,
        damage: 1.45,
        pen: 1,
        speed: .87,
        maxSpeed: .95,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    boomerang: {
        reload: .8,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.1,
        damage: .7,
        pen: 1.5,
        speed: .8,
        maxSpeed: .75,
        range: 1.35,
        density: 1,
        spray: 1,
        resist: 1
    },
    decalibrate: {
        reload: 1.45,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.1,
        damage: 1.15,
        pen: 1.1,
        speed: .95,
        maxSpeed: .925,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    over: {
        reload: 1.15,
        recoil: 1,
        shudder: 1,
        size: .85,
        health: .7,
        damage: .75,
        pen: 1,
        speed: 1,
        maxSpeed: .9,
        range: 1,
        density: 2,
        spray: 1,
        resist: 1
    },
    meta: {
        reload: 1.25,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .85,
        damage: .8,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    weak: {
        reload: 2,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .6,
        damage: .6,
        pen: .8,
        speed: .5,
        maxSpeed: .7,
        range: .25,
        density: .3,
        spray: 1,
        resist: 1
    },
    master: {
        reload: 1.7,
        recoil: 1,
        shudder: 1,
        size: .7,
        health: .7,
        damage: .5,
        pen: .7,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: .7,
        spray: 1,
        resist: 1
    },
    sunchip: {
        reload: 2.45,
        recoil: 1,
        shudder: 1,
        size: 1.35,
        health: .525,
        damage: .35,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    pentachip: {
        reload: 1.05,
        recoil: 1,
        shudder: 1,
        size: .95,
        health: 1.1,
        damage: 1.05,
        pen: 1,
        speed: .925,
        maxSpeed: .925,
        range: 1,
        density: 1.2,
        spray: 1,
        resist: 1
    },
    dorito: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: .75,
        health: 1,
        damage: 1.1,
        pen: 1,
        speed: .95,
        maxSpeed: .95,
        range: 1,
        density: 1.1,
        spray: 1,
        resist: 1
    },
    malefict: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1.05,
        health: 1.1,
        damage: 1.1,
        pen: 1.1,
        speed: .8,
        maxSpeed: .8,
        range: 1,
        density: 1.15,
        spray: 1,
        resist: 1
    },
    enchantress: {
        reload: .425,
        recoil: 1,
        shudder: 1,
        size: 0.835,
        health: .45,
        damage: .55,
        pen: .5,
        speed: 0.9,
        maxSpeed: 0.9,
        range: 1,
        density: .8,
        spray: 1,
        resist: 1
    },
    excorcist: {
        reload: .675,
        recoil: 1,
        shudder: 1,
        size: 0.95,
        health: .75,
        damage: .75,
        pen: .75,
        speed: 0.8,
        maxSpeed: 0.8,
        range: 1,
        density: .8,
        spray: 1,
        resist: 1
    },
    sorcer: {
        reload: .125,
        recoil: 1,
        shudder: 1,
        size: 0.85,
        health: .25,
        damage: .25,
        pen: .15,
        speed: 1.3,
        maxSpeed: 1.3,
        range: 1,
        density: .8,
        spray: 1,
        resist: 1
    },
    summon: {
        reload: .35,
        recoil: 1,
        shudder: 1,
        size: 1.125,
        health: .4,
        damage: .35,
        pen: .4,
        speed: 0.95,
        maxSpeed: 0.95,
        range: 1,
        density: .8,
        spray: 1,
        resist: 1
    },
    baby_factory: {
        reload: 1.5,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 0.8,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1.35,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    no_recoil: {
        reload: 1,
        recoil: 0,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    half_recoil: {
        reload: 1,
        recoil: .5,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    less_recoil: {
        reload: 1,
        recoil: .65,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    bit_less_recoil: {
        reload: 1,
        recoil: .8,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    more_recoil: {
        reload: 1,
        recoil: 1.15,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    much_more_recoil: {
        reload: 1,
        recoil: 1.35,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    lots_more_recoil: {
        reload: 1,
        recoil: 1.8,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    tons_more_recoil: {
        reload: 1,
        recoil: 4,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    triple_reload: {
        reload: .3333333333333333,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    quintuple_reload: {
        reload: .2,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    double_reload: {
        reload: .5,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    unfathomable_reload: {
        reload: .0001,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    more_reload: {
        reload: .85,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    bit_more_reload: {
        reload: .9,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    bit_less_reload: {
        reload: 1.1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    one_fifth_reload: {
        reload: 1.2,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    one_fourth_reload: {
        reload: 1.25,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    one_third_reload: {
        reload: 1.333,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    less_reload: {
        reload: 1.5,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    half_reload: {
        reload: 2,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    destroy_dominator: {
        reload: 6.5,
        recoil: 0,
        shudder: 1,
        size: .975,
        health: 6,
        damage: 6,
        pen: 6,
        speed: .575,
        maxSpeed: .475,
        range: 1,
        density: 1,
        spray: .5,
        resist: 1
    },
    gun_dominator: {
        reload: 1.1,
        recoil: 0,
        shudder: 1.1,
        size: .5,
        health: .5,
        damage: .5,
        pen: 1,
        speed: 1.1,
        maxSpeed: 1,
        range: 1,
        density: .9,
        spray: 1.2,
        resist: .8
    },
    trap_dominator: {
        reload: .8,
        recoil: 0,
        shudder: .25,
        size: 1,
        health: .8,
        damage: 1,
        pen: 1.3,
        speed: .5,
        maxSpeed: 2,
        range: .7,
        density: 1,
        spray: .5,
        resist: 1
    },
    drone_dominator: {
        reload: 1.5,
        recoil: 0,
        shudder: 1,
        size: 1,
        health: 1,
        damage: .8,
        pen: 1.3,
        speed: 1,
        maxSpeed: .9,
        range: 1,
        density: 1.25,
        spray: 1,
        resist: 1
    },
    auto_dominator: {
        reload: 2.3,
        recoil: 0,
        shudder: .75,
        size: .85,
        health: .8,
        damage: .525,
        pen: 1,
        speed: 1.1,
        maxSpeed: 1,
        range: .9,
        density: 1.15,
        spray: 1,
        resist: 1.1
    },
    dem_trap: {
        reload: 1.35,
        recoil: 0,
        shudder: .5,
        size: 1.25,
        health: 1.05,
        damage: 1,
        pen: 1.25,
        speed: .5,
        maxSpeed: 1.55,
        range: 1,
        density: 1,
        spray: .5,
        resist: 1
    },
    dem_mach: {
        reload: 2.85,
        recoil: 0,
        shudder: 1.25,
        size: .55,
        health: .75,
        damage: .25,
        pen: .75,
        speed: 1,
        maxSpeed: .85,
        range: 1,
        density: 1,
        spray: 1.25,
        resist: 1
    },
    dem_factory: {
        reload: 175,
        recoil: 0,
        shudder: .25,
        size: .315,
        health: .5,
        damage: .5,
        pen: .5,
        speed: 2.45,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: .5,
        resist: 1
    },
    dem_minion: {
        reload: 1.35,
        recoil: .95,
        shudder: 1.85,
        size: .9,
        health: .4,
        damage: .35,
        pen: .4,
        speed: .5,
        maxSpeed: 1,
        range: .75,
        density: 1,
        spray: 1.85,
        resist: 1
    },
    more_speed: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1.3,
        maxSpeed: 1.3,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    double_speed: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 2,
        maxSpeed: 2,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    fast: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1.2,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    faster: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1.1,
        maxSpeed: 1.1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    bit_slow: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: .9,
        maxSpeed: .9,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    slow: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: .7,
        maxSpeed: .7,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    fried_egg: {
        reload: .4,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: .0001,
        maxSpeed: .0001,
        range: 15,
        density: 1,
        spray: 1,
        resist: 1
    },
    charge: {
        reload: 1,
        recoil: 1,
        shudder: .5,
        size: 1,
        health: 1,
        damage: .9,
        pen: 1,
        speed: .75,
        maxSpeed: .75,
        range: 1,
        density: 1,
        spray: 1.15,
        resist: 1
    },
    not_dense: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: .1,
        spray: 1,
        resist: 1
    },
    half_range: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: .5,
        density: 1,
        spray: 1,
        resist: 1
    },
    less_range: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: .85,
        density: 1,
        spray: 1,
        resist: 1
    },
    micro_range: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: .001,
        density: 1,
        spray: 1,
        resist: 1
    },
    more_range: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1.15,
        density: 1,
        spray: 1,
        resist: 1
    },
    extra_range: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1.5,
        density: 1,
        spray: 1,
        resist: 1
    },
    double_range: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 2,
        density: 1,
        spray: 1,
        resist: 1
    },
    fake: {
        reload: 1,
        recoil: 0,
        shudder: 1,
        size: .00001,
        health: .0001,
        damage: 1,
        pen: 1,
        speed: .0001,
        maxSpeed: .0001,
        range: 0,
        density: 1,
        spray: 1,
        resist: 1
    },
    testbed: {
        reload: 1,
        recoil: .5,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1.2,
        pen: 1,
        speed: 1.2,
        maxSpeed: 1.15,
        range: 1,
        density: 1.25,
        spray: 1,
        resist: 1
    },
    closer: {
        reload: 1.25,
        recoil: .25,
        shudder: 1,
        size: 1,
        health: 1000,
        damage: 1000,
        pen: 1000,
        speed: 2.5,
        maxSpeed: 2.25,
        range: 1.4,
        density: 4,
        spray: .25,
        resist: 1
    },
    closer_drone: {
        reload: 1.5,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1000,
        damage: 1000,
        pen: 1000,
        speed: 2.5,
        maxSpeed: 2.25,
        range: 1,
        density: 4,
        spray: .25,
        resist: 1
    },
    closer_ai: {
        reload: .625,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 100000,
        damage: 100000,
        pen: 100000,
        speed: 5,
        maxSpeed: 4.85,
        range: 1.5,
        density: 10,
        spray: .25,
        resist: 10
    },
    closer_ai_drone: {
        reload: .75,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 100000,
        damage: 100000,
        pen: 100000,
        speed: 5.5,
        maxSpeed: 5,
        range: 1,
        density: 10,
        spray: .25,
        resist: 10
    },
    protect_swarm: {
        reload: 3.5,
        recoil: 0,
        shudder: 1,
        size: 1.6,
        health: 200,
        damage: 1.5,
        pen: 1,
        speed: 1,
        maxSpeed: .95,
        range: 1,
        density: 5,
        spray: 1,
        resist: 5
    },
    protectordrone: {
        reload: .5,
        recoil: 0,
        shudder: 1,
        size: 1,
        health: 75000,
        damage: .5,
        pen: .15,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 10,
        spray: .1,
        resist: 10
    },
    dread: {
        reload: .855,
        recoil: .25,
        shudder: .75,
        size: .95,
        health: 1.2,
        damage: 1.05,
        pen: 1.05,
        speed: 1,
        maxSpeed: .9,
        range: 1,
        density: 1,
        spray: 1.25,
        resist: 1
    },
    dread_trap: {
        reload: 1.15,
        recoil: .5,
        shudder: .25,
        size: .975,
        health: 1.05,
        damage: 1.05,
        pen: 1.05,
        speed: 1.1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 3
    },
    half_speed: {
        reload: 1,
        recoil: 0,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: .5,
        maxSpeed: .5,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    bit_smaller: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: .84,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    little_bit_smaller: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: .93,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    mach_smaller: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: .8,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    smaller: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: .75,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    even_smaller: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: .6,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    half_size: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: .5,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    pellet: {
        reload: .775,
        recoil: 1,
        shudder: .75,
        size: 1,
        health: 1.25,
        damage: 1.25,
        pen: 1.225,
        speed: 1.2,
        maxSpeed: 1.175,
        range: 1,
        density: 1,
        spray: .75,
        resist: 1
    },
    bore: {
        reload: 1.2,
        recoil: 1,
        shudder: .7,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1.375,
        maxSpeed: 1.35,
        range: 1,
        density: 1,
        spray: .7,
        resist: 1
    },
    punt: {
        reload: 1.25,
        recoil: 1,
        shudder: 1.5,
        size: 1,
        health: .8,
        damage: .85,
        pen: .8,
        speed: .95,
        maxSpeed: .925,
        range: 1,
        density: 1,
        spray: 2,
        resist: 1
    },
    triple_size: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 2,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    double_size: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 2,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    bigger: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1.25,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    bit_bigger: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1.16,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    little_bit_bigger: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1.091,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    very_little_bit_bigger: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1.067,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    double_size: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 2,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    near_double_size: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1.85,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    low_power: {
        reload: 1,
        recoil: 1,
        shudder: 2,
        size: 1,
        health: .5,
        damage: .5,
        pen: .7,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: .5,
        resist: .7
    },
    lower_power: {
        reload: 1,
        recoil: 0,
        shudder: 1.25,
        size: 1,
        health: .5,
        damage: .5,
        pen: .75,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1.25,
        resist: 1
    },
    half_power: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .5,
        damage: .5,
        pen: .5,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    less_power: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .9,
        damage: .9,
        pen: .9,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    more_power: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.1,
        damage: 1.1,
        pen: 1.1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    more_damage: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.15,
        damage: 1.1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    three_fourths_more_damage: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1.75,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    bit_more_damage: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.05,
        damage: 1.1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    bit_less_damage: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .95,
        damage: .9,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    less_damage: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .9,
        damage: .85,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    pl_damage: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.5,
        damage: 12,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 6,
        spray: 1,
        resist: 1
    },
    damage_m25: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: .75,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    damage_m30: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: .7,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    damage_p30: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1.3,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    reload_m5: {
        reload: 1.05,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    recoil_m40: {
        reload: 1,
        recoil: .6,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    oxyrr: {
        reload: 1.21,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .81, 
        damage: .85,
        pen: 1,
        speed: .9,
        maxSpeed: .9,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    half_damage: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .6,
        damage: .5,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    vulc: {
        reload: 1.25,
        recoil: .1,
        shudder: .0001,
        size: .8,
        health: .8,
        damage: .5,
        pen: 1,
        speed: 1.3,
        maxSpeed: 1.3,
        range: 1,
        density: 1.25,
        spray: .001,
        resist: 1.1
    },
    fallen_overlord: {
        reload: .25,
        recoil: 1,
        shudder: 1,
        size: .35,
        health: .4,
        damage: .3,
        pen: .4,
        speed: .76,
        maxSpeed: .9,
        range: 1,
        density: 2,
        spray: 1,
        resist: 1
    },
    demoman: {
        reload: 1.5,
        recoil: 1.25,
        shudder: 1.5,
        size: 1,
        health: 1,
        damage: .75,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: .9,
        spray: 1,
        resist: .9
    },
    rocket: {
        reload: .48,
        recoil: 2,
        shudder: 1.5,
        size: .85,
        health: .25,
        damage: .25,
        pen: .25,
        speed: .75,
        maxSpeed: 1,
        range: .5,
        density: 1,
        spray: 1.25,
        resist: 1
    },
    jump: {
        reload: 11,
        recoil: 30,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    jumpSmash: {
        reload: 12,
        recoil: 18,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    guardian: {
        reload: .45,
        recoil: 8,
        shudder: 1,
        size: .7,
        health: 2,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1.8,
        density: .25,
        spray: 1,
        resist: .25
    },
    flame: {
        reload: .518,
        recoil: 1.25,
        shudder: 4.25,
        size: .25,
        health: 1.25,
        damage: 1.25,
        pen: 2,
        speed: .8,
        maxSpeed: 0,
        range: 1.85,
        density: 1,
        spray: 3,
        resist: 1.6
    },
    levi_five: {
        reload: 1.15,
        recoil: 0,
        shudder: 1,
        size: 1,
        health: .95,
        damage: .95,
        pen: .95,
        speed: 1.125,
        maxSpeed: 1.1,
        range: 1.15,
        density: 2,
        spray: 1.1,
        resist: 1
    },
    levi: {
        reload: 2,
        recoil: 0,
        shudder: 1.25,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: .65,
        maxSpeed: 1,
        range: .75,
        density: 1,
        spray: 1,
        resist: 1
    },
    a_lotta_damage: {
        reload: .8,
        recoil: 1,
        shudder: 1,
        size: 1.2,
        health: 1.5,
        damage: 1.75,
        pen: 1.25,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    trap_minion: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1.15,
        health: .7,
        damage: .7,
        pen: 1.15,
        speed: 1,
        maxSpeed: 1,
        range: .75,
        density: 1,
        spray: 1.1,
        resist: 1
    },
    very_fast_launch: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 2.2,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    slow_launch: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 0.6,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    fast_launch: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1.4,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    less_spread: {
        reload: 1,
        recoil: 1,
        shudder: .75,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: .75,
        resist: 1
    },
    click: {
        reload: 1.25,
        recoil: .275,
        shudder: .5,
        size: 1,
        health: .58,
        damage: .6,
        pen: .53,
        speed: .98,
        maxSpeed: .975,
        range: 1,
        density: .875,
        spray: 2,
        resist: .9
    },
    socker: {
        reload: 1.25,
        recoil: 1.2,
        shudder: 1,
        size: .9,
        health: 1.1,
        damage: 1.15,
        pen: 1.1,
        speed: .875,
        maxSpeed: .875,
        range: .95,
        density: .55,
        spray: 1,
        resist: .55
    },
    circle: {
        reload: 1.575,
        recoil: 2,
        shudder: 1,
        size: 1.1,
        health: 1,
        damage: 1.1,
        pen: 1.1,
        speed: 1,
        maxSpeed: 1,
        range: .9,
        density: 1,
        spray: 1,
        resist: 1.1
    },
    mothership: {
        reload: 1.25,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1.1,
        speed: .775,
        maxSpeed: .8,
        range: 15,
        density: 1,
        spray: 1,
        resist: 1.15
    },
    skimboss: {
        reload: 1,
        recoil: .5,
        shudder: 1,
        size: .9,
        health: 1.2,
        damage: 1.2,
        pen: 1.2,
        speed: 1.1,
        maxSpeed: 1,
        range: .7,
        density: 1,
        spray: 1,
        resist: 1
    },
    quadtrap: {
        reload: 1.15,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .75,
        damage: .8,
        pen: .8,
        speed: 1.4,
        maxSpeed: .9,
        range: .75,
        density: .9,
        spray: 1,
        resist: .9
    },
    laser: {
        reload: .355,
        recoil: .2,
        shudder: 1,
        size: 1,
        health: .61,
        damage: .53,
        pen: .6,
        speed: 1.35,
        maxSpeed: 1,
        range: 1,
        density: .3,
        spray: .05,
        resist: .5
    },
    basemaker: {
        reload: 2.5,
        recoil: 1.4,
        shudder: .1,
        size: 1,
        health: 1,
        damage: .5,
        pen: 1,
        speed: .5,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 15,
        resist: 1
    },
    stronger: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.05,
        damage: 1.05,
        pen: 1,
        speed: 1.1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    bit_less_knock: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: .95,
        spray: 1,
        resist: .95
    },
    contra: {
        reload: .825,
        recoil: 1,
        shudder: 1,
        size: 1.26,
        health: 1.05,
        damage: 1.1,
        pen: 1,
        speed: 1.1,
        maxSpeed: 1,
        range: 1.05,
        density: 1.05,
        spray: 1,
        resist: 1.05
    },
    redistribute: {
        reload: 4.75,
        recoil: 3,
        shudder: 1,
        size: .4,
        health: 1.9,
        damage: 2.4,
        pen: 1.8,
        speed: 2,
        maxSpeed: 1.85,
        range: 1,
        density: 1.25,
        spray: 1.15,
        resist: 1.25
    },
    acolyte: {
        reload: .1,
        recoil: 4,
        shudder: 1,
        size: 1,
        health: 1.35,
        damage: 1.35,
        pen: 1.4,
        speed: 2,
        maxSpeed: 1.85,
        range: 1,
        density: 1.25,
        spray: 1.15,
        resist: 1.25
    },
    much_less_knock: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: .1,
        spray: 1,
        resist: .1
    },
    tele: {
        reload: 9,
        recoil: 50,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    hivemind: {
        reload: 2.25,
        recoil: 0,
        shudder: 1,
        size: 1.4,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    xenon: {
        reload: 6,
        recoil: 9,
        shudder: 1,
        size: 1.4,
        health: 1,
        damage: 1,
        pen: 1,
        speed: .9,
        maxSpeed: .9,
        range: 1.75/*1.9*/,
        density: 1,
        spray: 1,
        resist: 1
    },
    splitter: {
        reload: .65,
        recoil: 0,
        shudder: 1,
        size: 1.4,
        health: .5,
        damage: .5,
        pen: 1.5,
        speed: .525,
        maxSpeed: 1.05,
        range: .85,
        density: 1,
        spray: 1,
        resist: 1
    },
    bit_more_spread: {
        reload: 1,
        recoil: 1,
        shudder: 1.15,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1.5,
        resist: 1
    },
    more_spread: {
        reload: 1,
        recoil: 1,
        shudder: 1.5,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1.5,
        resist: 1
    },
    gatekeeper: {
        reload: .875,
        recoil: 1,
        shudder: 1,
        size: 1.25,
        health: 1.1,
        damage: 1.1,
        pen: 1.05,
        speed: 2,
        maxSpeed: 3,
        range: .8,
        density: .1,
        spray: 1,
        resist: 1
    },
    contagi: {
        reload: 1,
        recoil: .5,
        shudder: 1.5,
        size: 1,
        health: .6,
        damage: .6,
        pen: .75,
        speed: 1.05,
        maxSpeed: 1,
        range: 1,
        density: .9,
        spray: .75,
        resist: .7
    },
    shellExplode: {
        reload: 1000,
        recoil: 0,
        shudder: 1,
        size: .6,
        health: 3,
        damage: 6.25,
        pen: 3,
        speed: 0,
        maxSpeed: 0,
        range: .1,
        density: 2,
        spray: 1,
        resist: 1
    },
    c4: {
        reload: 1000,
        recoil: 0,
        shudder: 1,
        size: 1,
        health: 3,
        damage: 6.25,
        pen: 3,
        speed: 0,
        maxSpeed: 0,
        range: .1,
        density: 2,
        spray: 1,
        resist: 1
    },
    detSwarm: {
        reload: 1000,
        recoil: 0,
        shudder: 1,
        size: 1,
        health: 3,
        damage: 6.25,
        pen: 3,
        speed: 0.001,
        maxSpeed: 0.001,
        range: .1,
        density: 2,
        spray: 1,
        resist: 1
    },
    trap_fragment: {
        reload: 1000,
        recoil: 0,
        shudder: .75,
        size: .7,
        health: 2,
        damage: 2,
        pen: 1.25,
        speed: 1.15,
        maxSpeed: 1,
        range: .4,
        density: 1.5,
        spray: .5,
        resist: 1.15
    },
    sock: {
        reload: .85,
        recoil: 0,
        shudder: 1,
        size: .8,
        health: .63,
        damage: .62,
        pen: .725,
        speed: .825,
        maxSpeed: .785,
        range: .3,
        density: .5,
        spray: 1,
        resist: .7
    },
    redistribute2: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: .7,
        health: 2.5,
        damage: 2,
        pen: 2,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1.5,
        spray: 1,
        resist: 1.5
    },
    decelerate: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 0,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    mini_grower: {
        reload: 1.2,
        recoil: 1.2,
        shudder: .7,
        size: 1,
        health: 1.35,
        damage: .815,
        pen: 1.75,
        speed: 1.35,
        maxSpeed: 1.1,
        range: 1,
        density: 1.25,
        spray: .7,
        resist: 1.25
    },
    grower: {
        reload: 1.3,
        recoil: 1.25,
        shudder: .7,
        size: 1,
        health: 1.4,
        damage: 1.05,
        pen: 1.75,
        speed: 1.35,
        maxSpeed: 1.1,
        range: 1.35,
        density: 1.5,
        spray: .7,
        resist: 1.5
    },
    mega_grower: {
        reload: 1.7,
        recoil: 1.5,
        shudder: .7,
        size: 1,
        health: 1.45,
        damage: 1.1,
        pen: 1.75,
        speed: 1.35,
        maxSpeed: 1.1,
        range: 1.35,
        density: 1.7,
        spray: .7,
        resist: 1.7
    },
    giga_grower: {
        reload: 1.95,
        recoil: 1.5,
        shudder: .7,
        size: 1,
        health: 1.5,
        damage: 1.1,
        pen: 1.75,
        speed: 1.35,
        maxSpeed: 1.1,
        range: 1.35,
        density: 2,
        spray: .7,
        resist: 2
    },
    saddle: {
        reload: 1.15,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .9,
        damage: 1,
        pen: .95,
        speed: .975,
        maxSpeed: .975,
        range: .975,
        density: .9,
        spray: 1,
        resist: .9
    },
    lance: {
        reload: 6,
        recoil: 0,
        shudder: .1,
        size: 1,
        health: .5,
        damage: 1.2,
        pen: 1.6,
        speed: .67,
        maxSpeed: 1,
        range: .08,
        density: 1,
        spray: 180,
        resist: 1
    },
    flail: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1.5,
        health: 1.5,
        damage: 2.5,
        pen: 3,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1.25,
        spray: 1,
        resist: 1
    },
    akafuji: {
        reload: 2.25,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: .7,
        pen: 1.35,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    airship: {
        reload: 1.1,
        recoil: 1,
        shudder: 1,
        size: 1.1,
        health: 1.25,
        damage: 1.25,
        pen: 1.25,
        speed: 1.1,
        maxSpeed: .825,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    osci: {
        reload: 1.1,
        recoil: 1,
        shudder: 1,
        size: 1.14,
        health: .95,
        damage: .95,
        pen: .95,
        speed: .965,
        maxSpeed: .965,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    real_sniper: {
        reload: 1.525,
        recoil: 1,
        shudder: .5,
        size: 1.675,
        health: 1.3,
        damage: 1.75,
        pen: 1.5,
        speed: 2.45,
        maxSpeed: 2.4,
        range: 1.15,
        density: 1.2,
        spray: .5,
        resist: 1
    },
    real_shotgun: {
        reload: 2.85,
        recoil: .8,
        shudder: 2.5,
        size: 1.775,
        health: 1.25,
        damage: 1.25,
        pen: 1.5,
        speed: 1.625,
        maxSpeed: 1.625,
        range: 1,
        density: 1.1,
        spray: 2.2,
        resist: 1
    },
    grenade_throw: {
        reload: 8,
        recoil: .25,
        shudder: 1,
        size: 17,
        health: 2,
        damage: .75,
        pen: 1,
        speed: 2.1,
        maxSpeed: 0,
        range: 1.5,
        density: 1,
        spray: 1,
        resist: 1
    },
    grenade_explosion: {
        reload: 8,
        recoil: 0,
        shudder: 4.25,
        size: 2,
        health: 2.25,
        damage: 1.75,
        pen: 1.5,
        speed: 1.35,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 4,
        resist: 1
    },
    rpg_explosion: {
        reload: 8,
        recoil: 0,
        shudder: 5,
        size: 4.5,
        health: 4,
        damage: 1,
        pen: 1.25,
        speed: 1.5,
        maxSpeed: 1,
        range: 1,
        density: 1.1,
        spray: 4.25,
        resist: 1
    },
    rpg_propeller: {
        reload: .3,
        recoil: .85,
        shudder: 1,
        size: 4,
        health: .25,
        damage: .25,
        pen: .2,
        speed: .5,
        maxSpeed: .25,
        range: 1,
        density: 1,
        spray: .9,
        resist: 1
    },
    rpg_launch: {
        reload: 9.85,
        recoil: 3,
        shudder: 1.25,
        size: 12,
        health: 1.25,
        damage: 3,
        pen: 2,
        speed: 1.15,
        maxSpeed: 1.1,
        range: 1.4,
        density: 1.5,
        spray: 1.25,
        resist: 1
    },
    railgun: {
        reload: 1,
        recoil: 1.15,
        shudder: .75,
        size: 1.2,
        health: 1,
        damage: 1.1,
        pen: 1,
        speed: 1.175,
        maxSpeed: 1.17,
        range: 1,
        density: 1.1,
        spray: .75,
        resist: 1
    },
    no_speed: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 0.00001,
        maxSpeed: 0.00001,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    marksman_pistol: {
        reload: 1.9,
        recoil: 1.75,
        shudder: 1.1,
        size: 3.5,
        health: 2,
        damage: 3.75,
        pen: 2,
        speed: 2.15,
        maxSpeed: 2.05,
        range: 1.1,
        density: 1.5,
        spray: .9,
        resist: 1.1
    },
    fat_nuke: {
        reload: 8,
        recoil: 0,
        shudder: 5.5,
        size: 1.4,
        health: 3,
        damage: 4,
        pen: 1.75,
        speed: 1.75,
        maxSpeed: 1.1,
        range: 1.05,
        density: 1.15,
        spray: 5,
        resist: 1
    },
    tsar_launch: {
        reload: 10.75,
        recoil: 5.25,
        shudder: 1,
        size: 12,
        health: 1.7,
        damage: 2.8,
        pen: 1.8,
        speed: 2.85,
        maxSpeed: 0,
        range: 1.85,
        density: 1.5,
        spray: 1,
        resist: 1.25
    },
    rpg_explosion_2: {
        reload: 8,
        recoil: 0,
        shudder: 5,
        size: 4.75,
        health: .4,
        damage: .65,
        pen: .35,
        speed: 1.35,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 4,
        resist: 1
    },
    lot_more_knock: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 20,
        spray: 1,
        resist: 20
    },
    less_pen: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: .9,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    swarmlet: {
        reload: 36,
        recoil: .25,
        shudder: .05,
        size: .4,
        health: 1.2,
        damage: .2,
        pen: 1,
        speed: 3.5,
        maxSpeed: 1,
        range: 1,
        density: 1.25,
        spray: 5,
        resist: 1.25
    },
    more_health: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.15,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    minirang: {
        reload: .775,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .35,
        damage: 1,
        pen: 1,
        speed: 1.85,
        maxSpeed: 1.7,
        range: 1.333,
        density: 1,
        spray: 1,
        resist: 1
    },
    donjon: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .75,
        damage: 1,
        pen: .75,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    no_damage: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 0,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    cage: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 110,
        health: 10000000,
        damage: 0,
        pen: 1,
        speed: 0.0001,
        maxSpeed: 0.0001,
        range: .4,
        density: 0.0001,
        spray: 1,
        resist: 1
    },
    course: {
        reload: 2.5,
        recoil: 0,
        shudder: 1,
        size: 1,
        health: .3,
        damage: .24,
        pen: .7,
        speed: 1.4,
        maxSpeed: 1.4,
        range: .25,
        density: .3,
        spray: 1,
        resist: .3
    },
    pillbox_turret: {
        reload: 1.75,
        recoil: .75,
        shudder: .6,
        size: .825,
        health: .21,
        damage: .185,
        pen: 1.1,
        speed: 1.7,
        maxSpeed: 1.5,
        range: .6,
        density: .05,
        spray: 1,
        resist: 1.75
    },
    thicc_swarm: {
        reload: 36,
        recoil: .5,
        shudder: .1,
        size: .6,
        health: 1.5,
        damage: 1.25,
        pen: 1.25,
        speed: 2.75,
        maxSpeed: 1,
        range: 1.125,
        density: 1,
        spray: 5,
        resist: 1
    },
    migrate: {
        reload: 1.195,
        recoil: 1.1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1.05,
        speed: 1,
        maxSpeed: .975,
        range: .96,
        density: 1,
        spray: 1,
        resist: 1.05
    },
    sass_supreme: {
        reload: 576,
        recoil: 1.75,
        shudder: .1,
        size: 1.24,
        health: 1.8,
        damage: .27,
        pen: 1.05,
        speed: 2.295,
        maxSpeed: .72,
        range: 1,
        density: 1.6,
        spray: .1,
        resist: 1.15
    },
    plasma: {
        reload: 1.765,
        recoil: 0,
        shudder: 1,
        size: 30,
        health: 3,
        damage: 0,
        pen: 3,
        speed: 0,
        maxSpeed: 0,
        range: .1,
        density: 2,
        spray: 1,
        resist: 1
    },
    gust: {
        reload: 34.65,
        recoil: .09,
        shudder: .0001,
        size: 1.2,
        health: 1.8,
        damage: .04,
        pen: 1,
        speed: 3.6,
        maxSpeed: 3.6,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1.2
    },
    inferno: {
        reload: .075,
        recoil: 0,
        shudder: 2.25,
        size: .65,
        health: .715,
        damage: .225,
        pen: .815,
        speed: 1.4,
        maxSpeed: 2,
        range: .24,
        density: .3,
        spray: 2.25,
        resist: 1
    },
    rocket_booster: {
        reload: .225/*0.25*/,
        recoil: .2 /*0.325*/,
        shudder: .001,
        size: 1,
        health: .707,
        damage: .001,
        pen: .8,
        speed: 1.4,
        maxSpeed: 2,
        range: .075,
        density: .3,
        spray: .001,
        resist: 1
    },
    precice: {
        reload: 1,
        recoil: 1,
        shudder: .0001,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: .001,
        resist: 1
    },
    spiteshot: {
        reload: 181.5,
        recoil: .224,
        shudder: .187,
        size: 1.5,
        health: 1.5,
        damage: .0664,
        pen: .725,
        speed: 7.2,
        maxSpeed: .492,
        range: 1,
        density: 1.2,
        spray: 45,
        resist: 1
    },
    splatter: {
        reload: 220,
        recoil: .175,
        shudder: .135,
        size: 1.2,
        health: 2.352,
        damage: .0464,
        pen: 1.25,
        speed: 3.96,
        maxSpeed: .65,
        range: 1,
        density: 1.5,
        spray: 27,
        resist: 1.2
    },
    strange: {
        reload: 220,
        recoil: .175,
        shudder: .135,
        size: 1.2,
        health: 1000,
        damage: .00001,
        pen: 0.001,
        speed: 4,
        maxSpeed: 6,
        range: 1,
        density: 1.5,
        spray: 27,
        resist: 1.2
    },
    bar: {
        reload: 2,
        recoil: 0,
        shudder: 1,
        size: 2,
        health: .0001,
        damage: 1,
        pen: 1,
        speed: .00001,
        maxSpeed: 2,
        range: 0,
        density: 1,
        spray: 1,
        resist: 1
    },
    bar_split: {
        reload: 5.4,
        recoil: 3.2375,
        shudder: .5,
        size: 1,
        health: .867,
        damage: 1.0368,
        pen: 1.848,
        speed: .1836765,
        maxSpeed: .110446,
        range: 1,
        density: 2.56,
        spray: 1,
        resist: 3.795
    },
    bar_missile: {
        reload: .36,
        recoil: .6,
        shudder: 2.55,
        size: .935,
        health: .271875,
        damage: .06,
        pen: .3125,
        speed: .675,
        maxSpeed: .82,
        range: .5,
        density: 1.5,
        spray: 3.125,
        resist: 1.2
    },
    centurion: {
        reload: .9,
        recoil: 0,
        shudder: .7,
        size: .8,
        health: 1.8,
        damage: 1,
        pen: 1,
        speed: .5,
        maxSpeed: .6,
        range: 1,
        density: 1,
        spray: 1.2,
        resist: 1
    },
    cent_missile: {
        reload: .15,
        recoil: .6,
        shudder: 2.55,
        size: .935,
        health: .4,
        damage: .09,
        pen: .5,
        speed: .875,
        maxSpeed: .92,
        range: .3,
        density: 1.5,
        spray: 6,
        resist: 1.2
    },
    droneTitan: {
        reload: 300,
        recoil: .25,
        shudder: .1,
        size: .6,
        health: 12,
        damage: 10,
        pen: 999,
        speed: .1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: .1,
        resist: 1
    },
    k: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: .25,
        health: .9,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    firestick: {
        reload: 1,
        recoil: 0,
        shudder: 1.5,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: .5,
        maxSpeed: .5,
        range: .825,
        density: 1,
        spray: 1.5,
        resist: 1
    },
    firestick_destroy: {
        reload: 1,
        recoil: 0,
        shudder: 1,
        size: 1.4,
        health: 1.1,
        damage: 1.2,
        pen: 1,
        speed: .7,
        maxSpeed: .9,
        range: .925,
        density: 1,
        spray: 1.5,
        resist: 1
    },
    no_spread: {
        reload: 1,
        recoil: 1,
        shudder: .0001,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: .0001,
        resist: 1
    },
    bunker: {
        reload: 46.215,
        recoil: 2,
        shudder: .025,
        size: .9,
        health: 16.667,
        damage: 0,
        pen: 16.667,
        speed: 7.23,
        maxSpeed: 2.475,
        range: 10,
        density: 1.1,
        spray: 5,
        resist: 4.5
    },
    sidethrow: {
        reload: 4.5,
        recoil: 0,
        shudder: .0001,
        size: .1,
        health: 1,
        damage: .05,
        pen: 1,
        speed: 13.4,
        maxSpeed: 0,
        range: .1,
        density: 1,
        spray: .00001,
        resist: 1
    },
    trireme: {
        reload: 10.725,
        recoil: 1.512,
        shudder: .16,
        size: .9,
        health: 1.35,
        damage: .09,
        pen: 1.4,
        speed: 2.852,
        maxSpeed: .634,
        range: 1.3,
        density: 1,
        spray: 7.5,
        resist: .77
    },
    shield: {
        reload: 4,
        recoil: 0,
        shudder: .1,
        size: 4,
        health: 387420489,
        damage: 0,
        pen: .9,
        speed: .7,
        maxSpeed: 1,
        range: .02,
        density: 3387420489,
        spray: 1,
        resist: 9
    },
    dropship: {
        reload: 53,
        recoil: 1,
        shudder: .0001,
        size: 1,
        health: 2.25,
        damage: .75,
        pen: 1.25,
        speed: 4.15,
        maxSpeed: 0,
        range: 1,
        density: 1,
        spray: .0001,
        resist: 1
    },
    shoot_once: {
        reload: Infinity,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    nest_keeper: {
        reload: 3,
        recoil: 1,
        shudder: 1,
        size: .75,
        health: 1.05,
        damage: 1.05,
        pen: 1.1,
        speed: .5,
        maxSpeed: .5,
        range: .5,
        density: 1.1,
        spray: 1,
        resist: 1
    },
    ceptionist: {
        reload: 1.2,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: .95,
        maxSpeed: .95,
        range: .95,
        density: 1,
        spray: 1,
        resist: 1
    },
    ceptionist_bullet: {
        reload: 1.2,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .5,
        damage: .475,
        pen: .5,
        speed: .7,
        maxSpeed: .7,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    leviathan: {
        reload: 43,
        recoil: 0,
        shudder: .05,
        size: .28,
        health: 1.8,
        damage: .18,
        pen: .65,
        speed: 2.45,
        maxSpeed: .7,
        range: 1.8,
        density: .3125,
        spray: 5,
        resist: .3125
    },
    smoke_spawner: {
        reload: 1,
        recoil: 1,
        shudder: 25,
        size: 14,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 10,
        maxSpeed: .05,
        range: 5,
        density: 1,
        spray: 50,
        resist: 1
    },
    bomb: {
        reload: 1.4,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .5,
        damage: .45,
        pen: .9,
        speed: .8,
        maxSpeed: .8,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    musketeer: {
        reload: .85,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.05,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: .95,
        range: .85,
        density: .1,
        spray: 1,
        resist: 1
    },
    matchlock: {
        reload: 1.21,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: .725,
        density: 1,
        spray: 1,
        resist: 1
    },
    planter: {
        reload: .55,
        recoil: .8,
        shudder: 1.7,
        size: .75,
        health: .75,
        damage: .8,
        pen: 1,
        speed: 1,
        maxSpeed: .8,
        range: .735,
        density: 1,
        spray: 5,
        resist: 1
    },
    barber: {
        reload: .4,
        recoil: 1,
        shudder: 2.125,
        size: .785,
        health: .55,
        damage: .8,
        pen: .6,
        speed: 1.275,
        maxSpeed: .575,
        range: .525,
        density: .5,
        spray: 10,
        resist: .8
    },
    less_health: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .9,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    blazer: {
        reload: .55,
        recoil: 1.15,
        shudder: 1,
        size: .5625,
        health: .95,
        damage: 1,
        pen: .925,
        speed: 1.15,
        maxSpeed: 1.1,
        range: .85,
        density: 1,
        spray: 1,
        resist: 1
    },
    hyper: {
        reload: 1,
        recoil: 1.15,
        shudder: 2,
        size: 1,
        health: .5,
        damage: .5,
        pen: .7,
        speed: 1.69,
        maxSpeed: 1.69,
        range: .425,
        density: 1,
        spray: .5,
        resist: .7
    },
    atrophy: {
        reload: 2.238,
        recoil: 1,
        shudder: .0001,
        size: 1,
        health: 1,
        damage: 0,
        pen: 1,
        speed: 1,
        maxSpeed: 4.5,
        range: 1,
        density: 1,
        spray: .0001,
        resist: 1
    },
    gravity: {
        reload: .625,
        recoil: 1,
        shudder: .68,
        size: .8,
        health: .9,
        damage: .9,
        pen: 1,
        speed: .6,
        maxSpeed: .55,
        range: .675,
        density: 1.25,
        spray: 1.44,
        resist: 1.1
    },
    inoculist: {
        reload: 4,
        recoil: 0,
        shudder: 1,
        size: .3,
        health: 1.7,
        damage: .25,
        pen: 1,
        speed: 0,
        maxSpeed: 0,
        range: 1.15,
        density: 1,
        spray: 1,
        resist: 1
    },
    kinesis: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .7,
        damage: .75,
        pen: .75,
        speed: .85,
        maxSpeed: .825,
        range: 1,
        density: .75,
        spray: 1,
        resist: .75
    },
    rocketeer: {
        reload: 1.25,
        recoil: .9,
        shudder: .8,
        size: .95,
        health: 1.35,
        damage: .925,
        pen: 2,
        speed: .4,
        maxSpeed: .385,
        range: 1.3,
        density: 1,
        spray: 1,
        resist: 1.1
    },
    twister: {
        reload: .975,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1.3,
        maxSpeed: 1.3,
        range: 1.1,
        density: 1,
        spray: 1,
        resist: 1
    },
    twist_missile: {
        reload: .5,
        recoil: 1,
        shudder: 2,
        size: 1,
        health: .75,
        damage: .95,
        pen: .7,
        speed: 1.69,
        maxSpeed: 1.69,
        range: 1,
        density: 1,
        spray: .5,
        resist: .7
    },
    skim_missile: {
        reload: .55,
        recoil: 1.35,
        shudder: 2,
        size: 1,
        health: .5,
        damage: .5,
        pen: .7,
        speed: 1.69,
        maxSpeed: 1.69,
        range: 1,
        density: 1,
        spray: .5,
        resist: .7
    },
    hotshot: {
        reload: 1.675,
        recoil: 1.75,
        shudder: 1,
        size: 1,
        health: 1.05,
        damage: 1.7,
        pen: 1.12,
        speed: .75,
        maxSpeed: .675,
        range: 1,
        density: 1.6,
        spray: 1,
        resist: 1.15
    },
    steam_shot: {
        reload: 1.27,
        recoil: 1,
        shudder: .25,
        size: 1,
        health: 1,
        damage: 1.1,
        pen: 1,
        speed: 1.32,
        maxSpeed: 1.32,
        range: 1,
        density: 1.1,
        spray: .25,
        resist: 1.1
    },
    razor: {
        reload: 2.15,
        recoil: 2.15,
        shudder: .5,
        size: 1,
        health: 1.72,
        damage: 1.625,
        pen: 1.2,
        speed: .75,
        maxSpeed: .6,
        range: 1,
        density: 1.6,
        spray: 1,
        resist: 3
    },
    mailman: {
        reload: 1.15,
        recoil: 1.1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: .9,
        maxSpeed: .9,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    kash_thrust: {
        reload: .125,
        recoil: 1,
        shudder: 1,
        size: 2,
        health: .36,
        damage: .25,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: .5,
        spray: 1,
        resist: .5
    },
    kash: {
        reload: 1.333,
        recoil: 1,
        shudder: 1,
        size: 2,
        health: 1.1,
        damage: .9,
        pen: 1,
        speed: .645,
        maxSpeed: .5,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    vibe: {
        reload: .75,
        recoil: 1.25,
        shudder: 1.4,
        size: 1.2,
        health: 1.1,
        damage: 1.15,
        pen: 1.1,
        speed: .775,
        maxSpeed: .5,
        range: .8,
        density: .5,
        spray: 1.5,
        resist: .8
    },
    volley: {
        reload: .55,
        recoil: 1,
        shudder: 1.15,
        size: .75,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 0.8,
        maxSpeed: 0.8,
        range: .9,
        density: 1,
        spray: 1.5,
        resist: 1
    },
    bee_swarm: {
        reload: 1.31,
        recoil: .25,
        shudder: 1.5,
        size: 1.75,
        health: .875,
        damage: .8,
        pen: 1.3,
        speed: .9,
        maxSpeed: .8,
        range: 1,
        density: 1,
        spray: 1.5,
        resist: 1
    },
    collect: {
        reload: 1.5,
        recoil: 1,
        shudder: 1,
        size: 1.5625,
        health: .855,
        damage: .265,
        pen: 1.25,
        speed: .9,
        maxSpeed: .8,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    half_pen: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: .5,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    more_pen: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1.15,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    tiny_bit_more_speed: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1.07,
        maxSpeed: 1.07,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    bit_more_range: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1.05,
        density: 1,
        spray: 1,
        resist: 1
    },
    quarter_less_damage: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: .25,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    bunsen: {
        reload: .33,
        recoil: .37,
        shudder: 1,
        size: .4,
        health: 1,
        damage: .5,
        pen: .35,
        speed: 2,
        maxSpeed: .125,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    cartograph: {
        reload: 1.525,
        recoil: 1,
        shudder: 1,
        size: .95,
        health: .725,
        damage: .8,
        pen: .8,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    mecha:{
        reload: 1.925 / 2/*1.925*/,
        recoil: .01,
        shudder: .01,
        size: 1,
        health: .625,
        damage: .294,
        pen: .845,
        speed: 1.35,
        maxSpeed: 1.1,
        range: 1,
        density: 1,
        spray: 1.4,
        resist: 1
    },
    heavymecha:{
        reload: 2/*4.5*/,
        recoil: .01,
        shudder: 1.2,
        size: 1.1,
        health: .79,
        damage: .44,
        pen: 1.06,
        speed: 1.8,
        maxSpeed: 1.1,
        range: 1.1,
        density: 1,
        spray: 1.175,
        resist: 1
    },
    sixshot:{
        reload: 1,
        recoil: 1,
        shudder: 1.5,
        size: 1,
        health: 1,
        damage: 2,
        pen: 2,
        speed: 1.3,
        maxSpeed: 1.8,
        range: 1,
        density: .875,
        spray: 1,
        resist: 1
    },
    kamikazeCrasherExplosion:{
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 10000,
        damage: 2,
        pen: 5,
        speed: 0,
        maxSpeed: 0,
        range: 0.25,
        density: 100,
        spray: 1,
        resist: 1
    },
    kami: {
        reload: 4,
        recoil: 0,
        shudder: .5,
        size: 1.5,
        health: 3,
        damage: 4.8,
        pen: 5,
        speed: .01,
        maxSpeed: .01,
        range: .25,
        density: 1,
        spray: .5,
        resist: 1
    },
    assin: {
        reload: 1,
        recoil: 1.7, 
        shudder: 1, 
        size: 1, 
        health: 1, 
        damage: 1, 
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1.2, 
        density: 1, 
        spray: 1, 
        resist: 1
    },
    fivex_size: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 5,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    fires_once: {
        reload: Infinity,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    homing: {
        reload: 1.2,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    harp: {
        reload: 3.885,
        recoil: 0,
        shudder: .25,
        size: .84,
        health: 1.2,
        damage: 1.05,
        pen: 1,
        speed: 1.2,
        maxSpeed: 1.2,
        range: 1,
        density: 1.1,
        spray: .25,
        resist: 1.1
    },
    harp_dart: {
        reload: 4,
        recoil: 1,
        shudder: .0001,
        size: 16,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: .001,
        resist: 1
    },
    surgeon: {
        reload: 2,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: .9,
        damage: .85,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    orbitalstrike: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 40,
        damage: 1.2,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    shrapnel: {
        reload: 2.5,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.05,
        damage: 1.1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1.05,
        density: 1,
        spray: 1,
        resist: 1
    },
    shrapnelExplosion: {
        reload: 4.5,
        recoil: 3.2375000000000003,
        shudder: 0.5,
        size: 0.3,
        health: 40,
        damage: 0.5,
        pen: 1.32,
        speed: 0,
        maxSpeed: 0,
        range: 1,
        density: 2.5600000000000005,
        spray: 1,
        resist: 3.4499999999999997
    },
    oppenheimer: {
        reload: 4.5,
        recoil: 3.2375000000000003,
        shudder: 0.5,
        size: 0.3,
        health: 50,
        damage: 0.7,
        pen: 1.32,
        speed: 0,
        maxSpeed: 0,
        range: 1.6,
        density: 2.5600000000000005,
        spray: 1,
        resist: 3.4499999999999997
    },
    engineer: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1.05,
        damage: 1.05,
        pen: 1,
        speed: 1.1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    }
}
let entityMoveOld = Entity.prototype.move;
Entity.prototype.move = function() {
    if (this.motionType == 'miniGrower') {
        this.SIZE += .1; // + .02 * Math.random();
        this.DAMAGE += .15;
        this.penetration += .01;
        if (this.velocity.x > 0) this.velocity.x -= .0035;
        if (this.velocity.y > 0) this.velocity.y -= .0035;
    } else if (this.motionType == 'flamethrower') {
        this.maxSpeed = this.topSpeed;
        this.damp = -.02;
        this.SIZE += .175;
        this.DAMAGE -= 2.25;
    } else {
        entityMoveOld.call(this);
    }
};
const hurricaneProps = {
    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.stronger, g.stronger, g.stronger, g.stronger, g.faster]),
    TYPE: "bullet"
}

// Functions
const deepCopy = (type) => {
    const pushArray = (input, key) => {
        let arrOut = [];
        for (let i = 0; i < input.length; i++) {
            switch (typeof input[i]) {
                case 'object':
                    if (Array.isArray(input[i])) arrOut.push(pushArray(input[i]));
                    else {
                        if (key == "TYPE") arrOut.push(input[i]);
                        else arrOut.push(deepCopy(input[i]));
                    }
                    break;
                default:
                    arrOut.push(input[i]);
                    break;
            }
        }
        return arrOut;
    };
    let output = JSON.parse(JSON.stringify(type));
    if (Array.isArray(type)) output = pushArray(type);
    else {
        for (let key in type) {
            switch (typeof type[key]) {
                case 'object':
                    if (Array.isArray(type[key])) output[key] = pushArray(type[key], key);
                    else {
                        if (key == "TYPE") output[key] = type[key];
                        else output[key] = deepCopy(type[key]);
                    }
                    break;
                default:
                    output[key] = type[key];
                    break;
            }
        }
    }
    return output;
};
let customCounters = {};
const makeExportName = (type, append, stats = []) => {
    let out;

    for (let entity in exports) {
        if (exports[entity] == type) out = entity;
    }

    if (out == undefined) {
        if (customCounters[append] == undefined) customCounters[append] = 0;
        return `custom${append}${customCounters[append]++}`;
    }

    out += append;

    for (let starArr of stats) {
        for (let numb of starArr) {
            out += `${numb}`.replaceAll('.', 'o').replaceAll(',', 'l');
        }
    }

    return out;
};
const applyStats = (guns, stats, options = {}) => {
    if (guns) {
        for (let gun of guns) {
            if (gun.PROPERTIES) {
                if (options.propertyEdit) options.propertyEdit(gun.PROPERTIES);
                if (gun.PROPERTIES.SHOOT_SETTINGS) {
                    if (options.shootEdit) options.shootEdit(gun.PROPERTIES);
                    gun.PROPERTIES.SHOOT_SETTINGS = combineStats([Object.values(gun.PROPERTIES.SHOOT_SETTINGS), ...stats]);
                }
            }
        }
    }
};
const woomyHybrid = (type, name = -1) => {
    let output = dereference(type);
    let spawner = {
        POSITION: [7, 12, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: ["drone", {INDEPENDENT: true}],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3
        }
    };
    output.GUNS = type.GUNS == null ? [spawner] : type.GUNS.concat([spawner]);
    output.LABEL = name == -1 ? "Hybrid " + type.LABEL : name;
    return output;
}
const woomyHybridSwarm = (type, name = -1) => {
    let output = dereference(type);
    let spawner = {
        POSITION: [7, 7.5, .6, 7, 4, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.flank, g.double]),
            TYPE: "autoswarm",
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    };
    let spawner2 = {
        POSITION: [7, 7.5, .6, 7, -4, 180, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.flank, g.double]),
            TYPE: "autoswarm",
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    };
    output.GUNS = type.GUNS == null ? [spawner, spawner2] : type.GUNS.concat([spawner, spawner2]);
    output.LABEL = name == -1 ? "Hybrid " + type.LABEL : name;
    return output;
}
const woomyAutoN = (type, sides = 3, name, options = {}) => {
    let output = deepCopy(type),
        stats = options.stats || [g.blank],
        swivel = options.swivel,
        turretName = makeExportName(type, `AutoN${swivel ? 'Swivel' : ''}`, [stats]);

    if (!exports[turretName]) {
        exports[turretName] = deepCopy(type);
        applyStats(exports[turretName].GUNS, [g.auto, ...stats, swivel ? [1.5, 1, 1, 1, .81, .765, .9, 1, 1, 1, 1, 1, 1] : g.blank]);
    };

    if (type.DANGER + sides - 1 < 7) output.DANGER += sides - 1;
    output.LABEL = name || `${output.LABEL}-${sides}`;
    output.FACING_TYPE = 'autospin';
    output.GUNS = [];
    output.PROPS = [];
    output.TURRETS = ((out = []) => {
        for (let i = 0; i < sides; i++) out.push({
            POSITION: [swivel ? 8 * (Math.pow(Math.sqrt(.625, 4), sides - 3)) + 1 : 10 * (Math.pow(Math.sqrt(.78, 4), sides - 3)) + 1, swivel ? 7 : 9, 0, 360 / sides * i, swivel ? 360 : 360 / sides + 65, swivel ? 1 : 0],
            TYPE: [exports[turretName], {
                LABEL: '',
                BODY: {
                    FOV: 2.5
                },
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
                COLOR: options.color || 16
            }]
        });
        return out;
    })();
    return output;
};

// Generics
Class.woomy = {
    PARENT: "genericTank",
    REROOT_UPGRADE_TREE: "woomyBasic"
}
Class.woomyZoom = {
    PARENT: "woomy",
    CONTROLLERS: [["zoom", { distance: 550 }]],
    TOOLTIP: "Right click or press shift to move the camera to your mouse."
}
Class.woomyInvis = {
    PARENT: "woomy",
    INVISIBLE: [0.08, 0.03],
    TOOLTIP: "Stay still to turn invisible."
}

// Bullets
Class.woomyMiniGrowerBullet = {
    PARENT: "bullet",
    MOTION_TYPE: "miniGrower"
}
Class.woomyAutoBullet = makeAuto(Class.bullet)
Class.woomyFlare = {
    PARENT: "flare",
    MOTION_TYPE: "flamethrower"
}
Class.woomyBubble = {
    PARENT: "bullet",
    LABEL: 'Bubble',
    GUNS: [{
        POSITION: [1, 1, 1, 0, 0, -45, 1],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.weak, g.no_recoil, g.half_damage, g.less_damage]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [1, 1, 1, 0, 0, -25, 1.071],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.weak, g.no_recoil, g.half_damage, g.less_damage]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [1, 1, 1, 0, 0, -5, 1.143],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.weak, g.no_recoil, g.half_damage, g.less_damage]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [1, 1, 1, 0, 0, 0, 1.214],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.weak, g.no_recoil, g.half_damage, g.half_damage]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [1, 1, 1, 0, 0, 5, 1.286],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.weak, g.no_recoil, g.half_damage, g.half_damage]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [1, 1, 1, 0, 0, 25, 1.357],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.weak, g.no_recoil, g.half_damage, g.less_damage]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [1, 1, 1, 0, 0, 45, 1.429],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.weak, g.no_recoil, g.half_damage, g.less_damage]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [1, 1, 1, 0, 0, 45, 1.5],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.weak, g.no_recoil, g.half_damage, g.less_damage]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [1, 1, 1, 0, 0, 25, 1.571],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.weak, g.no_recoil, g.half_damage, g.half_damage]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [1, 1, 1, 0, 0, 5, 1.643],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.weak, g.no_recoil, g.half_damage, g.half_damage]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [1, 1, 1, 0, 0, 0, 1.714],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.weak, g.no_recoil, g.half_damage, g.half_damage]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [1, 1, 1, 0, 0, -5, 1.786],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.weak, g.no_recoil, g.half_damage, g.less_damage]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [1, 1, 1, 0, 0, -25, 1.857],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.weak, g.no_recoil, g.half_damage, g.less_damage]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [1, 1, 1, 0, 0, -45, 1.929],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.weak, g.no_recoil, g.half_damage, g.less_damage]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [1, 1, 1, 0, 0, 160, 1], // 2
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.weak, g.no_recoil, g.slow, g.bit_slow]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [1, 1, 1, 0, 0, 200, 1.5], // 2.071
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.weak, g.no_recoil, g.slow, g.slow]),
            TYPE: "bullet"
        }
    }]
}

// Turrets
Class.woomyAuto2gun = {
    LABEL: '',
    BODY: {
        FOV: 2.4
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [{
        POSITION: [21, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.bit_more_reload]),
            TYPE: "bullet"
        }
    }]
};
Class.woomyDeveloperTurret = {
    LABEL: 'Annihilator',
    BODY: {
        FOV: 1
    },
    CONTROLLERS: ['canRepel', 'mapAltToFire'],
    COLOR: 16,
    HAS_NO_RECOIL: true,
    GUNS: [{
        POSITION: [20.5, 19.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.half_reload, g.faster]),
            TYPE: "bullet"
        }
    }]
}

// Bodies
Class.woomyDeveloperBody = {
    PARENT: "smasherBody",
    SHAPE: -9,
    COLOR: 16
}

// Basic & starting upgrades
Class.woomyBasic = {
    PARENT: "woomy",
    LABEL: 'Basic',
    DANGER: 4,
    GUNS: [{
        POSITION: [18, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.less_pen]),
            TYPE: "bullet",
        }
    }],
}
Class.woomyTwin = {
    PARENT: "woomy",
    LABEL: 'Twin',
    GUNS: [{
        POSITION: [20, 8, 1, 0, 5.5, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [20, 8, 1, 0, -5.5, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: "bullet"
        }
    }]
}
Class.woomySniper = {
    PARENT: "woomy",
    LABEL: 'Sniper',
    BODY: {
        ACCELERATION: base.ACCEL * .7,
        FOV: 1.2
    },
    GUNS: [{
        POSITION: [24, 8.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
            TYPE: "bullet"
        }
    }]
}
Class.woomyMachineGun = {
    PARENT: "woomy",
    LABEL: 'Machine Gun',
    GUNS: [{
        POSITION: [12, 10, 1.4, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.mach_smaller]),
            TYPE: "bullet"
        }
    }]
}
Class.woomyFlankGuard = makeMulti({
    PARENT: "woomy",
    GUNS: [{
        POSITION: [18, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: "bullet"
        }
    }]
}, 3, "Flank Guard")
Class.woomyDirector = {
    PARENT: "woomy",
    LABEL: 'Director',
    BODY: {
        ACCELERATION: base.ACCEL * .75,
        FOV: 1.1
    },
    STAT_NAMES: statNames.drone,
    MAX_CHILDREN: 6,
    GUNS: [{
        POSITION: [6, 12, 1.2, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true
        }
    }]
}
Class.woomyPounder = {
    PARENT: "woomy",
    LABEL: 'Pounder',
    BODY: {
        ACCELERATION: base.ACCEL * .8
    },
    GUNS: [{
        POSITION: [20, 12, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
            TYPE: "bullet"
        }
    }]
}
Class.woomySingle = {
    PARENT: "woomyZoom",
    LABEL: 'Single',
    DANGER: 7,
    GUNS: [{
        POSITION: [19, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [8.5, 8, -1.8, 6.5, 0, 0, 0]
    }]
}
Class.woomyPelleter = {
    PARENT: "woomy",
    LABEL: 'Pelleter',
    GUNS: [{
        POSITION: [17, 2, 1, 0, 3, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.faster, g.pellet]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [17, 2, 1, 0, -3, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.faster, g.pellet]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [4.5, 8.5, -1.6, 7.5, 0, 0, 0]
    }]
}
Class.woomyTrapper = {
    PARENT: "woomy",
    LABEL: 'Trapper',
    STAT_NAMES: statNames.trap,
    BODY: {
        FOV: 1.1
    },
    GUNS: [{
        POSITION: [13, 8, 1, 0, 0, 0, 0]
    }, {
        POSITION: [4, 8, 1.7, 13, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.more_range, g.less_spread]),
            TYPE: "trap",
            STAT_CALCULATOR: gunCalcNames.trap
        }
    }]
}
Class.woomyPropeller = {
    PARENT: "woomy",
    LABEL: 'Propeller',
    BODY: {
        HEALTH: base.HEALTH * .9,
        SHIELD: base.SHIELD * .9,
        DENSITY: base.DENSITY * .75
    },
    GUNS: [{
        POSITION: [18, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front, g.lots_more_recoil, g.more_recoil]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [16, 6, 1, 0, 0, 150, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.less_power, g.bit_less_recoil]),
            TYPE: "bullet",
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }, {
        POSITION: [16, 6, 1, 0, 0, 210, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.less_power, g.bit_less_recoil]),
            TYPE: "bullet",
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }]
}
Class.woomyAuto2 = {
    PARENT: "woomy",
    LABEL: 'Auto-2',
    FACING_TYPE: 'autospin',
    TURRETS: [{
        POSITION: [11, 8, 0, 0, 220, 0], //90
        TYPE: "woomyAuto2gun"
    }, {
        POSITION: [11, 8, 0, 180, 220, 0], // 270
        TYPE: "woomyAuto2gun"
    }]
}
Class.woomyMinishot = {
    PARENT: "woomy",
    LABEL: 'Minishot',
    GUNS: [{
        POSITION: [17, 3, 1, 0, -4.5, -7, .25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: "bullet",
            LABEL: 'Secondary'
        }
    }, {
        POSITION: [17, 3, 1, 0, 4.5, 7, .75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: "bullet",
            LABEL: 'Secondary'
        }
    }, {
        POSITION: [19, 9, 1.05, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.arty]),
            TYPE: "bullet",
            LABEL: 'Primary'
        }
    }]
}
Class.woomyLancer = {
    PARENT: "woomy",
    LABEL: 'Lancer',
    BODY: {
        SPEED: base.SPEED * 1.5,
        ACCELERATION: base.ACCEL * .7
    },
    STAT_NAMES: {
      BULLET_SPEED: 'Lance Range',
      BULLET_HEALTH: 'Lance Longevity',
      BULLET_PEN: 'Lance Sharpness',
      BULLET_DAMAGE: 'Lance Damage',
      RELOAD: 'Lance Density'
    },
    GUNS: [{
        POSITION: [8, 4, 1.4, 6, 0, 0, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.lance]),
            TYPE: ["bullet", {
                ALPHA: 0,
                LABEL: 'Lance'
            }]
        }
    }, {
        POSITION: [8, 4, 1.4, 8.5, 0, 0, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.lance]),
            TYPE: ["bullet", {
                ALPHA: 0,
                LABEL: 'Lance'
            }]
        }
    }, {
        POSITION: [25, .3, -55, 0, 0, 0, 0]
    }],
}
Class.woomySubduer = {
    PARENT: "woomy",
    LABEL: 'Subduer',
    BODY: {
        ACCELERATION: base.ACCEL * .9,
        FOV: 1.1
    },
    GUNS: [{
        POSITION: [23, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.hunter, g.hunter2]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [20, 8, 1, 0, 0, 0, .2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.hunter]),
            TYPE: "bullet"
        }
    }]
}
Class.woomyMiniGrower = {
    PARENT: "woomy",
    LABEL: 'Mini Grower',
    BODY: {
        FOV: 1.05
    },
    GUNS: [{
        POSITION: [22, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini_grower]),
            TYPE: "woomyMiniGrowerBullet",
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }, {
        POSITION: [5.5, 11.5, 1, 14, 0, 0, 0]
    }]
}
Class.woomyInceptioner = {
    PARENT: "woomy",
    LABEL: 'Inceptioner',
    BODY: {
        ACCELERATION: base.ACCEL * .8,
        SPEED: base.SPEED * .9
    },
    GUNS: [{
        POSITION: [24.65, 3, 1, 0, 0, 0, 0]
    }, {
        POSITION: [8, 6, 1, 13, 0, 0, 0],
        PROPERTIES: {
            SHAPE: 0
        }
    }, {
        POSITION: [18, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.intercept]),
            TYPE: "woomyAutoBullet"
        }
    }]
}

// Twin upgrades
Class.woomyTwinFlank = makeMulti({
    PARENT: "woomy",
    DANGER: 6,
    GUNS: [{
        POSITION: [20, 8, 1, 0, 5.5, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [20, 8, 1, 0, -5.5, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
            TYPE: "bullet"
        }
    }]
}, 2, "Twin Flank")
Class.woomyTripleShot = {
    PARENT: "woomy",
    LABEL: 'Triple Shot',
    DANGER: 6,
    GUNS: [{
        POSITION: [19, 8, 1, 0, -2, -20, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [19, 8, 1, 0, 2, 20, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [22, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: "bullet"
        }
    }]
}
Class.woomyBoxer = {
    PARENT: "woomy",
    LABEL: 'Boxer',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * .8
    },
    GUNS: [{
        POSITION: [20, 12, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.flank]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [20, 8, 1, 0, 5.5, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [20, 8, 1, 0, -5.5, 180, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank]),
            TYPE: "bullet"
        }
    }]
}
Class.woomyGunner = {
    PARENT: "woomy",
    LABEL: 'Gunner',
    DANGER: 6,
    GUNS: [{
        POSITION: [12, 3.5, 1, 0, 7.25, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [12, 3.5, 1, 0, -7.25, 0, .75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [16, 3.5, 1, 0, -3.75, 0, .25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
            TYPE: "bullet"
        }
    }]
}
Class.woomyHewnTwin = {
    PARENT: "woomy",
    LABEL: 'Hewn Twin',
    DANGER: 6,
    GUNS: [{
        POSITION: [17, 3, 1, 0, -5.5, -25, .25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: "bullet",
            LABEL: 'Secondary'
        }
    }, {
        POSITION: [17, 3, 1, 0, 5.5, 25, .75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: "bullet",
            LABEL: 'Secondary'
        }
    }, {
        POSITION: [20, 8, 1, 0, 5.5, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.arty]),
            TYPE: "bullet",
            LABEL: 'Primary'
        }
    }, {
        POSITION: [20, 8, 1, 0, -5.5, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.arty]),
            TYPE: "bullet",
            LABEL: 'Primary'
        }
    }]
}

// Twin Flank upgrades
Class.woomyTripleTwin = makeMulti({
    PARENT: "woomy",
    LABEL: "Twin",
    DANGER: 7,
    GUNS: [{
        POSITION: [20, 8, 1, 0, 5.5, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [20, 8, 1, 0, -5.5, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
            TYPE: "bullet"
        }
    }]
}, 3)

// Triple Twin upgrades
Class.woomyPentaTwin = makeMulti({
    PARENT: "woomy",
    LABEL: "Twin",
    DANGER: 7,
    GUNS: [{
        POSITION: [20, 8, 1, 0, 5.5, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.spam, g.spam]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [20, 8, 1, 0, -5.5, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.spam, g.spam]),
            TYPE: "bullet"
        }
    }]
}, 5)

// Sniper upgrades
Class.woomyAssassin = {
    PARENT: "woomy",
    LABEL: 'Assassin',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * .6,
        SPEED: base.SPEED * .85,
        FOV: 1.35
    },
    GUNS: [{
        POSITION: [27, 8.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [5, 8.5, -1.6, 8, 0, 0, 0]
    }]
}
Class.woomyHunter = {
    PARENT: "woomy",
    LABEL: 'Hunter',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * .7,
        SPEED: base.SPEED * .9,
        FOV: 1.25
    },
    GUNS: [{
        POSITION: [23, 7, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [20, 11, 1, 0, 0, 0, .2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
            TYPE: "bullet"
        }
    }]
}
Class.woomyRifle = {
    PARENT: "woomy",
    LABEL: 'Rifle',
    DANGER: 6,
    BODY: {
        FOV: 1.225,
        ACCELERATION: base.ACCEL * .75
    },
    GUNS: [{
        POSITION: [20, 10.5, 1, 0, 0, 0, 0]
    }, {
        POSITION: [24, 7, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
            TYPE: "bullet"
        }
    }]
}
Class.woomyClicker = {
    PARENT: "woomy",
    LABEL: 'Clicker',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * .7,
        SPEED: base.SPEED * .9,
        FOV: 1.2
    },
    GUNS: [{
        POSITION: [23, 4, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.click]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [23, 4, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.click]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [23, 4, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.click]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [23, 4, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.click]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [24, 4, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.click]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [8, 8.5, -1.3, 5, 0, 0, 0]
    }]
}
Class.woomyTwinSniper = {
    PARENT: "woomy",
    LABEL: 'Twin Sniper',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * .5,
        SPEED: base.SPEED * .875,
        FOV: 1.2
    },
    GUNS: [{
        POSITION: [22, 8, 1, 0, 5.5, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [22, 8, 1, 0, -5.5, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
            TYPE: "bullet"
        }
    }]
}
Class.woomyFlankSniper = makeMulti(Class.woomySniper, 3, "Flank Sniper")
Class.woomyHuntress = {
    PARENT: "woomyInvis",
    LABEL: 'Huntress',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * .65,
        SPEED: base.SPEED * .925,
        FOV: 1.2
    },
    GUNS: [{
        POSITION: [24, 8.5, -1.75, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
            TYPE: "bullet"
        }
    }]
}
Class.woomyAssin = makeAuto({
    PARENT: "woomy",
    BODY: {
        ACCELERATION: base.ACCEL * .7,
        FOV: 1.2,
        DAMAGE: base.DAMAGE * 1.15
    },
    GUNS: [{
        POSITION: [24, 8.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assin]),
            TYPE: "bullet"
        }
    }]
}, "Assin", {
    type: "egg",
    size: 4,
    color: '#0019FF'
})

// Machine Gun upgrades
Class.woomyMinigun = {
    PARENT: "woomy",
    LABEL: 'Minigun',
    DANGER: 6,
    BODY: {
        FOV: 1.2
    },
    GUNS: [{
        POSITION: [21, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [19, 8, 1, 0, 0, 0, 1 / 3],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [17, 8, 1, 0, 0, 0, 2 / 3],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: "bullet"
        }
    }]
}
Class.woomyBlaster = {
    PARENT: "woomy",
    LABEL: 'Blaster',
    DANGER: 6,
    BODY: {
        SPEED: base.SPEED * .9,
        ACCELERATION: base.ACCEL * .7
    },
    GUNS: [{
        POSITION: [9, 10, 1.6, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blast]),
            TYPE: "bullet"
        }
    }]
}
Class.woomyGatlingGun = {
    PARENT: "woomy",
    LABEL: 'Gatling Gun',
    DANGER: 6,
    BODY: {
        FOV: 1.2,
        SPEED: base.SPEED * .85,
        ACCELERATION: base.ACCEL * .7
    },
    GUNS: [{
        POSITION: [16, 10, 1.4, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain, g.mach_smaller]),
            TYPE: "bullet"
        }
    }]
}
Class.woomyFlankMachine = makeMulti(Class.woomyMachineGun, 3, "Flank Machine")
Class.woomySprayer = {
    PARENT: "woomy",
    LABEL: 'Sprayer',
    DANGER: 6,
    GUNS: [{
        POSITION: [23, 7, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.low_power, g.mach, g.bit_smaller]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [12, 10, 1.4, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.mach_smaller]),
            TYPE: "bullet"
        }
    }]
}
Class.woomyInferno = {
    PARENT: "woomy",
    LABEL: 'Inferno',
    DANGER: 6,
    GUNS: [{
        POSITION: [10, 6, 1.5, 3, 2, 0, 0]
    }, {
        POSITION: [20, 6, 1, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.firestick]),
            TYPE: "woomyFlare"
        }
    }]
}
Class.woomyFoamGun = {
    PARENT: "woomy",
    LABEL: 'Foam Gun',
    DANGER: 7,
    GUNS: [{
        POSITION: [10, 10, 1.2, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.mach_smaller, g.half_reload, g.one_third_reload]),
            TYPE: "woomyBubble"
        }
    }]
}
Class.woomyTwinMachine = {
    PARENT: "woomy",
    LABEL: 'Twin Machine',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * .9
    },
    GUNS: [{
        POSITION: [14, 6.4, 1.38, 5, 5.7, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mach, g.bigger, g.less_range]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [14, 6.4, 1.38, 5, -5.7, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mach, g.bigger, g.less_range]),
            TYPE: "bullet"
        }
    }]
}
Class.woomyAssult = {
    PARENT: "woomyInvis",
    LABEL: 'Assult',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * .7,
        SPEED: base.SPEED * .9,
        FOV: 1.2
    },
    GUNS: [{
        POSITION: [17.25, 9.75, 1.3, 4.125, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [17.25, 6, 1, 4.125, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.fake]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [18, 3, 1, 2.25, 0, 0, 0]
    }, {
        POSITION: [1.5, 3.75, 1, 11.25, 0, 0, 0]
    }, {
        POSITION: [1.5, 3.75, 1, 14.25, 0, 0, 0]
    }, {
        POSITION: [1.5, 3.75, 1, 17.25, 0, 0, 0]
    }]
}

// Flank Guard upgrades
Class.woomyHexaTank = makeMulti({
    PARENT: "woomy",
    GUNS: [{
        POSITION: [18, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.bit_more_damage]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [18, 8, 1, 0, 0, 180, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.bit_more_damage]),
            TYPE: "bullet"
        }
    }]
}, 3, "Hexa Tank")
Class.woomyStorm = {
    PARENT: "woomy",
    LABEL: 'Storm',
    DANGER: 7,
    GUNS: []
}
for (let i = 0; i < 5; i++) Class.woomyStorm.GUNS = Class.woomyStorm.GUNS.concat({
    POSITION: [15, 3.5, 1, 0, 0, i * 36, i / 5],
    PROPERTIES: hurricaneProps
}, {
    POSITION: [15, 3.5, 1, 0, 0, i * 36 + 180, i / 5],
    PROPERTIES: hurricaneProps
})

// Hexa Tank upgradee
Class.woomyOctoTank = makeMulti({
    PARENT: "woomy",
    DANGER: 7,
    GUNS: [{
        POSITION: [18, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [18, 8, 1, 0, 0, 45, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: "bullet"
        }
    }]
}, 4, "Octo Tank")

// Director upgrades
Class.woomyOverseer = {
    PARENT: "woomy",
    LABEL: 'Overseer',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * .75,
        SPEED: base.SPEED * .9,
        FOV: 1.1
    },
    STAT_NAMES: statNames.drone,
    MAX_CHILDREN: 8,
    GUNS: [{
        POSITION: [6, 12, 1.2, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true
        }
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true
        }
    }]
}
Class.woomyCruiser = {
    PARENT: "woomy",
    LABEL: 'Cruiser',
    DANGER: 6,
    STAT_NAMES: statNames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * .8,
        FOV: 1.2
    },
    GUNS: [{
        POSITION: [7, 7.5, .6, 7, 4, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [7, 7.5, .6, 7, -4, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }]
}
Class.woomyMiniLightning = {
    PARENT: "woomy",
    LABEL: 'Mini Lightning',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * .75,
        FOV: 1.1
    },
    STAT_NAMES: statNames.drone,
    MAX_CHILDREN: 5,
    GUNS: [{
        POSITION: [6, 10, 1.2, 12, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.less_damage, g.faster]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true
        }
    }, {
        POSITION: [6, 10, 1.2, 8, 0, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.less_damage, g.faster]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true
        }
    }]
}

// Pounder upgrades
Class.woomyObliterator = {
    PARENT: "woomy",
    LABEL: 'Obliterator',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * .8,
        SPEED: base.SPEED * .9,
        FOV: 1.2
    },
    GUNS: [{
        POSITION: [12, 12, 1.01, 13.4, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [8, 8.57, 1.4, 5, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper, g.fake]),
            TYPE: "bullet"
        }
    }]
}
Class.woomyMultishot = {
    PARENT: "woomy",
    LABEL: 'Multishot',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * .75,
        FOV: 1.05
    },
    GUNS: [{
        POSITION: [4, 3, 1, 11, -3, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [4, 3, 1, 11, 3, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [4, 4, 1, 13, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
            TYPE: "casing"
        }
    }, {
        POSITION: [1, 4, 1, 12, -1, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [1, 4, 1, 11, 1, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
            TYPE: "casing"
        }
    }, {
        POSITION: [1, 3, 1, 13, -1, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [15, 12, 1, 6, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun, g.fake]),
            TYPE: "casing"
        }
    }, {
        POSITION: [8, 12, -1.3, 4, 0, 0, 0]
    }]
}
Class.woomyHeavyTwin = {
    PARENT: "woomy",
    LABEL: 'Heavy Twin',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * .8
    },
    GUNS: [{
        POSITION: [15, 10, 1, 6, 6.5, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [15, 10, 1, 6, -6.5, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [10, 15.2, 1.51, -4.4, 0, 0, 0]
    }]
}

// Single upgrades
Class.woomyDouble = {
    PARENT: "woomyZoom",
    LABEL: 'Double',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * .95
    },
    GUNS: [{
        POSITION: [20, 7.5, 1, 0, 4.75, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.single, g.bit_less_damage]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [20, 7.5, 1, 0, -4.75, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.single, g.bit_less_damage]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [15, 17, -1.177, 1, 0, 0, 0]
    }]
}
Class.woomyLumberjack = {
    PARENT: "woomyZoom",
    LABEL: 'Lumberjack',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * .65,
        SPEED: base.SPEED * .95,
        FOV: 1.2
    },
    GUNS: [{
        POSITION: [25, 8.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.single]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [8.5, 8.5, -1.8, 6.5, 0, 0, 0]
    }]
}
Class.woomyMachinist = {
    PARENT: "woomy",
    LABEL: 'Machinist',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * .95
    },
    SCOPED: true,
    GUNS: [{
        POSITION: [13, 8.5, 1.5, 12, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.single, g.bigger, g.mach_smaller]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [11.5, 10.5, -1.7, 4.5, 0, 0, 0]
    }]
}

// Pelleter upgrades
Class.woomyTriPelleter = makeMulti(Class.woomyPelleter, 3, "Tri-Pelleter")
Class.woomySailor = {
    PARENT: "woomy",
    LABEL: 'Sailor',
    DANGER: 6,
    GUNS: [{
        POSITION: [17, 2, 1, 0, 3, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.faster, g.pellet]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [17, 2, 1, 0, -3, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.faster, g.pellet]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [6, 5, .6, 6, 5.5, 15.2, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.less_reload, g.bigger, g.bit_less_damage]),
            TYPE: "swarm",
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [6, 5, .6, 6, -5.5, -15.2, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.less_reload, g.bigger, g.bit_less_damage]),
            TYPE: "swarm",
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [4.5, 8.5, -1.6, 7.5, 0, 0, 0]
    }]
}
Class.woomyBorer = {
    PARENT: "woomy",
    LABEL: 'Borer',
    DANGER: 6,
    BODY: {
        FOV: 1.2
    },
    GUNS: [{
        POSITION: [22, 2, 1, 0, 3, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.faster, g.pellet, g.bore]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [22, 2, 1, 0, -3, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.faster, g.pellet, g.bore]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [4.5, 8.5, -1.6, 7.5, 0, 0, 0]
    }]
}
Class.woomySubmachine = {
    PARENT: "woomy",
    LABEL: 'Submachine',
    DANGER: 7,
    GUNS: [{
        POSITION: [30, 1.5, 1, 0, 2.5, 0, .25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [30, 1.5, 1, 0, -2.5, 0, .75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [30, 1.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vulc, g.double_reload]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [12, 10, 1, 0, 0, 0, 0]
    }, {
        POSITION: [5, 10, 1, 20, 0, 0, 0]
    }]
}
Class.woomyNaturalist = {
    PARENT: "woomy",
    LABEL: 'Naturalist',
    DANGER: 6,
    GUNS: [{
        POSITION: [5, 2, -1.6, 12, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mach, g.pure_gunner, g.faster, g.pellet, g.double_reload, g.less_damage, g.more_health]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [4.5, 8.5, -1.6, 7.5, 0, 0, 0]
    }]
}

// Trapper upgrades
Class.woomyBuilder = {
    PARENT: "woomy",
    LABEL: 'Builder',
    DANGER: 6,
    BODY: {
        SPEED: base.SPEED * .8,
        FOV: 1.15
    },
    STAT_NAMES: statNames.block,
    GUNS: [{
        POSITION: [18, 12, 1, 0, 0, 0, 0]
    }, {
        POSITION: [2, 12, 1.1, 18, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: "setTrap"
        }
    }]
}
Class.woomyTriTrapper = makeMulti(Class.woomyTrapper, 3, 'Tri-Trapper');
Class.woomyTrapGuard = {
    PARENT: "woomy",
    LABEL: 'Trap Guard',
    DANGER: 6,
    STAT_NAMES: statNames.generic,
    BODY: {
        FOV: 1.05
    },
    GUNS: [{
        POSITION: [20, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [13, 8, 1, 0, 0, 180, 0]
    }, {
        POSITION: [4, 8, 1.7, 13, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: "trap",
            STAT_CALCULATOR: gunCalcNames.trap
        }
    }]
}
Class.woomyContagion = {
    PARENT: "woomy",
    LABEL: 'Contagion',
    DANGER: 6,
    BODY: {
        FOV: 1.1,
        ACCELERATION: base.ACCEL * .9
    },
    STAT_NAMES: statNames.generic,
    GUNS: [{
        POSITION: [19, 5.5, 1, 0, 0, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.contagi]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [13, 8, 1, 0, 0, 0, 0]
    }, {
        POSITION: [4, 8, 1.7, 13, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.more_range, g.less_spread]),
            TYPE: "trap",
            STAT_CALCULATOR: gunCalcNames.trap
        }
    }]
}
Class.woomyMegaTrapper = {
    PARENT: "woomy",
    LABEL: 'Mega Trapper',
    DANGER: 6,
    STAT_NAMES: statNames.trap,
    BODY: {
        SPEED: base.SPEED * .9,
        FOV: 1.1
    },
    GUNS: [{
        POSITION: [13.5, 14, 1, 0, 0, 0, 0]
    }, {
        POSITION: [3.5, 14, 1.8, 13.5, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.more_range, g.more_reload, g.bigger, g.fast]),
            TYPE: "trap",
            STAT_CALCULATOR: gunCalcNames.trap
        }
    }]
}
Class.woomyPacker = {
    PARENT: "woomy",
    LABEL: 'Packer',
    DANGER: 6,
    STAT_NAMES: statNames.trap,
    BODY: {
        FOV: 1.1
    },
    GUNS: [{
        POSITION: [13, 8, 1, 0, 0, 0, 0]
    }, {
        POSITION: [2, 14, .6, 18, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.more_range, g.less_spread, g.fake]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
            DUO_FIRE: true
        }
    }, {
        POSITION: [4, 8, 1.7, 13, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.more_range, g.less_spread]),
            TYPE: exports.splitTrap,
            STAT_CALCULATOR: gunCalcNames.trap,
            DUO_FIRE: true
        }
    }]
}
Class.woomyTwinTrapper = {
    PARENT: "woomy",
    LABEL: 'Twin Trapper',
    DANGER: 6,
    BODY: {
        FOV: 1.1
    },
    STAT_NAMES: statNames.trap,
    GUNS: [{
        POSITION: [13.5, 7, 1, 0, 6.5, 0, 0]
    }, {
        POSITION: [3, 7, 1.6, 13.5, 6.5, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.less_spread]),
            TYPE: "trap",
            STAT_CALCULATOR: gunCalcNames.trap
        }
    }, {
        POSITION: [13.5, 7, 1, 0, -6.5, 0, 0]
    }, {
        POSITION: [3, 7, 1.6, 13.5, -6.5, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.less_spread]),
            TYPE: "trap",
            STAT_CALCULATOR: gunCalcNames.trap
        }
    }]
}
Class.woomyMachineTrapper = {
    PARENT: "woomy",
    LABEL: 'Machine Trapper',
    DANGER: 6,
    STAT_NAMES: statNames.trap,
    BODY: {
        SPEED: base.SPEED * .95,
        FOV: 1.1
    },
    GUNS: [{
        POSITION: [13.5, 7, 1.75, 0, 0, 0, 0]
    }, {
        POSITION: [3, 13.1, 1.5, 13.5, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.less_range, g.smaller, g.bit_smaller, g.less_spread, g.double_reload, g.bit_less_reload]),
            TYPE: "trap",
            STAT_CALCULATOR: gunCalcNames.trap
        }
    }]
}

// Propeller upgrades
Class.woomyRotor = {
    PARENT: "woomy",
    LABEL: 'Rotor',
    DANGER: 6,
    BODY: {
        HEALTH: base.HEALTH * .9,
        SHIELD: base.SHIELD * .9,
        DENSITY: base.DENSITY * .75
    },
    GUNS: [{
        POSITION: [18, 8, 1, 0, 5.5, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank, g.tri, g.tri_front, g.tons_more_recoil]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [18, 8, 1, 0, -5.5, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank, g.tri, g.tri_front, g.tons_more_recoil]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [16, 6, 1, 0, 0, 150, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.less_power, g.bit_less_recoil]),
            TYPE: "bullet",
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }, {
        POSITION: [16, 6, 1, 0, 0, 210, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.less_power, g.bit_less_recoil]),
            TYPE: "bullet",
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }]
}

// Auto-2 upgrades
Class.woomyMachine2 = woomyAutoN(Class.woomyMachineGun, 2, "Machine-2")

// Minishot upgrades
Class.woomyArtillery = {
    PARENT: "woomy",
    LABEL: 'Artillery',
    DANGER: 6,
    GUNS: [{
        POSITION: [17, 3, 1, 0, -6, -7, .25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: "bullet",
            LABEL: 'Secondary'
        }
    }, {
        POSITION: [17, 3, 1, 0, 6, 7, .75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: "bullet",
            LABEL: 'Secondary'
        }
    }, {
        POSITION: [19, 12, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
            TYPE: "bullet",
            LABEL: 'Primary'
        }
    }]
}
Class.woomyShootist = {
    PARENT: "woomy",
    LABEL: 'Shootist',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * .7,
        SPEED: base.SPEED * .975,
        FOV: 1.2
    },
    GUNS: [{
        POSITION: [17, 3, 1, 0, -4.5, -7, .25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: "bullet",
            LABEL: 'Secondary'
        }
    }, {
        POSITION: [17, 3, 1, 0, 4.5, 7, .75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: "bullet",
            LABEL: 'Secondary'
        }
    }, {
        POSITION: [24, 8.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
            TYPE: "bullet",
            LABEL: 'Primary'
        }
    }]
}
Class.woomyMagmach = {
    PARENT: "woomy",
    LABEL: 'Magmach',
    DANGER: 6,
    GUNS: [{
        POSITION: [17, 3, 1, 0, -5, -7, .25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: "bullet",
            LABEL: 'Secondary'
        }
    }, {
        POSITION: [17, 3, 1, 0, 5, 7, .75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: "bullet",
            LABEL: 'Secondary'
        }
    }, {
        POSITION: [12, 10, 1.4, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.arty, g.mach_smaller]),
            TYPE: "bullet",
            LABEL: 'Primary'
        }
    }]
}

// Lancer upgrades
Class.woomyNavigator = {
    PARENT: "woomy",
    LABEL: 'Navigator',
    DANGER: 6,
    BODY: {
        SPEED: base.SPEED * 1.5,
        ACCELERATION: base.ACCEL * .7,
        FOV: 1.2
    },
    STAT_NAMES: {
      BULLET_SPEED: 'Lance Range',
      BULLET_HEALTH: 'Lance Longevity',
      BULLET_PEN: 'Lance Sharpness',
      BULLET_DAMAGE: 'Lance Damage',
      RELOAD: 'Lance Density'
    },
    GUNS: [{
        POSITION: [8, 4, 1.4, 6, 0, 0, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.lance]),
            TYPE: ["bullet", {
                ALPHA: 0,
                LABEL: 'Lance'
            }]
        }
    }, {
        POSITION: [8, 4, 1.4, 8.5, 0, 0, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.lance]),
            TYPE: ["bullet", {
                ALPHA: 0,
                LABEL: 'Lance'
            }]
        }
    }, {
        POSITION: [25, .3, -55, 0, 0, 0, 0]
    }, {
        POSITION: [5, 8, -1.6, 8, 0, 0, 0]
    }],
}
Class.woomyChasseur = {
    PARENT: "woomy",
    LABEL: 'Chasseur',
    DANGER: 6,
    BODY: {
        SPEED: base.SPEED * 1.5,
        ACCELERATION: base.ACCEL * .7
    },
    STAT_NAMES: {
      BULLET_SPEED: 'Lance Range',
      BULLET_HEALTH: 'Lance Longevity',
      BULLET_PEN: 'Lance Sharpness',
      BULLET_DAMAGE: 'Lance Damage',
      RELOAD: 'Lance Density'
    },
    GUNS: [{
        POSITION: [8, 4, 1.4, 6, 0, 0, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.lance, g.bit_less_damage]),
            TYPE: ["bullet", {
                ALPHA: 0,
                LABEL: 'Lance'
            }]
        }
    }, {
        POSITION: [8, 4, 1.4, 8.5, 0, 0, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.lance, g.bit_less_damage]),
            TYPE: ["bullet", {
                ALPHA: 0,
                LABEL: 'Lance'
            }]
        }
    }, {
        POSITION: [8, 4, 1.4, 11, 0, 0, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.lance, g.bit_less_damage]),
            TYPE: ["bullet", {
                ALPHA: 0,
                LABEL: 'Lance'
            }]
        }
    }, {
        POSITION: [28, .3, -55, 0, 0, 0, 0]
    }],
}

// Subduer upgrades
Class.woomyBinary = {
    PARENT: "woomy",
    LABEL: 'Binary',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * .8,
        FOV: 1.1
    },
    GUNS: [{
        POSITION: [20, 5, 1, 0, -5.5, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.hunter, g.hunter2]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [17, 8, 1, 0, -5.5, 0, .15],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.hunter]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [20, 5, 1, 0, 5.5, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.hunter, g.hunter2]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [17, 8, 1, 0, 5.5, 0, .65],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.hunter]),
            TYPE: "bullet"
        }
    }]
}
Class.woomyBlowgun = {
    PARENT: "woomy",
    LABEL: 'Blowgun',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * .85,
        SPEED: base.SPEED * .95,
        FOV: 1.1
    },
    GUNS: [{
        POSITION: [20, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.hunter, g.hunter2, g.more_reload]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [17, 8, 1, 0, 0, 0, .2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.hunter, g.more_reload]),
            TYPE: "bullet"
        }
    }]
}

// Mini Grower upgrades
Class.woomyTwiniGrower = {
    PARENT: "woomy",
    LABEL: 'Twini Grower',
    DANGER: 6,
    BODY: {
        FOV: 1.05
    },
    GUNS: [{
        POSITION: [22, 9, 1, 0, 5.5, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini_grower, g.twin, g.less_reload, g.bit_more_reload]),
            TYPE: "woomyMiniGrowerBullet",
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }, {
        POSITION: [22, 9, 1, 0, -5.5, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini_grower, g.twin, g.less_reload, g.bit_more_reload]),
            TYPE: "woomyMiniGrowerBullet",
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }, {
        POSITION: [5.5, 23, 1, 14, 0, 0, 0]
    }]
}

// Inceptioner upgrades
Class.woomyMachceptioner = {
    PARENT: "woomy",
    LABEL: 'Machceptioner',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * .8,
        SPEED: base.SPEED * .85
    },
    GUNS: [{
        POSITION: [24.65, 3, 1, 2.25, 0, 0, 0]
    }, {
        POSITION: [8, 6, 1, 15.25, 0, 0, 0],
        PROPERTIES: {
            SKIN: 3
        }
    }, {
        POSITION: [12, 10, 1.4, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.mach_smaller, g.intercept, g.bit_less_reload]),
            TYPE: "woomyAutoBullet"
        }
    }]
}

// Hybrid tanks
Class.woomyBasebrid = woomyHybrid(Class.woomyBasic, 'Basebrid')
    Class.woomyTwinbrid = woomyHybrid(Class.woomyTwin, "Twinbrid")
    Class.woomySnipebrid = woomyHybrid(Class.woomySniper, "Snipebrid")
    Class.woomyPoundbrid = woomyHybrid(Class.woomyPounder, "Poundbrid")
    Class.woomyHybridPelleter = woomyHybrid(Class.woomyPelleter)
    Class.woomyTrapbrid = woomyHybrid(Class.woomyTrapper, "Trapbrid")
    Class.woomyEqualizer = woomyHybrid(Class.woomySingle, "Equalizer")
    Class.woomyFlankCruiser = woomyHybridSwarm(Class.woomyBasic, "Flank Cruiser")
    Class.woomyLancebrid = woomyHybrid(Class.woomyLancer, "Lancebrid")
    Class.woomyPrivate = woomyHybrid(Class.woomyMinishot, "Private")

// Auto tanks
Class.woomyAutoBasic = makeAuto(Class.woomyBasic)
    Class.woomyAutoTwin = makeAuto(Class.woomyTwin)
    Class.woomyAutoSniper = makeAuto(Class.woomySniper)
    Class.woomyAutoMachineGun = makeAuto(Class.woomyMachineGun)
    Class.woomyAutoFlankGuard = makeAuto(Class.woomyFlankGuard)
    Class.woomyChairman = makeAuto(Class.woomyDirector, "Chairman")
    Class.woomyScratcher = makeAuto(Class.woomyPounder, "Scratcher")
    Class.woomyAssailant = makeAuto(Class.woomySingle, "Assailant")
    Class.woomyAutoPelleter = makeAuto(Class.woomyPelleter)
    Class.woomyAutoTrapper = makeAuto(Class.woomyTrapper)
    Class.woomyAutoPropeller = makeAuto(Class.woomyPropeller)
    Class.woomyAutoMinishot = makeAuto(Class.woomyMinishot)
    Class.woomyAutoAuto2 = makeAuto(Class.woomyAuto2)
    Class.woomyAutoMiniGrower = makeAuto(Class.woomyMiniGrower)
    Class.woomyAutoLancer = makeAuto(Class.woomyLancer, "Auto-Lancer", {
        type: "autoSmasherTurret",
        size: 11,
    })
    Class.woomyAutoBasebrid = makeAuto(Class.woomyBasebrid)

// Dev generics
Class.woomyDeveloper = {
    PARENT: "developer",
    UPGRADE_LABEL: "Woomy-Arras",
    SHAPE: 9,
    FACING_TYPE: 'autospin',
    LEVEL: 60,
    REROOT_UPGRADE_TREE: "woomyBasic",
    GUNS: [],
    TURRETS: [{
        POSITION: [11, 0, 0, 0, 361, 1],
        TYPE: "woomyDeveloperTurret"
    }, {
        POSITION: [23, 0, 0, 0, 0, 0],
        TYPE: "woomyDeveloperBody"
    }]
}
Class.addons.UPGRADES_TIER_0.push("woomyDeveloper")
Class.woomyDeveloper.UPGRADES_TIER_0 = [
    "woomyBasic",
]

// Basic upgrade paths
Class.woomyBasic.UPGRADES_TIER_1 = [
    "woomyTwin",
    "woomySniper",
    "woomyMachineGun",
    "woomyFlankGuard",
    "woomyDirector",
    "woomyPounder",
    "woomySingle",
    "woomyPelleter",
    "woomyTrapper",
    "woomyPropeller",
    "woomyAuto2",
    "woomyMinishot",
    "woomyLancer",
    "woomyAutoBasic",
    "woomyBasebrid",
    "woomySubduer",
    "woomyMiniGrower",
    "woomyInceptioner",
]

// Twin upgrade paths
Class.woomyTwin.UPGRADES_TIER_2 = [
    "woomyTwinFlank",
    "woomyTripleShot",
    "woomyHexaTank",
    "woomyBoxer",
    "woomyDouble",
    "woomyAutoTwin",
    "woomyTwinSniper",
    "woomyTwinTrapper",
    "woomyHeavyTwin",
    "woomyGunner",
    "woomyCruiser",
    "woomyTwinMachine",
    "woomyHewnTwin",
    "woomyRotor",
    "woomyTwinbrid",
    "woomyBinary",
    "woomyStorm",
    "woomyTwiniGrower",
    //"woomyHomingTwin",
]
Class.woomyTwinFlank.UPGRADES_TIER_3 = ["woomyTripleTwin"]
    Class.woomyTripleTwin.UPGRADES_TIER_4 = ["woomyPentaTwin"]

// Sniper upgrade paths
Class.woomySniper.UPGRADES_TIER_2 = [
    "woomyAssassin",
    "woomyHunter",
    "woomyMinigun",
    "woomyRifle",
    "woomyBorer",
    "woomyLumberjack",
    "woomyClicker",
    "woomyTwinSniper",
    "woomyFlankSniper",
    "woomyAutoSniper",
    "woomyGatlingGun",
    "woomyObliterator",
    "woomySnipebrid",
    "woomyNavigator",
    "woomyHuntress",
    "woomyShootist",
    "woomyChasseur",
    "woomyMiniLightning",
    //"woomyAcid",
    //"woomyChiller",
    //"woomyAllergen",
    //"woomyKevin",
    "woomyAssin",
]

// Machine Gun upgrade paths
Class.woomyMachineGun.UPGRADES_TIER_2 = [
    "woomyMinigun",
    "woomyGunner",
    "woomyBlaster",
    "woomyGatlingGun",
    "woomyFlankMachine",
    "woomyAutoMachineGun",
    "woomySprayer",
    "woomyMachinist",
    "woomyMachineTrapper",
    "woomySubmachine",
    "woomyInferno",
    "woomyFoamGun",
    "woomyTwinMachine",
    "woomyAssult",
    "woomyNaturalist",
    "woomyMachine2",
    "woomyBlowgun",
    "woomyMultishot",
    "woomyMagmach",
    "woomyMachceptioner",
]

// Flank Guard upgrade paths
Class.woomyFlankGuard.UPGRADES_TIER_2 = [
    "woomyHexaTank",
    //"woomyTriAngle",
    //"woomyAuto3",
    "woomyTrapGuard",
    //"woomyFlankSingle",
    "woomyTriPelleter",
    "woomyTriTrapper",
    "woomyFlankSniper",
    "woomyFlankMachine",
    //"woomyFlankPounder",
    "woomyAutoFlankGuard",
    //"woomyTriLancer",
    //"woomyArachnid",
    //"woomyFlankCruiser",
    //"woomyBackShield",
    "woomyStorm",
    //"woomyFlankSubduer",
    //"woomyFlankMiniGrower",
    //"woomyColony",
    //"woomyFlankceptioner",
    //"woomyThief",
]
Class.woomyHexaTank.UPGRADES_TIER_3 = ["woomyOctoTank"]

// Director upgrade paths
Class.woomyDirector.UPGRADES_TIER_2 = [
    "woomyOverseer",
    "woomyCruiser",
    //"woomyUnderseer",
    //"woomySpawner",
    //"woomyPathogen",
    //"woomyProbationer",
    //"woomyHeatseeker",
    //"woomyNavyist",
    "woomyChairman",
    //"woomyColony",
    //"woomyMotor",
    "woomyMiniLightning",
    //"woomyDirector2",
]

// Pounder upgrade paths
Class.woomyPounder.UPGRADES_TIER_2 = [
    //"woomyDestroyer",
    "woomyPoundbrid",
    "woomyBuilder",
    "woomyArtillery",
    //"woomyFlankPounder",
    //"woomySpreadling",
    "woomyScratcher",
    //"woomyLauncher",
    //"woomyBruiser",
    "woomyObliterator",
    "woomyMultishot",
    "woomyHeavyTwin",
    //"woomyKinetic",
    "woomyBoxer",
    //"woomyMiniSwarmer",
    "woomyMegaTrapper",
    //"woomySchooner",
    //"woomyTailgator",
    "woomyBlaster",
    //"woomyWaraxe",
    //"woomyMega2",
    //"woomyProbationer",
    //"woomyGrower",
    //"woomySecurityPounder",
    //"woomyKevin",
]

// Single upgrade paths
Class.woomySingle.UPGRADES_TIER_2 = [
    "woomyDouble",
    "woomyLumberjack",
    "woomyMachinist",
    //"woomyFlankSingle",
    "woomyAssailant",
    "woomyEqualizer",
    //"woomyBombardmentor",
    //"woomySingle2",
    //"woomyMachete",
    //"woomyAirscrew",
    //"woomyBruiser",
    //"woomySolitaire",
    //"woomySSubduer",
    //"woomySlice",
]

// Pelleter upgrade paths
Class.woomyPelleter.UPGRADES_TIER_2 = [
    "woomyTriPelleter",
    "woomySailor",
    "woomyBorer",
    //"woomyPuntGun",
    //"woomyHewnPelleter",
    "woomyAutoPelleter",
    "woomyHybridPelleter",
    "woomyGunner",
    "woomySubmachine",
    //"woomyAirscrew",
    //"woomyBallista",
    "woomyNaturalist",
    //"woomyPelleter2",
    "woomyCruiser",
    "woomyStorm",
    //"woomyDropship",
]

// Trapper upgrade paths
Class.woomyTrapper.UPGRADES_TIER_2 = [
    "woomyBuilder",
    "woomyTriTrapper",
    "woomyTrapGuard",
    "woomyAutoTrapper",
    "woomyContagion",
    "woomyMegaTrapper",
    //"woomyPacker",
    //"woomySwarmingTrapper",
    "woomyTwinTrapper",
    "woomyMachineTrapper",
    //"woomyArsenal",
    //"woomyFoghorn",
    "woomyTrapbrid",
    //"woomyBombardmentor",
    //"woomyMinelayer",
    //"woomyTrapper2",
    //"woomyTrapperang",
]

// Propeller upgrade paths
Class.woomyPropeller.UPGRADES_TIER_2 = [
    //"woomyTriAngle",
    //"woomyBateau",
    //"woomySteamboat",
    "woomyRotor",
    //"woomyTrailblazer",
    "woomyAutoPropeller",
    //"woomyAccelerator",
]

// Auto-2 upgrade paths
Class.woomyAuto2.UPGRADES_TIER_2 = [
    //"woomyAuto3",
    //"woomySwivel2",
    //"woomyTrapper2",
    //"woomySingle2",
    "woomyMachine2",
    "woomyAutoAuto2",
    //"woomyMega2",
    //"woomyPelleter2",
    //"woomyAuto22",
    //"woomySubduer2",
    //"woomyRevolutionist",
    //"woomyCephalopod",
    //"woomyThief",
    //"woomyDirector2",
]

// Minishot upgrade paths
Class.woomyMinishot.UPGRADES_TIER_2 = [
    "woomyArtillery",
    //"woomyHarasser",
    "woomyTripleShot",
    //"woomySpreadling",
    //"woomyRecruit",
    //"woomyHewnPelleter",
    "woomyHewnTwin",
    //"woomyStiletto",
    //"woomyArachnid",
    "woomyAutoMinishot",
    //"woomyMachete",
    "woomyShootist",
    "woomyPrivate",
    "woomyMagmach",
    //"woomyDropship",
]

// Lancer upgrade paths
Class.woomyLancer.UPGRADES_TIER_2 = [
    "woomyNavigator",
    //"woomyTrailblazer",
    //"woomySerrator",
    //"woomyStiletto",
    "woomyChasseur",
    //"woomyTriLancer",
    //"woomyWaraxe",
    //"woomyJouster",
    //"woomyPusher",
    "woomyLancebrid",
    "woomyAutoLancer",
    //"woomyTelepointer",
    //"woomySlice",
    //"woomySmasher",
]

// Auto-Basic upgrade paths
Class.woomyAutoBasic.UPGRADES_TIER_2 = [
    "woomyAutoTwin",
    "woomyAutoSniper",
    "woomyAutoMachineGun",
    "woomyAutoFlankGuard",
    "woomyChairman",
    "woomyScratcher",
    "woomyAssailant",
    "woomyAutoPelleter",
    "woomyAutoTrapper",
    "woomyAutoPropeller",
    "woomyAutoMinishot",
    "woomyAutoAuto2",
    "woomyAutoMiniGrower",
    "woomyAutoLancer",
    "woomyAutoBasebrid",
    //"woomyBasiception",
    //"woomySpawner",
    //"woomyRevolutionist",
]

// Basebrid upgrade paths
Class.woomyBasebrid.UPGRADES_TIER_2 = [
    "woomyTwinbrid",
    "woomySnipebrid",
    "woomyPoundbrid",
    "woomyHybridPelleter",
    "woomyTrapbrid",
    "woomyEqualizer",
    "woomyFlankCruiser",
    "woomyLancebrid",
    "woomyPrivate",
    "woomyAutoBasebrid",
    //"woomyBasekick",
]

// Subduer upgrade paths
Class.woomySubduer.UPGRADES_TIER_2 = [
    "woomyMinigun",
    "woomyBinary",
    "woomyHunter",
    "woomySprayer",
    //"woomyPathogen",
    "woomyContagion",
    //"woomyMitochondrion",
    "woomyBlowgun",
    //"woomySSubduer",
    //"woomySubduer2",
    //"woomyFlankSubduer",
]

// Mini Grower upgrade paths
Class.woomyMiniGrower.UPGRADES_TIER_2 = [
    //"woomyGrower",
    "woomyAutoMiniGrower",
    "woomyInferno",
    //"woomyFlankMiniGrower",
    //"woomyTwiniGrower",
]

// Inceptioner upgrade paths
Class.woomyInceptioner.UPGRADES_TIER_2 = [
    //"woomyCeptionist",
    //"woomyTailgator",
    //"woomyMotor",
    //"woomyArsenal",
    "woomyMachceptioner",
    //"woomyFlankceptioner",
]

}
