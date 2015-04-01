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
      <div className="slot">
        {this.props.children}
      </div>
    );
  }
});

var Grid = React.createClass({
  render: function () {
    var nodes = [];

    for (var y = 0; y < this.props.layout.length; y++) {
      for (var x = 0; x < this.props.layout[0].length; x++) {
        if (this.props.layout[x][y]) {
          nodes.push(
            <Slot x={x} y={y}>
              <Tile/>
            </Slot>
          );
        } else {
          nodes.push(<Slot x={x} y={y} />);
        }
      }
    }

    return (
      <div className="grid">
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
    this.state.amount += delta;

    this.props.onAmountChange({
      amount: this.state.amount
    });
  },
  increase: function () {
    this.modifyAmount(0.5);
  },
  decrease: function () {
    this.modifyAmount(-0.5);
  },
  render: function () {
    return (
      <div className="segmented-control">
        <button onClick={ this.increase }>+</button>
        <button onClick={ this.decrease }>-</button>
      </div>
    );
  }
});

var App = React.createClass({
  changeZoom: function (event) {
    window.zoom(event.amount);
  },
  render: function () {
    return (
      <div>
        <SegmentedControl onAmountChange={ this.changeZoom }/>
        <div className="wrapper">
          <Grid layout={ generateLayout(4,10) }/>
        </div>
      </div>
    );
  }
});

React.render(
  <App/>,
  document.querySelector('#app')
);

function zoom (amount) {
  var elGrid = document.querySelector('.grid');
  elGrid.style.transform = ('scale(' + amount + ')');
}
