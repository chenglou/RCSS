var React = require('react');
var RCSS = require('../');

var button = require('./button');
var primaryButton = require('./primaryButton');

var App = React.createClass({
  getInitialState: function() {
    return {buttons: ['It', 'Just']};
  },

  componentDidMount: function() {
    setTimeout(function() {
      this.setState({buttons: this.state.buttons.concat(['Works'])});
    }.bind(this), 1000);
  },

  render: function() {
    return (
      <div>
        {this.state.buttons.map(function(label, i) {
          var className = i > 1 ? primaryButton.className : button.className;
          return <button className={className} key={label}>{label}</button>;
        })}
      </div>
    );
  }
});

RCSS.injectAll();
React.render(<App />, document.body);
