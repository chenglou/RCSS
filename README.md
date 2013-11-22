# RCSS

Turn your JavaScript objects into CSS classes.

Designed with [React](http://facebook.github.io/react/) and [Browserify](http://browserify.org) in mind.

```bash
npm install rcss
```

button.js
```js
var RCSS = require('RCSS');

// and of course, you can use JavaScript here to assign values
// byebye preprocessors
var button = {
  display: 'inline-block',
  padding: '6px 12px',
  // camelCased. Transformed back into the dashed CSS counterparts on-the-fly
  marginBottom: '0'
};

// parses the object into a CSS class and adds it to a style sheet
RCSS.createClass(button);

module.exports = button;
```

index.js
```html
/** @jsx React.DOM */

var React = require('react-tools').React;
var buttonStyle = require('./button');

React.renderComponent(
  <button className={buttonStyle.className}>Press Me</button>,
  document.body
);
```

(Check the `examples/` folder for more.)

That's it. Additional niceties:

- **No CSS preprocessor needed**. You're already constructing your JavaScript objects in... well, JavaScript.
- `require()` your CSS since they're just plain JS files. Isn't that enough?
- Cascading for free through `RCSS.merge(obj1, obj2, obj3, ...)`. It's literally just merging all the properties into a new object.
- Validates your CSS properties.
- ... And more to come. Just imagine what you can do to normal objects.

## License
MIT.
