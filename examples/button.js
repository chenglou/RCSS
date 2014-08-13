var RCSS = require('../');

// Credits to Bootstrap.
var button = {
  display: 'inline-block',
  color: '#000',
  padding: '6px 12px',
  marginBottom: 0,
  fontSize: 14,
  fontWeight: 'normal',
  lineHeight: 1.428571429,
  textAlign: 'center',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  cursor: 'pointer',
  backgroundImage: 'none',
  border: '1px solid transparent',
  borderRadius: 4,
  userSelect: 'none',

  ':hover': {
    color: '#fff'
  },
  // Try resizing the window!
  '@media (max-width: 500px)': {
    backgroundColor: '#5bc0de',
    borderColor: '#46b8da'
  }
};

// `registerClass` registers the passed object internally and returns a new
// `object of the format: {className: 'bla', style: yourOriginalButtonObj}.
module.exports = RCSS.registerClass(button);
