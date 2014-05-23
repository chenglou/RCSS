var RCSS = require('../');

// credits to Bootstrap
var button = {
  display: 'inline-block',
  padding: '6px 12px',
  marginBottom: '0',
  fontSize: '14px',
  fontWeight: 'normal',
  lineHeight: '1.428571429',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  cursor: 'pointer',
  backgroundImage: 'none',
  border: '1px solid transparent',
  borderRadius: '4px',
  userSelect: 'none'
};

// parses the object into a CSS class and adds it to a style sheet
RCSS.createClass(button);

module.exports = button;
