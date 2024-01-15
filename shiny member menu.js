// Credits: Zyrafaq and damocleas for the idea and to APS ++ for the framework
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
Class.HealerMenuOld = {
    PARENT: "healer",
    UPGRADE_LABEL: "Healer Menu",
}
Class.BossesMenuOld = {
    PARENT: "bosses",
    LABEL: "Bosses Menu",
}
Class.SpecialMenu = {
    PARENT: "menu",
    LABEL: "Special Menu",
    UPGRADES_TIER_0: ["basic", "eggGenerator", "SpecialTanksMenu", "BossesMenuOld", "NostalgiaMenu", "ScrappedMenu", "MemesMenu", "DreadnoughtsMenu", "ShinyMenu"],
}
Class.NostalgiaMenu = {
    PARENT: "menu",
    LABEL: "Nostalgia Menu",
}
Class.DominatorMenu = {
    PARENT: "menu",
    LABEL: "Dominator Menu",
    UPGRADES_TIER_0: ["SpecialTanksMenu", "DominatorBlank", "DestroyerDominatorOld", "GunnerDominatorOld", "TrapperDominatorOld", "antiTankMachineGun", "BaseProtectorOld"],
}
Class.ScrappedMenu = {
    PARENT: "menu",
    LABEL: "Scrapped Menu",
}
Class.SpecialTanksMenu = {
    PARENT: "menu",
    LABEL: "Special Tanks Menu",
    UPGRADES_TIER_0: ["SpecialMenu", "HealerMenuOld", "DominatorMenu", "arenaCloser"],
}
Class.MemesMenu = {
    PARENT: "menu",
    LABEL: "Memes",
    UPGRADES_TIER_0: ["DiepTanksMenu", "AdminTanksMenu", "MiscTanksMenu"],
}
Class.AdminTanksMenu = {
    PARENT: "menu",
    LABEL: "Admin Tanks",
}
Class.DiepTanksMenu = {
    PARENT: "menu",
    LABEL: "Diep Tanks",
}
Class.MiscTanksMenu = {
    PARENT: "menu",
    LABEL: "Misc",
}
Class.DreadnoughtsMenu = {
    PARENT: "menu",
    LABEL: "Dreadnoughts",
    UPGRADES_TIER_1: ["dreadOfficialV1", "dreadOfficialV2"],
}
Class.ShinyMenu = {
    PARENT: "menu",
    LABEL: "Shiny Member Menu",
    UPGRADES_TIER_0: ["eggGenerator", "SpecialTanksMenu","BossesMenuOld", "NostalgiaMenu", "ScrappedMenu", "DreadnoughtsMenu", "tracker3"],
}
console.log("[INFO] Loaded shiny member menu!");
