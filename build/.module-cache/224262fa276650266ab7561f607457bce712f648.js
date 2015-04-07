var Draggable = ReactDraggable;

// TEMP: Just used for generating random starter layouts
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

var Tile = React.createClass({displayName: "Tile",
  render: function () {
    return (
      React.createElement("div", {className: "tile"})
    );
  }
});

var AddTile = React.createClass({displayName: "AddTile",
  render: function () {
    return (
      React.createElement("button", {className: "add-tile"})
    )
  }
})

var Slot = React.createClass({displayName: "Slot",
  render: function () {
    return (
      React.createElement("div", {
        className: "slot", 
        style: {
          width: 100 / parseInt(this.props.perRow, 10) + '%',
          height: 100 / parseInt(this.props.perRow, 10) + '%'
        }}, 
          this.props.children
      )
    );
  }
});

var Grid = React.createClass({displayName: "Grid",
  zoom: function (amount) {
    this.setState({
      zoom: amount
    });
  },
  getInitialState: function () {
    return {
      zoom: this.props.initialZoom
    }
  },
  render: function () {
    console.log('grid rendering');
    var nodes = [];

    for (var y = 0; y < this.props.layout.length; y++) {
      for (var x = 0; x < this.props.layout[0].length; x++) {
        if (this.props.layout[y][x]) {
          nodes.push(
            React.createElement(Slot, {x: x, y: y, perRow: this.props.layout[0].length}, 
              React.createElement(Tile, null)
            )
          );
        } else {
          nodes.push(
            React.createElement(Slot, {x: x, y: y, perRow: this.props.layout[0].length}, 
              React.createElement(AddTile, null)
            )
          );
        }
      }
    }

    var gridTransform = {
      transform: 'scale(' + this.state.zoom + ')',
      WebkitTransform: 'scale(' + this.state.zoom + ')'
    }

    return (
      React.createElement("div", {className: "grid", style: gridTransform}, 
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
    this.refs.masterGrid.zoom(event.amount);
  },
  render: function () {
    var width = Math.ceil(Math.random() * 16);
    var height = Math.ceil(Math.random() * 16);

    return (
      React.createElement("div", null, 
        React.createElement(SegmentedControl, {onAmountChange:  this.changeZoom}), 
        React.createElement("div", {className: "wrapper"}, 
          React.createElement(Draggable, {zIndex: 100}, 
            React.createElement("div", null, 
              React.createElement(Grid, {initialZoom: 1, ref: "masterGrid", layout:  generateLayout(width, height) })
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
