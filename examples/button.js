var RCSS = require('../');

// credits to Bootstrap
var button = {
  ':hover': {
    color: '#fff'
  },
  ':hover:nth-child(2)': {
    color: '#428bca'
  },
  '@media (max-width: 700px)': {
    backgroundColor: 'transparent'
  },
  display: 'inline-block',
  color: '#000',
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

// Parses the object into a CSS class, adds it to a style sheet, return the
// `className` in returnedObj.className.
module.exports = RCSS.createClass(button);
