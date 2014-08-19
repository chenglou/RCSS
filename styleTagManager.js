var TAG_ID = '_rcss';
var classNamePattern = /\.(c\w+)(?:\:)?/;
var styleTag;

function getClassesForStyleSheet(styleSheet) {
  var classNames = {};
  var rules = styleSheet.cssRules;
  for (i in rules) {
    var match = classNamePattern.exec(rules[i].selectorText);
    if (match) {
      classNames[match[1]] = true;
    }
  }
  return Object.keys(classNames);
}

var styleTagManager = {
  getStyleTag: function() {
    styleTag = styleTag || document.getElementById(TAG_ID);
    if (styleTag == null) {
      styleTag = document.createElement('style');
      styleTag.id = TAG_ID;
      document.getElementsByTagName('head')[0].appendChild(styleTag);
    }
    return styleTag;
  },

  getClasses: function() {
    var ownerNode = styleTagManager.getStyleTag();
    for (var i = 0, l = document.styleSheets.length; i < l; i++) {
      var styleSheet = document.styleSheets[i];
      if (styleSheet.ownerNode === ownerNode) {
        return getClassesForStyleSheet(styleSheet);
      }
    }
    return [];
  }
}

module.exports = styleTagManager;
