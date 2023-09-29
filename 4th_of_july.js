module.exports = ({ Class, Events }) => {
    //return console.log('\u001b[31mADDON 4th_of_july.js IS STILL IN BETA, DO NOT USE IN PRODUCTION\u001b[0m');

    let explosions = [];
    for (let COLOR of ['purple', 'lavender', 'gold', 'black', 'gray', 'white', 'animatedBlueRed', 'animatedRedBlue', 'red', 'blue']) {
        for (let SHAPE of [0, 3, 4, 5, 6]) {
            explosions.push(Class[`plugin_4thOfJuly_${SHAPE}_${COLOR}_explosion`] = {
                LABEL: "Explosion",
                ACCEPTS_SCORE: false,
                SIZE: 3,
                BODY: {
                    PENETRATION: 1,
                    SPEED: 3.75,
                    RANGE: 5,
                    DENSITY: 1.25,
                    PUSHABILITY: 0.3
                },
                FACING_TYPE: "smoothWithMotion",
                CAN_GO_OUTSIDE_ROOM: true,
                HITS_OWN_TYPE: "never",
                DIE_AT_RANGE: true,
                SHAPE, COLOR
            });
        }
    }

    Events.on('spawn', (entity) => {
        entity.on('define', (projectile) => {
            if (!["bullet", "drone", "minion", "swarm", "trap"].includes(projectile.type)) return;

            projectile.on('dead', () => {
                let count = Math.floor(Math.random() * 10);
                let fireworkTypesCount = Math.max(1, Math.floor(Math.random() * 4));
                let fireworkTypes = []
                for (let i = 0; i < fireworkTypesCount; i++) {
                    fireworkTypes.push(ran.choose(explosions))
                }
                for (let i = 0; i < count; i++) {
                    let ticker = 0
                    let angle = (i * (Math.PI * 2)) / count,
                    o = new Entity(projectile);
                    o.define(fireworkTypes[ticker], false);
                    ticker >= fireworkTypes.length ? ticker = 0 : ticker++
                    o.define({ BODY: { DAMAGE: projectile.DAMAGE * 2, HEALTH: projectile.HEALTH * 2 } }, false);
                    o.velocity.x = 10 * Math.sin(angle);
                    o.velocity.y = 10 * Math.cos(angle);
                    o.team = projectile.team;
                    o.life();
                }
            });
        })
    })
}