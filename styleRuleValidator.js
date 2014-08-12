var isValidCSSProps = require('valid-css-props');

function isValidProp(prop) {
  return isValidCSSProps(prop);
}

module.exports = {
  isValidProp: isValidProp
};
