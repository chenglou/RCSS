var classNameId = 0;
var randomSuffix = Math.random().toString(36).slice(-5);

function hashStyle(styleObj) {
  return JSON.stringify(styleObj);
}

function generateValidCSSClassName() {
  // CSS classNames can't start with a number.
  // Random suffix in case there are multiple versions of RCSS.

  // TODO: since we're back to hashing the style obj, might as well remove this
  // hack and take the hash to generate a base64 className that can be decoded
  return 'c' + (classNameId++) + '-' + randomSuffix;
}

var global = Function("return this")();
global.registry = global.registry || {};

function registerClass(styleObj) {
  var hash = hashStyle(styleObj);
  if (global.registry[hash]) {
    // already in the registry, or maybe an identical-looking obj
    return;
  }

  var styleDescriptor = {
    className: generateValidCSSClassName(),
    style: styleObj
  };
  global.registry[hash] = styleDescriptor;

  return styleDescriptor;
}

module.exports = registerClass;
