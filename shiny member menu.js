const { combineStats, addAura, makeDeco } = require('../facilitators.js');
const { base, gunCalcNames, basePolygonDamage, basePolygonHealth, dfltskl, statnames } = require('../constants.js');
const g = require('../gunvals.js');

// Menus
Class.menu = {
    PARENT: ["genericTank"],
    LABEL: "",
    SKILL_CAP: [
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
    ],
    IGNORED_BY_AI: true,
    TURRETS: [],
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [18, 10, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.DominatorMenu = {
    PARENT: "menu",
    LABEL: "Dominator Menu",
    UPGRADES_TIER_0: [""],
}
Class.SpecialTanksMenu = {
    PARENT: "menu",
    LABEL: "Special Tanks Menu",
    UPGRADES_TIER_0: ["healer"],
}
Class.Dreadnoughts = {
    PARENT: "menu",
    LABEL: "Dreadnoughts",
    UPGRADES_TIER_1: ["dreadOfficialV1", "dreadOfficialV2"],
}
Class.ShinyMenu = {
    PARENT: "menu",
    LABEL: "Shiny Member Menu",
    UPGRADES_TIER_0: ["eggGenerator", "SpecialTanksMenu","bosses", "Dreadnoughts", "tracker3"],
}
console.log("[INFO] Loaded shiny member menu!");
