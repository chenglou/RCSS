# RCSS
CSS as JavaScript objects, imported with `require()`.

**Experimental.**

```bash
npm install RCSS
```

Check the `examples/` folder.

button.js
```js
var RCSS = require('RCSS');

var button = {
  display: 'inline-block',
  padding: '6px 12px',
  marginBottom: '0'
}
RCSS.createClass(button);

module.exports = button;
```

index.js
```js
/** @jsx React.DOM */

var React = require('react-tools').React;
var buttonStyle = require('./button');

React.renderComponent(
  <button className={buttonStyle.className}>Press Me</button>,
  document.body
);
```
