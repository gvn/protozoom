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
    )
  }
});

var Slot = React.createClass({
  render: function () {
    return (
      <div className="slot">
        {this.props.children}
      </div>
    )
  }
})

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
          )
        } else {
          nodes.push(<Slot x={x} y={y} />)
        }
      }
    }

    return (
      <div className="grid">
        {nodes}
      </div>
    )
  }
})

React.render(
  <Grid layout={ generateLayout(4,10) }/>,
  document.querySelector('#app')
);
