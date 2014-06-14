var escape = require('lodash.escape');

var _uppercasePattern = /([A-Z])/g;

function hyphenateProp(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

function escapeValueForProp(value, prop) {
  // 'content' is a special property that must be quoted
  if (prop === 'content') {
    return '"' + value + '"';
  }
  return escape(value);
}

module.exports = {
  hyphenateProp: hyphenateProp,
  escapeValueForProp: escapeValueForProp
};
