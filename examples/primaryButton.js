var RCSS = require('../');
var buttonStyle = require('./button');

// Credits to Bootstrap. `merge` does exactly what it sounds like: take two or
// more objects and merge their keys into a new one, in order.
var primaryButton = RCSS.merge(buttonStyle, {
  ':hover': {
    color: '#000'
  },
  color: '#fff',
  backgroundColor: '#428bca',
  borderColor: '#357ebd'
});

module.exports = RCSS.createClass(primaryButton);
