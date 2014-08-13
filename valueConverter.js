var escape = require('lodash.escape');

/**
 * CSS properties which accept numbers but are not in units of "px".
 */
var isUnitlessNumber = {
  columnCount: true,
  fillOpacity: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true,
  zoom: true
};

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function(prop) {
  prefixes.forEach(function(prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Append a style value with "px", if necessary. This functionality is borrowed
 * from React, but copied over here to keep RCSS React-agnostic.
 */
function dangerousStyleValue(styleName, value) {
  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  var isNonNumeric = isNaN(value);
  if (isNonNumeric || value === 0 || isUnitlessNumber[styleName]) {
    return '' + value; // cast to string
  }

  return value + 'px';
}

/**
 * Escape style values, unless the styleName is `content`, which is a special
 * property that needs to be quoted.
 */
function escapeValueForProp(styleName, value) {
  if (styleName === 'content') {
    return '"' + value + '"';
  } else {
    return escape(value);
  }
}

module.exports = function(styleName, value) {
  var transforms = [dangerousStyleValue, escapeValueForProp];
  for (var i = 0, l = transforms.length; i < l; i++) {
    value = transforms[i](styleName, value);
  }
  return value;
};
