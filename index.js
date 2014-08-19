var clone = require('lodash.clone');
var cascade = require('./cascade');
var registerClass = require('./registerClass');
var styleRuleConverter = require('./styleRuleConverter');
var styleTagManager = require('./styleTagManager');

var global = Function("return this")();
global.__RCSS_0_registry = global.__RCSS_0_registry || {};
global.__RCSS_0_document_registry = global.__RCSS_0_document_registry || {};

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
      return '';
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
    var documentRegistry = global.__RCSS_0_document_registry;
    if (documentRegistry[styleId]) {
      return;
    }

    // Add to document registry
    documentRegistry[styleId] = true;

    // Inject into page
    var styleTag = styleTagManager.getStyleTag();
    styleTag.innerHTML += RCSS.getStyleString(styleId);
  },

  injectAll: function() {
    var documentRegistry = global.__RCSS_0_document_registry;
    var stylesStr = '';
    var styleIds = RCSS.getStyleIds();
    for (var i in styleIds) {
      // Only inject styles that haven't already been injected
      var styleId = styleIds[i];
      if (documentRegistry[styleId]) {
        continue;
      }

      // Add to document registry
      documentRegistry[styleId] = true;
      stylesStr += RCSS.getStyleString(styleId);
    }

    // Inject into page
    var styleTag = styleTagManager.getStyleTag();
    styleTag.innerHTML += stylesStr;
  },

  syncClasses: function() {
    var documentRegistry = global.__RCSS_0_document_registry;
    var classes = styleTagManager.getClasses();
    for (var i in classes) {
      documentRegistry[classes[i]] = true;
    }
  }
};

module.exports = RCSS;
