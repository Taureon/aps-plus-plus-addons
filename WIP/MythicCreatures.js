const { combineStats, weaponArray, menu } = require('../facilitators.js');
const { smshskl, base } = require('../constants.js');
const g = require('../gunvals.js');

// Comment out the line below to enable this addon, uncomment it to disable this addon.
// return console.log('Mythic Creatures [MC] addon is disabled. See lines 5-6 to enable it.');

// Either use or not different team for classes, not completely working.
const MC_different_team = false;
const MC_names = {
    HTTYD: ["Toothless", "Stormfly"],
    TITANS: ["Godzilla"],
};
const MC_definitions = {
    bodyScale: {
        HTTYD: 4.6,
        TITANS: 14,
    },
    HTTYD_ticks: 100,
    HTTYD_charges: [6, 8],
    HTTYD_welcome: [
        "Night Fury! Get down!",
    ],
};
const MC_base = {
    ACCEL: 0.0001 * base.ACCEL,
    SPEED: 1.8 * base.SPEED,
    HEALTH: 4 * base.HEALTH,
    DAMAGE: 3 * base.DAMAGE,
    RESIST: 2.4 * base.RESIST,
    PENETRATION: 0.8 * base.PENETRATION,
    SHIELD: 0.4 * base.SHIELD,
    REGEN: 2.6 * base.REGEN,
    FOV: 1.3 * base.FOV,
    DENSITY: 1.2 * base.DENSITY,
};
const MC_functions = {
    enableGuns: body => body.guns.forEach(gun => gun.charged = true),
    disableGuns: body => body.guns.forEach(gun => gun.charged = false),
    isGunsDisabled: body => body.guns.filter(gun => gun.charged).length == 0,
    initGuns: body => {
        body.guns.forEach(gun => {
            gun.charged = true;
            gun.spawnBullets = (useWhile, shootPermission) => {
                if (!gun.charged) return;

                let angle1 = gun.direction + gun.angle + gun.body.facing,
                    angle2 = gun.angle + gun.body.facing,
                    gunlength = gun.length - gun.width * gun.settings.size / 2,

                    offsetBaseX = gun.offset * Math.cos(angle1),
                    offsetBaseY = gun.offset * Math.sin(angle1),
                    offsetEndX = gunlength * Math.cos(angle2),
                    offsetEndY = gunlength * Math.sin(angle2),

                    offsetFinalX = offsetBaseX + offsetEndX,
                    offsetFinalY = offsetBaseY + offsetEndY,
                    skill = gun.bulletStats === "master" ? gun.body.skill : gun.bulletStats;

                do {
                    gun.fire(offsetFinalX, offsetFinalY, skill);
                    gun.cycle--;
                    shootPermission = gun.countsOwnKids ? gun.countsOwnKids > gun.children.length : gun.body.maxChildren
                        ? gun.body.maxChildren > gun.body.children.length
                        : gun;
                } while (useWhile && shootPermission && gun.cycle-1 >= 1);
            };
        });
    },
    isCompatible: body => {
        let number = 0;
        for (let key in body) {
            if (body.hasOwnProperty(key)) number += body[key];
        }
        return number == 1;
    },
};
const MC_stats = {
    statMain: g.basic,
    statPounder: g.pounder,
    statPower: g.power,
    statMoreReload: { reload: 0.2 },
    statHealth: { health: 1e6 },
    statNoRange: { range: 0.2 },
    statNoSpray: {
        spray: 0.2,
        shudder: 0.2,
    },
    statSpray: {
        spray: 3,
        shudder: 3,
    },
    speedStat: (speed) => {
        return {
            maxSpeed: speed,
            speed,
        };
    },
};

