var escape = require('escape-html');
var mediaQueryValidator = require('valid-media-queries');
var styleRuleValidator = require('./styleRuleValidator');

var _uppercasePattern = /([A-Z])/g;
var msPattern = /^ms-/;

function hyphenateProp(string) {
  // MozTransition -> -moz-transition
  // msTransition -> -ms-transition. Notice the lower case m
  // http://modernizr.com/docs/#prefixed
  // thanks a lot IE
  return string.replace(_uppercasePattern, '-$1')
    .toLowerCase()
    .replace(msPattern, '-ms-');
}

function escapeValueForProp(value, prop) {
  // 'content' is a special property that must be quoted
  if (prop === 'content') {
    return '"' + value + '"';
  }

  return escape(value);
}

function ruleToString(propName, value) {
  var cssPropName = hyphenateProp(propName);

  if (!styleRuleValidator.isValidProp(cssPropName)) {
    console.warn(
      '%s (transformed into %s) is not a valid CSS property name.', propName, cssPropName
    );
    return '';
  }

  if (!styleRuleValidator.isValidValue(value)) {
    return '';
  }

  return cssPropName + ':' + escapeValueForProp(value, cssPropName) + ';';
}

function rulesToString(selector, styleObj) {
  var markup = '';
  var toplevel = '';

  for (var key in styleObj) {
    if (!styleObj.hasOwnProperty(key)) {
      continue;
    }

    var value = styleObj[key];

    // Support pseudo classes, psuedo elements and media queries.
    if (key[0] === ':') {
      toplevel += rulesToString(selector + key, value);
    } else if (key.substring(0, 6) === '@media') {
      if (!mediaQueryValidator(key)) {
        console.log('%s is not a valid media query.', key);
        continue;
      }

      toplevel += key + '{' + rulesToString(selector, value) + '}';
    } else if (typeof value === 'object') {
      toplevel += rulesToString(selector + ' ' + key, value);
    } else {
      markup += ruleToString(key, value);
    }
  }

  if (markup !== '') {
    markup = selector + '{' + markup + '}';
  }

  return markup + toplevel;
}

module.exports = {
  rulesToString: rulesToString
};
