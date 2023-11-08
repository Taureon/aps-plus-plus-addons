const { dereference, combineStats, addBackGunner, makeAuto, makeHybrid } = require('../facilitators.js');
const { base, gunCalcNames, statnames, smshskl } = require('../constants.js');
const g = require('../gunvals.js');

let greekNumbers = ',Double ,Triple ,Quad ,Penta ,Hexa ,Septa ,Octo ,Nona ,Deca ,Undeca ,Dodeca ,Trideca ,Tetradeca ,Pentadeca ,Hexadeca ,Heptadeca ,Octadeca ,Nonadeca ,Icosa ,Henicosa ,Docosa ,Tricosa ,Triaconta ,Hentriaconta '.split(','),
makeMulti = (type, count, name = -1, startRotation = 0) => {
    let output = dereference(type),
        shootyBois = output.GUNS,
        fraction = 360 / count;
    output.GUNS = [];
    for (let gun of type.GUNS) {
        for (let i = 0; i < count; i++) {
            let newgun = dereference(gun);
            newgun.POSITION[5] += startRotation + fraction * i;
            if (gun.PROPERTIES) newgun.PROPERTIES.TYPE = gun.PROPERTIES.TYPE;
            output.GUNS.push(newgun);
        };
    }
    output.LABEL = name == -1 ? (greekNumbers[count - 1] || (count + ' ')) + type.LABEL : name;
    return output;
},

makeBird = (type, name = -1, color) => {
    let output = dereference(type),
        shootyBois = [{
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]), TYPE: "bullet", LABEL: gunCalcNames.thruster }
        },{
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]), TYPE: "bullet", LABEL: gunCalcNames.thruster }
        },{
            POSITION: [18, 8, 1, 0, 0, 180, 0.6],
            PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]), TYPE: "bullet", LABEL: gunCalcNames.thruster }
        }];
    if (color) for (let i = 0; i < 3; i++) shootyBois[i].PROPERTIES.TYPE = [shootyBois[i].PROPERTIES.TYPE, { COLOR: color, KEEP_OWN_COLOR: true }];
    for (let i in output.GUNS) if (output.GUNS[i].PROPERTIES) output.GUNS[i].PROPERTIES.ALT_FIRE = true;
    if (output.FACING_TYPE == "locksFacing") output.FACING_TYPE = "toTarget";
    output.GUNS = type.GUNS == null ? [...shootyBois] : [...output.GUNS, ...shootyBois];
    output.LABEL = name == -1 ? "Bird " + type.LABEL : name;
    return output;
};

module.exports = ({ Class }) => {




    // Comment out the line below to enable this addon, uncomment it to disable this addon (WARNING: Increases load time by approximately 1.5x).
	//return console.log('--- Too ManyTanks addon [too-Many-Tanks.js] is disabled. See lines 48-49 to enable it. ---');

   
Class.twinPounder = {
   PARENT: ["genericTank"],
   LABEL: 'Twin Pounder',
   GUNS: [ {
         POSITION: [ 20.5, 12, 1, 0, 8, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 20.5, 12, 1, 0, -8, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
            TYPE: "bullet",
         }, }, ],
};

Class.pacifierNormalTank = {
   PARENT: ["genericTank"],
   LABEL: 'Pacifier',
   GUNS: [ {
         POSITION: [ 17, 7, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 17, 7, 1, 0, 0, -180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: "bullet",
         }, }, ],
};
	
   Class.bentTwin = {
   PARENT: ["genericTank"],
   LABEL: 'Bent Twin',
   GUNS: [ {
         POSITION: [ 20, 8, 1, 0, 0, -30, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 20, 8, 1, 0, 0, 30, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin]),
            TYPE: "bullet",
         }, }, 
     ],
};
   Class.twinSniper = {
   PARENT: ["genericTank"],
   LABEL: 'Double Sniper',
   BODY: {
      FOV: base.FOV * 1.3,
   },
   GUNS: [ {
         POSITION: [ 25, 8.5, 1, 0, -5.5, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 25, 8.5, 1, 0, 5.5, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
            TYPE: "bullet",
         }, }, 
     ],
};
Class.sniperHybrid = makeHybrid (Class.sniper, "PLACEHOLDER")
Class.sniperBird = makeBird (Class.sniper, "Hawk")
//upgrades

Class.twin.UPGRADES_TIER_2.push ("twinPounder", "pacifierNormalTank", "bentTwin", "twinSniper"),
Class.pounder.UPGRADES_TIER_2.push ("twinPounder"),
Class.sniper.UPGRADES_TIER_2.push ("twinSniper", "sniperHybrid", "sniperBird")
};
