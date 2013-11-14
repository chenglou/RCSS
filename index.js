var sha1 = require('sha1');
var styleRuleValidator = require('./styleRuleValidator');
var styleRuleConverter = require('./styleRuleConverter');

var styleObjList = {};

function generateUniqueKey(string) {
  // sha1 doesn't necessarily return a char beginning. It'd be invalid css name
  return 'a' + sha1(string);
}

function jsObjToCSS(style) {
  var serialized = '';
  for (var styleName in style) {
    if (styleName == 'className') continue;
    if (!styleRuleValidator.isValidName(styleName)) continue;

    var styleValue = style[styleName];
    if (!styleRuleValidator.isValidValue(styleValue)) continue;

    if (styleValue != null) {
      serialized += styleRuleConverter.hyphenateProp(styleName) + ':';
      serialized += styleRuleConverter.escapeValue(styleValue) + ';';
    }
  }
  return serialized || null;
}

function createStyleTagFromStyleObj(styleObj) {
  var style = document.createElement('style');
  document.getElementsByTagName('head')[0].appendChild(style);

  var styleStr = '.' + styleObj.className + '{';
  styleStr += jsObjToCSS(styleObj);
  styleStr += '}';
  style.innerHTML = styleStr;
}

var RCSS = {
  createClass: function(styleObj) {
    var styleId = JSON.stringify(styleObj);
    var storedObj = styleObjList[styleId]
    if (storedObj === styleObj) return;
    // duplicate definition detection. Should be isolated into own operation
    // and warn in the future. Though in this particular case it might be
    // intentional (dynamically call `createClass` on new objs in a loop)
    if (storedObj) {
      styleObj.className = storedObj.className;
      return;
    }

    styleObj.className = generateUniqueKey(styleId);
    styleObjList[styleId] = styleObj;
    createStyleTagFromStyleObj(styleObj);
  },

  // TODO: find a library that does this. I can't believe there are pages of
  // results for `merge` and not a single simple and good one
  merge: function(/*objs..*/) {
    var returnObj = {};
    var extension;
    for (var i = 0; i < arguments.length; i++) {
      extension = arguments[i];
      for (var key in extension) {
        if (!{}.hasOwnProperty.call(extension, key)) continue;
        returnObj[key] = extension[key];
      }
    }
    return returnObj;
  },
}

module.exports = RCSS;
