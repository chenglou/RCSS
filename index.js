var clone = require('lodash.clone');
var cascade = require('./cascade');
var registerClass = require('./registerClass');
var styleRuleConverter = require('./styleRuleConverter');

var global = Function("return this")();
global.__RCSS_0_registry = global.__RCSS_0_registry || {};

function descriptorsToString(styleDescriptor) {
  return styleRuleConverter.rulesToString(
    styleDescriptor.className,
    styleDescriptor.style
  );
}

var RCSS = {
  cascade: cascade,
  registerClass: registerClass,

  getStyleIds: function() {
    var registry = global.__RCSS_0_registry;
    var styleIds = [];
    for (var key in registry) {
      if (!registry.hasOwnProperty(key)) {
        continue;
      }
      styleIds.push(key);
    }
    return styleIds;
  },

  getStyleString: function(styleId) {
    var registry = global.__RCSS_0_registry;
    if (registry.hasOwnProperty(styleId)) {
      return descriptorsToString(registry[styleId]);
    } else {
      return null;
    }
  },

  getStylesString: function() {
    var str = '';
    var styleIds = RCSS.getStyleIds();
    for (var i in styleIds) {
      str += RCSS.getStyleString(styleIds[i]);
    }
    return str;
  },

  injectStyle: function(styleId) {
    var tag = document.createElement('style');
    tag.innerHTML = RCSS.getStyleString(styleId);
    document.getElementsByTagName('head')[0].appendChild(tag);
    delete global.__RCSS_0_registry[styleId];
  },

  injectAll: function() {
    var tag = document.createElement('style');
    tag.innerHTML = RCSS.getStylesString();
    document.getElementsByTagName('head')[0].appendChild(tag);
    global.__RCSS_0_registry = {};
  }
};

module.exports = RCSS;
