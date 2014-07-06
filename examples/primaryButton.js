var RCSS = require('../');
var buttonStyle = require('./button');

// Under the hood, `cascade` simply takes two or more objects and deep merge
// them into a new one, in order.
var primaryButton = RCSS.cascade(buttonStyle.style, {
  color: '#fff',
  backgroundColor: '#428bca',
  borderColor: '#357ebd',

  ':hover': {
    color: '#000'
  }
});

module.exports = RCSS.registerClass(primaryButton);
