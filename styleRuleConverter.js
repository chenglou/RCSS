var escape = require('lodash.escape');

var _uppercasePattern = /([A-Z])/g;

function hyphenateProp(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

function escapeValue(value) {
  return escape(value);
}

module.exports = {
  hyphenateProp: hyphenateProp,
  escapeValue: escapeValue
};
