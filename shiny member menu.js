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
Class.DestroyerDominatorOld = {
    PARENT: "destroyerDominator",
    UPGRADE_LABEL: "Dominator",
}
Class.GunnerDominatorOld = {
    PARENT: "gunnerDominator",
    UPGRADE_LABEL: "Dominator",
}
Class.TrapperDominatorOld = {
    PARENT: "gunnerDominator",
    UPGRADE_LABEL: "Dominator",
}
Class.BaseProtectorOld = {
    PARENT: "baseProtector",
    UPGRADE_LABEL: "Base",
}
Class.DominatorBlank = {
    PARENT: "genericTank",
    LABEL: "Dominator",
    TURRETS: [
        {
            POSITION: [22, 0, 0, 0, 360, 0],
            TYPE: "dominationBody",
        },
    ],
}
Class.SpecialMenu = {
    PARENT: "menu",
    LABEL: "Special Menu",
}
Class.DominatorMenu = {
    PARENT: "menu",
    LABEL: "Dominator Menu",
    UPGRADES_TIER_0: ["SpecialTanksMenu", "DominatorBlank", "DestroyerDominatorOld", "GunnerDominatorOld", "TrapperDominatorOld", "antiTankMachineGun", "BaseProtectorOld"],
}
Class.SpecialTanksMenu = {
    PARENT: "menu",
    LABEL: "Special Tanks Menu",
    UPGRADES_TIER_0: ["SpecialMenu", "healer", "DominatorMenu", "arenaCloser"],
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
