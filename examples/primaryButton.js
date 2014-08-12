var RCSS = require('../');
var buttonStyle = require('./button');

// Under the hood, `cascade` simply takes two or more objects and deep merge
// them into a new one, in order.
var primaryButton = RCSS.cascade(buttonStyle.style, {
  color: '#fff',
  backgroundColor: '#428bca',
  borderColor: RCSS.color('#428bca').darken(30),

  ':hover': {
    color: '#000'
  }
});

module.exports = RCSS.registerClass(primaryButton);
