const { combineStats } = require('../facilitators.js');
const { base, gunCalcNames, statnames } = require('../constants.js');
const g = require('../gunvals.js');

module.exports = ({ Class }) => {

Class.shaman2 = {
    PARENT: ["shaman"],
    UPGRADE_LABEL: "Shaman (OD)",
    COLOR: 15
};
Class.somachip = {
    PARENT: ["sunchip"],
    NECRO: [7],
    SHAPE: 7
};
Class.sangoma = {
    PARENT: ["miniboss"],
    LABEL: "Sangoma",
    DANGER: 8,
    SHAPE: 7.5,
    COLOR: 11,
    SIZE: 26,
    MAX_CHILDREN: 20,
    FACING_TYPE: "autospin",
    VALUE: 7e5,
    BODY: {
        FOV: 0.5,
        SPEED: 0.06 * base.SPEED,
        HEALTH: 25 * base.HEALTH,
        DAMAGE: 6 * base.DAMAGE,
    },
    GUNS: Array(7).fill().map((_, i) => ({
        POSITION: [3.5, 8, 1.2, 8, 0, i * 360/7, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroy, { size: 1.2 }]),
            TYPE: "somachip",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true,
        },
    }))
};
Class.ballchip = {
    PARENT: ["sunchip"],
    NECRO: [8],
    SHAPE: 8
};
Class.preacher = {
    PARENT: ["miniboss"],
    LABEL: "Preacher",
    DANGER: 8,
    SHAPE: 8,
    COLOR: 4,
    SIZE: 26,
    MAX_CHILDREN: 16,
    FACING_TYPE: "autospin",
    VALUE: 8e5,
    BODY: {
        FOV: 0.5,
        SPEED: 0.05 * base.SPEED,
        HEALTH: 30 * base.HEALTH,
        DAMAGE: 7 * base.DAMAGE,
    },
    GUNS: Array(8).fill().map((_, i) => ({
        POSITION: [3.5, 7, 1.2, 8, 0, i * 45, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroy, g.anni, { size: 1.4 }]),
            TYPE: "ballchip",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true,
        },
    }))
};
Class.enachip = {
    PARENT: ["sunchip"],
    NECRO: [9],
    SHAPE: 9
};
Class.herbalist = {
    PARENT: ["miniboss"],
    LABEL: "Herbalist",
    DANGER: 8,
    SHAPE: 9.5,
    COLOR: 18,
    SIZE: 26,
    MAX_CHILDREN: 12,
    FACING_TYPE: "autospin",
    VALUE: 9e5,
    BODY: {
        FOV: 0.5,
        SPEED: 0.04 * base.SPEED,
        HEALTH: 35 * base.HEALTH,
        DAMAGE: 8 * base.DAMAGE,
    },
    GUNS: Array(9).fill().map((_, i) => ({
        POSITION: [3.5, 6.125, 1.2, 8, 0, i * 360/9, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroy, g.anni, { size: 1.7 }]),
            TYPE: "enachip",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true,
        },
    }))
};
Class.mysticals.UPGRADES_TIER_0.push("shaman2", "sangoma", "preacher", "herbalist");

};
