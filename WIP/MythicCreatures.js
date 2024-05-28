const { combineStats, menu } = require('../facilitators.js');
const { smshskl, base } = require('../constants.js');
const g = require('../gunvals.js');

// Comment out the line below to enable this addon, uncomment it to disable this addon.
// return console.log('Mythic Creatures [MC] addon is disabled. See line 6 to enable it.');
/*
* Art by @felyn_de_fens
*/

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
const MC_stats = {
    statMain: g.basic,
    statPounder: g.pounder,
    statPower: g.power,
    statPetal: g.satellite,
    statNoRecoil: { recoil: 0 },
    statNoRange: { range: 0.2 },
    statHealth: { health: 1e6 },
    reloadStat: stat => {
        return {
            reload: stat,
        };
    },
    sizeStat: stat => {
        return {
            size: stat,
        };
    },
    sprayStat: stat => {
        return {
            spray: stat,
            shudder: stat,
        };
    },
    weakStat: stat => {
        return {
            health: stat,
            damage: stat,
        };
    },
    speedStat: stat => {
        return {
            maxSpeed: stat,
            speed: stat,
        };
    },
};
const MC_names = {
    assets: {
        Toothless: "",
        Stormfly: "",
        Hookfang: "",
        Meatlug: "",
        Yeti: "",
        Skrill: "",
        Godzilla: "",
        Shimu: "",
    },
    animation: {
        INSIDE: -8,
        OUT: 0,
    },
    petals: ["Power", "Space", "Reality", "Soul", "Time", "Mind"],
    differentTeam: false,
    existingCodes: [],
    color: "black",
    bodyScale: 5.4,
    gunsCount: 16,
    codeLength: 8,
    ticks: 100,
    timeout: 4,
};
const MC_functions = {
    deepCopy: obj => {
        if (obj == null || typeof obj != "object") return obj;
        let objCopy = {},
            arrCopy = [];

        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                arrCopy.push(MC_functions.deepCopy(obj[i]));
            }
            return arrCopy;
        }
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                objCopy[key] = MC_functions.deepCopy(obj[key]);
            }
        }
        return objCopy;
    },
    gunArray: (callback, count) => {
        if (typeof callback != "function") throw new Error(`${callback} isn't type of function`);
        let output = [];

        for (let i = 0; i < count; i++) {
            let weapon = callback(i);
            if (!Array.isArray(weapon)) weapon = [weapon];
            output.push(...weapon);
        }

        return output;
    },
    generateCode: () => {
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            newCode;

        do {
            newCode = "";
            for (let i = 0; i < MC_names.codeLength; i++) {
                newCode += characters[Math.floor(Math.random() * characters.length)];
            }
        } while (MC_names.existingCodes.includes(newCode));

        MC_names.existingCodes.push(newCode);
        return newCode;
    },
    isCompatible: body => {
        let number = 0;

        for (let key in body) {
            if (body.hasOwnProperty(key)) {
                number += body[key];
            }
        }

        return number == 1 || number == 2;
    },
    handler: name => {
        sockets.broadcast(`A ${name} has arrived!`);
    },
    enableGuns: (guns, tag = false) => tag
        ? guns.filter(gun => gun._tag == tag).forEach(gun => gun._charged = true)
        : guns.forEach(gun => gun._charged = true),
    disableGuns: (guns, tag = false) => tag
        ? guns.filter(gun => gun._tag == tag).forEach(gun => gun._charged = false)
        : guns.forEach(gun => gun._charged = false),
    isGunsDisabled: (guns, tag = false) => guns.filter(gun => gun._charged && (tag ? gun._tag == tag : true)).length == 0,
    initGuns: (guns, ...tags) => {
        for (let i = 0; i < tags.length; i++) {
            let tag = tags[i];
            if (Array.isArray(tag)) {
                let array = [];
                for (let i = 0; i < tag[1]; i++) array.push(tag[0]);
                tags.splice(tags.indexOf(tag), 1, ...array);
            }
        }
        for (let i = 0; i < guns.length; i++) {
            let gun = guns[i];
            if (tags.length) gun._tag = tags[guns.indexOf(gun)] || tags[tags.length - 1];
            gun._fire = gun.fire;
            gun._charged = true;

            gun.fire = (gx, gy, sk) => {
                if (!gun._charged) return;
                gun._fire(gx, gy, sk);
            };
        }
    },
    onComponent: charge => {
        if (typeof charge != "number") throw new Error(`${charge} property suppose to be a number`);
        return {
            fire: body => {
                if (charge) {
                    body._charges--;
                    if (!body._charges) MC_functions.disableGuns(body.guns);
                } else {
                    if (MC_functions.isGunsDisabled(body.guns, "secondary") && body._tickTime) {
                        body._tickTime--;
                    }
                }
            },
            tick: body => {
                if (charge) {
                    if (MC_functions.isGunsDisabled(body.guns)) {
                        if (body._charges < body._maxCharges && !body._tickTime) {
                            body._tickTime = MC_names.ticks * body._maxCharges;
                            body._charges++;
                            if (body._charges >= body._maxCharges) MC_functions.enableGuns(body.guns);
                        }
                        if (body._tickTime) body._tickTime--;
                    }
                } else {
                    if (MC_functions.isGunsDisabled(body.guns, "main") && body._tickTime) {
                        body._tickTime--;
                    }
                    if (!body._tickTime) {
                        if (MC_functions.isGunsDisabled(body.guns, "main")) {
                            body._tickTime = MC_names.ticks;
                            MC_functions.disableGuns(body.guns, "secondary");
                            MC_functions.enableGuns(body.guns, "main");
                        } else {
                            body._tickTime = MC_names.ticks * 10;
                            MC_functions.enableGuns(body.guns, "secondary");
                            MC_functions.disableGuns(body.guns, "main");
                        }
                    }
                }
            },
            define: body => {
                body._tickTime = 0;
                if (charge) {
                    body._maxCharges = charge;
                    body._charges = body._maxCharges;
                    MC_functions.initGuns(body.guns);
                } else {
                    MC_functions.initGuns(body.guns, "main", ["secondary", MC_names.gunsCount], "main");
                    MC_functions.disableGuns(body.guns, "main");
                }
            },
        };
    },
    typeComponent: type => {
        if (typeof type != "string") throw new Error(`${type} property suppose to be a string`);
        switch (type) {
            case "Blast":
                return [
                    MC_stats.statMain,
                    MC_stats.statPounder,
                    MC_stats.statNoRange,
                    MC_stats.sprayStat(0),
                    MC_stats.speedStat(6.8),
                ];
            case "NoBlast":
                return [
                    MC_stats.statMain,
                    MC_stats.statNoRange,
                    MC_stats.speedStat(0.1),
                    MC_stats.reloadStat(8),
                ];
            case "BigBlast":
                return [
                    MC_stats.statMain,
                    MC_stats.statPounder,
                    MC_stats.statPower,
                    MC_stats.sizeStat(1.2),
                ];
            case "Short":
                return [
                    MC_stats.statMain,
                    MC_stats.statPounder,
                    MC_stats.statNoRange,
                ];
            case "Long":
                return [
                    MC_stats.statMain,
                    MC_stats.statNoRange,
                    MC_stats.statNoRecoil,
                    MC_stats.reloadStat(0.1),
                    MC_stats.sprayStat(0.1),
                    MC_stats.speedStat(6),
                ];
            default:
                throw new Error(`Unsupported ${type} property`);
        }
    },
    createClassDeveloper: name => {
        if (typeof name != "string") throw new Error(`${name} property suppose to be a string`);
        let turret = {
                PARENT: "genericTank",
            },
            output = Object.assign(MC_functions.deepCopy(Class[name]), {
                CONTROLLERS: ["MC_orbitEntity"],
                HAS_NO_RECOIL: true,
                AI: {
                    SPEED: 2,
                },
                TURRETS: [{
                    POSITION: {
                        SIZE: 8,
                        LAYER: 0,
                    },
                    TYPE: turret,
                }],
            });

        for (let i = 0; i < 6; i++) {
            MC_functions.create({
                gun: "Petal",
            }, i, turret);
        }

        return output;
    },
    createClassLaser: laser => {
        if (typeof laser != "object") throw new Error(`${laser} property suppose to be an object`);
        return {
            PARENT: "bullet",
            COLOR: laser.COLOR ?? MC_names.color,
            SHAPE: "M -4 0.5 L -4 -0.5 L 3 -1 L 3 1",
            BORDERLESS: true,
            ON: [{
                event: "tick",
                handler: ({ body }) => {
                    body.SIZE += 1.2;
                },
            }],
        };
    },
    createGunPetal: petal => {
        if (typeof petal != "number") throw new Error(`${petal} property suppose to be a number`);
        return [{
            POSITION: [1, 12, 1, 0, 0, 0, petal * 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    MC_stats.statPetal,
                ]),
                TYPE: [`MC_petal${MC_names.petals[petal]}`, {
                    ANGLE: petal * 60,
                }],
                SYNCS_SKILLS: false,
                WAIT_TO_CYCLE: true,
                AUTOFIRE: true,
                MAX_CHILDREN: 1,
            },
        }];
    },
    createGunTail: tail => {
        if (typeof tail != "object") throw new Error(`${tail} property suppose to be an object`);
        return [{
            POSITION: [1, 18, 1, 0, 0, 180, tail.TIMEOUT ?? MC_names.timeout],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    MC_stats.statMain,
                    MC_stats.statNoRange,
                    MC_stats.reloadStat(0.2),
                ]),
                TYPE: ["bullet", { COLOR: tail.COLOR ?? MC_names.color }],
                AUTOFIRE: true,
            },
        }];
    },
    createGunFireRange: fireRange => {
        if (typeof fireRange != "object") throw new Error(`${fireRange} property suppose to be an object`);
        return [{
            POSITION: [1, 18, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    MC_stats.statMain,
                    MC_stats.statPounder,
                    MC_stats.statPower,
                    MC_stats.reloadStat(0.2),
                    MC_stats.sprayStat(2),
                ]),
                TYPE: MC_functions.create({
                    gun: "Tail",
                }, {
                    TIMEOUT: fireRange.TIMEOUT,
                    COLOR: fireRange.COLOR,
                }, {
                    PARENT: "bullet",
                    COLOR: fireRange.COLOR ?? MC_names.color,
                }),
                AUTOFIRE: true,
            },
        }];
    },
    createGunAnimation: animation => {
        if (typeof animation != "object") throw new Error(`${animation} property suppose to be an object`);
        return MC_functions.gunArray(angle => {
            return {
                POSITION: [1, 1.3, 1, MC_names.animation[animation.TYPE], 0, 360 / MC_names.gunsCount * angle, Math.random()],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        MC_stats.statMain,
                        MC_stats.statNoRange,
                        MC_stats.statNoRecoil,
                        MC_stats.statHealth,
                        MC_stats.sprayStat(0),
                        MC_stats.reloadStat(6),
                        MC_stats.speedStat(0.5),
                    ]),
                    ALPHA: 0,
                    TYPE: ["bullet", {
                        COLOR: animation.COLOR ?? MC_names.color,
                        ALPHA: 0.6,
                    }],
                    AUTOFIRE: animation.AUTOFIRE,
                },
            };
        }, MC_names.gunsCount);
    },
    createEventPoison: poison => {
        return {
            event: "death",
            handler: ({ body }) => {
                let instances = [];
                for (let instance of entities) {
                    let diffX = instance.x - body.x,
                        diffY = instance.y - body.y,
                        dist2 = diffX ** 2 + diffY ** 2;

                    if (
                        !instance.isArenaCloser &&
                        !instance.poisoned &&
                        !instance.invuln &&
                        instance.id != body.id &&
                        instance.team != body.team &&
                        dist2 <= (body.size / 12 * 100) ** 2 &&
                        (
                            instance.type == "miniboss" ||
                            instance.type == "tank" ||
                            instance.type == "food"
                        )
                    ) {
                        instance.poisoned = true;
                        instances.push(instance);
                    }
                }
                if (instances.length) {
                    for (let i = 1; i < poison.POISON; i += 10) {
                        setSyncedTimeout(() => {
                            instances.forEach(e => {
                                if (i + 10 >= poison.POISON) e.poisoned = false;
                                e.damageReceived += poison.DAMAGE * 3;
                            });
                        }, i);
                    }
                }
            },
        };
    },
    createEventFirework: firework => {
        if (typeof firework != "object") throw new Error(`${firework} property suppose to be an object`);
        return {
            event: "death",
            handler: ({ body }) => {
                let e = new Entity(body);
                e.define({
                    PARENT: "genericEntity",
                    COLOR: firework.COLOR ?? MC_names.color,
                    SIZE: body.SIZE,
                    ALPHA: 0,
                    BODY: {
                        HEALTH: 1e6,
                        DAMAGE: 0,
                    },
                    GUNS: MC_functions.gunArray(angle => {
                        return [{
                            POSITION: [1, 18, 1, 0, 0, 360 / MC_names.gunsCount * angle, 0],
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
                            POSITION: [1, 18, 1, 0, 0, 360 / MC_names.gunsCount * angle, 0],
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
                    }, MC_names.gunsCount),
                });
                e.team = body.team;
                setSyncedTimeout(() => e.kill(), 12);
            },
        };
    },
    createEventWhirlpool: () => {
        return {
            event: "death",
            handler: ({ body }) => {
                let e = new Entity(body);
                e.define(MC_functions.create({
                    event: "Drag",
                }, false, {
                    PARENT: "genericEntity",
                    ARENA_CLOSER: true,
                    SIZE: body.SIZE * 24,
                    COLOR: "blue",
                    ALPHA: 0.4,
                    BODY: {
                        HEALTH: 1e6,
                        DAMAGE: 0,
                    },
                }));
                e.team = body.team;
                setSyncedTimeout(() => e.kill(), 24);
            },
        };
    },
    createEventDrag: () => {
        return {
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
                        dist2 <= (body.size / 12 * 20) ** 2 &&
                        (
                            instance.type == "miniboss" ||
                            instance.type == "tank" ||
                            instance.type == "food"
                        )
                    ) {
                        let force = (1 - (1 / (15_000 / dist2 ** (1 / 20)))) + 0.001;
                        instance.velocity.x +=
                            util.clamp(body.x - instance.x, -90, 90) *
                            instance.damp *
                            force;
                        instance.velocity.y +=
                            util.clamp(body.y - instance.y, -90, 90) *
                            instance.damp *
                            force;
                    }
                }
            },
        };
    },
    createEventKill: () => {
        return {
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
                        dist2 <= (body.size / 12 * 100) ** 2 &&
                        (
                            instance.type == "miniboss" ||
                            instance.type == "tank"
                        )
                    ) body.kill();
                }
            },
        };
    },
    create: (type, args, parent = {
        PARENT: "bullet",
    }) => {
        if (typeof type != "object") throw new Error(`${type} property suppose to be an object`);
        if (typeof parent == "string") parent = Class[parent];
        let name = MC_functions.generateCode(),
            funcType = "",
            func;

        if (type.event) {
            funcType = "event";
            func = MC_functions[`createEvent${type.event}`];
        }
        if (type.class) {
            funcType = "class";
            func = MC_functions[`createClass${type.class}`];
        }
        if (type.gun) {
            funcType = "gun";
            func = MC_functions[`createGun${type.gun}`];
        }
        if (funcType == "") return parent;
        if (typeof func != "function") throw new Error(`${type} doesn't include a valid function`);

        switch (funcType) {
            case "gun":
                if (!parent.GUNS) parent.GUNS = [];
                try {
                    parent.GUNS.push(...func(args));
                } catch (e) {
                    parent.GUNS.push(...func());
                }
                break;
            case "event":
                if (!parent.ON) parent.ON = [];
                try {
                    parent.ON.push(func(args));
                } catch (e) {
                    parent.ON.push(func());
                }
                break;
            case "class":
                try {
                    parent = func(args);
                } catch (e) {
                    parent = func();
                }
                break;
        }

        Class[name] = parent;
        return name;
    },
    parse: def => {
        if (typeof def != "object") throw new Error(`${def} isn't type of object`);
        if (!MC_functions.isCompatible(def.BODY)) throw new Error(`BODY in ${def} class isn't compatible`);
        if (!Array.isArray(def.TYPE)) def.TYPE = [def.TYPE];
        let args = {
                COLOR: def.COLOR,
                TIMEOUT: def.TIMEOUT,
                POISON: 60,
                DAMAGE: MC_names.bodyScale,
            },
            type = MC_functions.create(def.TYPE[1] ? def.TYPE[1] : {}, args),
            stats = MC_functions.typeComponent(def.TYPE[0]),
            name = "";

        for (key in MC_definitions) {
            if (MC_definitions.hasOwnProperty(key) && def == MC_definitions[key]) {
                name = key;
            }
        }
        for (let key in MC_base) {
            if (MC_base.hasOwnProperty(key)) {
                if (def.BODY.hasOwnProperty(key)) {
                    def.BODY[key] = def.BODY[key] * MC_base[key] * MC_names.bodyScale;
                } else {
                    def.BODY[key] = MC_base[key];
                }
            }
        }

        Class[name] = {
            PARENT: "genericTank",
            UPGRADE_TOOLTIP: `${def.UPGRADE_TOOLTIP} Art by Felyn_de_fens`,
            SHAPE: MC_names.assets[name] && MC_names.assets[name] != ""
                ? `${MC_names.assets[name]}.png`
                : `https://raw.githubusercontent.com/ClashTest311/MC-addon/main/assets/${name}.png`,
            COLOR: def.COLOR,
            SIZE: def.SIZE,
            BODY: def.BODY,
            LABEL: name,
            LEVEL_CAP: 120,
            LEVEL: 120,
            SKILL_CAP: Array(10).fill(smshskl),
            LEVEL_SKILL_POINT_FUNCTION: level => {
                if (level <= 120) return 1;
                return 0;
            },
            GUNS: [{
                POSITION: [1, 3, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats(stats),
                    TYPE: type,
                },
            }],
            ON: [],
        };

        if (MC_names.differentTeam) Class[name].TEAM = -10;
        for (let i = 0; i < def.GUNS.length; i++) {
            let gun = def.GUNS[i];
            MC_functions.create(gun, args, type);
        }
        for (let i = 0; i < def.ANIMATION.length; i++) {
            let item = def.ANIMATION[i];
            MC_functions.create({
                gun: "Animation",
            }, {
                AUTOFIRE: item.AUTOFIRE,
                TYPE: item.TYPE,
                COLOR: def.COLOR,
            }, name);
        }
        for (let key in def.ON) {
            if (def.ON.hasOwnProperty(key)) {
                if (key != "fire" && key != "tick" && key != "define" && key != "death") {
                    throw new Error(`Unsupported event ${key}`);
                }
                Class[name].ON.push({
                    event: key,
                    handler: ({ body }) => {
                        def.ON[key](body);
                        if (key == "define") MC_functions.handler(name);
                    },
                });
            }
        }
    },
    log: (...message) => {
        util.log(`[MC] ${message.join(', ')}`);
    },
};
const MC_definitions = {
    Toothless: {
        UPGRADE_TOOLTIP: "The unholy offspring of lightning and death itself.",
        GUNS: [
            {
                gun: "Tail",
            },
            {
                event: "Firework",
            },
        ],
        TYPE: ["Blast", {
            event: "Kill",
        }],
        BODY: {
            SPEED: 1,
        },
        ON: MC_functions.onComponent(6),
        COLOR: "purple",
        ANIMATION: [],
        TIMEOUT: 4,
        SIZE: 20,
    },
    Stormfly: {
        UPGRADE_TOOLTIP: "I don't know what I would do without Stormfly.",
        GUNS: [
            {
                gun: "FireRange",
            },
        ],
        TYPE: "Short",
        BODY: {
            HEALTH: 0.6,
            DAMAGE: 0.4,
        },
        ON: MC_functions.onComponent(8),
        COLOR: "#fff242",
        ANIMATION: [],
        TIMEOUT: 4,
        SIZE: 20,
    },
    Hookfang: {
        UPGRADE_TOOLTIP: "Five-thousand pounds of flaming muscle coming through!",
        GUNS: [
            {
                gun: "FireRange",
            },
        ],
        TYPE: "Short",
        BODY: {
            HEALTH: 0.4,
            DAMAGE: 0.6,
        },
        ON: MC_functions.onComponent(8),
        COLOR: "red",
        ANIMATION: [],
        TIMEOUT: 4,
        SIZE: 20,
    },
    Meatlug: {
        UPGRADE_TOOLTIP: "Who's my little princess?",
        GUNS: [
            {
                gun: "Tail",
            },
        ],
        TYPE: "BigBlast",
        BODY: {
            HEALTH: 0.5,
            DAMAGE: 0.5,
        },
        ON: MC_functions.onComponent(6),
        COLOR: "brown",
        ANIMATION: [],
        TIMEOUT: 15,
        SIZE: 20,
    },
    Phoenix: {
        UPGRADE_TOOLTIP: "You haven't seen anything like this before...",
        GUNS: [
            {
                gun: "Tail",
            },
            {
                event: "Poison",
            },
        ],
        TYPE: "BigBlast",
        BODY: {
            HEALTH: 0.5,
            DAMAGE: 0.5,
        },
        ON: MC_functions.onComponent(6),
        COLOR: "#ff6200",
        ANIMATION: [],
        TIMEOUT: 15,
        SIZE: 20,
    },
    Kraken: {
        UPGRADE_TOOLTIP: "The danger of the seas.",
        GUNS: [],
        TYPE: ["NoBlast", {
            event: "Whirlpool",
        }],
        BODY: {
            DAMAGE: 0.5,
            HEALTH: 0.5,
        },
        ON: MC_functions.onComponent(6),
        COLOR: "green",
        ANIMATION: [],
        TIMEOUT: 0,
        SIZE: 20,
    },
    Yeti: {
        UPGRADE_TOOLTIP: "The Yeti?",
        GUNS: [],
        TYPE: "BigBlast",
        BODY: {
            HEALTH: 0.6,
            DAMAGE: 0.4,
        },
        ON: MC_functions.onComponent(10),
        COLOR: "gray",
        ANIMATION: [],
        TIMEOUT: 0,
        SIZE: 20,
    },
    Skrill: {
        UPGRADE_TOOLTIP: "I would never torture that dragon.",
        GUNS: [],
        TYPE: ["Blast", {
            class: "Laser",
        }],
        BODY: {
            DAMAGE: 0.4,
            HEALTH: 0.4,
            SPEED: 0.2,
        },
        ON: MC_functions.onComponent(10),
        COLOR: "blue",
        ANIMATION: [],
        TIMEOUT: 0,
        SIZE: 20,
    },
    Godzilla: {
        UPGRADE_TOOLTIP: "Godzilla have been awakened.",
        GUNS: [],
        TYPE: ["Long", {
            class: "Laser",
        }],
        BODY: {
            HEALTH: 1.2,
            DAMAGE: 0.8,
        },
        ON: MC_functions.onComponent(0),
        COLOR: "#cb42f5",
        ANIMATION: [{
            TYPE: "INSIDE",
            AUTOFIRE: true,
        }, {
            TYPE: "OUT",
            AUTOFIRE: false,
        }],
        TIMEOUT: 0,
        SIZE: 36,
    },
    Shimu: {
        UPGRADE_TOOLTIP: "She isn't as strong as you might think, and no, not outside...",
        GUNS: [
            {
                event: "Poison",
            },
        ],
        TYPE: ["Long", {
            class: "Laser",
        }],
        BODY: {
            HEALTH: 1.4,
            DAMAGE: 0.6,
        },
        ON: MC_functions.onComponent(0),
        COLOR: "#b0ceff",
        ANIMATION: [{
            TYPE: "INSIDE",
            AUTOFIRE: true,
        }, {
            TYPE: "OUT",
            AUTOFIRE: false,
        }],
        TIMEOUT: 0,
        SIZE: 36,
    },
};

