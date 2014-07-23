var cascade = require('./cascade');
var styleRuleConverter = require('./styleRuleConverter');

var classNameId = 0;
var randomSuffix = Math.random().toString(36).slice(-5);

function generateValidCSSClassName() {
  // CSS classNames can't start with a number.
  // Random suffix in case there are multiple versions of RCSS.
  return 'c' + (classNameId++) + '-' + randomSuffix;
}

var registry = [];

function descriptorsToString(styleDescriptor) {
  return styleRuleConverter.rulesToString(
    styleDescriptor.className,
    styleDescriptor.style
  );
}

var RCSS = {
  cascade: cascade,

  registerClass: function(styleObj) {
    var styleDescriptor = {
      className: generateValidCSSClassName(),
      style: styleObj
    };
    registry.push(styleDescriptor);

    return styleDescriptor;
  },

  injectAll: function() {
    var tag = document.createElement('style');
    tag.innerHTML = RCSS.getStylesString();
    document.getElementsByTagName('head')[0].appendChild(tag);
  },

  getStylesString: function() {
    var str = registry.map(descriptorsToString).join('');
    registry.length = 0;
    return str;
  }
};

module.exports = RCSS;
