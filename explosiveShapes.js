/**
 * Explosive Shapes by Trplnr
 * 
 * - This addon will add 4 explosive shapes
 *   > Microbomb, Quadrafragment, Trisonator, Clusterbomb
 * 
 * - These explosive shapes are also gonna be available through the Addons tank
 * - And will spawn around the map by default
 * 
 * - These explosives will explode on death or after 3 seconds when hit
 * - These deal tons of damage that can halve the health of a full health build smasher,
 *      but in return it gives decent xp.
 * 
 * - You can use these to your advantage when fighting opponents like luring them into an explosion.
 * - And even when running away.
 * 
 * Shape spawning is enabled by default, See line <34> to disable it
 * This addon is disabled by default, See lines <36-38> to enable it
 * 
 * VERSION 1.0.0-beta
 */


const { Entity } = require('../../live/entity')
const { combineStats } = require('../facilitators')
const g = require('../gunvals')
/**
 * 
 * @param {object} Class
 * @param {Record<any, import("../../../..").Tank>} Class.Class
 */
module.exports = ({Class, Config}) => {

    // Comment this line below to enable the addon :)
    //return console.log('[explosiveShapes.js] is disabled by default')

    // Comment these 3 lines below to disable explosive shapes spawning in the map :(
    Config.FOOD_TYPES.push([50, [
        [1024, 'microbomb'], //[256, 'quadrafragment'], [64, 'trisonator'], [16, 'clusterbomb']
    ]])

    const config = {
        enableBraindeadNames: true, // makes the explosives have funny names
    }
    // Egg
    Class.microbombDecor = {
        PARENT: 'genericTank',
        SHAPE: 'M 0.2758 -2.3635 C 0.172 -2.6062 -0.172 -2.6062 -0.2758 -2.3635 L -0.6786 -1.4216 C -1.2084 -1.1683 -1.575 -0.6272 -1.575 0 C -1.575 0.6272 -1.2084 1.1683 -0.6786 1.4217 L -0.2758 2.3635 C -0.172 2.6062 0.172 2.6062 0.2758 2.3635 L 0.6786 1.4217 C 1.2084 1.1683 1.575 0.6272 1.575 0 C 1.575 -0.6272 1.2084 -1.1683 0.6786 -1.4216 L 0.2758 -2.3635 L 0.046 -2.2652 L 0.2758 -2.3635 Z',
        COLOR: 'black',
        CONTROLLERS: [['spin', {independent: true}]]
    }
    Class.microbombFragment = {
        PARENT: 'bullet',
        SHAPE: 'M 1.3525 0.5905 C 1.4077 0.5905 1.4528 0.5457 1.4491 0.4906 C 1.425 0.1394 1.2748 -0.1927 1.0243 -0.4432 C 0.7501 -0.7174 0.3782 -0.8714 -0.0095 -0.8714 C -0.3972 -0.8714 -0.7691 -0.7174 -1.0432 -0.4432 C -1.2938 -0.1927 -1.444 0.1394 -1.468 0.4906 C -1.4718 0.5457 -1.4267 0.5905 -1.3714 0.5905 L -0.0095 0.5905 H 1.3525 Z',
        LABEL: 'Microbomb Fragment',
        FACING_TYPE: 'smoothWithMotion',
        VALUE: Class.egg.VALUE * 2.5,
        SIZE: 5,
        COLOR: "veryLightGrey",
        BODY: {
            DAMAGE: 70,
            DENSITY: 5,
            HEALTH: 0.01,
            PUSHABILITY: 0,
            ACCELERATION: 0.015
        },
    }
    Class.microbomb = {
        PARENT: 'food',
        LABEL: 'Microbomb',
        VALUE: Class.egg.VALUE * 5,
        SIZE: 5,
        COLOR: "veryLightGrey",
        BODY: {
            DAMAGE: 50,
            DENSITY: 2,
            HEALTH: 0.01,
            PUSHABILITY: 0,
            ACCELERATION: 0.015
        },
        TURRETS: [{
            POSITION: { SIZE: 22.5 },
            TYPE: 'microbombDecor'
        }],
        ON: [{
            event: 'damage',
            handler: ({body}) => {
                for (let i = 0; i < 30; i++) {
                    if (body == null) break;
                    setTimeout(() => {
                        body.alpha = 0.5
                    }, i * 100)
                    setTimeout(() => {
                        body.alpha = 1
                    }, i * 200)
                }
                setTimeout(() => {
                    if (body == null) return
                    body.kill()
                })
            }
        },
        {
            event: 'death',
            handler: ({body}) => {
                for (let i = 0; i < 2; i++) {
                    let frag = new Entity(body)
                    frag.team = body.team
                    frag.define('microbombFragment')
                    frag.velocity.x = ran.randomAngle() * (Math.random() > 0.5 ? -2 : 2)
                    frag.velocity.y = ran.randomAngle() * (Math.random() > 0.5 ? -2 : 2)
                    frag.life()
                }
            }
        }]
    }

    Class.microbombGenerator = {
        PARENT: "spectator",
        LABEL: Class.microbomb.LABEL + ' Generator',
        SKILL_CAP: [31, 0, 0, 0, 0, 0, 0, 0, 0, 31],
        TURRETS: [{
            POSITION: [10, 0, 0, 0, 0, 1],
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

    if (config.enableBraindeadNames) {
        Class.microbomb.LABEL = 'when u step on a lego brick'
        Class.microbombFragment.LABEL = 'sharp broken lego brick piece'
        Class.microbombGenerator.LABEL = 'deadly weapon'

        // quadrafragment = 
        // quadrafragment frag = 
        // quadrafragment generator = 
        
        // trisonator =
        // trisonator frag =
        // trisonator generator =

        // clusterbomb = HERE COMES THE AIRPLANE
        // clusterbomb frag = *airplane crashes*
        // clusterbomb generator = two tower generator
    }

    Class.explosiveGenerators = {
        PARENT: 'menu',
        LABEL: 'Explosive Shapes'
    }

    Class.explosiveGenerators.UPGRADES_TIER_0 = ['microbombGenerator']

    Class.addons.UPGRADES_TIER_0.push('explosiveGenerators')
}