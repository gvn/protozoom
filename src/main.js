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
      <div className="slot"></div>
    )
  }
})

var Grid = React.createClass({
  render: function () {
    return (
      <div className="grid">
        <Slot/><Slot/><Slot/><Slot/>
        <Slot/><Slot/><Slot/><Slot/>
        <Slot/><Slot/><Slot/><Slot/>
      </div>
    )
  }
})

React.render(
  <Grid/>,
  document.querySelector('#app')
);
