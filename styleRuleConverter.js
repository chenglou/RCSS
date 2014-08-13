var mediaQueryValidator = require('valid-media-queries');
var styleRuleValidator = require('./styleRuleValidator');
var valueConverter = require('./valueConverter');
var propConverter = require('./propConverter');

function ruleToString(propName, value) {
  var cssPropName = propConverter(propName);
  if (!styleRuleValidator.isValidProp(cssPropName)) {
    console.warn(
      '%s (transformed into %s) is not a valid CSS property name.', propName, cssPropName
    );
    return '';
  }

  var cssValue = valueConverter(propName, value);
  if (!styleRuleValidator.isValidValue(cssValue)) {
    return '';
  }

  return cssPropName + ':' + cssValue + ';';
}

function _rulesToStringHeadless(styleObj) {
  var markup = '';

  for (var key in styleObj) {
    if (!styleObj.hasOwnProperty(key)) {
      continue;
    }

    if (key[0] === ':' || key.substring(0, 6) === '@media') {
      continue;
    }
    markup += ruleToString(key, styleObj[key]);
  }
  return markup;
}

function rulesToString(className, styleObj) {
  var markup = '';
  var pseudos = '';
  var mediaQueries = '';

  for (var key in styleObj) {
    if (!styleObj.hasOwnProperty(key)) {
      continue;
    }
    // Skipping the special pseudo-selectors and media queries.
    if (key[0] === ':') {
      pseudos += '.' + className + key + '{' +
        _rulesToStringHeadless(styleObj[key]) + '}';
    } else if (key.substring(0, 6) === '@media') {
      if (!mediaQueryValidator(key)) {
        console.log('%s is not a valid media query.', key);
        continue;
      }
      mediaQueries += key + '{' + rulesToString(className, styleObj[key]) + '}';
    } else {
      markup += ruleToString(key, styleObj[key]);
    }
  }

  if (markup !== '') {
    markup = '.' + className + '{' + markup + '}';
  }

  return markup + pseudos + mediaQueries;
}

module.exports = {
  rulesToString: rulesToString
};
