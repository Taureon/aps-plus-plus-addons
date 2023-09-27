module.exports = ({Class, Events}) => {
    const RED = "\u001b[31m";
    const RESET = "\u001b[0m";
    return console.log(RED + 'ADDON 4th_of_july.js IS STILL IN BETA, DO NOT USE IN PRODUCTION' + RESET)
    /**
     * @type {Entity}
     */
    Class.explosion = {
        LABEL: "Explosion",
        ACCEPTS_SCORE: false,
        SIZE: 1,
        BODY: {
            PENETRATION: 1,
            SPEED: 3.75,
            RANGE: 90,
            DENSITY: 1.25,
            HEALTH: 0.1,
            DAMAGE: 100,
            PUSHABILITY: 0.3,
        },
        FACING_TYPE: "smoothWithMotion",
        CAN_GO_OUTSIDE_ROOM: true,
        HITS_OWN_TYPE: "never",
        DIE_AT_RANGE: true,
    }
    let explosions = []
    let colors = ['purple', 'lavender', 'gold', 'black', 'gray', 'white', 'animatedBlueRed', 'animatedRedBlue', 'red', 'blue']
    let shapes = ['circle', undefined, undefined, 'triangle', 'square', 'pentagon']
    for (let color of colors) {
        for (let shape of shapes) {
            if (shape == undefined) continue
            Class[`${shape}_${color}_explosion`] = {
                PARENT: ['explosion'],
                SHAPE: shapes.indexOf(shape),
                COLOR: color
            }
            explosions.push(Class[`${shape}_${color}_explosion`])
        }
    }
    Events.on('spawn', (entity) => {
        entity.on('define', (defined_entity) => {
            if (["bullet", "drone", "minion", "swarm", "trap"].includes(defined_entity.type)) {
                defined_entity.on('dead', () => {
                    let howmany = Math.floor(Math.random() * 20)
                    for (let i = 0; i < howmany; i++) {
                        let o = new Entity({
                            x: defined_entity.x,
                            y: defined_entity.y
                        })
                        let angle = (i * (Math.PI * 2)) / howmany;
                        let explosion = explosions[Math.floor(Math.random() * explosions.length)]
                        o.define(explosion)
                        o.define({ BODY: { DAMAGE: defined_entity.DAMAGE * 2, HEALTH: defined_entity.HEALTH * 2 } })
                        o.velocity.x = 10 * Math.sin(angle)
                        o.velocity.y = 10 * Math.cos(angle)
                        o.team = defined_entity.team
                        o.life()
                        let interval = setInterval(() => {
                            o.SIZE += 3
                            if (o.SIZE >= 12) {
                                o.destroy()
                                clearInterval(interval)
                            }
                        }, 50)
                    }
                })
            }
        })
    })
}