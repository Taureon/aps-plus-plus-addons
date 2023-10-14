const { combineStats, addBackGunner } = require('../facilitators.js');
const { base, gunCalcNames, statnames, smshskl } = require('../constants.js');
const g = require('../gunvals.js');

module.exports = ({ Class }) => {

// BASIC TANK AND UPGRADES
Class.diep2BasicTank = {
    PARENT: ["genericTank"],
    LABEL: "Basic Tank",
    GUNS: [
        {
            POSITION: [19, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2MachineGun = {
    PARENT: ["genericTank"],
    LABEL: "Machine Gun",
    GUNS: [
        {
            POSITION: [20, 8, 1.7, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Twin = {
    PARENT: ["genericTank"],
    LABEL: "Twin",
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Pounder = {
    PARENT: ["genericTank"],
    LABEL: "Pounder",
    GUNS: [
        {
            POSITION: [20, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Sniper = {
    PARENT: ["genericTank"],
    LABEL: "Sniper",
    BODY: {
        FOV: 1.1 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2FlankGuard = {
    PARENT: ["genericTank"],
    LABEL: "Flank Guard",
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Manager = {
    PARENT: ["genericTank"],
    LABEL: "Manager",
    BODY: {
        FOV: 1.1 * base.FOV,
    },
    STAT_NAMES: statnames.drone,
    MAX_CHILDREN: 4,
    GUNS: [
        {
            POSITION: [7, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone]),
                TYPE: "drone",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// MACHINE GUN UPGRADES
Class.diep2Blaster = {
    PARENT: ["genericTank"],
    LABEL: "Blaster",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [13, 8, 1.9, 4, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2GatlingGun = {
    PARENT: ["genericTank"],
    LABEL: "Gatling Gun",
    DANGER: 6,
    BODY: {
        FOV: 1.15 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [24, 8, 1.5, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Minigun = {
    PARENT: ["genericTank"],
    LABEL: "Unknown Tank",
    GUNS: [
        {
            POSITION: [23, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 0, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 8, 1, 0, 0, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2MachineFlank = {
    PARENT: ["genericTank"],
    LABEL: "Unknown Tank",
    DANGER: 6,
    HAS_NO_RECOIL: true,
    GUNS: [
        {
            POSITION: [20, 8, 1.7, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1.7, 0, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// BLASTER UPGRADES
Class.diep2TriBlaster = {
    PARENT: ["genericTank"],
    LABEL: "Tri-Blaster",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [13, 8, 1.7, 4, -2, -15, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.bent, g.halfrecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [13, 8, 1.7, 4, 2, 15, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.bent, g.halfrecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [13, 8, 1.9, 4, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.bent, g.halfrecoil]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Splasher = {
    PARENT: ["genericTank"],
    LABEL: "Splasher",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20, 6, 1.7, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.lowpower]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [13, 8, 1.9, 3, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.halfrecoil]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Flamethrower = {
    PARENT: ["genericTank"],
    LABEL: "Flamethrower",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [3, 20, 0.95, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                TYPE: "growBullet",
            },
        },
        {
            POSITION: [9, 12, 2, 4, 0, 0, 0],
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// GATLING GUN UPGRADES
Class.diep2Sprayer = {
    PARENT: ["genericTank"],
    LABEL: "Sprayer",
    DANGER: 7,
    BODY: {
        FOV: 1.15 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [24, 6, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1.7, -1, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.lowpower]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Accurator = {
    PARENT: ["genericTank"],
    LABEL: "Unknown Tank",
    DANGER: 7,
    BODY: {
        FOV: 1.5 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [8, 8, 0.1, 18, 0, 0, 0],
        },
        {
            POSITION: [22, 8, 1.3, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain]),
                TYPE: "speedBullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// "MINIGUN" UPGRADES
Class.diep2Streamliner = {
    PARENT: ["genericTank"],
    LABEL: "Streamliner",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [29, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [26, 8, 1, 0, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [23, 8, 1, 0, 0, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 8, 1, 0, 0, 0, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Subverter = {
    PARENT: ["genericTank"],
    LABEL: "Unknown Tank",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [24, 12, 1, 0, 0, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.destroy, g.mini, g.halfreload]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 12, 1, 0, 0, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.destroy, g.mini, g.halfreload]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.destroy, g.mini, g.halfreload]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// "MACHINE FLANK" UPGRADES
Class.diep2MachineTriple = {
    PARENT: ["genericTank"],
    LABEL: "Unknown Tank",
    DANGER: 7,
    HAS_NO_RECOIL: true,
    GUNS: [
        {
            POSITION: [20, 8, 1.7, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1.7, 0, 0, 120, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1.7, 0, 0, 240, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2HalfNHalf = {
    PARENT: ["genericTank"],
    LABEL: "Half 'n Half",
    DANGER: 7,
    HAS_NO_RECOIL: true,
    GUNS: [
        {
            POSITION: [13, 8, 1.9, 4, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [24, 8, 1.5, 0, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// TWIN UPGRADES
Class.diep2Triplet = {
    PARENT: ["genericTank"],
    LABEL: "Triplet",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [18, 9, 1, 0, 5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 9, 1, 0, -5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [21, 9, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2TripleShot = {
    PARENT: ["genericTank"],
    LABEL: "Triple Shot",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 2, 15, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -2, -15, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2DoubleTwin = {
    PARENT: ["genericTank"],
    LABEL: "Double Twin",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Gunner = {
    PARENT: ["genericTank"],
    LABEL: "Gunner",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [14, 5, 1, 0, 7, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 5, 1, 0, -7, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 5, 1, 0, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 5, 1, 0, -4, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// TRIPLET UPGRADES
Class.diep2Quintuplet = {
    PARENT: ["genericTank"],
    LABEL: "Quintuplet",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [16, 10, 1, 0, 5, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 10, 1, 0, -5, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 10, 1, 0, 3, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 10, 1, 0, -3, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2DualTank = {
    PARENT: ["genericTank"],
    LABEL: "Dual Tank",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20, 7, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 7, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8.5, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8.5, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// TRIPLE SHOT UPGRADES
Class.diep2PentaShot = {
    PARENT: ["genericTank"],
    LABEL: "Penta Shot",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [16, 8, 1, 0, 3, 30, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 8, 1, 0, -3, -30, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 2, 15, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -2, -15, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [23, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.bent]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2BentDouble = {
    PARENT: ["genericTank"],
    LABEL: "Bent Double",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 2, 15, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -2, -15, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 2, 195, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -2, 165, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [22, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// DOUBLE TWIN UPGRADES
Class.diep2QuadTwin = {
    PARENT: ["genericTank"],
    LABEL: "Quad Twin",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 270, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// GUNNER UPGRADES
Class.diep2Battery = {
    PARENT: ["genericTank"],
    LABEL: "Battery",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [13, 5, 1, 0, 7, 0, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [13, 5, 1, 0, -7, 0, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 5, 1, 0, 4, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 5, 1, 0, -4, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// POUNDER UPGRADES
Class.diep2Destroyer = {
    PARENT: ["genericTank"],
    LABEL: "Destroyer",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [20, 15, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Artillery = {
    PARENT: ["genericTank"],
    LABEL: "Artillery",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [17, 3, 1, 0, 6, 7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 3, 1, 0, -6, -7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Builder = {
    PARENT: ["genericTank"],
    LABEL: "Builder",
    DANGER: 6,
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: [18, 14, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1.1, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                TYPE: "setTrap",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// DESTROYER UPGRADES
Class.diep2Annihilator = {
    PARENT: ["genericTank"],
    LABEL: "Annihilator",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [19.5, 19.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.morerecoil]),
                TYPE: "bullet",
		},
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Blower = {
    PARENT: ["genericTank"],
    LABEL: "Unknown Tank",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20, 15, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3, 1, 0, 4, 180, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3, 1, 0, -4, 180, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 15, 1, 0, 0, 180, 0],
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Hybrid = {
    PARENT: ["genericTank"],
    LABEL: "Hybrid",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20, 15, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [7, 12, 1.2, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.lowpower]),
                TYPE: "drone",
		MAX_CHILDREN: 3,
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// ARTILLERY UPGRADES
Class.diep2Spreadshot = {
    PARENT: ["genericTank"],
    LABEL: "Spreadshot",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [13, 3, 1, 0, -1.2, -90, 5/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.power, g.lowpower, g.lessreload]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [13, 3, 1, 0, 1.2, 90, 5/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.power, g.lowpower, g.lessreload]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 3, 1, 0, -1.4, -70, 4/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.power, g.lowpower, g.lessreload]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 3, 1, 0, 1.4, 70, 4/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.power, g.lowpower, g.lessreload]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3, 1, 0, -1.8, -50, 3/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.power, g.lowpower, g.lessreload]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3, 1, 0, 1.8, 50, 3/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.power, g.lowpower, g.lessreload]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3, 1, 0, -2.3, -30, 2/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.power, g.lowpower, g.lessreload]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3, 1, 0, 2.3, 30, 2/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.power, g.lowpower, g.lessreload]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 3, 1, 0, -3.5, -10, 1/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.power, g.lowpower, g.lessreload]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 3, 1, 0, 3.5, 10, 1/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.power, g.lowpower, g.lessreload]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 9, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spread, g.lessreload]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Mortar = {
    PARENT: ["genericTank"],
    LABEL: "Mortar",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [12, 4, 1, 0, 8, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.power]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 4, 1, 0, -8, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.power]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [13.5, 4, 1, 0, 5.5, 0, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.power]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [13.5, 4, 1, 0, -5.5, 0, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.power]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// BUILDER UPGRADES
Class.diep2Constructor = {
    PARENT: ["genericTank"],
    LABEL: "Constructor",
    DANGER: 7,
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: [18, 18, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 18, 1.2, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                TYPE: "setTrap",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Conqueror = {
    PARENT: ["genericTank"],
    LABEL: "Unknown Tank",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [18, 14, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1.1, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                TYPE: "setTrap",
            },
        },
        {
            POSITION: [17, 12, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// SNIPER UPGRADES
Class.diep2Hunter = {
    PARENT: ["genericTank"],
    LABEL: "Hunter",
    DANGER: 6,
    BODY: {
        FOV: 1.15 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [21.5, 11.5, 1, 0, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Assassin = {
    PARENT: ["genericTank"],
    LABEL: "Assassin",
    DANGER: 6,
    BODY: {
        FOV: 1.25 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [27, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [10, 8, -1.1, 6, 0, 0, 0],
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Rifle = {
    PARENT: ["genericTank"],
    LABEL: "Rifle",
    DANGER: 6,
    BODY: {
        FOV: 1.1 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [25, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 9.5, 1, 0, 0, 0, 0],
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// HUNTER UPGRADES
Class.diep2Predator = {
    PARENT: ["genericTank"],
    LABEL: "Predator",
    DANGER: 7,
    BODY: {
        FOV: 1.15 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [21.5, 11.5, 1, 0, 0, 0, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 14, 1, 0, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Poacher = {
    PARENT: ["genericTank"],
    LABEL: "Poacher",
    DANGER: 7,
    BODY: {
        FOV: 1.15 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [21.5, 11.5, 1, 0, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [7, 12, 1.2, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.lowpower]),
                TYPE: "drone",
		MAX_CHILDREN: 3,
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// ASSASSIN UPGRADES
Class.diep2Ranger = {
    PARENT: ["genericTank"],
    LABEL: "Ranger",
    DANGER: 7,
    BODY: {
        FOV: 1.5 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [32, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [10, 8, -1.1, 6, 0, 0, 0],
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Buttbuttin = {
    PARENT: ["genericTank"],
    LABEL: "Buttbuttin",
    DANGER: 7,
    BODY: {
        FOV: 1.25 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [27, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [10, 8, -1.1, 6, 0, 0, 0],
        },
        {
            POSITION: [16, 3, 1, 0, -3, 180, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3, 1, 0, 3, 180, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 12, 1, 0, 0, 180, 0],
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// RIFLE UPGRADES
Class.diep2SniperRifle = {
    PARENT: ["genericTank"],
    LABEL: "Unknown Tank",
    DANGER: 7,
    BODY: {
        FOV: 1.35 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [28, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 9.5, 1, 0, 0, 0, 0],
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Blunderbuss = {
    PARENT: ["genericTank"],
    LABEL: "Unknown Tank",
    DANGER: 7,
    BODY: {
        FOV: 1.1 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [12, 3, 1, 0, 4, 6, 0.16],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.lowpower, g.halfreload, g.halfrecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 3, 1, 0, -4, -6, 0.16],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.lowpower, g.halfreload, g.halfrecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 3, 1, 0, 3.75, 4, 0.08],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.lowpower, g.halfreload, g.halfrecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 3, 1, 0, -3.75, -4, 0.08],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.lowpower, g.halfreload, g.halfrecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3, 1, 0, 3.5, 2, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.lowpower, g.halfreload, g.halfrecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3, 1, 0, -3.5, -2, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.lowpower, g.halfreload, g.halfrecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [25, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.halfreload]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 9.5, 1, 0, 0, 0, 0],
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// FLANK GUARD UPGRADES
Class.diep2HexaTank = {
    PARENT: ["genericTank"],
    LABEL: "Hexa Tank",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 300, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2TriAngle = {
    PARENT: ["genericTank"],
    LABEL: "Tri-Angle",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.halfrecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 145, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.lowpower, g.morerecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 215, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.lowpower, g.morerecoil]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2TrapGuard = {
    PARENT: ["genericTank"],
    LABEL: "Trap Guard",
    DANGER: 6,
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 8, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [4, 8, 1.5, 13, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// HEXA TANK UPGRADES
Class.diep2OctoTank = {
    PARENT: ["genericTank"],
    LABEL: "Octo Tank",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [19, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 0, 45, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 0, 135, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 0, 225, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 0, 315, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Tornado = {
    PARENT: ["genericTank"],
    LABEL: "Tornado",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [16, 6, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 6, 1, 0, 0, 120, 4/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 6, 1, 0, 0, 240, 2/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 6, 1, 0, 0, 60, 2/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 6, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 6, 1, 0, 0, 300, 4/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 6, 1, 0, 0, 30, 1/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 6, 1, 0, 0, 150, 5/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 6, 1, 0, 0, 270, 3/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 6, 1, 0, 0, 90, 3/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 6, 1, 0, 0, 210, 1/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 6, 1, 0, 0, 330, 5/6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2DeathStar = {
    PARENT: ["genericTank"],
    LABEL: "Death Star",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [16, 14, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.halfreload]),
                TYPE: "bullet",
		},
        },
        {
            POSITION: [16, 14, 1, 0, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.halfreload]),
                TYPE: "bullet",
		},
        },
        {
            POSITION: [16, 14, 1, 0, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.halfreload]),
                TYPE: "bullet",
		},
        },
        {
            POSITION: [16, 14, 1, 0, 0, 60, 0.05],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.halfreload]),
                TYPE: "bullet",
		},
        },
        {
            POSITION: [16, 14, 1, 0, 0, 180, 0.05],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.halfreload]),
                TYPE: "bullet",
		},
        },
        {
            POSITION: [16, 14, 1, 0, 0, 300, 0.05],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.halfreload]),
                TYPE: "bullet",
		},
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// TRI-ANGLE UPGRADES
Class.diep2Fighter = {
    PARENT: ["genericTank"],
    LABEL: "Fighter",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.halfrecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 7, 1, 0, 1, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 7, 1, 0, -1, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 145, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.lowpower, g.morerecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 215, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.lowpower, g.morerecoil]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Booster = {
    PARENT: ["genericTank"],
    LABEL: "Booster",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.halfrecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 7, 1, 0, 0, 130, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.lowpower, g.morerecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 7, 1, 0, 0, 230, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.lowpower, g.morerecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 145, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.lowpower, g.morerecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 215, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.lowpower, g.morerecoil]),
                TYPE: "bullet",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Bomber = {
    PARENT: ["genericTank"],
    LABEL: "Unknown Tank",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.halfrecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 130, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.morerecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 230, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.morerecoil]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 8, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [4, 8, 1.5, 13, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// TRAP GUARD UPGRADES
Class.diep2GunnerTrapper = {
    PARENT: ["genericTank"],
    LABEL: "Gunner Trapper",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20, 3, 1, 0, -4, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 3, 1, 0, 4, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 15, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [14, 8, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [4, 8, 1.5, 13, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2RifleGuard = {
    PARENT: ["genericTank"],
    LABEL: "Unknown Tank",
    DANGER: 7,
    BODY: {
        FOV: 1.1 * base.FOV,
    },
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [25, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 9.5, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [14, 8, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [4, 8, 1.5, 13, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2DoubleTrapGuard = {
    PARENT: ["genericTank"],
    LABEL: "Double Trap Guard",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 6, 1, 0, 6, 180, 0],
        },
        {
            POSITION: [4, 6, 1.5, 13, 6, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
            },
        },
        {
            POSITION: [14, 6, 1, 0, -6, 180, 0],
        },
        {
            POSITION: [4, 6, 1.5, 13, -6, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Fortress = {
    PARENT: ["genericTank"],
    LABEL: "Unknown Tank",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    BODY: {
        FOV: 1.15 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [6, 6, 0.5, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
            },
        },
        {
            POSITION: [6, 6, 0.5, 8, 0, 120, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
            },
        },
        {
            POSITION: [6, 6, 0.5, 8, 0, 240, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
            },
        },
        {
            POSITION: [14, 7, 1, 0, 0, 60, 0],
        },
        {
            POSITION: [4, 7, 1.5, 13, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
            },
        },
        {
            POSITION: [14, 7, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [4, 7, 1.5, 13, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
            },
        },
        {
            POSITION: [14, 7, 1, 0, 0, 300, 0],
        },
        {
            POSITION: [4, 7, 1.5, 13, 0, 300, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// MANAGER UPGRADES
Class.diep2Overseer = {
    PARENT: ["genericTank"],
    LABEL: "Overseer",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: 1.1 * base.FOV,
    },
    MAX_CHILDREN: 8,
    GUNS: [
        {
            POSITION: [7, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "drone",
            },
        },
        {
            POSITION: [7, 12, 1.2, 8, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "drone",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Cruiser = {
    PARENT: ["genericTank"],
    LABEL: "Cruiser",
    DANGER: 6,
    STAT_NAMES: statnames.swarm,
    BODY: {
        FOV: 1.15 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [6, 6, 0.5, 8, -4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
            },
        },
        {
            POSITION: [6, 6, 0.5, 8, 4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// OVERSEER UPGRADES
Class.diep2Overlord = {
    PARENT: ["genericTank"],
    LABEL: "Overlord",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: 1.1 * base.FOV,
    },
    MAX_CHILDREN: 8,
    GUNS: [
        {
            POSITION: [7, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "drone",
            },
        },
        {
            POSITION: [7, 12, 1.2, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "drone",
            },
        },
        {
            POSITION: [7, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "drone",
            },
        },
        {
            POSITION: [7, 12, 1.2, 8, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "drone",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Overtrapper = {
    PARENT: ["genericTank"],
    LABEL: "Overtrapper",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    BODY: {
        FOV: 1.1 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [7, 12, 1.2, 8, 0, 125, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "drone",
    		MAX_CHILDREN: 3,
            },
        },
        {
            POSITION: [7, 12, 1.2, 8, 0, 235, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "drone",
    		MAX_CHILDREN: 3,
            },
        },
        {
            POSITION: [14, 8, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 8, 1.5, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// CRUISER UPGRADES
Class.diep2Carrier = {
    PARENT: ["genericTank"],
    LABEL: "Carrier",
    DANGER: 7,
    STAT_NAMES: statnames.swarm,
    BODY: {
        FOV: 1.15 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [6, 6, 0.5, 8, -4, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
            },
        },
        {
            POSITION: [6, 6, 0.5, 8, 4, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
            },
        },
        {
            POSITION: [6, 6, 0.5, 8, -4, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
            },
        },
        {
            POSITION: [6, 6, 0.5, 8, 4, 270, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.diep2Battleship = {
    PARENT: ["genericTank"],
    LABEL: "Battleship",
    DANGER: 7,
    STAT_NAMES: statnames.swarm,
    BODY: {
        FOV: 1.25 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [6, 6, 0.5, 7, -3, -30, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
            },
        },
        {
            POSITION: [6, 6, 0.5, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
            },
        },
        {
            POSITION: [6, 6, 0.5, 7, 3, 30, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
            },
        },
    ],
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

// UNCLASSED
Class.diep2Ball = {
    PARENT: ["genericTank"],
    LABEL: "Unknown Tank",
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};

Class.diep2Tanks = {
    PARENT: ["menu"],
    LABEL: "Diep2.io Tanks",
    COLOR: "#417EDE",
    REROOT_UPGRADE_TREE: "diep2BasicTank",
};
Class.tanks.UPGRADES_TIER_0.push("diep2Tanks");
Class.diep2Tanks.UPGRADES_TIER_0 = ["diep2BasicTank", "diep2Ball"];

Class.diep2BasicTank.UPGRADES_TIER_1 = ["diep2MachineGun", "diep2Twin", "diep2Pounder", "diep2Sniper", "diep2FlankGuard", "diep2Manager"];

    Class.diep2MachineGun.UPGRADES_TIER_2 = ["diep2Blaster", "diep2GatlingGun", "diep2Minigun", "diep2MachineFlank"];
        Class.diep2Blaster.UPGRADES_TIER_3 = ["diep2TriBlaster", "diep2Splasher", "diep2Flamethrower"];
        Class.diep2GatlingGun.UPGRADES_TIER_3 = ["diep2Sprayer", "diep2Accurator"];
        Class.diep2Minigun.UPGRADES_TIER_3 = ["diep2Streamliner", "diep2Subverter"];
        Class.diep2MachineFlank.UPGRADES_TIER_3 = ["diep2MachineTriple", "diep2HalfNHalf"];

    Class.diep2Twin.UPGRADES_TIER_2 = ["diep2Triplet", "diep2TripleShot", "diep2DoubleTwin", "diep2Gunner"];
        Class.diep2Triplet.UPGRADES_TIER_3 = ["diep2Quintuplet", "diep2DualTank", "diep2Battleship"];
	Class.diep2TripleShot.UPGRADES_TIER_3 = ["diep2PentaShot", "diep2BentDouble", "diep2TriBlaster"];
	Class.diep2DoubleTwin.UPGRADES_TIER_3 = ["diep2BentDouble", "diep2QuadTwin", "diep2DoubleTrapGuard"];
	Class.diep2Gunner.UPGRADES_TIER_3 = ["diep2Battery", "diep2Mortar"];

    Class.diep2Pounder.UPGRADES_TIER_2 = ["diep2Destroyer", "diep2Artillery", "diep2Builder"];
        Class.diep2Destroyer.UPGRADES_TIER_3 = ["diep2Annihilator", "diep2Subverter", "diep2Blower", "diep2DeathStar", "diep2Hybrid"];
        Class.diep2Artillery.UPGRADES_TIER_3 = ["diep2Spreadshot", "diep2Mortar"];
        Class.diep2Builder.UPGRADES_TIER_3 = ["diep2Constructor", "diep2Conqueror"];

    Class.diep2Sniper.UPGRADES_TIER_2 = ["diep2Hunter", "diep2Assassin", "diep2Rifle"];
        Class.diep2Hunter.UPGRADES_TIER_3 = ["diep2Predator", "diep2Poacher"];
        Class.diep2Assassin.UPGRADES_TIER_3 = ["diep2Ranger", "diep2Buttbuttin"];
        Class.diep2Rifle.UPGRADES_TIER_3 = ["diep2RifleGuard", "diep2SniperRifle", "diep2Blunderbuss"];

    Class.diep2FlankGuard.UPGRADES_TIER_2 = ["diep2HexaTank", "diep2TriAngle", "diep2TrapGuard"];
        Class.diep2HexaTank.UPGRADES_TIER_3 = ["diep2OctoTank", "diep2Tornado", "diep2DeathStar"];
        Class.diep2TriAngle.UPGRADES_TIER_3 = ["diep2Fighter", "diep2Booster", "diep2Bomber"];
        Class.diep2TrapGuard.UPGRADES_TIER_3 = ["diep2GunnerTrapper", "diep2RifleGuard", "diep2DoubleTrapGuard", "diep2Bomber", "diep2Fortress"];

    Class.diep2Manager.UPGRADES_TIER_2 = ["diep2Overseer", "diep2Cruiser"];
        Class.diep2Overseer.UPGRADES_TIER_3 = ["diep2Overlord", "diep2Overtrapper"];
        Class.diep2Cruiser.UPGRADES_TIER_3 = ["diep2Carrier", "diep2Battleship", "diep2Fortress"];

};
