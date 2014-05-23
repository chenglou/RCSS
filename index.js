var sha1 = require('sha1');
var defaults = require('lodash.defaults');
var styleRuleValidator = require('./styleRuleValidator');
var styleRuleConverter = require('./styleRuleConverter');

var styleObjList = {};

var styleTag = createStyleTag();

function generateValidCSSClassKey(string) {
  // sha1 doesn't necessarily return a char beginning. It'd be invalid css name
  return 'a' + sha1(string);
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

function createStyleRuleFromStyleObj(styleObj) {
  var styleStr = '.' + styleObj.className + '{';
  styleStr += objToCSS(styleObj);
  styleStr += '}';

  styleTag.innerHTML += styleStr;
}

var RCSS = {
  merge: defaults,
  createClass: function(styleObj) {
    var styleId = JSON.stringify(styleObj);
    var storedObj = styleObjList[styleId];
    if (storedObj === styleObj) return;
    // duplicate definition detection. Should be isolated into own operation
    // and warn in the future. Though in this particular case it might be
    // intentional (dynamically call `createClass` on new objs in a loop)
    if (storedObj) {
      styleObj.className = storedObj.className;
      return;
    }

    styleObj.className = generateValidCSSClassKey(styleId);
    styleObjList[styleId] = styleObj;
    createStyleRuleFromStyleObj(styleObj);
  }
};

module.exports = RCSS;
