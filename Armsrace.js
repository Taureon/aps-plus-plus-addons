const { combineStats, makeAuto } = require('../facilitators.js');
const { base, gunCalcNames, statnames } = require('../constants.js');
const g = require('../gunvals.js');

module.exports = ({ Class }) => {
    Class.quadtwin = {
        PARENT: 'genericTank',
        LABEL: 'Quad Twin',
        GUNS: [ {
            POSITION: [ 20, 8, 1, 0, -5.5, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: 'bullet',
            }, }, {
            POSITION: [ 20, 8, 1, 0, -5.5, -90, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: 'bullet',
            }, }, {
            POSITION: [ 20, 8, 1, 0, -5.5, 180, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: 'bullet',
            }, }, {
            POSITION: [ 20, 8, 1, 0, -5.5, 90, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: 'bullet',
            }, }, {
            POSITION: [ 20, 8, 1, 0, 5.5, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: 'bullet',
            }, }, {
            POSITION: [ 20, 8, 1, 0, 5.5, 90, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: 'bullet',
            }, }, {
            POSITION: [ 20, 8, 1, 0, 5.5, 180, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: 'bullet',
            }, }, {
            POSITION: [ 20, 8, 1, 0, 5.5, -90, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: 'bullet',
            }, }, 
        ],
    };
    Class.autotripletwin = makeAuto(Class.tripletwin);
    Class.tripletwin.UPGRADES_TIER_4 = ["quadtwin", "autotripletwin"]
};