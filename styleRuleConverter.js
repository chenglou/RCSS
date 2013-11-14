var _uppercasePattern = /([A-Z])/g;

function hyphenateProp(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

function escapeValue(value) {
  // TODO: this
  return value;
}

module.exports = {
  hyphenateProp: hyphenateProp,
  escapeValue: escapeValue
};
