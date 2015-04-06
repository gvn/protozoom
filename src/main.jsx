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

var Tile = React.createClass({
  render: function () {
    return (
      <div className="tile"></div>
    );
  }
});

var Slot = React.createClass({
  render: function () {
    return (
      <div
        className="slot"
        style={{
          width: 100 / parseInt(this.props.perRow, 10) + '%',
          height: 100 / parseInt(this.props.perRow, 10) + '%'
        }}>
          {this.props.children}
      </div>
    );
  }
});

var Grid = React.createClass({
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
            <Slot x={x} y={y} perRow={this.props.layout[0].length}>
              <Tile/>
            </Slot>
          );
        } else {
          nodes.push(<Slot x={x} y={y} perRow={this.props.layout[0].length} />);
        }
      }
    }

    var gridTransform = {
      transform: 'scale(' + this.state.zoom + ')',
      WebkitTransform: 'scale(' + this.state.zoom + ')'
    }

    return (
      <div className="grid" style={gridTransform}>
        {nodes}
      </div>
    );
  }
});

var SegmentedControl = React.createClass({
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
      <div className="segmented-control">
        <button onClick={ this.increase }><span>+</span></button>
        <button onClick={ this.decrease }><span>-</span></button>
      </div>
    );
  }
});

var App = React.createClass({
  changeZoom: function (event) {
    this.refs.masterGrid.zoom(event.amount);
  },
  render: function () {
    var width = Math.ceil(Math.random() * 16);
    var height = Math.ceil(Math.random() * 16);

    return (
      <div>
        <SegmentedControl onAmountChange={ this.changeZoom }/>
        <div className="wrapper">
          <Draggable zIndex={100}>
            <div>
              <Grid initialZoom={1} ref="masterGrid" layout={ generateLayout(width, height) }/>
            </div>
          </Draggable>
        </div>
      </div>
    );
  }
});

React.render(
  <App/>,
  document.querySelector('#app')
);