// Class parts
Class.MC_HTTYD_firework = {
    PARENT: "genericEntity",
    COLOR: "#112557",
    ALPHA: 0.4,
    BODY: {
        HEALTH: 1e6,
        DAMAGE: 0,
    },
    GUNS: weaponArray([{
        POSITION: [1, 18, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([
                MC_stats.statMain,
                MC_stats.statPounder,
                MC_stats.statPower,
                MC_stats.statHealth,
                MC_stats.speedStat(1.2),
            ]),
            TYPE: "bullet",
            AUTOFIRE: true,
        },
    }, {
        POSITION: [1, 18, 1, 0, 0, 0, 2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([
                MC_stats.statMain,
                MC_stats.statPounder,
                MC_stats.statPower,
                MC_stats.statHealth,
                MC_stats.speedStat(0.8),
            ]),
            TYPE: "bullet",
            AUTOFIRE: true,
        },
    }], 18),
};
Class.MC_HTTYD_nightFuryBlast = {
    PARENT: "bullet",
    COLOR: "purple",
    GUNS: [
        {
            POSITION: [1, 18, 1, 0, 0, 180, 4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    MC_stats.statMain,
                    MC_stats.statMoreReload,
                ]),
                TYPE: ["bullet", { COLOR: "purple" }],
                AUTOFIRE: true,
            },
        },
    ],
    ON: [{
        event: "death",
        handler: ({ body }) => {
            let e = new Entity(body);
            e.define("MC_HTTYD_firework");
            e.team = body.team;
            e.SIZE = body.size;
            setSyncedTimeout(() => e.kill(), 12);
        },
    }, {
        event: "tick",
        handler: ({ body }) => {
            for (let instance of entities) {
                let diffX = instance.x - body.x,
                    diffY = instance.y - body.y,
                    dist2 = diffX ** 2 + diffY ** 2;

                if (
                    !instance.isDominator &&
                    !instance.isArenaCloser &&
                    !instance.invuln &&
                    instance.id != body.id &&
                    instance.team != body.team &&
                    instance.type == "tank" &&
                    dist2 <= (body.size / 12 * 100) ** 2
                ) body.kill();
            }
        },
    }],
};
Class.MC_HTTYD_stormflyFire = {
    PARENT: "bullet",
    COLOR: "#fff242",
    GUNS: [
        {
            POSITION: [1, 18, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    MC_stats.statMain,
                    MC_stats.statPounder,
                    MC_stats.statPower,
                    MC_stats.statMoreReload,
                    MC_stats.statSpray,
                ]),
                TYPE: ["bullet", {
                    COLOR: "#fff242",
                    GUNS: [
                        {
                            POSITION: [1, 18, 1, 0, 0, 180, 4.6],
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([
                                    MC_stats.statMain,
                                    MC_stats.statMoreReload,
                                ]),
                                TYPE: ["bullet", { COLOR: "#fff242" }],
                                AUTOFIRE: true,
                            },
                        },
                    ],
                }],
                AUTOFIRE: true,
            },
        },
    ],
};
Class.MC_TITANS_godzillaBlast = {
    PARENT: "bullet",
    COLOR: "#cb42f5",
    GUNS: [
        {
            POSITION: [1, 18, 1, 0, 0, 180, 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    MC_stats.statMain,
                    MC_stats.statMoreReload,
                ]),
                TYPE: ["bullet", { COLOR: "#cb42f5" }],
                AUTOFIRE: true,
            },
        }
    ],
};

