module.exports = ({ Class, Events }) => {
    return console.log('\u001b[31mADDON 4th_of_july.js IS STILL IN BETA, DO NOT USE IN PRODUCTION\u001b[0m');

    let explosions = [];
    for (let SHAPE of [0, 3, 4, -5]) {
        let current = [];
        for (let COLOR of ['purple', 'lavender', 'gold', 'black', 'gray', 'white', 'animatedBlueRed', 'animatedRedBlue', 'red', 'blue']) {
            current.push(Class[`plugin_4thOfJuly_${SHAPE}_${COLOR}_explosion`] = {
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
        explosions.push(current);
    }

    Events.on('spawn', projectile => {
        projectile.on('define', set => {
            if (!["bullet", "drone", "minion", "swarm", "trap"].includes(projectile.type)) return;

            projectile.on('dead', () => {
                let ticker = true,
                    count = Math.ceil(Math.random() * 32),
                    fragsToUse = explosions[Math.floor(Math.random() * explosions.length)],
                    first = fragsToUse[Math.floor(Math.random() * fragsToUse.length)],
                    second = fragsToUse[Math.floor(Math.random() * fragsToUse.length)],
                    angleStart = Math.random() * Math.PI * 2;

                for (let i = 0; i < count; i++) {
                    let angle = angleStart + (i * (Math.PI * 2)) / count,
                    o = new Entity(projectile);
                    o.define((ticker = !ticker) ? first : second, false);
                    o.define({ BODY: { DAMAGE: projectile.DAMAGE, HEALTH: projectile.HEALTH} }, false);
                    o.velocity.x = 10 * Math.sin(angle);
                    o.velocity.y = 10 * Math.cos(angle);
                    o.facing = angle;
                    o.team = projectile.team;
                    o.life();
                }
            });
        })
    })
}