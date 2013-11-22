var isValidCSSProps = require('valid-css-props');

function isValidProp(prop) {
  return isValidCSSProps(prop);
}

function isValidValue(value) {
  return value != null && typeof value !== 'boolean' && value !== '';
}

module.exports = {
  isValidProp: isValidProp,
  isValidValue: isValidValue
};