// Controllers
class MC_orbit extends IO {
    constructor(body, opts = {}) {
        super(body);
        this.realDist = 0;
        this.invert = opts.invert ?? false;
    }

    think(input) {
        let invertFactor = this.invert ? -1 : 1,
            master = this.body.master.master,
            dist = this.invert ? master.inverseDist : master.dist,
            angle = (this.body.angle * Math.PI / 180 + master.angle) * invertFactor;

        if (this.realDist > dist) this.realDist -= Math.min(10, Math.abs(this.realDist - dist));
        else if (this.realDist < dist) this.realDist += Math.min(10, Math.abs(dist - this.realDist));
        this.body.x = master.x + Math.cos(angle) * this.realDist;
        this.body.y = master.y + Math.sin(angle) * this.realDist;
        this.body.facing = angle;
    }
}
class MC_orbitEntity extends IO {
    constructor(body, opts = {}) {
        super(body);
        this.norDistance = opts.norDistance ?? 2;
        this.body.dist = opts.initialDist || this.norDistance * this.body.size;
        this.body.inverseDist = this.norDistance * this.body.size - this.body.dist + this.norDistance * this.body.size;
        this.body.angle = 0;
    }

    think(input) {
        this.body.angle += (this.body.skill.spd * 2 + this.body.aiSettings.SPEED) * Math.PI / 180;
        this.body.dist = this.norDistance * this.body.size;
    }
}
ioTypes["MC_orbit"] = MC_orbit;
ioTypes["MC_orbitEntity"] = MC_orbitEntity;

