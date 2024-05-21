const { combineStats, dereference, menu } = require('../facilitators.js');
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
    ticks: 200,
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
    enableGuns: (guns, tag) => guns.filter(gun => gun.tag == tag).length
        ? guns.filter(gun => gun.tag == tag).forEach(gun => gun.charged = true)
        : 0,
    disableGuns: (guns, tag) => guns.filter(gun => gun.tag == tag).length
        ? guns.filter(gun => gun.tag == tag).forEach(gun => gun.charged = false)
        : 0,
    isGunsDisabled: (guns, tag) => guns.filter(gun => gun.charged && gun.tag == tag).length == 0,
    initGuns: (guns, tags = []) => {
        guns.forEach(gun => {
            if (tags.length) gun.tag = tags[guns.indexOf(gun)] ? tags[guns.indexOf(gun)] : tags[tags.length - 1];
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
    gunArray: (callback, count) => {
        if (typeof callback != "function") throw new Error(`${callback} isn't type of function`);
        let output = [];

        for (let i = 0; i < count; i++) {
            let angle = 360 / count * i,
                weapon = dereference(callback(angle));

            if (!Array.isArray(weapon)) weapon = [weapon];
            output.push(...weapon);
        }

        return output;
    },
};
const MC_stats = {
    statMain: g.basic,
    statPounder: g.pounder,
    statPower: g.power,
    statHealth: { health: 1e6 },
    statNoRecoil: { recoil: 0 },
    statNoRange: { range: 0.2 },
    statNoReload: { reload: 2 },
    statReload: { reload: 0.2 },
    statNoSpray: {
        spray: 0.2,
        shudder: 0.2,
    },
    statSpray: {
        spray: 2,
        shudder: 2,
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
    COLOR: "#c994f7",
    ALPHA: 0.4,
    BODY: {
        HEALTH: 1e6,
        DAMAGE: 0,
    },
    GUNS: MC_functions.gunArray(angle => {
        return [{
            POSITION: [1, 18, 1, 0, 0, angle, 0],
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
            POSITION: [1, 18, 1, 0, 0, angle, 2],
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
        }];
    }, 18),
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
                    MC_stats.statReload,
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
                    MC_stats.statReload,
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
                                    MC_stats.statReload,
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
    SHAPE: "M -4.5 1 C -6 1 -6 1 -6 0 C -6 -1 -6 -1 -4.5 -1 H 4 C 4 -1 5 -1 5 0 C 5 1 4 1 4 1 H -4.5",
    BORDERLESS: true,
    ON: [{
        event: "tick",
        handler: ({ body }) => {
            body.SIZE += 0.2;
        },
    }],
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
            POSITION: [1, 2.6, 1, 1, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    MC_stats.statMain,
                    MC_stats.statReload,
                    MC_stats.statNoRange,
                    MC_stats.statNoSpray,
                    MC_stats.statNoRecoil,
                    MC_stats.speedStat(6),
                ]),
                TYPE: "MC_TITANS_godzillaBlast",
            },
        },
        ...MC_functions.gunArray(angle => {
            return {
                POSITION: [1, 1.3, 1, -8, 0, angle, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        MC_stats.statMain,
                        MC_stats.statNoRange,
                        MC_stats.statNoRecoil,
                        MC_stats.statNoSpray,
                        MC_stats.statNoReload,
                        MC_stats.statHealth,
                        MC_stats.speedStat(Math.random() * 0.3 + 0.2),
                    ]),
                    ALPHA: 0,
                    TYPE: ["bullet", {
                        COLOR: "#cb42f5",
                        ALPHA: 0.2,
                    }],
                },
            };
        }, 16),
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
            if (!body.charges) MC_functions.disableGuns(body.guns);
        },
    }, {
        event: "tick",
        handler: ({ body }) => {
            if (MC_functions.isGunsDisabled(body.guns)) {
                if (body.charges < body.maxCharges && !body.tickTime) {
                    body.tickTime = MC_definitions.ticks;
                    body.charges++;
                    if (body.charges == body.maxCharges) MC_functions.enableGuns(body.guns);
                }
                if (body.tickTime) body.tickTime--;
            }
        },
    }, {
        event: "define",
        handler: ({ body }) => {
            body.maxCharges = MC_definitions.HTTYD_charges[i];
            body.tickTime = MC_definitions.ticks;
            body.charges = body.maxCharges;
            MC_functions.initGuns(body.guns);
            sockets.broadcast(MC_definitions.HTTYD_welcome[i] || `A ${name} arrived!`);
        },
    });
}
for (let i = 0; i < MC_names.TITANS.length; i++) {
    let name = MC_names.TITANS[i],
        e = Class[name];

    e.ON.push({
        event: "fire",
        handler: ({ body }) => {
            if (MC_functions.isGunsDisabled(body.guns, "secondary") || MC_functions.isGunsDisabled(body.guns, "main"))
                body.tickTime--;
            if (!body.tickTime) {
                body.tickTime = MC_definitions.ticks;
                if (MC_functions.isGunsDisabled(body.guns, "main")) {
                    MC_functions.disableGuns(body.guns, "secondary");
                    MC_functions.enableGuns(body.guns, "main");
                } else {
                    MC_functions.enableGuns(body.guns, "secondary");
                    MC_functions.disableGuns(body.guns, "main");
                }
            }
        },
    }, {
        event: "define",
        handler: ({ body }) => {
            body.tickTime = MC_definitions.ticks;
            MC_functions.initGuns(body.guns, ["main", "secondary"]);
            MC_functions.disableGuns(body.guns, "main");
            sockets.broadcast(`A ${name} arrived!`);
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
