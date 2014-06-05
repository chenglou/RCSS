var assign = require('lodash.assign');

var styleRuleValidator = require('./styleRuleValidator');
var styleRuleConverter = require('./styleRuleConverter');

var existingClasses = {};
var styleTag = createStyleTag();

var classNameId = 0;

function generateValidCSSClassName() {
  // CSS classNames can't start with a number.
  return 'c' + (classNameId++);
}

function objToCSS(style) {
  var serialized = '';
  for (var propName in style) {
    // we put that ourselves
    if (propName == 'className') continue;

    var cssPropName = styleRuleConverter.hyphenateProp(propName);
    if (!styleRuleValidator.isValidProp(cssPropName)) {
      console.warn(
        '%s (transformed into %s) is not a valid CSS property name.', propName, cssPropName
      );
      continue;
    }

    var styleValue = style[propName];
    if (!styleRuleValidator.isValidValue(styleValue)) continue;

    if (styleValue !== null) {
      serialized += cssPropName + ':';
      serialized += styleRuleConverter.escapeValue(styleValue) + ';';
    }
  }
  return serialized || null;
}

function createStyleTag() {
  var tag = document.createElement('style');
  document.getElementsByTagName('head')[0].appendChild(tag);
  return tag;
}

function styleToCSS(style) {
  var styleStr = '.' + style.className + '{';
  styleStr += objToCSS(style.value);
  styleStr += '}';
  return styleStr;
}

// TODO: support media queries
function parseStyles(className, styleObj) {
  var mainStyle = {
    className: className,
    value: {}
  };
  var styles = [mainStyle];

  Object.keys(styleObj).forEach(function(k){
    // pseudo-selector, insert a new rule
    if (k[0] === ':') {
      styles.push({
        className: className+k,
        value: styleObj[k]
      });
      return;
    }

    // normal rule, insert into main one
    mainStyle.value[k] = styleObj[k];
  });

  return styles;
}

function insertStyle(className, styleObj) {
  var styles = parseStyles(className, styleObj);
  var styleStr = styles.map(styleToCSS).join('');
  styleTag.innerHTML += styleStr;
}

var RCSS = {
  merge: function(a, b, c, d, e) {
    return assign({}, a, b, c, d, e);
  },

  createClass: function(styleObj) {
    var styleId = JSON.stringify(styleObj);
    var className;

    if (existingClasses[styleId]) {
      // already exists, use the existing className
      className = existingClasses[styleId];
    } else {
      // generate a new class and insert it
      className = generateValidCSSClassName();
      existingClasses[styleId] = className;
      insertStyle(className, styleObj);
    }

    styleObj.className = className;
    return styleObj;
  }
};

module.exports = RCSS;
