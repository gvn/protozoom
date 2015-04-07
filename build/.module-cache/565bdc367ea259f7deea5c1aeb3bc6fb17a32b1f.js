var Draggable = ReactDraggable;

function generateLayout (width, height) {
  var layout = [];

  for (var y = 0; y < height; y++) {
    layout.push([]);

    for (var x = 0; x < width; x++) {
      layout[y].push(Math.random() > 0.5 ? null : 1);
    }
  }

  return layout;
}

function zoom (amount) {
  var elGrid = document.querySelector('.grid');
  elGrid.style.transform = ('scale(' + amount + ')');
  elGrid.style['-webkit-transform'] = ('scale(' + amount + ')');
}

var Tile = React.createClass({displayName: "Tile",
  render: function () {
    return (
      React.createElement("div", {className: "tile"})
    );
  }
});

var Slot = React.createClass({displayName: "Slot",
  render: function () {
    console.log(this.props.perRow);
    return (
      React.createElement("div", {className: "slot", style: {width: 100 / parseInt(this.props.perRow, 10) + '%', height: 100 / parseInt(this.props.perRow, 10) + '%'}}, 
        this.props.children
      )
    );
  }
});

var Grid = React.createClass({displayName: "Grid",
  render: function () {
    var nodes = [];

    for (var y = 0; y < this.props.layout.length; y++) {
      for (var x = 0; x < this.props.layout[0].length; x++) {
        if (this.props.layout[x][y]) {
          nodes.push(
            React.createElement(Slot, {x: x, y: y, perRow: this.props.layout[0].length}, 
              React.createElement(Tile, null)
            )
          );
        } else {
          nodes.push(React.createElement(Slot, {x: x, y: y, perRow: this.props.layout[0].length}));
        }
      }
    }

    return (
      React.createElement("div", {className: "grid"}, 
        nodes
      )
    );
  }
});

var SegmentedControl = React.createClass({displayName: "SegmentedControl",
  getInitialState: function () {
    return {
      amount: 1
    };
  },
  modifyAmount: function (delta) {
    this.state.amount *= delta;

    this.props.onAmountChange({
      amount: this.state.amount
    });
  },
  increase: function () {
    this.modifyAmount(2);
  },
  decrease: function () {
    this.modifyAmount(0.5);
  },
  render: function () {
    return (
      React.createElement("div", {className: "segmented-control"}, 
        React.createElement("button", {onClick:  this.increase}, React.createElement("span", null, "+")), 
        React.createElement("button", {onClick:  this.decrease}, React.createElement("span", null, "-"))
      )
    );
  }
});

var App = React.createClass({displayName: "App",
  changeZoom: function (event) {
    window.zoom(event.amount);
  },
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement(SegmentedControl, {onAmountChange:  this.changeZoom}), 
        React.createElement("div", {className: "wrapper"}, 
          React.createElement(Draggable, {zIndex: 100}, 
            React.createElement("div", null, 
              React.createElement(Grid, {layout:  generateLayout(Math.ceil(Math.random() * 16),Math.ceil(Math.random() * 16)) })
            )
          )
        )
      )
    );
  }
});

React.render(
  React.createElement(App, null),
  document.querySelector('#app')
);
