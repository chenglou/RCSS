function generateRandomStr() {
  return 'a' + Math.random().toString(36).slice(2);
}

function dangerousStyleValue(styleName, value) {
  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }
  return value;
}

var _uppercasePattern = /([A-Z])/g;
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

var RCSS = {
  createClass: function(styleObj) {
    var styleId = JSON.stringify(styleObj);
    if (this._styleList[styleId]) return;

    styleObj.className = generateRandomStr();
    this._styleList[styleId] = styleObj;
    this._createStyleTagFromStyleObj(styleObj);
  },

  // merge: function(/*objs..*/) {
  //   var returnObj = {};
  //   var extension;
  //   for (var i = 0; i < arguments.length; i++) {
  //     extension = arguments[i];
  //     for (var key in extension) {
  //       if (!{}.hasOwnProperty.call(extension, key)) continue;
  //       returnObj[key] = extension[key];
  //     }
  //   }
  //   return returnObj;
  // },

  _styleList: {},

  _jsObjToCss: function(style) {
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

  _createStyleTagFromStyleObj: function(styleObj) {
    var style = document.createElement('style');
    document.getElementsByTagName('head')[0].appendChild(style);

    var styleStr = '.' + styleObj.className + '{';
    styleStr += this._jsObjToCss(styleObj);
    styleStr += '}';
    style.innerHTML = styleStr;
  }
}

module.exports = RCSS;
