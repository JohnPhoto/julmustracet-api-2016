const calculateTotal = require('./calculateTotal');
const { disableAllExcept, disableOnlyTheseMethods } = require('./disableMethods');
const updatePositions = require('./updatePositions');
const updateTotal = require('./updateTotal');
const calculateDaily = require('./calculateDaily');

module.exports = {
  calculateDaily,
  calculateTotal,
  disableAllExcept,
  disableOnlyTheseMethods,
  updatePositions,
  updateTotal,
};
