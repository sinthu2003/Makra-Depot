// api/index.js
require('ts-node').register();
const { handler } = require('../src/main'); // import TS file directly
module.exports = handler;
