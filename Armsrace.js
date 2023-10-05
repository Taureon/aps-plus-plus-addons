exports.quadtwin = {
   PARENT: [exports.genericTank],
   LABEL: 'Quad Twin',
   GUNS: [ {
         POSITION: [ 20, 8, 1, 0, -5.5, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
         }, }, {
         POSITION: [ 20, 8, 1, 0, -5.5, -90, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
         }, }, {
         POSITION: [ 20, 8, 1, 0, -5.5, 180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
         }, }, {
         POSITION: [ 20, 8, 1, 0, -5.5, 90, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
         }, }, {
         POSITION: [ 20, 8, 1, 0, 5.5, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
         }, }, {
         POSITION: [ 20, 8, 1, 0, 5.5, 90, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
         }, }, {
         POSITION: [ 20, 8, 1, 0, 5.5, 180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
         }, }, {
         POSITION: [ 20, 8, 1, 0, 5.5, -90, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
         }, }, 
     ],
};

