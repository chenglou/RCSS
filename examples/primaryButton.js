var RCSS = require('RCSS');
var buttonStyle = require('./button');

// credits to Bootstrap
// `merge` does exactly what it sounds like: take two or
// more objects and merge their keys into a new one, in order
var primaryButton = RCSS.merge(buttonStyle, {
  color: '#fff',
  backgroundColor: '#428bca',
  borderColor: '#357ebd'
});

RCSS.createClass(primaryButton);

module.exports = primaryButton;
