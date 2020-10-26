import React from 'react';

export default class Activities extends React.Component {
  render() {
    return (
    <div className="activities">
      <div>{console.log(this.props.activity)}</div>
    </div>
    )
  }
}