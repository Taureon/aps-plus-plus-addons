// An addon is guaranteed to run only after all groups are loaded.
// This is helpful, if your group relies on all other definitions already being loaded.
// Addons that are dependant on other addons should be named something like
// "[PARENT ADDON NAME]-[EXTENSION NAME].js", to make sure that it would run after that addon ran.

const { combineStats, addBackGunner } = require('../facilitators.js');
const { base, gunCalcNames, statnames } = require('../constants.js');
const g = require('../gunvals.js');

module.exports = ({ Class }) => {

// POLYGONS
Class.woomyAlphaPentagon = {
  PARENT: ["alphaPentagon"],
  SHAPE: -5,
};
Class.alphaHexagon = {
  PARENT: ["food"],
  LABEL: "Alpha Hexagon",
  VALUE: 1e4,
  SHAPE: -6,
  SIZE: 54,
  COLOR: "#56E012",
  BODY: {
      DAMAGE: 2.5 * basePolygonDamage,
      DENSITY: 80,
      HEALTH: 600 * basePolygonHealth,
      RESIST: Math.pow(1.275, 3),
      SHIELD: 85 * basePolygonHealth,
      REGEN: 0.05,
      ACCELERATION: 0.0025
  },
  DRAW_HEALTH: true,
  GIVE_KILL_MESSAGE: true,
};
Class.alphaHeptagon = {
  PARENT: ["food"],
  LABEL: "Alpha Heptagon",
  VALUE: 15e3,
  SHAPE: -7,
  SIZE: 56,
  COLOR: "#750685",
  BODY: {
      DAMAGE: 3 * basePolygonDamage,
      DENSITY: 80,
      HEALTH: 600 * basePolygonHealth,
      RESIST: Math.pow(1.3, 3),
      SHIELD: 90 * basePolygonHealth,
      REGEN: 0.02,
      ACCELERATION: 0.0025
  },
  DRAW_HEALTH: true,
  GIVE_KILL_MESSAGE: true,
};
Class.alphaOctagon = {
  PARENT: ["food"],
  LABEL: "Alpha Octagon",
  VALUE: 2e4,
  SHAPE: -8,
  SIZE: 57,
  COLOR: "#F22424",
  BODY: {
      DAMAGE: 3.25 * basePolygonDamage,
      DENSITY: 85,
      HEALTH: 600 * basePolygonHealth,
      RESIST: Math.pow(1.325, 3),
      SHIELD: 95 * basePolygonHealth,
      REGEN: 0.01,
      ACCELERATION: 0.0025
  },
  DRAW_HEALTH: true,
  GIVE_KILL_MESSAGE: true,
};
Class.alphaNonagon = {
  PARENT: ["food"],
  LABEL: "Alpha Nonagon",
  VALUE: 25e3,
  SHAPE: -9,
  SIZE: 58,
  COLOR: "#65F0EC",
  BODY: {
      DAMAGE: 3.5 * basePolygonDamage,
      DENSITY: 90,
      HEALTH: 600 * basePolygonHealth,
      RESIST: Math.pow(1.35, 3),
      SHIELD: 100 * basePolygonHealth,
      REGEN: 0.01,
      ACCELERATION: 0.0025
  },
  DRAW_HEALTH: true,
  GIVE_KILL_MESSAGE: true,
};
Class.alphaDecagon = {
  PARENT: ["food"],
  LABEL: "Alpha Decagon",
  VALUE: 3e4,
  SHAPE: -10,
  SIZE: 59,
  COLOR: 6,
  BODY: {
      DAMAGE: 3.75 * basePolygonDamage,
      DENSITY: 95,
      HEALTH: 600 * basePolygonHealth,
      RESIST: Math.pow(1.375, 3),
      SHIELD: 101 * basePolygonHealth,
      REGEN: 0.01,
      ACCELERATION: 0.0025
  },
  DRAW_HEALTH: true,
  GIVE_KILL_MESSAGE: true,
};
Class.icosagon = {
  PARENT: ["food"],
  LABEL: "Icosagon",
  VALUE: 105e3,
  SHAPE: -20,
  SIZE: 120,
  COLOR: "#6A00FF",
  BODY: {
      DAMAGE: 4.5 * basePolygonDamage,
      DENSITY: 140,
      HEALTH: 670.5 * basePolygonHealth,
      RESIST: Math.pow(1.375, 3),
      SHIELD: 110 * basePolygonHealth,
      REGEN: 0.1,
      ACCELERATION: 0.0025
  },
  DRAW_HEALTH: true,
  GIVE_KILL_MESSAGE: true,
};

// BASIC UPGRADES
  Class.autoBasic = makeAuto(Class.basic);
  Class.basebrid = makeHybrid(Class.basic, "Basebrid");

// AUTO-BASIC UPGRADES
  Class.autoTwin = makeAuto(Class.twin);
  Class.autoSniper = makeAuto(Class.sniper);
  Class.autoMachine = makeAuto(Class.machineGun, "Auto-Machine");
  Class.autoFlank = makeAuto(Class.flankGuard, "Auto-Flank");
  Class.chairman = makeAuto(Class.director, "Chairman");
  Class.scratcher = makeAuto(Class.pounder, "Scratcher");
  Class.autoBasebrid = makeAuto(Class.basebrid);
  Class.basiception = makeCeption(Class.basic, "Basiception");

// BASEBRID UPGRADES
  Class.twinbrid = makeHybrid(Class.twin, "Twinbrid");
  Class.snipebrid = makeHybrid(Class.sniper, "Snipebrid");
  Class.poundbrid = makeHybrid(Class.pounder, "Poundbrid");
  Class.trapbrid = makeHybrid(Class.trapper, "Trapbrid");
