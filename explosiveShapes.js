/**
 * Explosive Shapes by Trplnr
 * 
 * - This addon will add 4 explosive shapes
 *   > Microbomb, Quadrafragment, Trisonator, Clusterbomb
 * 
 * - These explosive shapes are also gonna be available through the Addons tank
 * - And will spawn around the map by default
 * 
 * - These explosives will explode on death or after 3 seconds when below a third of its health.
 * - These deal tons of damage that can halve the health of a full health build smasher,
 *      but in return it gives decent xp.
 * 
 * - You can use these to your advantage when fighting opponents like luring them into an explosion.
 * - And even when running away.
 * 
 * Shape spawning is enabled by default, See line <34> to disable it
 * This addon is disabled by default, See lines <36-38> to enable it
 * 
 * VERSION 2.0.0-beta
 */

const { Entity } = require('../../live/entity')
const { combineStats } = require('../facilitators')
const g = {
    // Misc
    blank: { },
    small: { size: 0.8 },
    micro: { size: 0.4 },
    weak: { reload: 2, health: 0.6, damage: 0.6, pen: 0.8, speed: 0.5, maxSpeed: 0.7, range: 0.25, density: 0.3 },
    power: { shudder: 0.6, size: 1.2, pen: 1.25, speed: 2, maxSpeed: 1.7, density: 2, spray: 0.5, resist: 1.5 },
    fake: { recoil: 0.00001, size: 0.00001, health: 0.0001, speed: 0.00001, maxSpeed: 2, range: 0 },
    op: { reload: 0.5, recoil: 1.3, health: 4, damage: 4, pen: 4, speed: 3, maxSpeed: 2, density: 5, spray: 2 },
    closer: { reload: 1.25, recoil: 0.25, health: 1000, damage: 1000, pen: 1000, speed: 2.5, maxSpeed: 2.25, range: 1.4, density: 4, spray: 0.25 },

    // Bases
    basic: { reload: 18, recoil: 1.4, shudder: 0.1, damage: 0.75, speed: 4.5, spray: 15 },
    drone: { reload: 50, recoil: 0.25, shudder: 0.1, size: 0.6, speed: 2, spray: 0.1 },
    trap: { reload: 36, shudder: 0.25, size: 0.6, damage: 0.75, speed: 5, spray: 15, resist: 3 },
    swarm: { reload: 18, recoil: 0.25, shudder: 0.05, size: 0.4, damage: 0.75, speed: 4, spray: 5 },
    factory: { reload: 60, shudder: 0.1, size: 0.7, damage: 0.75, speed: 3, spray: 0.1 },
    productionist: { reload: 75, recoil: 0.25, shudder: 0.05, size: 0.7, damage: 0.75, speed: 4, range: 1.5, spray: 5 },

    // Spammers
    single: { reload: 1.05, speed: 1.05 },
    twin: { recoil: 0.5, shudder: 0.9, health: 0.9, damage: 0.7, spray: 1.2 },
    double: { damage: 0.9 },
    hewn: { reload: 1.25, recoil: 1.5, health: 0.9, damage: 0.85, maxSpeed: 0.9 },
    bent: { reload: 1.1, shudder: 0.8, health: 0.9, pen: 0.8, density: 0.8, spray: 0.5 },
    spreadmain: { reload: 0.781, recoil: 0.25, shudder: 0.5, health: 0.5, speed: 1.923, maxSpeed: 2.436 },
    spread: { reload: 1.5, shudder: 0.25, speed: 0.7, maxSpeed: 0.7, spray: 0.25 },
    triple: { reload: 1.2, recoil: 0.667, shudder: 0.9, health: 0.85, damage: 0.85, pen: 0.9, density: 1.1, spray: 0.9, resist: 0.95 },
    quint: { reload: 1.5, recoil: 0.667, shudder: 0.9, pen: 0.9, density: 1.1, spray: 0.9, resist: 0.95 },
    turret: { reload: 2, health: 0.8, damage: 0.6, pen: 0.7, density: 0.1 },

    // Snipers
    sniper: { reload: 1.35, shudder: 0.25, damage: 0.8, pen: 1.1, speed: 1.5, maxSpeed: 1.5, density: 1.5, spray: 0.2, resist: 1.15 },
    crossbow: { reload: 2, health: 0.6, damage: 0.6, pen: 0.8 },
    assass: { reload: 1.65, shudder: 0.25, health: 1.15, pen: 1.1, speed: 1.18, maxSpeed: 1.18, density: 3, resist: 1.3 },
    hunter: { reload: 1.5, recoil: 0.7, size: 0.95, damage: 0.9, speed: 1.1, maxSpeed: 0.8, density: 1.2, resist: 1.15 },
    hunter2: { size: 0.9, health: 2, damage: 0.5, pen: 1.5, density: 1.2, resist: 1.1 },
    preda: { reload: 1.4, size: 0.8, health: 1.5, damage: 0.9, pen: 1.2, speed: 0.9, maxSpeed: 0.9 },
    dual: { reload: 2, shudder: 0.8, health: 1.5, speed: 1.3, maxSpeed: 1.1, resist: 1.25 },
    rifle: { reload: 0.8, recoil: 0.8, shudder: 1.5, health: 0.8, damage: 0.8, pen: 0.9, spray: 2 },
    blunderbuss: { recoil: 0.1, shudder: 0.5, health: 0.4, damage: 0.2, pen: 0.4, spray: 0.5 },

    // Machine guns
    mach: { reload: 0.5, recoil: 0.8, shudder: 1.7, health: 0.7, damage: 0.7, maxSpeed: 0.8, spray: 2.5 },
    mini: { reload: 1.25, recoil: 0.6, size: 0.8, health: 0.55, damage: 0.45, pen: 1.25, speed: 1.33, density: 1.25, spray: 0.5, resist: 1.1 },
    stream: { reload: 1.1, recoil: 0.6, damage: 0.65, speed: 1.24 },
    nail: { reload: 0.85, recoil: 2.5, size: 0.8, damage: 0.7, density: 2 },
    gunner: { reload: 1.25, recoil: 0.25, shudder: 1.5, size: 1.1, damage: 0.35, pen: 1.35, speed: 0.9, maxSpeed: 0.8, density: 1.5, spray: 1.5, resist: 1.2 },
    puregunner: { recoil: 0.25, shudder: 1.5, size: 1.2, health: 1.35, damage: 0.25, pen: 1.25, speed: 0.8, maxSpeed: 0.65, density: 1.5, spray: 1.5, resist: 1.2 },
    machgun: { reload: 0.66, recoil: 0.8, shudder: 2, damage: 0.75, speed: 1.2, maxSpeed: 0.8, spray: 2.5 },
    blaster: { recoil: 1.2, shudder: 1.25, size: 1.1, health: 1.5, pen: 0.6, speed: 0.8, maxSpeed: 0.33, range: 0.6, density: 0.5, spray: 1.5, resist: 0.8 },
    chain: { reload: 1.25, recoil: 1.33, shudder: 0.8, health: 0.8, pen: 1.1, speed: 1.25, maxSpeed: 1.25, range: 1.1, density: 1.25, spray: 0.5, resist: 1.1 },
    atomizer: { reload: 0.3, recoil: 0.8, size: 0.5, damage: 0.75, speed: 1.2, maxSpeed: 0.8, spray: 2.25 },
    spam: { reload: 1.1, size: 1.05, damage: 1.1, speed: 0.9, maxSpeed: 0.7, resist: 1.05 },
    gunnerDominator: { reload: 1.1, recoil: 0, shudder: 1.1, size: 0.5, health: 0.5, damage: 0.5, speed: 1.1, density: 0.9, spray: 1.2, resist: 0.8 },

    // Flanks
    flank: { recoil: 1.2, health: 1.02, damage: 0.81, pen: 0.9, maxSpeed: 0.85, density: 1.2 },
    hurricane: { health: 1.3, damage: 1.3, pen: 1.1, speed: 1.5, maxSpeed: 1.15 },
    tri: { recoil: 0.9, health: 0.9, speed: 0.8, maxSpeed: 0.8, range: 0.6 },
    trifront: { recoil: 0.2, speed: 1.3, maxSpeed: 1.1, range: 1.5 },
    thruster: { recoil: 1.5, shudder: 2, health: 0.5, damage: 0.5, pen: 0.7, spray: 0.5, resist: 0.7 },

    // Autos
    auto: { reload: 0.9, recoil: 0.75, shudder: 0.5, size: 0.8, health: 0.9, damage: 0.6, pen: 1.2, speed: 1.1, range: 0.8, density: 1.3, resist: 1.25 },
    five: { reload: 1.15, speed: 1.05, maxSpeed: 1.05, range: 1.1, density: 2 },
    autosnipe: { size: 1.4, health: 2 },

    // Drones
    over: { reload: 1.25, size: 0.85, health: 0.7, damage: 0.8, maxSpeed: 0.9, density: 2 },
    meta: { reload: 1.333, damage: 0.667 },
    overdrive: { reload: 5, health: 0.8, damage: 0.8, pen: 0.8, speed: 0.9, maxSpeed: 0.9, range: 0.9, spray: 1.2 },
    commander: { reload: 3, size: 0.7, health: 0.4, damage: 0.7, range: 0.1, density: 0.5 },
    protectorswarm: { reload: 5, recoil: 0.000001, health: 100, range: 0.5, density: 5, resist: 10 },
    battle: { health: 1.25, damage: 1.15, maxSpeed: 0.85, resist: 1.1 },
    carrier: { reload: 1.5, damage: 0.8, speed: 1.3, maxSpeed: 1.2, range: 1.2 },
    bees: { reload: 1.3, size: 1.4, damage: 1.5, pen: 0.5, speed: 3, maxSpeed: 1.5, density: 0.25 },
    sunchip: { reload: 5, size: 1.4, health: 0.5, damage: 0.4, pen: 0.6, density: 0.8 },
    maleficitor: { reload: 0.5, size: 1.05, health: 1.15, damage: 1.15, pen: 1.15, speed: 0.8, maxSpeed: 0.8, density: 1.15 },
    summoner: { reload: 0.3, size: 1.125, health: 0.4, damage: 0.345, pen: 0.4, density: 0.8 },
    minion: { shudder: 2, health: 0.4, damage: 0.4, pen: 1.2, range: 0.75, spray: 2 },
    babyfactory: { reload: 1.5, maxSpeed: 1.35 },
    mehdrone: { size: 1.35, health: 1.75, speed: 1.125 },
    bigdrone: { size: 1.8, health: 2.5, speed: 1.25 },
    mothership: { reload: 1.25, pen: 1.1, speed: 0.775, maxSpeed: 0.8, range: 15, resist: 1.15 },

    // Heavy cannons
    pound: { reload: 2, recoil: 1.6, damage: 2, speed: 0.85, maxSpeed: 0.8, density: 1.5, resist: 1.15 },
    destroy: { reload: 2.2, recoil: 1.8, shudder: 0.5, health: 2, damage: 2, pen: 1.2, speed: 0.65, maxSpeed: 0.5, density: 2, resist: 3 },
    anni: { reload: 0.8, recoil: 1.25 },
    hive: { reload: 1.5, recoil: 0.8, size: 0.8, health: 0.7, damage: 0.3, maxSpeed: 0.6 },
    arty: { reload: 1.2, recoil: 0.7, size: 0.9, speed: 1.15, maxSpeed: 1.1, density: 1.5 },
    mortar: { reload: 1.2, health: 1.1, speed: 0.8, maxSpeed: 0.8 },
    destroyerDominator: { reload: 6.5, recoil: 0, size: 0.975, health: 6, damage: 6, pen: 6, speed: 0.575, maxSpeed: 0.475, spray: 0.5 },
    shotgun: { reload: 8, recoil: 0.4, size: 1.5, damage: 0.4, pen: 0.8, speed: 1.8, maxSpeed: 0.6, density: 1.2, spray: 1.2 },
    
    // Missiles
    launcher: { reload: 1.5, recoil: 1.5, shudder: 0.1, size: 0.72, health: 1.05, damage: 0.925, speed: 0.9, maxSpeed: 1.2, range: 1.1, resist: 1.5 },
    skim: { recoil: 0.8, shudder: 0.8, size: 0.9, health: 1.35, damage: 0.8, pen: 2, speed: 0.3, maxSpeed: 0.3, resist: 1.1 },
    snake: { reload: 0.4, shudder: 4, health: 1.5, damage: 0.9, pen: 1.2, speed: 0.2, maxSpeed: 0.35, density: 3, spray: 6, resist: 0.5 },
    sidewind: { reload: 1.5, recoil: 2, health: 1.5, damage: 0.9, speed: 0.15, maxSpeed: 0.5 },
    snakeskin: { reload: 0.6, shudder: 2, health: 0.5, damage: 0.5, maxSpeed: 0.2, range: 0.4, spray: 5 },
    rocketeer: { reload: 1.4, shudder: 0.9, size: 1.2, health: 1.5, damage: 1.4, pen: 1.4, speed: 0.3, range: 1.2, resist: 1.4 },
    missileTrail: { reload: 0.6, recoil: 0.25, shudder: 2, damage: 0.9, pen: 0.7, speed: 0.4, range: 0.5 },
    rocketeerMissileTrail: { reload: 0.5, recoil: 7, shudder: 1.5, size: 0.8, health: 0.8, damage: 0.7, speed: 0.9, maxSpeed: 0.8, spray: 5 },
    
    // Traps and blocks
    block: { reload: 1.1, recoil: 2, shudder: 0.1, size: 1.5, health: 2, pen: 1.25, speed: 1.5, maxSpeed: 2.5, range: 1.25, resist: 1.25 },
    construct: { reload: 1.3, size: 0.9, maxSpeed: 1.1 },
    boomerang: { reload: 0.8, health: 0.5, damage: 0.5, speed: 0.75, maxSpeed: 0.75, range: 1.333 },
    nest_keeper: { reload: 3, size: 0.75, health: 1.05, damage: 1.05, pen: 1.1, speed: 0.5, maxSpeed: 0.5, range: 0.5, density: 1.1 },
    hexatrap: { reload: 1.3, shudder: 1.25, speed: 0.8, range: 0.5 },
    megatrap: { reload: 2, recoil: 1.5, shudder: 0.75, size: 1.8, health: 1.52, damage: 1.52, pen: 1.52, speed: 0.9, maxSpeed: 0.8, range: 1.4, resist: 2.5 },
    trapperDominator: { reload: 1.26, recoil: 0, shudder: 0.25, health: 1.25, damage: 1.45, pen: 1.6, speed: 0.5, maxSpeed: 2, range: 0.7, spray: 0.5 },

    // Recoil
    tonsmorrecoil: { recoil: 4 },
    lotsmorrecoil: { recoil: 1.8 },
    muchmorerecoil: { recoil: 1.35 },
    morerecoil: { recoil: 1.15 },
    halfrecoil: { recoil: 0.5 },

    // Reload
    halfreload: { reload: 2 },
    lessreload: { reload: 1.5 },
    one_third_reload: { reload: 1.333 },
    morereload: { reload: 0.75 },
    doublereload: { reload: 0.5 },

    // Speed
    fast: { speed: 1.2 },
    veryfast: { speed: 2.5 },
    morespeed: { speed: 1.3, maxSpeed: 1.3 },
    bitlessspeed: { speed: 0.93, maxSpeed: 0.93 },
    slow: { speed: 0.7, maxSpeed: 0.7 },
    halfspeed: { speed: 0.5, maxSpeed: 0.5 },

    // Misc 2
    healer: { damage: -1 },
    lancer: { reload: 0.4, speed: 0.1, maxSpeed: 0.1, range: 0.1 },
    celeslower: { size: 0.5 },
    lowpower: { shudder: 2, health: 0.5, damage: 0.5, pen: 0.7, spray: 0.5, resist: 0.7 },
    notdense: { density: 0.1 },
    halfrange: { range: 0.5 },
    acc: { shudder: 0.1 },
    aura: { reload: 0.001, recoil: 0.001, shudder: 0.001, size: 6, damage: 3, speed: 0.001, maxSpeed: 0.001, spray: 0.001 },
    noRandom: { shudder: 0.00001, spray: 0.00001 }
}