// Classes
Class[MC_names.HTTYD[0]] = {
    UPGRADE_TOOLTIP: "The unholy offspring of lightning and death itself.",
    BODY: {
        SPEED: 1,
    },
    CHARGES: 6,
    COLOR: "black",
    GUNS: [
        {
            POSITION: [1, 3, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    MC_stats.statMain,
                    MC_stats.statPounder,
                    MC_stats.statNoRange,
                    MC_stats.statNoSpray,
                    MC_stats.speedStat(6.8),
                ]),
                TYPE: "MC_HTTYD_nightFuryBlast",
            },
        },
    ],
}
Class[MC_names.HTTYD[1]] = {
    UPGRADE_TOOLTIP: "I don't know what I would do without Stormfly.",
    BODY: {
        HEALTH: 0.6,
        DAMAGE: 0.4,
    },
    COLOR: "blue",
    GUNS: [
        {
            POSITION: [1, 3, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    MC_stats.statMain,
                    MC_stats.statPounder,
                    MC_stats.statPower,
                    MC_stats.statNoRange,
                ]),
                TYPE: "MC_HTTYD_stormflyFire",
            },
        },
    ],
}
Class[MC_names.TITANS[0]] = {
    UPGRADE_TOOLTIP: "Godzilla have been awakened",
    BODY: {
        HEALTH: 0.8,
        DAMAGE: 0.2,
    },
    SIZE: 38,
    COLOR: "purple",
    GUNS: [
        {
            POSITION: [1, 3, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    MC_stats.statMain,
                    MC_stats.statMoreReload,
                    MC_stats.statNoRange,
                    MC_stats.statNoSpray,
                    MC_stats.statHealth,
                    MC_stats.speedStat(6),
                ]),
                TYPE: "MC_TITANS_godzillaBlast",
            },
        },
    ],
}

// Handlers
for (let key in MC_names) {
    if (MC_names.hasOwnProperty(key)) {
        for (let i = 0; i < MC_names[key].length; i++) {
            let name = MC_names[key][i],
                e = Class[name];

            if (!MC_functions.isCompatible(e.BODY)) throw new Error(`BODY in ${name} class isn't compatible`);

            e.UPGRADE_TOOLTIP += " Art by felyn_de_fens";
            e.PARENT = "genericTank";
            e.SHAPE = `${name}.png`;
            e.LABEL = name;
            e.LEVEL_CAP = 120;
            e.LEVEL = 120;
            e.SKILL_CAP = Array(10).fill(smshskl);
            e.LEVEL_SKILL_POINT_FUNCTION = level => {
                if (level <= 120) return 1;
                return 0;
            };
            if (!e.SIZE) e.SIZE = 20;
            if (MC_different_team) e.TEAM = -10;
            for (let stat in MC_base) {
                if (MC_base.hasOwnProperty(stat)) {
                    if (e.BODY.hasOwnProperty(stat)) {
                        e.BODY[stat] = e.BODY[stat] * MC_base[stat] * MC_definitions.bodyScale[key];
                    }
                    else e.BODY[stat] = MC_base[stat];
                }
            }
            e.ON = [];
        }
    }
}
for (let i = 0; i < MC_names.HTTYD.length; i++) {
    let name = MC_names.HTTYD[i],
        e = Class[name];

    e.ON.push({
        event: "fire",
        handler: ({ body }) => {
            body.charges--;
            if (!body.charges) MC_functions.disableGuns(body);
        },
    }, {
        event: "tick",
        handler: ({ body }) => {
            if (MC_functions.isGunsDisabled(body)) {
                if (body.charges < body.maxCharges && !body.tickTime) {
                    body.tickTime = MC_definitions.HTTYD_ticks;
                    body.charges++;
                    if (body.charges == body.maxCharges) MC_functions.enableGuns(body);
                }
                if (body.tickTime) body.tickTime--;
            }
        },
    }, {
        event: "define",
        handler: ({ body }) => {
            body.maxCharges = MC_definitions.HTTYD_charges[i];
            body.tickTime = MC_definitions.HTTYD_ticks;
            body.charges = body.maxCharges;
            MC_functions.initGuns(body);
            sockets.broadcast(MC_definitions.HTTYD_welcome[i] || `A ${name} arrived!`);
        },
    });
}

Class.MC = menu("Mythic Creatures", "black", 0);
Class.MC.UPGRADES_TIER_0 = [];
for (let key in MC_names) {
    if (MC_names.hasOwnProperty(key)) Class.MC.UPGRADES_TIER_0.push(...MC_names[key]);
}
Class.addons.UPGRADES_TIER_0.push("MC");

console.log('Mythic Creatures [MC] addon has been registered.');
