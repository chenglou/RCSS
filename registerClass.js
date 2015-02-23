var sha1 = require('sha1');
var globalRegistry = require('./registry');

function hashStyle(styleObj) {
  return sha1(JSON.stringify(styleObj));
}

function generateValidCSSClassName(styleId) {
  // CSS classNames can't start with a number.
  return 'c' + styleId;
}

function registerClass(styleObj) {
  var styleId = generateValidCSSClassName(hashStyle(styleObj));

  if (globalRegistry.registry[styleId] == null) {
    globalRegistry.registry[styleId] = {
      className: styleId,
      style: styleObj
    };
  }

  // Simple shallow clone
  var styleObj = globalRegistry.registry[styleId];
  return {
    className: styleObj.className,
    style: styleObj.style
  };
}

module.exports = registerClass;
