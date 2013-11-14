# RCSS
CSS as JavaScript objects, imported with `require()`.

Designed with [React](http://facebook.github.io/react/) in mind.

```bash
npm install RCSS
```

button.js
```js
var RCSS = require('RCSS');

var button = {
  display: 'inline-block',
  padding: '6px 12px',
  marginBottom: '0'
};
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

(Check the `examples/` folder for more.)

"CSS" properties are camelCased to respect JavaScript convention. They're transformed back into the dashed CSS counterparts on-the-fly.

Since React uses the same inline style object format, the exported JavaScript object is 100% reusable even without this library:

```js
var button = {
  display: 'inline-block',
  padding: '6px 12px',
  marginBottom: '0'
};

// no RCSS needed!
React.renderComponent(
  <button style={button}>Press Me</button>,
  document.body
);
```

Except you do pay performance penalties if you inline all your CSS this way. RCSS solves this problem by actually creating and storing your object in a `style` tag, and insert the generated `className` in your object so that you can use it.

And now you get scoping (unique `className`), cascading (`merge` objects) and preprocessing (normal JS operations) for free.