/**
 * 
 * @param {object} Class
 * @param {Record<any, import("../../../..").Tank>} Class.Class
 */
module.exports = ({Config}) => {

    // Comment this line below to enable the addon :)
    return console.log('[explosiveShapes.js] is disabled by default')

    // Comment these 3 lines below to disable explosive shapes spawning in the map :(
    Config.FOOD_TYPES.push([50, [
        [1000, 'microbomb'], [500, 'quadrafragment']//, [250, 'trisonator'], [125, 'clusterbomb']
    ]])

    //#region Config
    const config = {
        fragSpeedMultiplier: 25, // How fast the frags fly off
        scoreMultiplier: 10, // How much it multiplies the score of the normal shape.
        damageMultiplier: 10, // How much it multiplies the damage of the normal shape
        healthMultipler: 3, // How much it multiplies the health of the normal shape.
        enableBraindeadNames: false, // Makes the explosives have funny names
        shapePath2Ds: { // The Path2D Shapes (will optimize)
            microbombDecor: 'M 0.2758 -2.3635 C 0.172 -2.6062 -0.172 -2.6062 -0.2758 -2.3635 L -0.6786 -1.4216 C -1.2084 -1.1683 -1.575 -0.6272 -1.575 0 C -1.575 0.6272 -1.2084 1.1683 -0.6786 1.4217 L -0.2758 2.3635 C -0.172 2.6062 0.172 2.6062 0.2758 2.3635 L 0.6786 1.4217 C 1.2084 1.1683 1.575 0.6272 1.575 0 C 1.575 -0.6272 1.2084 -1.1683 0.6786 -1.4216 L 0.2758 -2.3635 L 0.046 -2.2652 L 0.2758 -2.3635 Z',
            microbombFrag: 'M -0.5905 1.3525 C -0.5905 1.4077 -0.5457 1.4528 -0.4906 1.4491 C -0.1394 1.425 0.1927 1.2748 0.4432 1.0243 C 0.7174 0.7501 0.8714 0.3782 0.8714 -0.0095 C 0.8714 -0.3972 0.7174 -0.7691 0.4432 -1.0432 C 0.1927 -1.2938 -0.1394 -1.444 -0.4906 -1.468 C -0.5457 -1.4718 -0.5905 -1.4267 -0.5905 -1.3714 L -0.5905 -0.0095 V 1.3525 Z',
            quadrafragmentDecor: 'M 0.6847 -0.3366 L 0.67 -0.3428 H 0.654 L -0.5612 -0.3428 H -0.5772 L -0.5919 -0.3366 L -1.1866 -0.0823 C -1.2624 -0.0498 -1.2624 0.0577 -1.1866 0.0902 L -0.5919 0.3445 L -0.5772 0.3508 H -0.5612 L 0.654 0.3508 H 0.67 L 0.6847 0.3445 L 1.2793 0.0902 C 1.3552 0.0577 1.3552 -0.0498 1.2793 -0.0823 L 0.6847 -0.3366 Z',
            quadrafragmentFrag1: 'M -0.765 -0.9048 L -0.7797 -0.907 H -0.7945 C -0.9161 -0.907 -1.0145 -0.8085 -1.0145 -0.6869 V 0.993 C -1.0145 1.1145 -0.9161 1.213 -0.7945 1.213 H -0.7189 L -0.6622 1.163 L -0.046 0.6193 C -0.0381 0.62 -0.0299 0.6207 -0.0211 0.6214 C -0.0138 0.622 -0.0063 0.6226 0.0015 0.6233 C 0.079 0.6298 0.1814 0.6383 0.2836 0.6465 C 0.3856 0.6548 0.4881 0.6627 0.5655 0.6679 C 0.6039 0.6704 0.6377 0.6725 0.6627 0.6735 C 0.6745 0.674 0.6877 0.6744 0.6993 0.6742 C 0.7039 0.6741 0.715 0.6739 0.7277 0.6723 L 0.7278 0.6723 C 0.7325 0.6717 0.7494 0.6696 0.7696 0.6627 C 0.7788 0.6596 0.8028 0.6509 0.8283 0.631 C 0.8511 0.6132 0.8941 0.5704 0.9035 0.5012 L 1.1025 -0.653 L 1.1055 -0.6698 V -0.6869 C 1.1055 -0.7214 1.0964 -0.7621 1.0705 -0.8001 C 1.0453 -0.837 1.0129 -0.8582 0.9872 -0.8697 C 0.9425 -0.8898 0.9031 -0.8877 0.8931 -0.8871 C 0.8675 -0.8856 0.8474 -0.8794 0.8428 -0.8779 L 0.8424 -0.8778 C 0.8287 -0.8736 0.8165 -0.8683 0.8106 -0.8657 C 0.7961 -0.8594 0.7786 -0.851 0.7617 -0.8426 C 0.7267 -0.8252 0.6811 -0.8014 0.6369 -0.7783 C 0.6222 -0.7706 0.6078 -0.7631 0.5938 -0.7557 C 0.5645 -0.7404 0.5373 -0.726 0.5144 -0.7143 C 0.5142 -0.7141 0.514 -0.714 0.5138 -0.7139 L -0.765 -0.9048 Z M 0.9716 -0.4995 C 0.9716 -0.4995 0.9713 -0.4995 0.9708 -0.4992 C 0.9713 -0.4995 0.9716 -0.4995 0.9716 -0.4995 Z',
            quadrafragmentFrag2: 'M -1.0675 -0.7599 V -0.7415 L -1.0642 -0.7234 L -0.8726 0.3106 C -0.877 0.3254 -0.8824 0.3433 -0.8886 0.3638 C -0.8958 0.3878 -0.9043 0.4157 -0.9134 0.4455 C -0.926 0.4869 -0.9397 0.5322 -0.9531 0.5764 C -0.9763 0.6533 -0.9995 0.731 -1.0163 0.7898 C -1.0246 0.8189 -1.0319 0.8454 -1.037 0.8654 C -1.0393 0.8746 -1.0422 0.8867 -1.0442 0.8983 L -1.0442 0.8983 C -1.045 0.9025 -1.0473 0.9158 -1.0478 0.9318 L -1.0478 0.9322 C -1.048 0.9379 -1.0488 0.9613 -1.0415 0.9895 C -1.0379 1.0035 -1.0282 1.036 -1.001 1.0685 C -0.9682 1.1075 -0.9145 1.1401 -0.8474 1.1401 H 0.8326 C 0.8693 1.1401 0.9116 1.1298 0.9499 1.1021 C 0.9866 1.0756 1.0065 1.0426 1.017 1.0181 C 1.0352 0.9751 1.0332 0.9377 1.0327 0.9283 L 1.0327 0.9283 C 1.0314 0.9039 1.0257 0.8847 1.0244 0.8801 L 1.0242 0.8798 C 1.0203 0.8663 1.0154 0.8542 1.0129 0.848 C 1.0067 0.8331 0.9984 0.815 0.99 0.7971 C 0.9727 0.7603 0.949 0.7122 0.9258 0.6654 C 0.9176 0.6487 0.9094 0.6322 0.9015 0.6163 C 0.8868 0.5868 0.8731 0.5593 0.8618 0.536 C 0.8609 0.5342 0.8601 0.5326 0.8592 0.5309 L 1.0502 -0.7299 L 1.0526 -0.7448 V -0.7599 C 1.0526 -0.8814 0.954 -0.9799 0.8326 -0.9799 L -0.8474 -0.9799 C -0.969 -0.9799 -1.0675 -0.8814 -1.0675 -0.7599 Z M 0.6437 1.0019 C 0.6436 1.0019 0.6435 1.0017 0.6434 1.0012 C 0.6436 1.0017 0.6437 1.0019 0.6437 1.0019 Z',
            quadrafragmentFrag3: 'M -0.5719 -0.8677 L -0.6162 -0.8963 H -0.669 C -0.7784 -0.8963 -0.867 -0.8076 -0.867 -0.6983 V 0.8137 C -0.867 0.9231 -0.7784 1.0118 -0.669 1.0118 H 0.843 C 0.9523 1.0118 1.041 0.9231 1.041 0.8137 V 0.7864 L 1.0328 0.7602 L 0.6938 -0.3282 C 0.6767 -0.3979 0.6227 -0.4321 0.6111 -0.4391 C 0.5893 -0.4521 0.5699 -0.4573 0.5637 -0.459 C 0.5484 -0.4631 0.5353 -0.4644 0.5311 -0.4648 C 0.5199 -0.4659 0.5088 -0.4661 0.501 -0.4663 C 0.4841 -0.4666 0.4625 -0.4661 0.4396 -0.4655 C 0.3928 -0.4643 0.3314 -0.4616 0.2711 -0.4587 C 0.1949 -0.4551 0.1254 -0.4514 0.0814 -0.449 L -0.5719 -0.8677 Z',
            quadrafragmentFrag4: 'M 0.8264 -1.0661 H 0.807 L 0.7879 -1.0623 L -0.1321 -0.8824 L -0.1321 -0.8823 C -0.1764 -0.8736 -0.2052 -0.8524 -0.2101 -0.8488 C -0.2104 -0.8486 -0.2105 -0.8485 -0.2106 -0.8483 C -0.2239 -0.8389 -0.2331 -0.8298 -0.237 -0.8259 C -0.2454 -0.8173 -0.2514 -0.8098 -0.2536 -0.8069 C -0.2591 -0.7999 -0.2638 -0.793 -0.2666 -0.7888 C -0.273 -0.7794 -0.2806 -0.7677 -0.2884 -0.7553 C -0.3044 -0.7298 -0.326 -0.6946 -0.3508 -0.6534 C -0.4006 -0.571 -0.4657 -0.4613 -0.5302 -0.3516 C -0.5946 -0.2419 -0.659 -0.1318 -0.7072 -0.0482 C -0.7313 -0.0064 -0.7516 0.0292 -0.7662 0.055 C -0.7733 0.0678 -0.7796 0.079 -0.7843 0.0879 C -0.7865 0.092 -0.7893 0.0973 -0.7918 0.1025 C -0.793 0.1048 -0.7953 0.1097 -0.7978 0.1156 C -0.7985 0.1173 -0.7995 0.1199 -0.8008 0.1234 L -1.059 0.7587 L -1.0736 0.7949 V 0.8339 C -1.0736 0.9554 -0.9751 1.0539 -0.8537 1.0539 H 0.8264 C 0.9478 1.0539 1.0463 0.9554 1.0463 0.8339 V -0.8461 C 1.0463 -0.9675 0.9478 -1.0661 0.8264 -1.0661 Z',
            trisonatorDecor: '',
            trisonatorFrag1: '',
            trisonatorFrag2: '',
            trisonatorFrag3: '',
            clusterbombDecor: '',
            clusterbombFrag1: '',
            clusterbombFrag2: '',
            clusterbombFrag3: '',
            clusterbombFrag4: '',
            clusterbombFrag5: '',
            clusterbombFrag6: '',
            clusterbombFrag7: '',
            //
        }
    }
    //#endregion
    
    //#region Microbomb
    Class.microbombDecor = {
        PARENT: 'genericTank',
        SHAPE: config.shapePath2Ds.microbombDecor,
        COLOR: 'black',
        CONTROLLERS: [['spin', {independent: true}]],
    }
    Class.microbomb = {
        PARENT: 'food',
        LABEL: 'Microbomb',
        VALUE: Class.egg.VALUE * config.scoreMultiplier,
        SIZE: 5,
        COLOR: Class.egg.COLOR,
        BODY: {
            DAMAGE: 5 * config.damageMultiplier,
            DENSITY: 2,
            HEALTH: 0.1 * config.healthMultipler,
            PUSHABILITY: 0,
            ACCELERATION: 0.015
        },
        GIVE_KILL_MESSAGE: true,
        DRAW_HEALTH: true,
        TURRETS: [{
            POSITION: { SIZE: 22.5 },
            TYPE: 'microbombDecor'
        }],
        ON: [{
            event: 'damage',
            handler: ({body}) => {
                if (body.health.amount >= body.health.max / 3) return;
                for (let i = 0; i < 30; i++) {
                    if (body == null) break;
                    setTimeout(() => {
                        body.alpha = 0.5
                    }, i * 300)
                    setTimeout(() => {
                        body.alpha = 1
                    }, i * 400)
                }
                setTimeout(() => {
                    if (body == null) return
                    body.kill()
                }, 30 * 400)
            }
        },
        {
            event: 'death',
            handler: ({body}) => {
                let angle1 = ran.randomAngle(),
                    angle2 = angle1 + Math.PI,
                    boost = config.fragSpeedMultiplier
                for (let i = 0; i < 2; i++) {
                    let frag = new Entity(body)
                    frag.team = body.team
                    frag.define('microbombFragment')
                    frag.SIZE = body.SIZE
                    frag.velocity.x = i == 0 ? Math.cos(angle1) * boost : Math.cos(angle2) * boost
                    frag.velocity.y = i == 0 ? Math.sin(angle1) * boost : Math.sin(angle2) * boost
                    frag.life()
                }
            }
        }]
    }
    Class.microbombFragment = {
        PARENT: 'bullet',
        SHAPE: config.shapePath2Ds.microbombFrag,
        LABEL: 'Microbomb Fragment',
        FACING_TYPE: 'smoothWithMotion',
        VALUE: Class.egg.VALUE * config.scoreMultiplier,
        COLOR: Class.egg.COLOR,
        BODY: {
            DAMAGE: 7 * config.damageMultiplier,
            DENSITY: 5,
            HEALTH: Class.microbomb.BODY.HEALTH / (config.healthMultipler / 2),
            PUSHABILITY: 0,
            ACCELERATION: 0.015,
            RANGE: 7.5,
        },
        DIE_AT_RANGE: true
    }
    Class.microbombGenerator = {
        PARENT: "spectator",
        LABEL: Class.microbomb.LABEL + ' Generator',
        SKILL_CAP: [31, 0, 0, 0, 0, 0, 0, 0, 0, 31],
        TURRETS: [{
            POSITION: { SIZE: 10.5, LAYER: 1 },
            TYPE: 'microbomb',
        }],
        GUNS: [{
            POSITION: [14, 12, 1, 4, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
                TYPE: "bullet"
            }
        }, {
            POSITION: [12, 12, 1.4, 4, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
                INDEPENDENT_CHILDREN: true,
                TYPE: 'microbomb'
            },
        }],
    }
    //#endregion

    //#region Quadrafragment
    Class.quadrafragmentDecor1 = {
        PARENT: 'genericTank',
        SHAPE: config.shapePath2Ds.quadrafragmentDecor,
        COLOR: 'black',
        CONTROLLERS: [['spin', { independent: true, speed: 0.1 }]],
    }
    Class.quadrafragmentDecor2 = {
        PARENT: 'genericTank',
        SHAPE: config.shapePath2Ds.quadrafragmentDecor,
        COLOR: 'black',
        CONTROLLERS: [['spin', { independent: true, speed: -0.1 }]],
    }
    Class.quadrafragment = {
        PARENT: 'food',
        LABEL: 'Quadrafragment',
        SHAPE: 4,
        VALUE: Class.square.VALUE * config.scoreMultiplier,
        SIZE: Class.square.SIZE,
        COLOR: Class.square.COLOR,
        BODY: {
            DAMAGE: 6.5 * config.damageMultiplier,
            DENSITY: 2,
            HEALTH: Class.square.BODY.HEALTH * config.healthMultipler,
            PUSHABILITY: 0,
            ACCELERATION: 0.015
        },
        GIVE_KILL_MESSAGE: true,
        DRAW_HEALTH: true,
        TURRETS: [{
            POSITION: { SIZE: 22.5 },
            TYPE: 'quadrafragmentDecor1'
        }, {
            POSITION: { SIZE: 22.5 },
            TYPE: 'quadrafragmentDecor2'
        }],
        ON: [{
            event: 'damage',
            handler: ({ body }) => {
                if (body.health.amount >= body.health.max / 3) return;
                for (let i = 0; i < 50; i++) {
                    if (body == null) break;
                    setTimeout(() => {
                        body.alpha = 0.5
                    }, i * 300)
                    setTimeout(() => {
                        body.alpha = 1
                    }, i * 400)
                }
                setTimeout(() => {
                    if (body == null) return
                    body.kill()
                }, 50 * 400)
            }
        },
        {
            event: 'death',
            handler: ({ body }) => {
                let angle1 = ran.randomAngle(),
                    angle2 = angle1 + (Math.PI / 2),
                    angle3 = angle1 + Math.PI,
                    angle4 = angle1 + (3 * Math.PI / 2)
                    boost = config.fragSpeedMultiplier * 0.5
                for (let i = 0; i < 4; i++) {
                    let frag = new Entity(body)
                    frag.team = body.team
                    frag.define(`quadrafragmentFrag${i + 1}`)
                    frag.SIZE = body.SIZE / 2
                    switch (i+1) {
                        case 1:
                            frag.velocity.x = Math.cos(angle1) * boost
                            frag.velocity.y = Math.sin(angle1) * boost
                            break;
                        case 2:
                            frag.velocity.x = Math.cos(angle2) * boost
                            frag.velocity.y = Math.sin(angle2) * boost
                            break;
                        case 3:
                            frag.velocity.x = Math.cos(angle3) * boost
                            frag.velocity.y = Math.sin(angle3) * boost
                            break;
                        case 4:
                            frag.velocity.x = Math.cos(angle4) * boost
                            frag.velocity.y = Math.sin(angle4) * boost
                            break;
                    }
                    frag.life()
                }
            }
        }]
    }
    Class.quadrafragmentFrag = {
        PARENT: 'bullet',
        LABEL: 'Quadrafragment Fragment',
        FACING_TYPE: 'smoothWithMotion',
        VALUE: Class.square.VALUE * config.scoreMultiplier,
        COLOR: Class.square.COLOR,
        BODY: {
            DAMAGE: 8.5 * config.damageMultiplier,
            DENSITY: 5,
            HEALTH: Class.quadrafragment.BODY.HEALTH / (config.healthMultipler / 2),
            PUSHABILITY: 0,
            ACCELERATION: 0.015,
            RANGE: 5,
        },
        DIE_AT_RANGE: true
    }
    Class.quadrafragmentFrag1 = {
        PARENT: 'quadrafragmentFrag',
        SHAPE: config.shapePath2Ds.quadrafragmentFrag1

    }
    Class.quadrafragmentFrag2 = {
        PARENT: 'quadrafragmentFrag',
        SHAPE: config.shapePath2Ds.quadrafragmentFrag2
    }
    Class.quadrafragmentFrag3 = {
        PARENT: 'quadrafragmentFrag',
        SHAPE: config.shapePath2Ds.quadrafragmentFrag3
    }
    Class.quadrafragmentFrag4 = {
        PARENT: 'quadrafragmentFrag',
        SHAPE: config.shapePath2Ds.quadrafragmentFrag4
    }
    Class.quadrafragmentGenerator = {
        PARENT: "spectator",
        LABEL: Class.quadrafragment.LABEL + ' Generator',
        SKILL_CAP: [31, 0, 0, 0, 0, 0, 0, 0, 0, 31],
        TURRETS: [{
            POSITION: { SIZE: 20, LAYER: 1 },
            TYPE: 'quadrafragment',
        }],
        GUNS: [{
            POSITION: [14, 12, 1, 4, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
                TYPE: "bullet"
            }
        }, {
            POSITION: [12, 12, 1.4, 4, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
                INDEPENDENT_CHILDREN: true,
                TYPE: 'quadrafragment'
            },
        }],
    }
    //#endregion

    //#region Config Logic
    if (config.enableBraindeadNames) {
        Class.microbomb.LABEL = 'when u step on a lego brick'
        Class.microbombFragment.LABEL = 'sharp broken lego brick piece'
        Class.microbombGenerator.LABEL = 'deadly weapon'

        Class.quadrafragment.LABEL = 'hiroshima atomic bomb dome'
        Class.quadrafragmentFrag.LABEL = 'debri from the atomic bomb'
        Class.quadrafragmentGenerator.LABEL = 'bomber plane'
        
        // trisonator = TNT
        // trisonator frag =    
        // trisonator generator =

        // clusterbomb = 
        // clusterbomb frag = 
        // clusterbomb generator = 
    }
    //#endregion

    Class.explosiveGenerators = {
        PARENT: 'menu',
        LABEL: 'Explosive Shapes'
    }

    Class.explosiveGenerators.UPGRADES_TIER_0 = ['microbombGenerator', 'quadrafragmentGenerator']

    Class.addons.UPGRADES_TIER_0.push('explosiveGenerators')
}
