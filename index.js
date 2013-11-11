var RCSS = require('./RCSS');
var buttonStyle = require('./button');

var d = React.DOM;

var App = React.createClass({
  getInitialState: function() {
    return {buttons: ['It', 'Just']}
  },
  componentDidMount: function() {
    setTimeout(function() {
      this.setState({buttons: this.state.buttons.concat(['Works'])});
    }.bind(this), 1000);
  },
  render: function() {
    return d.div({},
      this.state.buttons.map(function(label, i) {
        if (i > 1) return d.button({className: require('./newButton').className}, label);
        return d.button({className: buttonStyle.className}, label);
      })
    );
  }
});

React.renderComponent(App({}), document.body)