Class.MC = menu("Mythic Creatures", "black", 0);
Class.MC_developer = menu("MC Developer Edition", "black", 0);
Class.MC.UPGRADES_TIER_0 = ["MC_developer"];
Class.MC_developer.UPGRADES_TIER_0 = [];

for (let i = 0; i < MC_names.petals.length; i++) {
    let petal = MC_names.petals[i];
    Class[`MC_petal${petal}`] = {
        TYPE: "satellite",
        CONTROLLERS: ["MC_orbit"],
        MOTION_TYPE: "motor",
        FACING_TYPE: "spin",
        COLOR: `${petal.toLowerCase()}Stone`,
        CLEAR_ON_MASTER_UPGRADE: true,
        ACCEPTS_SCORE: false,
        DRAW_HEALTH: false,
        LAYER: 13,
        SHAPE: 6,
        BODY: {
            PUSHABILITY: 0.6,
            ACCELERATION: 0.75,
            HEALTH: 1e6,
            DAMAGE: 0,
            SPEED: 10,
            RANGE: 200,
        },
    };
}

for (let key in MC_definitions) {
    if (MC_definitions.hasOwnProperty(key)) {
        MC_functions.parse(MC_definitions[key]);
        Class[`${key}_developer`] = Class[MC_functions.create({
            class: "Developer",
        }, key)];
        Class.MC.UPGRADES_TIER_0.push(key);
        Class.MC_developer.UPGRADES_TIER_0.push(`${key}_developer`);
    }
}
Class.addons.UPGRADES_TIER_0.push("MC");

MC_functions.log('Mythic Creatures addon has been registered.');
