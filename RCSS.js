var dangerousStyleValue = require('./dangerousStyleValue');
var hyphenate = require('./hyphenate');

function generateRandomStr() {
  return 'a' + Math.random().toString(36).slice(2);
}

var RCSS = {
  styleList: {},

  createStyles: function(style) {
    var serialized = '';
    for (var styleName in style) {
      if (styleName == 'className') {
        continue;
      }
      var styleValue = style[styleName];
      if (styleValue != null) {
        serialized += hyphenate(styleName) + ':';
        serialized += dangerousStyleValue(styleName, styleValue) + ';';
      }
    }
    return serialized || null;
  },

  createClass: function(styleObj) {
    var styleId = JSON.stringify(styleObj);
    if (this.styleList[styleId]) return;

    styleObj.className = generateRandomStr();
    this.styleList[styleId] = styleObj;
    this._createStyleTagFromStyleObj(styleObj);
  },

  _createStyleTagFromStyleObj: function(styleObj) {
    var style = document.createElement('style');
    document.getElementsByTagName('head')[0].appendChild(style);

    var styleStr = '.' + styleObj.className + '{';
    styleStr += this.createStyles(styleObj);
    styleStr += '}';
    style.innerHTML = styleStr;
  }
}

module.exports = RCSS;
