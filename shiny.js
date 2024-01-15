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
Class.dreadnoughts = {
    PARENT: "menu",
    LABEL: "Dreadnoughts",
    UPGRADES_TIER_1: ["dreadOfficialV1", "dreadOfficialV2"],
}
Class.ShinyMenu = {
    PARENT: "menu",
    LABEL: "Shiny Member Menu",
    UPGRADES_TIER_0: ["dreadnoughts", "tracker3"],
}
console.log("[INFO] Loaded shiny member menu!")

//Class.ShinyMenu.UPGRADES_TIER_0 = ["dreadnoughts", "tracker3"];
//Class.dreadnoughts.UPGRADES_TIER_1 = ["dreadV1", "DreadV2"];
console.log("[INFO] Loaded shiny member menu!");
