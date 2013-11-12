var RCSS = require('RCSS');
var buttonStyle = require('./button');

// credits to Bootstrap
var primaryButton = RCSS.merge(buttonStyle, {
  color: '#fff',
  backgroundColor: '#428bca',
  borderColor: '#357ebd'
});

RCSS.createClass(primaryButton);

module.exports = primaryButton;
